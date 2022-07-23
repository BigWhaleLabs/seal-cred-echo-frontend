import { MutableRef, useRef, useState } from 'preact/hooks'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Arrow from 'icons/Arrow'
import ContractName from 'components/ContractName'
import SealCredStore from 'stores/SealCredStore'
import Spinner from 'icons/Spinner'
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
  opacity,
  outlineColor,
  outlineStyle,
  padding,
  position,
  space,
  textAlign,
  textColor,
  transitionProperty,
  visibility,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'
import useContractsOwned from 'hooks/useContractsOwned'

const sharedStyles = classnames(
  borderRadius('rounded-lg'),
  borderWidth('border'),
  borderColor('border-formal-accent-dimmed', 'focus:border-formal-accent'),
  outlineColor('focus:outline-primary'),
  outlineStyle('focus:outline'),
  transitionProperty('transition-colors'),
  padding('tiny:px-4', 'px-3', 'py-3'),
  backgroundColor('bg-primary-dark'),
  alignItems('items-center')
)

const wrapper = (hasBadges: boolean) =>
  classnames(
    position('relative'),
    fontFamily('font-primary'),
    zIndex('z-40'),
    width('w-full'),
    opacity({ 'opacity-70': !hasBadges })
  )
const opener = classnames(
  display('inline-flex'),
  justifyContent('justify-between'),
  width('md:w-80', 'w-full'),
  space('space-x-2'),
  textAlign('text-left'),
  sharedStyles
)
const menuWrapper = (open: boolean) =>
  classnames(
    position('absolute'),
    inset('top-14'),
    width('tiny:w-full', 'w-fit'),
    opacity(open ? 'opacity-100' : 'opacity-0'),
    visibility(open ? 'visible' : 'invisible'),
    transitionProperty('transition-opacity'),
    space('space-y-1'),
    sharedStyles
  )
const postingAs = display('tiny:inline', 'hidden')
const menuItem = (current?: boolean) =>
  classnames(
    padding('p-2'),
    cursor('cursor-pointer'),
    borderRadius('rounded-md'),
    wordBreak('break-all'),
    backgroundColor({
      'bg-primary-dimmed': current,
      'bg-transparent': !current,
      'hover:bg-primary-dimmed': current,
      'hover:bg-primary-background': !current,
    })
  )

export function DropDown() {
  const [dropDownOpen, setOpen] = useState(false)
  const { emailLedger } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedEmailDerivativeContracts = Object.values(emailLedger).filter(
    ({ derivativeContract }) => contractsOwned.includes(derivativeContract)
  )

  const { currentDomain } = useSnapshot(TwitterStore)
  const hasBadges = !!ownedEmailDerivativeContracts.length

  const ref = useRef() as MutableRef<HTMLDivElement>
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className={wrapper(hasBadges)} ref={ref}>
      <button
        onClick={() => setOpen(!dropDownOpen)}
        disabled={!hasBadges}
        className={opener}
      >
        {hasBadges ? (
          <>
            {currentDomain ? (
              <span>
                <span className={postingAs}>Posting as: </span>
                {currentDomain}
              </span>
            ) : (
              <span
                className={textColor('text-formal-accent-semi-transparent')}
              >
                Select work email
              </span>
            )}
          </>
        ) : (
          <span className={textColor('text-formal-accent-semi-transparent')}>
            No ZK badge in this wallet
          </span>
        )}

        <div className={width('w-5')}>
          <Arrow pulseDisabled open={dropDownOpen} />
        </div>
      </button>

      <div className={menuWrapper(dropDownOpen)}>
        {ownedEmailDerivativeContracts.map(({ derivativeContract, domain }) => (
          <p
            className={menuItem(domain === currentDomain)}
            onClick={() => {
              TwitterStore.currentDomain = domain
              setOpen(false)
            }}
          >
            <ContractName clearType address={derivativeContract} />
          </p>
        ))}
      </div>
    </div>
  )
}

export default function () {
  return (
    <Suspense
      fallback={
        <div className={wrapper(false)}>
          <button disabled className={opener}>
            <span className={textColor('text-formal-accent-semi-transparent')}>
              Fetching emails...
            </span>
            <div className={width('w-5')}>
              <Spinner />
            </div>
          </button>
        </div>
      }
    >
      <DropDown />
    </Suspense>
  )
}
