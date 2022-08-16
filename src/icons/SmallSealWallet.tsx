import { stroke } from 'classnames/tailwind'

const strokeAccent = stroke('stroke-secondary')
const strokePrimarySemiDimmed = stroke('stroke-primary-semi-dimmed')

export default function ({ connected }: { connected?: boolean }) {
  if (connected)
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0.738281C5.02944 0.738281 1 4.88814 1 10.0072V17.5383C3.33333 18.8382 10.2 20.658 19 17.5383V10.0072C19 4.88814 14.9706 0.738281 10 0.738281Z"
          className={strokeAccent}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.935 7.92459C11.935 6.78812 12.8314 5.86684 13.9372 5.86684C15.043 5.86684 15.9395 6.78812 15.9395 7.92459C15.9395 9.06105 15.043 7.92461 13.9372 7.92461C12.8314 7.92461 11.935 9.06105 11.935 7.92459Z"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M10.0001 11.6735C10.7483 11.6735 11.3549 11.7632 11.3549 10.905C11.3549 10.0467 10.7483 9.35093 10.0001 9.35093C9.25181 9.35093 8.64522 10.0467 8.64522 10.905C8.64522 11.7632 9.25181 11.6735 10.0001 11.6735ZM10.0001 11.6735C10.0001 12.1897 10.0001 13.3381 10.0001 13.8026M10.0001 13.8026C10.0001 15.351 11.9355 15.351 11.9355 13.8026M10.0001 13.8026C10.0001 15.351 8.06458 15.351 8.06458 13.8026"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M4.19282 7.92556C4.19282 6.7891 5.08924 5.86782 6.19504 5.86782C7.30084 5.86782 8.19727 6.7891 8.19727 7.92556C8.19727 9.06202 7.30084 7.92558 6.19504 7.92558C5.08924 7.92558 4.19282 9.06202 4.19282 7.92556Z"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M16.1937 11.6738L13.8711 12.0609"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M13.8708 13.8223L16.1934 14.2094"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M3.80633 11.6738L6.12891 12.0609"
          className={strokeAccent}
          stroke-linecap="round"
        />
        <path
          d="M6.12922 13.8223L3.80664 14.2094"
          className={strokeAccent}
          stroke-linecap="round"
        />
      </svg>
    )

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0.738281C5.02944 0.738281 1 4.88814 1 10.0072V17.5383C3.33333 18.8382 10.2 20.658 19 17.5383V10.0072C19 4.88814 14.9706 0.738281 10 0.738281Z"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0592 7.47677C15.4909 8.46097 14.254 8.81061 13.2963 8.25771C12.3387 7.70481 12.023 6.45874 12.5912 5.47454C13.1594 4.49033 13.3675 5.92273 14.3252 6.47563C15.2828 7.02853 16.6274 6.49256 16.0592 7.47677Z"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M10.0001 11.674C10.7483 11.674 11.3549 11.7637 11.3549 10.9054C11.3549 10.0471 10.7483 9.35139 10.0001 9.35139C9.25181 9.35139 8.64522 10.0471 8.64522 10.9054C8.64522 11.7637 9.25181 11.674 10.0001 11.674ZM10.0001 11.674C10.0001 12.1901 10.0001 13.3385 10.0001 13.803M10.0001 13.803C10.0001 15.3514 12 14 12 15.5M10.0001 13.803C10.0001 15.3514 8 14.1969 8.06458 15.5"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M7.54082 5.47622C8.10905 6.46042 7.79336 7.70649 6.83571 8.25939C5.87806 8.81229 4.64109 8.46265 4.07286 7.47844C3.50463 6.49424 4.84918 7.03021 5.80683 6.47731C6.76448 5.92441 6.97259 4.49202 7.54082 5.47622Z"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M16.1937 11.6738L13.8711 12.0609"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M13.8708 13.8223L16.1934 14.2094"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M3.80633 11.6738L6.12891 12.0609"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
      <path
        d="M6.12922 13.8223L3.80664 14.2094"
        className={strokePrimarySemiDimmed}
        stroke-linecap="round"
      />
    </svg>
  )
}
