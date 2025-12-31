---
title: getEscrowStatus
description: Get escrow status with caching for performance
---

```ts
async getEscrowStatus(escrowId: bigint): Promise<EscrowStatus>
```

Retrieves the current status of an escrow with built-in caching to reduce RPC calls. Cache is automatically invalidated based on TTL.

#### Parameters
- `escrowId: bigint` – The escrow ID to check

#### Returns
`Promise<EscrowStatus>` – Current escrow status

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// First call fetches from chain
const status1 = await sdk.getEscrowStatus(42n);
console.log(`State: ${status1.state}`);

// Second call within TTL returns cached result (faster!)
const status2 = await sdk.getEscrowStatus(42n);

// Force fresh fetch by clearing cache first
sdk.clearEscrowCache(42n);
const freshStatus = await sdk.getEscrowStatus(42n);
```

#### Use Cases
- Polling for status updates (cache reduces load)
- Display current status in UI
- Check state before performing actions

#### Related Methods
- [`clearEscrowCache()`](/docs/clear-escrow-cache) – Clear cache for specific escrow
- [`clearAllCaches()`](/docs/clear-all-caches) – Clear all cached data
- [`getCacheStats()`](/docs/get-cache-stats) – View cache statistics
