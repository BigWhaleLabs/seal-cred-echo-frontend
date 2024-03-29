import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  fontFamily,
  maxHeight,
  outlineColor,
  outlineStyle,
  overflow,
  padding,
  transitionProperty,
  width,
} from 'classnames/tailwind'

export const boxStyles = (withPadding?: boolean, forZkBadges?: boolean) =>
  classnames(
    width({
      'md:w-96': forZkBadges,
      'w-52': !forZkBadges,
      'w-full': forZkBadges,
    }),
    borderRadius('rounded-lg'),
    borderWidth('border'),
    borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
    outlineColor('focus:outline-primary'),
    outlineStyle('focus:outline'),
    transitionProperty('transition-colors'),
    backgroundColor('bg-primary-dark'),
    alignItems('items-center'),
    fontFamily('font-primary'),
    padding({ 'p-3': withPadding }),
    maxHeight('max-h-64'),
    overflow('overflow-y-auto')
  )

export default function ({
  children,
  forZkBadges,
  withPadding,
}: ChildrenProp & { withPadding?: boolean; forZkBadges?: boolean }) {
  return <div className={boxStyles(withPadding, forZkBadges)}>{children}</div>
}
