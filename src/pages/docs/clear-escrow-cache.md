---
title: clearEscrowCache
description: Clear cache for a specific escrow
---

```ts
clearEscrowCache(escrowId: bigint): void
```

Clears the cached data for a specific escrow. Useful after performing an action that changes escrow state.

#### Parameters
- `escrowId: bigint` – The escrow ID to clear from cache

#### Returns
`void`

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

// Confirm delivery
const txHash = await sdk.confirmDelivery(walletClient, 42n);

// Clear cache for this escrow to get fresh state
sdk.clearEscrowCache(42n);

// Now fetch will return updated state
const status = await sdk.getEscrowStatus(42n);
console.log(`New state: ${status.state}`); // COMPLETE
```

#### Use Cases
- Refresh after state-changing transactions
- Targeted cache invalidation (more efficient than clearAllCaches)
- Ensure UI shows latest state

#### Related Methods
- [`clearAllCaches()`](/docs/clear-all-caches) – Clear all caches
- [`getEscrowStatus()`](/docs/get-escrow-status) – Get cached status
