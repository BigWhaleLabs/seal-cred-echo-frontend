import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames =
  | 'no-scrollbar'
  | 'loading-pause'
  | 'blockchainPosts'
  | 'dots-loading'
  | 'stroke-text-secondary'
  | 'textBreakWords'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
