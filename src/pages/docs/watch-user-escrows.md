---
title: watchUserEscrows
description: Real-time detection of new escrows involving a user — even before The Graph indexes them
---

```ts
watchUserEscrows(
  userAddress: Address,
  callback: (escrowId: bigint, event: EscrowCreatedEvent) => void,
  options?: {
    onlyAsBuyer?: boolean;
    onlyAsSeller?: boolean;
    fromBlock?: bigint;
  }
): EventWatcher
```

**Instantly** detects when a new escrow is created for a specific user (as buyer or seller) — **no subgraph delay**.

Perfect for showing “New Order!” notifications, live dashboards, or inbox updates the moment a deal is created.

#### Parameters
- `userAddress: Address` – Wallet to monitor
- `callback` – Called immediately when a matching `EscrowCreated` event is detected
- `options?` – Optional filters

#### Returns
`EventWatcher` with `.dispose()` method to stop listening

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, address } = await connectAndInitSDK(); // address = connected user

// Watch all new escrows (as buyer OR seller)
const unwatchAll = sdk.watchUserEscrows(
  address,
  (escrowId, event) => {
    const role = event.buyer.toLowerCase() === address.toLowerCase() ? "Buyer" : "Seller";
    console.log(`New escrow #${escrowId} — You are the ${role}!`);
    console.log("Title:", event.title);
    console.log("Amount:", event.amount.toString());

    // Instantly show in UI (no waiting for subgraph!)
    addToInbox({ id: escrowId, ...event, role });
  }
);

// Or watch only as buyer
const unwatchBuyer = sdk.watchUserEscrows(
  address,
  (id) => console.log(`You just bought something! Escrow #${id}`),
  { onlyAsBuyer: true }
);

// Stop watching when component unmounts
// unwatchAll.dispose();
```

#### Why This Is Powerful
- **Zero delay** — sees new escrows instantly
- Works even if The Graph is lagging
- Perfect combo with `getEscrowDataQuick()` for full real-time detail
- Supports `fromBlock` for historical catch-up

#### Example: Real-time “My Orders” Feed
```ts
useEffect(() => {
  const watcher = sdk.watchUserEscrows(address, (id, event) => {
    toast.success(`New escrow #${id} created!`);
    refetchMyEscrows(); // or update state directly
  });

  return () => watcher.dispose();
}, [address]);
```