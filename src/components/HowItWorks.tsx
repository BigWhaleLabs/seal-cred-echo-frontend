import { AccentText, HeaderText, LinkText } from 'components/Text'
import Button from 'components/Button'
import Card from 'components/Card'
import ChildrenProp from 'models/ChildrenProp'
import HintCard from 'components/HintCard'
import classnames, {
  display,
  flexDirection,
  fontFamily,
  fontWeight,
  justifyContent,
  lineHeight,
  space,
} from 'classnames/tailwind'

const recordContainer = classnames(display('flex'), space('space-x-4'))

const blockContainer = classnames(
  display('flex'),
  justifyContent('justify-center'),
  flexDirection('flex-col'),
  space('space-y-4')
)

const textContainer = classnames(
  fontFamily('font-primary'),
  lineHeight('leading-6')
)

function Record({ index, children }: { index: number } & ChildrenProp) {
  return (
    <p className={recordContainer}>
      <AccentText color="text-secondary">{index}</AccentText>
      <span>{children}</span>
    </p>
  )
}

export default function () {
  return (
    <div className={blockContainer}>
      <Card>
        <HeaderText>What is this?</HeaderText>
        <p className={textContainer}>
          With SealCred’s ZK Badges for email, you can prove you work somewhere
          without revealing your identity.
        </p>
        <p className={textContainer}>
          This means you can spill the tea about your place of employment on
          Twitter without anyone (even us!) from knowing it’s you. All tweets
          are posted to{' '}
          <LinkText url="https://twitter.com/SealCredWork">
            @SealCredWork
          </LinkText>
          .
        </p>
        <p className={textContainer}>
          <LinkText url="https://sealcred.xyz/email">
            <Button small gradientFont withArrow type="tertiary">
              Create a zkBadge using your work email
            </Button>
          </LinkText>
        </p>
      </Card>
      <Card>
        <HeaderText>How this works</HeaderText>
        <HintCard>
          <Record index={1}>
            Mint your ZK Badge with your email (
            <LinkText url="https://sealcred.xyz/app">here</LinkText>
            ).
          </Record>
          <Record index={2}>Connect your anonymous wallet to this page.</Record>
          <Record index={3}>Create your message.</Record>
        </HintCard>
        <p className={fontWeight('font-bold')}>A few things to consider</p>
        <HintCard>
          <Record index={1}>
            Hashtags (or @) of the place you work will be generated on the
            tweet.
          </Record>
          <Record index={2}>
            Extreme profanity will be filtered by our cute little Sealbots to be
            compliant with Twitter rules.
          </Record>
          <Record index={3}>
            Your message will be posted here as well as tweeted on{' '}
            <LinkText url="https://twitter.com/SealCredWork">
              @SealCredWork
            </LinkText>
            .
          </Record>
        </HintCard>
      </Card>
    </div>
  )
}
