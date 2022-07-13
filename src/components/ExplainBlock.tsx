import { useState } from 'preact/hooks'
import ChildrenProp from 'models/ChildrenProp'
import HowItWork from 'components/HowItWork'
import TabBar from 'components/TabBar'
import classnames, {
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const sectionWrapper = (visible: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    justifyContent('justify-center'),
    space('space-y-4'),
    display(visible ? 'block' : 'hidden')
  )

function Tab({
  active,
  children,
}: {
  active: boolean
} & ChildrenProp) {
  return <div className={sectionWrapper(active)}>{children}</div>
}

export default function () {
  const [currentTab, setCurrentTab] = useState(1)

  const tabs = [
    {
      tabIndex: 1,
      label: 'How this works',
      get active() {
        return this.tabIndex === currentTab
      },
      onClick() {
        setCurrentTab(this.tabIndex)
      },
    },
    {
      tabIndex: 2,
      label: 'Previous Tweets',
      get active() {
        return this.tabIndex === currentTab
      },
      onClick() {
        setCurrentTab(this.tabIndex)
      },
    },
    {
      tabIndex: 3,
      label: 'Deep Dive',
      get active() {
        return this.tabIndex === currentTab
      },
      onClick() {
        setCurrentTab(this.tabIndex)
      },
    },
  ]

  return (
    <>
      <TabBar tabs={tabs} />
      <Tab active={tabs[0].active}>
        <HowItWork />
      </Tab>
      <Tab active={tabs[1].active}>Previous Tweets</Tab>
      <Tab active={tabs[2].active}>Deep Dive</Tab>
    </>
  )
}
