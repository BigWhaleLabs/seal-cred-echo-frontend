import { utils } from 'ethers'
import SCTwitterLedgerContract from 'helpers/SCTwitterLedgerContract'

const transferEventInterface = new utils.Interface([
  'event TweetSaved(uint256 id, string tweet, address indexed derivativeAddress)',
])

export default async function () {
  const eventsFilter = SCTwitterLedgerContract.filters.TweetSaved()
  const events = await SCTwitterLedgerContract.queryFilter(eventsFilter)
  const result = []

  for (const event of events) {
    const {
      args: { id, tweet, derivativeAddress },
    } = transferEventInterface.parseLog(event)
    const block = await event.getBlock()
    result.push({
      id: id.toNumber(),
      tweet,
      derivativeAddress,
      updatedAt: block.timestamp,
    })
  }

  return result.reverse()
}
