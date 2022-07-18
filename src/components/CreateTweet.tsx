import { HeaderText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Counter from 'components/Counter'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  flexWrap,
  justifyContent,
  margin,
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

export default function () {
  const { text, maxLength, status, currentEmail } = useSnapshot(TwitterStore)
  const { md } = useBreakpoints()

  return (
    <div className={margin('mb-16')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <TextArea
        text={text}
        placeholder="Write something here..."
        onTextChange={(text) => onTweetChange(text)}
        maxLength={maxLength}
        disabled={status.loading}
        footer={currentEmail}
        error={status.error?.message}
      />

      <div className={bottomContainer}>
        <div className={margin('md:mb-0', 'mb-4')}>
          <Suspense fallback={<div>Fetching emails...</div>}>
            <DropDown />
          </Suspense>
        </div>
        <div className={margin('md:ml-20', 'md:mb-0', 'mb-4')}>
          <Counter />
        </div>
        <Button
          type="primary"
          loading={status.loading}
          disabled={!status.isValid || !currentEmail}
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
  )
}
