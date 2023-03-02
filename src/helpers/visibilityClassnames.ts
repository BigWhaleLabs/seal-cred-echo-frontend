import { display } from 'classnames/tailwind'

export const displayOnMdAndLarger = display('hidden', 'md:flex')
export const displayOnSmAndSmaller = display('flex', 'md:hidden')
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'body'

/**
 * If we put from/to into the classnames, it will break production build.
 * Tailwind will cut unused classnames (classnames not-generated before function execution)
 */

export const displayFrom = (from: Size) => {
  switch (from) {
    case 'xs':
      return display('hidden', 'xs:flex')
    case 'sm':
      return display('hidden', 'sm:flex')
    case 'md':
      return display('hidden', 'md:flex')
    case 'body':
      return display('hidden', 'body:flex')
    case 'lg':
      return display('hidden', 'lg:flex')
  }
}

export const displayTo = (to: Size) => {
  switch (to) {
    case 'xs':
      return display('flex', 'xs:hidden')
    case 'sm':
      return display('flex', 'sm:hidden')
    case 'md':
      return display('flex', 'md:hidden')
    case 'body':
      return display('flex', 'body:hidden')
    case 'lg':
      return display('flex', 'lg:hidden')
  }
}
