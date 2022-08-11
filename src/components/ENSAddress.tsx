import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface ENSAddressProps {
  address: string
  truncateSize?: number
}

function ENSAddressSuspended({
  address,
  truncate,
  truncateSize,
}: ENSAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { eNSNames } = useSnapshot(ENSStore)
  const eNSName = eNSNames[address]
  if (!eNSName) ENSStore.fetchENSName(address)

  return (
    <span>
      {truncate
        ? truncateMiddleIfNeeded(eNSName || address, truncateSize)
        : eNSName && eNSName !== null
        ? eNSName
        : truncateMiddleIfNeeded(address, truncateSize)}
    </span>
  )
}

export default memo<ENSAddressProps>(({ address, truncateSize }) => {
  const { md, lg } = useBreakpoints()
  const currentTruncateSize = truncateSize ?? md ? (lg ? 25 : 17) : 11
  const truncatedAddress = !lg
    ? truncateMiddleIfNeeded(address, currentTruncateSize)
    : truncateMiddleIfNeeded(address, currentTruncateSize)

  return (
    <Suspense fallback={<span>{truncatedAddress}</span>}>
      <ENSAddressSuspended
        address={address}
        truncateSize={currentTruncateSize}
        truncate={!lg}
      />
    </Suspense>
  )
})
