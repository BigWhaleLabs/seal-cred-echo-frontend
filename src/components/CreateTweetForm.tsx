import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
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

const dropdownWrapper = classnames(
  margin('md:mb-0', 'mb-4'),
  display('flex'),
  flexGrow('grow', 'md:grow-0')
)

export default function () {
  const [text, onTweetChange] = useState('')
  const { status, currentDomain } = useSnapshot(TwitterStore)

  const { md } = useBreakpoints()

  const hashtags = currentDomain
    ? ` @ ${currentDomain
        .split('.')
        .slice(0, -1)
        .join('.')}\u2024${currentDomain.split('.').pop()}`
    : ''
  const maxLength = 280 - hashtags.length

  const isValidForm =
    text.length <= maxLength && text.length > 0 && !!currentDomain

  return (
    <div className={space('space-y-6')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <div className={space('space-y-4')}>
        <TextArea
          text={text}
          placeholder="Write something here..."
          onTextChange={onTweetChange}
          maxLength={maxLength}
          hashtags={hashtags}
          disabled={status.loading}
          error={status.error?.message}
        />
        <div className={bottomContainer}>
          <div className={dropdownWrapper}>
            <DropDown disabled={status.loading} />
          </div>
          <Button
            type="primary"
            loading={status.loading}
            disabled={!isValidForm}
            title="Tweet"
            onClick={async () => {
              if (isValidForm) {
                await TwitterStore.createTweet({
                  tweet: text,
                  domain: currentDomain,
                })
                onTweetChange('')
              }
            }}
            fullWidth={!md}
            center
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  )
}
