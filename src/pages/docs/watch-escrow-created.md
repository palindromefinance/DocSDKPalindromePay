---
title: watchEscrowCreated
description: Listen for any new escrow created on the contract — globally or filtered
---

```ts
watchEscrowCreated(
  callback: (event: EscrowCreatedEvent) => void,
  fromBlock?: bigint
): EventWatcher
```

Subscribes to the **`EscrowCreated`** event emitted by the Palindrome contract.

Triggers **immediately** when any new escrow is created — perfect for admin dashboards, live feeds, analytics, or bots.

#### Parameters
- `callback` – Function called with full event data on every new escrow
- `fromBlock?` – Optional: start listening from a specific block (useful for catching up)

#### Returns
`EventWatcher` → `{ dispose(): void }` to stop listening

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Listen to ALL new escrows (admin view, marketplace feed, etc.)
const unwatch = sdk.watchEscrowCreated((event) => {
  console.log("New escrow created!", {
    id: event.escrowId.toString(),
    buyer: event.buyer,
    seller: event.seller,
    amount: event.amount.toString(),
    token: event.token,
    title: event.title || "Untitled",
    ipfsHash: event.ipfsHash,
    maturityTime: event.maturityTime > 0n 
      ? new Date(Number(event.maturityTime) * 1000).toLocaleString()
      : "No auto-release",
  });

  // Example: show live toast
  toast.success(`New deal: "${event.title}" — #${event.escrowId}`);
});

// Optional: start from a specific block (e.g. after page load)
const watcherFromBlock = sdk.watchEscrowCreated(
  (event) => console.log("Caught up:", event.escrowId),
  42_000_000n
);

// Stop listening when no longer needed
// unwatch.dispose();
```

#### Event Shape (`EscrowCreatedEvent`)

```ts
{
  escrowId: bigint;
  buyer: Address;
  seller: Address;
  token: Address;
  amount: bigint;
  arbiter: Address;
  maturityTime: bigint;    // 0 if no auto-release
  title: string;
  ipfsHash: string;
}
```
