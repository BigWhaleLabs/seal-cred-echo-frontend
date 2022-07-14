import { proxy } from 'valtio'

interface TweeterStoreInterface {
  text: string
  length: number
  status: {
    isValid: boolean
    loading: boolean
    error?: Error
    success?: boolean
  }
  tweet: (text: string) => void
}

const TweeterStore = proxy<TweeterStoreInterface>({
  text: '',
  length: 280,
  status: { isValid: false, loading: false },
  tweet: (text) => {
    console.log(text)
  },
})

export default TweeterStore
