import Loading from 'components/Loading'
import ProcessHeader from 'components/PostProcessing/ProcessHeader'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'

export default function ({ blockchainLink }: { blockchainLink: string }) {
  return (
    <>
      <ProcessHeader />
      <Loading />
      <ViewTweetButton url={blockchainLink} pending internal />
    </>
  )
}
