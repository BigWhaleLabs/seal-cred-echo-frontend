import {
  CardParagraph,
  CardSubheader,
  HeaderText,
  LinkText,
} from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import ChildrenProp from 'models/ChildrenProp'
import DeepDiveIcon from 'icons/DeepDiveIcon'

function CardSection({ children }: ChildrenProp) {
  return <section className={space('space-y-4')}>{children}</section>
}

export default function () {
  return (
    <Card>
      <div className={space('space-y-10')}>
        <HeaderText>Can I trust this?</HeaderText>
        <div className={space('space-y-10')}>
          <CardSection>
            <CardSubheader>Who are we?</CardSubheader>
            <CardParagraph>
              <LinkText url="https://sealcred.xyz">SealCred</LinkText>, a
              privacy-preserving social protocol built with zero-knowledge (ZK)
              soul-bound NFTs, is built by{' '}
              <LinkText url="https://bigwhalelabs.com/">
                Big Whale Labs
              </LinkText>
              . We are committed to creating a world where one can build
              pseudonymous profiles and socialize with as much anonymity as they
              want. We do not store your data on our servers, and our
              repositories are fully public (
              <LinkText url="https://github.com/BigWhaleLabs">
                See here
              </LinkText>
              ). If you want to communicate to us directly, or follow along with
              updates,{' '}
              <LinkText url="https://discord.gg/NHk96pPZUV">
                join our Discord.
              </LinkText>
            </CardParagraph>
          </CardSection>
          <CardSection>
            <CardSubheader>What are ZK Badges?</CardSubheader>
            <CardParagraph>
              ZK Badges are minted when you create ‘ZK Proof’ using an NFT,
              asset, or piece of your identity. This is all done using a mix of
              ZK proof, EdDSA, and the blockchain. That allows us to create
              pseudonymous accounts on the blockchain. We also wrote about what
              we’ve done so far on our blog{' '}
              <LinkText url="https://blog.bigwhalelabs.com">here</LinkText>.
            </CardParagraph>
            <CardParagraph>
              Essentially, we use cryptography to keep your identity anonymous
              and verified at the same time.
            </CardParagraph>
          </CardSection>
          <CardSection>
            <CardSubheader>How can emails be anonymous?</CardSubheader>
            <CardParagraph>
              In this case, when you present us with your work email we send you
              a token. If you have access to that email, you can access that
              token. Then, you can use that token to create ZK Proof with
              SealCred (
              <LinkText url="https://sealcred.xyz/email">here</LinkText>), which
              will provide you with a ZK Badge for your anonymous wallet that
              verifies you work somewhere based on your email’s domain (e.g.,
              @company.com).
            </CardParagraph>
          </CardSection>
          <DeepDiveIcon />
        </div>
      </div>
    </Card>
  )
}
