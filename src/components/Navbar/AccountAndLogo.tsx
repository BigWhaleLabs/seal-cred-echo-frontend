import { AccentText, LinkText } from 'components/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import ENSAddress from 'components/ENSAddress'
import SealWallet from 'icons/SealWallet'
import SmallSealWallet from 'icons/SmallSealWallet'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  space,
  whitespace,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer'),
  whitespace('whitespace-nowrap')
)

function AccountLogo({ connected }: { connected?: boolean }) {
  return (
    <div className={width('w-fit')}>
      <div className={displayFrom('sm')}>
        <SealWallet connected={connected} />
      </div>
      <div className={displayTo('sm')}>
        <SmallSealWallet connected={connected} />
      </div>
    </div>
  )
}

export default function () {
  const { account } = useSnapshot(WalletStore)
  const connected = !!account

  if (connected) {
    return (
      <LinkText url={getEtherscanAddressUrl(account)}>
        <div className={accountLinkContainer}>
          <AccentText color="text-accent">
            <ENSAddress address={account} />
          </AccentText>

          <AccountLogo connected />
        </div>
      </LinkText>
    )
  }

  return (
    <div
      className={accountLinkContainer}
      onClick={async () => await WalletStore.connect(true)}
    >
      <AccentText color="text-primary-semi-dimmed">
        <span className={displayFrom('body')}>No wallet connected</span>
        <span className={displayTo('body')}>No wallet</span>
      </AccentText>

      <AccountLogo />
    </div>
  )
}
