import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import EnsStore from 'stores/EnsStore'
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
  const { ensNames } = useSnapshot(EnsStore)
  const ensName = ensNames[address]
  if (!ensName) EnsStore.fetchEnsName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, truncateSize)
        : ensName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

export default memo<EnsAddressProps>(({ address, truncateSize }) => {
  const { md, lg } = useBreakpoints()
  const currentTruncateSize = truncateSize ?? md ? (lg ? 25 : 17) : 11

  return (
    <Suspense
      fallback={
        <>
          {!lg
            ? truncateMiddleIfNeeded(address, currentTruncateSize)
            : truncateMiddleIfNeeded(address, currentTruncateSize)}
        </>
      }
    >
      <EnsAddressSuspended
        address={address}
        truncateSize={currentTruncateSize}
        truncate={!lg}
      />
    </Suspense>
  )
})
