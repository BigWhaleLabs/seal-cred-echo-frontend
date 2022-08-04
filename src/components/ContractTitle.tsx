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
  const { externalERC721derivativeContracts } = useSnapshot(SealCredStore)

  return (
    <UnderlineTextButton onClick={onClick}>
      {externalERC721derivativeContracts.includes(address) ? (
        <ContractSymbol address={address} />
      ) : (
        <ContractName clearType truncate address={address} />
      )}
    </UnderlineTextButton>
  )
}
