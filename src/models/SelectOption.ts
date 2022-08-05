export interface SelectOption<Data> {
  label?: string
  value: Data
}

const twitterAccounts: SelectOption<string>[] = [
  { label: '@SealCredEmail', value: 'SealCredEmail' },
  { label: '@SealCredNFT', value: 'SealCredNFT' },
]

export default twitterAccounts
