import defaultProvider from 'helpers/providers/defaultProvider'
import getEmailLedgerContract from 'helpers/contracts/getEmailLedgerContract'
import getExternalNFTLedgerContract from 'helpers/contracts/getExternalNFTLedgerContract'
import getNFTLedgerContract from 'helpers/contracts/getNFTLedgerContract'

export const SCEmailLedgerContract = getEmailLedgerContract(defaultProvider)
export const SCERC721LedgerContract = getNFTLedgerContract(defaultProvider)
export const ExternalSCERC721LedgerContract =
  getExternalNFTLedgerContract(defaultProvider)
