import ChildrenProp from 'models/ChildrenProp'
import ConnectWalletOrCreatePost from 'components/ConnectWalletOrCreatePost'
import NavTabLink from 'components/NavTabLink'
import TabBar from 'components/TabBar'

export default function ({ children }: ChildrenProp) {
  return (
    <>
      <ConnectWalletOrCreatePost />
      <TabBar>
        <NavTabLink label="How this works" to="/" />
        <NavTabLink label="Previous Tweets" to="/tweets" />
        <NavTabLink label="Deep Dive" to="/deep-dive" />
      </TabBar>
      {children}
    </>
  )
}
