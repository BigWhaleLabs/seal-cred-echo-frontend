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
  dropDownOpen: boolean
  blockchainTweets: Promise<BlockchainTweet[]>
}

const TwitterStore = proxy<TwitterStoreInterface>({
  text: '',
  maxLength: 280,
  status: { isValid: false, loading: false },
  currentEmail: undefined,
  createTweet: async () => {
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
    } catch (error) {
      handleError(error)
      TwitterStore.status.error =
        error instanceof Error ? error : new Error('Failed to create tweet')
      throw error
    } finally {
      TwitterStore.status.loading = false
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
