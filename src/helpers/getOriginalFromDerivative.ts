import SealCredStore from 'stores/SealCredStore'
import data from 'data'

export default async function (derivativeAddress: string) {
  const ledgers = await SealCredStore.ledgers

  const typeWithOriginal = {} as {
    ledgerType: string
    original: string
  }
  for (const ledgerType in data) {
    const ledger = await ledgers[ledgerType]
    Object.entries(ledger).find(([original, derivative]) => {
      if (derivativeAddress === derivative.address) {
        typeWithOriginal.original = original
        typeWithOriginal.ledgerType = ledgerType
      }
    })
    if (Object.values(typeWithOriginal).length > 0) continue
  }

  return typeWithOriginal
}
