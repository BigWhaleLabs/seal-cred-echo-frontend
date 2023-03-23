import { AccentText } from 'components/Text'
import { Children } from 'preact/compat'
import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, space } from 'classnames/tailwind'

const recordContainer = classnames(display('flex'), space('space-x-4'))

function Record({ children, index }: { index: number } & ChildrenProp) {
  return (
    <p className={recordContainer}>
      <AccentText color="text-secondary">{index}</AccentText>
      <span>{children}</span>
    </p>
  )
}

export const ListItem = ({ children }: ChildrenProp) => <div>{children}</div>

export default function ({ children }: ChildrenProp) {
  const items = Children.map(children, (child, index) => {
    return <Record index={index + 1}>{child}</Record>
  })
  return <>{items}</>
}
