/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      colors: {
        black: {
          background: '#040404',
          'background-purpose': '#12141D',
          'perk-gradient-light': 'rgba(4, 6, 14, 0.9)',
          'perk-gradient-dark': '#04060E',
        },
        accent: '#fed823',
        primary: '#15a1fc',
        secondary: '#ff7bed',
        tertiary: '#01feb6',
        'formal-accent': '#efecd6',
        'half-grey': '#505050',

        error: '#FF7B83',
        'error-dark': '#3E1B1E',

        'primary-dark': '#0d0030',
        'primary-light': '#bff5fa',
        'primary-dimmed': '#3a00d6',
        'primary-semi-dimmed': '#4b61d5',
        'primary-background': '#1a0259',
        'primary-dark-red': '#210030',

        'accent-light-transparent': '#FF7BED69',
        'secondary-light-transparent': '#FED82369',
        'accent-light-active-transparent': '#FF7BED9e',
        'secondary-light-active-transparent': '#FED8239e',

        'accent-semi-transparent': 'rgba(254, 216, 35, 0.4)',
        'primary-semi-transparent': 'rgba(21, 161, 252, 0.5)',
        'secondary-semi-transparent': 'rgba(255, 123, 237, 0.5)',
        'tertiary-semi-transparent': 'rgba(1, 254, 182, 0.4)',
        'formal-accent-semi-transparent': 'rgba(239, 236, 214, 0.4)',
        'error-semi-transparent': 'rgba(255, 123, 131, .2)',
      },
      borderRadius: {
        avatar: '6rem',
      },
      minHeight: {
        card: '31.75rem',
      },
      maxHeight: {
        card: '31.75rem',
        'mobile-card': '41rem',
      },
      height: {
        'noisy-rectangle': '0.688rem',
        'mobile-card': '22.813rem',
        card: '31.75rem',
      },
      width: {
        body: '38rem',
        'thin-mobile': '10.75rem',
        'thin-card': '11.688rem',
        card: '40.25rem',
        'mobile-card': '92%',
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
        fold: '17.5rem',
        tiny: '22.5rem',
        sm: '28.125rem',
        md: '37.5rem',
      },
      padding: {
        25: '6.25rem',
      },
      boxShadow: {
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
