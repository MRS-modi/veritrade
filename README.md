# VeriTrade — web trading terminal prototype

A responsive Next.js website for VeriTrade, an onchain P2P limit-order marketplace. The public landing page at `/` introduces the protocol; `/trade` opens the trading terminal with a two-dimensional chart, order book, limit-order form, wallet menu, portfolio view, protocol explorer, and testnet faucet guidance.

## Run locally

1. Install Node.js 20.9+.
2. Open this folder in VS Code / terminal.
3. Copy `.env.example` to `.env.local`.
4. (Optional) Add a WalletConnect Cloud project ID to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open http://localhost:3000 for the landing page, then choose **Launch terminal** (or open http://localhost:3000/trade).

## Important current limits

- Wallet connection uses wagmi and targets **Arbitrum Sepolia**. MetaMask / injected EVM wallet connection can be tested when you run the project. WalletConnect is shown when a project ID is provided.
- The market chart, order book, recent order rows, and event stream use labelled illustrative sample data. They are not connected to a production market feed or smart contract.
- Order submit deliberately does **not** send a transaction. Configure and review a deployed `OrderBook.sol`, token addresses, ABI, and transaction calls before enabling it. The UI warns that no transaction was sent.
- TEST-USDC balances and faucet calls are not implemented until token and faucet contract addresses are provided.
- No private keys, seed phrases, or signing credentials should ever be stored in this site.

## Suggested next integration steps

1. Finalize order/escrow/matching semantics and security model for `OrderBook.sol`.
2. Deploy and verify the contract and ERC-20 test token on Arbitrum Sepolia.
3. Add contract ABI/address configuration and read hooks for book depth, open orders, balances, and emitted events.
4. Add reviewed write hooks for order placement, cancellation, and settlement with allowance / escrow handling.
5. Add tests with Foundry (including partial fills, cancel/replay edge cases, token transfer failures, and reentrancy assumptions) before enabling any real transaction flow.

## Visual direction

- Obsidian background `#0A0B0E`, dark-slate surfaces, green buy/positive states, red sell/negative states, indigo primary actions.
- Motion is limited to small UI transitions and a short toast/popover entrance. No 3D scene or heavy animation.
=======
# veritrade
A fully onchain limit-order-book trading platform built for Web3. Features native smart contract order matching, atomic settlement, and complete transparency without centralized offchain infrastructure.
>>>>>>> 00f0ee44eebaa24b89b544defe24f9c47232bd7d
