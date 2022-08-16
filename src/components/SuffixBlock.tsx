import { StateUpdater, Suspense } from 'preact/compat'
import { SuffixText } from 'components/Text'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import Counter from 'components/Counter'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useContractSymbols from 'hooks/useContractSymbols'
import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

const footerBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-4'),
  alignItems('items-end'),
  justifyContent('justify-between')
)

interface SuffixProps {
  maxCount: number
  currentAddress: string
  text: string
  setSuffix: StateUpdater<string>
}

function SuspendedSuffix({
  maxCount,
  currentAddress,
  text,
  setSuffix,
}: SuffixProps) {
  const derivativeAddressesOwned = useDerivativeAddressesOwned()
  const symbolMap = useContractSymbols(derivativeAddressesOwned)

  const suffix = currentAddress
    ? ` @ ${
        symbolMap[currentAddress] || truncateMiddleIfNeeded(currentAddress, 8)
      }`
    : ''

  setSuffix(suffix)

  return (
    <div className={footerBox}>
      <SuffixText>{suffix}</SuffixText>
      <Counter max={maxCount} value={text.length} />
    </div>
  )
}

export default function ({
  currentAddress,
  maxCount,
  text,
  setSuffix,
}: SuffixProps) {
  return (
    <Suspense fallback={<SuffixText>{currentAddress}</SuffixText>}>
      <SuspendedSuffix
        currentAddress={currentAddress}
        maxCount={maxCount}
        text={text}
        setSuffix={setSuffix}
      />
    </Suspense>
  )
}
