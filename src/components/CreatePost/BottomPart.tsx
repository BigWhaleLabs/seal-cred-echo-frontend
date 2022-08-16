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
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)
const bottomContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  width('w-full'),
  alignItems('items-center'),
  flexWrap('flex-wrap'),
  gap('gap-y-4')
)

export default function () {
  return (
    <div className={container}>
      <BodyText>Select a ZK Badge</BodyText>
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
