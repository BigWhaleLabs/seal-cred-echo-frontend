import Dropdown from 'components/SealVerse/Dropdown'
import sealVerseData from 'sealVerseData'

export default function () {
  return (
    <Dropdown
      fitToItemSize
      staticPlaceholder="SealVerse"
      currentValue={window.location.origin}
      options={sealVerseData}
      onChange={(value) => {
        if (value && value !== window.location.origin)
          window.open(value, '_blank')
      }}
    />
  )
}
