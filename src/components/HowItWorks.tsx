import {
  CardParagraph,
  CardSubheder,
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
          With SealCred’s ZK Badges for email, you can prove you work somewhere
          without revealing your identity.
        </CardParagraph>
        <CardParagraph>
          This means you can spill the tea about your place of employment on
          Twitter without anyone (even us!) from knowing it’s you. All tweets
          are posted to{' '}
          <LinkText url="https://twitter.com/SealCredWork">
            @SealCredWork
          </LinkText>
          .
        </CardParagraph>
        <CardParagraph>
          <LinkText url="https://sealcred.xyz/email">
            <Button small gradientFont withArrow type="tertiary">
              Create a zkBadge using your work email
            </Button>
          </LinkText>
        </CardParagraph>
      </Card>
      <Card>
        <HeaderText>How this works</HeaderText>
        <HintCard>
          <OrderedList>
            <ListItem>
              Mint your ZK Badge with your email (
              <LinkText url="https://sealcred.xyz/app">here</LinkText>
              ).
            </ListItem>
            <ListItem>Connect your anonymous wallet to this page.</ListItem>
            <ListItem>Create your message.</ListItem>
          </OrderedList>
        </HintCard>
        <CardSubheder>A few things to consider</CardSubheder>
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
              Your message will be posted here as well as tweeted on{' '}
              <LinkText url="https://twitter.com/SealCredWork">
                @SealCredWork
              </LinkText>
              .
            </ListItem>
          </OrderedList>
        </HintCard>
      </Card>
    </div>
  )
}
