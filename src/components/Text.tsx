import {
  TDropShadow,
  TTextColor,
  classnames,
  cursor,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textColor,
  textDecoration,
  transitionProperty,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const tabBarText = (active: boolean) =>
  classnames(
    fontFamily('font-primary'),
    textColor(active ? 'text-accent' : 'text-formal-accent'),
    fontSize('tiny:text-lg', 'text-base'),
    fontWeight('font-bold'),
    textDecoration(active ? 'underline' : 'no-underline'),
    transitionProperty('transition-colors'),
    cursor('cursor-pointer')
  )
export function TabBarText({
  children,
  active,
}: ChildrenProp & { active: boolean }) {
  return <span className={tabBarText(active)}>{children}</span>
}

const logoSubText = classnames(
  textColor('text-primary-semi-dimmed'),
  fontWeight('font-bold'),
  fontSize('text-xs')
)
export function LogoSubText({ children }: ChildrenProp) {
  return <span className={logoSubText}>{children}</span>
}

const logoText = (textSecondary?: boolean) =>
  classnames(
    textColor(textSecondary ? 'text-secondary' : 'text-accent'),
    fontSize('text-lg'),
    lineHeight('leading-none')
  )
export function LogoText({
  textSecondary,
  children,
}: ChildrenProp & { textSecondary?: boolean }) {
  return <span className={logoText(textSecondary)}>{children}</span>
}

const accentText = (
  color: TTextColor,
  bold?: boolean,
  small?: boolean,
  primary?: boolean,
  shadow?: TDropShadow
) =>
  classnames(
    textColor(color),
    fontFamily(primary ? 'font-primary' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : undefined),
    dropShadow(shadow)
  )
export function AccentText({
  color,
  bold,
  small,
  primary,
  shadow,
  children,
}: ChildrenProp & {
  color: TTextColor
  bold?: boolean
  small?: boolean
  primary?: boolean
  shadow?: TDropShadow
}) {
  return (
    <span className={accentText(color, bold, small, primary, shadow)}>
      {children}
    </span>
  )
}

const socialLink = (tertiary?: boolean) =>
  classnames(
    lineHeight('leading-6'),
    fontSize('text-base'),
    textDecoration('no-underline', 'hover:underline'),
    textColor(tertiary ? 'hover:text-tertiary' : 'text-formal-accent')
  )
export function SocialLink({
  url,
  tertiary,
  children,
}: ChildrenProp & { url: string; tertiary?: boolean }) {
  return (
    <a className={socialLink(tertiary)} href={url} target="_blank">
      {children}
    </a>
  )
}

const linkText = (color?: TTextColor, small?: boolean) =>
  classnames(
    textDecoration('no-underline'),
    fontFamily('font-primary'),
    textColor(color || 'text-accent'),
    fontSize(small ? 'text-xs' : 'text-sm'),
    lineHeight('leading-4')
  )

export function LinkText({
  url,
  title,
  color,
  small,
  children,
  targetBlank,
}: ChildrenProp & {
  url: string
  targetBlank?: boolean
  title?: string
  color?: TTextColor
  small?: boolean
}) {
  return (
    <a
      className={linkText(color, small)}
      href={url}
      title={title}
      target={targetBlank ? '_blank' : '_self'}
    >
      {children}
    </a>
  )
}

const emphasizeText = ({
  color,
  bold,
}: {
  color?: TTextColor
  bold?: boolean
}) =>
  classnames(
    textColor(color || 'text-formal-accent'),
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )
export function EmphasizeText({
  color,
  bold,
  children,
}: ChildrenProp & {
  bold?: boolean
  color?: TTextColor
}) {
  return <span className={emphasizeText({ color, bold })}>{children}</span>
}

const bodyText = (
  bold?: boolean,
  small?: boolean,
  center?: boolean,
  color?: TTextColor
) =>
  classnames(
    color ? textColor(color) : textColor('text-formal-accent'),
    textAlign(center ? 'text-center' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    lineHeight('!leading-5'),
    fontSize(small ? 'text-xs' : 'text-sm')
  )
export function BodyText({
  bold,
  small,
  center,
  children,
  color,
}: ChildrenProp & {
  bold?: boolean
  small?: boolean
  center?: boolean
  color?: TTextColor
}) {
  return <p className={bodyText(bold, small, center, color)}>{children}</p>
}

const tweetText = (color?: TTextColor, bold?: boolean, small?: boolean) =>
  classnames(
    fontFamily('font-primary'),
    fontSize(small ? 'text-xs' : 'text-base'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    textColor(color || 'text-formal-accent'),
    lineHeight(small ? undefined : 'leading-4')
  )
export function TweetText({
  color,
  bold,
  small,
  children,
}: ChildrenProp & { color?: TTextColor; small?: boolean; bold?: boolean }) {
  return <p className={tweetText(color, bold, small)}>{children}</p>
}

const largeText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  fontSize('text-xl', 'tiny:text-2xl'),
  textAlign('text-center')
)
export function LargeText({ children }: ChildrenProp) {
  return <h2 className={largeText}>{children}</h2>
}

const loadingText = fontSize('text-xs', 'tiny:text-sm')
export function LoadingText({ children }: ChildrenProp) {
  return <h4 className={loadingText}>{children}</h4>
}
