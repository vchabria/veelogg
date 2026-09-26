import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 const base="https://www.veelogg.com";
 const pages=[["",1],["/work-with-me",.9],["/ai-systems",.9],["/content-done",.8],["/builds",.8],["/mentorship",.8],["/about",.7],["/contact",.7],["/partnerships",.6]] as const;
 return pages.map(([p,priority])=>({url:base+p,changeFrequency:"monthly" as const,priority}));
}
