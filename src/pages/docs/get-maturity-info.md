---
title: getMaturityInfo
description: Get maturity timing information for an escrow
---

```ts
async getMaturityInfo(escrowId: bigint): Promise<MaturityInfo>
```

Returns timing information about the escrow's maturity period, including when auto-release becomes available.

#### Parameters
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<MaturityInfo>` – Maturity timing information

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const info = await sdk.getMaturityInfo(42n);

console.log(`Maturity time: ${new Date(info.maturityTime)}`);
console.log(`Is mature: ${info.isMature}`);
console.log(`Time until mature: ${info.timeUntilMature}ms`);

if (info.isMature) {
  console.log("Escrow is mature - auto-release available");
  // Show auto-release button
} else {
  const hoursLeft = Math.ceil(info.timeUntilMature / 3600000);
  console.log(`${hoursLeft} hours until maturity`);
}
```

#### MaturityInfo Structure
```ts
interface MaturityInfo {
  maturityTime: number;     // Unix timestamp (ms) when escrow matures
  isMature: boolean;        // Whether maturity time has passed
  timeUntilMature: number;  // Milliseconds until mature (0 if already mature)
  gracePeriodEnd: number;   // When grace period ends (for auto-release)
}
```

#### What is Maturity?
- Each escrow has a **maturity time** set at creation
- After maturity + grace period, the seller can call `autoRelease()` if buyer hasn't confirmed
- This protects sellers from unresponsive buyers

#### Use Cases
- Display countdown timers
- Enable/disable auto-release button
- Show escrow timeline

#### Related Methods
- [`autoRelease()`](/docs/auto-release) – Release funds after grace period
- [`confirmDelivery()`](/docs/confirm-delivery) – Buyer confirms before auto-release
