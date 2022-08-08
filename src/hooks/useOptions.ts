import { useSnapshot } from 'valtio'
import EmailPost from 'helpers/posts/EmailPost'
import ExternalNFTPost from 'helpers/posts/ExternalNFTPost'
import LedgerModel from 'models/LedgerModel'
import NFTPost from 'helpers/posts/NFTPost'
import SealCredStore from 'stores/SealCredStore'
import useContractsOwned from 'hooks/useContractsOwned'

function makeOptions<T>(
  ledgerRecord: LedgerModel,
  adddresses: string[],
  createValue: ({
    original,
    derivative,
  }: {
    original: string
    derivative: string
  }) => T
) {
  return Object.values(ledgerRecord)
    .filter(({ derivative }) => adddresses.includes(derivative))
    .map(({ original, derivative }) => ({
      label: derivative,
      value: createValue({ original, derivative }),
    }))
}

export default function () {
  const { emailLedger, ERC721Ledger, externalERC721Ledger } =
    useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()

  return [
    ...makeOptions(
      emailLedger,
      contractsOwned,
      ({ original }) => new EmailPost(original)
    ),
    ...makeOptions(
      ERC721Ledger,
      contractsOwned,
      ({ original, derivative }) => new NFTPost(original, derivative)
    ),
    ...makeOptions(
      externalERC721Ledger,
      contractsOwned,
      ({ original, derivative }) => new ExternalNFTPost(original, derivative)
    ),
  ]
}
