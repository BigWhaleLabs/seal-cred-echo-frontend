import defaultProvider from 'helpers/providers/defaultProvider'
import env from 'helpers/env'
import getSCPostStorageContract from 'helpers/contracts/getSCPostStorageContract'

export default getSCPostStorageContract(
  env.VITE_SC_EXTERNAL_ERC721_POST_STORAGE_CONTRACT,
  defaultProvider
)
