import Avatar from 'components/Avatar'
import TweetBody from 'components/Tweet/TweetBody'
import classnames, {
  backgroundColor,
  padding,
  width,
} from 'classnames/tailwind'

const tweetCard = classnames(
  backgroundColor('bg-primary-dark'),
  padding('px-4', 'py-2', 'tiny:py-0'),
  width('w-full')
)

export default function () {
  return (
    <div className={tweetCard}>
      <Avatar />
      <TweetBody />
    </div>
  )
}
