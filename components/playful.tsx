"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { BookOpen, Mail, Move, RotateCcw } from "lucide-react";

export function useFinePointer() {
  const [fine,setFine] = useState(false);
  useEffect(() => { const q = window.matchMedia("(min-width: 641px) and (hover: hover) and (pointer: fine)"); const update=()=>setFine(q.matches);update();q.addEventListener("change",update);return()=>q.removeEventListener("change",update); },[]);
  return fine;
}

export function AppIcon({kind}:{kind:string}) {
  return <span className={"app-icon app-"+kind} aria-hidden="true">{kind === "guides" ? <BookOpen /> : kind === "contact" ? <Mail /> : <img src={"/assets/"+({content:"instagram",systems:"n8n",websites:"shopify",apps:"apple"}[kind] || "apple")+".svg"} alt="" width="34" height="34" />}</span>;
}

type DockEntry = { id:string; title:string; href:string; offer?:string };
const dockEntries:DockEntry[] = [
  {id:"content",title:"content",href:"#work-with-me",offer:"content"},
  {id:"systems",title:"systems",href:"#work-with-me",offer:"systems"},
  {id:"websites",title:"websites",href:"#work-with-me",offer:"build"},
  {id:"apps",title:"apps",href:"#work-with-me",offer:"build"},
  {id:"guides",title:"free guides",href:"/guides"},
  {id:"contact",title:"say hello",href:"#contact"},
];
function DockItem({entry,mouse,active,onChoose}:{entry:DockEntry;mouse:MotionValue<number>;active:boolean;onChoose:(id:string)=>void}) {
  const ref=useRef<HTMLAnchorElement>(null);
  const distance=useTransform(mouse,x=>{const box=ref.current?.getBoundingClientRect();return box? x-box.left-box.width/2:Infinity;});
  const size=useTransform(distance,[-130,0,130],[1,1.28,1]);
  const scale=useSpring(size,{mass:.12,stiffness:260,damping:20});
  return <a ref={ref} href={entry.href} onClick={()=>{if(entry.offer)onChoose(entry.offer)}} className="dock-item">
    <motion.span className="dock-icon-wrap" style={{scale:active?scale:1}}><AppIcon kind={entry.id}/></motion.span><span className="dock-label">{entry.title}</span>
  </a>;
}
export function AppDock({onChoose}:{onChoose:(id:string)=>void}) {
  const mouse=useMotionValue(Infinity);const fine=useFinePointer();const reduced=useReducedMotion();
  return <nav className="app-dock" aria-label="Explore Veelogg" onPointerMove={e=>{if(fine&&!reduced)mouse.set(e.clientX)}} onPointerLeave={()=>mouse.set(Infinity)}>{dockEntries.map(entry=><DockItem key={entry.id} entry={entry} mouse={mouse} active={fine&&!reduced} onChoose={onChoose}/>)}</nav>;
}

export function PhotoCard({src,alt,caption,className,rotate=0}:{src:string;alt:string;caption:string;className:string;rotate?:number}) {
  const fine=useFinePointer(); const reduced=useReducedMotion();const x=useMotionValue(0);const y=useMotionValue(0);const [moved,setMoved]=useState(false);
  const bounds=className==="photo-left"?{left:-10,right:65,top:-35,bottom:35}:{left:-65,right:10,top:-35,bottom:35};
  function reset(){x.set(0);y.set(0);setMoved(false)}
  return <div className={"photo-position "+className}>
    <motion.figure className="photo-card" style={{x,y,rotate}} drag={fine&&!reduced} dragConstraints={bounds} dragElastic={0} dragMomentum={false} onDragEnd={()=>setMoved(true)} tabIndex={fine&&!reduced?0:undefined} aria-label={fine&&!reduced?alt+". Use arrow keys to move; Escape to reset.":undefined} onKeyDown={e=>{if(e.key==="Escape"){reset();return}const d:{[key:string]:[number,number]}={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};if(d[e.key]){e.preventDefault();x.set(Math.max(bounds.left,Math.min(bounds.right,x.get()+d[e.key][0])));y.set(Math.max(bounds.top,Math.min(bounds.bottom,y.get()+d[e.key][1])));setMoved(true)}}}>
      <img src={src} alt={alt} width="1080" height="1920" draggable={false} fetchPriority={className==="photo-left"?"high":undefined}/><figcaption>{caption}</figcaption>
      {fine&&!reduced&&<span className="drag-note"><Move size={12}/> drag me</span>}
    </motion.figure>
    {moved&&<button className="photo-reset" onClick={reset} aria-label={"Reset "+caption}><RotateCcw size={14}/> reset</button>}
  </div>;
}

export function CoverMotion({children,index}:{children:ReactNode;index:number}) {
 const reduced=useReducedMotion();const fine=useFinePointer();const animated=fine&&!reduced;
 return <motion.div className="cover-motion" initial={false} whileInView={animated?{rotate:[-4,3,-2][index%3],y:0}:undefined} viewport={{once:true,amount:.35}} style={{rotate:animated?[-8,7,-6][index%3]:0,y:animated?16:0}} transition={{duration:.65,delay:index*.07,ease:[.16,1,.3,1]}}>{children}</motion.div>;
}
