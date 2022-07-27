export default function (element?: HTMLAnchorElement, position?: number) {
  if (!element) return

  const makeTweetPulse = () => {
    element.classList.toggle('animate-pulse')
    setTimeout(() => element.classList.toggle('animate-pulse'), 3000)
    return
  }
  if (!position) makeTweetPulse()

  const timer = setInterval(() => {
    if (
      position &&
      (position >= window.pageYOffset || document.documentElement.scrollTop)
    ) {
      clearInterval(timer)
      makeTweetPulse()
    }
  }, 25)
}
