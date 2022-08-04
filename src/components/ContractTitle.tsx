import { Suspense } from 'preact/compat'
import { UnderlineTextButton } from 'components/Text'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

function ContractTitleSuspended({
  address,
  onClick,
}: {
  address: string
  onClick?: () => void
}) {
  const { externalERC721derivativeContracts } = useSnapshot(SealCredStore)

  if (externalERC721derivativeContracts.includes(address)) {
    return (
      <UnderlineTextButton onClick={onClick}>
        <ContractSymbol address={address} />
      </UnderlineTextButton>
    )
  }

  return (
    <UnderlineTextButton onClick={onClick}>
      <ContractName clearType truncate address={address} />
    </UnderlineTextButton>
  )
}

export default function ({
  address,
  onClick,
}: {
  address: string
  onClick?: () => void
}) {
  return (
    <Suspense
      fallback={
        <span className={wordBreak('break-all')}>
          {truncateMiddleIfNeeded(address, 17)}
        </span>
      }
    >
      <ContractTitleSuspended address={address} onClick={onClick} />
    </Suspense>
  )
}
