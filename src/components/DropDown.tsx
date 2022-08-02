import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import SealCredStore from 'stores/SealCredStore'
import SelectDropdown from 'components/SelectDropdown'
import TwitterStore from 'stores/TwitterStore'
import useContractsOwned from 'hooks/useContractsOwned'

export function DropDown({ disabled }: { disabled?: boolean }) {
  const { emailLedger } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedEmailDerivativeContracts = Object.values(emailLedger).filter(
    ({ derivativeContract }) => contractsOwned.includes(derivativeContract)
  )

  const { currentDomain } = useSnapshot(TwitterStore)

  return (
    <SelectDropdown
      disabled={disabled}
      border
      current={currentDomain || ''}
      options={ownedEmailDerivativeContracts.map(
        ({ derivativeContract, domain }) => ({
          label: domain,
          value: derivativeContract,
        })
      )}
      OptionElement={({ value }) => <ContractName clearType address={value} />}
      onChange={({ label }) => (TwitterStore.currentDomain = label)}
    />
  )
}

export default function ({ disabled }: { disabled?: boolean }) {
  return (
    <Suspense
      fallback={<SelectDropdown border loading current="" options={[]} />}
    >
      <DropDown disabled={disabled} />
    </Suspense>
  )
}
