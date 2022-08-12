import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import DeepDive from 'components/DeepDive'
import Footer from 'components/Footer'
import HowItWorks from 'components/HowItWorks'
import Main from 'pages/Main'
import Navbar from 'components/navbar/Navbar'
import NotFound from 'pages/NotFound'
import PreviousTweets from 'components/PreviousTweets'
import Privacy from 'pages/Privacy'
import ScrollToTop from 'components/ScrollToTop'
import Terms from 'pages/Terms'
import ViewOnBlockchain from 'components/ViewOnBlockchain'
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
  margin('mx-auto', 'mb-auto')
)
export default function () {
  return (
    <Router>
      <ScrollToTop>
        <div className={pageContainer}>
          <Navbar />
          <div className={bodyContainer}>
            <Main>
              <Routes>
                <Route index element={<HowItWorks />} />
                {/* <Route path="/previous-tweets" element={<PreviousTweets />} />
                <Route
                  path="/previous-tweets/blockchain"
                  element={<ViewOnBlockchain />}
                />
                <Route path="/deep-dive" element={<DeepDive />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} /> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
