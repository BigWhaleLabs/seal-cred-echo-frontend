export default function (hash?: string) {
  const url = hash || window.location.href
  const regExStore = /store=(\w+|\w+\d+)/
  const regExId = /id=(\d+)/

  const matchStore = url.match(regExStore)
  const matchId = url.match(regExId)

  if (!matchStore || !matchId) return {}

  return {
    hashId: matchId[1],
    hashStore: matchStore[1],
  }
}
