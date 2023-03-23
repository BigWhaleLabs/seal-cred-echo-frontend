import { Link } from 'react-router-dom'
import { LogoSubText, LogoText } from 'components/Text'
import { Player } from '@lottiefiles/react-lottie-player'
import {
  displayFrom,
  displayOnMdAndLarger,
  displayOnSmAndSmaller,
} from 'helpers/visibilityClassnames'
import { useRef } from 'preact/hooks'
import AnimatedLogo from 'icons/AnimatedLogo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  maxWidth,
  space,
  width,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-4')
)
const logoTextContainer = classnames(
  displayFrom('md'),
  flexDirection('flex-col'),
  space('space-y-1')
)
const logoTextRow = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center')
)
const logoTextUpperRow = classnames(logoTextRow, gap('gap-x-1', 'body:gap-x-4'))
const logoTextBottomRow = classnames(logoTextRow, gap('gap-x-2'))
const logoWrapper = classnames(
  display('flex'),
  width('w-full'),
  maxWidth('max-w-14')
)

export default function () {
  const lottieRef = useRef<Player>()

  return (
    <Link to="/">
      <div className={container}>
        <div className={logoWrapper}>
          <Player hover ref={lottieRef} src={AnimatedLogo} />
        </div>
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
