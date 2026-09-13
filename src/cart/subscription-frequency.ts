export interface SubscriptionFrequency {
  code: string;
  label: string;
  interval: 'week' | 'month';
  intervalCount: number;
}

/** Delivery frequencies shoppers can pick for a subscription line. Single source of truth for the
 * PDP dropdown, cart validation, and the Stripe recurring price built at checkout. */
export const SUBSCRIPTION_FREQUENCIES: SubscriptionFrequency[] = [
  { code: '2w', label: 'Every 2 Weeks', interval: 'week', intervalCount: 2 },
  { code: '6w', label: 'Every 6 Weeks', interval: 'week', intervalCount: 6 },
  { code: '1m', label: 'Every Month', interval: 'month', intervalCount: 1 },
  { code: '2m', label: 'Every 2 Months', interval: 'month', intervalCount: 2 },
];

export const DEFAULT_SUBSCRIPTION_FREQUENCY = '1m';

export function resolveSubscriptionFrequency(code?: string): SubscriptionFrequency {
  return (
    SUBSCRIPTION_FREQUENCIES.find((f) => f.code === code) ??
    (SUBSCRIPTION_FREQUENCIES.find((f) => f.code === DEFAULT_SUBSCRIPTION_FREQUENCY) as SubscriptionFrequency)
  );
}
