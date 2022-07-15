import {
  TDropShadow,
  TTextColor,
  classnames,
  cursor,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
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

const linkText = (small?: boolean, bold?: boolean) =>
  classnames(
    textDecoration('no-underline'),
    textColor('text-primary'),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontSize(small ? 'text-sm' : 'text-base'),
    lineHeight(small ? 'leading-4' : 'leading-5')
  )
export function LinkText({
  url,
  bold,
  small,
  title,
  children,
  targetBlank,
}: ChildrenProp & {
  url: string
  small?: boolean
  targetBlank?: boolean
  bold?: boolean
  title?: string
}) {
  return (
    <a
      className={linkText(small, bold)}
      href={url}
      title={title}
      target={targetBlank ? '_blank' : '_self'}
    >
      {children}
    </a>
  )
}

const emphasizeText = ({ bold }: { bold?: boolean }) =>
  classnames(
    textColor('text-formal-accent'),
    fontWeight(bold ? 'font-bold' : 'font-normal')
  )
export function EmphasizeText({
  bold,
  children,
}: ChildrenProp & {
  bold?: boolean
}) {
  return <span className={emphasizeText({ bold })}>{children}</span>
}

const bodyText = (
  primary?: boolean,
  bold?: boolean,
  small?: boolean,
  center?: boolean,
  color?: TTextColor
) =>
  classnames(
    primary ? fontFamily('font-primary') : undefined,
    color ? textColor(color) : textColor('text-formal-accent'),
    textAlign(center ? 'text-center' : undefined),
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    lineHeight('!leading-5'),
    fontSize(small ? 'text-xs' : 'text-sm')
  )
export function BodyText({
  primary,
  bold,
  small,
  center,
  children,
  color,
}: ChildrenProp & {
  primary?: boolean
  bold?: boolean
  small?: boolean
  center?: boolean
  color?: TTextColor
}) {
  return (
    <p className={bodyText(primary, bold, small, center, color)}>{children}</p>
  )
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

const cardSubheaderContainer = classnames(
  fontWeight('font-bold'),
  fontFamily('font-primary'),
  fontSize('text-lg')
)
export function CardSubheader({ children }: ChildrenProp) {
  return <p className={cardSubheaderContainer}>{children}</p>
}

const staticHeaderText = (bold = false, subheading = false) =>
  classnames(
    fontWeight(bold ? 'font-bold' : 'font-normal'),
    fontFamily('font-primary'),
    fontSize(subheading ? 'text-base' : 'text-3xl'),
    letterSpacing('tracking-wide')
  )

export function StaticHeaderText({
  children,
  bold,
  subheading,
}: ChildrenProp & {
  bold?: boolean
  subheading?: boolean
}) {
  return <h1 className={staticHeaderText(bold, subheading)}>{children}</h1>
}

const statusText = (dark?: boolean) =>
  classnames(
    fontSize('text-xs'),
    lineHeight('leading-4'),
    textColor(dark ? 'text-primary-dark' : 'text-formal-accent')
  )
export function StatusText({
  dark,
  children,
}: ChildrenProp & { dark?: boolean }) {
  return <span className={statusText(dark)}>{children}</span>
}

const tweetText = classnames(
  fontFamily('font-primary'),
  fontSize('text-base'),
  lineHeight('leading-6')
)
export function TweetText({ children }: ChildrenProp & { dark?: boolean }) {
  return <p className={tweetText}>{children}</p>
}
