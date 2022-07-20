import { NavLink } from 'react-router-dom'
import { TabBarText } from 'components/Text'
import classnames, {
  display,
  margin,
  textColor,
  textDecoration,
  textUnderlineOffset,
} from 'classnames/tailwind'

const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
  classnames(
    display('inline-flex'),
    textColor(isActive ? 'text-accent' : 'text-formal-accent'),
    textDecoration(isActive ? 'underline' : 'no-underline'),
    margin('mb-4'),
    textUnderlineOffset('underline-offset-8')
  )

export default function ({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={navLinkStyle}>
      <TabBarText>{label}</TabBarText>
    </NavLink>
  )
}
