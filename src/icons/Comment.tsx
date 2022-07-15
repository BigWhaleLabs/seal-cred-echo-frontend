import { fill } from 'classnames/tailwind'

const fillColor = fill('fill-light-grey')

export default function () {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.53477 0.681328L6.42377 0.673828H6.42227C3.14177 0.673828 0.572266 3.24408 0.572266 6.52533C0.572266 9.59883 2.96177 11.9298 6.17102 12.0528V14.9238C6.17102 15.0048 6.20402 15.1383 6.26102 15.2261C6.36752 15.3948 6.54902 15.4863 6.73502 15.4863C6.83852 15.4863 6.94277 15.4578 7.03652 15.3978C7.23452 15.2718 11.8913 12.2928 13.1025 11.2683C14.529 10.0608 15.3825 8.29083 15.3848 6.53433V6.52158C15.3803 3.24633 12.8123 0.681328 9.53477 0.680578V0.681328ZM12.375 10.4103C11.5245 11.1303 8.72852 12.9641 7.29602 13.8926V11.5023C7.29602 11.1918 7.04477 10.9398 6.73352 10.9398H6.43652C3.69152 10.9398 1.69802 9.08283 1.69802 6.52533C1.69802 3.87483 3.77402 1.79883 6.42302 1.79883L9.53327 1.80633H9.53477C12.1838 1.80633 14.2598 3.88083 14.2613 6.52833C14.259 7.96083 13.5548 9.41133 12.3758 10.4103H12.375Z"
        className={fillColor}
      />
    </svg>
  )
}