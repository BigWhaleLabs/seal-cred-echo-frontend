import { LargeText } from 'components/Text'
import Loading from 'components/Loading'
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

interface PostProcessingProps {
  tweetUrl: string
  pending?: boolean
}

export default function ({ tweetUrl, pending }: PostProcessingProps) {
  const statusComponent = pending ? (
    <>
      <ProcessHeader />
      <Loading />
    </>
  ) : (
    <LargeText>Tweet successful</LargeText>
  )

  return (
    <div className={container(pending)}>
      {statusComponent}
      <ViewTweetButton url={tweetUrl} pending={pending} />
    </div>
  )
}
