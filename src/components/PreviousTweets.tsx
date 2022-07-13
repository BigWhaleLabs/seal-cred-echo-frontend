import { BodyText, EmphasizeText, LinkText } from 'components/Text'
import TweetCard from 'components/Tweet/TweetCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const prevTweets = classnames(width('w-full'), space('space-y-4'))
const prevTweetsHeader = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  space('space-y-2', 'sm:space-y-0'),
  alignItems('items-start', 'sm:items-center'),
  justifyContent('justify-start', 'sm:justify-between'),
  padding('px-4', 'body:px-0')
)
const prevTweetsBody = classnames(display('flex'), flexDirection('flex-col'))

export default function () {
  return (
    <div className={prevTweets}>
      <div className={prevTweetsHeader}>
        <BodyText>
          <EmphasizeText bold>Tweets</EmphasizeText> by{' '}
          <LinkText url="https://sealc.red" color="text-primary">
            @SealCredWork
          </LinkText>
        </BodyText>
        <LinkText url="https://sealc.red" color="text-primary">
          View all on blockchain
        </LinkText>
      </div>
      <div className={prevTweetsBody}>
        <TweetCard />
      </div>
    </div>
  )
}
