import { ErrorText, TextareaText } from 'components/Text'
import { FC, useEffect, useState } from 'react'

interface CounterProps {
  text: string
  maxLength: number
  dontCount?: string
}

const Counter: FC<CounterProps> = ({ text, maxLength, dontCount }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(dontCount ? text.replaceAll(dontCount, '').length : text.length)
  }, [dontCount, text])

  return (
    <>
      {count > maxLength ? (
        <ErrorText>
          {count} / {maxLength}
        </ErrorText>
      ) : (
        <TextareaText>
          {count} / {maxLength}
        </TextareaText>
      )}
    </>
  )
}

export default Counter
