import { BodyText, LinkText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import CreatePost from 'components/CreatePost'
import HintCard from 'components/HintCard'
import WalletStore from 'stores/WalletStore'

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <>
      <HintCard>
        <BodyText primary>
          Your tweet was rejected. It is still{' '}
          <LinkText url="">posted to the blockchain</LinkText> and visible on
          SealCred Echo, but all tweets must abide by Twitter’s rules and not
          contain extreme profanity. If you have any questions,{' '}
          <LinkText url="">message us on our Discord</LinkText>.
        </BodyText>
      </HintCard>
      {account ? <CreatePost /> : <ConnectWalletBlock />}
    </>
  )
}
