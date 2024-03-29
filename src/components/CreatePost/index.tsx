import { HeaderText } from 'components/Text'
import Form from 'components/CreatePost/Form'
import NoBadgesMessage from 'components/CreatePost/NoBadgesMessage'
import PostProcessing from 'components/PostProcessing'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
} from 'classnames/tailwind'

const container = classnames(
  margin('mt-6', 'mb-16'),
  gap('gap-y-6', 'md:gap-y-12')
)
const innerContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6')
)

export default function () {
  return (
    <div className={gap('gap-y-6', 'sm:gap-y-12')}>
      <PostProcessing />
      <div className={container}>
        <div className={innerContainer}>
          <HeaderText>Create an anonymous tweet</HeaderText>
          <NoBadgesMessage />
          <Form />
        </div>
      </div>
    </div>
  )
}
