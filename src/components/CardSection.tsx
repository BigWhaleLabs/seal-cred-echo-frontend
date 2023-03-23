import { space } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

export default function ({
  children,
  smallPadding = false,
}: ChildrenProp & { smallPadding?: boolean }) {
  return (
    <section className={space(smallPadding ? 'space-y-2' : 'space-y-4')}>
      {children}
    </section>
  )
}
