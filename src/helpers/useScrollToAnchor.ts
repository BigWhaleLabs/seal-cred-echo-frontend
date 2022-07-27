import { useEffect } from 'preact/hooks'
import FlashingTweetCallback from 'models/FlashingTweetCallback'

export const getHashElement = () =>
  window.location.hash
    ? document.querySelector<HTMLAnchorElement>(
        `a[href="${window.location.hash}"]`
      ) ?? undefined
    : undefined

export const scrollToHashElement = (
  offset = 0,
  callback?: FlashingTweetCallback
) => {
  const elementToScroll = getHashElement()
  if (!elementToScroll) return

  const bodyRect = document.body.getBoundingClientRect(),
    elemRect = elementToScroll.getBoundingClientRect(),
    offsetTop = elemRect.top - bodyRect.top,
    position = offsetTop - window.innerHeight / 2 - offset

  window.scrollTo({
    top: position,
    behavior: 'smooth',
  })

  if (callback) callback(elementToScroll, position)
}

export default function useScrollToAnchor(
  offset = 0,
  trigger = true,
  callback?: FlashingTweetCallback
) {
  useEffect(() => {
    scrollToHashElement(offset, callback)
    const listener = () =>
      trigger ? scrollToHashElement(offset, callback) : undefined
    window.addEventListener('hashchange', listener)
    return () => window.removeEventListener('hashchange', listener)
  }, [offset, trigger, callback])
}
