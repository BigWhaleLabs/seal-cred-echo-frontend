# SealCred | Echo Frontend

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
| `VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS`          | SealCred ERC721 Ledger contract address (defaults to @bwl/constants)          |
| `VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS` | External SealCred ERC721 Ledger contract address (defaults to @bwl/constants) |
| `VITE_SC_EMAIL_POSTS_CONTRACT_ADDRESS`            | SealCred Email posts storage contract (defaults to @bwl/constants)            |
| `VITE_SC_ERC721_POSTS_CONTRACT_ADDRESS`           | SealCred ERC721 posts storage contract (defaults to @bwl/constants)           |
| `VITE_SC_EXTERNAL_ERC721_POSTS_CONTRACT_ADDRESS`  | SealCred External ERC721 posts storage contract (defaults to @bwl/constants)  |
| `VITE_GSN_PAYMASTER_CONTRACT_ADDRESS`             | GSN Paymaster contract address (defaults to @bwl/constants)                   |
| `VITE_GSN_SC_RELAY`                               | Relay URL (defaults to @bwl/constants)                                        |
| `VITE_POSTER_URL`                                 | Url to Poster (defaults to @bwl/constants)                                    |

Also, please, consider looking at `.env.sample`.

## Available Scripts

- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn start` — runs the app in the development mode
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`
- `yarn update` — builds the code and pushes it to git remote
