export default function () {
  const url = window.location.href
  const regExStore = /store=(\w+|\w+\d+)/
  const regExId = /id=(\d+)/

  const matchStore = url.match(regExStore)
  const matchId = url.match(regExId)

  const object: { hashStore?: string; hashId?: string } = {}
  if (matchStore) object.hashStore = matchStore[1]
  if (matchId) object.hashId = matchId[1]

  return object
}
