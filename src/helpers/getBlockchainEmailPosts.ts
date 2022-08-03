import SCPostStorageContract from 'helpers/contracts/SCEmailPostStorageContract'

export default async function () {
  return (await SCPostStorageContract.getAllPosts())
    .map(({ id, post, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      post,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
