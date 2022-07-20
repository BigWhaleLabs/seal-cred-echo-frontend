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
  const { text, maxLength, hashtags } = useSnapshot(TwitterStore)
  const count = text.length + (hashtags?.length || 0)

  return (
    <div className={counterText(count > maxLength)}>
      {count} / {maxLength}
    </div>
  )
}

export default function () {
  const { maxLength } = useSnapshot(TwitterStore)
  return (
    <Suspense
      fallback={<div className={counterText(false)}>... / {maxLength}</div>}
    >
      <CounterSuspended />
    </Suspense>
  )
}
