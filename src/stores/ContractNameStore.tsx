import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { RESERVED_CONTRACT_METADATA } from '@big-whale-labs/constants'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import defaultProvider from 'helpers/providers/defaultProvider'

class ContractNamesStore extends PersistableStore {
  savedContractNames = {} as {
    [contractAddress: string]: string | undefined
  }

  savedContractSymbols = {} as {
    [contractAddress: string]: string | undefined
  }

  requestedNames = {} as {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }

  requestedSymbols = {} as {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }

  get contractNames() {
    return {
      ...this.savedContractNames,
      ...this.requestedNames,
    }
  }

  get contractSymbols() {
    return {
      ...this.savedContractSymbols,
      ...this.requestedSymbols,
    }
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = [
      'requestedNames',
      'contractNames',
      'requestedSymbols',
      'contractSymbols',
    ]
    return disallowList.includes(key) ? undefined : value
  }

  fetchContractName(address: string) {
    if (this.contractNames[address]) return

    if (RESERVED_CONTRACT_METADATA[address]) {
      this.savedContractNames[address] =
        RESERVED_CONTRACT_METADATA[address].name
      return
    }
    const contract = ERC721__factory.connect(address, defaultProvider)
    this.requestedNames[address] = contract
      .name()
      .then((result) => {
        this.savedContractNames[address] = result || address
        return result || address
      })
      .catch(() => address)
  }

  fetchContractSymbol(address: string) {
    if (this.contractSymbols[address]) return

    if (RESERVED_CONTRACT_METADATA[address]) {
      this.savedContractSymbols[address] =
        RESERVED_CONTRACT_METADATA[address].symbol
      return
    }
    const contract = ERC721__factory.connect(address, defaultProvider)
    this.requestedSymbols[address] = contract
      .symbol()
      .then((result) => {
        const symbol = result.replace(/-d$/, '') || address
        this.savedContractSymbols[address] = symbol
        return symbol
      })
      .catch(() => address)
  }
}

export default proxy(new ContractNamesStore()).makePersistent(true)
