import { BodyText } from 'components/Text'
import { NavLink } from 'react-router-dom'
import BackArrow from 'icons/BackArrow'
import classnames, {
  alignItems,
  display,
  gap,
  padding,
  textColor,
  textDecoration,
  transitionProperty,
} from 'classnames/tailwind'

const backButtonContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  transitionProperty('transition-colors'),
  textDecoration('hover:underline'),
  textColor('hover:text-accent')
)
const backArrowContainer = padding('p-1.5')
export default function () {
  return (
    <NavLink className={backButtonContainer} to="/tweets">
      <div className={backArrowContainer}>
        <BackArrow />
      </div>
      <BodyText inheritColor>Back to Tweets</BodyText>
    </NavLink>
  )
}
