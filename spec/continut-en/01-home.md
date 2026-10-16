# 01 — Home (`/en`)

**Title:** IT support and security for companies in Cluj · BitUp
**Description:** We design, secure, and run your company’s IT infrastructure: servers, network, cloud, apps, and automation. Free IT Health Check.

**JSON-LD:** Organization + ProfessionalService (global). Nothing else.

---

## 1. Hero

Left-aligned, on `--bg`. No photo, no trust row, no eyebrow.

Note for Claude Code: from 1200 px, two columns — text on the left, the `HeroStack` graphic on the right (DESIGN.md § HeroStack); from 1360 px the hero switches to the wide container, with its left edge kept aligned. Below 1200 px, one column, with the graphic under the buttons, at most 560 px wide. The graphic (asked for by Marius on 16 October 2026, after `ce-facem_01_animat.mp4`) is a stack of five isometric layers, the teal foundation at the bottom and layer 5 white with an orange edge at the top, each with its numbered label on the right. It replaces the “From fragmentation / To progress” graphic.

Note for Claude Code: on load, once, the foundation appears and layers 2…5 drop in one by one (~2.8 s). While the mouse is over the drawing, the video's cycle repeats (take apart, rebuild, 3.3 s hold; 7 s), and a cycle that has started always finishes. No page text depends on the motion: with `prefers-reduced-motion` the stack appears already complete.

Note for Claude Code: each label is a link to its service page — `Cybersecurity` → `/en/services/security`, `Infrastructure` → `/en/services/it-support`, `Software development` → `/en/services/automation#software`, `Automation` → `/en/services/automation`, `AI agents` → `/en/services/automation`.

Note for Claude Code: the labels are the ones in the video, bottom to top; under layer 1 sits the note “the foundation”. The English wording is Claude Code's translation, pending confirmation.

`Cybersecurity` (the foundation) · `Infrastructure` · `Software development` · `Automation` · `AI agents`

Note for Claude Code: the screen-reader label (`aria-label` on the label list) is “Security sits at the base of every service”, the video's title; the drawing is decorative.

Note for Claude Code: hero changed by Marius on 17 September 2026. The eyebrow was dropped, the new text has none. The English wording is Claude Code's translation of the Romanian and is pending confirmation.

**H1** (max-width 22ch)**:** We design, secure, and run all of your company’s IT.

Lead (max-width 60ch): From servers and network through to applications, automation, and AI agents. Security goes in on day one, not at the end.

Buttons: **Free IT Health Check** (primary → `/en/it-health-check`) · **Explore our services** (secondary → `/en/services`)

Post-launch variant, once `[[CAPTURA_RAPORT_LUNAR]]` exists: two-column hero, on the right a Figure with the first page of the anonymized monthly report, as a paper document (background `--surface`, 1 px `--line` border, `--radius`, no shadow, no perspective, no laptop frame). Caption and alt: "The monthly report every client gets. Anonymized." The object in the hero is the deliverable, not the founder.

---

## 2. Sound familiar?

Eyebrow: `Where we usually start`

**H2:** Three sentences we hear in almost every new company

Note for Claude Code: the page arrangement was changed on 17 September 2026, following `example.png` (layout only; colors, font, copy and menu unchanged).

Three columns in one row, separated by 1 px `--line` vertical rules, no cards and no boxes. Each column carries a short teal accent dash above it (28 × 3 px), then the quote as title and one sentence underneath. Below 768 px the columns stack and the dash stays above each quote:

**"We have a guy who knows his stuff. But when he's on vacation, nobody knows the passwords."**
All the IT rests on one person.

**"We have three vendors. When something breaks, each one blames the other."**
Nobody answers for the whole.

**"We have backup. I think. Nobody's tested it."**
A backup nobody has tested is not a backup.

Closing row (plain text, under the cards): Sound familiar? The IT Health Check takes 30 minutes. → link "How it works" (`/en/it-health-check`)

---

## 3. What we do

Eyebrow: `Services`

**H2:** Three things, seen through to the end

The “two columns” model: eyebrow and H2 anchored left (240 px, sticky on desktop), an empty gutter (no vertical rule — the mockup separates the two columns with whitespace only), and on the right the three services as rows separated by 1 px hairlines — title, paragraph, tertiary link with arrow. No cards, no index numbers (the services are not a sequence):

**IT support and administration**
Computers, servers, network, cloud, and Microsoft 365, on a monthly subscription. A report at the end of every month.
→ See what the subscription includes (`/en/services/it-support`)

