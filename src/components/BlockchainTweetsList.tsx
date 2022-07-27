import { Suspense, useState } from 'preact/compat'
import { UnderlineTextButton } from 'components/Text'
import { useSnapshot } from 'valtio'
import BlockchainTweet from 'components/BlockchainTweet'
import ContractName from 'components/ContractName'
import Cross from 'icons/Cross'
import TwitterLoading from 'components/TwitterLoading'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  padding,
  space,
} from 'classnames/tailwind'
import flasingTweet from 'helpers/flasingTweet'
import useScrollToAnchor from 'helpers/useScrollToAnchor'

const blockhainTweetTagContainer = classnames(
  display('inline-flex'),
  backgroundColor('bg-primary-background'),
  padding('px-4', 'py-2'),
  borderRadius('rounded'),
  space('space-x-2')
)
function BlockhainTweetTag({
  address,
  onClick,
}: {
  address: string
  onClick: () => void
}) {
  return (
    <span className={blockhainTweetTagContainer}>
      <UnderlineTextButton>
        <ContractName clearType truncate address={address} />
      </UnderlineTextButton>
      <Cross onClick={onClick} />
    </span>
  )
}

function BlockchainTweetsListSuspended() {
  const { blockchainTweets = [] } = useSnapshot(TwitterStore)
  const [selectedAddress, setAddress] = useState('')
  useScrollToAnchor(0, true, flasingTweet)

  return (
    <>
      {selectedAddress && (
        <BlockhainTweetTag
          address={selectedAddress}
          onClick={() => setAddress('')}
        />
      )}
      {blockchainTweets
        .filter(
          ({ derivativeAddress }) =>
            !selectedAddress || selectedAddress === derivativeAddress
        )
        .map(({ id, tweet, derivativeAddress, sender, timestamp }) => (
          <BlockchainTweet
            key={id}
            id={id}
            tweet={tweet}
            derivativeAddress={derivativeAddress}
            sender={sender}
            timestamp={timestamp}
            onSelectAddress={setAddress}
          />
        ))}
    </>
  )
}

export default function () {
  return (
    <Suspense
      fallback={<TwitterLoading text="Fetching blockchain tweets..." />}
    >
      <BlockchainTweetsListSuspended />
    </Suspense>
  )
}
