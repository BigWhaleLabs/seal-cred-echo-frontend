import classnames, {
  borderRadius,
  display,
  height,
  width,
} from 'classnames/tailwind'

const tweetCardAvatar = classnames(
  display('flex'),
  width('w-12'),
  height('h-12'),
  borderRadius('rounded-full')
)

export default function () {
  return (
    <div className={tweetCardAvatar}>
      <img src="img/defaultAvatar.webp" alt="Anonymous Avatar" />
    </div>
  )
}
