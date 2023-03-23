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
      <div className={pageContainer}>
        <Navbar />
        <div className={bodyContainer}>
          <Routes>
            <Route index element={<Layout component={<HowItWorks />} />} />
            <Route
              element={<Layout component={<TweetsList />} />}
              path="/tweets"
            />
            <Route
              element={<Layout component={<BlockchainList />} />}
              path="/tweets/blockchain"
            />
            <Route
              element={<Layout component={<DeepDive />} />}
              path="/deep-dive"
            />
            <Route element={<Terms />} path="/terms" />
            <Route element={<Privacy />} path="/privacy" />
            <Route element={<NotFound />} path="/404" />
            <Route element={<Navigate replace to="/404" />} path="*" />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
