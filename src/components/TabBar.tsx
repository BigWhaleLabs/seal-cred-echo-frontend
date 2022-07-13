import { TabBarText } from 'components/Text'
import classnames, {
  alignItems,
  display,
  justifyContent,
  margin,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

interface Tab {
  label: string
  onClick: () => void
}

export default function ({ tabs }: { tabs: Tab[] }) {
  return (
    <div>
      <ul className={wrapper}>
        {tabs.map((tab) => (
          <li className={margin('mx-1')}>
            <button onClick={() => tab.onClick()}>
              <TabBarText>{tab.label}</TabBarText>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
