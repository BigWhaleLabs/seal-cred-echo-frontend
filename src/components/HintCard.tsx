import { BadgeText } from 'components/Text'
import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  fontSize,
  padding,
  space,
} from 'classnames/tailwind'

const container = (small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    borderRadius('rounded-lg'),
    backgroundColor('bg-primary-background'),
    padding('px-4', small ? 'py-2' : 'py-4'),
    space('space-y-4'),
    fontSize('text-sm')
  )
export default function ({
  children,
  small,
  text,
}: ChildrenProp & {
  small?: boolean
  text?: ComponentChildren
}) {
  return (
    <div className={container(small)}>
      {text && <BadgeText>{text}</BadgeText>}
      {children}
    </div>
  )
}
