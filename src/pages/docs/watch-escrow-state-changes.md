---
title: watchEscrowStateChanges
description: Subscribe to real-time state changes for a specific escrow
---

```ts
watchEscrowStateChanges(
  escrowId: bigint,
  callback: (state: EscrowState) => void
): () => void
```

Sets up a real-time subscription to watch for state changes on a specific escrow.

#### Parameters
- `escrowId: bigint` – The escrow ID to watch
- `callback: (state: EscrowState) => void` – Function called when state changes

#### Returns
`() => void` – Unsubscribe function to stop watching

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromecryptoescrow/sdk';

const { sdk } = await connectAndInitSDK();

// Watch for state changes on escrow #42
const unsubscribe = sdk.watchEscrowStateChanges(42n, (newState) => {
  console.log("State changed to:", newState);

  switch (newState) {
    case EscrowState.AWAITING_DELIVERY:
      showNotification("Payment received! Awaiting delivery.");
      break;
    case EscrowState.COMPLETE:
      showNotification("Transaction complete! Funds released.");
      break;
    case EscrowState.DISPUTED:
      showNotification("⚠️ Dispute opened!");
      break;
  }
});

// Later, when done watching:
unsubscribe();
```

#### React Hook Example
```tsx
import { useEffect, useState } from 'react';

function useEscrowState(escrowId: bigint) {
  const [state, setState] = useState<EscrowState | null>(null);

  useEffect(() => {
    const sdk = createPalindromeSDK();
    const unsubscribe = sdk.watchEscrowStateChanges(escrowId, setState);
    return () => unsubscribe();
  }, [escrowId]);

  return state;
}
```

#### Use Cases
- Real-time order status updates
- Notification triggers
- Live transaction tracking page

#### Related Methods
- [`watchUserEscrows()`](/docs/watch-user-escrows) – Watch all escrows for a user
- [`getEscrowStatus()`](/docs/get-escrow-status) – Get current status (polling)
