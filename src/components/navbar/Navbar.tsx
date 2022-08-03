import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/Text'
import { useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from 'icons/Logo'
import Wallet from 'components/navbar/Wallet'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'

const navbar = (visible?: boolean, withoutWallet?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutWallet ? 'sm:justify-center' : 'justify-between'),
    padding('py-4', 'px-4', 'lg:px-25'),
    space('space-x-2', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  margin('mt-2')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-1')
)
const logoBlock = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center')
)
const upperBlock = classnames(logoBlock, space('space-x-4'))
const bottomBlock = classnames(logoBlock, space('md:space-x-0', 'space-x-2'))
const displayOnBig = display('md:block', 'hidden')
const displayOnSmall = display('block', 'md:hidden')

export default function () {
  const { pathname } = useLocation()
  const withoutWallet = pathname.split('/').length > 3

  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  useMemo(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <nav className={navbar(backgroundVisible, withoutWallet)}>
      <Link to="/">
        <div className={logoContainer}>
          <Logo />
          <div className={logoWithVersion}>
            <div className={upperBlock}>
              <LogoText>SealCred</LogoText>
              <div className={displayOnBig}>
                <LogoText textSecondary>|</LogoText>
              </div>
              <div className={displayOnBig}>
                <LogoText textSecondary>Echo</LogoText>
              </div>
            </div>
            <div className={bottomBlock}>
              <div className={displayOnSmall}>
                <LogoText textSecondary>Echo</LogoText>
              </div>
              <LogoSubText>(ALPHA)</LogoSubText>
            </div>
          </div>
        </div>
      </Link>
      {!withoutWallet && <Wallet />}
    </nav>
  )
}
