// import {
//   ERC721PostStatusStore,
//   EmailPostStatusStore,
//   ExternalERC721PostStatusStore,
// } from 'stores/PostStatusStore'
// import {
//   ERC721PostStore,
//   EmailPostStore,
//   ExternalERC721PostStore,
// } from 'stores/PostStore'
// import { useSnapshot } from 'valtio'

// export default function () {
//   const { posts: emailPosts } = useSnapshot(EmailPostStore)
//   const { posts: eRC721Posts } = useSnapshot(ERC721PostStore)
//   const { posts: externalERC721Posts } = useSnapshot(ExternalERC721PostStore)

//   return [
//     ...emailPosts.map((post) => ({
//       post,
//       statusStore: EmailPostStatusStore,
//     })),
//     ...eRC721Posts.map((post) => ({
//       post,
//       statusStore: ERC721PostStatusStore,
//     })),
//     ...externalERC721Posts.map((post) => ({
//       post,
//       statusStore: ExternalERC721PostStatusStore,
//     })),
//   ].sort((a, b) => b.post.timestamp - a.post.timestamp)
// }
export default false
