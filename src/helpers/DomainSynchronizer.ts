import { SCERC721Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import SealCredStore from 'stores/SealCredStore'
import defaultProvider from 'helpers/defaultProvider'

export interface DomainSynchronizerSchema {
  account: string
  domainAddresses: string[]
}

export default class DomainSynchronizer {
  account: string
  domainAddresses: string[] = []

  constructor(account: string, domainAddresses: string[] = []) {
    this.account = account
    this.domainAddresses = domainAddresses
  }

  static fromJSON({
    account,
    domainAddresses,
  }: {
    account: string
    domainAddresses: string[]
  }) {
    return new DomainSynchronizer(account, domainAddresses)
  }

  toJSON() {
    return {
      account: this.account,
      domainAddresses: this.domainAddresses,
    }
  }

  async fetchDomains() {
    const derivativeAddresses = await SealCredStore.emailDerivativeContracts
    const derivativesContracts = derivativeAddresses.map((address) =>
      SCERC721Derivative__factory.connect(address, defaultProvider)
    )

    this.domainAddresses = (
      await Promise.all(
        derivativesContracts.map(async (derivativesContract) => ({
          address: derivativesContract.address,
          isOwn: (await derivativesContract.balanceOf(this.account)).gte(1),
        }))
      )
    ).reduce(
      (chain, { address, isOwn }) => (isOwn ? chain.concat(address) : chain),
      [] as string[]
    )

    return this.domainAddresses
  }
}
