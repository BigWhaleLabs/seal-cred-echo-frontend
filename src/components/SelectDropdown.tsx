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
    borderWidth({ border: border }),
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

const wrapper = (hasOptions: boolean) =>
  classnames(
    position('relative'),
    fontFamily('font-primary'),
    zIndex('z-40'),
    width('w-fit'),
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
    width(parentWithBorder ? 'tiny:w-full' : 'tiny:w-72', 'w-fit'),
    opacity(open ? 'opacity-100' : 'opacity-0'),
    visibility(open ? 'visible' : 'invisible'),
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
    cursor(current ? 'cursor-default' : 'cursor-pointer'),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    textColor(
      current ? 'text-formal-accent-semi-transparent' : 'text-formal-accent'
    ),
    backgroundColor({
      'hover:bg-primary-background': !current,
      'active:bg-primary-dimmed': !current,
    })
  )

export default function ({
  border,
  current,
  options,
  loading,
  disabled,
  OptionElement,
  SelectedValue,
  onChange,
}: {
  border?: boolean
  current: string
  options: SelectOption[]
  loading?: boolean
  disabled?: boolean
  OptionElement?: (optionValue: SelectOption) => JSX.Element
  SelectedValue?: JSX.Element
  onChange?: (selected: SelectOption) => void
}) {
  const [dropDownOpen, setOpen] = useState(false)
  const hasOptions = !!options.length
  const isDisabled = disabled || loading

  const ref = useRef() as MutableRef<HTMLDivElement>
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className={wrapper(hasOptions)} ref={ref}>
      <button
        onClick={() => setOpen(!dropDownOpen)}
        disabled={!hasOptions || isDisabled}
        className={opener(border)}
      >
        {loading ? (
          <TextareaText dark>Fetching badges...</TextareaText>
        ) : hasOptions ? (
          <>
            {current ? (
              <>
                {SelectedValue ? (
                  SelectedValue
                ) : (
                  <TextareaText dark={isDisabled}>
                    <span className={postingAs}>Posting as: </span>
                    {current}
                  </TextareaText>
                )}
              </>
            ) : (
              <TextareaText dark>Select badge</TextareaText>
            )}
          </>
        ) : (
          <TextareaText dark>No ZK badge in this wallet</TextareaText>
        )}

        <div className={width('w-5')}>
          {loading ? <Spinner /> : <Arrow pulseDisabled open={dropDownOpen} />}
        </div>
      </button>

      <div className={menuWrapper(dropDownOpen, border)}>
        {options.map(({ label, value }) => (
          <p
            className={menuItem(label === current || value === current)}
            onClick={() => {
              if (value === current) return
              if (onChange) onChange({ label, value })

              setOpen(false)
            }}
          >
            {OptionElement ? OptionElement({ label, value }) : label || value}
          </p>
        ))}
      </div>
    </div>
  )
}
