import { Suspense } from 'preact/compat'
import Dropdown from 'components/Dropdown'
import SelectAssetLoading from 'components/CreatePost/SelectAssetLoading'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useContractSymbols from 'hooks/useContractSymbols'
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
  const symbolMap = useContractSymbols(derivativeAddressesOwned)

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
        label: symbolMap[address] || truncateMiddleIfNeeded(address, 8),
      }))}
      onChange={(selectedValue) => {
        onSelect(selectedValue)
      }}
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
