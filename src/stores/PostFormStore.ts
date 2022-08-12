import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import WalletStore from 'stores/WalletStore'

interface PostStoreInterface {
  text: string
  status: {
    loading: boolean
    error?: Error | string
  }
  currentPost?: { derivative: string; original: string }
}

const PostFormStore = proxy<PostStoreInterface>({
  text: '',
  status: { loading: false },
  currentPost: undefined,
})

subscribeKey(WalletStore, 'account', () => {
  PostFormStore.currentPost = undefined
})

export default PostFormStore
