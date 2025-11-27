---
title: hasSubmittedEvidence
description: Check if a participant has already submitted evidence in a dispute
---

```ts
async hasSubmittedEvidence(escrowId: bigint, role: Role): Promise<boolean>
```

Utility function to check whether **buyer**, **seller**, or **arbiter** has already uploaded their evidence during a dispute.

Useful for disabling the “Submit Evidence” button after submission.

#### Parameters
- `escrowId: bigint` – The disputed escrow ID
- `role: Role` – One of: `Role.Buyer`, `Role.Seller`, or `Role.Arbiter`

#### Returns
`Promise<boolean>` – `true` if evidence was already submitted, `false` otherwise

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { Role } from '@palindromecryptoescrow/sdk';

const { sdk } = await connectAndInitSDK();

try {
  const buyerSubmitted = await sdk.hasSubmittedEvidence(42n, Role.Buyer);
  const sellerSubmitted = await sdk.hasSubmittedEvidence(42n, Role.Seller);
  const arbiterSubmitted = await sdk.hasSubmittedEvidence(42n, Role.Arbiter);

  console.log("Evidence status:", {
    buyer: buyerSubmitted ? "Submitted" : "Pending",
    seller: sellerSubmitted ? "Submitted" : "Pending",
    arbiter: arbiterSubmitted ? "Submitted" : "Pending",
  });

  // Example: conditionally show button
  if (!buyerSubmitted) {
    // Show "Submit Evidence" button for buyer
  }

} catch (error) {
  console.error("Failed to check evidence status:", error);
}
```

#### Common Use Cases
- Hide/disable submit button after user uploads
- Show checkmark or “Submitted” label
- Display progress indicators in dispute UI
- Prevent double submissions

**See also** → [`getDisputeSubmissionStatus()`](/docs/get-dispute-submission-status) for all-in-one status
