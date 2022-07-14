import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  justifyContent,
  margin,
  overflow,
  space,
  width,
} from 'classnames/tailwind'

const scrollableBox = classnames(width('w-full'), overflow('overflow-auto'))
const wrapper = classnames(
  width('w-max'),
  alignItems('items-center'),
  justifyContent('justify-start'),
  overflow('overflow-x-auto'),
  space('tiny:space-x-8', 'space-x-6'),
  margin('mx-5', 'lg:mx-0')
)

export default function ({ children }: ChildrenProp) {
  return (
    <div className={classNamesToString(scrollableBox, 'no-scrollbar')}>
      <div className={wrapper}>{children}</div>
    </div>
  )
}
