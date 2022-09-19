import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import Button from 'components/Button'
import classnames, { borderRadius, width } from 'classnames/tailwind'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

const buttonWrapper = classnames(borderRadius('rounded-full'), width('w-fit'))

function NoBadgesMessageSuspended() {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  if (derivativeAddressesOwned.length) return null

  return (
    <div className={buttonWrapper}>
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
