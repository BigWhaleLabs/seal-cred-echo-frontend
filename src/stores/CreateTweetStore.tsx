import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface CreateTweetStoreInterface {
  ensNames: { [address: string]: Promise<string | null> | undefined }
  fetchEnsName: (address: string) => void
}

const CreateTweetStore = proxy<CreateTweetStoreInterface>({
  ensNames: {},
  fetchEnsName(address: string) {
    if (CreateTweetStore.ensNames[address]) return

    CreateTweetStore.ensNames[address] = defaultProvider.lookupAddress(address)
  },
})

export default CreateTweetStore
