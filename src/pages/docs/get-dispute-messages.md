---
title: getDisputeMessages
description: Fetch all dispute messages/evidence for an escrow from the subgraph
---

```ts
async getDisputeMessages(escrowId: string): Promise<DisputeMessage[]>
```

Queries the subgraph to retrieve all dispute messages and evidence submissions for a specific escrow.

#### Parameters
- `escrowId: string` – The escrow ID to fetch messages for

#### Returns
`Promise<DisputeMessage[]>` – Array of dispute message objects

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const messages = await sdk.getDisputeMessages("42");

console.log(`Found ${messages.length} dispute messages`);

messages.forEach(msg => {
  console.log(`From: ${msg.sender} (${msg.role})`);
  console.log(`IPFS: ${msg.ipfsHash}`);
  console.log(`Submitted: ${msg.timestamp}`);
});
```

#### DisputeMessage Structure
```ts
interface DisputeMessage {
  id: string;
  escrowId: string;
  sender: string;
  role: string; // "buyer" | "seller" | "arbiter"
  ipfsHash: string;
  timestamp: string;
}
```

#### Use Cases
- Display dispute timeline with all evidence
- Arbiter review panel
- Audit dispute resolution process

#### Related Methods
- [`submitDisputeMessage()`](/docs/submit-dispute-message) – Submit new evidence
- [`getEscrowDetail()`](/docs/get-escrow-detail) – Get full escrow details including messages
