import { proxy } from 'valtio'

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
  availableEmails: string[]
  currentEmail: string
  tweet: () => void
  dropDownOpen: boolean
  blockchainTweets?: BlockchainTweet[]
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
