import classnames, {
  backgroundColor,
  borderRadius,
  height,
  width,
} from 'classnames/tailwind'

const tweetCardAvatar = classnames(
  borderRadius('rounded-full'),
  width('w-12'),
  height('h-12'),
  backgroundColor('bg-accent')
)

export default function () {
  return <div className={tweetCardAvatar} />
}
