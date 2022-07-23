import { TweetIdAndStatus, TweetModel } from 'models/TweetModel'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export async function getTweetsFromPoster() {
  const { data } = await axios.get<TweetModel[]>(`${baseURL}/`)
  return data.reduce((acc, tweet) => {
    acc[tweet.tweetId] = tweet.status
    return acc
  }, {} as TweetIdAndStatus)
}

export async function getTweetFromPoster(id: number) {
  const { data } = await axios.get<TweetModel | null>(`${baseURL}/${id}`)
  return data
}
