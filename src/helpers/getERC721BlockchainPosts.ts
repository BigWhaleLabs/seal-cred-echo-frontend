import SCERC721PostsContract from 'helpers/contracts/SCERC721PostsContract'

export default async function () {
  return (await SCERC721PostsContract.getAllPosts())
    .map(({ id, post, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      post,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
