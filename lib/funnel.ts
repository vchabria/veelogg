/* Central funnel destinations.
   Swap these two the moment the real pages exist:
   - BOOKING_URL -> Cal.com "25 minutes with varnika" event
   - MAGNET_URL  -> Kit landing page for the gated edit skill + walkthrough
   Until then they fall back to safe on-site pages so no CTA can break. */

// The Calendly event, embedded inline on /contact (see components/calendly-embed).
export const CALENDLY_URL = "https://calendly.com/itismevarnica/jvs-cte";
// Booking CTAs point at the on-site embedded calendar, not off to calendly.com.
export const BOOKING_URL = "/contact#book";
export const MAGNET_URL = "/edit-skill"; // on-site opt-in page for the free edit skill

/* an off-site URL should open in the same tab for booking, but we mark
   external so links get rel/target handling where it matters */
export const isExternal = (url: string) => /^https?:\/\//.test(url);

export const PLAUSIBLE_DOMAIN = "veelogg.com";
