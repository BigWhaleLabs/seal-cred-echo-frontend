import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import parseGSNError from 'helpers/parseGSNError'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  noProvider: 'No provider found',
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  unknown: 'An unknown error occurred, please, contact us',
  failedPost: 'Failed to create post',
}

export function parseError(error: unknown, defaultMessage = ErrorList.unknown) {
  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error) displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    const gSNMessage = parseGSNError(message)
    const revertMessage = parseRevertReason(message)
    displayedError = gSNMessage || revertMessage || message
  }
  if (
    displayedError?.includes("can't access property 'error', res2 is undefined")
  )
    displayedError =
      'Relay server is not available due to a large fee cost of transaction (insufficient funds for gas * price + value).\nPlease, try again later.'

  return displayedError ?? defaultMessage
}

export default function (error: unknown) {
  console.error(error)

  toast.error(parseError(error))
}
