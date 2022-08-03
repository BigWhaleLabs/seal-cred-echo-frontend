export interface SelectOption<Data> {
  label?: string
  value: Data
}

const twitterAccounts: SelectOption<string>[] = [
  { label: '@SealCredEcho', value: 'SealCredEcho' },
  { label: '@SealCredNFT', value: 'SealCredNFT' },
]

export default twitterAccounts
