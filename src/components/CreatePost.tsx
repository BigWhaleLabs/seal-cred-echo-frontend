// import {
//   ERC721ProcessingPostsStore,
//   EmailProcessingPostsStore,
//   ExternalERC721ProcessingPostsStore,
//   PostProcessingStore,
// } from 'stores/ProcessingPostsStore'
// import { margin, space } from 'classnames/tailwind'
// import { useSnapshot } from 'valtio'
// import CreatePostForm from 'components/CreatePostForm'
// import PostProcessing from 'components/PostProcessing'
// import PostStatus from 'models/PostStatus'
// import PostStatusStore, {
//   ERC721PostStatusStore,
//   EmailPostStatusStore,
//   ExternalERC721PostStatusStore,
// } from 'stores/PostStatusStore'
// import WalletStore from 'stores/WalletStore'

// function usePosts(
//   postStatusStore: PostStatusStore,
//   processingStore: PostProcessingStore
// ) {
//   const { account } = useSnapshot(WalletStore)
//   const { postsStatuses } = useSnapshot(postStatusStore)
//   const { processingIds } = useSnapshot(processingStore)

//   const accountProcessingPostIds = account && processingIds[account]
//   const currentPostsStatuses = { ...postsStatuses }
//   const currentPosts = accountProcessingPostIds
//     ? accountProcessingPostIds.map(
//         (tweetId) =>
//           currentPostsStatuses[tweetId] || {
//             tweetId,
//             status: PostStatus.pending,
//           }
//       )
//     : []

//   const pendingPosts = currentPosts.filter(
//     (post) => post.status === PostStatus.pending
//   )

//   const lastPublishedPost = currentPosts.find(
//     (post) => post.status === PostStatus.published
//   )

//   return {
//     pendingPosts,
//     lastPublishedPost,
//   }
// }

// export default function () {
//   const {
//     pendingPosts: emailPendingPosts,
//     lastPublishedPost: emailLastPublishedPost,
//   } = usePosts(EmailPostStatusStore, EmailProcessingPostsStore)
//   const {
//     pendingPosts: eRC721PendingPosts,
//     lastPublishedPost: eRC721LastPublishedPost,
//   } = usePosts(ERC721PostStatusStore, ERC721ProcessingPostsStore)
//   const {
//     pendingPosts: externalERC721PendingPosts,
//     lastPublishedPost: externalERC721LastPublishedPost,
//   } = usePosts(
//     ExternalERC721PostStatusStore,
//     ExternalERC721ProcessingPostsStore
//   )

//   const pendingPosts = [
//     ...emailPendingPosts,
//     ...eRC721PendingPosts,
//     ...externalERC721PendingPosts,
//   ]

//   const lastPublishedPost =
//     emailLastPublishedPost ||
//     eRC721LastPublishedPost ||
//     externalERC721LastPublishedPost

//   return (
//     <div className={margin('mt-6', 'mb-16')}>
//       <div className={space('space-y-6', 'md:space-y-12')}>
//         {pendingPosts.length > 0 ? (
//           <PostProcessing
//             post={pendingPosts[0]}
//             title={
//               pendingPosts.length > 1
//                 ? 'Your tweets are processing'
//                 : 'Your tweet is processing'
//             }
//           />
//         ) : (
//           lastPublishedPost && (
//             <PostProcessing post={lastPublishedPost} title="Tweet successful" />
//           )
//         )}
//         <CreatePostForm />
//       </div>
//     </div>
//   )
// }
