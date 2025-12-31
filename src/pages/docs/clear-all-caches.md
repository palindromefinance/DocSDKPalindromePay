---
title: clearAllCaches
description: Clear all SDK internal caches
---

```ts
clearAllCaches(): void
```

Clears all internal caches in the SDK. Use when you need fresh data from the blockchain.

#### Parameters
None

#### Returns
`void`

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Clear all caches
sdk.clearAllCaches();

console.log("All caches cleared");

// Next calls will fetch fresh data
const freshStatus = await sdk.getEscrowStatus(42n);
```

#### Use Cases
- Force refresh after known state changes
- Debug stale data issues
- Reset SDK state

#### Related Methods
- [`clearEscrowCache()`](/docs/clear-escrow-cache) – Clear cache for specific escrow only
- [`getCacheStats()`](/docs/get-cache-stats) – View cache statistics before/after clearing
