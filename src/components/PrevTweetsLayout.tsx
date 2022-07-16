import { BodyText, EmphasizeText, LinkText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import BackArrow from 'icons/BackArrow'
import ChildrenProp from 'models/ChildrenProp'
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

export default function ({
  back,
  children,
}: ChildrenProp & { back?: boolean }) {
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
            <BodyText>
              <EmphasizeText bold>Tweets</EmphasizeText> by{' '}
              <LinkText url="https://sealcred.xyz">@SealCredWork</LinkText>
            </BodyText>
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
