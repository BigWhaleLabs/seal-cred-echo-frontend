import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ExplainBlock from 'components/ExplainBlock'
import Navbar from 'components/navbar/Navbar'
import classnames, { height, margin, space, width } from 'classnames/tailwind'

const body = classnames(
  width('md:w-body', 'w-screen'),
  height('h-fit'),
  margin('mx-auto'),
  space('space-y-4')
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
