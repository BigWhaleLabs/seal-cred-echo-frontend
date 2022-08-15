import SealCredStore from 'stores/SealCredStore'
import data from 'data'

export default async function (derivativeAddress: string) {
  const ledgers = await SealCredStore.ledgers

  let type = '' as string
  let originalAddress = '' as string
  for (const key in data) {
    const ledger = await ledgers[key]
    Object.entries(ledger).find(([original, derivative]) => {
      if (derivativeAddress === derivative.address) {
        originalAddress = original
        type = key
      }
    })
  }

  return { type, originalAddress }
}
