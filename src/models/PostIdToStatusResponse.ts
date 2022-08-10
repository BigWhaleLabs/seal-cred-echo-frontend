import PostStatusResponse from 'models/PostStatusResponse'

export default interface PostIdToStatusResponse {
  [id: number]: PostStatusResponse
}
