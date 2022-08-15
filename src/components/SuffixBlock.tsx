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

const footerBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-4'),
  alignItems('items-end'),
  justifyContent('justify-between')
)

export default function ({
  maxCount,
  suffix,
  text,
}: {
  maxCount: number
  suffix: string
  text: string
}) {
  return (
    <div className={footerBox}>
      <SuffixText>{suffix}</SuffixText>
      <Counter max={maxCount} value={text.length} />
    </div>
  )
}
