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

const commonClasses = classnames(display('flex'), alignItems('items-center'))
const footerContainer = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  padding('py-8', 'px-4', 'lg:px-25'),
  space('space-y-4', 'md:space-x-4', 'md:space-y-0')
)
const linksContainer = classnames(
  commonClasses,
  flexDirection('flex-row'),
  space('space-x-4')
)

export default function () {
  const { md } = useBreakpoints()

  return (
    <div className={footerContainer}>
      <FooterlLink url="https://blog.bigwhalelabs.com/">
        <div className={linksContainer}>
          <FooterLogo />
          <span>Blog</span>
        </div>
      </FooterlLink>

      <Delimiter primary showOn="md" />
      <FooterlLink url="/terms">Terms of service</FooterlLink>
      <Delimiter primary showOn="md" />
      <FooterlLink url="/privacy">Privacy policy</FooterlLink>
      {!md && (
        <>
          <Delimiter primary showOn="md" />
          <div className={linksContainer}>
            <SocialLink url="https://discord.gg/NHk96pPZUV">
              <Discord />
            </SocialLink>
            <SocialLink url="https://twitter.com/bigwhalelabs">
              <Twitter />
            </SocialLink>
          </div>
        </>
      )}
    </div>
  )
}
