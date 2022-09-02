import { useLocation } from 'react-router-dom'
import Logo from 'components/Navbar/Logo'
import OctoLogo from 'components/Navbar/OctoLogo'
import SocialLinksAndWallet from 'components/Navbar/SocialLinksAndWallet'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  inset,
  justifyContent,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useScrolledFromTop from 'hooks/useScrolledFromTop'

const navbar = (backgroundVisible?: boolean) =>
  classnames(
    zIndex('z-50'),
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent('justify-between'),
    padding('p-4', 'lg:px-25'),
    space('space-x-2', 'lg:space-x-0'),
    backgroundColor(backgroundVisible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

export default function () {
  const backgroundVisible = useScrolledFromTop()
  const { pathname } = useLocation()
  const is404 = pathname === '/404'

  return (
    <nav className={navbar(backgroundVisible)}>
      {is404 ? <OctoLogo /> : <Logo />}
      <SocialLinksAndWallet />
    </nav>
  )
}
