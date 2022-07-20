import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import getBlockchainTweets from 'helpers/getBlockchainTweets'
import getTwitterLedgerRecord from 'helpers/getTwitterLedgerRecord'
import handleError from 'helpers/handleError'

interface BlockchainTweet {
  id: number
  tweet: string
  derivativeAddress: string
  updatedAt: number
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
  blockchainTweets: Promise<BlockchainTweet[]>
}

const state = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: false, loading: false },
  currentEmail: undefined,
  createTweet: async () => {
    TwitterStore.resetStatus()
    state.status.loading = true
    try {
      const currentDomain = await TwitterStore.currentDomain
      if (!currentDomain) return
      const hashtags = await TwitterStore.hashtags
      if (!hashtags || state.text.length + hashtags.length > state.maxLength) {
        state.status.error = new Error('Tweet is too long')
        return
      }
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
  blockchainTweets: getBlockchainTweets(),
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

SCTwitterLedgerContract.on(
  SCTwitterLedgerContract.filters.TweetSaved(),
  async (id, tweet, derivativeAddress) => {
    console.info('TweetSaved event', tweet, derivativeAddress)
    const ledger = await TwitterStore.blockchainTweets
    if (
      !ledger.find(({ id: ledgerTweetId }) => ledgerTweetId === id.toNumber())
    ) {
      TwitterStore.blockchainTweets = Promise.resolve([
        getTwitterLedgerRecord(id, tweet, derivativeAddress, Date.now()),
        ...ledger,
      ])
    }
  }
)

export default TwitterStore
