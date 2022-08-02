import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'

export default async function () {
  return (await SCTwitterLedgerContract.getAllPosts())
    .map(({ id, post, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      post,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
