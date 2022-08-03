import getOwnedERC721 from 'helpers/getOwnedERC721'

export interface ContractSynchronizerSchema {
  account: string
  startBlock: number
  synchronizedBlockId: number
  mapAddressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  account: string
  locked = false
  startBlock = 0
  synchronizedBlockId?: number
  mapAddressToTokenIds?: { [address: string]: string[] }

  constructor(
    account: string,
    startBlock = 0,
    mapAddressToTokenIds?: { [address: string]: string[] },
    synchronizedBlockId?: number
  ) {
    this.account = account
    this.synchronizedBlockId = synchronizedBlockId
    this.mapAddressToTokenIds = mapAddressToTokenIds
    this.startBlock = startBlock
  }

  static fromJSON({
    account,
    startBlock,
    synchronizedBlockId,
    mapAddressToTokenIds,
  }: {
    account: string
    startBlock: number
    synchronizedBlockId: number
    mapAddressToTokenIds: { [address: string]: string[] }
  }) {
    return new ContractSynchronizer(
      account,
      startBlock,
      mapAddressToTokenIds,
      synchronizedBlockId
    )
  }

  toJSON() {
    return {
      account: this.account,
      startBlock: this.startBlock,
      synchronizedBlockId: this.synchronizedBlockId,
      mapAddressToTokenIds: this.mapAddressToTokenIds,
    }
  }

  async syncAddressToTokenIds(blockId: number) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true

      const fromBlock =
        typeof this.synchronizedBlockId !== 'undefined'
          ? this.synchronizedBlockId + 1
          : this.startBlock

      this.mapAddressToTokenIds = await getOwnedERC721(
        this.account,
        fromBlock,
        blockId,
        { ...this.mapAddressToTokenIds }
      )

      this.synchronizedBlockId = blockId
      this.locked = false
    }

    return this.mapAddressToTokenIds
  }
}
