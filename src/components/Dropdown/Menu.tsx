import ItemContainer from 'components/Dropdown/ItemContainer'
import Option from 'components/Dropdown/Option'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  inset,
  margin,
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

const container = (closed: boolean, forZkBadges?: boolean) =>
  classnames(
    position('absolute'),
    inset('right-0'),
    margin(forZkBadges ? 'mt-4' : 'mt-2'),
    opacity({ 'opacity-0': closed }),
    visibility({ invisible: closed }),
    zIndex('z-40'),
    transitionProperty('transition-all'),
    width(forZkBadges ? 'w-full' : 'w-52')
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
  forZkBadges,
  onSelect,
  open,
  options,
  selected,
}: {
  open: boolean
  options: Option<T>[]
  selected?: Option<T>
  onSelect: (option: Option<T>) => void
  forZkBadges?: boolean
}) {
  return (
    <div className={container(!open, forZkBadges)}>
      <ItemContainer withPadding forZkBadges={forZkBadges}>
        {options.map((option) => (
          <p
            className={menuItem(option.value === selected?.value)}
            key={option.value}
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
