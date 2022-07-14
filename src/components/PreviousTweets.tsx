import { BodyText, EmphasizeText, LinkText, LoadingText } from 'components/Text'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { useState } from 'preact/hooks'
import Loading from 'components/Loading'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  display,
  flexDirection,
  height,
  justifyContent,
  margin,
  space,
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
const loadingClass = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-8'),
  height('h-full')
)
const tweetWidget = (loading?: boolean) =>
  classnames(display(loading ? 'hidden' : 'block'), height('h-full'))

const TwitterLoading = () => {
  return (
    <div className={loadingClass}>
      <LoadingText>Fetching tweets...</LoadingText>
      <div className={margin('mx-auto')}>
        <Loading />
      </div>
    </div>
  )
}

const prevTweets = classnames(
  width('w-full'),
  height('h-full'),
  space('space-y-4')
)
const prevTweetsHeader = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  space('space-y-2', 'sm:space-y-0'),
  alignItems('items-start', 'sm:items-center'),
  justifyContent('justify-start', 'sm:justify-between')
)

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
    <div className={prevTweets}>
      <div className={prevTweetsHeader}>
        <BodyText>
          <EmphasizeText bold>Tweets</EmphasizeText> by{' '}
          <LinkText url="https://sealcred.xyz">@SealCredWork</LinkText>
        </BodyText>
        <LinkText url="https://sealcred.xyz">View all on blockchain</LinkText>
      </div>
      <div className={tweetCard}>
        {loading && <TwitterLoading />}
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
            screenName="sealcred"
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
    </div>
  )
}
