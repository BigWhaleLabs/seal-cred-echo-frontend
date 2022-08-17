import { BodyText, LinkText } from 'components/Text'

export default function ({ blockchainLink }: { blockchainLink: string }) {
  return (
    <BodyText primary>
      Your tweet was rejected. It is still{' '}
      <LinkText internal url={blockchainLink}>
        posted to the blockchain
      </LinkText>{' '}
      and visible on SealCred Echo, but all tweets must abide by Twitter’s rules
      and not contain extreme profanity. If you have any questions,{' '}
      <LinkText url="https://discord.com/NHk96pPZUV">
        message us on our Discord
      </LinkText>
      .
    </BodyText>
  )
}
