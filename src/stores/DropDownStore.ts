import { proxy } from 'valtio'

interface DropDownState {
  selectedAddress: string
}

export default proxy<DropDownState>({
  selectedAddress: '',
})
