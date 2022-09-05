/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(0.5rem)' },
          '50%': { transform: 'translateX(0rem)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-horizontal': 'pulse-horizontal 2s ease-in-out infinite',
        rotate: 'rotate linear 3.5s infinite',
      },
      inset: {
        '-8': '-2rem',
      },
      colors: {
        black: {
          background: 'var(--black-background)',
          'background-purpose': 'var(--background-purpose)',
          'perk-gradient-light': 'var(--perk-gradient-light)',
          'perk-gradient-dark': 'var(--perk-gradient-dark)',
        },
        accent: 'var(--accent)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        'formal-accent': 'var(--formal-accent)',
        'formal-accent-dimmed': 'var(--formal-accent-dimmed)',
        'light-grey': 'var(--light-grey)',
        'half-grey': 'var(--half-grey)',

        error: 'var(--error)',
        'error-dark': 'var(--error-dark)',

        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'primary-dimmed': 'var(--primary-dimmed)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
        'primary-background': 'var(--primary-background)',
        'primary-dark-red': 'var(--primary-dark-red)',

        'accent-light-transparent': 'var(--accent-light-transparent)',
        'accent-light-active-transparent':
          'var(--accent-light-active-transparent)',
        'secondary-light-transparent': 'var(--secondary-light-transparent)',
        'secondary-light-active-transparent':
          'var(--secondary-light-active-transparent)',

        'accent-semi-transparent': 'var(--accent-semi-transparent)',
        'primary-semi-transparent': 'var(--primary-semi-transparent)',
        'secondary-semi-transparent': 'var(--secondary-semi-transparent)',
        'tertiary-semi-transparent': 'var(--tertiary-semi-transparent)',
        'formal-accent-semi-transparent':
          'var(--formal-accent-semi-transparent)',
        'error-semi-transparent': 'var(--error-semi-transparent)',
      },
      strokeWidth: { 1.5: '1.5' },
      borderRadius: {
        avatar: '6rem',
      },
      height: {
        'noisy-rectangle': '0.688rem',
      },
      minHeight: {
        'text-input': '9rem',
        'tab-content': '17.5rem',
      },
      dropShadow: {
        secondary: '0rem 0rem 0.625rem var(--secondary)',
      },
      width: {
        body: '35rem',
      },
      maxWidth: {
        'processing-content': '28rem',
        alert: '33rem',
      },
      maxHeight: {
        alert: '24rem',
      },
      lineHeight: {
        3: '0.875rem',
        5: '1.125rem',
        6: '1.313rem',
        7: '1.438rem',
        8: '1.938rem',
        11: '3.188rem',
      },
      screens: {
        xxs: '17.5rem',
        xs: '22.5rem',
        sm: '28.125rem',
        md: '37.5rem',
        body: '41rem',
      },
      padding: {
        25: '6.25rem',
      },
      boxShadow: {
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
