export interface UsageInfo {
  used: number;
  limit: number;
  remaining: number;
  plan: "free" | "pro";
  resetsAt: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface PortalResponse {
  url: string;
}
