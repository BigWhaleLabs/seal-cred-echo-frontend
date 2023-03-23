import { LargeText } from 'components/Text'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import Card from 'components/Card'
import SealLogo from 'icons/SealLogo'
import classnames, {
  alignItems,
  borderRadius,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  zIndex,
} from 'classnames/tailwind'

const container = classnames(
  position('absolute'),
  display('flex'),
  justifyContent('justify-center'),
  inset('inset-0'),
  padding('py-1.5'),
  margin('!mt-0'),
  zIndex('z-30')
)
const overlay = classnames(
  position('absolute'),
  inset('inset-0'),
  borderRadius('rounded-2xl')
)
const warningCard = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-4')
)
const warningCardBottom = classnames(
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col', 'sm:flex-row'),
  space('space-y-4', 'sm:space-x-4', 'sm:space-y-0')
)

export default function ({ onAccept }: { onAccept: () => void }) {
  const navigate = useNavigate()

  return (
    <div className={container}>
      <div className={overlay} />
      <Card alert>
        <div className={warningCard}>
          <SealLogo />
          <LargeText>
            To view this content, you must be at least 18 years old. Are you at
            least 18 years of age?
          </LargeText>
          <div className={warningCardBottom}>
            <Button
              gradientFont
              small
              type="secondary"
              onClick={() => navigate('/tweets')}
            >
              I'm under 18
            </Button>
            <Button
              small
              type="primary"
              onClick={() => {
                onAccept()
              }}
            >
              Yes, I'm at least 18
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
