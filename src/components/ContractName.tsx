import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import { utils } from 'ethers'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import SealCredStore from 'stores/SealCredStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexWrap,
  minWidth,
  padding,
  wordBreak,
} from 'classnames/tailwind'
import defaultProvider from 'helpers/providers/defaultProvider'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')
const badgeNameWrapper = classnames(
  minWidth('min-w-fit'),
  display('inline-flex'),
  flexWrap('flex-wrap'),
  padding('pr-2')
)

interface ContractNameProps {
  address: string
  truncate?: boolean
  clearType?: boolean
  hyphens?: boolean
}

const wrappedWord = (name: string) => {
  return name
    .split(' ')
    .map((word) => <span className={badgeNameWrapper}>{word}</span>)
}

function ContractNameSuspended({
  address,
  hyphens,
  truncate,
  clearType,
}: ContractNameProps) {
  const emailDerivativesMapping = useSnapshot(SealCredStore.ledgers['Email'])
  const { contractNames } = useSnapshot(ContractMetadataStore)
  let contractName = contractNames[address]
  if (!contractName)
    ContractMetadataStore.fetchContractName(address, defaultProvider)

  if (clearType) {
    if (contractName && Object.keys(emailDerivativesMapping).includes(address))
      contractName = contractName.replace(' email', '')
  }

  let content = contractName || address

  if (truncate) content = truncateMiddleIfNeeded(content, 17)
  if (utils.isAddress(content)) content = truncateMiddleIfNeeded(content, 17)

  return (
    <span
      className={classNamesToString(contractName ? undefined : addressText)}
    >
      {hyphens ? wrappedWord(content) : content}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, truncate, ...rest }) => (
  <Suspense
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractNameSuspended address={address} truncate={truncate} {...rest} />
  </Suspense>
))
