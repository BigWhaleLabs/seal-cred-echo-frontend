import ItemContainer from 'components/Dropdown/ItemContainer'
import Option from 'components/Dropdown/Option'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  inset,
  opacity,
  padding,
  position,
  textColor,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = (closed: boolean) =>
  classnames(
    position('absolute'),
    inset('top-16'),
    width('sm:w-80', 'w-44'),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all')
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
    <div className={container(!open)}>
      <ItemContainer withPadding>
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
      </ItemContainer>
    </div>
  )
}
