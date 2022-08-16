import { LargeText } from 'components/Text'
import Loading from 'components/Loading'
import ProcessHeader from 'components/PostProcessing/ProcessHeader'

export default function ({ pending }: { pending?: boolean }) {
  return pending ? (
    <>
      <ProcessHeader />
      <Loading />
    </>
  ) : (
    <LargeText>Tweet successful</LargeText>
  )
}
