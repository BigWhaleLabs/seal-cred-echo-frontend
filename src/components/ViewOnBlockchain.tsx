import { BodyText } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AgeWarning from 'components/AgeWarning'
import AppStore from 'stores/AppStore'
import BlockchainPostsList from 'components/BlockchainPostsList'
import HintCard from 'components/HintCard'
import PreviousTweetsLayout from 'components/PostsLayout'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  const { adultAccepted } = useSnapshot(AppStore)

  return (
    <PreviousTweetsLayout blockchainPosts>
      {!adultAccepted && <AgeWarning />}
      <div
        className={classNamesToString('blockchainPosts', space('space-y-4'))}
      >
        <HintCard>
          <BodyText primary>
            This is unfiltered user-generated content. We did not play a part in
            its creation beyond providing a space to display it.
          </BodyText>
        </HintCard>

        <BlockchainPostsList />
      </div>
    </PreviousTweetsLayout>
  )
}
