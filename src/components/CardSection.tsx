import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  smallPadding = false,
  children,
}: ChildrenProp & { smallPadding?: boolean }) {
  return (
    <section className={space(smallPadding ? 'space-y-2' : 'space-y-4')}>
      {children}
    </section>
  )
}
