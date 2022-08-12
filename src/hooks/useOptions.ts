// import { useSnapshot } from 'valtio'
// import ERC721Post from 'helpers/posts/ERC721Post'
// import EmailPost from 'helpers/posts/EmailPost'
// import ExternalERC721Post from 'helpers/posts/ExternalERC721Post'
// import LedgerModel from 'models/Ledger'
// import SealCredStore from 'stores/SealCredStore'
// import useContractsOwned from 'hooks/useContractsOwned'

// function makeOptions<T>(
//   ledgerRecord: LedgerModel,
//   adddresses: string[],
//   createValue: ({
//     original,
//     derivative,
//   }: {
//     original: string
//     derivative: string
//   }) => T
// ) {
//   return Object.values(ledgerRecord)
//     .filter(({ derivative }) => adddresses.includes(derivative))
//     .map(({ original, derivative }) => ({
//       label: derivative,
//       value: createValue({ original, derivative }),
//     }))
// }

export default function () {
  // const { emailLedger, ERC721Ledger, externalERC721Ledger } =
  //   useSnapshot(SealCredStore)
  // const contractsOwned = useContractsOwned()

  return [
    // ...makeOptions(
    //   emailLedger,
    //   contractsOwned,
    //   ({ original }) => new EmailPost(original)
    // ),
    // ...makeOptions(
    //   ERC721Ledger,
    //   contractsOwned,
    //   ({ original, derivative }) => new ERC721Post(original, derivative)
    // ),
    // ...makeOptions(
    //   externalERC721Ledger,
    //   contractsOwned,
    //   ({ original, derivative }) => new ExternalERC721Post(original, derivative)
    // ),
  ]
}
