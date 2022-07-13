import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ExplainBlock from 'components/ExplainBlock'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'

export default function () {
  return (
    <Root>
      <Router>
        <Navbar />
        <ExplainBlock />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </Root>
  )
}
