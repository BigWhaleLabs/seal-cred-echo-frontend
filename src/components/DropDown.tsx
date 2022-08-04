import { Suspense } from 'preact/compat'
import { TextareaText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import PostFormStore from 'stores/PostFormStore'
import SealCredStore from 'stores/SealCredStore'
import SelectDropdown from 'components/SelectDropdown'
import classnames, { display, padding } from 'classnames/tailwind'
import useContractsOwned from 'hooks/useContractsOwned'

type SelectValueType = ERC721Post | EmailPost

const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)

const SelectedContractName = ({ value }: { value?: SelectValueType }) => {
  if (!value) return <>{null}</>

  return (
    <>
      {value instanceof ERC721Post ? (
        <ContractSymbol address={value.derivative} />
      ) : (
        <>@{value.original}</>
      )}
    </>
  )
}

function SelectedValue({ value }: { value?: SelectValueType }) {
  return (
    <>
      {value ? (
        <TextareaText>
          <span className={postingAs}>Posting as: </span>
          <SelectedContractName value={value} />
        </TextareaText>
      ) : (
        ''
      )}
    </>
  )
}

function OptionElement({
  value,
  label,
}: {
  value?: ERC721Post | EmailPost
  label?: string
}) {
  if (!label) return <>Not found</>
  return (
    <Suspense fallback={<>Loading...</>}>
      {value instanceof ERC721Post ? (
        <ContractSymbol address={label} />
      ) : (
        <ContractName clearType address={label} />
      )}
    </Suspense>
  )
}

export function DropDown({ disabled }: { disabled?: boolean }) {
  const { emailLedger, externalERC721Ledger } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedEmailDerivativeContracts = Object.values(emailLedger).filter(
    ({ derivative }) => contractsOwned.includes(derivative)
  )
  const ownedExternalERC721DerivativeContracts = Object.values(
    externalERC721Ledger
  ).filter(({ derivative }) => contractsOwned.includes(derivative))
  const { currentPost } = useSnapshot(PostFormStore)

  const options = [
    ...ownedEmailDerivativeContracts.map(({ original, derivative }) => ({
      label: derivative,
      value: new EmailPost(original),
    })),
    ...ownedExternalERC721DerivativeContracts.map(
      ({ original, derivative }) => ({
        label: derivative,
        value: new ERC721Post(original, derivative),
      })
    ),
  ]

  return (
    <SelectDropdown<ERC721Post | EmailPost>
      border
      disabled={disabled}
      placeholder="Select badge"
      emptyText="No ZK badge in this wallet"
      current={currentPost}
      options={options}
      SelectedValue={<SelectedValue value={currentPost} />}
      OptionElement={OptionElement}
      onChange={({ value }) => (PostFormStore.currentPost = value)}
    />
  )
}

export default function ({ disabled }: { disabled?: boolean }) {
  return (
    <Suspense fallback={<SelectDropdown border loading current="" />}>
      <DropDown disabled={disabled} />
    </Suspense>
  )
}
