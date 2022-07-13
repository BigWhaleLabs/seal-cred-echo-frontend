import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ExplainBlock from 'components/ExplainBlock'
import Navbar from 'components/navbar/Navbar'
import classnames, {
  height,
  margin,
  maxWidth,
  width,
} from 'classnames/tailwind'

const body = classnames(
  width('md:w-full', 'w-screen'),
  maxWidth('md:max-w-body'),
  height('h-fit'),
  margin('mx-auto')
)

export default function () {
  return (
    <Router>
      <Navbar />
      <div className={body}>
        <ExplainBlock />
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
