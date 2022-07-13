import { TTailwindString } from 'classnames/tailwind'

type AllowedExtraClassnames = 'no-scrollbar'

export default function (
  ...classNames: (AllowedExtraClassnames | TTailwindString | undefined | null)[]
): string {
  return classNames.filter((s) => !!s).join(' ')
}
