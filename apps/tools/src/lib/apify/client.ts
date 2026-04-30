import type { ScrapeResult } from "@/types/hooks";

const APIFY_BASE = "https://api.apify.com/v2";
const SCRAPE_TIMEOUT = 45_000;

interface ApifyRunResponse {
  data: {
    id: string;
    status: string;
    defaultDatasetId: string;
  };
}

interface InstagramPost {
  caption?: string;
  likesCount?: number;
  commentsCount?: number;
  videoPlayCount?: number;
  timestamp?: string;
}

interface TikTokPost {
  text?: string;
  diggCount?: number;
  commentCount?: number;
  shareCount?: number;
  collectCount?: number;
  playCount?: number;
  createTime?: number;
}

export interface ScrapedPost {
  platform: "instagram" | "tiktok";
  caption: string;
  engagementScore: number;
}

function getToken(): string | null {
  return process.env.APIFY_API_TOKEN || null;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function scoreInstagramPost(post: InstagramPost): number {
  return (
    (post.likesCount ?? 0) +
    (post.commentsCount ?? 0) * 2 +
    (post.videoPlayCount ?? 0)
  );
}

function scoreTikTokPost(post: TikTokPost): number {
  return (
    (post.diggCount ?? 0) +
    (post.commentCount ?? 0) * 2 +
    (post.shareCount ?? 0) * 3 +
    (post.collectCount ?? 0) +
    (post.playCount ?? 0) * 0.01
  );
}

export async function scrapeInstagram(
  handle: string
): Promise<{ posts: ScrapedPost[]; result: ScrapeResult }> {
  const token = getToken();
  if (!token) {
    return {
      posts: [],
      result: {
        platform: "instagram",
        handle,
        postsAnalyzed: 0,
        status: "error",
        error: "APIFY_API_TOKEN not configured",
      },
    };
  }

  const cleanHandle = handle.replace(/^@/, "");

  try {
    // Use apify/instagram-post-scraper actor via sync run
    const res = await fetchWithTimeout(
      `${APIFY_BASE}/acts/apify~instagram-post-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: [cleanHandle],
          resultsLimit: 30,
        }),
      },
      SCRAPE_TIMEOUT
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      return {
        posts: [],
        result: {
          platform: "instagram",
          handle: cleanHandle,
          postsAnalyzed: 0,
          status: "error",
          error: `Apify returned ${res.status}: ${text.slice(0, 200)}`,
        },
      };
    }

    const rawPosts: InstagramPost[] = await res.json();

    const scored = rawPosts
      .filter((p) => p.caption && p.caption.trim().length > 0)
      .map((p) => ({
        platform: "instagram" as const,
        caption: p.caption!.slice(0, 200),
        engagementScore: scoreInstagramPost(p),
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 10);

    return {
      posts: scored,
      result: {
        platform: "instagram",
        handle: cleanHandle,
        postsAnalyzed: scored.length,
        status: "success",
      },
    };
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Scraping timed out (45s)"
        : err instanceof Error
          ? err.message
          : "Unknown error";
    return {
      posts: [],
      result: {
        platform: "instagram",
        handle: cleanHandle,
        postsAnalyzed: 0,
        status: "error",
        error: message,
      },
    };
  }
}

export async function scrapeTikTok(
  handle: string
): Promise<{ posts: ScrapedPost[]; result: ScrapeResult }> {
  const token = getToken();
  if (!token) {
    return {
      posts: [],
      result: {
        platform: "tiktok",
        handle,
        postsAnalyzed: 0,
        status: "error",
        error: "APIFY_API_TOKEN not configured",
      },
    };
  }

  const cleanHandle = handle.replace(/^@/, "");

  try {
    // Use clockworks/tiktok-scraper actor via sync run
    const res = await fetchWithTimeout(
      `${APIFY_BASE}/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profiles: [cleanHandle],
          resultsPerPage: 30,
          shouldDownloadVideos: false,
        }),
      },
      SCRAPE_TIMEOUT
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      return {
        posts: [],
        result: {
          platform: "tiktok",
          handle: cleanHandle,
          postsAnalyzed: 0,
          status: "error",
          error: `Apify returned ${res.status}: ${text.slice(0, 200)}`,
        },
      };
    }

    const rawPosts: TikTokPost[] = await res.json();

    const scored = rawPosts
      .filter((p) => p.text && p.text.trim().length > 0)
      .map((p) => ({
        platform: "tiktok" as const,
        caption: p.text!.slice(0, 200),
        engagementScore: scoreTikTokPost(p),
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 10);

    return {
      posts: scored,
      result: {
        platform: "tiktok",
        handle: cleanHandle,
        postsAnalyzed: scored.length,
        status: "success",
      },
    };
  } catch (err) {
    const message =
      err instanceof Error && err.name === "AbortError"
        ? "Scraping timed out (45s)"
        : err instanceof Error
          ? err.message
          : "Unknown error";
    return {
      posts: [],
      result: {
        platform: "tiktok",
        handle: cleanHandle,
        postsAnalyzed: 0,
        status: "error",
        error: message,
      },
    };
  }
}
