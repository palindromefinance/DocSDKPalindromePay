---
title: estimateGasWithBuffer
description: Estimate gas for a transaction with a safety buffer
---

```ts
async estimateGasWithBuffer(
  params: EstimateGasParams,
  bufferPercent?: number
): Promise<bigint>
```

Estimates the gas required for a transaction and adds a safety buffer to prevent out-of-gas errors.

#### Parameters
- `params: EstimateGasParams` – Transaction parameters to estimate
- `bufferPercent?: number` – Buffer percentage to add (default: 20%)

#### Returns
`Promise<bigint>` – Estimated gas with buffer applied

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

// Estimate gas for a deposit with 20% buffer (default)
const gasEstimate = await sdk.estimateGasWithBuffer({
  account: walletClient.account,
  to: contractAddress,
  data: encodedData,
});

console.log(`Estimated gas: ${gasEstimate}`);

// Use custom buffer (30%)
const saferEstimate = await sdk.estimateGasWithBuffer(
  {
    account: walletClient.account,
    to: contractAddress,
    data: encodedData,
  },
  30
);
```

#### Use Cases
- Pre-calculate gas costs for user display
- Ensure transactions don't run out of gas
- Budget gas for complex operations

#### Related Methods
- [`simulateTransaction()`](/docs/simulate-transaction) – Full transaction simulation
