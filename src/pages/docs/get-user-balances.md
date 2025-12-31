---
title: getUserBalances
description: Get a user's balances for multiple tokens at once
---

```ts
async getUserBalances(
  userAddress: Address,
  tokens: Address[]
): Promise<Map<Address, bigint>>
```

Batch fetches token balances for a user across multiple tokens in a single call.

#### Parameters
- `userAddress: Address` – The wallet address to check
- `tokens: Address[]` – Array of token addresses

#### Returns
`Promise<Map<Address, bigint>>` – Map of token address to balance

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { formatUnits } from 'viem';

const { sdk } = await connectAndInitSDK();

const tokens = [
  "0xUSDCAddress...",
  "0xUSDTAddress...",
  "0xDAIAddress..."
];

const balances = await sdk.getUserBalances("0xUserAddress...", tokens);

// Display all balances
for (const [token, balance] of balances) {
  const decimals = await sdk.getTokenDecimals(token);
  console.log(`${token}: ${formatUnits(balance, decimals)}`);
}
```

#### Use Cases
- Portfolio display
- Token selection dropdown with balances
- Pre-check balances before escrow creation

#### Related Methods
- [`getTokenBalance()`](/docs/get-token-balance) – Get single token balance
- [`getWalletBalance()`](/docs/get-wallet-balance) – Get escrow wallet balance
