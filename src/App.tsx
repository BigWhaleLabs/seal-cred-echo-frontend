import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'
import classnames, {
  backgroundColor,
  textColor,
  width,
  wordBreak,
} from 'classnames/tailwind'

const pageWrapper = classnames(
  backgroundColor('bg-primary-dark'),
  width('w-full'),
  wordBreak('break-words'),
  textColor('text-white')
)

export default function () {
  return (
    <Root>
      <Router>
        <div className={pageWrapper}>
          <Navbar />
        </div>
      </Router>
    </Root>
  )
}
