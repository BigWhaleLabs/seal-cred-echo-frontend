import { HeaderText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Counter from 'components/Counter'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TweeterStore from 'stores/TwitterStore'
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

export default function () {
  const { text, maxLength, status, currentEmail } = useSnapshot(TweeterStore)
  const { md } = useBreakpoints()

  return (
    <div className={margin('mb-16')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <TextArea
        text={text}
        placeholder="Write something here..."
        onTextChange={(text) => (TweeterStore.text = text)}
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
          disabled={!status.isValid || !currentEmail || !text.length}
          title="Tweet"
          onClick={() => {
            TweeterStore.tweet()
            TweeterStore.status.success = true
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
