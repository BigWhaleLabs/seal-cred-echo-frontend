import { SocialLink } from 'components/Text'
import Discord from 'icons/Discord'
import Twitter from 'icons/Twitter'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const socialLinkContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-4')
)
export default function () {
  return (
    <div className={socialLinkContainer}>
      <SocialLink url="https://discord.gg/NHk96pPZUV">
        <Discord />
      </SocialLink>
      <SocialLink url="https://twitter.com/bigwhalelabs">
        <Twitter />
      </SocialLink>
    </div>
  )
}
