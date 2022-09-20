import { Option } from 'components/SealVerse/Option'
import { createRef } from 'react'
import { useState } from 'react'
import Arrow from 'icons/Arrow'
import Menu from 'components/SealVerse/Menu'
import classnames, {
  alignItems,
  display,
  fontSize,
  gap,
  justifyContent,
  margin,
  opacity,
  position,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const button = classnames(
  display('flex'),
  justifyContent('justify-start'),
  alignItems('items-center'),
  gap('gap-x-2'),
  opacity('disabled:opacity-30')
)
const container = classnames(position('relative'), margin('my-2'))

export default function ({
  disabled,
  currentValue,
  options,
  onChange,
  staticPlaceholder,
  fitToItemSize,
}: {
  currentValue: string
  options: Option[]
  onChange: (selectedValue: string) => void
  disabled?: boolean
  staticPlaceholder?: string
  fitToItemSize?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = createRef<HTMLDivElement>()

  useClickOutside(ref, () => setOpen(false))

  const selectedElement = (
    <button
      onClick={() => options.length && setOpen(!open)}
      className={button}
      disabled={disabled}
    >
      <span className={fontSize('text-sm')}>
        {staticPlaceholder || currentValue}
      </span>
      <div className={width('w-4')}>
        <Arrow pulseDisabled open={open} />
      </div>
    </button>
  )

  return (
    <div className={container} ref={ref}>
      {selectedElement}
      <Menu
        open={open}
        options={options}
        selected={currentValue}
        onSelect={({ value, label }) => {
          onChange(value || label)
          setOpen(false)
        }}
        fitToItemSize={fitToItemSize}
      />
    </div>
  )
}
