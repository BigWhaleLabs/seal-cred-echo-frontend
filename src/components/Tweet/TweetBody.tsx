import TweetDetails from 'components/Tweet/TweetDetails'
import classnames, { space } from 'classnames/tailwind'

const tweetBody = classnames(space('space-y-3'))
const tweetDetails = classnames(space('space-y-1'))

export default function () {
  return (
    <div className={tweetBody}>
      <div className={tweetDetails}>
        <TweetDetails />
        <div>TweetText</div>
      </div>

      <div>TweetControl</div>
    </div>
  )
}
