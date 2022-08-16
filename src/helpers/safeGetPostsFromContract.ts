import { BigNumber } from 'ethers'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  try {
    return (await contract.getAllPosts())
      .map(
        ([id, post, derivativeAddress, sender, timestamp]) =>
          ({
            id,
            post,
            derivativeAddress,
            sender,
            timestamp,
          } as PostStructOutput)
      )
      .reverse()

    // return new Promise((res) =>
    //   setTimeout(
    //     () =>
    //       res([
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x00'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x01'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x02'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //         {
    //           id: BigNumber.from('0x03'),
    //           post: 'Strawberry wants to say smt ...',
    //           derivativeAddress: '0x74168621B4827BAa4532F9a41caf1f3E7B936c36',
    //           sender: '0xDa405077A284bf1cF4ff8B4C2eF37AC5524D492A',
    //           timestamp: BigNumber.from('0x62f3b297'),
    //         },
    //       ]),
    //     3000
    //   )
    // )
  } catch {
    return []
  }
}
