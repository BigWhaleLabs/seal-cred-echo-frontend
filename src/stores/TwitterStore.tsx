import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import SealCredStore from 'stores/SealCredStore'
import WalletStore from 'stores/WalletStore'
import getTwitterLedgerRecord from 'helpers/getTwitterLedgerRecord'
import handleError from 'helpers/handleError'

interface BlockchainTweet {
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
  blockchainTweets: SCTwitterLedgerContract.getAllTweets().then(
    async (tweets) => {
      const eventsFilter = SCTwitterLedgerContract.filters.TweetSaved()
      const events = await SCTwitterLedgerContract.queryFilter(eventsFilter)
      const blockData: number[] = []

      for (const event of events) {
        const block = await event.getBlock()
        blockData.push(block.timestamp)
      }
      return tweets.map(({ tweet, derivativeAddress }, index) => {
        return {
          tweet,
          derivativeAddress,
          updatedAt: blockData[index],
        }
      })
    }
  ),
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
  async (tweet, derivativeAddress) => {
    console.info('TweetSaved event', tweet, derivativeAddress)
    const ledger = await TwitterStore.blockchainTweets
    if (!ledger.find(({ tweet: ledgerTweet }) => ledgerTweet === tweet)) {
      ledger.push(getTwitterLedgerRecord(tweet, derivativeAddress, Date.now()))
      TwitterStore.blockchainTweets = Promise.resolve({
        ...ledger,
      })
    }
  }
)

export default TwitterStore
