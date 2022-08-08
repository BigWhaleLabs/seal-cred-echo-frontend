import { HTMLAttributes } from 'preact/compat'
import { NavLink } from 'react-router-dom'
import {
  TDropShadow,
  TGradientColorStops,
  TTextColor,
  alignItems,
  backgroundClip,
  backgroundImage,
  caretColor,
  classnames,
  cursor,
  display,
  dropShadow,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  letterSpacing,
  lineHeight,
  placeholderColor,
  space,
  textAlign,
  textColor,
  textDecoration,
  transitionProperty,
  whitespace,
  wordBreak,
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

const socialLink = classnames(
  lineHeight('leading-6'),
  fontSize('text-base'),
  textDecoration('no-underline', 'hover:underline'),
  textColor('text-formal-accent', 'hover:text-tertiary')
)
export function SocialLink({ url, children }: ChildrenProp & { url: string }) {
  return (
    <a
      className={socialLink}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const footerLink = (active?: boolean, linkStyles?: boolean) =>
  classnames(
    fontSize({ 'text-sm': !linkStyles }),
    fontWeight({ 'font-semibold': !linkStyles }),
    linkStyles
      ? textDecoration('no-underline')
      : textDecoration(
          active ? 'underline' : 'no-underline',
          'hover:underline'
        ),
    textColor(
      linkStyles
        ? 'text-primary'
        : active
        ? 'text-accent'
        : 'text-formal-accent',
      'hover:text-accent'
    )
  )
export function FooterLink({
  url,
  children,
  internal,
  linkStyles,
}: ChildrenProp & { url: string; internal?: boolean; linkStyles?: boolean }) {
  return internal ? (
    <NavLink
      to={url}
      className={({ isActive }: { isActive?: boolean }) =>
        footerLink(isActive, linkStyles)
      }
      onClick={() => window.scroll({ top: 0 })}
    >
      {children}
    </NavLink>
  ) : (
    <a
      className={footerLink()}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const textareaText = (dark?: boolean) =>
  classnames(
    display('flex'),
    fontFamily('font-primary'),
    alignItems('items-center'),
    textColor({
      'text-formal-accent-semi-transparent': dark,
      'text-formal-accent': !dark,
    }),
    placeholderColor('placeholder-formal-accent-dimmed'),
    caretColor('caret-primary')
  )
export function TextareaText({
  dark,
  children,
}: ChildrenProp & { dark?: boolean }) {
  return <div className={textareaText(dark)}>{children}</div>
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

const linkText = (
  small?: boolean,
  extraSmall?: boolean,
  bold?: boolean,
  gradientFrom?: TGradientColorStops,
  gradientTo?: TGradientColorStops
) =>
  classnames(
    textDecoration('no-underline'),
    textColor(gradientFrom && gradientTo ? 'text-transparent' : 'text-primary'),
    backgroundImage(
      gradientFrom && gradientTo ? 'bg-gradient-to-r' : undefined
    ),
    backgroundClip(gradientFrom && gradientTo ? 'bg-clip-text' : undefined),
    gradientColorStops(gradientFrom, gradientTo),
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
  gradientFrom,
  gradientTo,
}: ChildrenProp & {
  url: string
  small?: boolean
  extraSmall?: boolean
  bold?: boolean
  title?: string
  gradientFrom?: TGradientColorStops
  gradientTo?: TGradientColorStops
}) {
  return (
    <a
      className={linkText(small, extraSmall, bold, gradientFrom, gradientTo)}
      href={url}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
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

const loadingText = classnames(
  fontSize('text-xs', 'tiny:text-sm'),
  lineHeight('!leading-5'),
  textAlign('text-center')
)
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

const statusText = (
  color?: 'primary' | 'dark' | 'default',
  textRight?: boolean
) =>
  classnames(
    fontSize('text-xs'),
    lineHeight('leading-4'),
    textColor({
      'text-primary-dark': color === 'dark',
      'text-primary-dimmed': color === 'primary',
      'text-formal-accent': color === 'default',
    }),
    textAlign({ 'text-right': textRight })
  )
export function StatusText({
  color = 'default',
  textRight,
  children,
}: ChildrenProp & {
  color?: 'primary' | 'dark' | 'default'
  textRight?: boolean
}) {
  return <span className={statusText(color, textRight)}>{children}</span>
}

const tweetText = classnames(
  fontFamily('font-primary'),
  fontSize('text-base'),
  lineHeight('leading-6'),
  whitespace('whitespace-pre-wrap')
)
export function TweetText({ children }: ChildrenProp) {
  return <p className={tweetText}>{children}</p>
}

const suffixText = classnames(
  fontSize('text-sm'),
  lineHeight('leading-5'),
  textColor('text-formal-accent-semi-transparent'),
  wordBreak('break-all')
)
export function SuffixText({ children }: ChildrenProp) {
  return <span className={suffixText}>{children}</span>
}

const contractButtonContainer = (clickable?: boolean) =>
  classnames(
    fontSize('text-xs'),
    textDecoration('underline'),
    textColor('text-primary'),
    cursor({ 'cursor-pointer': clickable })
  )
export function UnderlineTextButton({
  children,
  onClick,
  ...rest
}: ChildrenProp & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={contractButtonContainer(!!onClick)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </span>
  )
}
