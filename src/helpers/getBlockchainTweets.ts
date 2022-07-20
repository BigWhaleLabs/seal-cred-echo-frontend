import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'

export default async function () {
  return (await SCTwitterLedgerContract.getAllTweets())
    .map(({ id, tweet, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      tweet,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
