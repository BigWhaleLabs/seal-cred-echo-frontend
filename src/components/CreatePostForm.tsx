import { BodyText, HeaderText } from 'components/Text'
import { ErrorList, parseError } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import DropDown from 'components/DropDown'
import HasNoBadges from 'components/HasNoBadges'
import PostFormStore from 'stores/PostFormStore'
import TextArea from 'components/TextArea'
import classnames, {
  alignItems,
  display,
  flexGrow,
  flexWrap,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)

const dropdownWrapper = classnames(
  margin('md:mb-0', 'mb-4'),
  display('flex'),
  flexGrow('grow', 'md:grow-0')
)

export default function () {
  const {
    status: { loading, error },
    currentPost,
    text,
  } = useSnapshot(PostFormStore)
  const { savedContractSymbols } = useSnapshot(ContractMetadataStore)

  const contractSymbol =
    currentPost && savedContractSymbols[currentPost.derivative]
  const suffix = ` @ ${contractSymbol ?? 'loading...'}`

  const onTextChange = (newText: string) => (PostFormStore.text = newText)

  const { md } = useBreakpoints()

  const maxLength = 280 - suffix.length

  const isValidForm =
    text.length <= maxLength && text.length > 0 && !!currentPost

  return (
    <div className={space('space-y-6')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <HasNoBadges />
      <div className={space('space-y-4')}>
        <TextArea
          text={text}
          placeholder="Write something here..."
          onTextChange={onTextChange}
          maxLength={maxLength}
          suffix={suffix}
          disabled={loading}
          error={error}
        />
        <div className={space('space-y-2')}>
          <BodyText>Choose a ZK Badge</BodyText>
          <div className={bottomContainer}>
            <div className={dropdownWrapper}>
              <DropDown disabled={loading} />
            </div>
            <Button
              type="primary"
              loading={loading}
              disabled={!isValidForm}
              title="Tweet"
              onClick={() => {
                if (!isValidForm) return
                try {
                  PostFormStore.status.loading = true

                  // await PostStore.createPost(
                  //   text,
                  //   currentPost.original
                  // )
                  console.log('creating post')
                } catch (error) {
                  PostFormStore.status.error = parseError(
                    error,
                    ErrorList.failedPost
                  )
                } finally {
                  PostFormStore.status.loading = false
                }
                onTextChange('')
              }}
              fullWidth={!md}
              center
            >
              Tweet
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
