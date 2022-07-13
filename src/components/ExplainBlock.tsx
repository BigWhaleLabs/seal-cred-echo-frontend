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
    { label: 'How this works', onClick: () => setCurrentTab(1) },
    { label: 'Previous Tweets', onClick: () => setCurrentTab(2) },
    { label: 'Deep Dive', onClick: () => setCurrentTab(3) },
  ]

  return (
    <>
      <TabBar tabs={tabs} />

      <div className={sectionWrapper(currentTab === 1)}>1</div>
      <div className={sectionWrapper(currentTab === 2)}>2</div>
      <div className={sectionWrapper(currentTab === 3)}>3</div>
    </>
  )
}
