import Button from 'components/Button'
import SelectAsset from 'components/CreatePost/SelectAsset'
import classnames, {
  alignItems,
  display,
  flexWrap,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center'),
  flexWrap('flex-wrap'),
  gap('gap-y-4')
)
export default function () {
  return (
    <div className={container}>
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
  )
}
