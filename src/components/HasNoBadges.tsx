import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Button from 'components/Button'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'

function HasNoBadgesSuspended() {
  const { emailLedger, ERC721Ledger, externalERC721Ledger } =
    useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedDerivativeContracts = [
    ...Object.values(emailLedger),
    ...Object.values(ERC721Ledger),
    ...Object.values(externalERC721Ledger),
  ].filter(({ derivative }) => contractsOwned.includes(derivative))

  if (ownedDerivativeContracts.length) return null

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
