import { UnderlineTextButton } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import SealCredStore from 'stores/SealCredStore'

export default function ({
  address,
  onClick,
}: {
  address: string
  onClick?: () => void
}) {
  const { EmailDerivativeContracts } = useSnapshot(SealCredStore)

  return (
    <UnderlineTextButton onClick={onClick}>
      {EmailDerivativeContracts.includes(address) ? (
        <ContractName clearType truncate address={address} />
      ) : (
        <ContractSymbol address={address} />
      )}
    </UnderlineTextButton>
  )
}
