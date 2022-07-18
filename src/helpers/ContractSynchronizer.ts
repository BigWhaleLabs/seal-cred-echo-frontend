import getOwnedERC721 from 'helpers/getOwnedERC721'

export interface ContractSynchronizerSchema {
  account: string
  synchronizedBlockId: number
  addressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  addressToTokenIds?: { [address: string]: string[] }

  skipTransactions = new Set<string>()

  constructor(
    account: string,
    addressToTokenIds?: { [address: string]: string[] },
    synchronizedBlockId?: number
  ) {
    this.account = account
    this.synchronizedBlockId = synchronizedBlockId
    this.addressToTokenIds = addressToTokenIds
  }

  static fromJSON({
    account,
    synchronizedBlockId,
    addressToTokenIds,
  }: {
    account: string
    synchronizedBlockId: number
    addressToTokenIds: { [address: string]: string[] }
  }) {
    return new ContractSynchronizer(
      account,
      addressToTokenIds,
      synchronizedBlockId
    )
  }

  toJSON() {
    return {
      account: this.account,
      synchronizedBlockId: this.synchronizedBlockId,
      addressToTokenIds: this.addressToTokenIds,
    }
  }

  async syncAddressToTokenIds(blockId: number) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true
      this.addressToTokenIds = await getOwnedERC721(
        this.account,
        typeof this.synchronizedBlockId !== 'undefined'
          ? this.synchronizedBlockId + 1
          : 0,
        blockId,
        this.addressToTokenIds || {},
        this.skipTransactions
      )

      this.synchronizedBlockId = blockId
      this.locked = false
    }

    return this.addressToTokenIds
  }
}
