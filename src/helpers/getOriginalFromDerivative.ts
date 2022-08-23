import { data } from 'data'
import SealCredStore from 'stores/SealCredStore'

export default async function (derivativeAddress: string) {
  const ledgers = SealCredStore.ledgers

  const typeWithOriginal = {} as {
    ledgerType: string
    original: string
  }
  for (const ledgerType in data) {
    const ledger = await ledgers[ledgerType]
    for await (const { original, derivative } of Object.values(ledger)) {
      if (derivative !== derivativeAddress) continue

      typeWithOriginal.original = original
      typeWithOriginal.ledgerType = ledgerType
    }
  }

  return typeWithOriginal
}
