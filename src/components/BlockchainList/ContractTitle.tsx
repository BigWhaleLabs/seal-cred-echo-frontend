import { UnderlineTextButton } from 'components/Text'
import ContractSymbol from 'components/ContractSymbol'

export default function ({
  address,
  onClick,
}: {
  address: string
  onClick?: () => void
}) {
  return (
    <UnderlineTextButton onClick={onClick}>
      <ContractSymbol truncate address={address} />
    </UnderlineTextButton>
  )
}
