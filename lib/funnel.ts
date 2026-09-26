/* Central funnel destinations.
   Swap these two the moment the real pages exist:
   - BOOKING_URL -> Cal.com "25 minutes with varnika" event
   - MAGNET_URL  -> Kit landing page for the gated edit skill + walkthrough
   Until then they fall back to safe on-site pages so no CTA can break. */

export const BOOKING_URL = "/contact"; // TODO: replace with Cal.com booking link
export const MAGNET_URL = "/guides";   // TODO: replace with Kit edit-skill landing page

/* an off-site URL should open in the same tab for booking, but we mark
   external so links get rel/target handling where it matters */
export const isExternal = (url: string) => /^https?:\/\//.test(url);

export const PLAUSIBLE_DOMAIN = "veelogg.com";
