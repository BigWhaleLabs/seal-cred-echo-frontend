import classnames, { display, space } from 'classnames/tailwind'

const tweetDetail = classnames(display('flex'), space('space-x-1'))

export default function () {
  return (
    <div className={tweetDetail}>
      <div>☻</div>
      <div>@SealCredWork</div>
      <div>·</div>
      <div>1d</div>
    </div>
  )
}
