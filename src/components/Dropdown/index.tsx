import { createRef } from 'preact'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import ItemContainer from 'components/Dropdown/ItemContainer'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  display,
  gap,
  justifyContent,
  opacity,
  padding,
  position,
  textColor,
  width,
  wordBreak,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const button = (forZkBadges?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-between'),
    alignItems('items-center'),
    width('w-full'),
    gap('gap-x-2'),
    padding({ 'p-3': forZkBadges }),
    opacity('disabled:opacity-30')
  )

const container = (forZkBadges?: boolean) =>
  classnames(
    position('relative'),
    width('md:w-fit', { 'w-full': forZkBadges }),
    wordBreak('break-all')
  )

export default function <T>({
  currentValue,
  disabled,
  forZkBadges,
  onChange,
  options,
  placeholder,
  removeArrow,
}: {
  disabled?: boolean
  currentValue?: T
  placeholder?: string
  options: Option<T>[]
  onChange: (selectedValue: T) => void
  forZkBadges?: boolean
  removeArrow?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedOption = options.find((o) => o.value === currentValue)

  const selectedElement = (
    <button
      className={button(forZkBadges)}
      disabled={disabled}
      onClick={() => options.length && setOpen(!open)}
    >
      {selectedOption?.label || placeholder}
      {!removeArrow && (
        <div className={width('w-5')}>
          <Arrow pulseDisabled open={open} />
        </div>
      )}
    </button>
  )

  return (
    <div className={container(forZkBadges)} ref={ref}>
      {forZkBadges ? (
        <ItemContainer forZkBadges>{selectedElement}</ItemContainer>
      ) : (
        <span className={textColor('text-primary')}>{selectedElement}</span>
      )}
      <Menu
        forZkBadges={forZkBadges}
        open={open}
        options={options}
        selected={selectedOption}
        onSelect={(option) => {
          onChange(option.value)
          setOpen(false)
        }}
      />
    </div>
  )
}
