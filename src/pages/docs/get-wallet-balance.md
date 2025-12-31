---
title: getWalletBalance
description: Get the token balance of an escrow wallet
---

```ts
async getWalletBalance(
  escrowId: bigint,
  token: Address
): Promise<bigint>
```

Returns the balance of a specific token held in the escrow wallet.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `token: Address` – Token address to check (use zero address for native token)

#### Returns
`Promise<bigint>` – Token balance in smallest unit

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { formatUnits } from 'viem';

const { sdk } = await connectAndInitSDK();

const balance = await sdk.getWalletBalance(42n, "0xUSDCAddress...");

// Format for display
const decimals = await sdk.getTokenDecimals("0xUSDCAddress...");
const formatted = formatUnits(balance, decimals);

console.log(`Escrow wallet balance: ${formatted} USDC`);
```

#### Use Cases
- Display current escrow balance
- Verify funds before withdrawal
- Check if deposit was received

#### Related Methods
- [`withdraw()`](/docs/withdraw) – Withdraw funds from wallet
- [`getTokenBalance()`](/docs/get-token-balance) – Get balance of any address
- [`predictWalletAddress()`](/docs/predict-wallet-address) – Get the wallet address
