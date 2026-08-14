import type { Locale } from "@/lib/site";
import { formatNumber } from "@/lib/format";
import { benchmarks } from "@/content/benchmarks";

export interface RoleContent {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  intro: string[];
  inPod: { title: string; items: { title: string; body: string }[] };
  stack: { title: string; items: string[] };
  profile: {
    title: string;
    name: string;
    summary: string;
    facts: { label: string; value: string }[];
    note: string;
  };
  savings: { title: string; body: string; band: string };
  faq: { q: string; a: string }[];
  cta: string;
}


/**
 * The chip on each role card.
 *
 * It used to restate a savings percentage per role, which drifted out of step with
 * the calculator (and with itself: two different bands were published for the same
 * claim). It now states the pod seat price, which is a fact we control and cannot
 * get wrong — the per-market saving is the calculator's job, and it varies enough
 * by market that a single number on a card was never honest.
 */
function podSeatBand(slug: string, locale: Locale): string {
  const price = benchmarks.find((b) => b.roleSlug === slug)?.pod ?? 2000;
  return locale === "en"
    ? `From €${formatNumber(price, "en")}/month, all-in`
    : `Da €${formatNumber(price, "it")}/mese, tutto incluso`;
}

export const roleSlugs = [
  "paid-media",
  "seo",
  "content-social",
  "design",
  "marketing-automation",
  "development",
] as const;

