import TweetStatus from 'models/TweetStatus'

export interface TweetModel {
  tweetId: number
  status: TweetStatus
  statusId?: number
}

export interface TweetIdAndStatus {
  [id: number]: TweetModel
}
