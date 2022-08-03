import SCEmailPostsContract from 'helpers/contracts/SCEmailPostsContract'

export default async function () {
  return (await SCEmailPostsContract.getAllPosts())
    .map(({ id, post, derivativeAddress, sender, timestamp }) => ({
      id: id.toNumber(),
      post,
      derivativeAddress,
      sender,
      timestamp: timestamp.toNumber(),
    }))
    .reverse()
}
