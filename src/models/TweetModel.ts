import TweetStatus from 'models/TweetStatus'

export interface TweetModel {
  id: number
  status: TweetStatus
  statusId?: number
}

export interface TweetIdAndStatus {
  [id: number]: TweetModel
}
