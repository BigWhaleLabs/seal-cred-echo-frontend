import { AccentText, SocialLink } from 'components/Text'
import { useSnapshot } from 'valtio'
import Discord from 'icons/Discord'
import EnsAddress from 'components/EnsAddress'
import SealWallet from 'icons/SealWallet'
import Twitter from 'icons/Twitter'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  gap,
  height,
  lineHeight,
  textAlign,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const displayOnMdAndLarger = display('hidden', 'md:flex')
const container = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-4')
)
const socialLinkContainer = classnames(container, displayOnMdAndLarger)
const delimeterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4'),
  displayOnMdAndLarger
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
      <div className={socialLinkContainer}>
        <SocialLink url="https://discord.gg/NHk96pPZUV">
          <Discord />
        </SocialLink>
        <SocialLink url="https://twitter.com/bigwhalelabs">
          <Twitter />
        </SocialLink>
      </div>
      <hr className={delimeterContainer} />
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
