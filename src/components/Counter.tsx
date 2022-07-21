import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  fontSize,
  textColor,
  whitespace,
} from 'classnames/tailwind'

const counterText = (error?: boolean) =>
  classnames(
    textColor(error ? 'text-error' : 'text-formal-accent'),
    fontSize('text-xs'),
    whitespace('whitespace-nowrap')
  )

function CounterSuspended() {
  const { text, maxLengthWithHashtag } = useSnapshot(TwitterStore)
  const count = text.length

  return (
    <div className={counterText(count > maxLengthWithHashtag)}>
      {count} / {maxLengthWithHashtag}
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<div className={counterText(false)}>... / ...</div>}>
      <CounterSuspended />
    </Suspense>
  )
}
