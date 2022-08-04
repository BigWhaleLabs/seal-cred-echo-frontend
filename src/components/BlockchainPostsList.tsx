import {
  EmailPostStatusStore,
  ExternalPostStatusStore,
} from 'stores/PostStatusStore'
import { EmailPostStore, ExternalPostStore } from 'stores/PostStore'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import BlockchainPost, { PostContract } from 'components/BlockchainPost'
import Cross from 'icons/Cross'
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
  const [selectedAddress, setAddress] = useState('')
  useScrollToAnchor(0, true, flashingPost)
  const { posts: emailPosts } = useSnapshot(EmailPostStore)
  const { posts: externalERC721Posts } = useSnapshot(ExternalPostStore)

  const posts = [
    ...emailPosts.map((post) => ({
      post,
      statusStore: EmailPostStatusStore,
    })),
    ...externalERC721Posts.map((post) => ({
      post,
      statusStore: ExternalPostStatusStore,
    })),
  ]

  return (
    <>
      {selectedAddress && (
        <BlockchainPostTag
          address={selectedAddress}
          onClick={() => setAddress('')}
        />
      )}
      {posts
        .filter(
          ({ post }) =>
            !selectedAddress || selectedAddress === post.derivativeAddress
        )
        .map(({ post, statusStore }) => (
          <BlockchainPost
            key={`${post.id}-${post.derivativeAddress}`}
            post={post}
            statusStore={statusStore}
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
