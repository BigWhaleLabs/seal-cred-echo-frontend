import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import DropDownStore from 'stores/DropDownStore'
import PostStore from 'stores/PostStore'
import SelectAsset from 'components/CreatePost/SelectAsset'
import TextStore from 'stores/TextStore'
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
  const { mintLoading } = useSnapshot(WalletStore)
  const { selectedAddress } = useSnapshot(DropDownStore)
  const { text } = useSnapshot(TextStore)

  return (
    <div className={container}>
      <BodyText>Choose a ZK Badge</BodyText>
      <div className={bottomContainer}>
        <SelectAsset />
        <Button
          type="primary"
          title="Tweet"
          disabled={!selectedAddress || !text}
          loading={mintLoading}
          onClick={async () => {
            WalletStore.mintLoading = true
            try {
              const result = await PostStore.savePost({
                text,
                derivativeAddress: selectedAddress,
              })
              // TODO: handle result to posts list
              console.log(result)
              TextStore.text = ''
            } catch (error) {
              handleError(error)
            } finally {
              WalletStore.mintLoading = false
            }
          }}
        >
          Tweet!
        </Button>
      </div>
    </div>
  )
}
