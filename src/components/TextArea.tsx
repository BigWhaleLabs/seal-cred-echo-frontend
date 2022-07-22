import { ChangeEvent } from 'preact/compat'
import { ErrorText, TextareaText } from 'components/Text'
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
  justifyContent,
  margin,
  minHeight,
  outlineColor,
  outlineStyle,
  padding,
  resize,
  space,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import { useEffect, useState } from 'preact/hooks'
import HashtagBlock from 'components/HashtagBlock'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'
import classNamesToString from 'helpers/classNamesToString'

const containerWithFooter = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-stretch', 'md:items-start'),
  space('space-y-2', 'md:space-x-2', 'md:space-y-0')
)
const innerWrapper = (error?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flexGrow('grow'),
    alignItems('items-stretch'),
    justifyContent('justify-between'),
    borderWidth('border'),
    borderColor(
      error ? 'border-error' : 'border-formal-accent-dimmed',
      'focus-within:border-formal-accent'
    ),
    outlineColor('focus-within:outline-primary'),
    outlineStyle('focus-within:outline'),
    borderRadius('rounded-lg'),
    padding('py-3', 'px-4'),
    transitionProperty('transition-colors'),
    backgroundColor('bg-primary-dark'),
    minHeight('min-h-text-input')
  )
const textWithErrorWrapper = classnames(margin('my-5'), space('space-y-4'))

const textBox = classnames(
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

  error?: string
  footer?: string
}

export default function ({
  text,
  onTextChange,
  maxLength,
  error,
  ...restProps
}: TextAreaProps & TextareaAutosizeProps) {
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(
      !error && (maxLength !== undefined ? text.length <= maxLength : true)
    )
  }, [maxLength, text, error])

  return (
    <div className={textWithErrorWrapper}>
      <div className={containerWithFooter}>
        <div className={innerWrapper(!isValid && !!error)}>
          <TextareaText>
            <TextareaAutosize
              className={classNamesToString('no-scrollbar', textBox)}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                onTextChange(event.currentTarget.value)
              }
              maxLength={maxLength}
              minRows={5}
              spellcheck={true}
              {...restProps}
            />
          </TextareaText>
          <HashtagBlock />
        </div>
      </div>
      <ErrorText visible={!!error} withExclamation>
        {error}
      </ErrorText>
    </div>
  )
}
