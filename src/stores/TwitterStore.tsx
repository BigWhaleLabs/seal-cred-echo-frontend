import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
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
  calculatedMaxLength?: number
  status: {
    loading: boolean
    error?: Error
    success?: boolean
  }
  currentDomain?: string
  createTweet: ({ tweet, domain }: { tweet: string; domain: string }) => void
  blockchainTweets: Promise<BlockchainTweet[]>
}

const TwitterStore = proxy<TwitterStoreInterface>({
  status: { loading: false },
  currentDomain: undefined,
  createTweet: async ({ tweet, domain }: { tweet: string; domain: string }) => {
    TwitterStore.status = {
      loading: false,
    }
    TwitterStore.status.loading = true
    try {
      await WalletStore.saveTweet({
        tweet,
        domain,
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
  blockchainTweets: getBlockchainTweets(),
})

subscribeKey(WalletStore, 'account', () => {
  TwitterStore.currentDomain = undefined
})

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
      const processingTweets = TweetStatusStore.processingTweets[sender]
      if (processingTweets) {
        TweetStatusStore.processingTweets[sender] = [
          tweetId,
          ...processingTweets,
        ]
        return
      }
      TweetStatusStore.processingTweets[sender] = [tweetId]
    }
  }
)

export default TwitterStore
