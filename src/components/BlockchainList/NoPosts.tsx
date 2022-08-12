import { CardParagraph, HeaderText } from 'components/Text'
import { margin } from 'classnames/tailwind'
import Card from 'components/Card'

const container = margin('my-6')
export default function () {
  return (
    <div className={container}>
      <Card>
        <HeaderText>No posts yet!</HeaderText>
        <CardParagraph>Be the first one to post!</CardParagraph>
      </Card>
    </div>
  )
}
