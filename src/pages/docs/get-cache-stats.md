---
title: getCacheStats
description: Get statistics about the SDK's internal cache
---

```ts
getCacheStats(): CacheStats
```

Returns statistics about the SDK's internal LRU cache, useful for debugging and monitoring.

#### Parameters
None

#### Returns
`CacheStats` – Cache statistics object

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const stats = sdk.getCacheStats();

console.log(`Cache size: ${stats.size}`);
console.log(`Max size: ${stats.maxSize}`);
console.log(`Hit rate: ${(stats.hitRate * 100).toFixed(1)}%`);
console.log(`Hits: ${stats.hits}`);
console.log(`Misses: ${stats.misses}`);
```

#### CacheStats Structure
```ts
interface CacheStats {
  size: number;      // Current number of cached items
  maxSize: number;   // Maximum cache capacity
  hits: number;      // Number of cache hits
  misses: number;    // Number of cache misses
  hitRate: number;   // Hit rate (0-1)
}
```

#### Use Cases
- Monitor cache effectiveness
- Debug performance issues
- Optimize cache settings

#### Related Methods
- [`clearAllCaches()`](/docs/clear-all-caches) – Clear all cached data
- [`clearEscrowCache()`](/docs/clear-escrow-cache) – Clear specific escrow cache
