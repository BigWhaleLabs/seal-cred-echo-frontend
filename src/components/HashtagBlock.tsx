import { HashTagText } from 'components/Text'
import { Suspense } from 'preact/compat'
import {
  classnames,
  display,
  flexDirection,
  flexWrap,
  margin,
  space,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import TwitterStore from 'stores/TwitterStore'

const footerBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flexWrap('flex-wrap'),
  space('space-x-2'),
  margin('mt-4')
)

function HashtagBlockSuspended() {
  const { hashtags } = useSnapshot(TwitterStore, { sync: true })

  return (
    <>
      {!!hashtags && (
        <div className={footerBox}>
          <HashTagText>{hashtags}</HashTagText>
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
