import { serializeError } from 'eth-rpc-errors'
import { toast } from 'react-toastify'
import parseRevertReason from 'helpers/parseRevertReason'

export const ProofGenerationErrors = {}

export const ErrorList = {
  wrongNetwork: (userNetwork: string, contractNetwork: string) =>
    `Looks like you're using ${userNetwork} network, try switching to ${contractNetwork} and connect again`,
  unknown: 'An unknown error occurred, please, contact us',
  insufficient:
    'Insufficient funds for the gas transaction. Please, try again later.',
  highGasPrice: 'The transaction price is too high. Please, try again later.',
  paymasterRejected:
    'The paymaster couldn\'t run the "relayCall()" method. Please, try again later.',
  clear: '',
}

export const checkErrorMessage = (error: Error) => {
  const readableMessage = error.message.includes('Proposed priority gas fee')
    ? ErrorList.highGasPrice
    : error.message.includes('paymaster rejected in DRY-RUN')
    ? ErrorList.paymasterRejected
    : error.message.includes('insufficient funds for gas * price + value')
    ? ErrorList.insufficient
    : ErrorList.unknown

  return new Error(readableMessage)
}

export function parseError(error: unknown) {
  let displayedError: string | undefined

  if (typeof error === 'string') displayedError = error
  if (error instanceof Error) displayedError = error.message
  const message = serializeError(error).message
  if (message) {
    displayedError = parseRevertReason(message) ?? message
  }
  if (!displayedError) displayedError = ErrorList.unknown

  return displayedError
}

export default function (error: unknown) {
  console.error(error)

  toast.error(parseError(error))
}
