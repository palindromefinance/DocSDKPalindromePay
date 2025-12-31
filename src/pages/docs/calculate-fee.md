---
title: calculateFee
description: Calculate the platform fee for a given amount
---

```ts
async calculateFee(amount: bigint): Promise<bigint>
```

Calculates the platform fee that would be deducted from a given amount upon escrow completion.

#### Parameters
- `amount: bigint` – The escrow amount in token's smallest unit

#### Returns
`Promise<bigint>` – The fee amount

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { parseUnits, formatUnits } from 'viem';

const { sdk } = await connectAndInitSDK();

// Calculate fee for 100 USDC
const amount = parseUnits("100", 6); // 100 USDC
const fee = await sdk.calculateFee(amount);

console.log(`Amount: 100 USDC`);
console.log(`Fee: ${formatUnits(fee, 6)} USDC`);
console.log(`Seller receives: ${formatUnits(amount - fee, 6)} USDC`);
```

#### Fee Calculation
```
fee = amount * feeBps / 10000
```

For example, with 1% fee (100 bps):
- Amount: 100 USDC
- Fee: 100 * 100 / 10000 = 1 USDC
- Seller receives: 99 USDC

#### When Are Fees Applied?
| Resolution | Fee Deducted? |
|------------|---------------|
| `confirmDelivery()` | Yes |
| `autoRelease()` | Yes |
| Arbiter rules for seller | Yes |
| Arbiter rules for buyer | No (full refund) |
| Mutual cancellation | No (full refund) |

#### Use Cases
- Show fee breakdown before creating escrow
- Calculate seller's net amount
- Display transaction summary

#### Related Methods
- [`getFeeBps()`](/docs/get-fee-bps) – Get fee percentage
- [`getFeeReceiver()`](/docs/get-fee-receiver) – Get fee recipient
