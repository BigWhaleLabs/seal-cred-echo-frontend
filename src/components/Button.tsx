import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth,
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
  type?: ButtonType,
  center?: boolean,
  available?: boolean,
  small?: boolean,
  fullWidthOnMobile?: boolean
) => {
  const notDefaultType = type !== 'default'

  return classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent(center ? 'justify-center' : undefined),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor({ 'cursor-not-allowed': !available }),
    outlineStyle('focus:outline-none'),
    opacity({ 'opacity-50': !available }),
    boxShadow({
      'shadow-2xl': available && notDefaultType,
      'hover:shadow-lg': available && notDefaultType,
      'active:shadow-button-active': available && notDefaultType,
    }),
    width('md:w-fit', { 'w-full': fullWidthOnMobile }),
    textAlign(center ? 'text-center' : undefined),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    notDefaultType
      ? padding(
          small
            ? { 'py-2': true, 'px-4': true }
            : { 'py-4': true, 'px-6': true }
        )
      : undefined,
    space('space-x-2')
  )
}

const button = ({
  center,
  type,
  available,
  small,
  fullWidthOnMobile,
}: ButtonProps & { available?: boolean }) =>
  classnames(
    commonClasses(type, center, available, small, fullWidthOnMobile),
    colorClasses(available, type)
  )

const colorClasses = (available?: boolean, type?: ButtonType) =>
  classnames(
    type === 'primary'
      ? classnames(
          textColor('text-primary-dark'),
          borderRadius('rounded-full'),
          backgroundColor('bg-tertiary'),
          boxShadowColor(
            'shadow-tertiary',
            'hover:shadow-tertiary',
            'active:shadow-tertiary'
          ),
          boxShadow({ 'shadow-button': available }),
          brightness({
            'hover:brightness-95': available,
            'active:brightness-90': available,
          })
        )
      : type === 'secondary'
      ? classnames(
          borderWidth('border'),
          borderRadius('rounded-full'),
          borderColor('border-secondary', 'hover:border-secondary'),
          backgroundImage('bg-gradient-to-r'),
          textColor('text-secondary'),
          gradientColorStops({
            'hover:from-accent-light-transparent': available,
            'hover:to-secondary-light-transparent': available,
            'active:from-accent-light-active-transparent': available,
            'active:to-secondary-light-active-transparent': available,
          })
        )
      : backgroundColor('bg-transparent')
  )

const textGradient = (available?: boolean) =>
  classnames(
    textColor({
      'text-transparent': true,
      'active:text-accent': available,
    }),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )

interface ButtonProps {
  type?: ButtonType
  center?: boolean
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  gradientFont?: boolean
  loadingOverflow?: boolean
  fullWidthOnMobile?: boolean
}
type ButtonType = 'primary' | 'secondary' | 'default'

export default function ({
  type = 'default',
  center,
  small,
  withArrow,
  loading,
  disabled,
  children,
  gradientFont,
  loadingOverflow,
  fullWidthOnMobile,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const available = !loading && !disabled

  return (
    <button
      className={button({
        type,
        center,
        available,
        small,
        fullWidthOnMobile,
      })}
      disabled={!available}
      {...rest}
    >
      {loading && <Spinner small={small} />}
      {showContent && (
        <>
          {typeof children === 'string' && gradientFont ? (
            <span className={textGradient(available)}>{children}</span>
          ) : (
            <div>{children}</div>
          )}
          {withArrow && (
            <div className={width('w-4')}>
              <Arrow horizontal />
            </div>
          )}
        </>
      )}
    </button>
  )
}
