# 16 — Team (`/en/team`)

**Title:** The BitUp Technology team · BitUp
**Description:** The people behind BitUp: information security, offensive security, AI and automation, software development, trained at Bosch, NTT DATA, Marsh, Concentrix.

**JSON-LD:** global + `ProfilePage`. One `Person` node for each of the four: `name`, `jobTitle`, `sameAs` (LinkedIn). Only the node for Marius Galmati gets `worksFor` → `Organization` BitUp Technology SRL, with `jobTitle: "Founder"`. For the other three do NOT add `worksFor`, `memberOf` or `affiliation` until `[[RELATIE_ECHIPA]]` is filled in; their relationship with the company is not settled in the text yet and we do not declare it in structured data ahead of the text. The company names in the experience row do NOT go into JSON-LD in any form.

**Indexing:** the page gets `noindex, nofollow` and is excluded from `sitemap.xml` while `[[ACORD_ECHIPA]]` is empty. Once it is filled in, remove `noindex` and put the page back in the sitemap. The link from `/en/about` and the one in the footer work either way.

---

## Hero (internal, typographic, one column, no image)

Eyebrow: `The team`
**H1:** The people behind BitUp.
Lead: Four specializations that complete each other: information security and infrastructure, offensive security, artificial intelligence and automation, software development. Each one's experience was built at international companies: Bosch, NTT DATA, Marsh, Concentrix.

---

## Intro

Text (Prose, 70ch, right under the hero, no eyebrow and no H2):

BitUp runs on a permanent core and on specialists dedicated to the areas where we do not improvise. Every problem reaches the person who has met it before, not the first one available. [[RELATIE_ECHIPA]]

---

## The people

Four rows, in the order below.

### Marius Galmati
Role (mono): `Founder`
Experience (mono, `--muted`): `Enterprise background: Concentrix (Fortune 500)`
Photo: `[[FOTO_MARIUS]]`
LinkedIn: https://www.linkedin.com/in/nicolae-marius-galmati

Over ten years in IT, from local companies to the enterprise world, at an American Fortune 500 corporation. In all of them he found the same problem: organizations with technology bought correctly, but with no structure behind it. No written procedures, no processes that run the same way twice, nobody answering for the whole picture, and security postponed until "later."

He worked through system administration, infrastructure, and SLA support, then moved into information security and stayed there. He was part of the team that prepared the ISO 27001 audit: he wrote the documentation and the procedures, implemented controls and processes, and covered the continuity plans and the protection of workstations and servers. That is where he saw that order can be built, written down, and proven.

He founded BitUp in 2020, to bring that order to the scale of Romanian companies, without a corporation's apparatus. His goal now: for companies in Romania to reach the security standards their partners and clients abroad ask for, with processes, procedures, and digitization put in the order that makes sense for the business, not for a checkbox.

### Petre Radu Cătălin
Role (mono): `Red Team & Offensive Security`
Experience (mono, `--muted`): `Enterprise background: NTT DATA`
Photo: `[[FOTO_PETRE]]`
LinkedIn: https://www.linkedin.com/in/petreradu

Petre is a penetration tester at NTT DATA, working in offensive security. His experience covers penetration testing of web applications and APIs, of network infrastructure and cloud environments, with a particular focus on IAM abuse and privilege escalation paths, exactly the areas real attackers hit first.

He has worked in an enterprise environment, for very large clients, and he knows what a penetration test done properly means: not just findings, but real business risk. On the Red Team side, he approaches every simulation as a real campaign, from recon and the first vulnerability exploited, through to domain compromise and the report that explains in plain terms how it happened.

What recommends him on client projects is that he covers the full cycle of an engagement: from the first conversation and defining the scope, through execution, final report, and retesting after remediation, so nothing is left open. He communicates clearly with everyone involved in a project, from technicians to management, and his coaching qualification shows in every presentation of results: technically exact, but understandable to any audience.

### Samuel Bota
Role (mono): `AI & Innovation Specialist`
Experience (mono, `--muted`): `Enterprise background: Marsh`
Photo: `[[FOTO_SAMUEL]]`
LinkedIn: https://www.linkedin.com/in/samuel-bota-6b7aa31a9

Samuel is an AI & Innovation Specialist passionate about exploring how emerging technologies can solve real-world problems. His work focuses on AI R&D, LLMs, agentic systems, and building practical AI solutions. He enjoys taking ideas from experimentation to real-world applications while continuously exploring new technologies and approaches. He is particularly interested in how AI can enhance cybersecurity, automation, and the way businesses operate. Samuel brings curiosity, technical expertise, and a passion for innovation to the team, helping turn ambitious ideas into reality.

### Cristian Boanca
Role (mono): `Full Stack Developer`
Experience (mono, `--muted`): `Enterprise background: Bosch`
Photo: `[[FOTO_CRISTIAN]]`
LinkedIn: `[[LINKEDIN_CRISTIAN]]`

A full stack developer, three years in the field, with experience built in a large industrial environment. Next.js and React on the front, NestJS and Python on the server, TypeScript and PostgreSQL for the rest. These are deliberate choices, so we can maintain what we build, not just ship it.

At BitUp he builds the applications clients commission and the integrations that connect the programs they already have. He starts from written requirements: what goes in, what comes out, who sees what, what happens at exceptions. Only then does he write code. That is why deliveries come without surprises, and why the application is still explainable a year later, when someone asks why it was done that way.

---

## What this means for you

Eyebrow: `What it means for you`
**H2:** Four specializations, one point of contact

Text (Prose, 70ch):

You do not end up coordinating four people yourself. Every project has one person accountable on the BitUp side, who brings in the right specialist when needed and answers for the final result. You have one phone number, one monthly report, and one person who explains what was done.

The combination matters more than the sum: security designed in from the start, checked by someone who breaks into systems for a living, with automation and applications built by people who work from written requirements. The three are rarely found together at the scale of a mid-sized company.

---

## Final band

CtaBand, default variant, with the title: **Want to see what this team can do for your company?** / 30 minutes, free, no obligation. We'll tell you exactly where you stand and who would take on what. / Button: **Book the IT Health Check**
