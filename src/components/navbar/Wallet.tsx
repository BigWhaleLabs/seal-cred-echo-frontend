import { AccentText, SocialLink } from 'components/Text'
import { useSnapshot } from 'valtio'
import Discord from 'icons/Discord'
import ENSAddress from 'components/ENSAddress'
import SealWallet from 'icons/SealWallet'
import Twitter from 'icons/Twitter'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  height,
  lineHeight,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import useBreakpoints from 'hooks/useBreakpoints'

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5'),
  display('sm:flex', 'hidden')
)
const container = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  cursor('cursor-pointer')
)
const delimeterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)

export default function () {
  const { account } = useSnapshot(WalletStore)
  const { md } = useBreakpoints()

  return (
    <div className={container}>
      {md && (
        <>
          <div className={container}>
            <SocialLink url="https://discord.gg/NHk96pPZUV">
              <Discord />
            </SocialLink>
            <SocialLink url="https://twitter.com/bigwhalelabs">
              <Twitter />
            </SocialLink>
          </div>
          <hr className={delimeterContainer} />
        </>
      )}
      <div
        className={container}
        onClick={async () => {
          if (account) {
            const newWindow = window.open(
              getEtherscanAddressUrl(account),
              '_blank'
            )
            if (newWindow) {
              newWindow?.focus()
              newWindow.opener = null
            }
          } else {
            await WalletStore.connect(true)
          }
        }}
      >
        <div className={walletAccount}>
          <AccentText
            color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
          >
            {account ? <ENSAddress address={account} /> : 'No wallet connected'}
          </AccentText>
        </div>
        <div className={width('w-fit')}>
          <SealWallet connected={!!account} />
        </div>
      </div>
    </div>
  )
}
