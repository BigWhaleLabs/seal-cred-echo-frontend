import { LargeText, LoadingText } from 'components/Text'
import { maxWidth, space } from 'classnames/tailwind'

export default function ({ pending }: { pending?: boolean }) {
  if (!pending) return <LargeText>Tweet successful</LargeText>

  return (
    <div className={space('space-y-4')}>
      <LargeText>Your tweet is processing</LargeText>
      <div className={maxWidth('max-w-processing-content')}>
        <LoadingText>
          This may take a few minutes or up to 24 hours to post to Twitter.
          However, you can always view your Tweet here under ‘View all on
          Blockchain’.
        </LoadingText>
      </div>
    </div>
  )
}
