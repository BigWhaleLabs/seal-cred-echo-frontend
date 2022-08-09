import env from 'helpers/env'
import getSCLedgerContract from 'helpers/contracts/getSCLedgerContract'

export default {
  email: getSCLedgerContract(env.VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS),
  ERC721: getSCLedgerContract(env.VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS),
  externalERC721: getSCLedgerContract(
    env.VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS
  ),
}
