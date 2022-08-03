import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import { reservedContractMetadata } from '@big-whale-labs/constants'
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

    if (reservedContractMetadata[address]) {
      this.savedContractNames[address] = reservedContractMetadata[address].name
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

    if (reservedContractMetadata[address]) {
      this.savedContractSymbols[address] =
        reservedContractMetadata[address].symbol
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
