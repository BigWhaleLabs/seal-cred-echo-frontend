import { BodyText, HeaderText } from 'components/Text'
import {
  ERC721ProcessingPostsStore,
  EmailProcessingPostsStore,
  ExternalERC721ProcessingPostsStore,
} from 'stores/ProcessingPostsStore'
import { checkErrorMessage } from 'helpers/handleError'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import DropDown from 'components/DropDown'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import ExternalERC721Post from 'helpers/posts/ExternalERC721Post'
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
  const [text, onTextChange] = useState('')
  const { status, currentPost } = useSnapshot(PostFormStore)
  const { savedContractSymbols } = useSnapshot(ContractMetadataStore)

  const suffix = currentPost
    ? currentPost instanceof EmailPost
      ? ` @ ${currentPost.original}`
      : currentPost instanceof ERC721Post ||
        currentPost instanceof ExternalERC721Post
      ? ` @ ${savedContractSymbols[currentPost.derivative] ?? 'loading...'}`
      : ''
    : ''

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
          disabled={status.loading}
          error={status.error}
        />
        <div className={space('space-y-2')}>
          <BodyText>Choose a ZK Badge</BodyText>
          <div className={bottomContainer}>
            <div className={dropdownWrapper}>
              <DropDown disabled={status.loading} />
            </div>
            <Button
              type="primary"
              loading={status.loading}
              disabled={!isValidForm}
              title="Tweet"
              onClick={async () => {
                if (isValidForm) {
                  try {
                    PostFormStore.status = {
                      loading: true,
                    }
                    switch (currentPost.constructor) {
                      case EmailPost:
                        await EmailProcessingPostsStore.createPost(
                          text,
                          currentPost.original
                        )
                        break
                      case ERC721Post:
                        await ERC721ProcessingPostsStore.createPost(
                          text,
                          currentPost.original
                        )
                        break
                      case ExternalERC721Post:
                        await ExternalERC721ProcessingPostsStore.createPost(
                          text,
                          currentPost.original
                        )
                        break
                    }
                  } catch (error) {
                    const parsedError =
                      error instanceof Error
                        ? checkErrorMessage(error)
                        : new Error('Failed to create post')

                    PostFormStore.status.error = parsedError
                  } finally {
                    PostFormStore.status.loading = false
                  }
                  onTextChange('')
                }
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
