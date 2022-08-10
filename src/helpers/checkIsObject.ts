export default function <Data>(value: Data) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
