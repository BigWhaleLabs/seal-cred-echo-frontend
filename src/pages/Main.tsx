import ChildrenProp from 'models/ChildrenProp'
import NavTabLink from 'components/NavTabLink'
import TabBar from 'components/TabBar'
import WalletOrTweet from 'components/WalletOrTweet'

export default function ({ children }: ChildrenProp) {
  return (
    <>
      <WalletOrTweet />
      <TabBar>
        <NavTabLink to="/how-it-works" label="How this works" />
        <NavTabLink to="/previous-tweets" label="Previous Tweets" />
        <NavTabLink to="/deep-dive" label="Deep Dive" />
      </TabBar>

      {children}
    </>
  )
}
