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
  selectedAddress,
  onSelect,
}: SelectAssetProps) {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  const namesMap = useContractNames(derivativeAddressesOwned)

  return (
    <Dropdown
      disabled={disabled}
      currentValue={selectedAddress}
      placeholder={
        derivativeAddressesOwned.length
          ? 'Select an asset...'
          : 'No ZK badges in this wallet'
      }
      options={derivativeAddressesOwned.map((address) => ({
        value: address,
        label: namesMap[address] || truncateMiddleIfNeeded(address, 8),
      }))}
      onChange={(selectedValue) => {
        onSelect(selectedValue)
      }}
      forZkBadges
    />
  )
}

export default function ({
  disabled,
  selectedAddress,
  onSelect,
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
