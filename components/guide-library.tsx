"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/guide-card";

export function GuideLibrary(){
 const [query,setQuery]=useState("");const [category,setCategory]=useState("all");
 const shown=guides.filter(g=>(category==="all"||g.category===category)&&[g.title,g.fullTitle,g.description,g.category].join(" ").toLowerCase().includes(query.toLowerCase().trim()));
 return <>
  <div className="guide-controls"><label className="guide-search"><Search size={19}/><Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="find your next lightbulb moment" aria-label="Search free guides"/></label><ToggleGroup type="single" value={category} onValueChange={v=>setCategory(v||"all")} className="guide-filters" aria-label="Filter free guides">{["all","brand voice","content","automation","websites"].map(c=><ToggleGroupItem key={c} value={c}>{c}</ToggleGroupItem>)}</ToggleGroup></div>
  <p className="guide-count" role="status">{shown.length} {shown.length===1?"guide":"guides"}{category!=="all"?" · "+category:" · yours to use"}</p>
  {shown.length?<div className="library-grid">{shown.map(g=><GuideCard key={g.slug} guide={g}/>)}</div>:<div className="guides-empty"><h2>nothing in that drawer yet.</h2><p>Try “voice”, “content” or “website”, or browse the whole collection.</p><button className="button button-brown" onClick={()=>{setQuery("");setCategory("all")}}>show all guides</button></div>}
 </>;
}
