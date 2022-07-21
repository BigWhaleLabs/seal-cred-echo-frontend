import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import SealCredStore from 'stores/SealCredStore'
import TweetStatusStore from 'stores/TweetStatusStore'
import WalletStore from 'stores/WalletStore'
import getBlockchainTweets from 'helpers/getBlockchainTweets'
import getTwitterLedgerRecord from 'helpers/getTwitterLedgerRecord'
import handleError from 'helpers/handleError'

interface BlockchainTweet {
  id: number
  tweet: string
  derivativeAddress: string
  sender: string
  timestamp: number
}

interface TwitterStoreInterface {
  text: string
  maxLength: number
  calculatedMaxLength?: number
  status: {
    isValid: boolean
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentDomainAddress?: string
  createTweet: () => void
  resetStatus: () => void
  dropDownOpen: boolean
  blockchainTweets: Promise<BlockchainTweet[]>
}

const state = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: false, loading: false },
  currentDomainAddress: undefined,
  createTweet: async () => {
    state.resetStatus()
    state.status.loading = true
    try {
      const currentDomain = await TwitterStore.currentDomain
      if (!currentDomain) return
      if (state.text.length > TwitterStore.maxLengthWithHashtag) {
        state.status.error = new Error('Tweet is too long')
        return
      }
      await WalletStore.saveTweet({
        tweet: state.text,
        domain: currentDomain,
      })
      state.text = ''
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
  blockchainTweets: getBlockchainTweets(),
})

const TwitterStore = derive<
  TwitterStoreInterface,
  {
    currentDomain: Promise<string | undefined>
    hashtags: Promise<string | undefined>
    maxLengthWithHashtag: number
  }
>(
  {
    currentDomain: async (get) => {
      const address = get(state).currentDomainAddress
      if (!address) return ''
      return (await SealCredStore.contractNameDomain)[address]
    },
    hashtags: async (get) => {
      const address = get(state).currentDomainAddress
      if (!address) return
      const currentDomain = (await SealCredStore.contractNameDomain)[address]
      if (!currentDomain) return
      get(state).calculatedMaxLength =
        get(state).maxLength - currentDomain.length - 1
      return `#${currentDomain}`
    },
    maxLengthWithHashtag: (get) =>
      get(state).calculatedMaxLength || get(state).maxLength,
  },
  { proxy: state }
)

SCTwitterLedgerContract.on(
  SCTwitterLedgerContract.filters.TweetSaved(),
  async (id, tweet, derivativeAddress, sender, timestamp) => {
    console.info('TweetSaved event', tweet, derivativeAddress)
    const tweetId = id.toNumber()
    const ledger = await TwitterStore.blockchainTweets
    if (!ledger.find(({ id: ledgerTweetId }) => ledgerTweetId === tweetId)) {
      TwitterStore.blockchainTweets = Promise.resolve([
        getTwitterLedgerRecord(
          tweetId,
          tweet,
          derivativeAddress,
          sender,
          timestamp
        ),
        ...ledger,
      ])
      TweetStatusStore.processingTweets[sender] = tweetId
    }
  }
)

export default TwitterStore
