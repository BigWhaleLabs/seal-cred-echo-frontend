import { Suspense } from 'preact/compat'
import { TextareaText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ContractSymbol from 'components/ContractSymbol'
import PostFormStore from 'stores/PostFormStore'
import SelectDropdown from 'components/SelectDropdown'
import classnames, { display, padding } from 'classnames/tailwind'
import useOptions from 'hooks/useOptions'

const postingAs = classnames(
  display('tiny:inline', 'hidden'),
  padding('tiny:pr-1', 'pr-0')
)

type SelectValue = { original: string; derivative: string }

interface DropDownProps {
  disabled?: boolean
}

const SelectedContractName = ({ value }: { value?: SelectValue }) => {
  if (!value) return <>{null}</>

  return <ContractSymbol address={value.derivative} />
}

function SelectedValue({
  disabled,
  value,
}: {
  disabled?: boolean
  value?: SelectValue
}) {
  return (
    <>
      {value ? (
        <TextareaText dark={disabled}>
          <span className={postingAs}>Posting as: </span>
          <SelectedContractName value={value} />
        </TextareaText>
      ) : (
        ''
      )}
    </>
  )
}

function OptionElement({ label }: { label?: string }) {
  if (!label) return <>Not found</>
  return (
    <Suspense fallback={<>Loading...</>}>
      <ContractSymbol address={label} />
    </Suspense>
  )
}

export function DropDown({ disabled }: DropDownProps) {
  const { currentPost } = useSnapshot(PostFormStore)
  const options = useOptions()

  return (
    <SelectDropdown<SelectValue>
      border
      disabled={disabled}
      placeholder="Select badge"
      emptyText="No ZK badge in this wallet"
      current={currentPost}
      options={options}
      SelectedValue={<SelectedValue disabled={disabled} value={currentPost} />}
      OptionElement={OptionElement}
      onChange={({ value }) => (PostFormStore.currentPost = value)}
    />
  )
}

export default function ({ disabled }: DropDownProps) {
  return (
    <Suspense fallback={<SelectDropdown border loading current="" />}>
      <DropDown disabled={disabled} />
    </Suspense>
  )
}
