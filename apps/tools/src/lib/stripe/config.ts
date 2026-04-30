export const STRIPE_CONFIG = {
  proPriceId: process.env.STRIPE_PRO_PRICE_ID!,
  portalReturnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
  checkoutSuccessUrl: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`,
  checkoutCancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
} as const;
