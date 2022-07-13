import { LinkText } from 'components/Text'
import { space } from 'classnames/tailwind'

export default function ({ tags }: { tags: string[] }) {
  return (
    <div className={space('space-x-1')}>
      {tags.map((tag) => (
        <LinkText small url="#" color="text-primary" key={tag}>
          #{tag}
        </LinkText>
      ))}
    </div>
  )
}
