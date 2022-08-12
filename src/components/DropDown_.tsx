// import { Suspense } from 'preact/compat'
// import { TextareaText } from 'components/Text'
// import { useSnapshot } from 'valtio'
// import ContractName from 'components/ContractName'
// import ContractSymbol from 'components/ContractSymbol'
// import ERC721Post from 'helpers/posts/ERC721Post'
// import EmailPost from 'helpers/posts/EmailPost'
// import ExternalERC721Post from 'helpers/posts/ExternalERC721Post'
// import PostFormStore from 'stores/PostFormStore'
// import SelectDropdown from 'components/Dropdown'
// import classnames, { display, padding } from 'classnames/tailwind'
// import useOptions from 'hooks/useOptions'

// type SelectValueType = EmailPost | ExternalERC721Post | ERC721Post

// const postingAs = classnames(
//   display('xs:inline', 'hidden'),
//   padding('xs:pr-1', 'pr-0')
// )

// const SelectedContractName = ({ value }: { value?: SelectValueType }) => {
//   if (!value) return <>{null}</>

//   return (
//     <>
//       {value instanceof EmailPost ? (
//         <>@{value.original}</>
//       ) : (
//         <ContractSymbol address={value.derivative} />
//       )}
//     </>
//   )
// }

// function SelectedValue({
//   disabled,
//   value,
// }: {
//   disabled?: boolean
//   value?: SelectValueType
// }) {
//   return (
//     <>
//       {value ? (
//         <TextareaText dark={disabled}>
//           <span className={postingAs}>Posting as: </span>
//           <SelectedContractName value={value} />
//         </TextareaText>
//       ) : (
//         ''
//       )}
//     </>
//   )
// }

// function OptionElement({
//   value,
//   label,
// }: {
//   value?: SelectValueType
//   label?: string
// }) {
//   if (!label) return <>Not found</>
//   return (
//     <Suspense fallback={<>Loading...</>}>
//       {value instanceof EmailPost ? (
//         <ContractName clearType address={label} />
//       ) : (
//         <ContractSymbol address={label} />
//       )}
//     </Suspense>
//   )
// }

// export function DropDown({ disabled }: { disabled?: boolean }) {
//   const { currentPost } = useSnapshot(PostFormStore)
//   const options = useOptions()

//   return (
//     <SelectDropdown<SelectValueType>
//       border
//       disabled={disabled}
//       placeholder="Select badge"
//       emptyText="No ZK badge in this wallet"
//       current={currentPost}
//       options={options}
//       selectedValue={<SelectedValue disabled={disabled} value={currentPost} />}
//       OptionElement={OptionElement}
//       onChange={({ value }) => (PostFormStore.currentPost = value)}
//     />
//   )
// }

// export default function ({ disabled }: { disabled?: boolean }) {
//   return (
//     <Suspense fallback={<SelectDropdown border loading current="" />}>
//       <DropDown disabled={disabled} />
//     </Suspense>
//   )
// }
export default false
