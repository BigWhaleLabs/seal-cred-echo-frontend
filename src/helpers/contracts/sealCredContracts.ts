import defaultProvider from 'helpers/providers/defaultProvider'
import getExternalSCERC721LedgerContract from 'helpers/contracts/getExternalSCERC721LedgerContract'
import getSCEmailLedgerContract from 'helpers/contracts/getSCEmailLedgerContract'

export const ExternalSCERC721LedgerContract =
  getExternalSCERC721LedgerContract(defaultProvider)
export const SCEmailLedgerContract = getSCEmailLedgerContract(defaultProvider)
