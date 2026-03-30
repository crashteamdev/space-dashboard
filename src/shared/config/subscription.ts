export const MULTI_MONTH_PURCHASE_ENABLED = false;

export const SUBSCRIPTION_DEFAULT_MONTHS = 1 as const;

export const SUBSCRIPTION_ALLOWED_MONTHS = MULTI_MONTH_PURCHASE_ENABLED
  ? ([1, 3, 6] as const)
  : ([1] as const);

export type SubscriptionPeriod = 1 | 3 | 6;
