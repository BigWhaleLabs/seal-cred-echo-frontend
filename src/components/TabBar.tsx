import { TabBarText } from 'components/Text'
import Tab from 'models/Tab'
import classnames, {
  alignItems,
  display,
  justifyContent,
  space,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-start'),
  space('space-x-8')
)

export default function ({ tabs }: { tabs: Tab[] }) {
  return (
    <ul className={wrapper}>
      {tabs.map((tab) => (
        <li onClick={() => tab.onClick()}>
          <TabBarText active={tab.active}>{tab.label}</TabBarText>
        </li>
      ))}
    </ul>
  )
}
