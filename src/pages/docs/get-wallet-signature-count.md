---
title: getWalletSignatureCount
description: Get the number of valid signatures for an escrow wallet
---

```ts
async getWalletSignatureCount(escrowId: bigint): Promise<number>
```

Returns the current count of valid signatures that have been collected for the escrow's multisig wallet.

#### Parameters
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<number>` – Number of valid signatures (0-3)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const sigCount = await sdk.getWalletSignatureCount(42n);

console.log(`Signatures collected: ${sigCount}/2`);

if (sigCount >= 2) {
  console.log("Wallet is authorized for transactions");
} else {
  console.log("Need more signatures to authorize wallet");
}
```

#### 2-of-3 Multisig
The escrow wallet uses a 2-of-3 multisig scheme:
- **Buyer** can sign
- **Seller** can sign
- **Arbiter** can sign

Any 2 signatures are required to authorize wallet operations.

#### Use Cases
- Check if wallet is ready for withdrawal
- Display authorization progress in UI
- Determine next steps in escrow process
