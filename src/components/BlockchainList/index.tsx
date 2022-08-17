import { BodyText } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AgeWarning from 'components/BlockchainList/AgeWarning'
import HintCard from 'components/HintCard'
import NotificationStore from 'stores/NotificationStore'
import PostsList from 'components/BlockchainList/PostsList'
import PreviousTweetsLayout from 'components/PostsLayout'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  const { adultAccepted } = useSnapshot(NotificationStore)

  return (
    <PreviousTweetsLayout blockchainPosts>
      {!adultAccepted && (
        <AgeWarning
          onAccept={() => {
            NotificationStore.adultAccepted = true
          }}
        />
      )}
      <div
        className={classNamesToString('blockchainPosts', space('space-y-4'))}
      >
        <HintCard>
          <BodyText primary>
            This is unfiltered user-generated content. We did not play a part in
            its creation beyond providing a space to display it.
          </BodyText>
        </HintCard>
        <PostsList />
      </div>
    </PreviousTweetsLayout>
  )
}
