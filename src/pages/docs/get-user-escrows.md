---
title: getUserEscrows
description: Get all escrows where a user is buyer, seller, or arbiter
---

```ts
async getUserEscrows(userAddress: Address): Promise<Escrow[]>
```

Fetches all escrows where the specified address is involved as buyer, seller, or arbiter.

#### Parameters
- `userAddress: Address` – The wallet address to query

#### Returns
`Promise<Escrow[]>` – Array of all escrows involving the user

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const allEscrows = await sdk.getUserEscrows("0xUserAddress...");

console.log(`Total escrows: ${allEscrows.length}`);

// Categorize by role
const asBuyer = allEscrows.filter(e =>
  e.buyer.toLowerCase() === userAddress.toLowerCase()
);
const asSeller = allEscrows.filter(e =>
  e.seller.toLowerCase() === userAddress.toLowerCase()
);
const asArbiter = allEscrows.filter(e =>
  e.arbiter?.toLowerCase() === userAddress.toLowerCase()
);

console.log(`As buyer: ${asBuyer.length}`);
console.log(`As seller: ${asSeller.length}`);
console.log(`As arbiter: ${asArbiter.length}`);
```

#### Use Cases
- User dashboard showing all transactions
- Combined buyer/seller view
- Arbiter workload overview

#### Related Methods
- [`getEscrowsByBuyer()`](/docs/get-escrows-by-buyer) – Filter by buyer only
- [`getEscrowsBySeller()`](/docs/get-escrows-by-seller) – Filter by seller only
- [`watchUserEscrows()`](/docs/watch-user-escrows) – Real-time updates
