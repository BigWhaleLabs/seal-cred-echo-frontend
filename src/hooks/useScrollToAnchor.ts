import { useEffect } from 'preact/hooks'

interface ScrollToAnchorProps {
  offset?: number
  trigger?: boolean
  anchor?: string
  callback?: FlashingCallback
}

type FlashingCallback = (
  elementToScroll?: HTMLAnchorElement,
  elementPosition?: number
) => void

export const getHashElement = (anchor?: string) =>
  anchor
    ? document.querySelector<HTMLAnchorElement>(
        `div[data-anchor="${anchor}"]`
      ) ?? undefined
    : undefined

export const scrollToHashElement = (
  offset = 0,
  anchor?: string,
  callback?: FlashingCallback
) => {
  const elementToScroll = getHashElement(anchor)
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

export default function useScrollToAnchor({
  offset = 0,
  trigger = true,
  anchor,
  callback,
}: ScrollToAnchorProps) {
  useEffect(() => {
    scrollToHashElement(offset, anchor, callback)
    const listener = () =>
      trigger ? scrollToHashElement(offset, anchor, callback) : undefined
    window.addEventListener('hashchange', listener)
    return () => window.removeEventListener('hashchange', listener)
  }, [offset, trigger, anchor, callback])
}
