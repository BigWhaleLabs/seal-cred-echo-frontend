import { TweetText } from 'components/Text'
import TweetControls from 'components/Tweet/TweetControls'
import TweetDetails from 'components/Tweet/TweetDetails'
import TweetHashTag from 'components/Tweet/TweetHashTag'
import classnames, {
  display,
  flex,
  flexDirection,
  space,
} from 'classnames/tailwind'

const tweetBody = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flex('flex-1'),
  space('space-y-3')
)
const tweetDetails = classnames(space('space-y-1'))

export default function () {
  const tags = ['VerifiedToWorkAt', 'Amazon']

  return (
    <div className={tweetBody}>
      <div className={tweetDetails}>
        <TweetDetails />
        <TweetText small>
          Layoffs are coming. Bezos says he wants to buy another house in aruba,
          so he needs to cut staff by 7% <TweetHashTag tags={tags} />
        </TweetText>
      </div>
      <TweetControls />
    </div>
  )
}
