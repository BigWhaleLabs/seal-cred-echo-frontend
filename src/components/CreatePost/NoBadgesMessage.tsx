import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { width } from 'classnames/tailwind'
import Button from 'components/Button'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

function NoBadgesMessageSuspended() {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  if (derivativeAddressesOwned.length) return null

  return (
    <div className={width('w-fit')}>
      <LinkText url="https://sealcred.xyz/app">
        <Button type="primary" title="Create a ZK Badge to Tweet">
          Create a ZK Badge to Tweet
        </Button>
      </LinkText>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<></>}>
      <NoBadgesMessageSuspended />
    </Suspense>
  )
}
