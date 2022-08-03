import SCExternalERC721PostStorageContract from 'helpers/contracts/SCExternalERC721PostStorageContract'

export default async function () {
  return (await SCExternalERC721PostStorageContract.getAllPosts())
    .map(({ id, post, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      post,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
