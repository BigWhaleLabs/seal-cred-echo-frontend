export default function (element?: HTMLAnchorElement, position?: number) {
  if (!element) return

  const makeTweetPulse = () => {
    element.classList.toggle('animate-pulse')
    setTimeout(() => element.classList.toggle('animate-pulse'), 3000)
    return
  }
  if (!position) makeTweetPulse()

  const observer = new IntersectionObserver(() => makeTweetPulse(), {
    root: element,
    threshold: 1,
  })

  observer.observe(element)
}
