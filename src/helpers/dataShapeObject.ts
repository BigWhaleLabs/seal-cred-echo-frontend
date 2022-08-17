import data from 'data'

type ValueOf<T> = T[keyof T]
type DataKey = keyof typeof data

export default function <V>(
  transformer: (key: DataKey, record: ValueOf<typeof data>) => V
) {
  const keys = Object.keys(data) as DataKey[]

  return keys.reduce(
    (res, key) => ({ ...res, [key]: transformer(key, data[key]) }),
    {} as {
      [key: string]: V
    }
  )
}
