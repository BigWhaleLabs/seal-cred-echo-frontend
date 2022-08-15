import { proxy } from 'valtio'

interface TextFormState {
  text: string
}

export default proxy<TextFormState>({
  text: '',
})
