import { HashTagText } from 'components/Text'
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
  hashtags,
  text,
}: {
  maxCount: number
  hashtags: string
  text: string
}) {
  return (
    <>
      <div className={footerBox}>
        <div>
          <HashTagText>{hashtags}</HashTagText>
        </div>
        <Counter max={maxCount} value={text.length} />
      </div>
    </>
  )
}
