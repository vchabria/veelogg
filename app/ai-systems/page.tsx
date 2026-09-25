import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { AiWorkflow, NinetyDay } from "@/components/diagrams";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Brand & Marketing Systems for Founders | Veelogg",
  description: "Define the strategy, build the AI workflows and train your team. Brand and marketing systems for founder-led SaaS, product companies and agencies.",
  alternates: { canonical: "https://www.veelogg.com/ai-systems" },
  openGraph: { title: "Brand & Marketing Systems for Founders | Veelogg", description: "Define the strategy, build the AI workflows and train your team.", url: "https://www.veelogg.com/ai-systems", type: "website" },
};

const FAQS: [string, string][] = [
  ["Can you work with our existing tools?", "We start by checking your existing tools and what they can support, then build the workflow around the useful parts. I recommend changes when they have a clear job in the process."],
  ["Will the AI understand our brand?", "We give it approved context, examples and instructions, then test the output against real work. Your team helps establish the standard and reviews the decisions that need its judgment."],
  ["Do you make content during the engagement?", "Yes, we use agreed content tasks to build and test the process. We define the formats, volume and review responsibilities in the proposal."],
  ["Can this include our website or other business workflows?", "Yes, when those are part of the agreed scope. A website, app or larger operational build receives its own deliverables, timeline and price."],
  ["How much does it cost?", "The fee depends on the workflow, integrations, production requirements and training involved. You’ll receive a written scope and price before we begin."],
  ["What happens after the handoff?", "Your internal owner runs the process. We agree on what you maintain and what optional ongoing support would cover."],
];

const INCLUDES = [
  ["Strategic direction", "the audience, positioning, messages, priorities and next useful experiment, grounded in what we learn about the business and its customers."],
  ["Business context", "your offer, customers, approved facts and the reasoning behind recurring decisions."],
  ["Brand voice and visual direction", "examples, references and feedback that show what fits your company."],
  ["Reusable AI skills", "clear instructions and workflows for the agreed tasks, such as research, briefing, drafting or repurposing."],
  ["Creative production workflows", "the route from an idea or source file to a reviewed asset."],
  ["Connected tools", "the useful handoffs between the places your team works."],
  ["Team ownership", "instructions, training, named responsibilities and a way to update the setup."],
];

