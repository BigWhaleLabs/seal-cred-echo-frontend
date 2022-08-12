import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  unknown: 'An unknown error occurred, please, contact us',
  failedPost: 'Failed to create post',
}

function transformRelayErrorMessage(message: string) {
  // Removes stack trace information
  return message
    .split('stack')
    .filter((_, i) => i % 2 === 0)
    .join('\n')
}

export function parseError(error: unknown, defaultMessage = ErrorList.unknown) {
  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error) displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    displayedError = parseRevertReason(message) ?? message
  }

  if (/^Failed to relay call/.test(message))
    displayedError = transformRelayErrorMessage(message)

  return displayedError ?? defaultMessage
}

export default function (error: unknown) {
  console.error(error)

  toast.error(parseError(error))
}
