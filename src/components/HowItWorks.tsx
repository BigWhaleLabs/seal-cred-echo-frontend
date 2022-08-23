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
import data from 'data'

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
          <AccentText color="text-secondary">NFT</AccentText> or an{' '}
          <AccentText color="text-secondary">email</AccentText> without
          revealing your identity.
        </CardParagraph>
        <CardParagraph>
          This means you can speak as an NFT holder, spill the tea about your
          place of employment, or just share your thoughts on Twitter without
          anyone (even us!) knowing it’s you. All tweets are posted to{' '}
          {Object.values(data).map(({ twitter }, i, array) => (
            <span key={twitter}>
              {i > 0 ? (i < array.length - 1 ? ', ' : ' or ') : ''}
              <LinkText url={`https://twitter.com/${twitter}`}>
                @{twitter}
              </LinkText>
            </span>
          ))}{' '}
          respectively.
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
              Mint a ZK Badge (
              <LinkText url="https://sealcred.xyz/app">here</LinkText>
              ).
            </ListItem>
            <ListItem>Connect the anonymous wallet to this page.</ListItem>
            <ListItem>Post your message.</ListItem>
          </OrderedList>
        </HintCard>
        <CardSubheader>A few things to consider</CardSubheader>
        <HintCard>
          <OrderedList>
            <ListItem>
              The email or NFT symbol will be appended to the end of the tweet.
            </ListItem>
            <ListItem>
              Extreme profanity will be filtered by our cute little SealBots to
              be compliant with Twitter rules.
            </ListItem>
            <ListItem>
              Your message will be posted here (on the blockchain) right away as
              well as tweeted after passing the moderation.
            </ListItem>
          </OrderedList>
        </HintCard>
      </Card>
    </div>
  )
}
