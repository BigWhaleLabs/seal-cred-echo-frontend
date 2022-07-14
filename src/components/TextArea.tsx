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
  minHeight,
  outlineStyle,
  padding,
  resize,
  space,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import { useEffect, useState } from 'preact/hooks'
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
    borderColor(
      error ? 'border-error' : 'border-formal-accent-dimmed',
      'focus-within:border-formal-accent'
    ),
    borderRadius('rounded-lg'),
    padding('py-3', 'px-4'),
    transitionProperty('transition-colors'),
    backgroundColor('bg-primary-dark'),
    minHeight('min-h-text-input')
  )
const textBox = () =>
  classnames(
    backgroundColor('bg-primary-dark'),
    resize('resize-none'),
    width('w-full'),
    transitionProperty('transition-colors'),
    outlineStyle('outline-none', 'focus:outline-none')
  )

interface TextAreaProps {
  text: string
  onTextChange: (text: string) => void
  disabled?: boolean
  maxLength?: number

  footer?: JSX.Element
}

export default function ({
  text,
  onTextChange,
  maxLength,
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
            className={classNamesToString('no-scrollbar', textBox())}
            value={text}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              onTextChange(event.currentTarget.value)
            }
            maxLength={maxLength}
            rows={rows}
            {...restProps}
          />
        </TextareaText>

        {footer}
      </div>
    </div>
  )
}
