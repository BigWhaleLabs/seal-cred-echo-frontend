import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ConnectWalletBlock from 'components/ConnectWalletBlock'
import ExplainBlock from 'components/ExplainBlock'
import Navbar from 'components/navbar/Navbar'
import classnames, { height, margin, width } from 'classnames/tailwind'

const body = classnames(
  width('md:w-body', 'w-screen'),
  height('h-fit'),
  margin('mx-auto')
)

export default function () {
  return (
    <Router>
      <Navbar />
      <div className={body}>
        <ConnectWalletBlock />
        <ExplainBlock />
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
