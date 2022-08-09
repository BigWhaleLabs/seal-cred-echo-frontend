import defaultProvider from 'helpers/providers/defaultProvider'
import getERC721LedgerContract from 'helpers/contracts/getERC721LedgerContract'
import getEmailLedgerContract from 'helpers/contracts/getEmailLedgerContract'
import getExternalERC721LedgerContract from 'helpers/contracts/getExternalERC721LedgerContract'

export const SCEmailLedgerContract = getEmailLedgerContract(defaultProvider)
export const SCERC721LedgerContract = getERC721LedgerContract(defaultProvider)
export const ExternalSCERC721LedgerContract =
  getExternalERC721LedgerContract(defaultProvider)
