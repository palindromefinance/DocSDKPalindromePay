---
title: getEscrowsBySeller
description: Fetch all escrows where a specific address is the seller (via subgraph)
---

```ts
async getEscrowsBySeller(seller: string): Promise<Escrow[]>
```

Returns every escrow (active, completed, disputed, etc.) where the given address is listed as the **seller**, using fully indexed data from The Graph — includes title, IPFS description, timestamps, token symbol, and more.

**Parameters**  
`seller: string` – Seller’s wallet address (case-insensitive)

**Returns**  
`Promise<Escrow[]>` – Array of complete escrow objects (same rich format as `getEscrows()`)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, address } = await connectAndInitSDK(); // address = your connected wallet

try {
  const mySellerEscrows = await sdk.getEscrowsBySeller(address);

  console.log(`You are the seller in ${mySellerEscrows.length} escrow(s):`);

  mySellerEscrows.forEach((escrow) => {
    console.log({
      id: escrow.id,
      title: escrow.title || 'Untitled deal',
      buyer: escrow.buyer.id,
      amount: escrow.amount,
      token: escrow.token.symbol,
      state: escrow.state,
      createdAt: new Date(Number(escrow.createdAt) * 1000).toLocaleDateString(),
      maturity: escrow.maturityTime
        ? new Date(Number(escrow.maturityTime) * 1000).toLocaleDateString()
        : 'No maturity',
    });
  });
} catch (error) {
  console.error('Failed to load seller escrows:', error);
}
```

**Sample Escrow Object (you as seller)**

```ts
{
  id: "89",
  title: "MacBook Pro M2 16GB - Like New",
  ipfsHash: "QmXyz...",
  amount: "1850000000",          // 1850 USDT
  token: { id: "0x...", symbol: "USDT" },
  buyer: { id: "0xbuyer456..." },
  seller: { id: "0xyouraddress..." },
  arbiter: { id: "0xarbiter..." },
  state: "AWAITING_PAYMENT",     // buyer hasn't deposited yet
  createdAt: "1723200000",
  depositTime: "0",              // not deposited yet
  maturityTime: "1723804800",    // +7 days from deposit
  messages: []
}
```