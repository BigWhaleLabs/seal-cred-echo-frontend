import { Suspense } from 'preact/compat'
import { TextareaText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import EmailPost from 'helpers/posts/EmailPost'
import ExternalNFTPost from 'helpers/posts/ExternalNFTPost'
import NFTPost from 'helpers/posts/NFTPost'
import PostFormStore from 'stores/PostFormStore'
import SealCredStore from 'stores/SealCredStore'
import SelectDropdown from 'components/SelectDropdown'
import classnames, { display, padding } from 'classnames/tailwind'
import useContractsOwned from 'hooks/useContractsOwned'

type SelectValueType = EmailPost | ExternalNFTPost | NFTPost

const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)

const SelectedContractName = ({ value }: { value?: SelectValueType }) => {
  if (!value) return <>{null}</>

  return (
    <>
      {value instanceof EmailPost ? (
        <>@{value.original}</>
      ) : (
        <ContractSymbol address={value.derivative} />
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
  value?: SelectValueType
  label?: string
}) {
  if (!label) return <>Not found</>
  return (
    <Suspense fallback={<>Loading...</>}>
      {value instanceof EmailPost ? (
        <ContractName clearType address={label} />
      ) : (
        <ContractSymbol address={label} />
      )}
    </Suspense>
  )
}

export function DropDown({ disabled }: { disabled?: boolean }) {
  const { currentPost } = useSnapshot(PostFormStore)
  const { emailLedger, ERC721Ledger, externalERC721Ledger } =
    useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()

  const options = [
    ...Object.values(emailLedger)
      .filter(({ derivative }) => contractsOwned.includes(derivative))
      .map(({ original, derivative }) => ({
        label: derivative,
        value: new EmailPost(original),
      })),
    ...Object.values(ERC721Ledger)
      .filter(({ derivative }) => contractsOwned.includes(derivative))
      .map(({ original, derivative }) => ({
        label: derivative,
        value: new NFTPost(original, derivative),
      })),
    ...Object.values(externalERC721Ledger)
      .filter(({ derivative }) => contractsOwned.includes(derivative))
      .map(({ original, derivative }) => ({
        label: derivative,
        value: new ExternalNFTPost(original, derivative),
      })),
  ]

  return (
    <SelectDropdown<ExternalNFTPost | NFTPost | EmailPost>
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
