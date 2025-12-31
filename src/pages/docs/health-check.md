---
title: healthCheck
description: Verify connectivity to RPC, contract, and subgraph
---

```ts
async healthCheck(): Promise<HealthCheckResult>
```

Performs a comprehensive health check of all SDK dependencies: RPC connection, smart contract accessibility, and subgraph availability.

#### Parameters
None

#### Returns
`Promise<HealthCheckResult>` – Health status for each component

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const health = await sdk.healthCheck();

console.log("RPC:", health.rpc ? "✅ Connected" : "❌ Failed");
console.log("Contract:", health.contract ? "✅ Accessible" : "❌ Failed");
console.log("Subgraph:", health.subgraph ? "✅ Available" : "❌ Failed");

if (!health.rpc || !health.contract || !health.subgraph) {
  console.error("Some services are unavailable");
  // Show degraded mode or error state
}
```

#### HealthCheckResult Structure
```ts
interface HealthCheckResult {
  rpc: boolean;        // RPC node responding
  contract: boolean;   // Smart contract callable
  subgraph: boolean;   // Subgraph queries working
  timestamp: number;   // Check timestamp
}
```

#### Use Cases
- App startup verification
- Monitoring and alerting
- Display system status to users
- Graceful degradation when services are down
