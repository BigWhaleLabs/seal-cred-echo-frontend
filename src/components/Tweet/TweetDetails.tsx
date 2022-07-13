import { TweetText } from 'components/Text'
import classnames, { alignItems, display, space } from 'classnames/tailwind'

const tweetDetail = classnames(
  display('flex'),
  space('space-x-1'),
  alignItems('items-center')
)

export default function () {
  return (
    <div className={tweetDetail}>
      <TweetText bold>☻</TweetText>
      <TweetText small color="text-light-grey">
        @SealCredWork
      </TweetText>
      <TweetText small color="text-light-grey">
        ·
      </TweetText>
      <TweetText small color="text-light-grey">
        1d
      </TweetText>
    </div>
  )
}
