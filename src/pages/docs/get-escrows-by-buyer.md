---
title: getEscrowsByBuyer
description: Fetch all escrows where a specific address is the buyer (via subgraph)
---

```ts
async getEscrowsByBuyer(buyer: string): Promise<Escrow[]>
```

Returns every escrow (past and present) where the given address is listed as the **buyer**, using indexed data from The Graph — includes titles, IPFS hashes, dispute messages, etc.

**Parameters**  
`buyer: string` – Buyer’s wallet address (case-insensitive, checksummed or lowercase works)

**Returns**  
`Promise<Escrow[]>` – Array of full escrow objects (same shape as `getEscrows()`)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, address } = await connectAndInitSDK(); // address = connected wallet

try {
  const myBuyerEscrows = await sdk.getEscrowsByBuyer(address);

  console.log(`You are the buyer in ${myBuyerEscrows.length} escrow(s):`);

  myBuyerEscrows.forEach((escrow) => {
    console.log({
      id: escrow.id,
      title: escrow.title || 'No title',
      seller: escrow.seller.id,
      amount: escrow.amount,
      token: escrow.token.symbol,
      state: escrow.state,
      createdAt: new Date(Number(escrow.createdAt) * 1000).toLocaleDateString(),
    });
  });
} catch (error) {
  console.error('Failed to load buyer escrows:', error);
}
```

**Sample Escrow Object (you as buyer)**

```ts
{
  id: "42",
  title: "PlayStation 5 + 2 games",
  amount: "480000000",                     // 480 USDT
  token: { symbol: "USDT" },
  buyer: { id: "0xyouraddress..." },
  seller: { id: "0xseller123..." },
  arbiter: { id: "0xarbiter..." },
  state: "AWAITING_DELIVERY",
  createdAt: "1723112400",
  depositTime: "1723112500",
  maturityTime: "1723717200",              // +7 days
  messages: []                             // dispute messages if any
}
```
