---
title: getEscrows
description: Fetch all escrows from The Graph subgraph (indexed & enriched data)
---

```ts
async getEscrows(): Promise<Escrow[]>
```

Retrieves all escrow deals that have been indexed by The Graph. This includes full metadata like title, IPFS hash, timestamps, and participant addresses — much richer than raw on-chain data.ReturnsPromise<Escrow[]> – Array of complete escrow objects.

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

// After connecting wallet
const { sdk } = await connectAndInitSDK();

try {
  const allEscrows = await sdk.getEscrows();

  console.log(`Found ${allEscrows.length} escrows:`);
  allEscrows.forEach((escrow) => {
    console.log({
      id: escrow.id,
      title: escrow.title,
      buyer: escrow.buyer.id,
      seller: escrow.seller.id,
      amount: escrow.amount,
      token: escrow.token.symbol,
      state: escrow.state,
      createdAt: new Date(Number(escrow.createdAt) * 1000).toLocaleString(),
    });
  });
} catch (error) {
  console.error('Failed to fetch escrows:', error);
}
```

Sample Escrow Object (from subgraph)

```ts
{
  id: "1",
  title: "iPhone 15 Pro Max - Brand New",
  ipfsHash: "Qm...",
  amount: "1250000000",           // 1250 USDT (6 decimals)
  token: { id: "0x...", symbol: "USDT" },
  buyer: { id: "0xbuyer..." },
  seller: { id: "0xseller..." },
  arbiter: { id: "0xarbiter..." },
  state: "AWAITING_DELIVERY",
  createdAt: "1719823456",
  depositTime: "1719823500",
  maturityTime: "1720502400",     // +7 days
  messages: [...]                 // dispute messages (if any)
}
```
