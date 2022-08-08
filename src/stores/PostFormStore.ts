import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import EmailPost from 'helpers/posts/EmailPost'
import ExternalERC721Post from 'helpers/posts/ExternalERC721Post'
import NFTPost from 'helpers/posts/NFTPost'
import WalletStore from 'stores/WalletStore'

interface PostStoreInterface {
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentPost?: EmailPost | NFTPost | ExternalERC721Post
}

const PostFormStore = proxy<PostStoreInterface>({
  status: { loading: false },
  currentPost: undefined,
})

subscribeKey(WalletStore, 'account', () => {
  PostFormStore.currentPost = undefined
})

export default PostFormStore
