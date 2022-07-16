import { BadgeText, ErrorText } from 'components/Text'
import { useSnapshot } from 'valtio'
import TwitterStore from 'stores/TwitterStore'

export default function () {
  const { text, maxLength } = useSnapshot(TwitterStore)
  const count = text.length

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