import { MutableRef, useEffect, useState } from 'preact/hooks'

export default function useOnScreen<T extends Element>(
  ref: MutableRef<T | null>,
  rootMargin = '0px'
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    const current = ref.current
    if (current) {
      observer.observe(current)
      return () => {
        observer.unobserve(current)
      }
    }
  }, [ref, rootMargin])
  return isIntersecting
}
