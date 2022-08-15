import { BodyText, LinkText } from 'components/Text'

export default function ({ twitterUsername }: { twitterUsername: string }) {
  return (
    <BodyText>
      <LinkText url={`https://twitter.com/${twitterUsername}`}>
        @{twitterUsername}
      </LinkText>
    </BodyText>
  )
}
