import { ErrorText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TweeterStore from 'stores/TweeterStore'

export default function () {
  const { text, length, status } = useSnapshot(TweeterStore)

  return (
    <div>
      <TextArea
        text={text}
        placeholder="Write something here..."
        onTextChange={(text) => (TweeterStore.text = text)}
        maxLength={length}
        disabled={status.loading}
        footer={
          status.error ? <ErrorText>{status.error}</ErrorText> : undefined
        }
      />
      <Button
        loading={status.loading}
        disabled={!status.isValid}
        title="Tweet"
        onClick={() => {
          TweeterStore.tweet(text)
          TweeterStore.status.success = true
        }}
      />
      <DropDown />
    </div>
  )
}
