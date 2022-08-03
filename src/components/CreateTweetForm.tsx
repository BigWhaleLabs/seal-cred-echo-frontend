import { BodyText, HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import ContractNameStore from 'stores/ContractNameStore'
import DropDown from 'components/DropDown'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import HasNoBadges from 'components/HasNoBadges'
import PostStore from 'stores/PostStore'
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
  const [text, onTweetChange] = useState('')
  const { status, currentPost } = useSnapshot(PostStore)
  const { savedContractSymbols } = useSnapshot(ContractNameStore)

  const suffix = currentPost
    ? currentPost instanceof EmailPost
      ? ` @ ${currentPost.domain}`
      : currentPost instanceof ERC721Post
      ? ` @ ${
          savedContractSymbols[currentPost.derivativeContract] ?? 'loading...'
        }`
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
          onTextChange={onTweetChange}
          maxLength={maxLength}
          suffix={suffix}
          disabled={status.loading}
          error={status.error?.message}
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
                  if (currentPost instanceof EmailPost) {
                    await PostStore.createEmailPost({
                      post: text,
                      domain: currentPost.domain,
                    })
                  } else if (currentPost instanceof ERC721Post) {
                    await PostStore.createERC721Post({
                      post: text,
                      originalContract: currentPost.originalDomain,
                    })
                  }
                  onTweetChange('')
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
