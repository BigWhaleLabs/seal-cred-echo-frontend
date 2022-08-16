import { BodyText } from 'components/Text'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import SelectAsset from 'components/CreatePost/SelectAsset'
import TextArea from 'components/TextArea'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'
import handleError from 'helpers/handleError'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)

export default function () {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')

  return (
    <div className={container}>
      <TextArea
        text={text}
        placeholder={
          selectedAddress
            ? 'Share you anonymous message...'
            : 'Select the asset to post as first!'
        }
        onTextChange={(newText) => {
          setText(newText)
        }}
        currentAddress={selectedAddress}
        disabled={!selectedAddress || loading}
      />
      <div className={container}>
        <BodyText>Choose a ZK Badge</BodyText>
        <div className={bottomContainer}>
          <SelectAsset
            disabled={loading}
            selectedAddress={selectedAddress}
            onSelect={(address) => {
              setSelectedAddress(address)
            }}
          />
          <Button
            type="primary"
            title="Tweet"
            disabled={!selectedAddress || !text}
            loading={loading}
            onClick={async () => {
              setLoading(true)
              try {
                const result = await WalletStore.createPost({
                  text,
                  derivativeAddress: selectedAddress,
                })
                // TODO: handle result to posts list
                console.log(result)
                setText('')
              } catch (error) {
                handleError(error)
              } finally {
                setLoading(false)
              }
            }}
          >
            Tweet!
          </Button>
        </div>
      </div>
    </div>
  )
}
