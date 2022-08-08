import { AccentText, CardParagraph, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'
import CardSection from 'components/CardSection'

export default function () {
  const navigate = useNavigate()

  return (
    <Card>
      <div className={space('space-y-4')}>
        <HeaderText>
          <AccentText color="text-accent">404</AccentText>
        </HeaderText>
        <CardSection smallPadding>
          <CardParagraph>
            We couldn't find the page you are looking for. Try to return to the
            main page.
          </CardParagraph>
        </CardSection>
        <Button type="primary" small onClick={() => navigate('/')}>
          Go to the main page
        </Button>
      </div>
    </Card>
  )
}
