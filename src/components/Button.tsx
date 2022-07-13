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
  loading?: boolean,
  disabled?: boolean,
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
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    outlineStyle('focus:outline-none'),
    opacity(loading || disabled ? 'opacity-50' : undefined),
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
  loading,
  disabled,
  small,
  gradientFont,
}: ButtonProps) =>
  classnames(
    commonClasses(primary, fullWidth, center, loading, disabled, small),
    colorClasses({ primary, loading, disabled, gradientFont })
  )

const colorClasses = ({ primary, loading, disabled }: ButtonProps) =>
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
          brightness(
            loading || disabled ? undefined : 'hover:brightness-75',
            loading || disabled ? undefined : 'active:brightness-50'
          )
        )
      : backgroundColor('bg-transparent')
  )

const textGradient = ({ loading, disabled }: ButtonProps) =>
  classnames(
    textColor(
      'text-transparent',
      loading || disabled ? undefined : 'active:text-accent'
    ),
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

  return (
    <button
      className={button({
        primary,
        fullWidth,
        center,
        loading,
        disabled,
        small,
      })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Spinner small={small} />}
      {showContent && (
        <>
          {typeof children === 'string' && gradientFont ? (
            <span className={textGradient({ loading, disabled })}>
              {children}
            </span>
          ) : (
            <div>{children}</div>
          )}
          {withArrow && (
            <div className={width('w-4')}>
              <Arrow
                horizontal
                pulseDisabled={disabled || loading}
                openDisabled
              />
            </div>
          )}
        </>
      )}
    </button>
  )
}
