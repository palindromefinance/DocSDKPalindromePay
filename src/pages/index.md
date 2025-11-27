---
title: Getting started
pageTitle: Palindrome - Decentralized Crypto Pay Documentation.
description: Palindrome Finance is a crypto payment system with escrow service focused on secure cryptocurrency transactions, providing solutions that enhance trust and protection in digital payments. Palindrome Finance offers an SDK that can be integrated into e-commerce stores, real estate platforms, and various booking systems, allowing users to add crypto-based escrow payments seamlessly to their existing workflows. This enables businesses to benefit from secure, transparent transactions for a wide range of use cases, including online shopping, property rentals, and hotel booking system.
---

Learn how to get Palindrome Crypto Payment SDK set up. This SDK provides TypeScript utilities for interacting with Palindrome Payment System contracts on BSC (Binance Smart Chain) testnet, querying escrow data via The Graph/Apollo, and handling USDT token operations. It is suitable for full-stack dApps needing escrow service. {% .lead %}

{% quick-links %}

{% quick-link title="Quick Start" icon="installation" href="#quick-start" description="Step-by-step guides to setting up your system and installing the library." /%}


{% /quick-links %}

---

## Quick start

Do you want to start right away? Then install Palindrome Crypto Pay with a command line.

### Installing dependencies

The SDK is written in **TypeScript** and can be imported into React, Vue and Angular application.

```typescript
npm install @palindromecryptoescrow/sdk
```

{% callout title="You should do!" %}
  Create a .env file

```js
REACT_APP_SUBGRAPH_URL=https://api.studio.thegraph.com/query/121986/subgraph-palindrome-finance/version/latest
REACT_APP_CONTRACT_ADDRESS=0xc7563c8a19689a51058764e1654a092d8037d1e5
REACT_APP_ARBITER_ADDRESS=0x7f41718D33B65494f1d675feB50e61a2D7C23fF0
REACT_APP_USDT_TOKEN=0x16ba9f1ee0ffbc4b554ce4c445e73d5da22d0f55
REACT_APP_TARGET_CHAIN_ID=0x61
REACT_APP_CHAIN_NAME=BinanceTestnet
REACT_APP_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
REACT_APP_BLOCK_EXPLORER_URL=https://testnet.bscscan.com
```
{% /callout %}

---

