# SealCred | echo Frontend

## Local Launch

1. Install dependencies with `yarn`
2. Add `.env` into your project root with proper variables
3. Run the server with `yarn start`

## Environment variables

| Name                                              | Description                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `VITE_ENCRYPT_KEY`                                | Secret key to encrypt local storage                                           |
| `VITE_APP_NAME`                                   | App name which is displayed in some wallets                                   |
| `VITE_ETH_NETWORK`                                | Eth network for your providers and contract (defaults to @bwl/constants)      |
| `VITE_ETH_RPC`                                    | Ethereum node RPC URI (defaults to @bwl/constants)                            |
| `VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS`           | SealCred Email Ledger contract address (defaults to @bwl/constants)           |
| `VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS` | External SealCred ERC721 Ledger contract address (defaults to @bwl/constants) |
| `VITE_SC_EXTERNAL_ERC721_POST_STORAGE_CONTRACT`   | SealCred External-posts storage contract                                      |
| `VITE_SC_EMAIL_POST_STORAGE_CONTRACT`             | SealCred Email-posts storage contract                                         |
| `VITE_PAYMASTER_CONTRACT`                         | Paymaster contract                                                            |
| `VITE_TWITTER_POSTER_URL`                         | Url to Twitter Poster                                                         |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
- `yarn update` — builds the code and pushes it to git remote
