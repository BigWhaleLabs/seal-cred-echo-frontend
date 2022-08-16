import { BodyText } from 'components/Text'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import SelectAsset from 'components/CreatePost/SelectAsset'
import TextArea from 'components/TextArea'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  width,
} from 'classnames/tailwind'
import handleError, { ErrorList } from 'helpers/handleError'
import postStore from 'stores/PostStore'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)
const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  width('w-full'),
  alignItems('items-center'),
  gap('gap-y-4'),
  flexDirection('md:flex-row', 'flex-col')
)

export default function () {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [error, setError] = useState<unknown>(null)
  // suffix sets from SuffixBlock when found
  const [suffix, setSuffix] = useState('')

  const maxLength = 280 - suffix.length
  const postInvalid = text.length > maxLength

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
        setSuffix={setSuffix}
        maxLength={maxLength}
        currentAddress={selectedAddress}
        disabled={!selectedAddress || loading}
        error={error}
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
            disabled={!selectedAddress || !text || postInvalid}
            loading={loading}
            onClick={async () => {
              setLoading(true)
              setError(null)
              try {
                const submitText = text + suffix

                const result = await WalletStore.createPost({
                  text: submitText,
                  derivativeAddress: selectedAddress,
                })

                const posts = await postStore.posts

                for (const data of result) {
                  const { id, post, derivativeAddress, sender, timestamp } =
                    data

                  posts.unshift({
                    id,
                    post,
                    derivativeAddress,
                    sender,
                    timestamp,
                  } as PostStructOutput)
                }
                setText('')
              } catch (error) {
                setError(error)
                handleError(new Error(ErrorList.failedPost))
              } finally {
                setLoading(false)
              }
            }}
            fullWidthOnMobile
            center
          >
            Tweet!
          </Button>
        </div>
      </div>
    </div>
  )
}