export default function AiSystemsPage() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: "Brand & Marketing Systems", serviceType: "90-day brand and marketing systems implementation, practice and handoff", provider: { "@type": "Organization", name: "Veelogg", url: "https://www.veelogg.com" }, description: metadata.description, url: "https://www.veelogg.com/ai-systems" },
    { "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ] };

  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap">
      <p className="home-eyebrow">brand &amp; marketing systems for saas, product teams &amp; agencies</p>
      <h1>decide the direction. build the system to carry it through.</h1>
      <p className="page-lede">We work through your customers, positioning, message and creative standards. Then I build the AI assistants, reusable skills and working processes your marketing or client-delivery team needs to act on that direction.</p>
      <div className="home-hero-actions">
        <a className="button button-brown" href="/contact?help=ai-systems">tell me about your workflow <ArrowUpRight size={20} /></a>
        <a className="text-link" href="#the-90-days">how the 90 days work <ArrowRight size={18} /></a>
      </div>
    </section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">where we start</h2>
      <p className="cs-body">We start with the business and the people it serves. Who is the work for? What should it help them understand or do? Then we follow one real piece through your team: where it begins, which information is missing, and which decisions keep returning to you.</p>
      <p className="cs-body">That gives us a clear place to build.</p>
      <AiWorkflow />
    </div></section>

    <section id="saas" className="page-section wrap"><div className="narrow">
      <h2 className="section-title">for SaaS &amp; product companies</h2>
      <div className="mini-block"><h3>Turn product knowledge into useful marketing.</h3><p>We gather the positioning, customer questions, actual product behavior and founder explanations. Then we build reusable ways to create and review demos, feature stories, launch assets, website copy and email content.</p></div>
      <div className="mini-block"><h3>Make the next launch easier to run.</h3><p>A product update becomes an agreed brief. The right people supply the facts, AI helps prepare the materials, and the team reviews and moves them through the launch workflow.</p></div>
      <div className="mini-block"><h3>Keep the context current.</h3><p>We name who updates the approved product information and show the team how changes reach its working instructions and examples.</p></div>
      <a className="button button-outline" href="/contact?help=ai-systems&company=saas">tell me about your product marketing <ArrowUpRight size={19} /></a>
    </div></section>

    <section id="agencies" className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">for agencies</h2>
      <div className="mini-block"><h3>Give every client a usable brief and brand context.</h3><p>We organize the client’s voice, references, approved claims and feedback so the people making the work can find and use them.</p></div>
      <div className="mini-block"><h3>Make your creative standards easier to apply.</h3><p>I help turn repeated notes about copy, visuals and editing into examples, AI skills and review criteria your team can use before work reaches you.</p></div>
      <div className="mini-block"><h3>Give each handoff a clear owner.</h3><p>We map the route from brief to production, review and delivery. Your team practices it with real client work, including what to do when information or approval is missing.</p></div>
      <a className="button button-outline" href="/contact?help=ai-systems&company=agency">tell me about your client delivery <ArrowUpRight size={19} /></a>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">your agency’s marketing or your clients’ work?</h2>
      <p className="cs-body">We can work on either. At the start, we agree which workflow we are improving and whose brand context it uses. For client delivery, we begin with one representative account and agree the scope for adding others.</p>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">what the system can include</h2>
      <ul className="cs-keep">
        {INCLUDES.map(([t, b]) => <li key={t}><Check size={19} /><span><strong>{t}:</strong> {b}</span></li>)}
      </ul>
      <p className="cs-note">For agencies, each client has its own approved context, assets and review responsibilities. For product companies, the setup includes an owner for keeping product facts and feature claims current. The exact scope follows the problem we agree to solve.</p>
    </div></section>

    <section id="the-90-days" className="page-section wrap"><div className="narrow">
      <h2 className="section-title">the 90-day engagement</h2>
      <NinetyDay />
      <ol className="cs-phases cs-phases-stack">
        <li className="cs-phase"><span className="cs-phase-label">month one</span><h3>understand, decide and build the first version.</h3><p>We work through the business, customer questions, positioning, creative standards and current tools. We agree on what the work needs to achieve, then I build the first version around one useful workflow and the person who will own it.</p></li>
        <li className="cs-phase"><span className="cs-phase-label">month two</span><h3>create and refine.</h3><p>We use it on real work. Your team sees how the pieces fit together, and we turn repeated feedback into better context, instructions and steps.</p></li>
        <li className="cs-phase"><span className="cs-phase-label">month three</span><h3>lead and hand over.</h3><p>Your person takes the lead. We check what they can run, where they still need help and what they need to maintain. The handoff includes the agreed setup, documentation and training.</p></li>
      </ol>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">what your team keeps</h2>
      <p className="cs-body">Your agreed strategy brief, company context, voice and visual examples, reusable skills, templates, workflow instructions and training materials. We also make the tool costs, access and maintenance responsibilities clear.</p>
      <p className="cs-note">Before we start, we agree which files, accounts and instructions your team will own, along with ongoing tool access and costs.</p>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">how we know the handoff is working</h2>
      <p className="cs-body">We agree on a representative task and a quality standard at the beginning. The target is for your internal owner to complete two consecutive agreed cycles without me doing the production for them. We also practice updating the context and handling a step that fails.</p>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">a useful place to start</h2>
      <p className="cs-body">This engagement works best when you have a product or agency offer already in use, real work to improve, and someone who can participate and take ownership. That person might be you, a marketer, an account lead, an assistant or a content team member.</p>
      <p className="cs-body">If you want Veelogg to keep running the process, we can define ongoing responsibility alongside the build.</p>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">questions</h2>
      <dl className="cs-faq">{FAQS.map(([q, a]) => <div key={q} className="cs-faq-item"><dt>{q}</dt><dd>{a}</dd></div>)}</dl>
    </div></section>

    <section className="page-section final-section wrap"><div className="narrow">
      <h2 className="final-title">what would you like your team to handle?</h2>
      <p className="lede-body">Tell me about the business, the task that keeps getting stuck and who could take it over.</p>
      <a className="button button-brown" href="/contact?help=ai-systems">tell me about your workflow <ArrowUpRight size={21} /></a>
    </div></section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <JsonLd data={breadcrumb([["Home", "/"], ["Work with me", "/work-with-me"], ["Brand & Marketing Systems", "/ai-systems"]])} />
  </main><SiteFooter /></>;
}
