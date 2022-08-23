import {
  displayOnMdAndLarger,
  displayOnSmAndSmaller,
} from 'helpers/visibilityClassnames'
import classnames, { display, justifyContent } from 'classnames/tailwind'

export default function () {
  return (
    <div
      className={classnames(display('flex'), justifyContent('justify-center'))}
    >
      <img className={displayOnMdAndLarger} src="img/deepDive.webp" />
      <img className={displayOnSmAndSmaller} src="img/deepDiveVertical.webp" />
    </div>
  )
}
