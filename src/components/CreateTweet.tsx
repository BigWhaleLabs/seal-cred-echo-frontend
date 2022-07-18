import { HeaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import Counter from 'components/Counter'
import DropDown from 'components/DropDown'
import TextArea from 'components/TextArea'
import TweeterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  display,
  flexWrap,
  justifyContent,
  margin,
} from 'classnames/tailwind'
// import defaultProvider from 'helpers/defaultProvider'
// import getEmailLedger from 'helpers/getEmailLedger'
// import getOwnedERC721 from 'helpers/getOwnedERC721'
// import getSCEmailLedgerContract from 'helpers/getSCEmailLedgerContract'
import { ContractsStore } from 'stores/ContractStore'
import SCEmailLedgerContract from 'helpers/SCEmailLedgerContract'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
import getEmailLedger from 'helpers/getEmailLedger'
import getOwnedERC721 from 'helpers/getOwnedERC721'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'
import useContractsOwned from 'hooks/useContractsOwned'

const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)

const connect = async () => {
  // const emailLedgerContracts = SCEmailLedgerContract(defaultProvider)
  const emailLedger = await getEmailLedger(SCEmailLedgerContract)
  const con = Object.values(emailLedger).map(
    ({ derivativeContract }) => derivativeContract
  )
  const lastBlock = await defaultProvider.getBlockNumber()
  console.log('Last block:', lastBlock)
  if (!WalletStore.account) return
  const owned = await getOwnedERC721(
    WalletStore.account,
    0,
    lastBlock,
    {},
    new Set<string>()
  )
  const contractsOwned = Object.keys(owned)
  const ownedEmailDerivativeContracts = con.filter((contractAddress) =>
    contractsOwned.includes(contractAddress)
  )

  console.log(ownedEmailDerivativeContracts)
}

export default function () {
  const { emailDerivativeContracts } = useSnapshot(SealCredStore)
  // const contractsOwned = useContractsOwned(ContractsStore)
  // const { addressToTokenIds = {} } = useSnapshot(ContractsStore)
  const contractsOwned = useContractsOwned(ContractsStore)
  const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
    (contractAddress) => contractsOwned.includes(contractAddress)
  )

  // console.log(addressToTokenIds)
  // const ownedEmailDerivativeContracts = emailDerivativeContracts.filter(
  //   (contractAddress) =>
  //     Object.keys(addressToTokenIds).includes(contractAddress)
  // )
  console.log(emailDerivativeContracts, ownedEmailDerivativeContracts)

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
          onClick={async () => {
            // TweeterStore.tweet()
            // TweeterStore.status.success = true
            await connect()
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
