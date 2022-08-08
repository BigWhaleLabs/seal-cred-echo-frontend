import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import ExternalERC721Post from 'helpers/posts/ExternalERC721Post'
import WalletStore from 'stores/WalletStore'

interface PostStoreInterface {
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentPost?: EmailPost | ERC721Post | ExternalERC721Post
}

const PostFormStore = proxy<PostStoreInterface>({
  status: { loading: false },
  currentPost: undefined,
})

subscribeKey(WalletStore, 'account', () => {
  PostFormStore.currentPost = undefined
})

export default PostFormStore
