import { AccentText } from 'components/Text'
import { displayOnMdAndLarger } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import ENSAddress from 'components/ENSAddress'
import SealWallet from 'icons/SealWallet'
import SmallSealWallet from 'icons/SmallSealWallet'
import SocialLinks from 'components/SocialLinks'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  gap,
  lineHeight,
  textAlign,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const container = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-4')
)
const walletContainer = classnames(container, cursor('cursor-pointer'))
const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

export default function () {
  const { account } = useSnapshot(WalletStore)
  const connected = !!account

  return (
    <div className={container}>
      <div className={displayOnMdAndLarger}>
        <SocialLinks />
      </div>
      <Delimiter primary className={displayOnMdAndLarger} />
      <div
        className={walletContainer}
        onClick={async () => {
          if (connected) {
            window.open(getEtherscanAddressUrl(account), '_blank')
          } else {
            await WalletStore.connect(true)
          }
        }}
      >
        <div className={walletAccount}>
          <AccentText
            color={connected ? 'text-accent' : 'text-primary-semi-dimmed'}
          >
            {connected ? (
              <ENSAddress address={account} />
            ) : (
              'No wallet connected'
            )}
          </AccentText>
        </div>
        <div className={width('w-fit')}>
          <div className={classnames(display('sm:flex', 'hidden'))}>
            <SealWallet connected={connected} />
          </div>
          <div className={classnames(display('sm:hidden', 'flex'))}>
            <SmallSealWallet connected={connected} />
          </div>
        </div>
      </div>
    </div>
  )
}
