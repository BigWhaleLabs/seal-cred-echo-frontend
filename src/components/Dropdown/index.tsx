import { TextareaText } from 'components/Text'
import { createRef } from 'preact'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Menu from 'components/Dropdown/Menu'
import Option from 'components/Dropdown/Option'
import classnames, {
  alignItems,
  display,
  fontFamily,
  gap,
  justifyContent,
  position,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const container = classnames(
  position('relative'),
  fontFamily('font-primary'),
  width('w-fit')
)
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
}: {
  currentValue?: T
  placeholder?: string
  options: Option<T>[]
  onChange: (selectedValue: T) => void
}) {
  // State
  const [open, setOpen] = useState(false)
  // Click outside
  const ref = createRef<HTMLDivElement>()
  useClickOutside(ref, () => setOpen(false))
  // Render
  return (
    <div className={container}>
      <button onClick={() => setOpen(!open)} className={button}>
        <TextareaText>
          {options.find((o) => o.value === currentValue)?.label || placeholder}
        </TextareaText>
        <div className={width('w-5')}>
          <Arrow pulseDisabled open={open} />
        </div>
      </button>
      <Menu
        open={open}
        options={options}
        selected={options.find((o) => o.value === currentValue)}
        onSelect={(option) => {
          onChange(option.value)
          setOpen(false)
        }}
      />
    </div>
  )
}
