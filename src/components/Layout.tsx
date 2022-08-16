import { JSX } from 'preact'
import Main from 'pages/Main'

export default function ({ component }: { component: JSX.Element }) {
  return <Main>{component}</Main>
}
