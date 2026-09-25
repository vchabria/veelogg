import type { MetadataRoute } from "next";
import { guides,guideUrl } from "@/lib/guides";
export default function sitemap():MetadataRoute.Sitemap {
 const base="https://www.veelogg.com";
 const pages=[["",1],["/work",.9],["/work-with-me",.9],["/ai-systems",.9],["/content-done",.8],["/builds",.8],["/mentorship",.8],["/about",.7],["/contact",.7],["/partnerships",.6]] as const;
 return [
  ...pages.map(([p,priority])=>({url:base+p,changeFrequency:"monthly" as const,priority})),
  {url:base+"/guides",changeFrequency:"weekly" as const,priority:.9},
  ...guides.map(g=>({url:guideUrl(g.slug),lastModified:g.date,changeFrequency:"monthly" as const,priority:.7})),
 ];
}
