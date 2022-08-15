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
import { parseError } from 'helpers/handleError'
import SuffixBlock from 'components/SuffixBlock'
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
const innerWrapper = (isValid?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flexGrow('grow'),
    alignItems('items-stretch'),
    justifyContent('justify-between'),
    borderWidth('border'),
    borderColor(
      isValid ? 'border-formal-accent-dimmed' : 'border-error',
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
  maxLength: number
  suffix: string
  onTextChange: (text: string) => void
  disabled?: boolean
  error?: unknown
  footer?: string
}

export default function ({
  text,
  onTextChange,
  maxLength,
  disabled,
  error,
  suffix,
  ...restProps
}: TextAreaProps & TextareaAutosizeProps) {
  const isValid = !error && text.length <= maxLength

  return (
    <div className={textWithErrorWrapper}>
      <div className={containerWithFooter}>
        <div className={innerWrapper(isValid)}>
          <TextareaText dark={disabled}>
            <TextareaAutosize
              className={classNamesToString('no-scrollbar', textBox)}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                onTextChange(event.currentTarget.value)
              }}
              disabled={disabled}
              maxLength={maxLength}
              minRows={5}
              spellcheck={true}
              {...restProps}
            />
          </TextareaText>
          <SuffixBlock maxCount={maxLength} text={text} suffix={suffix} />
        </div>
      </div>
      <ErrorText visible={!!error} withExclamation>
        {parseError(error)}
      </ErrorText>
    </div>
  )
}
