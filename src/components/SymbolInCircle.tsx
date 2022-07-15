import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  boxSizing,
  cursor,
  display,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  padding,
  width,
} from 'classnames/tailwind'

const symbolStyles = (small?: boolean, disabled?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize(small ? 'text-xs' : 'text-base'),
    fontFamily('font-primary'),
    cursor(disabled ? undefined : 'cursor-pointer')
  )

const borderWrapper = (small?: boolean, paddings?: boolean) =>
  classnames(
    boxSizing('box-content'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    width(small ? 'w-4' : 'w-6'),
    height(small ? 'h-4' : 'h-6'),
    padding(
      paddings ? { 'py-0.5': true, 'px-2': true, 'sm:px-1': true } : undefined
    )
  )

export default function ({
  text = '!',
  small,
  paddings,
  disabled,
}: {
  text?: string
  small?: boolean
  paddings?: boolean
  disabled?: boolean
}) {
  return (
    <div className={borderWrapper(small, paddings)}>
      <div className={symbolStyles(small, disabled)}>{text}</div>
    </div>
  )
}
