import { LinkText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/Delimiter'
import postStore from 'stores/PostIdsStatuses'

function TwitterLink({ id }: { id: number }) {
  const statusId = useSnapshot(postStore).get(id)?.statusId

  if (!statusId) return null

  return (
    <>
      <Delimiter />
      <LinkText
        extraSmall
        title="status"
        url={`https://twitter.com/SealCredEmail/status/${statusId}`}
      >
        Twitter
      </LinkText>
    </>
  )
}

export default function ({ id }: { id: number }) {
  return (
    <Suspense fallback={<></>}>
      <TwitterLink id={id} />
    </Suspense>
  )
}
