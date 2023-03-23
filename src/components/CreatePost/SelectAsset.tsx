import { Suspense } from 'preact/compat'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import Dropdown from 'components/Dropdown'
import SelectAssetLoading from 'components/CreatePost/SelectAssetLoading'
import useContractNames from 'hooks/useContractNames'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

interface SelectAssetProps {
  disabled: boolean
  selectedAddress: string
  onSelect: (address: string) => void
}

export function SelectAssetSuspended({
  disabled,
  onSelect,
  selectedAddress,
}: SelectAssetProps) {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  const namesMap = useContractNames(derivativeAddressesOwned)

  const hasDerivatives = derivativeAddressesOwned.length

  return (
    <Dropdown
      forZkBadges
      currentValue={selectedAddress}
      disabled={disabled}
      removeArrow={!hasDerivatives}
      options={derivativeAddressesOwned.map((address) => ({
        label: namesMap[address] || truncateMiddleIfNeeded(address, 8),
        value: address,
      }))}
      placeholder={
        hasDerivatives ? 'Select an asset...' : 'No ZK badges in this wallet'
      }
      onChange={(selectedValue) => {
        onSelect(selectedValue)
      }}
    />
  )
}

export default function ({
  disabled,
  onSelect,
  selectedAddress,
}: SelectAssetProps) {
  return (
    <Suspense fallback={<SelectAssetLoading />}>
      <SelectAssetSuspended
        disabled={disabled}
        selectedAddress={selectedAddress}
        onSelect={onSelect}
      />
    </Suspense>
  )
}
