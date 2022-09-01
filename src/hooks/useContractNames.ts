import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import defaultProvider from 'helpers/providers/defaultProvider'

export default function (addresses: string[]) {
  const result = {} as { [address: string]: string | undefined }
  for (const address of addresses) {
    const { contractNames } = useSnapshot(ContractMetadataStore)
    if (!contractNames[address]) {
      ContractMetadataStore.fetchContractName(address, defaultProvider)
    }
    result[address] = contractNames[address]
  }
  return result
}
