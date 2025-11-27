---
title: getMaturityInfo
description: Get complete maturity deadline info — days, date, time remaining, and status
---

```ts
getMaturityInfo(
  depositTime: bigint | number | string | null,
  maturityTimeDays: bigint | number | string
): MaturityInfo
```

Converts raw deposit time + maturity days into a **rich, human-friendly object** with everything you need for countdowns, badges, and auto-release logic.

Perfect for showing "Auto-release in X days" or "Deadline passed".

#### Parameters
- `depositTime` – Unix timestamp (seconds) when funds were deposited
- `maturityTimeDays` – Number of days until auto-release (0 = no auto-release)

#### Returns
`MaturityInfo` object

```ts
interface MaturityInfo {
  maturityDays: number;
  deadline: Date | null;           // Exact auto-release date/time
  hasDeadline: boolean;            // true if maturity > 0
  isPassed: boolean;               // true if current time > deadline
  timeRemaining: string;           // e.g. "3d 12h remaining" or "Deadline passed"
}
```

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Example: escrow created with 7-day maturity
const depositTime = 1723112400n;     // Aug 8, 2024
const maturityDays = 7n;

const info = sdk.getMaturityInfo(depositTime, maturityDays);

console.log("Maturity info:", {
  days: info.maturityDays,           // 7
  deadline: info.deadline?.toLocaleString(),
  hasDeadline: info.hasDeadline,     // true
  expired: info.isPassed,            // false (if still within 7 days)
  countdown: info.timeRemaining,     // "4d 8h remaining" or "Deadline passed"
});
```

#### Sample Outputs

| Scenario                     | `timeRemaining`             | `isPassed` |
|-----------------------------|------------------------------|------------|
| 3 days left                 | `"3d 5h remaining"`          | `false`    |
| 2 hours left                | `"2h 15m remaining"`         | `false`    |
| 5 minutes left              | `"5m remaining"`             | `false`    |
| Deadline passed             | `"Deadline passed"`          | `true`     |
| No maturity (0 days)        | `"No deadline"`              | `false`    |

#### Perfect For
- Countdown timers
- "Auto-release" badges
- Disabling confirm buttons after deadline
- Showing "Funds released automatically" messages

**Never guess deadlines again — full clarity for users**

**See also** → [`formatMaturityDays()`](/docs/format-maturity-days) · [`calculateDeadline()`](/docs/calculate-deadline)
