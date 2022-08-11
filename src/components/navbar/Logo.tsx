import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/Text'
import Logo from 'icons/Logo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-4')
)
const logoTextContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-1')
)
const logoTextRow = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center')
)
const logoTextUpperRow = classnames(logoTextRow, gap('gap-x-4'))
const logoTextBottomRow = classnames(logoTextRow, gap('gap-x-2'))
const displayOnMdAndLarger = display('hidden', 'md:flex')
const displayOnSmAndSmaller = display('flex', 'md:hidden')

export default function () {
  return (
    <Link to="/">
      <div className={container}>
        <Logo />
        <div className={logoTextContainer}>
          <div className={logoTextUpperRow}>
            <LogoText>SealCred</LogoText>
            <div className={displayOnMdAndLarger}>
              <LogoText textSecondary>|</LogoText>
            </div>
            <div className={displayOnMdAndLarger}>
              <LogoText textSecondary>Echo</LogoText>
            </div>
          </div>
          <div className={logoTextBottomRow}>
            <div className={displayOnSmAndSmaller}>
              <LogoText textSecondary>Echo</LogoText>
            </div>
            <LogoSubText>(ALPHA)</LogoSubText>
          </div>
        </div>
      </div>
    </Link>
  )
}
