# 01 — Home (`/en`)

**Title:** IT support and security for companies in Cluj · BitUp
**Description:** We design, secure, and run your company’s IT infrastructure: servers, network, cloud, apps, and automation. Free IT Health Check.

**JSON-LD:** Organization + ProfessionalService (global). Nothing else.

---

## 1. Hero

Left-aligned, on `--bg`. No photo, no trust row, no eyebrow.

Note for Claude Code: from 1200 px, two columns — text on the left, the `HeroDiagram` graphic on the right (DESIGN.md § Imagini); from 1360 px the hero switches to the wide container, with its left edge kept aligned. Below 1200 px, one column, no graphic. Inside the graphic: the official logo above the spine, the spine nodes in orange, and the end arrows drawn as teal chevrons (asked for by Marius on 18 September 2026).

Note for Claude Code: the graphic draws itself once on page load, over ~1.9 s, and can be read with the mouse — when the cursor is on one band, the other four fade back (asked for by Marius on 20 September 2026; details in DESIGN.md § Mișcare and § Imagini). No page text depends on the motion: with `prefers-reduced-motion` the drawing appears already finished.

Note for Claude Code: the labels inside the graphic are new copy, taken from `hero.png` on 18 September 2026; the English wording is Claude Code's translation, pending confirmation.

`Cybersecurity` · `Automation` · `Agentic AI` · `Software development` · `IT infrastructure`

Note for Claude Code: the two corner labels sit at the bottom, `From fragmentation` on the left and `To progress` on the right.

Note for Claude Code: the screen-reader label (`aria-label` on the SVG) is “From fragmentation to progress: five scattered directions gather into a single path.”, and the capitals on the corner labels come from CSS, not from the text.

Note for Claude Code: hero changed by Marius on 17 September 2026. The eyebrow was dropped, the new text has none. The English wording is Claude Code's translation of the Romanian and is pending confirmation.

**H1** (max-width 22ch)**:** We design, secure, and run the entire IT infrastructure your company needs.

Lead (max-width 60ch): We start with servers, network, and cloud, and go on to applications, automation, and AI agents. Security is designed in from the start and built into every stage.

Buttons: **Free IT Health Check** (primary → `/en/it-health-check`) · **Explore our services** (secondary → `/en/services`)

Post-launch variant, once `[[CAPTURA_RAPORT_LUNAR]]` exists: two-column hero, on the right a Figure with the first page of the anonymized monthly report, as a paper document (background `--surface`, 1 px `--line` border, `--radius`, no shadow, no perspective, no laptop frame). Caption and alt: "The monthly report every client gets. Anonymized." The object in the hero is the deliverable, not the founder.

---

## 2. Sound familiar?

Eyebrow: `Where we usually start`

**H2:** Three sentences we hear in almost every new company

Note for Claude Code: the page arrangement was changed on 17 September 2026, following `example.png` (layout only; colors, font, copy and menu unchanged).

Three columns in one row, separated by 1 px `--line` vertical rules, no cards and no boxes. Each column carries a short teal accent dash above it (28 × 3 px), then the quote as title and one sentence underneath. Below 768 px the columns stack and the dash stays above each quote:

**"We have a guy who knows his stuff. But when he's on vacation, nobody knows the passwords."**
All the IT rests on one person. When he's away, the company stops.

**"We have three vendors. When something breaks, each one blames the other."**
Nobody answers for everything. You end up coordinating them instead of doing your job.

**"We have backup. I think. Nobody's tested it."**
If nobody's restored it, you don't know you have a backup.

Closing row (plain text, under the cards): If you recognized yourself in at least one, the 30-minute IT Health Check is for you. → link "How it works" (`/en/it-health-check`)

---

## 3. What we do

Eyebrow: `Services`

**H2:** Three things, seen through to the end

The “two columns” model: eyebrow and H2 anchored left (240 px, sticky on desktop), an empty gutter (no vertical rule — the mockup separates the two columns with whitespace only), and on the right the three services as rows separated by 1 px hairlines — title, paragraph, tertiary link with arrow. No cards, no index numbers (the services are not a sequence):

**IT support and administration**
We take over everything to do with computers, servers, network, cloud, and Microsoft 365, on a monthly subscription. Your team writes on WhatsApp, a person answers, and at the end of the month you get the report of what was done.
→ See what the subscription includes (`/en/services/it-support`)

**Security and continuity**
Protection against attacks, controlled access, backup that actually restores, tested regularly. When your company has obligations (NIS2, ISO 27001), we turn them into concrete steps, not paperwork.
→ See what we protect and how (`/en/services/security`)

**Automation and software**
When a process lives in Excel and emails, we move it into a system: automation, integration, or an application built for you. We start from the process, not the technology.
→ See real examples (`/en/services/automation`)

---

## 4. How we work

Eyebrow: `How we work`

**H2:** Four steps. The fourth never ends.

The section head sits on top, full width. Below it, Steps in the “rail” variant: from 1200 px the four steps sit in one row, the numbered circle above the title, the nodes linked by a 1 px `--line` rule with a small teal arrow between them; after the fourth circle the line runs on, with no arrow. Below 1200 px the current grid stays (2 × 2, then one column), with no rule.

