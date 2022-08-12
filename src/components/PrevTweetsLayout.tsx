import { BodyText, EmphasizeText, LinkText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import BackArrow from 'icons/BackArrow'
import ChildrenProp from 'models/ChildrenProp'
import SelectDropdown from 'components/SelectDropdown'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  height,
  justifyContent,
  lineHeight,
  margin,
  padding,
  position,
  space,
  textColor,
  textDecoration,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import data from 'data'

const prevTweets = classnames(
  width('w-full'),
  height('h-full'),
  space('space-y-4'),
  margin('mt-8')
)
const prevTweetsHeader = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  space('space-y-2', 'sm:space-y-0'),
  alignItems('items-start', 'sm:items-center'),
  justifyContent('justify-start', 'sm:justify-between')
)
const navLinkPrimary = classnames(
  textColor('text-primary', 'hover:text-accent'),
  fontSize('text-sm'),
  lineHeight('leading-5')
)
const navLink = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-1'),
  transitionProperty('transition-colors'),
  textDecoration('hover:underline'),
  textColor('hover:text-accent')
)
const backArrowClasses = padding('p-1.5')
const tabContainer = classnames(
  position('relative'),
  justifyContent('justify-center'),
  flexDirection('flex-col'),
  space('space-y-4')
)
const tweetByWrapper = classnames(
  display('flex'),
  space('space-x-2'),
  alignItems('items-center')
)

const SelectedOption = ({ currentAccount }: { currentAccount: string }) => {
  return (
    <BodyText>
      <LinkText url={`https://twitter.com/${currentAccount}`}>
        @{currentAccount}
      </LinkText>
    </BodyText>
  )
}

export default function ({
  back,
  children,
}: ChildrenProp & { back?: boolean }) {
  const { currentTwitterAccount } = useSnapshot(AppStore)

  return (
    <div className={prevTweets}>
      <div className={prevTweetsHeader}>
        {back ? (
          <NavLink to="/previous-tweets" className={navLink}>
            <div className={backArrowClasses}>
              <BackArrow />
            </div>
            <BodyText inheritColor>Back to Tweets</BodyText>
          </NavLink>
        ) : (
          <>
            <div className={tweetByWrapper}>
              <BodyText>
                <EmphasizeText bold>Tweets</EmphasizeText> by
              </BodyText>
              <SelectDropdown
                current={currentTwitterAccount}
                options={Object.values(data).map(({ twitter }) => ({
                  label: `@${twitter}`,
                  value: twitter,
                }))}
                SelectedValue={
                  <SelectedOption currentAccount={currentTwitterAccount} />
                }
                onChange={({ value }) => {
                  AppStore.currentTwitterAccount = value
                }}
              />
            </div>
            <NavLink to="blockchain" className={navLinkPrimary}>
              View all on blockchain
            </NavLink>
          </>
        )}
      </div>
      <div className={tabContainer}>{children}</div>
    </div>
  )
}
