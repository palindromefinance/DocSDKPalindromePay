---
title: getFeeReceiver
description: Get the address that receives platform fees
---

```ts
async getFeeReceiver(): Promise<Address>
```

Returns the address configured to receive platform fees from completed escrows.

#### Parameters
None

#### Returns
`Promise<Address>` – The fee receiver address

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const feeReceiver = await sdk.getFeeReceiver();

console.log(`Platform fees go to: ${feeReceiver}`);
```

#### Use Cases
- Display fee recipient in UI
- Verify platform configuration
- Transparency for users

#### Related Methods
- [`getFeeBps()`](/docs/get-fee-bps) – Get fee percentage
- [`calculateFee()`](/docs/calculate-fee) – Calculate fee for an amount
