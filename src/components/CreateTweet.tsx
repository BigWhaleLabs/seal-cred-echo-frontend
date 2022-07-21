import { HeaderText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TweetProcessing from 'components/TweetProcessing'
import TweetStatusStore from 'stores/TweetStatusStore'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  flexGrow,
  flexWrap,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)

const onTweetChange = (text: string) => {
  TwitterStore.status.isValid = !!text.length
  TwitterStore.text = text
}

const dropdownWrapper = classnames(
  margin('md:mb-0', 'mb-4'),
  display('flex'),
  flexGrow('grow', 'md:grow-0')
)

export default function () {
  const { text, maxLength, status, currentDomainAddress } =
    useSnapshot(TwitterStore)
  const { currentUserTweet } = useSnapshot(TweetStatusStore)
  const { md } = useBreakpoints()

  return (
    <div className={margin('mb-16')}>
      {currentUserTweet?.status === 'pending' ? (
        <TweetProcessing loading title="Your tweet is processing" />
      ) : (
        <div className={space('space-y-12')}>
          {currentUserTweet?.status === 'approved' && (
            <TweetProcessing title="Tweet successful" />
          )}
          <HeaderText>Create your anonymous tweet</HeaderText>
          <TextArea
            text={text}
            placeholder="Write something here..."
            onTextChange={(text) => onTweetChange(text)}
            maxLength={maxLength}
            disabled={status.loading}
            error={status.error?.message}
          />
          <div className={bottomContainer}>
            <div className={dropdownWrapper}>
              <Suspense fallback={<div>Fetching emails...</div>}>
                <DropDown />
              </Suspense>
            </div>
            <Button
              type="primary"
              loading={status.loading}
              disabled={!status.isValid || !currentDomainAddress}
              title="Tweet"
              onClick={() => {
                TwitterStore.createTweet()
              }}
              fullWidth={!md}
              center
            >
              Tweet
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
