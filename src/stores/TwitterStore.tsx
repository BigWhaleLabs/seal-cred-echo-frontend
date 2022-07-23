import { BigNumber } from 'ethers'
import { parseTweetSavedLogData } from 'helpers/createTweet'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ProcessingTweetsStore from 'stores/ProcessingTweetsStore'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'
import TweetStatus from 'models/TweetStatus'
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
  createTweet: ({
    tweet,
    domain,
  }: {
    tweet: string
    domain: string
  }) => Promise<void>
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
      const transaction = await WalletStore.saveTweet({
        tweet,
        domain,
      })

      for (const { data, topics } of transaction.logs) {
        const {
          args: { id, tweet, derivativeAddress, sender, timestamp },
        } = parseTweetSavedLogData({ data, topics })

        await addTwitterLeaderRecord(
          id.toNumber(),
          tweet,
          derivativeAddress,
          sender,
          timestamp
        )
      }
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

async function addTwitterLeaderRecord(
  tweetId: number,
  tweet: string,
  derivativeAddress: string,
  sender: string,
  timestamp: BigNumber
) {
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
    const processingTweetIds = ProcessingTweetsStore.processingTweetIds[sender]

    if (TweetStatusStore.tweetsStatuses[tweetId])
      TweetStatusStore.tweetsStatuses[tweetId] = {
        tweetId,
        status: TweetStatus.pending,
      }

    if (processingTweetIds) {
      ProcessingTweetsStore.processingTweetIds[sender] = [
        tweetId,
        ...processingTweetIds,
      ]
      return
    }
    ProcessingTweetsStore.processingTweetIds[sender] = [tweetId]
  }
}

subscribeKey(WalletStore, 'account', () => {
  TwitterStore.currentDomain = undefined
})

SCTwitterLedgerContract.on(
  SCTwitterLedgerContract.filters.TweetSaved(),
  async (id, tweet, derivativeAddress, sender, timestamp) => {
    console.info('TweetSaved event', id.toNumber(), tweet, derivativeAddress)
    const tweetId = id.toNumber()
    await addTwitterLeaderRecord(
      tweetId,
      tweet,
      derivativeAddress,
      sender,
      timestamp
    )
  }
)

export default TwitterStore
