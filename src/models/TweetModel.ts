import TweetStatus from 'models/TweetStatus'

export interface TweetModel {
  tweetId: number
  status: TweetStatus
}

export interface TweetsSet {
  [id: number]: TweetStatus
}
