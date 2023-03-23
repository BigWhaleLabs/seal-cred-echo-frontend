import { LinkText } from 'components/Text'
import LinkContent from 'components/PostProcessing/LinkContent'

export default function ({
  internal,
  onClick,
  pending,
  url,
}: {
  url: string
  internal?: boolean
  pending?: boolean
  onClick?: () => void
}) {
  const linkTitle = pending ? 'View Tweet status' : 'View Twitter page'

  return (
    <LinkText
      small
      gradientFrom="from-secondary"
      gradientTo="to-accent"
      internal={internal}
      title={linkTitle}
      url={url}
    >
      <LinkContent text={linkTitle} onClick={onClick} />
    </LinkText>
  )
}
