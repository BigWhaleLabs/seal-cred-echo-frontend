function transformRelayErrorMessage(message: string) {
  // Removes stack trace information
  return message.split('stack')[0]
}

function extractMetamaskReason(gSNError: string) {
  const metaMaskMessage = 'MetaMask Message Signature:'
  if (gSNError.includes(metaMaskMessage)) {
    return gSNError.split(metaMaskMessage)[1]?.split(' stack:')[0]
  }
}

export default function (gSNError: string) {
  return extractMetamaskReason(gSNError) || transformRelayErrorMessage(gSNError)
}
