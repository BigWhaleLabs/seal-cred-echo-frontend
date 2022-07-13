import { TweetText } from 'components/Text'
import Comment from 'icons/Comment'
import Like from 'icons/Like'
import Retweet from 'icons/Retweet'
import Share from 'icons/Share'
import classnames, {
  alignItems,
  display,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'

const contols = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-between')
)
const controlButton = (withNumber?: boolean) =>
  classnames(
    display('flex'),
    alignItems('items-center'),
    margin('mr-auto'),
    space(withNumber ? 'space-x-1' : undefined)
  )

export default function () {
  return (
    <div className={contols}>
      <div className={controlButton(true)}>
        <Comment />
        <TweetText small color="text-light-grey">
          3
        </TweetText>
      </div>
      <div className={controlButton(true)}>
        <Retweet />
        <TweetText small color="text-light-grey">
          3
        </TweetText>
      </div>
      <div className={controlButton()}>
        <Like liked />
      </div>
      <div className={controlButton()}>
        <Share />
      </div>
    </div>
  )
}
