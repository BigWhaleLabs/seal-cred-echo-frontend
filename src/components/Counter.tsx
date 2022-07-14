import { BadgeText, ErrorText } from 'components/Text'
import { useEffect, useState } from 'preact/hooks'

interface CounterProps {
  text: string
  maxLength: number
}

export default function ({ text, maxLength }: CounterProps) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(text.length)
  }, [text])

  return (
    <>
      {count > maxLength ? (
        <ErrorText>
          {count} / {maxLength}
        </ErrorText>
      ) : (
        <BadgeText>
          {count} / {maxLength}
        </BadgeText>
      )}
    </>
  )
}
