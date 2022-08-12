import { useState } from 'preact/compat'
// import BlockchainPost from 'components/BlockchainPost'
import ContractTitle from 'components/ContractTitle'
import Cross from 'icons/Cross'
import ListLoading from 'components/ListLoading'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  padding,
  space,
} from 'classnames/tailwind'
import flashingPost from 'helpers/flashingPost'
// import usePosts from 'hooks/usePosts'
import useScrollToAnchor from 'helpers/useScrollToAnchor'

const blockchainPostTagContainer = classnames(
  display('inline-flex'),
  backgroundColor('bg-primary-background'),
  padding('px-4', 'py-2'),
  borderRadius('rounded'),
  space('space-x-2')
)
// function BlockchainPostTag({
//   address,
//   onClick,
// }: {
//   address: string
//   onClick: () => void
// }) {
//   return (
//     <span className={blockchainPostTagContainer}>
//       <ContractTitle address={address} />
//       <Cross onClick={onClick} />
//     </span>
//   )
// }

// function BlockchainPostsListSuspended() {
//   const [selectedAddress, setAddress] = useState('')
//   useScrollToAnchor(0, true, flashingPost)
//   // const posts = usePosts()

//   // return (
//   //   <>
//   //     {selectedAddress && (
//   //       <BlockchainPostTag
//   //         address={selectedAddress}
//   //         onClick={() => setAddress('')}
//   //       />
//   //     )}
//   //     {posts
//   //       .filter(
//   //         ({ post }) =>
//   //           !selectedAddress || selectedAddress === post.derivativeAddress
//   //       )
//   //       .map(({ post, statusStore }) => (
//   //         <BlockchainPost
//   //           key={`${post.id}-${post.derivativeAddress}`}
//   //           post={post}
//   //           statusStore={statusStore}
//   //           onSelectAddress={setAddress}
//   //         />
//   //       ))}
//   //   </>
//   // )
// }

// export default function () {
//   return (
//     <Suspense fallback={<ListLoading text="Fetching blockchain posts..." />}>
//       {/* <BlockchainPostsListSuspended /> */}
//     </Suspense>
//   )
// }
export default function () {
  return <ListLoading text="Fetching blockchain posts..." />
}
