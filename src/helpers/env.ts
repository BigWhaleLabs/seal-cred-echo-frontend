import {
  ETH_NETWORK,
  ETH_RPC,
  GSN_PAYMASTER_CONTRACT_ADDRESS,
  GSN_RELAY_HUB_CONTRACT_ADDRESS,
  GSN_SC_RELAY,
  SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_GSN_PAYMASTER_CONTRACT_ADDRESS: str({
    default: GSN_PAYMASTER_CONTRACT_ADDRESS,
  }),
  VITE_GSN_RELAY_HUB_CONTRACT_ADDRESS: str({
    default: GSN_RELAY_HUB_CONTRACT_ADDRESS,
  }),
  VITE_GSN_SC_RELAY: str({ default: GSN_SC_RELAY }),
  VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_NFT_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_EXTERNAL_NFT_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS: str(),
  VITE_SC_NFT_POSTS_CONTRACT_ADDRESS: str(),
  VITE_SC_EXTERNAL_NFT_POSTS_CONTRACT_ADDRESS: str(),
  VITE_TWITTER_POSTER_URL: str(),
})
