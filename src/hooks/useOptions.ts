// import { useSnapshot } from 'valtio'
// import LedgerModel from 'models/Ledger'
// import SealCredStore from 'stores/SealCredStore'
// import useContractsOwned from 'hooks/useContractsOwned'

// function makeOptions<T>(
//   ledgerRecord: LedgerModel,
//   addresses: string[],
//   createValue: ({
//     original,
//     derivative,
//   }: {
//     original: string
//     derivative: string
//   }) => T
// ) {
//   return Object.keys(ledgerRecord)
//     .filter((original) => addresses.includes(ledgerRecord[original]))
//     .map((original) => ({
//       label: ledgerRecord[original],
//       value: createValue({ original, derivative: ledgerRecord[original] }),
//     }))
// }

// export default function () {
//   // TODO: can't get ledger from computerStore now
//   const store = useSnapshot(SealCredStore)
//   const contractsOwned = useContractsOwned()

//   return [
//     ...makeOptions(
//       Email,
//       contractsOwned,
//       ({ original }) => new EmailPost(original)
//     ),
//     ...makeOptions(
//       ERC721,
//       contractsOwned,
//       ({ original, derivative }) => new ERC721Post(original, derivative)
//     ),
//     ...makeOptions(
//       ExternalERC721,
//       contractsOwned,
//       ({ original, derivative }) => new ExternalERC721Post(original, derivative)
//     ),
//   ]
// }
