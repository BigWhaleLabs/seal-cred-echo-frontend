import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import WalletStore from 'stores/WalletStore'

interface PostStoreInterface {
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentPost?: {
    original: string
    derivative: string
  }
}

const PostFormStore = proxy<PostStoreInterface>({
  status: { loading: false },
  currentPost: undefined,
})

subscribeKey(WalletStore, 'account', () => {
  PostFormStore.currentPost = undefined
})

export default PostFormStore
