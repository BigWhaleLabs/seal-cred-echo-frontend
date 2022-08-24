export default function () {
  const url = window.location.href
  const regExStore = /store=(\w+|\w+\d+)/
  const regExId = /id=(\d+)/

  const matchStore = url.match(regExStore)
  const matchId = url.match(regExId)

  if (!matchStore || !matchId) return {}

  return {
    hashStore: matchStore[1],
    hashId: matchId[1],
  }
}
