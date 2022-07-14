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
import useBreakpoints from 'hooks/useBreakpoints'

const tabBarText = classnames(
  fontFamily('font-primary'),
  fontSize('tiny:text-lg', 'text-base'),
  lineHeight('!leading-11'),
  fontWeight('font-bold'),
  transitionProperty('transition-colors'),
  cursor('cursor-pointer')
)
export function TabBarText({ children }: ChildrenProp) {
  return <span className={tabBarText}>{children}</span>
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

const badgeText = (small?: boolean) =>
  classnames(
    textColor('text-formal-accent'),
    fontSize(small ? 'text-sm' : undefined)
  )
export function BadgeText({
  small,
  children,
}: ChildrenProp & { small?: boolean }) {
  return <span className={badgeText(small)}>{children}</span>
}

const linkText = (bold?: boolean) =>
  classnames(
    textDecoration('no-underline'),
    textColor('text-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )
export function LinkText({
  url,
  bold,
  title,
  children,
  targetBlank,
}: ChildrenProp & {
  url: string
  targetBlank?: boolean
  bold?: boolean
  title?: string
}) {
  return (
    <a
      className={linkText(bold)}
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

const headerText = (accent = false, extraLeading = false, xs = false) =>
  classnames(
    fontFamily('font-primary'),
    fontWeight('font-bold'),
    fontSize(xs ? 'text-2xl' : 'text-3xl', 'sm:text-4xl'),
    textColor(accent ? 'text-accent' : 'text-formal-accent'),
    extraLeading
      ? lineHeight('leading-9', 'sm:leading-10', 'md:leading-11')
      : lineHeight('leading-8')
  )
export function HeaderText({
  accent,
  extraLeading,
  children,
}: ChildrenProp & {
  accent?: boolean
  extraLeading?: boolean
}) {
  const { xs } = useBreakpoints()
  return <h1 className={headerText(accent, extraLeading, xs)}>{children}</h1>
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

const cardTextContainer = classnames(
  fontFamily('font-primary'),
  lineHeight('leading-6')
)
export function CardParagraph({ children }: ChildrenProp) {
  return <p className={cardTextContainer}>{children}</p>
}

const cardSubheaderContainer = fontWeight('font-bold')
export function CardSubheder({ children }: ChildrenProp) {
  return <p className={cardSubheaderContainer}>{children}</p>
}
