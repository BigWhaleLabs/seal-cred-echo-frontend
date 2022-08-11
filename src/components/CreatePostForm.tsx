import { BodyText, HeaderText } from 'components/Text'
import { checkErrorMessage } from 'helpers/handleError'
import {
  getDerivativeFromLedgerWithName,
  getLedgerNameFromLedgerWithName,
  getOriginalFromLedgerWithName,
} from 'helpers/data'
import { processingPostStores } from 'stores/ProcessingPostsStore'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/Button'
import ContractNameStore from 'stores/ContractNameStore'
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
  const [text, onTextChange] = useState('')
  const { status, currentPost } = useSnapshot(PostFormStore)
  const { savedContractSymbols } = useSnapshot(ContractNameStore)

  const suffix = currentPost
    ? `@${savedContractSymbols[getDerivativeFromLedgerWithName(currentPost)]}`
    : 'loading...'

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
                    await processingPostStores[
                      getLedgerNameFromLedgerWithName(currentPost)
                    ].createPost(
                      text,
                      getOriginalFromLedgerWithName(currentPost)
                    )
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
