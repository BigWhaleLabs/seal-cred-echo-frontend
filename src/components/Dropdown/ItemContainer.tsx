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
  width,
} from 'classnames/tailwind'

export const boxStyles = classnames(
  width('md:w-80', 'w-56'),
  borderRadius('rounded-lg'),
  borderWidth('border'),
  borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
  outlineColor('focus:outline-primary'),
  outlineStyle('focus:outline'),
  padding('p-3'),
  backgroundColor('bg-primary-dark'),
  alignItems('items-center'),
  fontFamily('font-primary'),
  maxHeight('max-h-64'),
  overflow('overflow-y-scroll')
)

export default function ({ children }: ChildrenProp) {
  return <div className={boxStyles}>{children}</div>
}
