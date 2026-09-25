import { ArrowUpRight, AudioLines, Clapperboard, Globe, Workflow } from "lucide-react";
import { guideUrl, type Guide } from "@/lib/guides";

export function GuideCard({guide,compact=false}:{guide:Guide;compact?:boolean}) {
 const Icon=guide.icon==="voice"?AudioLines:guide.icon==="video"?Clapperboard:guide.icon==="systems"?Workflow:Globe;
 const Heading=compact?"h3":"h2";
 return <a className={"guide-card guide-"+guide.theme+(compact?" guide-compact":"")} href={guideUrl(guide.slug)} target="_blank" rel="noreferrer">
   <div className="guide-cover"><p className="guide-cover-title">{guide.cover.split("\n").map((line,i)=><span key={i}>{line}</span>)}</p><div className="guide-art-icon"><Icon strokeWidth={1.3}/></div><div className="guide-cover-bottom"><span>{guide.category}</span><span className="free-tag">free guide</span></div></div>
   <div className="guide-caption"><div><Heading className="guide-title">{guide.fullTitle}</Heading>{!compact&&<p>{guide.description}</p>}</div><ArrowUpRight size={23}/></div>
 </a>;
}
