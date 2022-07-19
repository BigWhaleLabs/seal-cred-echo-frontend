import { proxy } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import handleError from 'helpers/handleError'

export enum TweetStatus {
  pending = 'Pending review...',
  rejected = 'Rejected',
  posted = 'Posted to twitter',
}

interface BlockchainTweet {
  text: string
  author: string
  status: TweetStatus
  updatedAt: string
}

interface TwitterStoreInterface {
  text: string
  maxLength: number
  status: {
    isValid: boolean
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentEmail?: string
  createTweet: () => void
  resetStatus: () => void
  dropDownOpen: boolean
  blockchainTweets?: BlockchainTweet[]
}

const TwitterStore = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: false, loading: false },
  currentEmail: undefined,
  createTweet: async () => {
    TwitterStore.resetStatus()

    if (!TwitterStore.currentEmail) {
      TwitterStore.status.error = new Error('No email selected')
      return
    }
    TwitterStore.status.loading = true
    try {
      const currentDomain = (await SealCredStore.contractNameDomain)[
        TwitterStore.currentEmail
      ]
      await WalletStore.saveTweet({
        tweet: TwitterStore.text,
        domain: currentDomain,
      })
      TwitterStore.text = ''
    } catch (error) {
      handleError(error)
      TwitterStore.status.error =
        error instanceof Error ? error : new Error('Failed to create tweet')
      throw error
    } finally {
      TwitterStore.status.loading = false
    }
  },
  resetStatus: () => {
    TwitterStore.status = {
      isValid: TwitterStore.status.isValid,
      loading: false,
    }
  },
  dropDownOpen: false,
  blockchainTweets: [
    {
      text: "I’ve lost over 50% of value on mine. I'm hopeful that the market will turn around, but what do you all think",
      status: TweetStatus.pending,
      updatedAt: '1s',
      author: '0x0000000000000000000000000000000000000000',
    },
    {
      text: "I’ve lost over 50% of value on mine. I'm hopeful that the market will turn around, but what do you all think",
      status: TweetStatus.rejected,
      updatedAt: '59m',
      author: '0x0000000000000000000000000000000000000000',
    },
    {
      text: "I’ve lost over 50% of value on mine. I'm hopeful that the market will turn around, but what do you all think",
      status: TweetStatus.posted,
      updatedAt: '1d 1h 1m',
      author: '0x0000000000000000000000000000000000000000',
    },
    {
      text: "I’ve lost over 50% of value on mine. I'm hopeful that the market will turn around, but what do you all think. I’ve lost over 50% of value on mine. I'm hopeful that the market will turn around, but what do you all think",
      status: TweetStatus.posted,
      updatedAt: '255d 12h 12m',
      author: '0x0000000000000000000000000000000000000000',
    },
  ],
})

export default TwitterStore
