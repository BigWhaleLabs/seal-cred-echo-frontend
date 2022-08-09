import PostIdToStatusResponse from 'models/PostIdToStatusResponse'
import PostStatusResponse from 'models/PostStatusResponse'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export async function getPostsFromPoster(contractAddress: string) {
  const { data } = await axios.get<PostStatusResponse[]>(
    `${baseURL}/${contractAddress}`
  )
  return data.reduce((acc, post) => {
    acc[post.tweetId] = post
    return acc
  }, {} as PostIdToStatusResponse)
}

export async function getPostsByIdsFromPoster(
  ids: number[],
  contractAddress: string
) {
  const { data } = await axios.post<PostStatusResponse[]>(
    `${baseURL}/${contractAddress}/list`,
    {
      ids,
    }
  )
  return data
}
