import { Suspense, memo } from 'react'
import { display } from 'classnames/tailwind'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'

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

function ENSAddress({ address, truncateSize }: ENSAddressProps) {
  return (
    <Suspense
      fallback={
        <span>{truncateMiddleIfNeeded(address, truncateSize || 11)}</span>
      }
    >
      <ENSAddressSuspended
        address={address}
        truncateSize={truncateSize || 11}
        truncate
      />
    </Suspense>
  )
}

export default memo<ENSAddressProps>(({ address, truncateSize }) => {
  return (
    <span>
      <span className={display('block', 'md:hidden')}>
        <ENSAddress address={address} truncateSize={truncateSize || 11} />
      </span>
      <span className={display('hidden', 'md:block', 'lg:hidden')}>
        <ENSAddress address={address} truncateSize={truncateSize || 17} />
      </span>
      <span className={display('hidden', 'lg:block')}>
        <ENSAddress address={address} truncateSize={truncateSize || 25} />
      </span>
    </span>
  )
})
