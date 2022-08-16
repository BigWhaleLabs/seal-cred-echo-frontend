import { LargeText, LoadingText } from 'components/Text'
import { maxWidth, space } from 'classnames/tailwind'

export default function () {
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
