// SalesRepOS Landing Page

import NavClient from '@/components/NavClient'
import ScrollReveal from '@/components/ScrollReveal'
import CheckoutButton from '@/components/CheckoutButton'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 1,
    label: 'Pre-Call',
    skills: [
      { name: 'ICP Builder',       command: '/icp-builder' },
      { name: 'Prospect Research', command: '/prospect-research' },
    ],
    description: `Before you dial, you need to know who you're calling and why they'd pick up. The ICP builder defines exactly who you're after. The prospect research skill finds them, reads their signals, and builds a full account brief covering recent news, hiring activity, conversation hooks, likely objections, and a recommended first move. You walk in knowing more than they expect. That's how the first call becomes a second one.`,
  },
  {
    id: 2,
    label: 'Outreach',
    skills: [
      { name: 'Outreach Writer',            command: '/outreach-writer' },
      { name: 'Cold Call Script',           command: '/cold-call-script' },
      { name: 'LinkedIn Profile Optimizer', command: '/linkedin-profile-optimizer' },
    ],
    description: `Generic outreach gets ignored. These three skills write cold emails, LinkedIn DMs, and call openers that reference something real about the person you're contacting. Not a template, not a sequence tool. When your first touch sounds like you did your homework, more people write back.`,
  },
  {
    id: 3,
    label: 'In the Meeting',
    skills: [
      { name: 'Discovery Call Prep',   command: '/discovery-call-prep' },
      { name: 'DQM Appointment Script', command: '/nepq-appointment-script' },
      { name: 'Objection Handler',     command: '/objection-handler' },
    ],
    description: `The discovery call is where deals are made or lost before you ever send a proposal. These skills build your talk track, generate needs-first discovery questions from the account brief, and give you three objection responses before the objection gets raised. You're not winging it. You're prepared.`,
  },
  {
    id: 4,
    label: 'Post-Call',
    skills: [
      { name: 'Call Notes to CRM',   command: '/call-notes-to-crm' },
      { name: 'Follow-up Sequencer', command: '/followup-sequencer' },
      { name: 'Proposal Writer',     command: '/proposal-writer' },
    ],
    description: `The hour after a call is where follow-through either happens or doesn't. Voice dump your notes and get a clean CRM entry, a three-touch follow-up sequence, and a proposal outline in minutes. The reps who lose deals usually lose them here. You won't.`,
  },
  {
    id: 5,
    label: 'Account Management',
    skills: [
      { name: 'Multi-Client Tracker',   command: '/multi-client-tracker' },
      { name: 'Client Activity Report', command: '/client-activity-report' },
    ],
    description: `Multiple accounts means multiple pipeline states, multiple next actions, and multiple weekly updates. The tracker keeps all of it in one view. The client report writes itself from the tracker data, under 400 words and ready to send. You look organized because you are.`,
  },
  {
    id: 6,
    label: 'Lifecycle',
    skills: [
      { name: 'New Client Onboarding', command: '/new-client-onboarding' },
      { name: 'Referral Ask',          command: '/referral-ask' },
      { name: 'Win/Loss Debrief',      command: '/win-loss-debrief' },
      { name: 'Commission Tracker',    command: '/commission-tracker' },
    ],
    description: `From the day you sign a client to the day you ask for a referral, these skills cover the full engagement. Onboarding plan, win/loss debrief, referral ask, and commission tracker. That last one matters — if you've ever let a commission sit for two weeks because you didn't want to write that email, that skill alone covers the difference.`,
  },
]

