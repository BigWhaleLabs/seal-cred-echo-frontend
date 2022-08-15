import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import BottomPart from 'components/CreatePost/BottomPart'
import NoBadgesMessage from 'components/CreatePost/NoBadgesMessage'
import PostFormStore from 'stores/PostFormStore'
import TextArea from 'components/TextArea'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6')
)
const formContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
export default function () {
  const { text, selectedAddress } = useSnapshot(PostFormStore, { sync: true })

  const suffix = selectedAddress ? '' : ''
  const maxLength = 280 - suffix.length

  return (
    <div className={container}>
      <HeaderText>Create an anonymous tweet</HeaderText>
      <NoBadgesMessage />
      <div className={formContainer}>
        <TextArea
          text={text}
          placeholder={
            selectedAddress
              ? 'Share you anonymous message...'
              : 'Select the asset to post as first!'
          }
          onTextChange={(text) => {
            PostFormStore.text = text
          }}
          maxLength={maxLength}
          suffix={suffix}
          disabled={!selectedAddress}
        />
        <BottomPart />
      </div>
    </div>
  )
}
