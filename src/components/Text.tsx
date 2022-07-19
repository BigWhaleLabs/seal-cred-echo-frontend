import {
  TDropShadow,
  TTextColor,
  alignItems,
  classnames,
  cursor,
  display,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  placeholderColor,
  space,
  textAlign,
  textColor,
  textDecoration,
  transitionProperty,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import ExclamationInCircle from 'icons/ExclamationInCircle'
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

const textareaText = classnames(
  display('flex'),
  fontFamily('font-primary'),
  alignItems('items-center'),
  textColor('text-formal-accent'),
  placeholderColor('placeholder-formal-accent-dimmed')
)
export function TextareaText({ children }: ChildrenProp) {
  return <div className={textareaText}>{children}</div>
}

const errorTextBox = (visible?: boolean) =>
  classnames(
    display(visible ? 'flex' : 'hidden'),
    alignItems('items-center'),
    space('space-x-2')
  )
const errorText = (centered?: boolean) =>
  classnames(
    textColor('text-error'),
    fontWeight('font-medium'),
    fontFamily('font-primary'),
    textAlign({ 'text-center': centered })
  )
export function ErrorText({
  children,
  withExclamation,
  visible,
  centered,
}: ChildrenProp & {
  centered?: boolean
  withExclamation?: boolean
  visible?: boolean
}) {
  const error = <p className={errorText(centered)}>{children}</p>

  if (withExclamation)
    return (
      <div className={errorTextBox(visible)}>
        <ExclamationInCircle />
        {error}
      </div>
    )

  return error
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

const linkText = (small?: boolean, extraSmall?: boolean, bold?: boolean) =>
  classnames(
    textDecoration('no-underline'),
    textColor('text-primary'),
    fontWeight({ 'font-bold': bold }),
    fontSize({ 'text-sm': small, 'text-xs': extraSmall }),
    lineHeight(small ? 'leading-4' : 'leading-5')
  )
export function LinkText({
  url,
  bold,
  small,
  extraSmall,
  title,
  children,
  targetBlank,
}: ChildrenProp & {
  url: string
  small?: boolean
  extraSmall?: boolean
  targetBlank?: boolean
  bold?: boolean
  title?: string
}) {
  return (
    <a
      className={linkText(small, extraSmall, bold)}
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
  inheritColor?: boolean
) =>
  classnames(
    fontFamily({ 'font-primary': primary }),
    textColor(inheritColor ? 'text-inherit' : 'text-formal-accent'),
    textAlign({ 'text-center': center }),
    fontWeight({ 'font-bold': bold }),
    lineHeight('!leading-5'),
    fontSize(small ? 'text-xs' : 'text-sm')
  )
export function BodyText({
  primary,
  bold,
  small,
  center,
  children,
  inheritColor,
}: ChildrenProp & {
  primary?: boolean
  bold?: boolean
  small?: boolean
  center?: boolean
  inheritColor?: boolean
}) {
  return (
    <p className={bodyText(primary, bold, small, center, inheritColor)}>
      {children}
    </p>
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

const statusText = (dark?: boolean, textRight?: boolean) =>
  classnames(
    fontSize('text-xs'),
    lineHeight('leading-4'),
    textColor(dark ? 'text-primary-dark' : 'text-formal-accent'),
    textAlign({ 'text-right': textRight })
  )
export function StatusText({
  dark,
  textRight,
  children,
}: ChildrenProp & { dark?: boolean; textRight?: boolean }) {
  return <span className={statusText(dark, textRight)}>{children}</span>
}

const tweetText = classnames(
  fontFamily('font-primary'),
  fontSize('text-base'),
  lineHeight('leading-6')
)
export function TweetText({ children }: ChildrenProp) {
  return <p className={tweetText}>{children}</p>
}

const hashTagText = classnames(
  fontSize('text-sm'),
  lineHeight('leading-5'),
  textColor('text-formal-accent-semi-transparent')
)
export function HashTagText({ children }: ChildrenProp) {
  return <span className={hashTagText}>{children}</span>
}
