import TweetModel from 'models/TweetModel'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_TWITTER_POSTER_URL}/tweets`

export default async function () {
  const { data } = await axios.get<TweetModel[]>(`${baseURL}/`)
  console.log('Get tweets from TwitterPoster:', data)
  return data
}
