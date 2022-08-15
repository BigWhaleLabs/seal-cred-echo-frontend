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
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (open: boolean) =>
  classnames(
    borderRadius('rounded-lg'),
    borderWidth('border'),
    borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
    alignItems('items-center'),
    position('absolute'),
    inset('top-9'),
    width('sm:w-72', 'w-44'),
    opacity({ 'opacity-0': !open }),
    visibility({ invisible: !open }),
    gap('gap-y-1'),
    zIndex('z-40'),
    outlineColor('focus:outline-primary'),
    outlineStyle('focus:outline'),
    transitionProperty('transition-all'),
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
    backgroundColor('hover:bg-primary-background'),
    transitionProperty('transition-colors')
  )

export default function <T>({
  open,
  options,
  selected,
  onSelect,
}: {
  open: boolean
  options: Option<T>[]
  selected?: Option<T>
  onSelect: (option: Option<T>) => void
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
