import { proxy } from 'valtio'

interface PostFormStoreState {
  text: string
  selectedAddress?: string
}

export default proxy<PostFormStoreState>({
  text: '',
})
