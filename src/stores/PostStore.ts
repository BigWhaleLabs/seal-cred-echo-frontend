import { PersistableStore } from '@big-whale-labs/stores'
import { PostStruct } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { proxy } from 'valtio'
import PostStatus from 'models/PostStatus'
import WalletStore from 'stores/WalletStore'
import env from 'helpers/env'
import getContractOriginalAndType from 'helpers/getContractOriginalAndType'
import getPostStatuses from 'helpers/getPostStatuses'
import postStorageContracts from 'helpers/postStorageContracts'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

class PostStore extends PersistableStore {
  postStorages = Object.entries(postStorageContracts).reduce(
    (prev, [key, contract]) => {
      return {
        ...prev,
        [key]: safeGetPostsFromContract(contract),
      }
    },
    {}
  ) as {
    [name: string]: Promise<PostStruct[]>
  }
  idsToStatuses = {} as {
    [name: string]: {
      [postId: number]:
        | Promise<
            | {
                status: PostStatus
                statusId?: number
              }
            | undefined
          >
        | undefined
    }
  }

  private disallowList = ['postStorages', 'checkingStatuses', 'savePost']
  replacer = (key: string, value: unknown) => {
    return this.disallowList.includes(key) ? undefined : value
  }

  async savePost({
    text,
    derivativeAddress,
  }: {
    text: string
    derivativeAddress: string
  }) {
    const { type, originalAddress } = await getContractOriginalAndType(
      derivativeAddress
    )

    const contract = (await postStorageContracts[type]).connect(
      WalletStore.provider.getSigner(0)
    )

    const transaction = await contract.savePost(text, originalAddress)
    return await transaction.wait()
  }

  checkingStatuses = false
  async checkStatuses() {
    if (this.checkingStatuses) return
    this.checkingStatuses = true
    try {
      for (const [name, postStoragePromise] of Object.entries(
        this.postStorages
      )) {
        const idsNotChecked = [] as number[]
        const posts = await postStoragePromise
        for (const post of posts) {
          const postId = Number(await post.id)
          if (!this.idsToStatuses[postId]) {
            idsNotChecked.push(postId)
          }
        }
        const pendingIdsToRecheck = [] as number[]
        for (const [postId, retrievedStatusPromise] of Object.entries(
          this.idsToStatuses[name] || {}
        )) {
          const retrievedStatus = await retrievedStatusPromise
          if (!retrievedStatus) {
            continue
          }
          if (retrievedStatus.status === PostStatus.pending) {
            pendingIdsToRecheck.push(Number(postId))
          }
        }
        const idsToCheck = [...idsNotChecked, ...pendingIdsToRecheck]
        if (!idsToCheck.length) {
          continue
        }
        const statusCheckPromise = getPostStatuses(idsToCheck, name)
        for (const postId of idsToCheck) {
          this.idsToStatuses[name][postId] = statusCheckPromise.then(
            (statuses) => {
              const status = statuses[postId]
              if (!status) return undefined
              return {
                status: status.status,
                statusId: status.statusId,
              }
            }
          )
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.checkingStatuses = false
    }
  }
}

const postStore = proxy(new PostStore()).makePersistent(env.VITE_ENCRYPT_KEY)

for (const [name, postStorageContract] of Object.entries(
  postStorageContracts
)) {
  postStorageContract.on(
    postStorageContract.filters.PostSaved(),
    async (id, post, derivativeAddress, sender, timestamp) => {
      console.log(
        'PostSaved event',
        id,
        post,
        derivativeAddress,
        sender,
        timestamp
      )
      const postStorage = await postStore.postStorages[name]
      postStorage.push({
        id,
        post,
        derivativeAddress,
        sender,
        timestamp,
      })
    }
  )
}

void postStore.checkStatuses()
setInterval(() => postStore.checkStatuses(), 15 * 1000)

export default postStore
