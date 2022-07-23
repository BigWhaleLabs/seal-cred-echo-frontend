import { TweetIdAndStatus, TweetModel } from 'models/TweetModel'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export async function getTweetsFromPoster() {
  const { data } = await axios.get<TweetModel[]>(`${baseURL}/`)
  return data.reduce((acc, tweet) => {
    acc[tweet.tweetId] = tweet
    return acc
  }, {} as TweetIdAndStatus)
}

export async function getTweetsByIdsFromPoster(ids: number[]) {
  const { data } = await axios.post<TweetModel[]>(`${baseURL}/list`, {
    ids,
  })
  return data
}
