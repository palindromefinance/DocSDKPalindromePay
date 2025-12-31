---
title: getCancelRequestStatus
description: Get the cancellation request status for buyer and seller
---

```ts
async getCancelRequestStatus(escrowId: bigint): Promise<CancelRequestStatus>
```

Returns the cancellation request status showing whether buyer and/or seller have requested to cancel.

#### Parameters
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<CancelRequestStatus>` – Status object showing each party's request

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const status = await sdk.getCancelRequestStatus(42n);

console.log(`Buyer requested cancel: ${status.buyerRequested}`);
console.log(`Seller requested cancel: ${status.sellerRequested}`);

if (status.buyerRequested && status.sellerRequested) {
  console.log("Both parties agreed to cancel!");
  console.log(`Timeout expires: ${status.timeoutExpiry}`);

  // Check if timeout has passed
  if (Date.now() > status.timeoutExpiry) {
    console.log("Ready for cancelByTimeout()");
  }
} else if (status.buyerRequested || status.sellerRequested) {
  console.log("Waiting for other party to agree");
}
```

#### CancelRequestStatus Structure
```ts
interface CancelRequestStatus {
  buyerRequested: boolean;
  sellerRequested: boolean;
  timeoutExpiry: number;  // Unix timestamp (ms)
}
```

#### Use Cases
- Display cancellation progress in UI
- Determine if cancelByTimeout can be called
- Show countdown to timeout expiry

#### Related Methods
- [`requestCancel()`](/docs/request-cancel) – Request cancellation
- [`cancelByTimeout()`](/docs/cancel-by-timeout) – Finalize mutual cancellation
