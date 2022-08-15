import ChildrenProp from 'models/ChildrenProp'
import Header from 'components/PostsLayout/Header'
import classnames, {
  flexDirection,
  gap,
  height,
  justifyContent,
  margin,
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
const tabContainer = classnames(
  position('relative'),
  justifyContent('justify-center'),
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
      <div className={tabContainer}>{children}</div>
    </div>
  )
}
