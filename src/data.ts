import env from 'helpers/env'

export const data = {
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

export type DataContractNames = keyof typeof data
