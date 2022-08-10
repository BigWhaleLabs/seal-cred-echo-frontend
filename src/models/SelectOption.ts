import data from 'helpers/data'

export interface SelectOption<Data> {
  label?: string
  value: Data
}

const ledgerNames = Object.keys(data)

const twitterAccounts: SelectOption<string>[] = ledgerNames.map((name) => {
  return { label: `@SealCred${name}`, value: `SealCred${name}` }
})

export default twitterAccounts
