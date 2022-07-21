import WalletStore from 'stores/WalletStore'
import entropy from 'helpers/entropy'

export default function () {
  if (!WalletStore.account) throw new Error('No account found')
  return `${
    WalletStore.account
  } for SealCred Work\nnonce: 0x${entropy.string()}`
}