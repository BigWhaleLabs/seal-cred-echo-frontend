import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames = 'no-scrollbar' | 'loading-pause' | 'bgCover'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
