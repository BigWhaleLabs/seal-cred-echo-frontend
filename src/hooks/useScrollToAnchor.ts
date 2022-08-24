import { useEffect } from 'preact/hooks'

interface ScrollToAnchorProps {
  offset?: number
  trigger?: boolean
  elementData?: string
  callback?: FlashingCallback
}

type FlashingCallback = (
  elementToScroll?: HTMLAnchorElement,
  elementPosition?: number
) => void

export const getHashElement = (elementData?: string) =>
  elementData
    ? document.querySelector<HTMLAnchorElement>(
        `div[data-anchor="${elementData}"]`
      ) ?? undefined
    : undefined

export const scrollToHashElement = (
  offset = 0,
  elementData?: string,
  callback?: FlashingCallback
) => {
  const elementToScroll = getHashElement(elementData)
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
  elementData,
  callback,
}: ScrollToAnchorProps) {
  useEffect(() => {
    scrollToHashElement(offset, elementData, callback)
    const listener = () =>
      trigger ? scrollToHashElement(offset, elementData, callback) : undefined
    window.addEventListener('hashchange', listener)
    return () => window.removeEventListener('hashchange', listener)
  }, [offset, trigger, elementData, callback])
}
