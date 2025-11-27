---
title: watchAllEvents
description: Subscribe to every escrow-related event in one call — perfect for admin panels & bots
---

```ts
watchAllEvents(callback: (event: any) => void): EventWatcher
```

**One-line subscription** to **all** PalindromeEscrow events:

- `EscrowCreated`
- `PaymentDeposited`
- `DeliveryConfirmed`
- `DisputeStarted`
- `DisputeResolved`
- `DisputeMessagePosted`
- `RequestCancel`
- `Canceled`

Ideal for admin dashboards, live monitoring, analytics, Discord/Telegram bots, or any real-time backend.

#### Parameters
- `callback` – Called instantly on every event with full decoded data

#### Returns
`EventWatcher` → `{ dispose(): void }` to stop all listeners

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Subscribe to EVERYTHING
const unwatch = sdk.watchAllEvents((event) => {
  const { eventName, args } = event;

  console.log(`[${new Date().toISOString()}] ${eventName}`, args);

  // Example routing
  switch (eventName) {
    case "EscrowCreated":
      toast.success(`New deal #${args.escrowId}: ${args.title}`);
      break;
    case "PaymentDeposited":
      toast.info(`Funds locked in escrow #${args.escrowId}`);
      break;
    case "DeliveryConfirmed":
      toast.success(`Deal #${args.escrowId} completed!`);
      break;
    case "DisputeStarted":
      toast.warning(`Dispute opened on #${args.escrowId}`);
      break;
    case "DisputeResolved":
      const winner = args.resolution === 3 ? "Seller" : "Buyer";
      toast.info(`Dispute #${args.escrowId} resolved — ${winner} wins`);
      break;
    case "Canceled":
      toast.info(`Escrow #${args.escrowId} canceled — buyer refunded`);
      break;
  }
});

// Stop all watchers (e.g. on component unmount or server shutdown)
// unwatch.dispose();
```

#### All Events You’ll Receive

| Event Name               | Key Data Included                     |
|--------------------------|---------------------------------------|
| `EscrowCreated`          | escrowId, title, amount, buyer, seller |
| `PaymentDeposited`       | escrowId, amount                      |
| `DeliveryConfirmed`      | escrowId, amount, fee                 |
| `DisputeStarted`         | escrowId, initiator                   |
| `DisputeResolved`        | escrowId, resolution, arbiter         |
| `DisputeMessagePosted`   | escrowId, sender, role, ipfsHash      |
| `RequestCancel`          | escrowId, requester                   |
| `Canceled`               | escrowId, initiator                   |
