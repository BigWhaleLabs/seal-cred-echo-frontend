import { BadgeText, ErrorText } from 'components/Text'
import { useSnapshot } from 'valtio'
import TwitterStore from 'stores/TwitterStore'

export default function () {
  const { text, maxLength } = useSnapshot(TwitterStore)
  const count = text.length

  return (
    <>
      {count > maxLength ? (
        <ErrorText>
          {count} / {maxLength}
        </ErrorText>
      ) : (
        <BadgeText>
          {count} / {maxLength}
        </BadgeText>
      )}
    </>
  )
}
