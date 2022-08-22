import { BodyText } from 'components/Text'
import { display, flexDirection, gap } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AgeWarning from 'components/BlockchainList/AgeWarning'
import FilterBySelectedToken from 'components/BlockchainList/FilterBySelectedToken'
import HintCard from 'components/HintCard'
import NotificationStore from 'stores/NotificationStore'
import PostsList from 'components/BlockchainList/PostsList'
import PreviousTweetsLayout from 'components/PostsLayout'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  const { adultAccepted } = useSnapshot(NotificationStore)

  return (
    <PreviousTweetsLayout blockchainPosts>
      {adultAccepted ? (
        <div
          className={classNamesToString(
            'blockchainPosts',
            display('flex'),
            flexDirection('flex-col'),
            gap('gap-y-4')
          )}
        >
          <HintCard>
            <BodyText primary>
              This is unfiltered user-generated content. We did not play a part
              in its creation beyond providing a space to display it.
            </BodyText>
          </HintCard>
          <FilterBySelectedToken />
          <PostsList />
        </div>
      ) : (
        <AgeWarning
          onAccept={() => {
            NotificationStore.adultAccepted = true
          }}
        />
      )}
    </PreviousTweetsLayout>
  )
}
