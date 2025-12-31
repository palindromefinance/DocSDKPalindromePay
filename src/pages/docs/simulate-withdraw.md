---
title: simulateWithdraw
description: Simulate withdrawal transaction to check for errors
---

```ts
async simulateWithdraw(
  walletClient: WalletClient,
  escrowId: bigint,
  token: Address,
  amount: bigint,
  to: Address
): Promise<SimulateResult>
```

Simulates a withdrawal from an escrow wallet to verify it will succeed.

#### Parameters
- `walletClient: WalletClient` – Authorized signer's wallet
- `escrowId: bigint` – The escrow ID
- `token: Address` – Token address to withdraw
- `amount: bigint` – Amount to withdraw
- `to: Address` – Destination address

#### Returns
`Promise<SimulateResult>` – Simulation result with success status and any errors

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const result = await sdk.simulateWithdraw(
  walletClient,
  42n,
  "0xTokenAddress...",
  1000000n, // 1 USDC (6 decimals)
  "0xDestinationAddress..."
);

if (result.success) {
  console.log("Withdrawal will succeed!");
  const txHash = await sdk.withdraw(
    walletClient,
    42n,
    "0xTokenAddress...",
    1000000n,
    "0xDestinationAddress..."
  );
} else {
  console.error("Would fail:", result.error);
}
```

#### Common Errors Caught
- Insufficient wallet balance
- Caller not authorized (not enough signatures)
- Escrow not in withdrawable state

#### Related Methods
- [`withdraw()`](/docs/withdraw) – Execute the actual withdrawal
- [`getWalletBalance()`](/docs/get-wallet-balance) – Check wallet balance first
