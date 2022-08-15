import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Dropdown from 'components/Dropdown'
import PostFormStore from 'stores/PostFormStore'
import SelectAssetLoading from 'components/CreatePost/SelectAssetLoading'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useContractSymbols from 'hooks/useContractSymbols'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

export function SelectAssetSuspended() {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  const symbolMap = useContractSymbols(derivativeAddressesOwned)
  const { selectedAddress } = useSnapshot(PostFormStore)

  return (
    <Dropdown
      currentValue={selectedAddress}
      placeholder="Select an asset..."
      options={derivativeAddressesOwned.map((address) => ({
        value: address,
        label: symbolMap[address] || truncateMiddleIfNeeded(address, 8),
      }))}
      onChange={(selectedValue) => {
        PostFormStore.selectedAddress = selectedValue
      }}
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<SelectAssetLoading />}>
      <SelectAssetSuspended />
    </Suspense>
  )
}
