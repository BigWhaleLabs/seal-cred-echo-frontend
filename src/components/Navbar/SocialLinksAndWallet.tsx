import AccountAndLogo from 'components/Navbar/AccountAndLogo'
import LastDelimiter from 'components/LastDelimiter'
import SealVerse from 'components/SealVerse'
import SocialLinks from 'components/Navbar/SocialLinks'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-2', 'md:gap-x-3', 'body:gap-x-4'),
  cursor('cursor-pointer')
)

export default function () {
  return (
    <div className={walletContainer}>
      <SocialLinks />
      <SealVerse />
      <LastDelimiter />
      <AccountAndLogo />
    </div>
  )
}
