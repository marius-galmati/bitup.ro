# 04 — Security and continuity (`/en/services/security`)

**Title:** IT security, backup, and continuity for companies · BitUp
**Description:** Protection against attacks, access under control, tested backup, continuity plan. Security audit and NIS2 / ISO 27001 preparation for small and mid-sized companies, in words owners understand.

**JSON-LD:** Service (name: "Security and continuity") + FAQPage.

Mandatory anchors: `#backup`, `#audit`, `#nis2`, `#incidents`, `#faq`.

---

## Hero (internal)

Eyebrow: `Security and continuity`
**H1:** Small companies aren't attacked because they're interesting. They're attacked because they're easy.
Lead: Attacks are automated: a program scans the internet and gets in where it's easiest. We make sure you're not the easy spot, and that you recover fast if something happens anyway.
Button: **Free IT Health Check** (`/en/it-health-check`)

---

## Situation

Eyebrow: `Where we start`
**H2:** "We're too small to be attacked"

Text (70ch):

We hear this at every second company and get why: in movies, the hacker picks a target. In reality, a program scans the internet, finds a server with a weak password or unprotected email, and gets in. Doesn't matter if you have 5 or 500 employees. What matters is whether the door's open.

What we see most in a new company: one password on several accounts, no two-step verification; ex-employees' accounts still active; one person with admin rights everywhere; updates months overdue; a backup that runs but nobody's ever restored from; and no plan for the morning nothing works.

None of this needs expensive technology. Just someone to do it and keep it done.

---

## What we protect and how

Eyebrow: `What we do`
**H2:** Six things, in the order they matter

Six cards:

**Access and passwords**
Two-step verification for everyone, a company password manager, admin rights only where needed, accounts closed the day someone leaves.

**Email**
The most common way in. We set up anti-phishing and anti-spoofing (SPF, DKIM, DMARC), filters, and teach people what not to open.

**Workstations and servers**
Managed antivirus or EDR, with someone watching alerts. Updates on time. Encrypted laptop drives. Old systems isolated, not left exposed.

**Network and remote access**
Firewall set up right, separate guest Wi-Fi, VPN for working from home, access limited to what each needs.

**Backup and continuity** → `#backup`
Backup locally and elsewhere, tested regularly, with a written plan: how long the company can go without systems, and how we get back.

**People**
Most incidents start with a click. One hour a year with your team, real examples.

---

## Backup and continuity {#backup}

Eyebrow: `Backup and continuity`
**H2:** You have backup. Do you have restore?

Text (70ch):

Backup is only good if, the morning the server dies, the company is working again by noon. And you only know if someone tested the restore beforehand.

What we do: two copies, in two places (local for speed, another data center for disasters), with retention that covers mistakes found weeks later. Regular restore tests, with report. And two numbers in the contract: how much data you can lose at worst (say, the last 4 hours) and how fast you're back (say, under a business day).

The continuity plan answers questions you don't want to face on a bad morning: what starts first, who calls whom, where people work from, what we tell clients.

Real example: for Cosmio, an accounting platform, we replicate servers to another data center every 4 hours and test recovery quarterly. → Read the case (`/en/results/cosmio`, only when `draft: false`)

---

## Security audit {#audit}

Eyebrow: `Security audit`
**H2:** When you want to know exactly where you stand

Text (70ch):

The free IT Health Check shows the colors in 30 minutes: what's green, what's red. The security audit is the step after, for companies that want the full picture, with proof.

We check everything: access, email, workstations, servers, network, backup. Short talks with the people who matter. A report the owner can understand, priorities in order: what we found, what risk it means, what fixing costs. Then we go through it together, in a meeting. It takes a few days to two weeks, depending on size. Paid separately, quoted first.

What it isn't: a penetration test with "ethical hackers," or a certificate. If you need them, we tell you when and from whom.

---

## NIS2 and ISO 27001 {#nis2}

Eyebrow: `Compliance`
**H2:** NIS2 and ISO 27001, without paperwork for its own sake

Text (70ch):

Two words we hear more and more from owners, usually worried. In short: NIS2 is the European law (in Romania, OUG 155/2024) requiring companies in some sectors, above a certain size, to have real security measures and report incidents. ISO 27001 is the international standard for organizing security, which you go for or a big client asks for.

We tell you in plain words if it applies and how far off you are. We turn requirements into concrete things to do, not boxes to tick. We do the technical part and write documents that actually describe what you do. If needed, we prepare you for an external audit.

How we know: the security experience the founder brought with him, two and a half years of ISO 27001 audits, internal and external, at a Fortune 500 corporation. We've seen what auditors ask for and what doesn't matter. We bring only what matters to your scale.

---

## What happens when it happens {#incidents}

Eyebrow: `Incidents`
**H2:** The first 24 hours

Steps (4):

**1. We isolate.** Stop the spread: disconnect what needs it, change critical passwords, block suspicious access. In the first hour.

**2. We understand.** What happened, where it got in, what was touched. No guesswork, with logs.

**3. We recover.** From a clean backup or the replica in the other data center, in the continuity plan's order. First what keeps the company standing.

**4. We close the door.** Fix what let them in, document, and if the law requires reporting (NIS2, GDPR), do it on time and right.

Row under the steps: If you have an incident now and aren't a client, call. We answer, and nothing to sign first. +40 757 150 894

---

## FAQ {#faq}

Faq:

**We have antivirus. Isn't that enough?**
Antivirus is one part. Most break-ins today aren't infected files but stolen passwords, fake emails, and accounts nobody closed. Antivirus sees none of those.

**What does security cost for a company of 30 people?**
Less than you think if done as part of administration, much more if done after an incident. For support subscribers, basic measures are included. The audit and NIS2 or ISO preparation are quoted separately.

**Does NIS2 apply to us?**
Depends on sector and size. We answer in five minutes at the health check: yes, no, or "probably, because of X." We won't send you to read the law.

**What do you do with our data?**
We manage it, we don't collect it. Access is documented, passwords sit in a password manager, and when we part ways you get everything and access closes. Details are in the contract, not a marketing page.

**Can you guarantee we won't be attacked?**
No. Nobody can, and whoever says so is lying. What we guarantee: the obvious doors are closed, we notice fast if someone tries, and you can recover from a tested backup.

---

## Final band

CtaBand, default variant.
