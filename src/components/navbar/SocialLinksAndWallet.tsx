import { AccentText } from 'components/Text'
import { displayOnMdAndLarger } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import EnsAddress from 'components/EnsAddress'
import SealWallet from 'icons/SealWallet'
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
  lineHeight('leading-5'),
  display('sm:flex', 'hidden')
)

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <div className={container}>
      <div className={displayOnMdAndLarger}>
        <SocialLinks />
      </div>
      <Delimiter primary className={displayOnMdAndLarger} />
      <div
        className={walletContainer}
        onClick={async () => {
          if (account) {
            window.open(getEtherscanAddressUrl(account), '_blank')
          } else {
            await WalletStore.connect(true)
          }
        }}
      >
        <div className={walletAccount}>
          <AccentText
            color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
          >
            {account ? <EnsAddress address={account} /> : 'No wallet connected'}
          </AccentText>
        </div>
        <div className={width('w-fit')}>
          <SealWallet connected={!!account} />
        </div>
      </div>
    </div>
  )
}
