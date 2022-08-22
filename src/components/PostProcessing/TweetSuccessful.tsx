import { LargeText } from 'components/Text'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'

export default function ({ tweetId }: { tweetId?: number }) {
  return (
    <>
      <LargeText>Tweet successful</LargeText>
      <ViewTweetButton
        url={`https://twitter.com/SealCredEmail/status/${tweetId}`}
      />
    </>
  )
}
