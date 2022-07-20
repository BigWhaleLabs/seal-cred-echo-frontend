import { HashTagText } from 'components/Text'
import { Suspense } from 'preact/compat'
import {
  alignItems,
  classnames,
  display,
  flexDirection,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Counter from 'components/Counter'
import TwitterStore from 'stores/TwitterStore'

const footerBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-4'),
  alignItems('items-end'),
  justifyContent('justify-between')
)

function HashtagBlockSuspended() {
  const { hashtags } = useSnapshot(TwitterStore, { sync: true })

  return (
    <>
      {!!hashtags && (
        <div className={footerBox}>
          <HashTagText>{hashtags}</HashTagText>
          <Counter />
        </div>
      )}
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<div>...</div>}>
      <HashtagBlockSuspended />
    </Suspense>
  )
}
