import { proxy } from 'valtio'

interface TwitterStoreInterface {
  text: string
  maxLength: number
  status: {
    isValid: boolean
    loading: boolean
    error?: Error
    success?: boolean
  }
  availableEmails: string[]
  currentEmail: string
  tweet: () => void
  dropDownOpen: boolean
}

const TwitterStore = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: true, loading: false },
  availableEmails: [
    '@bwl.gg',
    '@amazon.com',
    '@google.com',
    '@biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiigwhalelabs.com',
  ],
  currentEmail: '',
  tweet: () => {
    console.log(TwitterStore.text)
  },
  dropDownOpen: false,
})

export default TwitterStore
