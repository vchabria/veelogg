import type { ScrapedPost } from "./client";

export function formatScrapedPostsForPrompt(posts: ScrapedPost[]): string {
  if (posts.length === 0) return "";

  const igPosts = posts.filter((p) => p.platform === "instagram");
  const ttPosts = posts.filter((p) => p.platform === "tiktok");

  const sections: string[] = [];

  if (igPosts.length > 0) {
    const numbered = igPosts
      .map((p, i) => `${i + 1}. "${p.caption}"`)
      .join("\n");
    sections.push(`TOP INSTAGRAM POSTS (by engagement):\n${numbered}`);
  }

  if (ttPosts.length > 0) {
    const numbered = ttPosts
      .map((p, i) => `${i + 1}. "${p.caption}"`)
      .join("\n");
    sections.push(`TOP TIKTOK POSTS (by engagement):\n${numbered}`);
  }

  // Extract common hashtags across all posts
  const hashtagCounts = new Map<string, number>();
  for (const post of posts) {
    const tags = post.caption.match(/#\w+/g) ?? [];
    for (const tag of tags) {
      const lower = tag.toLowerCase();
      hashtagCounts.set(lower, (hashtagCounts.get(lower) ?? 0) + 1);
    }
  }

  const commonHashtags = Array.from(hashtagCounts.entries())
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  if (commonHashtags.length > 0) {
    sections.push(`COMMON HASHTAGS: ${commonHashtags.join(" ")}`);
  }

  return sections.join("\n\n");
}
