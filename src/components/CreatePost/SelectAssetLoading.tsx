import { fontFamily } from 'classnames/tailwind'
import ItemContainer from 'components/Dropdown/ItemContainer'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  return (
    <ItemContainer withPadding>
      <p
        className={classNamesToString(
          fontFamily('font-primary'),
          'dots-loading'
        )}
      >
        Loading assets
      </p>
    </ItemContainer>
  )
}
