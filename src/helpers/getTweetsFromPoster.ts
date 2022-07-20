import { TweetModel, TweetsSet } from 'models/TweetModel'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export default async function () {
  const { data } = await axios.get<TweetModel[]>(`${baseURL}/`)
  return data.reduce((acc, tweet) => {
    acc[tweet.tweetId] = tweet.status
    return acc
  }, {} as TweetsSet)
}
