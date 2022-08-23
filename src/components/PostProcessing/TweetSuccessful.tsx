import { LargeText } from 'components/Text'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'

export default function ({
  accountName,
  tweetId,
}: {
  accountName: string
  tweetId?: number
}) {
  return (
    <>
      <LargeText>Tweet successful</LargeText>
      <ViewTweetButton
        url={`https://twitter.com/SealCred${accountName}/status/${tweetId}`}
      />
    </>
  )
}
