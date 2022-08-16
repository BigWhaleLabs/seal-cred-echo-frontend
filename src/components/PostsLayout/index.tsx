import ChildrenProp from 'models/ChildrenProp'
import Header from 'components/PostsLayout/Header'
import classnames, {
  flexDirection,
  gap,
  height,
  justifyContent,
  margin,
  minHeight,
  position,
  space,
  width,
} from 'classnames/tailwind'

const container = classnames(
  width('w-full'),
  height('h-full'),
  space('space-y-4'),
  margin('mt-8')
)
const tabContainer = (withMinHeight?: boolean) =>
  classnames(
    position('relative'),
    justifyContent('justify-center'),
    minHeight({ 'min-h-tab-content': withMinHeight }),
    flexDirection('flex-col'),
    gap('gap-y-4')
  )
export default function ({
  blockchainPosts,
  children,
}: ChildrenProp & { blockchainPosts?: boolean }) {
  return (
    <div className={container}>
      <Header blockchainPosts={blockchainPosts} />
      <div className={tabContainer(blockchainPosts)}>{children}</div>
    </div>
  )
}
