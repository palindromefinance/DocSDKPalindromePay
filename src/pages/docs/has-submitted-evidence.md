---
title: hasSubmittedEvidence
description: Check if a user has already submitted dispute evidence
---

```ts
async hasSubmittedEvidence(
  escrowId: bigint,
  userAddress: Address
): Promise<boolean>
```

Checks whether a specific user has already submitted evidence for a dispute. Each participant can only submit once.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `userAddress: Address` – The wallet address to check

#### Returns
`Promise<boolean>` – True if evidence has been submitted

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const hasSubmitted = await sdk.hasSubmittedEvidence(
  42n,
  walletClient.account.address
);

if (hasSubmitted) {
  console.log("You have already submitted evidence");
  // Disable submit button, show submitted status
} else {
  console.log("You can submit evidence");
  // Show evidence submission form
}
```

#### Use Cases
- Control UI state for evidence submission
- Prevent duplicate submission attempts
- Display submission status in dispute timeline

#### Related Methods
- [`submitDisputeMessage()`](/docs/submit-dispute-message) – Submit dispute evidence
- [`getDisputeSubmissionStatus()`](/docs/get-dispute-submission-status) – Get all parties' submission status
