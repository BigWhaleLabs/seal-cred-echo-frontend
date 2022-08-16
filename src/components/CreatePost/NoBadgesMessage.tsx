import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import Button from 'components/Button'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

function NoBadgesMessageSuspended() {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()

  return derivativeAddressesOwned.length ? null : (
    <Button type="primary" title="Create a ZK Badge to Tweet">
      <LinkText
        gradientFrom="from-primary-dark"
        gradientTo="to-primary-dark"
        url="https://sealcred.xyz/app"
      >
        Create a ZK Badge to Tweet
      </LinkText>
    </Button>
  )
}

export default function () {
  return (
    <Suspense fallback={<></>}>
      <NoBadgesMessageSuspended />
    </Suspense>
  )
}
