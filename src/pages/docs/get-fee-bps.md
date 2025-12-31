---
title: getFeeBps
description: Get the platform fee percentage in basis points
---

```ts
async getFeeBps(): Promise<number>
```

Returns the platform fee as basis points (1 bps = 0.01%). For example, 100 bps = 1%.

#### Parameters
None

#### Returns
`Promise<number>` – Fee in basis points

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const feeBps = await sdk.getFeeBps();

const feePercent = feeBps / 100;
console.log(`Platform fee: ${feePercent}%`);

// Calculate fee on a $1000 transaction
const amount = 1000n * 1000000n; // $1000 in USDC (6 decimals)
const fee = await sdk.calculateFee(amount);
console.log(`Fee on $1000: $${Number(fee) / 1000000}`);
```

#### Common Values
| Basis Points | Percentage |
|--------------|------------|
| 50 | 0.5% |
| 100 | 1% |
| 200 | 2% |
| 250 | 2.5% |

#### Use Cases
- Display fee information to users
- Calculate expected fees before escrow creation
- Price transparency

#### Related Methods
- [`calculateFee()`](/docs/calculate-fee) – Calculate fee for specific amount
- [`getFeeReceiver()`](/docs/get-fee-receiver) – Get fee recipient address
