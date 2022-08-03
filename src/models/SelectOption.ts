export interface SelectOption<V> {
  label?: string
  value: V
}

const twitterAccounts: SelectOption<string>[] = [
  { label: '@SealCredEcho', value: 'SealCredEcho' },
  { label: '@SealCredNFT', value: 'SealCredNFT' },
]

export default twitterAccounts
