import { MutableRef, useRef, useState } from 'preact/hooks'
import { Suspense } from 'preact/compat'
import { TextareaText } from 'components/Text'
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
const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)
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

export function DropDown({ disabled }: { disabled?: boolean }) {
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
        disabled={!hasBadges || disabled}
        className={opener}
      >
        {hasBadges ? (
          <>
            {currentDomain ? (
              <TextareaText dark={disabled}>
                <span className={postingAs}>Posting as: </span>
                {currentDomain}
              </TextareaText>
            ) : (
              <TextareaText dark>Select work email</TextareaText>
            )}
          </>
        ) : (
          <TextareaText dark>No ZK badge in this wallet</TextareaText>
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

export default function ({ disabled }: { disabled?: boolean }) {
  return (
    <Suspense
      fallback={
        <div className={wrapper(false)}>
          <button disabled className={opener}>
            <TextareaText dark>Fetching emails...</TextareaText>
            <div className={width('w-5')}>
              <Spinner />
            </div>
          </button>
        </div>
      }
    >
      <DropDown disabled={disabled} />
    </Suspense>
  )
}
