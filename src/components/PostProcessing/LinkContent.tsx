import Button from 'components/Button'

export default function ({
  onClick,
  text,
}: {
  text: string
  onClick?: () => void
}) {
  return (
    <Button
      gradientFont
      small
      withArrow
      onClick={() => (onClick ? onClick() : undefined)}
    >
      {text}
    </Button>
  )
}
