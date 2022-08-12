import { BodyText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BackToTweetsButton from 'components/PostsLayout/BackToTweetsButton'
import Dropdown from 'components/Dropdown'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  lineHeight,
  textColor,
} from 'classnames/tailwind'
import data from 'data'

const container = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between')
)
const tweetByWrapper = classnames(
  display('flex'),
  gap('gap-x-2'),
  alignItems('items-center')
)
const link = classnames(
  textColor('text-primary', 'hover:text-accent'),
  fontSize('text-sm'),
  lineHeight('leading-5')
)
export default function ({ blockchainPosts }: { blockchainPosts?: boolean }) {
  const { currentTwitterAccount } = useSnapshot(AppStore)
  return (
    <div className={container}>
      {blockchainPosts ? (
        <BackToTweetsButton />
      ) : (
        <>
          <div className={tweetByWrapper}>
            <BodyText>Tweets by</BodyText>
            <Dropdown
              currentValue={currentTwitterAccount}
              options={Object.values(data).map(({ twitter }) => ({
                label: `@${twitter}`,
                value: twitter,
              }))}
              onChange={(value) => {
                AppStore.currentTwitterAccount = value
              }}
            />
          </div>
          <NavLink to="blockchain" className={link}>
            View all on blockchain
          </NavLink>
        </>
      )}
    </div>
  )
}
