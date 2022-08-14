import { BodyText } from 'components/Text'
import Button from 'components/Button'
import SelectAsset from 'components/CreatePost/SelectAsset'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap')
)
export default function () {
  return (
    <div className={container}>
      <BodyText>Choose a ZK Badge</BodyText>
      <div className={bottomContainer}>
        <SelectAsset />
        <Button
          type="primary"
          title="Tweet"
          onClick={() => {
            console.log('Tweet!')
          }}
        >
          Tweet!
        </Button>
      </div>
    </div>
  )
}
