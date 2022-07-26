import { FooterlLink, SocialLink } from 'components/Text'
import Delimiter from 'components/Delimiter'
import Discord from 'icons/Discord'
import FooterLogo from 'icons/FooterLogo'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const footerContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-center'),
  padding('py-8', 'px-4', 'lg:px-25'),
  space('space-y-4', 'md:space-x-4', 'md:space-y-0')
)
const footerLogoLink = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('space-x-4')
)
const socialContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  space('space-x-4')
)

export default function () {
  const { md } = useBreakpoints()

  return (
    <div className={footerContainer}>
      <FooterlLink url="https://blog.bigwhalelabs.com/">
        <div className={footerLogoLink}>
          <FooterLogo />
          <span>Blog</span>
        </div>
      </FooterlLink>

      <Delimiter primary showOn="md" />
      <FooterlLink url="/terms">Terms of service</FooterlLink>
      <Delimiter primary showOn="md" />
      <FooterlLink url="/privacy">Privacy policy</FooterlLink>
      {!md && (
        <div className={socialContainer}>
          <Delimiter primary showOn="md" />
          <SocialLink url="https://discord.gg/NHk96pPZUV">
            <Discord />
          </SocialLink>
          <SocialLink url="https://twitter.com/bigwhalelabs">
            <Twitter />
          </SocialLink>
        </div>
      )}
    </div>
  )
}
