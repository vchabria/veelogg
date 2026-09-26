import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
export default function sitemap():MetadataRoute.Sitemap {
 const base="https://www.veelogg.com";
 const pages=[["",1],["/work-with-me",.9],["/ai-systems",.9],["/edit-skill",.8],["/guides",.8],["/content-done",.8],["/builds",.8],["/mentorship",.8],["/about",.7],["/contact",.7],["/partnerships",.6]] as const;
 const staticPages=pages.map(([p,priority])=>({url:base+p,changeFrequency:"monthly" as const,priority}));
 const guidePages=guides.map(g=>({url:base+"/guides/"+g.slug,changeFrequency:"monthly" as const,priority:.7}));
 return [...staticPages,...guidePages];
}
