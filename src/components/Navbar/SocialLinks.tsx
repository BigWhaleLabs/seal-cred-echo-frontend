import { SocialLink } from 'components/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import Discord from 'icons/Discord'
import LastDelimiter from 'components/LastDelimiter'
import Twitter from 'icons/Twitter'
import classnames, { alignItems, gap } from 'classnames/tailwind'

const socialLinksContainer = classnames(
  displayFrom('lg'),
  alignItems('items-center'),
  gap('gap-x-4')
)

export default function () {
  return (
    <div className={socialLinksContainer}>
      <SocialLink url="https://discord.gg/NHk96pPZUV">
        <Discord />
      </SocialLink>
      <SocialLink url="https://twitter.com/bigwhalelabs">
        <Twitter />
      </SocialLink>
      <LastDelimiter />
    </div>
  )
}