**Security and continuity**
Protection, controlled access, and tested backup. NIS2 and ISO 27001, turned into concrete steps.
→ See what we protect and how (`/en/services/security`)

**Automation and software**
We move processes out of Excel and emails into a system. We start from the process, not the technology.
→ See real examples (`/en/services/automation`)

---

## 4. How we work

Eyebrow: `How we work`

**H2:** Four steps. The fourth never ends.

The section head sits on top, full width. Below it, Steps in the “rail” variant: from 1200 px the four steps sit in one row, the numbered circle above the title, the nodes linked by a 1 px `--line` rule with a small teal arrow between them; after the fourth circle the line runs on, with no arrow. Below 1200 px the current grid stays (2 × 2, then one column), with no rule.

Steps:

**1. Health check.** Thirty minutes, free. Ten checks and one page of findings.

**2. Plan.** What we do in the first month, what can wait, with the price next to it.

**3. Onboarding.** We document everything, change the passwords, get the backup in order, and test it.

**4. Month by month.** Monitoring, WhatsApp support, monthly report. You know what's going on without asking.

Link: The full process, stage by stage → `/en/how-we-work`

---

## 5. Why one partner

Eyebrow: `What's different`

**H2:** What you get when one partner answers for everything

List of 5, each a short title plus one sentence (not cards; list with teal markers):

**One phone number, not three vendors.** You call and it gets fixed.

**Security is done, not sold separately.** It doesn't work any other way.

**You see everything, without asking.** Every request becomes a ticket you can see.

**A monthly report from facts, not memory.** You know exactly what you are paying for.

**Large-scale experience, at your scale.** Fortune 500, without the needless complexity.

---

## 6. Support, in short (WhatsApp + Cipri)

Eyebrow: `Support`

**H2:** You write on WhatsApp. You get an answer right away. Nothing gets lost.

Text (two columns: text left, WhatsApp screenshot right, `assets/blog/helpdesk/whatsapp-cipri.jpg`):

Your team writes on WhatsApp, as they'd write to anyone. Cipri picks up the problem and solves it right away, at any hour. What he can't solve becomes a ticket and a person takes over.

We built the system ourselves. → How we built it (`/en/blog/how-we-built-our-own-helpdesk`)

---

## 7. Marius

Eyebrow: `Who answers`

**H2:** Marius Galmati, BitUp founder

Compact section, on `--surface-2`. Text (200 px square portrait left, text right; stays in first person, it's the founder's signed statement):

I've worked in IT since 2017, the last two and a half years in information security at a Fortune 500 corporation. I started BitUp because I'd seen too many companies with technology but nobody to answer for it.

Links: The story, in short → `/en/about` · The team → `/en/team` · LinkedIn → https://www.linkedin.com/in/nicolae-marius-galmati

---

## 8. Results

Eyebrow: `Results`

**H2:** What we've done, with names

Two cards (from the `cases` collection, only `draft: false`; while Cosmio is a draft, the section shows only ProQ and a row "Next case soon, with the client's consent."):

Card: kicker · short title · two sentences from `summary` · link "Read the case".

---

## 9. Partners

Eyebrow: `Partners`

**H2:** What we work with

Static row, four equal cells across the container width, separated by short 1 px `--line` vertical rules (2.8 em, vertically centred): Microsoft Partner · Fortinet Partner · Veeam Partner · Anthropic Partner (logos from `public/logos/parteneri/`, monochrome, with the partnership name written under each). At 640–1023 px, 2 × 2 with a horizontal rule between rows; below 640 px, one column.
Note for Claude Code: the logos are the companies' official ones, from Wikimedia Commons (Marius's decision, 16 October 2026), not the badges from the partner portals. If a file is missing, its cell shows `[[LOGO_PARTENERI]]`, no improvised logos.

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
Yes. Alongside your in-house person, partial, or full. We pick at the health check, once we see what you have.

**Do we have to replace everything we have?**
No. We start from what works. We replace only what's risky or costs more than it's worth.

**How much does it cost?**
Depends on how many workstations and servers you have and on what we take over. You get the price at the end of the health check. On the site it would be wrong for half the companies.

**Can we start with a one-off problem?**
Yes. A migration, a backup put in order, an audit — that is a good way in. Then we see whether a subscription makes sense.

---

## 12. Final band

CtaBand, default variant (from `00-global.md`).
