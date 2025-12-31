---
title: simulateTransaction
description: Simulate a transaction before executing to check for errors
---

```ts
async simulateTransaction(params: SimulateParams): Promise<SimulateResult>
```

Simulates a transaction against the current blockchain state to verify it will succeed before actually sending it. Useful for catching errors early and providing better UX.

#### Parameters
- `params: SimulateParams` – Transaction simulation parameters

#### Returns
`Promise<SimulateResult>` – Simulation result with success status and any errors

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

// Simulate before executing
const result = await sdk.simulateTransaction({
  account: walletClient.account,
  to: contractAddress,
  data: encodedFunctionData,
  value: 0n,
});

if (result.success) {
  console.log("Transaction will succeed");
  // Proceed with actual transaction
} else {
  console.error("Transaction would fail:", result.error);
  // Show error to user, don't waste gas
}
```

#### Use Cases
- Pre-flight checks before expensive transactions
- Better error messages for users
- Avoid wasting gas on failed transactions

#### Related Methods
- [`simulateDeposit()`](/docs/simulate-deposit) – Simulate deposit specifically
- [`simulateConfirmDelivery()`](/docs/simulate-confirm-delivery) – Simulate confirm delivery
- [`simulateWithdraw()`](/docs/simulate-withdraw) – Simulate withdrawal
