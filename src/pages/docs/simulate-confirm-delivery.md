---
title: simulateConfirmDelivery
description: Simulate confirm delivery transaction to check for errors
---

```ts
async simulateConfirmDelivery(
  walletClient: WalletClient,
  escrowId: bigint
): Promise<SimulateResult>
```

Simulates a confirm delivery transaction to verify it will succeed before executing.

#### Parameters
- `walletClient: WalletClient` – Buyer's connected wallet
- `escrowId: bigint` – The escrow ID to confirm

#### Returns
`Promise<SimulateResult>` – Simulation result with success status and any errors

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

// Simulate first
const result = await sdk.simulateConfirmDelivery(walletClient, 42n);

if (result.success) {
  console.log("Confirm delivery will succeed!");
  const txHash = await sdk.confirmDelivery(walletClient, 42n);
} else {
  console.error("Would fail:", result.error);

  if (result.error.includes("not buyer")) {
    alert("Only the buyer can confirm delivery");
  } else if (result.error.includes("invalid state")) {
    alert("Escrow is not awaiting delivery");
  }
}
```

#### Common Errors Caught
- Caller is not the buyer
- Escrow not in AWAITING_DELIVERY state
- Escrow is in disputed state

#### Related Methods
- [`confirmDelivery()`](/docs/confirm-delivery) – Execute the actual confirmation
- [`confirmDeliverySigned()`](/docs/confirm-delivery-signed) – Gasless meta-transaction version
