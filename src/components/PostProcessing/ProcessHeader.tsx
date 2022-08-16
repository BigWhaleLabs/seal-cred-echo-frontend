import { LargeText, LoadingText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Loading from 'components/Loading'

export default function ({ pending }: { pending?: boolean }) {
  const title = pending ? 'Your tweet is processing' : 'Tweet successful'

  if (!pending) return <LargeText>{title}</LargeText>

  return (
    <>
      <div className={space('space-y-4')}>
        <LargeText>{title}</LargeText>
        <div style={{ maxWidth: '28rem' }}>
          <LoadingText>
            This may take a few minutes or up to 24 hours to post to Twitter.
            However, you can always view your Tweet here under ‘View all on
            Blockchain’.
          </LoadingText>
        </div>
      </div>
      <Loading />
    </>
  )
}
