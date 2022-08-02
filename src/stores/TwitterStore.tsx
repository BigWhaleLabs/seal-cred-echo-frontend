import { BigNumber } from 'ethers'
import { parseTweetSavedLogData } from 'helpers/createPost'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ProcessingTweetsStore from 'stores/ProcessingTweetsStore'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import TweetStatus from 'models/TweetStatus'
import TweetStatusStore from 'stores/TweetStatusStore'
import WalletStore from 'stores/WalletStore'
import getBlockchainPosts from 'helpers/getBlockchainPosts'
import getTwitterLedgerRecord from 'helpers/getTwitterLedgerRecord'
import handleError from 'helpers/handleError'

interface BlockchainTweet {
  id: number
  post: string
  derivativeAddress: string
  sender: string
  timestamp: number
}

interface TwitterStoreInterface {
  calculatedMaxLength?: number
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentDomain?: string
  createTweet: ({
    tweet,
    domain,
  }: {
    tweet: string
    domain: string
  }) => Promise<void>
  blockchainPosts: Promise<BlockchainTweet[]>
}

const TwitterStore = proxy<TwitterStoreInterface>({
  status: { loading: false },
  currentDomain: undefined,
  createTweet: async ({ tweet, domain }: { tweet: string; domain: string }) => {
    TwitterStore.status = {
      loading: false,
    }
    TwitterStore.status.loading = true
    try {
      const transaction = await WalletStore.savePost({
        tweet,
        domain,
      })

      for (const { data, topics } of transaction.logs) {
        const {
          args: { id, tweet, derivativeAddress, sender, timestamp },
        } = parseTweetSavedLogData({ data, topics })

        await addTwitterLedgerRecord(
          id.toNumber(),
          tweet,
          derivativeAddress,
          sender,
          timestamp
        )
      }
    } catch (error) {
      handleError(error)
      TwitterStore.status.error =
        error instanceof Error ? error : new Error('Failed to create tweet')
      throw error
    } finally {
      TwitterStore.status.loading = false
    }
  },
  blockchainPosts: getBlockchainPosts(),
})

async function addTwitterLedgerRecord(
  id: number,
  post: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
  const ledger = await TwitterStore.blockchainPosts
  if (!ledger.find(({ id: ledgerTweetId }) => ledgerTweetId === id)) {
    TwitterStore.blockchainPosts = Promise.resolve([
      getTwitterLedgerRecord(id, post, derivativeAddress, sender, timestamp),
      ...ledger,
    ])
    const processingTweetIds = ProcessingTweetsStore.processingTweetIds[sender]

    if (TweetStatusStore.tweetsStatuses[id])
      TweetStatusStore.tweetsStatuses[id] = {
        id,
        status: TweetStatus.pending,
      }

    if (processingTweetIds) {
      ProcessingTweetsStore.processingTweetIds[sender] = [
        id,
        ...processingTweetIds,
      ]
      return
    }

    ProcessingTweetsStore.processingTweetIds[sender] = [id]
  }
}

subscribeKey(WalletStore, 'account', () => {
  TwitterStore.currentDomain = undefined
})

SCTwitterLedgerContract.on(
  SCTwitterLedgerContract.filters.PostSaved(),
  async (id, tweet, derivativeAddress, sender, timestamp) => {
    console.info('TweetSaved event', id.toNumber(), tweet, derivativeAddress)
    const tweetId = id.toNumber()
    await addTwitterLedgerRecord(
      tweetId,
      tweet,
      derivativeAddress,
      sender,
      timestamp
    )
  }
)

export default TwitterStore
