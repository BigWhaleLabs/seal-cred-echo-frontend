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
  position,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const button = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  width('w-full'),
  gap('gap-x-2')
)

export default function <T>({
  currentValue,
  placeholder,
  options,
  onChange,
  wrapSelected = false,
}: {
  currentValue?: T
  placeholder?: string
  options: Option<T>[]
  onChange: (selectedValue: T) => void
  wrapSelected?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedOption = options.find((o) => o.value === currentValue)

  const selectedElement = (
    <button onClick={() => options.length && setOpen(!open)} className={button}>
      {selectedOption?.label || placeholder}
      <div className={width('w-5')}>
        <Arrow pulseDisabled open={open} />
      </div>
    </button>
  )

  return (
    <div className={position('relative')} ref={ref}>
      {wrapSelected ? (
        <ItemContainer>{selectedElement}</ItemContainer>
      ) : (
        selectedElement
      )}
      <Menu
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
