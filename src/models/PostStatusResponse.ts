import PostStatus from 'models/PostStatus'

export default interface PostStatusResponse {
  tweetId: number
  status: PostStatus
  statusId?: number
}
