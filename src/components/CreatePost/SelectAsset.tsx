import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import DropDownStore from 'stores/DropDownStore'
import Dropdown from 'components/Dropdown'
import SelectAssetLoading from 'components/CreatePost/SelectAssetLoading'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useContractSymbols from 'hooks/useContractSymbols'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

export function SelectAssetSuspended() {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  const symbolMap = useContractSymbols(derivativeAddressesOwned)
  const { selectedAddress } = useSnapshot(DropDownStore)

  return (
    <Dropdown
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
        DropDownStore.selectedAddress = selectedValue
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
