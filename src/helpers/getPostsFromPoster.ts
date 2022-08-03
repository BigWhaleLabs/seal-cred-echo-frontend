import { PostIdAndStatus, PostStatusModel } from 'models/PostStatusModel'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export async function getPostsFromPoster() {
  const { data } = await axios.get<PostStatusModel[]>(`${baseURL}/`)
  return data.reduce((acc, post) => {
    acc[post.tweetId] = post
    return acc
  }, {} as PostIdAndStatus)
}

export async function getPostsByIdsFromPoster(ids: number[]) {
  const { data } = await axios.post<PostStatusModel[]>(`${baseURL}/list`, {
    ids,
  })
  return data
}
