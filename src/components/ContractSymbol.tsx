import { Suspense, memo } from 'react'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { utils } from 'ethers'
import ContractSymbolsStore from 'stores/ContractMetadataStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexWrap,
  minWidth,
  padding,
  wordBreak,
} from 'classnames/tailwind'
import defaultProvider from 'helpers/providers/defaultProvider'

const addressText = wordBreak('break-all')
const badgeNameWrapper = classnames(
  minWidth('min-w-fit'),
  display('inline-flex'),
  flexWrap('flex-wrap'),
  padding('pr-2')
)

interface ContractSymbolProps {
  address: string
  truncate?: boolean
  hyphens?: boolean
}

const wrappedWord = (name: string) => {
  return name
    .split(' ')
    .map((word) => <span className={badgeNameWrapper}>{word}</span>)
}

function ContractSymbolSuspended({
  address,
  hyphens,
  truncate,
}: ContractSymbolProps) {
  const { contractSymbols } = useSnapshot(ContractSymbolsStore)
  const contractSymbol = contractSymbols[address]
  if (!contractSymbol)
    ContractSymbolsStore.fetchContractSymbol(address, defaultProvider)

  let content = contractSymbol || address

  if (truncate) content = truncateMiddleIfNeeded(content, 17)
  if (utils.isAddress(content)) content = truncateMiddleIfNeeded(content, 17)

  return (
    <span
      className={classNamesToString(contractSymbol ? undefined : addressText)}
    >
      {hyphens ? wrappedWord(content) : content}
    </span>
  )
}

export default memo<ContractSymbolProps>(({ address, truncate, ...rest }) => (
  <Suspense
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractSymbolSuspended address={address} truncate={truncate} {...rest} />
  </Suspense>
))
