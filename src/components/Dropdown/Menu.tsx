import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  gap,
  inset,
  opacity,
  outlineColor,
  outlineStyle,
  padding,
  position,
  textColor,
  transitionProperty,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (open: boolean) =>
  classnames(
    borderRadius('rounded-lg'),
    borderWidth('border'),
    borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
    transitionProperty('transition-colors'),
    alignItems('items-center'),
    position('absolute'),
    inset('top-9'),
    width('sm:w-72', 'w-44'),
    opacity({ 'opacity-0': !open }),
    gap('gap-y-1'),
    zIndex('z-30'),
    transitionProperty('transition-opacity'),
    outlineColor('focus:outline-primary'),
    outlineStyle('focus:outline'),
    transitionProperty('transition-colors'),
    padding('p-3'),
    backgroundColor('bg-primary-dark')
  )
const menuItem = (selected?: boolean) =>
  classnames(
    padding('p-2'),
    cursor('cursor-pointer'),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    textColor({ 'text-primary': selected }),
    backgroundColor('hover:bg-primary-background')
  )

export default function ({
  open,
  options,
  selected,
  onSelect,
}: {
  open: boolean
  options: Option[]
  selected?: Option
  onSelect: (option: Option) => void
}) {
  return (
    <div className={container(open)}>
      {options.map((option) => (
        <p
          key={option.value}
          className={menuItem(option.value === selected?.value)}
          onClick={() => {
            onSelect(option)
          }}
        >
          {option.label}
        </p>
      ))}
    </div>
  )
}
