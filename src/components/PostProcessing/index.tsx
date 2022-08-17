import { LargeText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Loading from 'components/Loading'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import ProcessHeader from 'components/PostProcessing/ProcessHeader'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'

const container = (loading?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    backgroundColor('bg-primary-background'),
    padding('py-6', 'px-9'),
    borderRadius('rounded-2xl'),
    space(loading ? 'space-y-6' : 'space-y-2')
  )

export default function () {
  const { pendingPost, lastProccessedStatusId } = useSnapshot(PostIdsStatuses)

  if (!pendingPost && !lastProccessedStatusId) return null

  const pending = !!pendingPost

  const statusComponent = lastProccessedStatusId ? (
    <LargeText>Tweet successful</LargeText>
  ) : (
    <>
      <ProcessHeader />
      <Loading />
    </>
  )

  return (
    <div className={container(pending)}>
      {statusComponent}
      {lastProccessedStatusId ? (
        <ViewTweetButton
          url={`https://twitter.com/SealCredEmail/status/${lastProccessedStatusId}`}
        />
      ) : pendingPost ? (
        <ViewTweetButton
          url={`/tweets/blockchain#store=${pendingPost.store}&id=${pendingPost.id}`}
          pending
          internal
        />
      ) : null}
    </div>
  )
}
