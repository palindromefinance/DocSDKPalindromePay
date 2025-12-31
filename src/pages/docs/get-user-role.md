---
title: getUserRole
description: Determine a user's role (buyer, seller, arbiter, or none) for a specific escrow
---

```ts
async getUserRole(escrowId: bigint, userAddress: Address): Promise<Role | null>
```

Checks the escrow data to determine what role (if any) the specified address has in the escrow.

#### Parameters
- `escrowId: bigint` – The escrow ID to check
- `userAddress: Address` – The wallet address to check

#### Returns
`Promise<Role | null>` – The user's role or null if not a participant

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { Role } from '@palindromecryptoescrow/sdk';

const { sdk } = await connectAndInitSDK();

const role = await sdk.getUserRole(42n, "0xUserAddress...");

if (role === Role.Buyer) {
  console.log("You are the buyer");
  // Show buyer-specific UI (confirm receipt, dispute, etc.)
} else if (role === Role.Seller) {
  console.log("You are the seller");
  // Show seller-specific UI (mark shipped, etc.)
} else if (role === Role.Arbiter) {
  console.log("You are the arbiter");
  // Show arbiter UI (review dispute, make decision)
} else {
  console.log("You are not a participant in this escrow");
}
```

#### Role Enum
```ts
enum Role {
  Buyer = 0,
  Seller = 1,
  Arbiter = 2
}
```

#### Use Cases
- Determine which actions to show in UI
- Role-based access control
- Permission checks before calling SDK methods
