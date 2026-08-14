# SEO strategy — keyword → page map

This document records what each page is meant to rank for and why. It is the reference to
check before adding a page: if a new page's target query is already owned by an existing
page, the two will cannibalise each other and the new page should not be built.

Two things to be honest about up front.

**No paid keyword tool was used.** Volume figures below come from the 2025 market analysis
(`Google Keyword Planner` figures where it marks them verified, estimates where it marks
them estimated). The SERP composition was checked directly by searching the live web in
August 2026. Where a number is an estimate, it says so. Before committing budget, re-check
volumes in Search Console, Semrush or DataForSEO — nothing here should be treated as
measured demand.

**The demand is overwhelmingly English.** The market analysis is blunt about it: in Italian,
"assumere talenti africani" is roughly zero, "team marketing offshore" is roughly zero
(the anglicism isn't used), and the only real Italian interest is editorial —
"esternalizzare il marketing", "marketing in outsourcing" — which is SME education, not
high-intent buying. So the Italian mirror exists for credibility, for direct traffic and for
the Enable Digital bridge, not as a keyword investment. Do not spend on Italian paid search.

## What the SERPs actually look like (checked August 2026)

| Query cluster | Who ranks today | What that means for us |
|---|---|---|
| white label marketing agency / partner | US fulfilment shops: RankPay, White Shark Media, That! Company, V Digital Services, whitelabelpartner.com, whitelabelagency.co | Mature, crowded, commercial. They sell **per-service order-form fulfilment**. Our wedge is a dedicated managed pod with European QA and EU compliance — a different product, not a cheaper one. |
| outsource digital marketing / offshore marketing services | Offshore staffing content: Uplers, Floowi, AbroadWorks, Staff Domain, Magellan, Versatile | Generic buyer guides written for any company, all recycling the same "40–60% less" line. **None is written for a European agency owner** with GDPR exposure, white-label constraints and CET hours. That gap is the pillar page. |
| hire offshore marketing team / hire remote SEO specialist | Marketplaces and recruiters | Low volume, very high intent. Long-tail role pages own this. |
| Kenya / Nairobi marketing | Agencies **in** Kenya selling to Kenyan clients (Sortlist, GoodFirms directories) | Local intent, not ours — but it means "Nairobi talent **for** European agencies" is essentially unclaimed. Every offshore guide defaults to the Philippines, India, South Africa or LatAm. |
| white label per agenzie (IT) | Small Italian operators: Formula Cliente, whitelabelagency.it, 360maker, microservizidigitali.it, Isola | Thin SERP, winnable organically. Worth the page; not worth ad spend. |

## Page map

| Page | Primary target | Secondary | Intent | Notes |
|---|---|---|---|---|
| `/` | offshore marketing teams for European agencies | managed marketing pods | commercial | Title targets the category, not the brand. |
| `/white-label-marketing` | white label marketing agency / partner | white label delivery for agencies | commercial | The head commercial term we can credibly contest. IT twin targets the thin Italian SERP. |
| `/outsource-digital-marketing` | outsource digital marketing | offshore digital marketing services, how to outsource marketing | informational pillar | Written for the agency owner the incumbent guides ignore. Funnels to `/roles`, `/pricing`, `/white-label-marketing`. |
| `/marketing-salaries` | marketing salary benchmarks Europe | digital marketing specialist salary Italy, SEO specialist salary Germany | informational | Link-magnet data page. Publishes European gross salary only — never Kenyan salaries or our internal cost. `scripts/check-claims.mjs` enforces that. |
| `/roles/<slug>` (×6) | hire an offshore \<role\> | remote \<role\> for agencies | commercial long-tail | Keyword H1s; 600–800 unique words each. Highest-leverage cluster: low volume, highest intent. |
| `/roles` | offshore marketing roles | — | commercial hub | Distributes authority to the six role pages. |
| `/pricing` | managed marketing pod pricing | offshore marketing team cost | commercial | Publishing bands beats "contact us" for a new brand. |
| `/how-it-works` | how managed marketing pods work | offshore marketing delivery process | informational | Answers the "what actually happens" objection; the timeline page the home teaser feeds. |
| `/blog` | — | brand + blog | hub | Distributes to the four articles; not a ranking target itself. |
| `/contact` | — | brand + contact | conversion | Deliberately not optimised for search: it is the destination, not an entry point. |
| `/guarantee` | — | trust queries, brand + "guarantee" | trust | Ranks for little; converts a lot. |
| `/talent` | — | brand + Nairobi/fair pay | trust | Answers the quality objection; the fair-pay policy is also reputational insurance. |
| `/case-study` | — | brand | trust | — |
| `/blog/somewhere-alternatives` | Somewhere.com alternatives | — | commercial wedge | The competitor-alternatives play Floowi uses successfully. |
| `/blog/marketerhire-alternatives` | MarketerHire alternatives | freelance marketplace vs managed team | commercial wedge | Now carries a real per-category rundown. |
| `/blog/hire-offshore-marketing-team` | how to hire an offshore marketing team | — | informational | — |
| `/blog/white-label-delivery` | white label delivery model | — | informational | Supports `/white-label-marketing`; the two must stay distinct (guide vs landing) to avoid cannibalisation. |
| `/enable-digital` | — | Italian senior PM demand | routing | Deliberately sends unqualified demand to the sister agency. |
| `/privacy` | — | — | legal | Indexable, sitemap priority 0.3. |

## Internal linking model

- `/` and the footer link sitewide to the three new pages, so authority reaches them from every page.
- `/outsource-digital-marketing` is the hub: it links out to all six role pages, pricing, guarantee, talent and the four articles. Those pages link back to it as "the full guide".
- `/marketing-salaries` links to each role page and to the homepage calculator; the role pages cite it as the source for their salary figures. This is what stops each role page from repeating the same benchmark paragraph.
- `/white-label-marketing` and `/blog/white-label-delivery` cross-link and stay in their lanes: the landing page sells, the article explains.

## What to do after launch

1. Verify the domain in Search Console and submit `/sitemap.xml`. Nothing below matters until real query data exists.
2. Re-measure volumes with a real tool. Replace the estimates in this file with measured numbers and delete this line.
3. Watch for cannibalisation between `/white-label-marketing` and `/blog/white-label-delivery`, and between `/outsource-digital-marketing` and `/blog/hire-offshore-marketing-team`. If two of ours rank for the same query, merge or re-target one.
4. Only then consider new content. The candidates, in order: a per-market page for Germany (the largest salary delta and the biggest agency market), a "pod vs freelancer" comparison, and one more competitor-alternatives article once Search Console shows which competitor names people actually pair with "alternatives".
