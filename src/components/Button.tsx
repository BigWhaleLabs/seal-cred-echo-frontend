import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  boxShadowColor,
  brightness,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  justifyContent,
  lineHeight,
  opacity,
  outlineStyle,
  padding,
  space,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Arrow from 'icons/Arrow'
import React from 'react'
import Spinner from 'icons/Spinner'

const commonClasses = (
  primary?: boolean,
  fullWidth?: boolean,
  center?: boolean,
  unavaliable?: boolean,
  small?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent(center ? 'justify-center' : undefined),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor({ 'cursor-not-allowed': unavaliable }),
    outlineStyle('focus:outline-none'),
    opacity({ 'opacity-50': unavaliable }),
    boxShadow('shadow-2xl', 'hover:shadow-lg', 'active:shadow-md'),
    width(fullWidth ? 'w-full' : 'w-fit'),
    textAlign(center ? 'text-center' : undefined),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    primary
      ? padding(
          small
            ? { 'py-2': true, 'px-4': true }
            : { 'py-4': true, 'px-6': true }
        )
      : undefined,
    space('space-x-2')
  )

const button = ({
  fullWidth,
  center,
  primary,
  unavaliable,
  small,
}: ButtonProps & { unavaliable?: boolean }) =>
  classnames(
    commonClasses(primary, fullWidth, center, unavaliable, small),
    colorClasses(unavaliable, primary)
  )

const colorClasses = (unavaliable?: boolean, primary?: boolean) =>
  classnames(
    primary
      ? classnames(
          textColor('text-primary-dark'),
          borderRadius('rounded-full'),
          backgroundColor('bg-tertiary'),
          boxShadowColor(
            'shadow-tertiary',
            'hover:shadow-tertiary',
            'active:shadow-tertiary'
          ),
          boxShadow('shadow-button'),
          unavaliable
            ? brightness('hover:brightness-75', 'active:brightness-50')
            : undefined
        )
      : backgroundColor('bg-transparent')
  )

const textGradient = (unavaliable?: boolean) =>
  classnames(
    textColor({
      'text-transparent': true,
      'active:text-accent': unavaliable,
    }),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )

interface ButtonProps {
  fullWidth?: boolean
  center?: boolean
  primary?: boolean
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  gradientFont?: boolean
  loadingOverflow?: boolean
}

export default function ({
  primary,
  fullWidth,
  center,
  small,
  withArrow,
  loading,
  disabled,
  children,
  gradientFont,
  loadingOverflow,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const unavaliable = loading || disabled

  return (
    <button
      className={button({
        primary,
        fullWidth,
        center,
        unavaliable,
        small,
      })}
      disabled={unavaliable}
      {...rest}
    >
      {loading && <Spinner small={small} />}
      {showContent && (
        <>
          {typeof children === 'string' && gradientFont ? (
            <span className={textGradient(unavaliable)}>{children}</span>
          ) : (
            <div>{children}</div>
          )}
          {withArrow && (
            <div className={width('w-4')}>
              <Arrow />
            </div>
          )}
        </>
      )}
    </button>
  )
}
