import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import TweetStatusStore from 'stores/TweetStatusStore'

export default async function () {
  return (await SCTwitterLedgerContract.getAllTweets())
    .map(({ id, tweet, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      tweet,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
      status: TweetStatusStore.getTweetStatus(id.toNumber()),
    }))
    .reverse()
}
