---
title: watchUserEscrows
description: Subscribe to real-time escrow updates for a user address
---

```ts
watchUserEscrows(
  userAddress: string,
  callback: (escrows: Escrow[]) => void
): () => void
```

Sets up a real-time subscription to watch for escrow changes involving a specific user address (as buyer or seller).

#### Parameters
- `userAddress: string` – The wallet address to watch
- `callback: (escrows: Escrow[]) => void` – Function called whenever escrows update

#### Returns
`() => void` – Unsubscribe function to stop watching

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Start watching for escrow updates
const unsubscribe = sdk.watchUserEscrows(
  "0xUserAddress...",
  (escrows) => {
    console.log("Escrows updated:", escrows.length);

    escrows.forEach(escrow => {
      console.log(`Escrow #${escrow.id}: ${escrow.state}`);
    });

    // Update your UI here
    updateEscrowList(escrows);
  }
);

// Later, when component unmounts or user navigates away:
unsubscribe();
```

#### React Hook Example
```tsx
import { useEffect, useState } from 'react';
import { createPalindromeSDK } from '@/lib/createSDK';

function useUserEscrows(userAddress: string) {
  const [escrows, setEscrows] = useState<Escrow[]>([]);

  useEffect(() => {
    if (!userAddress) return;

    const sdk = createPalindromeSDK();
    const unsubscribe = sdk.watchUserEscrows(userAddress, setEscrows);

    return () => unsubscribe();
  }, [userAddress]);

  return escrows;
}
```

#### Use Cases
- Real-time dashboard updates
- Notification systems for escrow state changes
- Live order tracking for buyers and sellers
