import { FooterLink } from 'components/Text'
import { displayTo } from 'helpers/visibilityClassnames'
import Delimiter from 'components/Delimiter'
import FooterLogo from 'icons/FooterLogo'
import SocialLinks from 'components/SocialLinks'
import classnames, {
  alignItems,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'

const commonClasses = classnames(display('flex'), alignItems('items-center'))
const footerContainer = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  padding('py-8', 'px-4', 'lg:px-25'),
  space('space-y-4', 'md:space-x-4', 'md:space-y-0')
)
const blogContainer = classnames(
  commonClasses,
  flexDirection('flex-row'),
  space('space-x-4')
)

export default function () {
  return (
    <div className={footerContainer}>
      <FooterLink url="https://blog.bigwhalelabs.com/">
        <div className={blogContainer}>
          <FooterLogo />
          <span>Blog</span>
        </div>
      </FooterLink>
      <Delimiter primary showFrom="md" />
      <FooterLink internal url="/terms">
        Terms of service
      </FooterLink>
      <Delimiter primary showFrom="md" />
      <FooterLink internal url="/privacy">
        Privacy policy
      </FooterLink>
      <span className={displayTo('md')}>
        <SocialLinks />
      </span>
    </div>
  )
}
