import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import TweetStore from 'stores/TweetStore'

export default async function () {
  return (await SCTwitterLedgerContract.getAllTweets())
    .map(({ id, tweet, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      tweet,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
      status: TweetStore.getTweetStatus(id.toNumber()),
    }))
    .reverse()
}
