import {
  Ledger,
  Ledger__factory,
} from '@big-whale-labs/seal-cred-ledger-contract'
import {
  SCPostStorage,
  SCPostStorage__factory,
} from '@big-whale-labs/seal-cred-posts-contract'
import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'

export interface DataType {
  [ledgerName: string]: {
    ledger: Ledger
    postStorage: SCPostStorage
    twitter: string
  }
}

function connectLedger(address: string) {
  return Ledger__factory.connect(address, defaultProvider)
}

function connectPostsStorage(address: string) {
  return SCPostStorage__factory.connect(address, defaultProvider)
}

const data: DataType = {
  Email: {
    ledger: connectLedger(env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS),
    postStorage: connectPostsStorage(env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS),
    twitter: 'SealCredEmail',
  },
  ERC721: {
    ledger: connectLedger(env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS),
    postStorage: connectPostsStorage(env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS),
    twitter: 'SealCredGNFT',
  },
  ExternalERC721: {
    ledger: connectLedger(env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS),
    postStorage: connectPostsStorage(
      env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS
    ),
    twitter: 'SealCredNFT',
  },
}

export const ledgerNames = Object.keys(data)
export default data
