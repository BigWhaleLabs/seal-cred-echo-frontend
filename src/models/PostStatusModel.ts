import PostStatus from 'models/PostStatus'

export interface PostStatusModel {
  tweetId: number
  status: PostStatus
  statusId?: number
}

export interface PostIdAndStatus {
  [id: number]: PostStatusModel
}
