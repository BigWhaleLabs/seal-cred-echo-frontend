import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'

function HasNoBadgesSuspended() {
  const { emailLedger } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedEmailDerivativeContracts = Object.values(emailLedger).filter(
    ({ derivativeContract }) => contractsOwned.includes(derivativeContract)
  )

  if (ownedEmailDerivativeContracts.length) return null

  return (
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
      <HasNoBadgesSuspended />
    </Suspense>
  )
}
