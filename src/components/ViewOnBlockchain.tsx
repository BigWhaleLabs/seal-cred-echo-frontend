import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import AgeWarning from 'components/AgeWarning'
import AppStore from 'stores/AppStore'
import BlockchainTweets from 'components/BlockchainTweets'
import HintCard from 'components/HintCard'
import PreviousTweetsLayout from 'components/PrevTweetsLayout'

export default function () {
  const { adultAccepted } = useSnapshot(AppStore)

  return (
    <PreviousTweetsLayout back>
      {!adultAccepted && <AgeWarning />}
      <HintCard>
        <BodyText primary>
          This is unfiltered user-generated content. We did not play a part in
          its creation beyond providing a space to display it.
        </BodyText>
      </HintCard>
      <BlockchainTweets />
    </PreviousTweetsLayout>
  )
}
