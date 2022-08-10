import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
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
  height,
  margin,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const body = classnames(
  width('md:w-body', 'w-screen'),
  height('h-fit'),
  space('space-y-4'),
  padding('pb-5'),
  margin('mx-auto', 'md:mb-16')
)

export default function () {
  return (
    <Router>
      <Navbar />
      <div className={body}>
        <ScrollToTop>
          <div className={margin('mx-5', 'md:mx-auto')}>
            <Routes>
              <Route index element={<Navigate replace to="/how-it-works" />} />
              <Route
                path="/how-it-works"
                element={
                  <Main>
                    <HowItWorks />
                  </Main>
                }
              />
              {/* <Route
                path="/previous-tweets"
                element={
                  <Main>
                    <PreviousTweets />
                  </Main>
                }
              /> */}
              {/* <Route
                path="/previous-tweets/blockchain"
                element={
                  <Main>
                    <ViewOnBlockchain />
                  </Main>
                }
              /> */}
              <Route
                path="/deep-dive"
                element={
                  <Main>
                    <DeepDive />
                  </Main>
                }
              />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ScrollToTop>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
