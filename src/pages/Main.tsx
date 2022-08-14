import ChildrenProp from 'models/ChildrenProp'
import ConnectWalletOrCreatePost from 'components/ConnectWalletOrCreatePost'
import NavTabLink from 'components/NavTabLink'
import TabBar from 'components/TabBar'

export default function ({ children }: ChildrenProp) {
  return (
    <>
      <ConnectWalletOrCreatePost />
      <TabBar>
        <NavTabLink to="/" label="How this works" />
        <NavTabLink to="/tweets" label="Previous Tweets" />
        <NavTabLink to="/deep-dive" label="Deep Dive" />
      </TabBar>

      {children}
    </>
  )
}
