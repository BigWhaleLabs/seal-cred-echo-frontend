import { TabBarText } from 'components/Text'
import Tab from 'models/Tab'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
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
  space('space-x-8'),
  margin('first:ml-8', 'last:mr-8')
)

export default function ({ tabs }: { tabs: Tab[] }) {
  return (
    <div className={classNamesToString(scrollableBox, 'no-scrollbar')}>
      <div className={wrapper}>
        {tabs.map((tab) => (
          <div onClick={() => tab.onClick()} className={display('inline-flex')}>
            <TabBarText active={tab.active}>{tab.label}</TabBarText>
          </div>
        ))}
      </div>
    </div>
  )
}
