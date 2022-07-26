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

export default function ({ showOn }: { showOn?: 'sm' | 'md' }) {
  return (
    <div className={bottomSeparator(showOn)}>
      <StatusText>|</StatusText>
    </div>
  )
}
