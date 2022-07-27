import { StatusText } from 'components/Text'
import classnames, { display, width } from 'classnames/tailwind'

const bottomSeparator = (showOn: 'sm' | 'md' = 'sm') =>
  classnames(
    width('w-fit'),
    display({
      hidden: true,
      'sm:block': showOn === 'sm',
      'md:block': showOn === 'md',
    })
  )

export default function ({
  showOn,
  primary,
}: {
  showOn?: 'sm' | 'md'
  primary?: boolean
}) {
  return (
    <div className={bottomSeparator(showOn)}>
      <StatusText color={primary ? 'primary' : 'default'}>|</StatusText>
    </div>
  )
}
