import Form from 'components/CreatePost/Form'
import classnames, { gap, margin } from 'classnames/tailwind'

const container = classnames(
  margin('mt-6', 'mb-16'),
  gap('gap-y-6', 'md:gap-y-12')
)
export default function () {
  return (
    <div className={container}>
      <Form />
    </div>
  )
}
