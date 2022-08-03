import { JSX } from 'preact/jsx-runtime'
import { MutableRef, useRef, useState } from 'preact/hooks'
import { SelectOption } from 'models/SelectOption'
import { TextareaText } from 'components/Text'
import Arrow from 'icons/Arrow'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  fontFamily,
  inset,
  justifyContent,
  opacity,
  outlineColor,
  outlineStyle,
  padding,
  position,
  space,
  textAlign,
  textColor,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const sharedStyles = (border?: boolean) =>
  classnames(
    borderRadius('rounded-lg'),
    borderWidth({ border }),
    borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
    outlineColor({ 'focus:outline-primary': border }),
    outlineStyle({ 'focus:outline': border }),
    transitionProperty('transition-colors'),
    padding({
      'tiny:px-4': border,
      'px-3': border,
      'py-3': border,
    }),
    backgroundColor({ 'bg-primary-dark': border }),
    alignItems('items-center')
  )

const wrapper = (hasOptions: boolean, hasBorder?: boolean) =>
  classnames(
    position('relative'),
    fontFamily('font-primary'),
    zIndex('z-40'),
    width(
      hasBorder
        ? { 'w-full': true, 'tiny:w-full': true }
        : { 'w-fit': true, 'tiny:w-fit': true }
    ),
    opacity({ 'opacity-70': !hasOptions })
  )
const opener = (border?: boolean) =>
  classnames(
    display('inline-flex'),
    justifyContent('justify-between'),
    width(border ? 'md:w-80' : 'md:w-fit', 'w-full'),
    space('space-x-2'),
    textAlign('text-left'),
    sharedStyles(border)
  )
const menuWrapper = (open: boolean, parentWithBorder?: boolean) =>
  classnames(
    position('absolute'),
    inset(parentWithBorder ? 'top-14' : 'top-9'),
    width(
      parentWithBorder
        ? { 'tiny:w-full': true, 'w-fit': true }
        : { 'sm:w-72': true, 'w-44': true }
    ),
    opacity({ 'opacity-0': !open }),
    visibility({ invisible: !open }),
    transitionProperty('transition-opacity'),
    space('space-y-1'),
    sharedStyles(true)
  )
const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)
const menuItem = (current?: boolean) =>
  classnames(
    padding('p-2'),
    cursor({ 'cursor-pointer': !current }),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    textColor({ 'text-formal-accent-semi-transparent': current }),
    backgroundColor({
      'hover:bg-primary-background': !current,
      'active:bg-primary-dimmed': !current,
    })
  )

function SelectedValueComponent<Data>({
  isDisabled,
  placeholder,
  currentValue,
  userComponent,
}: {
  isDisabled: boolean
  placeholder: string
  currentValue: Data
  userComponent?: JSX.Element
}) {
  return currentValue ? (
    userComponent || (
      <TextareaText dark={isDisabled}>
        <span className={postingAs}>Posting as: </span>
        {currentValue}
      </TextareaText>
    )
  ) : (
    <TextareaText dark>{placeholder}</TextareaText>
  )
}

export default function <SelectData>({
  border,
  current,
  options,
  loading,
  disabled,
  emptyText = 'Nothing to select',
  placeholder = 'Select option',
  SelectedValue,
  OptionElement,
  onChange,
}: {
  current?: SelectData
  border?: boolean
  loading?: boolean
  disabled?: boolean
  emptyText?: string
  placeholder?: string
  options?: SelectOption<SelectData>[]
  SelectedValue?: JSX.Element
  OptionElement?: (optionValue: SelectOption<SelectData>) => JSX.Element
  onChange?: (selected: SelectOption<SelectData>) => void
}) {
  const [dropDownOpen, setOpen] = useState(false)
  const hasOptions = !!options && !!options.length
  const unavailable = !!disabled || !!loading

  const ref = useRef() as MutableRef<HTMLDivElement>
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className={wrapper(hasOptions, border)} ref={ref}>
      <button
        onClick={() => setOpen(!dropDownOpen)}
        disabled={!hasOptions || unavailable}
        className={opener(border)}
      >
        {loading ? (
          <TextareaText dark>Fetching badges...</TextareaText>
        ) : hasOptions ? (
          <SelectedValueComponent
            currentValue={current}
            placeholder={placeholder}
            userComponent={SelectedValue}
            isDisabled={unavailable}
          />
        ) : (
          <TextareaText dark>{emptyText}</TextareaText>
        )}
        <div className={width('w-5')}>
          {loading ? <Spinner /> : <Arrow pulseDisabled open={dropDownOpen} />}
        </div>
      </button>

      <div className={menuWrapper(dropDownOpen, border)}>
        {options &&
          options.map(({ label, value }) => (
            <p
              className={menuItem(label === current || value === current)}
              onClick={() => {
                if (value === current) return
                if (onChange) onChange({ label, value })

                setOpen(false)
              }}
            >
              {OptionElement ? OptionElement({ label, value }) : label}
            </p>
          ))}
      </div>
    </div>
  )
}
