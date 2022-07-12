# SealCred Work Frontend

## Local Launch

1. Install dependencies with `yarn`
2. Add `.env` into your project root with proper variables
3. Run the server with `yarn start`

## Environment variables

| Name               | Description                                 |
| ------------------ | ------------------------------------------- |
| `VITE_APP_NAME`    | App name which is displayed in some wallets |
| `VITE_ENCRYPT_KEY` | Secret key to encrypt the local storage     |
| `VITE_VERIFY_URL`  | Proof verification URL                      |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
- `yarn update` — builds the code and pushes it to git remote
