import { useSnapshot } from 'valtio'
import BottomPart from 'components/CreatePost/BottomPart'
import DropDownStore from 'stores/DropDownStore'
import TextArea from 'components/TextArea'
import TextStore from 'stores/TextStore'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const formContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
export default function () {
  const { text } = useSnapshot(TextStore, { sync: true })
  const { selectedAddress } = useSnapshot(DropDownStore)

  const suffix = selectedAddress ? '' : ''
  const maxLength = 280 - suffix.length

  return (
    <div className={formContainer}>
      <TextArea
        text={text}
        placeholder={
          selectedAddress
            ? 'Share you anonymous message...'
            : 'Select the asset to post as first!'
        }
        onTextChange={(newText) => {
          TextStore.text = newText
        }}
        maxLength={maxLength}
        suffix={suffix}
        disabled={!selectedAddress}
      />
      <BottomPart />
    </div>
  )
}
