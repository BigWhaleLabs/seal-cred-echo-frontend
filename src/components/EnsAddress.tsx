import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface EnsAddressProps {
  address: string
  truncateSize?: number
}

function EnsAddressSuspended({
  address,
  truncate,
  truncateSize,
}: EnsAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { ensNames } = useSnapshot(ENSStore)
  const ensName = ensNames[address]
  if (!ensName) ENSStore.fetchEnsName(address)

  return (
    <span>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, truncateSize)
        : ensName && ensName !== null
        ? ensName
        : truncateMiddleIfNeeded(address, truncateSize)}
    </span>
  )
}

export default memo<EnsAddressProps>(({ address, truncateSize }) => {
  const { md, lg } = useBreakpoints()
  const currentTruncateSize = truncateSize ?? md ? (lg ? 25 : 17) : 11
  const truncatedAddress = !lg
    ? truncateMiddleIfNeeded(address, currentTruncateSize)
    : truncateMiddleIfNeeded(address, currentTruncateSize)

  return (
    <Suspense fallback={<span>{truncatedAddress}</span>}>
      <EnsAddressSuspended
        address={address}
        truncateSize={currentTruncateSize}
        truncate={!lg}
      />
    </Suspense>
  )
})
