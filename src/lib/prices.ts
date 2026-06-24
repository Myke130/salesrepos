/**
 * Stripe price IDs → display amount (USD), shared by the checkout route and
 * the Meta Pixel client events so InitiateCheckout / Purchase report a value.
 */
export const PRICE_AMOUNTS: Record<string, number> = {
  price_1TYUluHhw9qqOoDRRTsLxz5H: 67,  // Core Stack
  price_1TYUlwHhw9qqOoDRgcwcP0Mi: 127, // Full OS
}
