import { useEffect } from 'preact/hooks'

export const getHashElement = () =>
  window.location.hash
    ? document.querySelector<HTMLAnchorElement>(
        `a[href="${window.location.hash}"]`
      ) ?? undefined
    : undefined

export const scrollToHashElement = (offset = 0) => {
  const elementToScroll = getHashElement()
  if (!elementToScroll) return

  const bodyRect = document.body.getBoundingClientRect(),
    elemRect = elementToScroll.getBoundingClientRect(),
    offsetTop = elemRect.top - bodyRect.top

  window.scrollTo({
    top: offsetTop - window.innerHeight / 2 - offset,
    behavior: 'smooth',
  })
}

export default function useScrollToAnchor(offset = 0, trigger = true) {
  useEffect(() => {
    scrollToHashElement(offset)
    const listener = () => (trigger ? scrollToHashElement(offset) : undefined)
    window.addEventListener('hashchange', listener)
    return () => window.removeEventListener('hashchange', listener)
  }, [offset, trigger])
}
