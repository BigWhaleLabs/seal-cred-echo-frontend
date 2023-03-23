import { ChangeEvent, StateUpdater } from 'preact/compat'
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
import { parseError } from '@big-whale-labs/frontend-utils'
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
  currentAddress: string
  onTextChange: (text: string) => void
  setSuffix: StateUpdater<string>
  maxLength: number
  disabled?: boolean
  error?: unknown
  footer?: string
}

export default function ({
  currentAddress,
  disabled,
  error,
  maxLength,
  onTextChange,
  setSuffix,
  text,
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
              disabled={disabled}
              maxLength={maxLength}
              minRows={5}
              spellcheck={true}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                onTextChange(event.currentTarget.value)
              }}
              {...restProps}
            />
          </TextareaText>
          <SuffixBlock
            currentAddress={currentAddress}
            maxCount={maxLength}
            setSuffix={setSuffix}
            text={text}
          />
        </div>
      </div>
      {!!error && (
        <ErrorText withExclamation visible={!!error}>
          {parseError(error)}
        </ErrorText>
      )}
    </div>
  )
}
