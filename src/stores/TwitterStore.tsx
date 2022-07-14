import { proxy } from 'valtio'

interface TwitterStoreInterface {
  text: string
  length: number
  status: {
    isValid: boolean
    loading: boolean
    error?: Error
    success?: boolean
  }
  availableEmails: string[]
  setCurrentEmail: (emailIndex: number) => void
  tweet: () => void
  dropDownOpen: boolean
}

const TwitterStore = proxy<TwitterStoreInterface>({
  text: '',
  length: 280,
  status: { isValid: true, loading: false },
  availableEmails: ['@bwl.gg', '@amazon.com', '@google.com'],
  setCurrentEmail: (emailIndex: number) => {
    const prev = TwitterStore.availableEmails[0]
    TwitterStore.availableEmails[0] = TwitterStore.availableEmails[emailIndex]
    TwitterStore.availableEmails[emailIndex] = prev
  },
  tweet: () => {
    console.log(TwitterStore.text)
  },
  dropDownOpen: false,
})

export default TwitterStore
