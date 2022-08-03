import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost, { PostContract } from 'components/BlockchainPost'
import Cross from 'icons/Cross'
import PostStore from 'stores/PostStore'
import TwitterLoading from 'components/TwitterLoading'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  padding,
  space,
} from 'classnames/tailwind'
import flashingPost from 'helpers/flashingPost'
import useScrollToAnchor from 'helpers/useScrollToAnchor'

const blockchainPostTagContainer = classnames(
  display('inline-flex'),
  backgroundColor('bg-primary-background'),
  padding('px-4', 'py-2'),
  borderRadius('rounded'),
  space('space-x-2')
)
function BlockchainPostTag({
  address,
  onClick,
}: {
  address: string
  onClick: () => void
}) {
  return (
    <span className={blockchainPostTagContainer}>
      <PostContract address={address} />
      <Cross onClick={onClick} />
    </span>
  )
}

function BlockchainPostsListSuspended() {
  const { blockchainPosts = [] } = useSnapshot(PostStore)
  const [selectedAddress, setAddress] = useState('')
  useScrollToAnchor(0, true, flashingPost)

  return (
    <>
      {selectedAddress && (
        <BlockchainPostTag
          address={selectedAddress}
          onClick={() => setAddress('')}
        />
      )}
      {blockchainPosts
        .filter(
          ({ derivativeAddress }) =>
            !selectedAddress || selectedAddress === derivativeAddress
        )
        .map(({ id, post, derivativeAddress, sender, timestamp }) => (
          <BlockchainPost
            key={`${id}-${derivativeAddress}`}
            id={id}
            post={post}
            derivativeAddress={derivativeAddress}
            sender={sender}
            timestamp={timestamp}
            onSelectAddress={setAddress}
          />
        ))}
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<TwitterLoading text="Fetching blockchain posts..." />}>
      <BlockchainPostsListSuspended />
    </Suspense>
  )
}