export const roles: Record<Locale, Record<string, RoleContent>> = {
  en: {
    "paid-media": {
      slug: "paid-media",
      name: "Paid media / Media buyer",
      h1: "Hire an offshore paid media specialist",
      seoTitle: "Hire an Offshore Paid Media Specialist | enable.talent",
      seoDescription:
        "Dedicated, managed paid media specialists in Nairobi for European agencies. Senior European QA on every account. From €2,000/month, 2-week paid trial.",
      tagline: "Campaigns built, launched and optimised daily — reviewed by a senior European buyer before your client sees a number.",
      intro: [
        "Paid media is where agency margins go to die: clients demand daily optimisation, platforms change weekly, and a good media buyer in Germany costs €3,600–5,200 a month before overhead. Most agencies respond by overloading one senior buyer across too many accounts — and performance quietly decays.",
        "A pod paid media specialist takes the operational layer off that senior buyer's desk: campaign builds, audience and creative testing matrices, budget pacing, negative lists, weekly reporting. Your strategist decides; the pod executes and documents. Every account change and every report passes through your pod's senior European QA lead before it reaches the client.",
        "This is not a freelancer juggling five agencies. Your specialist works only on your accounts, in your naming conventions, inside your reporting templates, on your business hours — Nairobi runs just 1–2 hours ahead of Central Europe.",
        "The QA layer is where paid media pods earn their keep. Senior marketers from Enable Digital, our Italian sister agency, review account structure, budget pacing and every client-facing report before it ships. When a campaign underperforms, the QA lead flags it to you first — with a diagnosis and a proposed fix, not a surprise in the monthly call. You stay the strategist in front of the client; the pod keeps the machine running underneath.",
      ],
      inPod: {
        title: "What a paid media specialist does inside your pod",
        items: [
          { title: "Campaign builds & restructures", body: "Search, PMax, Meta, LinkedIn — built from your media plan, with naming conventions and UTM discipline your team can audit." },
          { title: "Daily optimisation", body: "Budget pacing, bid strategy adjustments, search-term mining, audience exclusions, creative rotation. Logged, so nothing happens silently." },
          { title: "Testing programmes", body: "Structured creative and audience tests with hypotheses and stop-rules, not random duplicate-and-tweak." },
          { title: "Reporting your clients can read", body: "Looker Studio dashboards and weekly commentary drafted for the client, QA'd by a senior European buyer before sending." },
          { title: "Tracking & measurement upkeep", body: "Conversion tracking checked on a regular cadence: GA4 events, tag firing, consent gaps and broken UTMs caught before they poison a month of data." },
          { title: "Landing page feedback loop", body: "The specialist flags message mismatch and speed problems between ads and landing pages, handing your designers and developers concrete fixes instead of vague hunches." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "GA4", "Google Tag Manager", "Looker Studio", "Excel / Sheets modelling", "Server-side tracking basics"],
      },
      profile: {
        title: "A profile from our bench",
        name: "P., 29 — Nairobi",
        summary:
          "Four years running performance accounts for East African e-commerce and fintech brands, the last two managing ad spend across Google and Meta for international clients. Google Ads certified, GA4-native, writes clear English reporting commentary.",
        facts: [
          { label: "Experience", value: "4+ years performance marketing" },
          { label: "English", value: "Fluent, written & spoken" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "We publish the media-buyer figures for Italy, Germany and the UK — and everything a salary line leaves out — on our [European salary benchmarks](/marketing-salaries) page, so you can check the comparison instead of taking it on trust.",
        band: podSeatBand("paid-media", "en"),
      },
      faq: [
        {
          q: "Who owns the ad accounts?",
          a: "You or your client, always. The pod works in your accounts with agency-managed access. Nothing is held hostage in ours.",
        },
        {
          q: "Can the specialist talk to my clients?",
          a: "Default is white-label: your team fronts, the pod executes. If you want, the European QA lead joins client calls as your delivery voice.",
        },
        {
          q: "How fast can they take over live accounts?",
          a: "Onboarding a live account typically takes the first week: access, audit, naming conventions, reporting handover. Full operating speed within the 2-week trial.",
        },
        {
          q: "What happens if the specialist leaves or underperforms?",
          a: "Free replacement within 60–90 days, and the pod structure makes handover boring by design: naming conventions, test logs and reporting history are documented, so a new specialist inherits a working system, not a blank slate.",
        },
      ],
      cta: "Scope a paid media pod",
    },
    seo: {
      slug: "seo",
      name: "SEO specialist",
      h1: "Hire an offshore SEO specialist",
      seoTitle: "Hire an Offshore SEO Specialist | enable.talent",
      seoDescription:
        "Dedicated SEO specialists for European agencies: audits, briefs, on-page and reporting from Nairobi, QA'd by senior European SEOs. From €2,000/month.",
      tagline: "The unglamorous 80% of SEO — audits, briefs, on-page, tracking — done consistently, so your strategists can strategise.",
      intro: [
        "Every agency sells SEO retainers; few can staff them profitably. An SEO specialist runs €2,400/month in Italy (median salary around €35,000) and €3,500–4,500 in Germany — for work that is largely systematic: crawls, audits, briefs, on-page implementation, internal linking, tracking hygiene.",
        "A pod SEO specialist owns that systematic layer. They run the crawls and turn them into prioritised fixes, write content briefs from your keyword strategy, implement on-page changes, monitor Search Console, and keep the reporting honest. Your senior SEO sets direction and reviews the output — or ours does, as your QA layer.",
        "The result: your retainers stop depending on whether your one senior SEO had a free afternoon. Deliverables ship weekly, documented, in your templates.",
        "QA in SEO means catching the expensive mistakes before they compound. A senior European SEO from Enable Digital, our Italian sister agency, reviews every audit, brief and monthly report before it leaves the pod — checking that recommendations are defensible, priorities match business impact, and nothing lands in a client deck that you would not sign yourself. Implementation gets verified against the brief with a documented checklist, not a glance.",
      ],
      inPod: {
        title: "What an SEO specialist does inside your pod",
        items: [
          { title: "Technical audits & fixes", body: "Screaming Frog / Semrush crawls turned into a prioritised, developer-ready backlog — and implemented where access allows." },
          { title: "Content briefs & optimisation", body: "SERP-driven briefs your writers can execute, plus on-page optimisation of existing money pages." },
          { title: "Internal linking & structure", body: "Systematic internal link programmes and information architecture recommendations, mapped to your keyword clusters." },
          { title: "Tracking & reporting", body: "GA4 + Search Console dashboards, rank tracking, monthly narratives that clients understand, QA'd before sending." },
          { title: "Migration & launch support", body: "Redirect maps, pre- and post-launch crawl comparisons and indexation monitoring for site migrations — the moments when retainers are won or lost." },
          { title: "Local & marketplace SEO", body: "Google Business Profile upkeep, local landing pages and structured data for multi-location clients, run as a repeatable monthly routine." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["Semrush", "Ahrefs", "Screaming Frog", "Google Search Console", "GA4", "WordPress", "Webflow", "Basic HTML/CSS", "Looker Studio", "Surfer / NLP tools"],
      },
      profile: {
        title: "A profile from our bench",
        name: "S., 31 — Nairobi",
        summary:
          "Five years of SEO for publishers and B2B services, including two years inside a UK-facing agency team. Comfortable across technical and content work; writes briefs in structured English that copywriters actually follow.",
        facts: [
          { label: "Experience", value: "5 years SEO, agency-side" },
          { label: "English", value: "Fluent, written & spoken" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "The Italian, German and UK figures we work from, with their sources and their weak spots attached, live on our [European salary benchmarks](/marketing-salaries) page rather than being restated here.",
        band: podSeatBand("seo", "en"),
      },
      faq: [
        {
          q: "Can they write content too?",
          a: "They write briefs, metadata and on-page copy natively. For long-form content in Italian, German or Spanish, pair them with your writers or add a content specialist to the pod — briefs and QA keep the quality consistent.",
        },
        {
          q: "Do they do link building?",
          a: "Outreach operations, prospecting and tracking, yes — within white-hat programmes you define. We don't run PBNs or buy links, and we'll say so to your clients' faces if useful.",
        },
        {
          q: "How do you QA SEO work?",
          a: "Every audit, brief and report passes a senior European SEO before delivery. Implementation is checked against the brief with a documented checklist.",
        },
        {
          q: "How many client retainers can one specialist carry?",
          a: "It depends on scope, which is why we scope before we sell. In the trial we map your current retainers against the specialist's weekly capacity and agree a realistic load — overpromising is how offshore SEO gets its bad name, and we would rather lose the deal than repeat it.",
        },
      ],
      cta: "Scope an SEO pod",
    },
    "content-social": {
      slug: "content-social",
      name: "Content & Social specialist",
      h1: "Hire an offshore content & social specialist",
      seoTitle: "Hire an Offshore Content & Social Specialist | enable.talent",
      seoDescription:
        "Dedicated content and social specialists for agencies: calendars, copy, community and reporting from Nairobi, QA'd in Europe. From €2,000/month.",
      tagline: "Calendars filled, posts shipped, communities answered — every week, in your brand's voice, with European review.",
      intro: [
        "Content and social retainers are volume businesses: every client needs calendars, copy variants, scheduling, community management and monthly reports. In the UK a social media specialist costs around £3,000–4,500 a month; in Italy €1,500–2,000 — and they still only cover so many clients before quality slips.",
        "A pod content & social specialist industrialises that volume. They draft calendars from your strategy, write English-language copy natively, adapt formats per channel, schedule, monitor and report. The European QA lead reviews tone and brand fit before anything is queued — so 'offshore' never shows up in your clients' feeds.",
        "For non-English markets, the pod works brief-to-draft: your local team polishes language while the pod carries research, structure, visuals coordination and operations — usually the real bottleneck.",
        "Tone of voice is where offshore content usually fails, so that is where the QA layer concentrates. The senior European reviewers from Enable Digital, our Italian sister agency, hold every calendar and every batch of copy against the client's brand book before it reaches your approval flow. Misreads get caught and corrected inside the pod, with the correction fed back into the specialist's brief — so the same mistake does not come back next month.",
      ],
      inPod: {
        title: "What a content & social specialist does inside your pod",
        items: [
          { title: "Editorial calendars", body: "Monthly calendars per client, mapped to campaigns and content pillars, delivered for approval in your template." },
          { title: "Copy & adaptation", body: "Native-quality English copy; structured drafts for other languages, ready for local polish. Format adaptation per channel." },
          { title: "Scheduling & community", body: "Queue management across Meta, LinkedIn, TikTok and X; comment and DM triage with escalation rules you define." },
          { title: "Social reporting", body: "Monthly performance reports with commentary clients can actually read, QA'd before sending." },
          { title: "Short-form video operations", body: "Cutting, captioning and resizing short-form video from your raw footage or templates — the production grind behind Reels and TikTok that eats your team's afternoons." },
          { title: "Research & repurposing", body: "Topic research, competitor monitoring and systematic repurposing of long-form content into channel-ready formats, so one asset feeds a month of posts." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["Meta Business Suite", "LinkedIn", "TikTok", "Buffer / Hootsuite / Later", "Canva", "Figma (handoff)", "CapCut", "Notion", "GA4 basics"],
      },
      profile: {
        title: "A profile from our bench",
        name: "C., 27 — Nairobi",
        summary:
          "Three years managing social for consumer brands and a pan-African media company; ran multi-market calendars in English with 30+ posts a week. Strong writer, fast with short-form video editing.",
        facts: [
          { label: "Experience", value: "3+ years social & content" },
          { label: "English", value: "Fluent — writes native-quality copy" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "This is the one seat where an Italian salary on its own can undercut a pod, which is exactly why the figures sit on our [European salary benchmarks](/marketing-salaries) page instead of being summarised into a flattering line here.",
        band: podSeatBand("content-social", "en"),
      },
      faq: [
        {
          q: "Will the copy sound offshore?",
          a: "English copy is written natively and reviewed by the European QA lead for brand voice. For Italian, German or Spanish, the pod delivers structured drafts your local team polishes — the operational lift is still off your desk.",
        },
        {
          q: "Can they handle community management SLAs?",
          a: "Yes — response windows are defined in the pod SLA, and Nairobi's timezone means coverage during your actual business day, not asynchronous batches.",
        },
        {
          q: "Do they make the visuals too?",
          a: "Templated visuals in Canva/Figma, yes. For original design systems, add a pod designer — the two roles work as one delivery line.",
        },
        {
          q: "How does approval work day to day?",
          a: "Calendars and copy land in your existing approval tool — Notion, Trello, whatever you run — already QA'd. Your team approves or comments; the pod handles revisions and scheduling. You review work, you don't chase it.",
        },
      ],
      cta: "Scope a content pod",
    },
    design: {
      slug: "design",
      name: "Designer",
      h1: "Hire an offshore marketing designer",
      seoTitle: "Hire an Offshore Marketing Designer | enable.talent",
      seoDescription:
        "Dedicated marketing designers for agencies: ad creative, social kits and landing pages from Nairobi, art-directed and QA'd in Europe. 2-week paid trial.",
      tagline: "Ad creative, social kits and landing pages on production speed — art direction stays with you, or with our senior QA.",
      intro: [
        "Design is the first bottleneck agencies feel when campaign volume grows: every paid media test needs variants, every social calendar needs assets, every campaign needs a landing page — and senior EU designers are booked, expensive, or both.",
        "A pod designer is a production-grade marketing designer: fast, systematic, fluent in your design system. They take art direction from your creative lead (or from our senior QA) and turn it into shippable assets — correctly named, correctly sized, delivered in the formats your channels need.",
        "The QA layer matters double in design: nothing reaches your clients without review against the brand book. Revisions happen inside the pod, not in your client's inbox.",
        "In practice that review is run by senior people at Enable Digital, our Italian sister agency, who check each delivery against the brief and the brand system — typography, spacing, colour usage, file hygiene, export specs. When something is off, it goes back to the designer with a written note, and the note becomes part of the working checklist. Over the first weeks the checklist converges on your standards, and rejection rates drop — that is the point of a managed pod over a rotating cast of freelancers.",
      ],
      inPod: {
        title: "What a designer does inside your pod",
        items: [
          { title: "Ad & social creative", body: "Static and light-motion variants for Meta, Google, LinkedIn and TikTok test matrices — batched, on naming convention." },
          { title: "Landing pages", body: "Design in Figma on your system, ready for build in Webflow/WordPress — or built by the pod's developer." },
          { title: "Brand collateral", body: "Decks, one-pagers, report covers, event assets. The recurring production work that eats senior designers' weeks." },
          { title: "Design system hygiene", body: "Component libraries and templates kept clean, so every next asset is faster than the last." },
          { title: "Email & campaign design", body: "Newsletter and campaign email layouts designed on tested modules, ready for the automation specialist or your team to build." },
          { title: "Creative refresh cycles", body: "Systematic refresh of fatigued ad creative from performance data — new angles on winning concepts, delivered before CTR decay becomes a client conversation." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["Figma", "Adobe Photoshop", "Illustrator", "After Effects (basics)", "Canva (templated systems)", "Webflow handoff", "Motion for social", "Brand systems"],
      },
      profile: {
        title: "A profile from our bench",
        name: "D., 28 — Nairobi",
        summary:
          "Five years in digital design across a Nairobi studio and freelance international clients; portfolio spans fintech, FMCG and NGO campaign work. Systematic with components, fast on creative batching, comfortable receiving European art direction.",
        facts: [
          { label: "Experience", value: "5 years digital & brand design" },
          { label: "English", value: "Fluent, written & spoken" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "Designer pay moves too much by market and seniority for a single number here to be honest, so the salary data we use — and the costs a salary line hides — sit on our [European salary benchmarks](/marketing-salaries) page.",
        band: podSeatBand("design", "en"),
      },
      faq: [
        {
          q: "Who does art direction?",
          a: "You do, if you have a creative lead — the pod executes at production speed. If you don't, our senior European QA sets and enforces direction from your brand book.",
        },
        {
          q: "What about revisions?",
          a: "Internal revision loops happen before delivery: brief → draft → QA → delivery. Your client-facing revision rounds land on work that has already been reviewed once.",
        },
        {
          q: "Can they do video?",
          a: "Short-form social motion and creative-variant editing, yes. Full video production (shoots, long-form edit) is outside pod scope — we'll say so rather than fake it.",
        },
        {
          q: "How do you brief a pod designer?",
          a: "Through your existing brief format, or ours if you don't have one: objective, references, copy, formats, deadline. The first briefs take longer; by week three the designer knows your clients' systems and briefs shrink to bullet points.",
        },
      ],
      cta: "Scope a design pod",
    },
    "marketing-automation": {
      slug: "marketing-automation",
      name: "Marketing automation specialist",
      h1: "Hire an offshore marketing automation specialist",
      seoTitle: "Hire a Marketing Automation Specialist | enable.talent",
      seoDescription:
        "Dedicated marketing automation specialists: HubSpot, Klaviyo and Mailchimp flows, CRM hygiene and reporting — managed from Nairobi, QA'd in Europe.",
      tagline: "Flows built, CRMs cleaned, emails shipped on schedule — the systematic work that automation platforms promise and agencies end up doing by hand.",
      intro: [
        "Marketing automation retainers have a dirty secret: platforms like HubSpot and Klaviyo don't run themselves. Someone has to build the flows, segment the lists, test the emails, clean the CRM and keep attribution honest — and that someone is usually a senior consultant whose time is worth 4x the task.",
        "A pod automation specialist owns the build-and-run layer: journey builds from your architecture, email production and testing, list hygiene, lead scoring maintenance, integration monitoring and campaign reporting. Your consultants keep the strategy and the client relationship.",
        "Every flow goes live only after the European QA lead has walked the journey end-to-end as a subscriber would. Broken automations get found by us, not by your client's prospects.",
        "That QA lead sits at Enable Digital, our Italian sister agency, and works from a launch checklist: entry and exit conditions, suppression logic, rendering across major clients, link and UTM checks, unsubscribe compliance, and a test contact pushed through every branch. The same discipline applies to changes on live flows — because most automation disasters are not bad builds, they are unreviewed edits made in a hurry on a Friday.",
      ],
      inPod: {
        title: "What an automation specialist does inside your pod",
        items: [
          { title: "Journey & flow builds", body: "Welcome, nurture, cart, winback and lifecycle flows built in HubSpot, Klaviyo, Mailchimp or ActiveCampaign from your architecture." },
          { title: "Email production", body: "Template-based email builds with proper testing across clients and devices — copy from your team or the pod's content specialist." },
          { title: "CRM hygiene & scoring", body: "Deduplication, field discipline, list segmentation and lead-scoring maintenance nobody in your team wants to own." },
          { title: "Reporting & attribution", body: "Flow and campaign performance dashboards with QA'd monthly commentary, tied to pipeline where the data allows." },
          { title: "Deliverability upkeep", body: "List hygiene, sunset policies, domain and sender monitoring — the maintenance that keeps client email out of spam and off blocklists." },
          { title: "Documentation & handover", body: "Every flow documented with its logic, owners and dependencies, so accounts survive personnel changes on your side or ours." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["HubSpot", "Klaviyo", "Mailchimp", "ActiveCampaign", "Zapier / Make", "GA4", "Basic HTML for email", "Segment basics", "Looker Studio"],
      },
      profile: {
        title: "A profile from our bench",
        name: "M., 30 — Nairobi",
        summary:
          "Four years in CRM and email marketing for e-commerce and SaaS, including HubSpot administration for a 40-person company. Certified in HubSpot Marketing Hub and Klaviyo; debugs a broken workflow faster than most consultants brief one.",
        facts: [
          { label: "Experience", value: "4 years automation & CRM" },
          { label: "English", value: "Fluent, written & spoken" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "Rather than quote a range on every role page, we keep the salary data and the employer costs that stack on top of it in one maintained place: our [European salary benchmarks](/marketing-salaries) page.",
        band: podSeatBand("marketing-automation", "en"),
      },
      faq: [
        {
          q: "Can they design the automation strategy?",
          a: "They contribute, but strategy stays with your consultants or our QA lead. The pod's job is flawless build-and-run — which is what actually breaks in most retainers.",
        },
        {
          q: "What platforms do you cover?",
          a: "HubSpot, Klaviyo, Mailchimp and ActiveCampaign natively; Zapier/Make for glue. Exotic stacks: ask — we'll be honest about ramp-up time.",
        },
        {
          q: "How do you handle client data in CRMs?",
          a: "DPA + Standard Contractual Clauses in every contract, least-privilege access, and activity logs. GDPR is covered contractually before a specialist ever touches a record.",
        },
        {
          q: "Can they take over a messy existing setup?",
          a: "That is the most common starting point. The first weeks are an audit: mapping live flows, dead lists, conflicting workflows and orphaned properties, then fixing in priority order. You get a documented account instead of one nobody dares touch.",
        },
      ],
      cta: "Scope an automation pod",
    },
    development: {
      slug: "development",
      name: "Developer",
      h1: "Hire an offshore web developer",
      seoTitle: "Hire an Offshore Web Developer | enable.talent",
      seoDescription:
        "Dedicated developers for agency delivery: WordPress, Webflow, Shopify and Next.js builds from Nairobi, code-reviewed under European QA. From €2,400/month.",
      tagline: "Landing pages, sites and storefronts shipped on schedule — with code review, staging discipline and no heroics.",
      intro: [
        "Agency dev work is feast-or-famine: three site builds this month, none the next. Hiring a mid-level developer in Germany costs €5,000–6,500 a month whether the pipeline is full or not — so the work goes to overbooked freelancers, and deadlines start to drift.",
        "A pod developer gives you dedicated build capacity at a fraction of that: WordPress and Webflow sites, Shopify storefronts, landing pages, tracking implementations and the endless stream of 'small changes' that block your marketing team. Nairobi has real engineering depth — mid-level developers trained in an ecosystem where Google, Microsoft and Safaricom recruit.",
        "Delivery discipline is the differentiator: version control, staging environments, and review under the pod's European QA before anything touches production. Speed without cowboy deploys.",
        "The QA layer for development is run from Enable Digital, our Italian sister agency, and it is deliberately unromantic: pull requests reviewed before merge, a launch checklist covering responsive behaviour, forms, tracking, performance and accessibility basics, and staging sign-off before anything ships. When a deadline is at risk, you hear it from the pod lead early — with options — rather than discovering it at the handover date.",
      ],
      inPod: {
        title: "What a developer does inside your pod",
        items: [
          { title: "Site & landing page builds", body: "WordPress, Webflow and Shopify builds from your designs — pixel-faithful, responsive, on deadline." },
          { title: "Frontend development", body: "Next.js / React work for headless builds and web apps where the project calls for real code." },
          { title: "Tracking & integrations", body: "GTM containers, GA4 events, pixel and CAPI implementations, CRM and form integrations — tested, documented." },
          { title: "Maintenance & change queue", body: "The 'can we quickly change…' queue handled inside SLA, so client sites stop being your bottleneck." },
          { title: "Performance & Core Web Vitals", body: "Speed audits and fixes on existing client sites — images, scripts, hosting configuration — measured before and after, not asserted." },
          { title: "Email template development", body: "Responsive HTML email builds for the automation stack, tested across major clients, so campaigns render the way the designer intended." },
        ],
      },
      stack: {
        title: "Skills & stack",
        items: ["WordPress / PHP", "Webflow", "Shopify / Liquid", "JavaScript / TypeScript", "React / Next.js", "HTML/CSS/Tailwind", "Git", "GTM / GA4", "REST APIs"],
      },
      profile: {
        title: "A profile from our bench",
        name: "K., 27 — Nairobi",
        summary:
          "Software engineering background via Moringa School plus four years shipping web work for agencies and startups — WordPress and Shopify in production, React for two SaaS frontends. Writes documented, reviewable code and actually enjoys tracking implementations.",
        facts: [
          { label: "Experience", value: "4 years web development" },
          { label: "English", value: "Fluent, written & spoken" },
          { label: "Timezone", value: "UTC+3 (CET +1/+2h)" },
          { label: "Pay", value: "2–4x local market rate" },
        ],
        note: "Profiles are anonymised until a scoping call — our specialists get poached enough as it is.",
      },
      savings: {
        title: "What you save",
        body: "Development has the widest salary spread of any role we staff, so we keep the Italian, German and UK figures next to the pod seat price on our [European salary benchmarks](/marketing-salaries) page.",
        band: podSeatBand("development", "en"),
      },
      faq: [
        {
          q: "Who reviews the code?",
          a: "Every merge passes review — by your tech lead if you have one, or under our QA process with senior oversight. Staging before production, always.",
        },
        {
          q: "Can they work in our repos and tooling?",
          a: "Yes — your Git hosting, your CI, your project management. Least-privilege access, and everything contractually covered by DPA.",
        },
        {
          q: "Backend and app development too?",
          a: "The sweet spot is web delivery for marketing: sites, storefronts, landing pages, tracking. For deep backend or mobile products, we'll tell you straight and help you scope elsewhere.",
        },
        {
          q: "How do you handle urgent fixes?",
          a: "Priority levels are set in the pod SLA, and the Nairobi timezone means the developer is online through your whole working day — a morning emergency gets picked up in the morning, not in another hemisphere's tomorrow.",
        },
      ],
      cta: "Scope a dev pod",
    },
  },
  it: {
    "paid-media": {
      slug: "paid-media",
      name: "Paid media / Media buyer",
      h1: "Assumi uno specialist paid media offshore",
      seoTitle: "Assumi uno Specialist Paid Media Offshore | enable.talent",
      seoDescription:
        "Media buyer dedicati e gestiti da Nairobi per agenzie europee. QA senior europeo su ogni account. Da €2.000/mese, trial retribuito di 2 settimane.",
      tagline: "Campagne costruite, lanciate e ottimizzate ogni giorno — riviste da un buyer senior europeo prima che il tuo cliente veda un numero.",
      intro: [
        "Il paid media è dove muoiono i margini delle agenzie: i clienti pretendono ottimizzazione quotidiana, le piattaforme cambiano ogni settimana, e un buon media buyer in Germania costa €3.600–5.200 al mese prima dell'overhead. La risposta tipica è sovraccaricare un buyer senior su troppi account — e la performance decade in silenzio.",
        "Uno specialist paid media in pod toglie il livello operativo dalla scrivania di quel senior: build delle campagne, matrici di test su audience e creatività, pacing dei budget, liste negative, reporting settimanale. Il tuo strategist decide; il pod esegue e documenta. Ogni modifica e ogni report passa dal QA lead senior europeo del pod prima di arrivare al cliente.",
        "Non è un freelance che si destreggia tra cinque agenzie. Il tuo specialist lavora solo sui tuoi account, con le tue naming convention, nei tuoi template di reporting, nel tuo orario — Nairobi è solo 1–2 ore avanti rispetto all'Europa centrale.",
        "Il layer di QA è dove il pod paid media si guadagna il prezzo. I marketer senior di Enable Digital, la nostra agenzia sorella italiana, rivedono struttura degli account, pacing dei budget e ogni report destinato al cliente prima che parta. Quando una campagna va male, è il QA lead ad avvisarti per primo — con una diagnosi e una proposta di correzione, non con una sorpresa nella call mensile. Davanti al cliente lo strategist resti tu; il pod tiene in moto la macchina sotto.",
      ],
      inPod: {
        title: "Cosa fa uno specialist paid media nel tuo pod",
        items: [
          { title: "Build e ristrutturazioni", body: "Search, PMax, Meta, LinkedIn — costruite dal tuo media plan, con naming convention e disciplina UTM che il tuo team può auditare." },
          { title: "Ottimizzazione quotidiana", body: "Pacing dei budget, aggiustamenti di bid strategy, mining dei termini di ricerca, esclusioni audience, rotazione creatività. Tutto loggato: niente avviene in silenzio." },
          { title: "Programmi di test", body: "Test strutturati su creatività e audience, con ipotesi e stop-rule, non duplica-e-ritocca a caso." },
          { title: "Report che i clienti capiscono", body: "Dashboard Looker Studio e commento settimanale scritto per il cliente, rivisto da un buyer senior europeo prima dell'invio." },
          { title: "Manutenzione del tracking", body: "Tracking delle conversioni controllato con cadenza regolare: eventi GA4, tag, lacune di consenso e UTM rotti intercettati prima che rovinino un mese di dati." },
          { title: "Feedback sulle landing", body: "Lo specialist segnala incoerenze di messaggio e problemi di velocità tra annunci e landing page, passando a designer e developer correzioni concrete invece di sensazioni vaghe." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "GA4", "Google Tag Manager", "Looker Studio", "Modelli Excel / Sheets", "Basi di tracking server-side"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "P., 29 — Nairobi",
        summary:
          "Quattro anni di account performance per brand e-commerce e fintech dell'Africa orientale, gli ultimi due gestendo spesa su Google e Meta per clienti internazionali. Certificato Google Ads, nativo su GA4, scrive commenti di reporting in inglese chiaro.",
        facts: [
          { label: "Esperienza", value: "4+ anni di performance marketing" },
          { label: "Inglese", value: "Fluente, scritto e parlato" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "Le cifre per i media buyer in Italia, Germania e Regno Unito — e tutto quello che una riga di stipendio non dice — stanno nella nostra pagina [benchmark salariali europei](/it/marketing-salaries), così il confronto lo verifichi invece di fidarti.",
        band: podSeatBand("paid-media", "it"),
      },
      faq: [
        { q: "Di chi sono gli ad account?", a: "Tuoi o del tuo cliente, sempre. Il pod lavora nei tuoi account con accessi gestiti da agenzia. Niente resta in ostaggio nei nostri." },
        { q: "Lo specialist può parlare con i miei clienti?", a: "Il default è white-label: il tuo team ci mette la faccia, il pod esegue. Se vuoi, il QA lead europeo entra nelle call come voce della delivery." },
        { q: "Quanto ci mette a prendere in mano account live?", a: "Tipicamente la prima settimana: accessi, audit, naming convention, passaggio del reporting. A regime entro il trial di 2 settimane." },
        { q: "E se lo specialist se ne va o non rende?", a: "Sostituzione gratuita entro 60–90 giorni, e la struttura del pod rende il passaggio di consegne noioso per costruzione: naming convention, log dei test e storico del reporting sono documentati, quindi il nuovo specialist eredita un sistema funzionante, non un foglio bianco." },
      ],
      cta: "Definisci un pod paid media",
    },
    seo: {
      slug: "seo",
      name: "SEO specialist",
      h1: "Assumi uno specialist SEO offshore",
      seoTitle: "Assumi uno Specialist SEO Offshore | enable.talent",
      seoDescription:
        "Specialist SEO dedicati per agenzie europee: audit, brief, on-page e reporting da Nairobi, con QA di SEO senior europei. Da €2.000/mese.",
      tagline: "L'80% poco glamour della SEO — audit, brief, on-page, tracking — fatto con costanza, così i tuoi strategist possono fare strategia.",
      intro: [
        "Tutte le agenzie vendono retainer SEO; poche riescono a staffarli con margine. Uno specialist SEO costa €2.400/mese in Italia (RAL mediana intorno a €35.000) e €3.500–4.500 in Germania — per un lavoro in gran parte sistematico: crawl, audit, brief, implementazione on-page, internal linking, igiene del tracking.",
        "Uno specialist SEO in pod possiede quel livello sistematico. Esegue i crawl e li trasforma in fix prioritizzati, scrive brief dai tuoi cluster di keyword, implementa l'on-page, monitora Search Console e tiene onesto il reporting. Il tuo SEO senior dà la direzione e rivede l'output — o lo fa il nostro, come layer di QA.",
        "Risultato: i tuoi retainer smettono di dipendere dal pomeriggio libero del tuo unico SEO senior. I deliverable escono ogni settimana, documentati, nei tuoi template.",
        "Fare QA sulla SEO significa intercettare gli errori costosi prima che si accumulino. Un SEO senior europeo di Enable Digital, la nostra agenzia sorella italiana, rivede ogni audit, brief e report mensile prima che esca dal pod — verificando che le raccomandazioni siano difendibili, che le priorità riflettano l'impatto sul business e che in un deck cliente non finisca nulla che tu non firmeresti. L'implementazione viene verificata contro il brief con una checklist documentata, non con un'occhiata.",
      ],
      inPod: {
        title: "Cosa fa uno specialist SEO nel tuo pod",
        items: [
          { title: "Audit tecnici e fix", body: "Crawl con Screaming Frog / Semrush trasformati in un backlog prioritizzato pronto per gli sviluppatori — e implementato dove gli accessi lo permettono." },
          { title: "Brief e ottimizzazione contenuti", body: "Brief guidati dalla SERP che i tuoi copywriter possono eseguire, più ottimizzazione on-page delle pagine che convertono." },
          { title: "Internal linking e struttura", body: "Programmi sistematici di link interni e raccomandazioni di architettura, mappati sui tuoi cluster." },
          { title: "Tracking e reporting", body: "Dashboard GA4 + Search Console, rank tracking, narrative mensili comprensibili per i clienti, riviste prima dell'invio." },
          { title: "Supporto a migrazioni e lanci", body: "Mappe di redirect, crawl comparativi pre e post lancio e monitoraggio dell'indicizzazione nelle migrazioni — i momenti in cui i retainer si vincono o si perdono." },
          { title: "SEO locale e marketplace", body: "Manutenzione dei profili Google Business, landing locali e dati strutturati per clienti multi-sede, gestiti come routine mensile ripetibile." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["Semrush", "Ahrefs", "Screaming Frog", "Google Search Console", "GA4", "WordPress", "Webflow", "HTML/CSS di base", "Looker Studio", "Surfer / tool NLP"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "S., 31 — Nairobi",
        summary:
          "Cinque anni di SEO per publisher e servizi B2B, di cui due dentro un team d'agenzia con clienti UK. A suo agio sia sul tecnico sia sui contenuti; scrive brief in inglese strutturato che i copywriter seguono davvero.",
        facts: [
          { label: "Esperienza", value: "5 anni di SEO, lato agenzia" },
          { label: "Inglese", value: "Fluente, scritto e parlato" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "Le cifre SEO da cui partiamo per Italia, Germania e Regno Unito, con le fonti e i loro punti deboli, stanno nella nostra pagina [benchmark salariali europei](/it/marketing-salaries) invece di essere ripetute qui.",
        band: podSeatBand("seo", "it"),
      },
      faq: [
        { q: "Scrive anche i contenuti?", a: "Brief, metadata e copy on-page in inglese, nativamente. Per long-form in italiano, tedesco o spagnolo, affiancalo ai tuoi writer o aggiungi uno specialist content al pod — brief e QA tengono la qualità costante." },
        { q: "Fa link building?", a: "Operations di outreach, prospecting e tracking sì — dentro programmi white-hat definiti da te. Non gestiamo PBN né compriamo link, e se serve lo diciamo in faccia ai tuoi clienti." },
        { q: "Come fate QA sul lavoro SEO?", a: "Ogni audit, brief e report passa da un SEO senior europeo prima della consegna. L'implementazione viene verificata contro il brief con una checklist documentata." },
        { q: "Quanti retainer può reggere uno specialist?", a: "Dipende dallo scope, ed è per questo che definiamo lo scope prima di vendere. Durante il trial mappiamo i tuoi retainer sulla capacità settimanale dello specialist e concordiamo un carico realistico — promettere troppo è il motivo della cattiva fama della SEO offshore, e preferiamo perdere il contratto piuttosto che ripeterlo.",
        },
      ],
      cta: "Definisci un pod SEO",
    },
    "content-social": {
      slug: "content-social",
      name: "Content & Social specialist",
      h1: "Assumi uno specialist content & social offshore",
      seoTitle: "Specialist Content & Social Offshore | enable.talent",
      seoDescription:
        "Content e social dedicati per agenzie: calendari, copy, community e reporting da Nairobi, con QA europeo. Da €2.000/mese, trial retribuito di 2 settimane.",
      tagline: "Calendari pieni, post pubblicati, community seguite — ogni settimana, nella voce del tuo brand, con revisione europea.",
      intro: [
        "I retainer content e social sono un business di volume: ogni cliente vuole calendari, varianti di copy, scheduling, community management e report mensili. Nel Regno Unito uno specialist social costa £3.000–4.500 al mese; in Italia €1.500–2.000 — e comunque copre un numero finito di clienti prima che la qualità scivoli.",
        "Uno specialist content & social in pod industrializza quel volume. Prepara i calendari dalla tua strategia, scrive copy in inglese a livello nativo, adatta i formati per canale, programma, monitora e riporta. Il QA lead europeo rivede tono e coerenza di brand prima che qualcosa entri in coda — così l'«offshore» non compare mai nei feed dei tuoi clienti.",
        "Per i mercati non anglofoni il pod lavora brief-to-draft: il tuo team locale rifinisce la lingua mentre il pod porta ricerca, struttura, coordinamento visual e operations — che di solito sono il vero collo di bottiglia.",
        "Il tono di voce è il punto dove il content offshore di solito fallisce, ed è lì che si concentra il QA. I revisori senior di Enable Digital, la nostra agenzia sorella italiana, confrontano ogni calendario e ogni batch di copy con il brand book del cliente prima che arrivino al tuo flusso di approvazione. Le sbavature vengono corrette dentro il pod, e la correzione entra nel brief dello specialist — così lo stesso errore non si ripresenta il mese dopo.",
      ],
      inPod: {
        title: "Cosa fa uno specialist content & social nel tuo pod",
        items: [
          { title: "Calendari editoriali", body: "Calendari mensili per cliente, mappati su campagne e pillar, consegnati in approvazione nel tuo template." },
          { title: "Copy e adattamento", body: "Copy inglese di qualità nativa; bozze strutturate per le altre lingue, pronte per la rifinitura locale. Adattamento formati per canale." },
          { title: "Scheduling e community", body: "Gestione code su Meta, LinkedIn, TikTok e X; triage di commenti e DM con regole di escalation definite da te." },
          { title: "Reporting social", body: "Report mensili con un commento che i clienti leggono davvero, rivisti prima dell'invio." },
          { title: "Operations video short-form", body: "Taglio, sottotitoli e riformattazione di video brevi dal tuo girato o dai tuoi template — la produzione dietro Reels e TikTok che divora i pomeriggi del tuo team." },
          { title: "Ricerca e riuso dei contenuti", body: "Ricerca di temi, monitoraggio dei competitor e riuso sistematico dei contenuti lunghi in formati pronti per ogni canale, così un asset alimenta un mese di post." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["Meta Business Suite", "LinkedIn", "TikTok", "Buffer / Hootsuite / Later", "Canva", "Figma (handoff)", "CapCut", "Notion", "Basi GA4"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "C., 27 — Nairobi",
        summary:
          "Tre anni di social per brand consumer e una media company panafricana; ha gestito calendari multi-mercato in inglese con 30+ post a settimana. Scrive bene, veloce nell'editing di short-form video.",
        facts: [
          { label: "Esperienza", value: "3+ anni di social e content" },
          { label: "Inglese", value: "Fluente — copy di qualità nativa" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "È l'unico posto dove il solo stipendio italiano può costare meno di un pod, ed è esattamente per questo che i numeri stanno nella nostra pagina [benchmark salariali europei](/it/marketing-salaries) e non riassunti qui in una riga a nostro favore.",
        band: podSeatBand("content-social", "it"),
      },
      faq: [
        { q: "Il copy suonerà «offshore»?", a: "Il copy inglese è scritto a livello nativo e rivisto dal QA lead europeo per la voce del brand. Per italiano, tedesco o spagnolo il pod consegna bozze strutturate che il tuo team rifinisce — il carico operativo esce comunque dalla tua scrivania." },
        { q: "Possono reggere SLA di community management?", a: "Sì — le finestre di risposta sono definite nello SLA del pod, e il fuso di Nairobi significa copertura durante il tuo orario di ufficio, non batch asincroni." },
        { q: "Fanno anche i visual?", a: "Visual template-based in Canva/Figma, sì. Per sistemi di design originali aggiungi un designer al pod — i due ruoli lavorano come un'unica linea di delivery." },
        { q: "Come funzionano le approvazioni giorno per giorno?", a: "Calendari e copy arrivano nel tuo strumento di approvazione — Notion, Trello, quello che usi — già passati dal QA. Il tuo team approva o commenta; il pod gestisce revisioni e programmazione. Tu rivedi il lavoro, non lo rincorri." },
      ],
      cta: "Definisci un pod content",
    },
    design: {
      slug: "design",
      name: "Designer",
      h1: "Assumi un designer marketing offshore",
      seoTitle: "Assumi un Designer Marketing Offshore | enable.talent",
      seoDescription:
        "Designer marketing dedicati: creatività adv, kit social e landing page da Nairobi, con direzione artistica e QA europei. Trial di 2 settimane retribuito.",
      tagline: "Creatività adv, kit social e landing page a velocità di produzione — la direzione artistica resta a te, o al nostro QA senior.",
      intro: [
        "Il design è il primo collo di bottiglia quando il volume delle campagne cresce: ogni test paid vuole varianti, ogni calendario social vuole asset, ogni campagna vuole una landing — e i designer senior EU sono prenotati, costosi, o entrambe le cose.",
        "Un designer in pod è un designer di marketing production-grade: veloce, sistematico, fluente nel tuo design system. Prende la direzione artistica dal tuo creative lead (o dal nostro QA senior) e la trasforma in asset consegnabili — nominati bene, nei formati giusti per ogni canale.",
        "Il layer di QA nel design conta doppio: niente arriva ai tuoi clienti senza revisione contro il brand book. Le revisioni avvengono dentro il pod, non nella inbox del tuo cliente.",
        "In pratica quella revisione la fanno le persone senior di Enable Digital, la nostra agenzia sorella italiana, che confrontano ogni consegna con il brief e con il sistema di brand — tipografia, spaziature, uso del colore, ordine dei file, specifiche di export. Quando qualcosa non va, torna al designer con una nota scritta, e la nota entra nella checklist di lavoro. Nelle prime settimane la checklist converge sui tuoi standard e i rifiuti calano — è questo il senso di un pod gestito rispetto a una giostra di freelance.",
      ],
      inPod: {
        title: "Cosa fa un designer nel tuo pod",
        items: [
          { title: "Creatività adv e social", body: "Varianti statiche e light-motion per le matrici di test su Meta, Google, LinkedIn e TikTok — in batch, con naming convention." },
          { title: "Landing page", body: "Design in Figma sul tuo sistema, pronto per il build in Webflow/WordPress — o costruito dal developer del pod." },
          { title: "Materiali brand", body: "Deck, one-pager, cover di report, asset per eventi. La produzione ricorrente che divora le settimane dei designer senior." },
          { title: "Igiene del design system", body: "Librerie di componenti e template tenuti puliti, così ogni asset successivo è più veloce del precedente." },
          { title: "Design email e campagne", body: "Layout di newsletter ed email di campagna disegnati su moduli testati, pronti per lo specialist automation o per il tuo team." },
          { title: "Cicli di refresh creativo", body: "Rinnovo sistematico delle creatività stanche partendo dai dati di performance — nuovi angoli sui concept vincenti, consegnati prima che il calo di CTR diventi una conversazione col cliente." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["Figma", "Adobe Photoshop", "Illustrator", "After Effects (base)", "Canva (sistemi template)", "Handoff Webflow", "Motion per social", "Sistemi di brand"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "D., 28 — Nairobi",
        summary:
          "Cinque anni di design digitale tra uno studio di Nairobi e clienti internazionali freelance; portfolio tra fintech, FMCG e campagne NGO. Sistematico con i componenti, veloce nel batching creativo, abituato a ricevere direzione artistica europea.",
        facts: [
          { label: "Esperienza", value: "5 anni di design digitale e brand" },
          { label: "Inglese", value: "Fluente, scritto e parlato" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "La retribuzione dei designer cambia troppo per mercato e seniority perché un numero solo sia onesto: i dati che usiamo, e i costi che una riga di stipendio nasconde, stanno nella nostra pagina [benchmark salariali europei](/it/marketing-salaries).",
        band: podSeatBand("design", "it"),
      },
      faq: [
        { q: "Chi fa la direzione artistica?", a: "Tu, se hai un creative lead — il pod esegue a velocità di produzione. Se non ce l'hai, il nostro QA senior europeo definisce e fa rispettare la direzione dal tuo brand book." },
        { q: "E le revisioni?", a: "I giri di revisione interni avvengono prima della consegna: brief → bozza → QA → delivery. I round col cliente arrivano su lavoro già rivisto una volta." },
        { q: "Fanno video?", a: "Motion short-form per i social e editing di varianti creative, sì. La produzione video completa (riprese, long-form) è fuori scope — lo diciamo, invece di fingere." },
        { q: "Come si briffa un designer del pod?", a: "Con il tuo formato di brief, o con il nostro se non ne hai uno: obiettivo, riferimenti, copy, formati, scadenza. I primi brief richiedono più tempo; alla terza settimana il designer conosce i sistemi dei tuoi clienti e i brief si riducono a elenchi puntati." },
      ],
      cta: "Definisci un pod design",
    },
    "marketing-automation": {
      slug: "marketing-automation",
      name: "Marketing automation specialist",
      h1: "Assumi uno specialist marketing automation offshore",
      seoTitle: "Assumi uno Specialist Marketing Automation | enable.talent",
      seoDescription:
        "Specialist marketing automation dedicati: flow HubSpot, Klaviyo e Mailchimp, igiene CRM, lead scoring e reporting — gestiti da Nairobi, QA in Europa.",
      tagline: "Flow costruiti, CRM puliti, email spedite in orario — il lavoro sistematico che le piattaforme promettono e le agenzie finiscono per fare a mano.",
      intro: [
        "I retainer di marketing automation hanno un segreto sporco: piattaforme come HubSpot e Klaviyo non si gestiscono da sole. Qualcuno deve costruire i flow, segmentare le liste, testare le email, pulire il CRM e tenere onesta l'attribution — e quel qualcuno di solito è un consulente senior il cui tempo vale 4x il task.",
        "Uno specialist automation in pod possiede il livello build-and-run: costruzione dei journey dalla tua architettura, produzione e test delle email, igiene delle liste, manutenzione del lead scoring, monitoraggio delle integrazioni e reporting. I tuoi consulenti tengono strategia e relazione col cliente.",
        "Ogni flow va live solo dopo che il QA lead europeo ha percorso il journey da capo a fondo come farebbe un iscritto. Le automation rotte le troviamo noi, non i prospect del tuo cliente.",
        "Quel QA lead lavora da Enable Digital, la nostra agenzia sorella italiana, e segue una checklist di lancio: condizioni di ingresso e uscita, logica di soppressione, resa sui principali client di posta, controllo di link e UTM, conformità delle disiscrizioni, e un contatto di test spinto attraverso ogni ramo. La stessa disciplina vale per le modifiche ai flow live — perché la maggior parte dei disastri di automation non nasce da build sbagliate, ma da modifiche non riviste fatte di fretta il venerdì.",
      ],
      inPod: {
        title: "Cosa fa uno specialist automation nel tuo pod",
        items: [
          { title: "Build di journey e flow", body: "Welcome, nurture, carrello, winback e lifecycle costruiti in HubSpot, Klaviyo, Mailchimp o ActiveCampaign dalla tua architettura." },
          { title: "Produzione email", body: "Email su template con test seri su client e device — copy dal tuo team o dallo specialist content del pod." },
          { title: "Igiene CRM e scoring", body: "Deduplica, disciplina dei campi, segmentazione e manutenzione del lead scoring che nessuno nel tuo team vuole possedere." },
          { title: "Reporting e attribution", body: "Dashboard di performance di flow e campagne con commento mensile rivisto, legato alla pipeline dove i dati lo permettono." },
          { title: "Manutenzione della deliverability", body: "Igiene delle liste, policy di sunset, monitoraggio di domini e mittenti — la manutenzione che tiene le email dei clienti fuori dallo spam e dalle blocklist." },
          { title: "Documentazione e passaggi di consegne", body: "Ogni flow documentato con logica, owner e dipendenze, così gli account sopravvivono ai cambi di persone, da noi come da te." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["HubSpot", "Klaviyo", "Mailchimp", "ActiveCampaign", "Zapier / Make", "GA4", "HTML per email", "Basi Segment", "Looker Studio"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "M., 30 — Nairobi",
        summary:
          "Quattro anni di CRM ed email marketing per e-commerce e SaaS, inclusa l'amministrazione HubSpot per un'azienda da 40 persone. Certificato HubSpot Marketing Hub e Klaviyo; debugga un workflow rotto più in fretta di quanto molti consulenti ci mettano a briffarlo.",
        facts: [
          { label: "Esperienza", value: "4 anni di automation e CRM" },
          { label: "Inglese", value: "Fluente, scritto e parlato" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "Invece di ripetere una forbice su ogni pagina ruolo, teniamo i dati salariali e i costi datoriali che ci si sommano sopra in un unico posto: la nostra pagina [benchmark salariali europei](/it/marketing-salaries).",
        band: podSeatBand("marketing-automation", "it"),
      },
      faq: [
        { q: "Disegna anche la strategia di automation?", a: "Contribuisce, ma la strategia resta ai tuoi consulenti o al nostro QA lead. Il lavoro del pod è un build-and-run impeccabile — che è ciò che davvero si rompe nella maggior parte dei retainer." },
        { q: "Che piattaforme coprite?", a: "HubSpot, Klaviyo, Mailchimp e ActiveCampaign nativamente; Zapier/Make come collante. Stack esotici: chiedi — saremo onesti sui tempi di ramp-up." },
        { q: "Come gestite i dati dei clienti nei CRM?", a: "DPA + Standard Contractual Clauses in ogni contratto, accessi least-privilege e log di attività. Il GDPR è coperto contrattualmente prima che uno specialist tocchi un record." },
        { q: "Può prendere in mano un setup esistente in disordine?", a: "È il punto di partenza più comune. Le prime settimane sono un audit: mappatura dei flow attivi, delle liste morte, dei workflow in conflitto e delle proprietà orfane, poi le correzioni in ordine di priorità. Alla fine hai un account documentato invece di uno che nessuno osa toccare." },
      ],
      cta: "Definisci un pod automation",
    },
    development: {
      slug: "development",
      name: "Developer",
      h1: "Assumi uno sviluppatore web offshore",
      seoTitle: "Assumi uno Sviluppatore Web Offshore | enable.talent",
      seoDescription:
        "Developer mid-level dedicati per agenzie: build WordPress, Webflow, Shopify e Next.js da Nairobi, con code review sotto QA europeo. Da €2.400/mese.",
      tagline: "Landing, siti e storefront consegnati in orario — con code review, disciplina di staging e zero eroismi.",
      intro: [
        "Il lavoro dev in agenzia va a ondate: tre siti questo mese, zero il prossimo. Assumere un developer mid-level in Germania costa €5.000–6.500 al mese, pipeline piena o no — così il lavoro va a freelance strapieni, e le deadline iniziano a slittare.",
        "Un developer in pod ti dà capacità di build dedicata a una frazione di quel costo: siti WordPress e Webflow, storefront Shopify, landing page, implementazioni di tracking e l'infinita coda di «piccole modifiche» che blocca il tuo team marketing. Nairobi ha profondità ingegneristica vera — developer mid-level formati in un ecosistema dove reclutano Google, Microsoft e Safaricom.",
        "La disciplina di delivery è il differenziatore: version control, ambienti di staging e review sotto il QA europeo del pod prima che qualcosa tocchi la produzione. Velocità senza deploy da cowboy.",
        "Il QA sullo sviluppo lo gestisce Enable Digital, la nostra agenzia sorella italiana, ed è volutamente poco romantico: pull request riviste prima del merge, checklist di lancio su comportamento responsive, form, tracking, performance e basi di accessibilità, e sign-off in staging prima di ogni rilascio. Se una scadenza è a rischio, te lo dice il pod lead in anticipo — con delle opzioni sul tavolo — invece di fartelo scoprire alla data di consegna.",
      ],
      inPod: {
        title: "Cosa fa un developer nel tuo pod",
        items: [
          { title: "Build di siti e landing", body: "WordPress, Webflow e Shopify dai tuoi design — fedeli al pixel, responsive, in deadline." },
          { title: "Sviluppo frontend", body: "Next.js / React per build headless e web app dove il progetto richiede codice vero." },
          { title: "Tracking e integrazioni", body: "Container GTM, eventi GA4, pixel e CAPI, integrazioni CRM e form — testate, documentate." },
          { title: "Manutenzione e coda modifiche", body: "La coda dei «possiamo cambiare al volo…» gestita dentro lo SLA, così i siti dei clienti smettono di essere il tuo collo di bottiglia." },
          { title: "Performance e Core Web Vitals", body: "Audit di velocità e interventi sui siti esistenti dei clienti — immagini, script, configurazione hosting — misurati prima e dopo, non dichiarati." },
          { title: "Sviluppo template email", body: "Build di email HTML responsive per lo stack di automation, testate sui principali client di posta, così le campagne rendono come il designer le ha pensate." },
        ],
      },
      stack: {
        title: "Skill e stack",
        items: ["WordPress / PHP", "Webflow", "Shopify / Liquid", "JavaScript / TypeScript", "React / Next.js", "HTML/CSS/Tailwind", "Git", "GTM / GA4", "REST API"],
      },
      profile: {
        title: "Un profilo dalla nostra bench",
        name: "K., 27 — Nairobi",
        summary:
          "Background di software engineering via Moringa School più quattro anni di web per agenzie e startup — WordPress e Shopify in produzione, React su due frontend SaaS. Scrive codice documentato e revisionabile, e le implementazioni di tracking gli piacciono pure.",
        facts: [
          { label: "Esperienza", value: "4 anni di sviluppo web" },
          { label: "Inglese", value: "Fluente, scritto e parlato" },
          { label: "Fuso", value: "UTC+3 (CET +1/+2h)" },
          { label: "Retribuzione", value: "2–4x il mercato locale" },
        ],
        note: "I profili restano anonimi fino alla call di scoping — i nostri specialist vengono già corteggiati abbastanza.",
      },
      savings: {
        title: "Quanto risparmi",
        body: "Lo sviluppo ha la forbice salariale più larga tra i ruoli che copriamo, quindi le cifre di Italia, Germania e Regno Unito stanno accanto al prezzo del posto in pod nella nostra pagina [benchmark salariali europei](/it/marketing-salaries).",
        band: podSeatBand("development", "it"),
      },
      faq: [
        { q: "Chi rivede il codice?", a: "Ogni merge passa da una review — dal tuo tech lead se ce l'hai, o dal nostro processo di QA con supervisione senior. Staging prima della produzione, sempre." },
        { q: "Può lavorare nei nostri repo e tool?", a: "Sì — il tuo Git hosting, la tua CI, il tuo project management. Accessi least-privilege, tutto coperto contrattualmente da DPA." },
        { q: "Anche backend e app?", a: "Lo sweet spot è la web delivery per il marketing: siti, storefront, landing, tracking. Per backend profondo o prodotti mobile te lo diciamo chiaro e ti aiutiamo a impostare il progetto altrove." },
        { q: "Come gestite le urgenze?", a: "I livelli di priorità sono definiti nello SLA del pod, e il fuso di Nairobi significa che lo sviluppatore è online per tutta la tua giornata lavorativa — un'emergenza del mattino viene presa in carico al mattino, non nel domani di un altro emisfero." },
      ],
      cta: "Definisci un pod dev",
    },
  },
};

interface RolesIndexContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  hint: string;
}

export const rolesIndex: Record<Locale, RolesIndexContent> = {
  en: {
    seoTitle: "Pod Roles: Offshore Marketing Specialists | enable.talent",
    seoDescription:
      "Six roles, one delivery engine: paid media, SEO, content & social, design, automation and development — dedicated specialists in pods with European QA.",
    title: "Six roles. One delivery engine.",
    intro:
      "Pods are assembled from these roles — one specialist or several, always dedicated, always under senior European QA. Pick the bottleneck; we'll build around it.",
    hint: "Every role page includes real salary benchmarks, an anonymised profile and the questions agencies actually ask.",
  },
  it: {
    seoTitle: "Ruoli dei Pod: Specialist Marketing Offshore | enable.talent",
    seoDescription:
      "Sei ruoli, un motore di delivery: paid media, SEO, content & social, design, automation e sviluppo — specialist dedicati in pod con QA europeo.",
    title: "Sei ruoli. Un solo motore di delivery.",
    intro:
      "I pod si compongono da questi ruoli — uno specialist o più, sempre dedicati, sempre sotto QA senior europeo. Scegli il collo di bottiglia; noi costruiamo intorno.",
    hint: "Ogni pagina ruolo include benchmark salariali reali, un profilo anonimizzato e le domande che le agenzie fanno davvero.",
  },
};
