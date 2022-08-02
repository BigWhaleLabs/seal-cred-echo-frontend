import { Timeline } from 'react-twitter-widgets'
import { useEffect, useRef, useState } from 'preact/hooks'
import PreviousTweetsLayout from 'components/PrevTweetsLayout'
import TwitterError from 'components/TwitterError'
import TwitterLoading from 'components/TwitterLoading'
import classnames, {
  backgroundColor,
  borderWidth,
  display,
  flexDirection,
  height,
  width,
} from 'classnames/tailwind'

const tweetCard = classnames(
  display('flex'),
  backgroundColor('bg-primary-dark'),
  width('w-full'),
  height('h-full'),
  flexDirection('flex-col'),
  borderWidth('border-b', 'last:border-b-0')
)
const tweetWidget = (loading?: boolean) =>
  classnames(display(loading ? 'hidden' : 'block'), height('h-full'))

const prepareFrame = (frame: HTMLIFrameElement) => {
  if (!frame.contentDocument) return

  const cssLink = document.createElement('link')
  cssLink.href = 'styles/frame.css'
  cssLink.rel = 'stylesheet'
  cssLink.type = 'text/css'
  frame.contentDocument.head.appendChild(cssLink)
}

export default function () {
  const [status, setStatus] = useState<'content' | 'error' | 'loading'>(
    'loading'
  )

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && status === 'content') {
      const frame = ref.current.getElementsByTagName('iframe')[0]
      if (frame) prepareFrame(frame)
    }
  }, [ref, status])

  return (
    <PreviousTweetsLayout>
      <div className={tweetCard}>
        {status === 'error' ? (
          <TwitterError
            onRefresh={() => setStatus('loading')}
            text="Couldn’t load Tweets. Try disabling content blockers or refresh the page to try again."
          />
        ) : (
          status === 'loading' && (
            <TwitterLoading text="Fetching twitter widget" />
          )
        )}
        <div
          id="twitter_timeline"
          ref={ref}
          className={tweetWidget(status !== 'content')}
        >
          <Timeline
            dataSource={{ sourceType: 'profile', screenName: 'SealCredWork' }}
            options={{
              theme: 'dark',
              linkColor: '#15A1FC',
              borderColor: '#2F3336',
              tweetLimit: 50,
              chrome: [
                'noheader',
                'nofooter',
                'noborders',
                'noscrollbar',
                'transparent',
              ].join(' '),
              width: '100%',
              height: '100%',
              hide_media: true,
              hide_thread: true,
            }}
            onLoad={() => setStatus('content')}
            renderError={() => {
              setStatus('error')
            }}
          />
        </div>
      </div>
    </PreviousTweetsLayout>
  )
}
