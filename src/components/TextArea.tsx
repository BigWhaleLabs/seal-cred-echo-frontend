import { ChangeEvent } from 'preact/compat'
import { JSX } from 'preact/jsx-runtime'
import { TextareaText } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  flexDirection,
  flexGrow,
  maxHeight,
  outlineStyle,
  padding,
  resize,
  space,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import { useEffect, useState } from 'preact/hooks'
import Counter from 'components/Counter'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'
import classNamesToString from 'helpers/classNamesToString'

const container = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-stretch', 'md:items-start'),
  space('space-y-2', 'md:space-x-2', 'md:space-y-0')
)
const wrapper = (error?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flexGrow('grow'),
    alignItems('items-stretch'),
    borderWidth('border'),
    borderColor(error ? 'border-error' : 'border-formal-accent'),
    borderRadius('rounded-3xl'),
    padding('py-3', 'px-6'),
    transitionProperty('transition-colors'),
    borderColor('focus-within:border-accent')
  )
const textBox = (noWrap?: boolean) =>
  classnames(
    backgroundColor('bg-transparent'),
    resize('resize-none'),
    width('w-full'),
    transitionProperty('transition-colors'),
    outlineStyle('outline-none', 'focus:outline-none'),
    noWrap ? maxHeight('max-h-6') : undefined
  )

interface TextAreaProps {
  text: string
  onTextChange: (text: string) => void
  disabled?: boolean
  maxLength?: number
  dontCount?: string

  footer?: JSX.Element
  right?: JSX.Element
}

export default function ({
  text,
  onTextChange,
  maxLength,
  dontCount,
  right,
  footer,
  rows,
  ...restProps
}: TextAreaProps & TextareaAutosizeProps) {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(maxLength !== undefined ? text.length <= maxLength : true)
  }, [maxLength, text])

  return (
    <div className={container}>
      <div className={wrapper(!isValid)}>
        <TextareaText>
          <TextareaAutosize
            className={classNamesToString('no-scrollbar', textBox(rows === 1))}
            value={text}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              onTextChange(event.currentTarget.value)
            }
            maxLength={
              dontCount && maxLength ? maxLength + dontCount.length : maxLength
            }
            rows={rows}
            {...restProps}
          />
        </TextareaText>

        {maxLength !== undefined && text.length > maxLength / 10 && (
          <Counter text={text} maxLength={maxLength} dontCount={dontCount} />
        )}
        {footer}
      </div>
      {right}
    </div>
  )
}
