import { BodyText } from 'components/Text'
import { ErrorList, handleError } from '@big-whale-labs/frontend-utils'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import DataKeys from 'models/DataKeys'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStatus from 'models/PostStatus'
import PostStore from 'stores/PostStore'
import SelectAsset from 'components/CreatePost/SelectAsset'
import TextArea from 'components/TextArea'
import WalletStore from 'stores/WalletStore'
import catchUnhandledRejection from 'hooks/catchUnhandledRejection'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  width,
} from 'classnames/tailwind'
import getOriginalFromDerivative from 'helpers/getOriginalFromDerivative'

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
  catchUnhandledRejection((error: unknown) => {
    handleError(new Error(ErrorList.failedPost))
    setLoading(false)
    setError(error)
  })

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
                if (!WalletStore.account) throw new Error(ErrorList.noProvider)

                const submitText = text

                const { ledgerType, original } =
                  await getOriginalFromDerivative(selectedAddress)

                const result = await WalletStore.createPost({
                  text: submitText,
                  ledgerType,
                  original,
                })

                const posts = await PostStore.posts[ledgerType]
                const numberOfPosts = await PostStore.postsAmount[ledgerType]
                PostStore.postsAmount[ledgerType] = Promise.resolve(
                  numberOfPosts + result.length
                )
                for (const {
                  id,
                  post,
                  derivativeAddress,
                  sender,
                  timestamp,
                } of result) {
                  PostStore.posts[ledgerType] = Promise.resolve([
                    {
                      id,
                      post,
                      derivativeAddress,
                      sender,
                      timestamp,
                    } as PostStructOutput,
                    ...posts,
                  ])

                  const blockchainId = id.toNumber()
                  const store = ledgerType as DataKeys
                  PostIdsStatuses.lastUserPost = {
                    [WalletStore.account]: {
                      store,
                      blockchainId,
                      status: PostStatus.pending,
                    },
                    ...PostIdsStatuses.lastUserPost,
                  }

                  PostIdsStatuses.statuses[store][blockchainId] =
                    Promise.resolve({
                      status: PostStatus.pending,
                    })

                  setText('')
                }
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
