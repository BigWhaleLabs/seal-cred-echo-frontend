import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { useState } from 'preact/hooks'
import PreviousTweetsLayout from 'components/PrevTweetsLayout'
import TwitterLoading from 'components/TwitterLoading'
import classnames, {
  backgroundColor,
  borderWidth,
  display,
  flexDirection,
  height,
  width,
} from 'classnames/tailwind'
import formatDate from 'helpers/formatDate'

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

const prepareFrame = (frame: HTMLObjectElement) => {
  if (!frame.contentDocument) return

  const cssLink = document.createElement('link')
  cssLink.href = 'styles/frame.css'
  cssLink.rel = 'stylesheet'
  cssLink.type = 'text/css'
  frame.contentDocument.head.appendChild(cssLink)
  const timeTags: HTMLCollection =
    frame.contentDocument.getElementsByTagName('time')
  const authors = frame.contentDocument.getElementsByClassName('TweetAuthor')
  for (let index = 0; index < authors.length; index++) {
    const child = document.createElement('span')
    child.className = 'TweetAuthor__time'
    const time = timeTags[index].innerHTML
    child.innerHTML = formatDate(time)
    authors[index].appendChild(child)
  }
}

export default function () {
  const [loading, setLoading] = useState(true)

  return (
    <PreviousTweetsLayout>
      <div className={tweetCard}>
        {loading && <TwitterLoading text="Fetching twitter widget" />}
        <div className={tweetWidget(loading)}>
          <TwitterTimelineEmbed
            noHeader
            noFooter
            noBorders
            autoHeight
            noScrollbar
            transparent
            tweetLimit={50}
            theme="dark"
            sourceType="profile"
            screenName="SealCredWork"
            borderColor="#2F3336"
            linkColor="#15A1FC"
            options={{
              width: '100%',
              height: '100%',
              hide_media: true,
              hide_thread: true,
            }}
            onLoad={(element) => {
              prepareFrame(element)
              setLoading(false)
            }}
          />
        </div>
      </div>
    </PreviousTweetsLayout>
  )
}
