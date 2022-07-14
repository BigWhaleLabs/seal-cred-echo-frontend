import { ErrorText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Counter from 'components/Counter'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TweeterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  justifyContent,
  margin,
  space,
  zIndex,
} from 'classnames/tailwind'

const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
)
const rightBlockWrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-4')
)

export default function () {
  const { text, length, status } = useSnapshot(TweeterStore)

  return (
    <div className={zIndex('z-20')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <div className={margin('my-5')}>
        <TextArea
          text={text}
          placeholder="Write something here..."
          onTextChange={(text) => (TweeterStore.text = text)}
          maxLength={length}
          disabled={status.loading}
          footer={
            status.error ? <ErrorText>{status.error}</ErrorText> : undefined
          }
          spellcheck={true}
        />
      </div>

      <div className={bottomContainer}>
        <DropDown />
        <div className={rightBlockWrapper}>
          <Counter text={text} maxLength={length} />
          <Button
            primary
            loading={status.loading}
            disabled={!status.isValid}
            title="Tweet"
            onClick={() => {
              TweeterStore.tweet()
              TweeterStore.status.success = true
            }}
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  )
}
