import { LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import PostStatus from 'models/PostStatus'
import PostStatusStore from 'stores/PostStatusStore'

export default function ({
  id,
  statusStore,
}: {
  id: number
  statusStore: PostStatusStore
}) {
  const { postsStatuses } = useSnapshot(statusStore)
  const post = postsStatuses[id]

  if (post?.status !== PostStatus.published) return null

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredEmail/status/${post.statusId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}
