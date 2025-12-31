---
title: simulateDeposit
description: Simulate a deposit transaction to check for errors before executing
---

```ts
async simulateDeposit(
  walletClient: WalletClient,
  escrowId: bigint
): Promise<SimulateResult>
```

Simulates a deposit transaction to verify it will succeed before actually sending it. Checks token allowance, balance, and escrow state.

#### Parameters
- `walletClient: WalletClient` – Buyer's connected wallet
- `escrowId: bigint` – The escrow ID to deposit into

#### Returns
`Promise<SimulateResult>` – Simulation result with success status and any errors

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

// Simulate deposit first
const result = await sdk.simulateDeposit(walletClient, 42n);

if (result.success) {
  console.log("Deposit will succeed!");
  // Now execute the actual deposit
  const txHash = await sdk.deposit(walletClient, 42n);
} else {
  console.error("Deposit would fail:", result.error);

  if (result.error.includes("insufficient allowance")) {
    // Prompt user to approve tokens first
  } else if (result.error.includes("insufficient balance")) {
    // Show insufficient funds error
  }
}
```

#### Common Errors Caught
- Insufficient token balance
- Insufficient token allowance
- Escrow not in AWAITING_PAYMENT state
- Caller is not the buyer

#### Related Methods
- [`deposit()`](/docs/deposit) – Execute the actual deposit
- [`approveTokenIfNeeded()`](/docs/approve-token-if-needed) – Approve tokens before deposit
