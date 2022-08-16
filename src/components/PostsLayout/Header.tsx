import { BodyText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import BackToTweetsButton from 'components/PostsLayout/BackToTweetsButton'
import Dropdown from 'components/Dropdown'
import SelectedTypeStore from 'stores/SelectedTypeStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  lineHeight,
  textColor,
} from 'classnames/tailwind'
import data from 'data'

const container = classnames(
  display('flex'),
  flexDirection('sm:flex-row', 'flex-col'),
  alignItems('sm:items-center'),
  justifyContent('justify-between')
)
const tweetByWrapper = classnames(
  display('flex'),
  gap('gap-x-2'),
  alignItems('items-center')
)
const link = classnames(
  textColor('text-primary', 'hover:text-accent'),
  fontSize('text-sm'),
  lineHeight('leading-5')
)
export default function ({ blockchainPosts }: { blockchainPosts?: boolean }) {
  const { selectedType } = useSnapshot(SelectedTypeStore)
  return (
    <div className={container}>
      {blockchainPosts && <BackToTweetsButton />}
      <div className={tweetByWrapper}>
        <BodyText>{blockchainPosts ? 'Posts' : 'Tweets'} by</BodyText>
        <Dropdown
          currentValue={selectedType}
          options={Object.entries(data).map(([key, { twitter }]) => ({
            label: `@${twitter}`,
            value: key as keyof typeof data,
          }))}
          onChange={(value) => {
            SelectedTypeStore.selectedType = value
          }}
        />
      </div>
      {!blockchainPosts && (
        <NavLink to="blockchain" className={link}>
          View all on blockchain
        </NavLink>
      )}
    </div>
  )
}
