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
  lineHeight,
  placeholderColor,
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

const textareaText = classnames(
  display('flex'),
  alignItems('items-center'),
  textColor('text-primary'),
  placeholderColor('placeholder-formal-accent-dimmed')
)
export function TextareaText({ children }: ChildrenProp) {
  return <div className={textareaText}>{children}</div>
}

const errorText = (centered?: boolean) =>
  classnames(
    textColor('text-error'),
    fontWeight('font-medium'),
    fontFamily('font-primary'),
    centered ? textAlign('text-center') : undefined
  )
export function ErrorText({
  children,
  centered,
}: ChildrenProp & { centered?: boolean }) {
  return <p className={errorText(centered)}>{children}</p>
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
