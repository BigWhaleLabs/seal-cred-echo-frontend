import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'
import ERC721Post from 'helpers/posts/ERC721Post'
import EmailPost from 'helpers/posts/EmailPost'
import PostStore from 'stores/PostStore'
import SealCredStore from 'stores/SealCredStore'
import SelectDropdown from 'components/SelectDropdown'
import useContractsOwned from 'hooks/useContractsOwned'

function SelectedValue({ value }: { value?: ERC721Post | EmailPost }) {
  return (
    <>
      {value ? (
        value instanceof ERC721Post ? (
          <ContractSymbol address={value.derivativeContract} />
        ) : value instanceof EmailPost ? (
          value.domain
        ) : (
          ''
        )
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
  if (value instanceof ERC721Post) {
    return <ContractSymbol address={label} />
  }
  return <ContractName clearType address={label} />
}

export function DropDown({ disabled }: { disabled?: boolean }) {
  const { emailLedger, externalERC721Ledger } = useSnapshot(SealCredStore)
  const contractsOwned = useContractsOwned()
  const ownedEmailDerivativeContracts = Object.values(emailLedger).filter(
    ({ derivativeContract }) => contractsOwned.includes(derivativeContract)
  )
  const ownedExternalERC721DerivativeContracts = Object.values(
    externalERC721Ledger
  ).filter(({ derivativeContract }) =>
    contractsOwned.includes(derivativeContract)
  )
  const { currentPost } = useSnapshot(PostStore)

  const options = [
    ...ownedEmailDerivativeContracts.map(({ domain, derivativeContract }) => ({
      label: derivativeContract,
      value: new EmailPost(domain),
    })),
    ...ownedExternalERC721DerivativeContracts.map(
      ({ originalContract, derivativeContract }) => ({
        label: derivativeContract,
        value: new ERC721Post(originalContract, derivativeContract),
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
      onChange={({ value }) => (PostStore.currentPost = value)}
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
