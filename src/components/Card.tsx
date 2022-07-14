import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
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
}

const cardContainer = (small?: boolean) => {
  return classnames(
    position('relative'),
    borderWidth('border'),
    borderColor('border-half-grey'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
    padding(small ? 'p-4' : 'p-6'),
    width('w-auto'),
    space('space-y-4'),
    wordBreak('break-words'),
    zIndex('z-30')
  )
}

export default function ({ children, small }: ChildrenProp & CardProps) {
  return <div className={cardContainer(small)}>{children}</div>
}
