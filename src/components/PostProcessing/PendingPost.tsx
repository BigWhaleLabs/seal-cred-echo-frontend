import { LastUserPostData } from 'stores/PostIdsStatuses'
import Loading from 'components/Loading'
import ProcessHeader from 'components/PostProcessing/ProcessHeader'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import ViewTweetButton from 'components/PostProcessing/ViewTweetButton'

export default function ({ pendingPost }: { pendingPost?: LastUserPostData }) {
  if (!pendingPost) return null

  return (
    <>
      <ProcessHeader />
      <Loading />
      <ViewTweetButton
        internal
        pending
        url={`/tweets/blockchain#store=${pendingPost.store}&id=${pendingPost.blockchainId}`}
        onClick={() => {
          SelectedTypeStore.selectedType = pendingPost.store
        }}
      />
    </>
  )
}
