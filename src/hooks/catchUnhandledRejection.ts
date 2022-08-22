import { useEffect } from 'preact/hooks'

export default function catchUnhandledRejection(
  callback?: (e: unknown) => void
) {
  useEffect(() => {
    const listener = (event: PromiseRejectionEvent) => {
      console.error('Catch unhandledrejection:', event.reason.message)
      if (callback) callback(event.reason)
    }

    window.addEventListener('unhandledrejection', listener)
    return () => window.removeEventListener('unhandledrejection', listener)
  }, [callback])
}