const FAQ = [
  {
    q: 'Do I need to know how to code or set anything up?',
    a: `No. These are markdown files. You install Claude Code, which takes about five minutes, drop the files into your workspace, and they are ready to use. If you can copy and paste, you can run this stack.`,
  },
  {
    q: 'Do I need a Claude subscription?',
    a: `The free tier works. You do not need Claude Pro or any paid plan to run these skills. If you are already on Pro, they work there too.`,
  },
  {
    q: 'I already use Apollo, LinkedIn Sales Navigator, and a CRM. Does this replace those?',
    a: `No. This works alongside whatever tools you already use. The research skill pulls from web search by default. If you have Apollo or Apify connected it adds depth, but neither is required.`,
  },
  {
    q: 'Can I customize the skills for my specific clients or industry?',
    a: `Yes. They are plain markdown files. Open them in any text editor, add your client context, your tone, your CRM field names. Most buyers spend 10 minutes personalizing each skill once and never touch them again.`,
  },
  {
    q: "What if it does not fit how I sell?",
    a: `Some will and some won't, at least at first. The files are yours to edit. If a skill does not match your process out of the box, change it. That is the point of markdown over a locked SaaS tool.`,
  },
  {
    q: 'Can I transfer these to other AI tools?',
    a: `Yes. They are markdown files. They work with any AI agent that accepts file context including Cursor, Gemini, and ChatGPT projects.`,
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function Cmd({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs bg-navy-deep text-green px-2.5 py-1 rounded border border-navy-muted whitespace-nowrap">
      {children}
    </span>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="#4CAF50" />
      <path d="M4.5 8l2.5 2.5 4-4" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhaseNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="absolute -top-2 -left-1 font-sora font-black text-[5rem] leading-none select-none pointer-events-none"
      style={{ color: 'rgba(30,58,138,0.05)' }}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden pb-28 md:pb-36">
      {/* Logo band */}
      <div className="bg-white mt-16 py-10 flex flex-col items-center justify-center gap-3">
        <img src="/salesrepos-logo.png" alt="SalesRepOS" className="w-[550px] max-w-full h-auto" />
      </div>

      {/* Hero content */}
      <div className="relative max-w-inner mx-auto px-6 pt-16">
        <div className="max-w-3xl">
          <h1 className="font-sora font-black text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-8 hero-anim-1">
            Stop prepping calls<br />in your head.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-[580px] mb-10 hero-anim-2" style={{ color: 'rgba(255,255,255,0.78)' }}>
            SalesRepOS handles the research, outreach, call notes, and follow-up so you spend your time where it actually pays.
          </p>
          <div className="flex flex-wrap gap-4 mb-12 hero-anim-2">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 font-sora font-bold px-7 py-3.5 rounded-lg transition-colors shadow-lg bg-[#4CAF50] text-white hover:bg-[#3d9142]"
            >
              See Pricing
            </a>
          </div>
          <div className="flex flex-wrap gap-3 hero-anim-3">
            {['17 skills', 'One-time payment', 'Instant download'].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 font-sora font-semibold text-sm px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  color: 'rgba(255,255,255,0.90)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: '#4CAF50' }} />
                {label}
              </span>
            ))}
          </div>
          <p className="text-sm mt-4 max-w-lg hero-anim-3" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Each skill is a markdown prompt file — paste it into Claude, ChatGPT, DeepSeek, or any AI you already use. No setup. No lock-in. Modify it to fit your niche in minutes.
          </p>
        </div>
      </div>
    </section>
  )
}

function WorkflowChain() {
  return (
    <section className="bg-[#f8f9fc] border-y border-[#e0e7ff] py-16">
      <ScrollReveal>
        <div className="max-w-inner mx-auto px-6">
          <h2 className="font-sora font-bold text-2xl md:text-3xl text-navy mb-12 text-center reveal">
            The full cycle. Skill by skill.
          </h2>
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            {PHASES.map((phase, i) => (
              <div key={phase.id} className="relative flex-1 flex flex-col reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                {i < PHASES.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 z-10"
                    style={{ right: '-13px' }}
                  >
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
                      <path d="M1 1l10 9-10 9" stroke="#c7d2fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <a
                  href={`#phase-${phase.id}`}
                  className="flex flex-col items-center text-center bg-white border border-[#e0e7ff] rounded-xl px-3 py-5 h-full hover:border-blue hover:shadow-md transition-all duration-200 group mx-1"
                >
                  <span className="font-sora font-black text-2xl text-blue mb-1 group-hover:text-navy transition-colors">
                    {String(phase.id).padStart(2, '0')}
                  </span>
                  <span className="font-sora font-bold text-sm text-navy leading-tight mb-2">
                    {phase.label}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {phase.skills.length} skill{phase.skills.length > 1 ? 's' : ''}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

function SkillsBreakdown() {
  return (
    <section id="skills" className="bg-[#f8f9fc]">
      {PHASES.map((phase) => (
        <div key={phase.id} id={`phase-${phase.id}`} className="py-20 border-b border-[#e0e7ff] last:border-b-0">
          <ScrollReveal>
            <div className="max-w-inner mx-auto px-6">
              <div className="grid md:grid-cols-5 gap-6 md:gap-12">
                <div className="md:col-span-2 relative reveal">
                  <PhaseNumber n={phase.id} />
                  <p className="font-sora font-bold text-xs text-blue uppercase tracking-widest mb-3">
                    Phase {String(phase.id).padStart(2, '0')}
                  </p>
                  <h3 className="font-sora font-black text-3xl md:text-4xl text-navy mb-6 leading-tight">
                    {phase.label}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {phase.description}
                  </p>
                </div>
                <div className="md:col-span-3 flex flex-col gap-3 justify-center">
                  {phase.skills.map((skill, i) => (
                    <div
                      key={skill.command}
                      className="skill-card reveal"
                      style={{ transitionDelay: `${100 + i * 100}ms` }}
                    >
                      <span className="font-sora font-semibold text-navy text-sm">
                        {skill.name}
                      </span>
                      <Cmd>{skill.command}</Cmd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      ))}
    </section>
  )
}

function LiveProof() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(160deg, #0a1f6e 0%, #1E3A8A 100%)' }}>
      <div className="max-w-inner mx-auto px-6">
        <p className="text-base max-w-3xl mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
          A generic prompt gets you a generic answer. A SalesRepOS skill chains the research, formats for your workflow, and remembers your ICP — whether you run it in Claude, ChatGPT, or anything else.
        </p>
        <div className="mb-12">
          <p className="font-sora font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#4CAF50' }}>
            Live output
          </p>
          <h2 className="font-sora font-black text-3xl md:text-4xl text-white mb-4">
            What a real output looks like.
          </h2>
          <p className="text-base max-w-2xl mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Marcus Webb just posted a Head of Sales job at Thornfield Digital. Four days ago. That is your signal. Here is what you send him instead of a resume.
          </p>
          <p className="text-base max-w-xl" style={{ color: '#8fa8e8' }}>
            Input: Thornfield Digital · Contact: Marcus Webb, Founder and CEO · What you sell: Fractional Head of Sales, available in two weeks, no overhead
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Brief card */}
          <div className="terminal-card bg-navy-deep rounded-xl border border-navy-muted overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-navy-muted bg-black/20">
              <span className="w-3 h-3 rounded-full bg-red-400/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <span className="w-3 h-3 rounded-full bg-green/60" />
              <span className="ml-3 font-mono text-xs text-slate-400">/prospect-research → thornfield-digital</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-5">
              <div>
                <p className="font-semibold mb-2" style={{ color: '#4CAF50' }}>COMPANY SNAPSHOT — THORNFIELD DIGITAL</p>
                <div className="text-slate-300 space-y-1 text-xs leading-relaxed">
                  <p><span style={{ color: '#7aa3e8' }}>Industry</span>   B2B SaaS, project management software for construction firms</p>
                  <p><span style={{ color: '#7aa3e8' }}>Headcount</span>  55 (est.), growing</p>
                  <p><span style={{ color: '#7aa3e8' }}>Revenue</span>    $4.1M ARR (est. based on headcount and SaaS benchmarks)</p>
                  <p><span style={{ color: '#7aa3e8' }}>HQ</span>         Denver, CO</p>
                  <p><span style={{ color: '#7aa3e8' }}>Stage</span>      Post-seed, pre-Series A</p>
                  <p><span style={{ color: '#7aa3e8' }}>Signal 1</span>   Head of Sales job posted LinkedIn, 4 days ago, $120k-$150k base</p>
                  <p><span style={{ color: '#7aa3e8' }}>Signal 2</span>   Two SDR roles posted same week, suggests building a sales org from scratch</p>
                  <p><span style={{ color: '#7aa3e8' }}>Signal 3</span>   14 new construction firm logos added to website case studies page in last 90 days</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: '#4CAF50' }}>DECISION MAKER — MARCUS WEBB, FOUNDER AND CEO</p>
                <div className="text-slate-300 space-y-1 text-xs leading-relaxed">
                  <p><span style={{ color: '#7aa3e8' }}>Tenure</span>          6 years at Thornfield, founded after 8 years in construction project management</p>
                  <p><span style={{ color: '#7aa3e8' }}>Pattern</span>         Founder-led sales until now. Posting a Head of Sales means he is ready to hand it off but has never hired one before.</p>
                  <p><span style={{ color: '#7aa3e8' }}>LinkedIn activity</span> Posted two weeks ago about closing their largest contract to date, a 200-unit residential developer in Phoenix. Tone was personal and proud.</p>
                  <p><span style={{ color: '#7aa3e8' }}>Likely concern</span>  Hiring a full-time Head of Sales at $150k plus equity is a big commitment for a $4M ARR company. He may not know fractional is an option.</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: '#4CAF50' }}>RECOMMENDED FIRST MOVE</p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  LinkedIn message today. Reference the job posting directly. Offer one specific insight about his stage. One question at the end. Under 75 words. Do not send a resume.
                </p>
              </div>
            </div>
          </div>

          {/* Outreach copy card */}
          <div className="terminal-card bg-navy-deep rounded-xl border border-navy-muted overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-navy-muted bg-black/20">
              <span className="w-3 h-3 rounded-full bg-red-400/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <span className="w-3 h-3 rounded-full bg-green/60" />
              <span className="ml-3 font-mono text-xs text-slate-400">/outreach-writer → thornfield brief</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-6">
              <div>
                <p className="font-semibold mb-3" style={{ color: '#4CAF50' }}>COLD EMAIL</p>
                <div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed">
                  <p className="text-slate-300 mb-2">
                    <span className="text-slate-400">Subject: </span>
                    <span className="text-white">Head of Sales at Thornfield, different option</span>
                  </p>
                  <div className="border-t border-navy-muted pt-3 text-slate-300 space-y-3">
                    <p>Saw the Head of Sales posting four days ago. Before the interview process starts, worth considering a fractional option.</p>
                    <p>I work with B2B SaaS founders at your stage, typically $6k-$9k a month. No equity, no benefits overhead, available in two weeks. You get a senior sales leader who builds the playbook and closes deals while you run the search for a permanent hire if that is still the right call.</p>
                    <p>Saw the Phoenix developer win on LinkedIn. That is the kind of deal that signals it is time to build the system around it.</p>
                    <p>20 minutes this week?</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3" style={{ color: '#4CAF50' }}>LINKEDIN DM</p>
                <div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-slate-300">
                  Marcus, saw the Head of Sales posting. Before you go four months into a full-time search, I work fractionally with SaaS founders at your stage. $6k-$9k a month, no equity, available in two weeks. You keep control, I build the pipeline system and close deals while you figure out the permanent hire. Congrats on the Phoenix win by the way. That is exactly the stage where this conversation makes sense. 15 minutes this week?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="pricing-bg py-24">
      <ScrollReveal>
        <div className="max-w-inner mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="font-sora font-black text-4xl md:text-5xl text-white mx-auto" style={{ maxWidth: '800px' }}>
              No subscription. No seat fees. Buy it once, use it on every deal you work.
            </h2>
            <p className="text-base mt-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Each skill is a plain markdown file — works with Claude Code, ChatGPT, Cursor, or any AI you already use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Core Stack */}
            <div className="pricing-card-ghost reveal flex flex-col">
              <div className="mb-6">
                <p className="font-sora font-bold text-sm uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Core Stack</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-sora font-black text-5xl text-white">$67</span>
                </div>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.50)' }}>one-time payment</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  The 7 essential skills covering the core sales workflow — from research to follow-up.
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'ICP Builder + Prospect Research',
                  'Outreach Writer + Cold Call Script',
                  'Discovery Call Prep',
                  'Call Notes to CRM + Follow-up Sequencer',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    <CheckIcon />
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton priceId="price_1TYUluHhw9qqOoDRRTsLxz5H" className="pricing-ghost-btn">
                Get Core Stack — $67
              </CheckoutButton>
            </div>

            {/* Full OS */}
            <div className="pricing-card-featured reveal flex flex-col relative" style={{ transitionDelay: '100ms' }}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="text-white font-sora font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wide" style={{ backgroundColor: '#4CAF50' }}>
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <p className="font-sora font-bold text-sm text-blue uppercase tracking-widest mb-2">Full OS</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-sora font-black text-5xl text-navy">$127</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">one-time payment</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  All 17 skills covering the complete sales cycle — from ICP building and prospect research through commission tracking.
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'All 17 skills — full OS, nothing held back',
                  'DQM Appointment Script, Objection Handler, Cold Call Script',
                  'Proposal Writer, LinkedIn Profile Optimizer, ICP Builder',
                  'Win/Loss Debrief, Referral Ask, New Client Onboarding, Commission Tracker',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-2.5 text-sm text-navy">
                    <CheckIcon />
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton priceId="price_1TYUlwHhw9qqOoDRgcwcP0Mi" className="block w-full text-center bg-navy text-white font-sora font-bold py-3.5 rounded-lg hover:bg-navy-muted transition-colors">
                Get Full OS — $127
              </CheckoutButton>
            </div>

          </div>
          <div className="flex items-start justify-center gap-3 mt-10 max-w-xl mx-auto reveal">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" style={{ color: '#4CAF50' }}>
              <path d="M10 2L3 6v5c0 4.418 3.134 8.147 7 9 3.866-.853 7-4.582 7-9V6l-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm text-left" style={{ color: 'rgba(255,255,255,0.75)' }}>
              <span className="font-semibold text-white">No-risk guarantee.</span> Try any three skills. If they don&rsquo;t save you two hours in your first week, reply to your receipt email for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="bg-white py-24">
      <ScrollReveal>
        <div className="max-w-inner mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-sora font-black text-3xl md:text-4xl text-navy mb-12 text-center reveal">
              Things worth knowing before you buy.
            </h2>
            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <details
                  key={item.q}
                  className="group bg-white border border-[#e0e7ff] rounded-xl overflow-hidden reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer hover:bg-[#f8f9fc] transition-colors">
                    <span className="font-sora font-semibold text-navy text-base">{item.q}</span>
                    <svg
                      className="faq-chevron w-5 h-5 text-blue flex-shrink-0 transition-transform duration-200"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 pt-1">
                    <p className="text-slate-600 leading-relaxed text-base">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(160deg, #0a1f6e 0%, #1E3A8A 100%)' }}>
      <ScrollReveal>
        <div className="max-w-inner mx-auto px-6 text-center">
          <h2 className="font-sora font-black text-3xl md:text-4xl text-white mb-6 max-w-2xl mx-auto leading-tight reveal">
            You don&rsquo;t need more tools. You need less time between &ldquo;I got off a call&rdquo; and &ldquo;everything&rsquo;s logged and the follow-up is out.&rdquo;
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-10 reveal reveal-d1">
            <CheckoutButton priceId="price_1TYUlwHhw9qqOoDRgcwcP0Mi" className="inline-flex items-center gap-2 text-white font-sora font-bold px-8 py-4 rounded-lg transition-colors shadow-lg bg-[#4CAF50] hover:bg-[#3d9142]">
              Get SalesRepOS
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </CheckoutButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-navy-muted py-10">
      <div className="max-w-inner mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-sora font-bold text-lg text-white tracking-tight">
          SalesRep<span style={{ color: '#4CAF50' }}>OS</span>
        </span>
        <p className="text-sm" style={{ color: '#6b82b8' }}>
          © 2026 Obtainr LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <NavClient />
      <main>
        <Hero />
        <WorkflowChain />
        <SkillsBreakdown />
        <LiveProof />
        <Pricing />
        <FaqSection />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
