import { LinkText } from 'components/Text'
import LinkContent from 'components/PostProcessing/LinkContent'

export default function ({
  url,
  internal,
  pending,
  onClick,
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
      url={url}
      title={linkTitle}
      gradientFrom="from-secondary"
      gradientTo="to-accent"
      internal={internal}
    >
      <LinkContent text={linkTitle} onClick={onClick} />
    </LinkText>
  )
}
