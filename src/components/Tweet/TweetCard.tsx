import Avatar from 'components/Avatar'
import TweetBody from 'components/Tweet/TweetBody'
import classnames, {
  backgroundColor,
  borderColor,
  borderWidth,
  display,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const tweetCard = classnames(
  display('flex'),
  space('space-x-2.5'),
  backgroundColor('bg-primary-dark'),
  padding('px-4', 'py-2.5'),
  width('w-full'),
  borderWidth('border-b', 'last:border-b-0'),
  borderColor('border-dark-grey')
)

export default function () {
  return (
    <div className={tweetCard}>
      <Avatar />
      <TweetBody />
    </div>
  )
}
