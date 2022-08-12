import env from 'helpers/env'

const data = {
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredEmail',
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredGNFT',
  },
  ExternalERC721: {
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredNFT',
  },
} as {
  [store: string]: {
    ledger: string
    postStorage: string
    twitter: string
  }
}

export default {
  Email: {
    ledger: env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredEmail',
  },
  ERC721: {
    ledger: env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredGNFT',
  },
  ExternalERC721: {
    ledger: env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
    postStorage: env.VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS,
    twitter: 'SealCredNFT',
  },
}
