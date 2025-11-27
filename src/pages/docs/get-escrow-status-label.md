---
title: getEscrowStatusLabel
description: Get UI-friendly status label with color and description for any escrow state
---

```ts
getEscrowStatusLabel(state: EscrowState): EscrowStatusLabel
```

Converts the numeric `EscrowState` into a **beautiful, ready-to-use object** with:
- Human-readable label
- Tailwind color class
- Helpful description

Perfect for badges, tags, status pills, or dashboards.

#### Parameters
- `state: EscrowState` – The current state from contract or parsed escrow

#### Returns
`EscrowStatusLabel` object

```ts
interface EscrowStatusLabel {
  label: string;        // e.g. "Awaiting Payment"
  color: string;        // Tailwind color: "orange", "blue", "red", etc.
  description: string;  // Short explanation
}
```

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromecryptoescrow/sdk';

const { sdk } = await connectAndInitSDK();

const escrow = await sdk.getEscrowByIdParsed(42n);
const status = sdk.getEscrowStatusLabel(escrow.state);

console.log("Status:", status);
// Example output:
// { label: "Awaiting Delivery", color: "blue", description: "Seller should deliver product/service" }

// Use in React:
<div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${status.color}-100 text-${status.color}-800`}>
  {status.label}
</div>
```

#### All States & Colors

| State                    | Label                  | Color   | Description                                    |
|--------------------------|------------------------|---------|------------------------------------------------|
| `AWAITING_PAYMENT`       | Awaiting Payment       | orange  | Buyer needs to deposit funds                   |
| `AWAITING_DELIVERY`      | Awaiting Delivery      | blue    | Seller should deliver product/service          |
| `DISPUTED`               | Disputed               | red     | Dispute in progress — arbiter will resolve     |
| `COMPLETE`               | Complete               | green   | Transaction completed successfully             |
| `REFUNDED`               | Refunded               | gray    | Funds returned to buyer                        |
| `CANCELED`               | Canceled               | gray    | Escrow was canceled                            |
| `WITHDRAWN`              | Withdrawn              | gray    | Funds have been claimed                        |

#### Example Badge Component

```tsx
<StatusBadge state={escrow.state} />

function StatusBadge({ state }: { state: EscrowState }) {
  const s = sdk.getEscrowStatusLabel(state);
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${s.color}-100 text-${s.color}-800`}>
      {s.label}
    </span>
  );
}
```

**See also** → [`getEscrowByIdParsed()`](/docs/get-escrow-by-id-parsed) · [`getMaturityInfo()`](/docs/get-maturity-info)
