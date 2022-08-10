import { Suspense } from 'preact/compat'
import { TextareaText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractName from 'components/ContractName'
import ContractSymbol from 'components/ContractSymbol'

import PostFormStore from 'stores/PostFormStore'
import SelectDropdown from 'components/SelectDropdown'
import classnames, { display, padding } from 'classnames/tailwind'

// Should infer from data.names
type SelectValueType = 'Email' | 'EternalERC721' | 'ERC721'

const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)

const SelectedContractName = ({ value }: { value?: SelectValueType }) => {
  if (!value) return <>{null}</>

  return (
    <>
      {value === 'Email' ? (
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
      {value === 'Email' ? (
        <ContractName clearType address={label} />
      ) : (
        <ContractSymbol address={label} />
      )}
    </Suspense>
  )
}

export function DropDown({ disabled }: { disabled?: boolean }) {
  const { currentPost } = useSnapshot(PostFormStore)
  const options = useOptions()

  return (
    <SelectDropdown<SelectValueType>
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
