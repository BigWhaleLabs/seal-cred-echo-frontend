import { GeneralContractsStore } from 'stores/ContractStore'
import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Counter from 'components/Counter'
import DropDown from 'components/DropDown'
import SealCredStore from 'stores/SealCredStore'
import TextArea from 'components/TextArea'
import TweeterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  flexWrap,
  justifyContent,
  margin,
} from 'classnames/tailwind'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'
import useContractsOwned from 'hooks/useContractsOwned'

const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)

export default function () {
  const { emailDerivativeContracts } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned(GeneralContractsStore)
  const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )
  console.log(
    contractsOwned,
    emailDerivativeContracts,
    ownedEmailDerivativeContracts
  )

  const { text, maxLength, status, availableEmails } = useSnapshot(TweeterStore)
  const { md } = useBreakpoints()

  const currentEmailWithoutAt = availableEmails[0].substring(
    1,
    availableEmails[0].length
  )

  return (
    <div className={margin('mb-16')}>
      <HeaderText>Create your anonymous tweet</HeaderText>
      <TextArea
        text={text}
        placeholder="Write something here..."
        onTextChange={(text) => (TweeterStore.text = text)}
        maxLength={maxLength}
        disabled={status.loading}
        footer={truncateMiddleIfNeeded(currentEmailWithoutAt, 12)}
        error={status.error?.message}
      />

      <div className={bottomContainer}>
        <div className={margin('md:mb-0', 'mb-4')}>
          <DropDown ownedContracts={ownedEmailDerivativeContracts} />
        </div>
        <div className={margin('md:ml-20', 'md:mb-0', 'mb-4')}>
          <Counter />
        </div>
        <Button
          type="primary"
          loading={status.loading}
          disabled={!status.isValid}
          title="Tweet"
          onClick={() => {
            TweeterStore.tweet()
            TweeterStore.status.success = true
          }}
          fullWidth={!md}
          center
        >
          Tweet
        </Button>
      </div>
    </div>
  )
}
