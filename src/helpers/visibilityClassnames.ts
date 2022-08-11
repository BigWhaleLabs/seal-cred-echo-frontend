import { display } from 'classnames/tailwind'

export const displayOnMdAndLarger = display('hidden', 'md:flex')
export const displayOnSmAndSmaller = display('flex', 'md:hidden')
