import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HowItWork from 'components/HowItWork'
import NavTabLink from 'components/NavTabLink'
import Navbar from 'components/navbar/Navbar'
import TabBar from 'components/TabBar'
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
        <TabBar>
          <NavTabLink to="/how-it-work" label="How this works" />
          <NavTabLink to="/previous-tweets" label="Previous Tweets" />
          <NavTabLink to="/deep-dive" label="Deep Dive" />
        </TabBar>
        <Routes>
          <Route index element={<Navigate replace to="/how-it-work" />} />
          <Route path="/how-it-work" element={<HowItWork />} />
          <Route path="/previous-tweets" element={<>Previous Tweets</>} />
          <Route path="/deep-dive" element={<>Deep Dive</>} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
