import {
  ETH_NETWORK,
  ETH_RPC,
  SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_TWITTER_LEDGER_CONTRACT_ADDRESS: str(),
  VITE_TWITTER_POSTER_URL: str(),
})
