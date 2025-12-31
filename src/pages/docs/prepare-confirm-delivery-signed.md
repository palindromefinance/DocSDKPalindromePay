---
title: prepareConfirmDeliverySigned
description: Prepare all signatures needed for gasless confirm delivery
---

```ts
async prepareConfirmDeliverySigned(
  buyerWalletClient: WalletClient,
  escrowId: bigint
): Promise<{
  coordSignature: Hex;
  buyerWalletSig: Hex;
  deadline: bigint;
  nonce: bigint;
}>
```

Helper function that generates all the signatures needed for a **gasless confirm delivery**. The buyer signs off-chain, and the resulting data can be sent to a relayer who will submit the transaction and pay the gas.

#### Parameters
- `buyerWalletClient: WalletClient` – Buyer's connected wallet (must have account)
- `escrowId: bigint` – The escrow ID to confirm

#### Returns
Object containing:
- `coordSignature: Hex` – EIP-712 signature for the confirmation
- `buyerWalletSig: Hex` – Wallet authorization signature
- `deadline: bigint` – Signature expiration timestamp (60 minutes from now)
- `nonce: bigint` – Buyer's nonce for replay protection

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer

try {
  // Step 1: Buyer prepares signatures (NO GAS!)
  const { coordSignature, buyerWalletSig, deadline, nonce } =
    await sdk.prepareConfirmDeliverySigned(walletClient, 42n);

  console.log("Signatures prepared:");
  console.log("Coord Signature:", coordSignature);
  console.log("Wallet Sig:", buyerWalletSig);
  console.log("Deadline:", new Date(Number(deadline) * 1000));
  console.log("Nonce:", nonce);

  // Step 2: Send to relayer backend
  await fetch('/api/relay-confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      escrowId: '42',
      coordSignature,
      buyerWalletSig,
      deadline: deadline.toString(),
      nonce: nonce.toString(),
    }),
  });

  console.log("Sent to relayer — they will submit on-chain");

} catch (error: any) {
  if (error.code === "NOT_BUYER") {
    alert("Only the buyer can sign this");
  } else {
    console.error("Prepare failed:", error.shortMessage || error.message);
  }
}
```

#### Relayer Backend Example

```ts
// Backend: Relayer submits the signatures
app.post('/api/relay-confirm', async (req, res) => {
  const { escrowId, coordSignature, buyerWalletSig, deadline, nonce } = req.body;

  const txHash = await sdk.confirmDeliverySigned(
    relayerWallet,  // Relayer pays gas
    BigInt(escrowId),
    coordSignature,
    BigInt(deadline),
    BigInt(nonce),
    buyerWalletSig,
  );

  res.json({ success: true, txHash });
});
```

#### Why Use This?

- **Zero gas for buyer** – Buyer only signs, never pays
- **Better UX** – No wallet popups for transactions
- **Relayer flexibility** – You control when/how to submit
- **Batching** – Collect multiple signatures and submit together

**See also** → [`confirmDeliverySigned()`](/docs/confirm-delivery-signed) · [`signConfirmDelivery()`](/docs/sign-confirm-delivery)
