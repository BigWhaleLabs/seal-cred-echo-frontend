import Button from 'components/Button'

export default function ({
  text,
  onClick,
}: {
  text: string
  onClick?: () => void
}) {
  return (
    <Button
      small
      gradientFont
      withArrow
      onClick={() => (onClick ? onClick() : undefined)}
    >
      {text}
    </Button>
  )
}
