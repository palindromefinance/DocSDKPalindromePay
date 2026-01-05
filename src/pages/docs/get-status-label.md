---
title: getStatusLabel
description: Get a human-readable status label for an escrow state
---

```ts
getStatusLabel(state: EscrowState): string
```

Converts an escrow state enum value to a human-readable string label for display in UI.

#### Parameters
- `state: EscrowState` – The escrow state enum value

#### Returns
`string` – Human-readable status label

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromepay/sdk';

const { sdk } = await connectAndInitSDK();

// Get escrow data
const escrow = await sdk.getEscrowByIdParsed(42n);

// Get readable label
const label = sdk.getStatusLabel(escrow.state);
console.log(`Status: ${label}`);
// Output: "Awaiting Payment" or "Awaiting Delivery" etc.
```

#### State Labels

| EscrowState | Label |
|-------------|-------|
| `AWAITING_PAYMENT` | "Awaiting Payment" |
| `AWAITING_DELIVERY` | "Awaiting Delivery" |
| `DISPUTED` | "Disputed" |
| `COMPLETE` | "Complete" |
| `REFUNDED` | "Refunded" |
| `CANCELED` | "Canceled" |

#### Use Cases
- Display escrow status in UI badges
- Status notifications
- Transaction history display
