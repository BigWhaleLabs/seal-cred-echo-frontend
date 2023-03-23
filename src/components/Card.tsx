import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  height,
  maxHeight,
  maxWidth,
  padding,
  position,
  space,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

interface CardProps {
  small?: boolean
  alert?: boolean
}

const cardContainer = (small?: boolean, alert?: boolean) => {
  return classnames(
    position('relative'),
    borderWidth('border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    boxShadow('shadow-card'),
    boxShadowColor('shadow-light-formal-accent'),
    backgroundColor('bg-primary-dark'),
    padding(small ? 'p-4' : 'p-6'),
    maxWidth(alert ? 'max-w-alert' : 'max-w-full'),
    maxHeight(alert ? 'max-h-alert' : 'max-h-full'),
    height('h-fit'),
    width('w-auto'),
    space('space-y-4'),
    wordBreak('break-words'),
    zIndex('z-20')
  )
}

export default function ({ alert, children, small }: ChildrenProp & CardProps) {
  return <div className={cardContainer(small, alert)}>{children}</div>
}
