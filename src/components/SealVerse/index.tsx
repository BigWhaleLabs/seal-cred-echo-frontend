import { displayFrom } from 'helpers/visibilityClassnames'
import Dropdown from 'components/SealVerse/Dropdown'
import sealVerseData from 'sealVerseData'

const placeholder = <div className={displayFrom('xs')}>SealVerse</div>

export default function () {
  return (
    <Dropdown
      fitToItemSize
      staticPlaceholder={placeholder}
      currentValue={window.location.origin}
      options={sealVerseData}
      onChange={(value) => {
        if (value && value !== window.location.origin)
          window.open(value, '_blank')
      }}
    />
  )
}
