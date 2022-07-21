import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Background from 'components/Background'
import DeepDive from 'components/DeepDive'
import HowItWorks from 'components/HowItWorks'
import NavTabLink from 'components/NavTabLink'
import Navbar from 'components/navbar/Navbar'
import PreviousTweets from 'components/PreviousTweets'
import TabBar from 'components/TabBar'
import ViewOnBlockchain from 'components/ViewOnBlockchain'
import WalletOrTweet from 'components/WalletOrTweet'
import classnames, {
  height,
  margin,
  minHeight,
  overflow,
  padding,
  position,
  space,
  width,
  zIndex,
} from 'classnames/tailwind'

const wrapper = classnames(
  position('relative'),
  overflow('overflow-hidden'),
  minHeight('min-h-screen')
)
const body = classnames(
  position('relative'),
  width('md:w-body', 'w-screen'),
  height('h-fit'),
  space('space-y-4'),
  padding('pb-5'),
  margin('mx-auto'),
  zIndex('z-10')
)

export default function () {
  return (
    <Router>
      <div className={wrapper}>
        <Navbar />
        <div className={body}>
          <div className={margin('mx-5', 'md:mx-auto')}>
            <WalletOrTweet />
            <TabBar>
              <NavTabLink to="/how-it-works" label="How this works" />
              <NavTabLink to="/previous-tweets" label="Previous Tweets" />
              <NavTabLink to="/deep-dive" label="Deep Dive" />
            </TabBar>
            <Routes>
              <Route index element={<Navigate replace to="/how-it-works" />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/previous-tweets" element={<PreviousTweets />} />
              <Route
                path="/previous-tweets/blockchain"
                element={<ViewOnBlockchain />}
              />
              <Route path="/deep-dive" element={<DeepDive />} />
            </Routes>
          </div>
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
        <Background />
      </div>
    </Router>
  )
}
