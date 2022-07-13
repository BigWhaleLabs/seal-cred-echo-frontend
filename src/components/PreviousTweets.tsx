import { BodyText, EmphasizeText, LinkText } from 'components/Text'
import Tweet from 'components/Tweet'
import classnames, {
  display,
  flexDirection,
  justifyContent,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const prevTweets = classnames(width('w-full'))
const prevTweetsHeader = classnames(
  display('flex'),
  flexDirection('flex-col', 'tiny:flex-row'),
  space('space-y-2', 'tiny:space-y-0'),
  justifyContent('justify-start', 'tiny:justify-between'),
  padding('px-4', 'tiny:px-0')
)
const prevTweetsBody = classnames()

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
        <Tweet />
      </div>
    </div>
  )
}
