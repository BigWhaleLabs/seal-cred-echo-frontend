import {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  display,
  flexDirection,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  padding,
  position,
  space,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import Color from 'models/Color'

interface CardProps {
  shadow?: boolean
  color: Color
  onlyWrap?: boolean
  spinner?: string
  thin?: boolean
  small?: boolean
  nospace?: boolean
  useAppStyles?: boolean
  mobileSpinnerOnRight?: boolean
}

const cardColor = (color?: Color) => {
  return classnames(
    borderWidth('border'),
    borderColor(
      color === 'accent'
        ? 'border-accent'
        : color === 'tertiary'
        ? 'border-tertiary'
        : color === 'secondary'
        ? 'border-secondary'
        : color === 'formal-accent'
        ? 'border-formal-accent'
        : color === 'primary'
        ? 'border-primary'
        : 'border-primary-dark'
    ),
    boxShadow('shadow-2xl'),
    boxShadowColor(
      color === 'accent'
        ? 'shadow-accent-semi-transparent'
        : color === 'tertiary'
        ? 'shadow-tertiary-semi-transparent'
        : color === 'secondary'
        ? 'shadow-secondary-semi-transparent'
        : color === 'formal-accent'
        ? 'shadow-formal-accent-semi-transparent'
        : color === 'primary'
        ? 'shadow-primary-semi-transparent'
        : undefined
    )
  )
}

const appStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-stretch'),
  minHeight('sm:min-h-card', 'min-h-fit')
)

const cardContainer = (
  shadow?: boolean,
  color?: Color,
  onlyWrap = false,
  small?: boolean,
  nospace?: boolean,
  useAppStyles?: boolean
) => {
  return classnames(
    position('relative'),
    borderWidth('border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
    cardColor(shadow ? color : undefined),
    padding(small ? 'p-4' : 'p-6'),
    width('w-auto'),
    maxWidth('max-w-lg'),
    margin('mx-5', 'lg:mx-0'),
    maxHeight(
      onlyWrap ? undefined : 'sm:max-h-card',
      onlyWrap ? undefined : 'max-h-mobile-card'
    ),
    space(nospace ? undefined : 'space-y-4'),
    wordBreak('break-words'),
    zIndex('z-30'),
    useAppStyles ? appStyles : undefined
  )
}

export default function ({
  color,
  shadow,
  onlyWrap,
  children,
  small,
  nospace,
  useAppStyles,
}: ChildrenProp & CardProps) {
  return (
    <div
      className={cardContainer(
        shadow,
        color,
        onlyWrap,
        small,
        nospace,
        useAppStyles
      )}
    >
      {children}
    </div>
  )
}
