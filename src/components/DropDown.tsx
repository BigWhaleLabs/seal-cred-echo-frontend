import { MutableRef, useRef } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import Arrow from 'icons/Arrow'
import TwitterStore from 'stores/TwitterStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  fontFamily,
  inset,
  justifyContent,
  padding,
  position,
  space,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useClickOutside from 'hooks/useClickOutside'

const sharedStyles = classnames(
  borderRadius('rounded-lg'),
  borderWidth('border'),
  borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
  transitionProperty('transition-colors'),
  padding('px-4', 'py-3'),
  backgroundColor('bg-primary-dark'),
  alignItems('items-center')
)

const wrapper = classnames(position('relative'), fontFamily('font-primary'))
const opener = classnames(
  display('inline-flex'),
  justifyContent('justify-between'),
  width('w-80'),
  space('space-x-2'),
  sharedStyles
)
const menuWrapper = (open: boolean) =>
  classnames(
    position('absolute'),
    inset('top-14'),
    width('w-full'),
    display(open ? 'block' : 'hidden'),
    sharedStyles
  )
const menuItem = classnames(padding('p-2'), cursor('cursor-pointer'))

export default function () {
  const { availableEmails, dropDownOpen } = useSnapshot(TwitterStore)

  const ref = useRef() as MutableRef<HTMLDivElement>
  useClickOutside(ref, () => (TwitterStore.dropDownOpen = false))

  return (
    <div className={wrapper} ref={ref}>
      <button
        onClick={() => (TwitterStore.dropDownOpen = !dropDownOpen)}
        className={opener}
      >
        <span>Posting as: {availableEmails[0]}</span>
        <div className={width('w-5')}>
          <Arrow pulseDisabled open={dropDownOpen} />
        </div>
      </button>

      <div className={menuWrapper(dropDownOpen)}>
        {availableEmails.map((email, index) =>
          index ? (
            <p
              className={menuItem}
              onClick={() => TwitterStore.setCurrentEmail(index)}
            >
              {truncateMiddleIfNeeded(email, 14)}
            </p>
          ) : undefined
        )}
      </div>
    </div>
  )
}
