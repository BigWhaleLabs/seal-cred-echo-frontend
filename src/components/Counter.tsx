import { BadgeText, ErrorText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import TwitterStore from 'stores/TwitterStore'

function CounterSuspended() {
  const { text, maxLength, hashtags } = useSnapshot(TwitterStore)
  const count = text.length + (hashtags?.length || 0)

  if (count > maxLength)
    return (
      <ErrorText>
        {count} / {maxLength}
      </ErrorText>
    )

  return (
    <BadgeText>
      {count} / {maxLength}
    </BadgeText>
  )
}

export default function () {
  const { maxLength } = useSnapshot(TwitterStore)
  return (
    <Suspense fallback={<BadgeText>... / {maxLength}</BadgeText>}>
      <CounterSuspended />
    </Suspense>
  )
}
