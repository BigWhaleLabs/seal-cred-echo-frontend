import {
  EmailPostStatusStore,
  ExternalNFTPostStatusStore,
  NFTPostStatusStore,
} from 'stores/PostStatusStore'
import {
  EmailPostStore,
  ExternalNFTPostStore,
  NFTPostStore,
} from 'stores/PostStore'
import { useSnapshot } from 'valtio'

export default function () {
  const { posts: emailPosts } = useSnapshot(EmailPostStore)
  const { posts: NFTPosts } = useSnapshot(NFTPostStore)
  const { posts: externalNFTPosts } = useSnapshot(ExternalNFTPostStore)

  return [
    ...emailPosts.map((post) => ({
      post,
      statusStore: EmailPostStatusStore,
    })),
    ...NFTPosts.map((post) => ({
      post,
      statusStore: NFTPostStatusStore,
    })),
    ...externalNFTPosts.map((post) => ({
      post,
      statusStore: ExternalNFTPostStatusStore,
    })),
  ].sort((a, b) => b.post.timestamp - a.post.timestamp)
}
