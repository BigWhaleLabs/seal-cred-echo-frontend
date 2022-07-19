import { derive } from 'valtio/utils'
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

const state = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: false, loading: false },
  currentEmail: undefined,
  createTweet: async () => {
    TwitterStore.resetStatus()
    if (!state.currentEmail) {
      state.status.error = new Error('No email selected')
      return
    }
    state.status.loading = true
    try {
      const currentDomain = await TwitterStore.currentDomain
      if (!currentDomain) return
      const hashtags = await TwitterStore.hashtags
      if (!hashtags) return
      await WalletStore.saveTweet({
        tweet: state.text + hashtags,
        domain: currentDomain,
      })
      TwitterStore.text = ''
    } catch (error) {
      handleError(error)
      state.status.error =
        error instanceof Error ? error : new Error('Failed to create tweet')
      throw error
    } finally {
      state.status.loading = false
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

const TwitterStore = derive<
  TwitterStoreInterface,
  {
    currentDomain: Promise<string | undefined>
    hashtags: Promise<string | undefined>
  }
>(
  {
    currentDomain: async (get) => {
      const address = get(state).currentEmail
      if (!address) return ''
      return (await SealCredStore.contractNameDomain)[address]
    },
    hashtags: async (get) => {
      const hashtag = '#VerifiedToWorkAt'
      const address = get(state).currentEmail
      if (!address) return
      const currentDomain = (await SealCredStore.contractNameDomain)[address]
      if (!currentDomain) return
      return `\n${hashtag} #${currentDomain}`
    },
  },
  { proxy: state }
)

export default TwitterStore
