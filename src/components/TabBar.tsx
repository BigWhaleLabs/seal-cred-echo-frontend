import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  justifyContent,
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
  space('xs:space-x-8', 'space-x-6')
)

export default function ({ children }: ChildrenProp) {
  return (
    <div className={classNamesToString(scrollableBox, 'no-scrollbar')}>
      <div className={wrapper}>{children}</div>
    </div>
  )
}
