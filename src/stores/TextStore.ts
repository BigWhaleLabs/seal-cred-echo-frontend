import { proxy } from 'valtio'

// Should be separated from other fields, because it uses useSnapshot(TextStore, {sync: true})
interface TextFormState {
  text: string
}

export default proxy<TextFormState>({
  text: '',
})