Steps:

**1. Health check.** 30 minutes, remote, free. Ten checks. You leave with one page: what's fine, what's urgent, what it would cost.

**2. Plan.** What we do in the first month, what can wait, what isn't worth doing at all. In business terms, with the price next to it.

**3. Onboarding.** In the first 30 days we document everything, change the passwords that need it, get the backup in order, and test it.

**4. Month by month.** Monitoring, WhatsApp support, updates, monthly report. You know what's going on without asking.

Link: The full process, with what happens at each stage → `/en/how-we-work`

---

## 5. Why one partner

Eyebrow: `What's different`

**H2:** What you get when one partner answers for everything

List of 5, each a short title plus one sentence (not cards; list with teal markers):

**One phone number, not three vendors.** When something breaks, you stop hunting for the culprit. You call and it gets fixed.

**Security is done, not sold separately.** Everything we install has its security part done too. It doesn't work any other way.

**You see everything, without asking.** Your team's requests go into a ticket system we built ourselves. You know who's on it, what stage it's at, when it was solved.

**A monthly report from facts, not memory.** At the end of the month you get what was done, how long it took, what's next. You don't guess what you're paying for.

**Large-scale experience, at your scale.** We bring security experience from a Fortune 500 corporation into a 30-person company, without the needless complexity.

---

## 6. Support, in short (WhatsApp + Cipri)

Eyebrow: `Support`

**H2:** You write on WhatsApp. You get an answer right away. Nothing gets lost.

Text (two columns: text left, WhatsApp screenshot right, `assets/blog/helpdesk/whatsapp-cipri.jpg`):

Your team doesn't learn a new portal: they write on WhatsApp, as they'd write to anyone. Cipri, our virtual assistant, recognizes them, picks up the problem, and tries to solve it right away, at any hour. What he can't solve automatically becomes a ticket in BitUp Helpdesk and a person takes over. You see every ticket, from open to close.

We built the whole system ourselves, for the small companies we work with. → How we built it and why (`/en/blog/how-we-built-our-own-helpdesk`)

---

## 7. Marius

Eyebrow: `Who answers`

**H2:** Marius Galmati, BitUp founder

Compact section, on `--surface-2`. Text (200 px square portrait left, text right; stays in first person, it's the founder's signed statement):

I've worked in IT since 2017. I started with servers and networks in small companies. I spent the last two and a half years in information security at a Fortune 500 corporation: ISO 27001 audits, continuity plans, protection on workstations and servers. I started BitUp because I'd seen too many companies with technology but nobody to answer for it.

Links: The story, in short → `/en/about` · The team → `/en/team` · LinkedIn → https://www.linkedin.com/in/nicolae-marius-galmati

---

## 8. Results

Eyebrow: `Results`

**H2:** What we've done, with names

Two cards (from the `cases` collection, only `draft: false`; while Cosmio is a draft, the section shows only ProQ and a row "Next case soon, with the client's consent."):

Card: kicker · short title · two sentences from `summary` · link "Read the case".

---

## 9. Partners and technologies

Eyebrow: `Partners`

**H2:** What we work with

Static row, four equal cells across the container width, separated by short 1 px `--line` vertical rules (2.8 em, vertically centred): Microsoft Partner · Fortinet Advocate · Veeam Partner · Anthropic Partner (badges from `[[LOGO_PARTENERI]]`, level written under each). At 640–1023 px, 2 × 2 with a horizontal rule between rows; below 640 px, one column.
Note for Claude Code: below it, a section of its own (Marius's decision, 17 September 2026), on the same background, separated by a 1 px rule.

Eyebrow: `Technologies`

**H2:** Technologies we work with daily

Microsoft 365, Fortinet, Veeam, CrowdStrike, Palo Alto Networks, WireGuard, Proxmox / VMware, Synology.

Note for Claude Code: if `[[LOGO_PARTENERI]]` is missing at launch, the badge row becomes text (partner name + level), no improvised logos.

---

## 10. From the blog

Eyebrow: `From the inside`

**H2:** How we work, written by us

Latest 3 articles from the `blog` collection (one at launch). Card: title, description, date, reading time.

---

## 11. Practical questions

Eyebrow: `Questions`

**H2:** What an owner asks us before writing

Faq (4 questions, first open):

**Can we outsource only part of our IT?**
Yes. Three setups: alongside your in-house person (they keep the day-to-day, we take over security, backup, and what they don't know), partial (only servers and Microsoft 365, for example), or full. We pick at the health check, once we see what you have.

**Do we have to replace everything we have?**
No. We start from what works. We replace only what's risky or costs you more than it's worth.

**How much does it cost?**
Depends on the number of workstations and servers and on what we take over: administration only, or security, backup, and licenses too. We'll give you a concrete price at the end of the health check, no obligations. We don't put numbers on the site because they'd be wrong for half the companies.

**Can we start with a one-off problem?**
Yes. One intervention or a bounded project (a migration, a backup put in order, an audit) is a good way in. Then we see whether a subscription makes sense.

---

## 12. Final band

CtaBand, default variant (from `00-global.md`).
