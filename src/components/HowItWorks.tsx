import {
  AccentText,
  CardParagraph,
  CardSubheader,
  HeaderText,
  LinkText,
} from 'components/Text'
import { ListItem } from 'components/OrderedList'
import Button from 'components/Button'
import Card from 'components/Card'
import HintCard from 'components/HintCard'
import OrderedList from 'components/OrderedList'
import classnames, {
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const blockContainer = classnames(
  display('flex'),
  justifyContent('justify-center'),
  flexDirection('flex-col'),
  space('space-y-4')
)

export default function () {
  return (
    <div className={blockContainer}>
      <Card>
        <HeaderText>What is this?</HeaderText>
        <CardParagraph>
          With SealCred’s ZK Badges, you can prove you own an{' '}
          <AccentText color="text-secondary">NFT</AccentText>,{' '}
          <AccentText color="text-secondary">email</AccentText>, or{' '}
          <AccentText color="text-secondary">
            asset amount (coming soon)
          </AccentText>{' '}
          without revealing your identity.
        </CardParagraph>
        <CardParagraph>
          This means you can speak as an NFT holder, spill the tea about your
          place of employment, or just share your thoughts on Twitter without
          anyone (even us!) from knowing it’s you. All tweets are posted to
          <LinkText url="https://twitter.com/SelCredNFT">
            @SelCredNFT
          </LinkText>{' '}
          for all NFT posts and{' '}
          <LinkText url="https://twitter.com/SealCredWork">
            @SealCredWork
          </LinkText>{' '}
          for email posts.
        </CardParagraph>
        <CardParagraph>
          <LinkText url="https://sealcred.xyz/app">
            <Button small gradientFont withArrow>
              Create a zkBadge
            </Button>
          </LinkText>
        </CardParagraph>
      </Card>
      <Card>
        <HeaderText>How this works</HeaderText>
        <HintCard>
          <OrderedList>
            <ListItem>
              Mint your ZK Badge (
              <LinkText url="https://sealcred.xyz/app">here</LinkText>
              ).
            </ListItem>
            <ListItem>Connect your anonymous wallet to this page.</ListItem>
            <ListItem>Create your message.</ListItem>
          </OrderedList>
        </HintCard>
        <CardSubheader>A few things to consider</CardSubheader>
        <HintCard>
          <OrderedList>
            <ListItem>
              Hashtags (or @) of the place you work will be generated on the
              tweet.
            </ListItem>
            <ListItem>
              Extreme profanity will be filtered by our cute little Sealbots to
              be compliant with Twitter rules.
            </ListItem>
            <ListItem>
              Your message will be posted here as well as tweeted.
            </ListItem>
          </OrderedList>
        </HintCard>
      </Card>
    </div>
  )
}
