import { LargeText } from 'components/Text'
import DataKeys from 'models/DataKeys'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'
import data from 'data'

export default function ({
  storeName,
  serviceId,
}: {
  storeName: string
  serviceId?: number
}) {
  storeName = data[storeName as DataKeys].twitter

  return (
    <>
      <LargeText>Tweet successful</LargeText>
      <ViewTweetButton
        url={`https://twitter.com/${storeName}/status/${serviceId}`}
      />
    </>
  )
}
