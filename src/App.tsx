import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import BlockchainList from 'components/BlockchainList'
import DeepDive from 'components/DeepDive'
import Footer from 'components/Footer'
import HowItWorks from 'components/HowItWorks'
import Layout from 'components/Layout'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Privacy from 'pages/Privacy'
import ScrollToTop from 'components/ScrollToTop'
import Terms from 'pages/Terms'
import TweetsList from 'components/TweetsList'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
  minHeight,
  width,
} from 'classnames/tailwind'

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const bodyContainer = classnames(
  width('md:w-body'),
  gap('gap-y-4'),
  margin('md:mx-auto', 'mx-4', 'mb-auto')
)

export default function () {
  return (
    <Router>
      <ScrollToTop>
        <div className={pageContainer}>
          <Navbar />
          <div className={bodyContainer}>
            <Routes>
              <Route index element={<Layout component={<HowItWorks />} />} />
              <Route
                path="/tweets"
                element={<Layout component={<TweetsList />} />}
              />
              <Route
                path="/tweets/blockchain"
                element={<Layout component={<BlockchainList />} />}
              />
              <Route
                path="/deep-dive"
                element={<Layout component={<DeepDive />} />}
              />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
