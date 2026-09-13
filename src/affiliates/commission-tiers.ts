/** Performance tiers: an affiliate's rate can step up automatically once their lifetime attributed sales
 * (order subtotal, not commission) crosses a threshold. Opt-in per affiliate via `tieringEnabled` — an
 * admin-set flat rate always wins for affiliates who haven't opted in, so turning tiers on never silently
 * changes an existing arrangement. */
export interface CommissionTier {
  minLifetimeSales: number;
  rate: number;
  label: string;
}

export const COMMISSION_TIERS: CommissionTier[] = [
  { minLifetimeSales: 0, rate: 0.15, label: 'Starter' },
  { minLifetimeSales: 1000, rate: 0.2, label: 'Growth' },
  { minLifetimeSales: 5000, rate: 0.25, label: 'Elite' },
];

export function tierForLifetimeSales(lifetimeSales: number): CommissionTier {
  let current = COMMISSION_TIERS[0];
  for (const tier of COMMISSION_TIERS) {
    if (lifetimeSales >= tier.minLifetimeSales) current = tier;
  }
  return current;
}

export function nextTier(lifetimeSales: number): CommissionTier | undefined {
  return COMMISSION_TIERS.find((t) => t.minLifetimeSales > lifetimeSales);
}
