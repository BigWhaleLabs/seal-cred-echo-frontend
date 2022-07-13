import { useState } from 'preact/hooks'
import TabBar from 'components/TabBar'
import classnames, {
  display,
  flexDirection,
  justifyContent,
  textAlign,
} from 'classnames/tailwind'

const flexCol = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  textAlign('text-center')
)

const sectionWrapper = (visible: boolean) =>
  classnames(flexCol, display(visible ? 'block' : 'hidden'))

export default function () {
  const [currentTab, setCurrentTab] = useState(1)

  const tabs = [
    {
      label: 'How this works',
      active: currentTab === 1,
      onClick: () => setCurrentTab(1),
    },
    {
      label: 'Previous Tweets',
      active: currentTab === 2,
      onClick: () => setCurrentTab(2),
    },
    {
      label: 'Deep Dive',
      active: currentTab === 3,
      onClick: () => setCurrentTab(3),
    },
  ]

  return (
    <>
      <TabBar tabs={tabs} />

      <div className={sectionWrapper(tabs[0].active)}>1</div>
      <div className={sectionWrapper(tabs[1].active)}>2</div>
      <div className={sectionWrapper(tabs[2].active)}>3</div>
    </>
  )
}