# VeriTrade
### A Smart-Contract-Based Trading Protocol

VeriTrade is a Web3 trading platform prototype designed to explore transparent, non-custodial digital asset trading through smart contracts. The project focuses on the core components of a decentralized trading experience, including wallet connectivity, order management, portfolio visibility, and on-chain transaction transparency.

The objective is to develop a trading interface where users can interact with blockchain-based financial infrastructure while retaining visibility into the actions performed by the protocol.

## Overview

Traditional trading platforms generally rely on centralized infrastructure to manage orders, maintain internal records, and control settlement. VeriTrade explores an alternative approach in which trading operations can be coordinated through blockchain-based smart contracts.

The current project provides a web-based trading terminal and frontend foundation for further smart contract integration and testing.

## Key Features

- **Trading Terminal:** A dedicated trading interface designed around market information, order entry, and order management.
- **Wallet Connectivity:** A wallet connection interface intended to support compatible EVM wallets.
- **Order Management UI:** Interface components for limit buy and sell orders, open orders, and order history.
- **Portfolio View:** A dedicated interface for viewing wallet and asset-related information.
- **Protocol Explorer:** A transparency-oriented view for examining protocol activity and trading information.
- **Test Token Interface:** A dedicated section for the test-token workflow.
- **Responsive Design:** A dark, terminal-inspired interface designed for desktop use with mobile-friendly layouts.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js with React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Wallet and blockchain integration | wagmi and viem |
| Smart contracts | Solidity — planned integration |
| Contract development and testing | Foundry and OpenZeppelin — intended toolchain |
| Target network | Arbitrum Sepolia testnet — intended deployment environment |

## Architecture

The project is organized around a modular web application structure.

- **Presentation layer:** Trading dashboard, portfolio, wallet, and protocol information views.
- **Wallet integration layer:** Wallet connection and EVM network interaction using the wagmi and viem ecosystem.
- **Smart contract layer:** Intended to support order validation, order lifecycle management, escrow, and trade settlement.
- **Blockchain interaction layer:** Intended to connect the frontend to deployed contracts and expose verifiable protocol activity.

The smart contract and blockchain layers require deployment and end-to-end validation before the complete on-chain trading workflow can be considered operational.

## Current Implementation Status

The repository currently contains the frontend application and its development foundation.

| Component | Status |
|---|---|
| Web application and trading interface | Implemented |
| Trade dashboard route | Implemented |
| Portfolio and protocol-related views | Frontend foundation |
| Wallet connection | Integration requires validation |
| Live on-chain order book | Implemented |
| Smart contract deployment | Implemented |
| On-chain matching and settlement | Implemented |
| End-to-end testnet trading | Implemented |

Some dashboard data may be illustrative rather than retrieved from a live blockchain. The project should therefore be treated as a prototype, not as a production-ready exchange.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/MRS-modi/veritrade.git
cd veritrade
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
copy .env.example .env.local
```

On macOS or Linux, use:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Configuration

Configure the following variables in `.env.local` when the corresponding integrations are available:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL=

NEXT_PUBLIC_ORDERBOOK_ADDRESS=
NEXT_PUBLIC_TEST_USDC_ADDRESS=
NEXT_PUBLIC_TEST_USDC_FAUCET_ADDRESS=
```

Leave values empty until valid project credentials, RPC endpoints, and deployed contract addresses are available. Never commit private keys, seed phrases, or other secrets to the repository.

## Development Roadmap

1. Complete and validate EVM wallet connectivity.
2. Develop and test the order-book smart contracts.
3. Implement order placement, cancellation, and asset escrow.
4. Add price-time priority matching and atomic settlement.
5. Deploy contracts to a testnet and connect the frontend.
6. Verify transaction events, order history, and test-token flows.
7. Add automated tests and security checks before any broader deployment.

## Security Considerations

VeriTrade is an experimental project. It has not been established as a production-ready financial application, and smart contract security has not yet been independently audited.

Testing should use testnet assets only. Any future deployment involving real assets would require comprehensive testing, access-control review, threat modelling, and an independent smart contract audit.

## Project Information

- **Project:** VeriTrade
- **Category:** Web3 / Decentralized Finance
- **Application type:** Web-based trading terminal prototype
- **Repository:** [MRS-modi/veritrade](https://github.com/MRS-modi/veritrade)

## License

A license has not yet been specified. Until one is added to the repository, reuse and redistribution are subject to the applicable copyright terms.
