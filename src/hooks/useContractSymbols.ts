import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import defaultProvider from 'helpers/providers/defaultProvider'

export default function (addresses: string[]) {
  const result = {} as { [address: string]: string | undefined }
  for (const address of addresses) {
    const { contractSymbols } = useSnapshot(ContractMetadataStore)
    if (!contractSymbols[address]) {
      ContractMetadataStore.fetchContractSymbol(address, defaultProvider)
    }
    result[address] = contractSymbols[address]
  }
  return result
}
