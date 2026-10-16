---
title: "ProQ: the quality planning platform for automotive suppliers, built by BitUp"
client: "ProQ (a BitUp product)"
kicker: "Custom software and our own product"
summary: "ProQ is the APQP software developed entirely by BitUp and sold as SaaS to automotive suppliers. A product, not a project: 29 modules, hosted in our private cloud, in the EU, continuously updated, with support from the people who wrote it."
logo: "/logos/proq.svg"
logoDark: true
facts:
  - { k: "Product", v: "ProQ · pro-q.ro" }
  - { k: "BitUp's role", v: "100% development, hosting, operations, updates, support" }
  - { k: "For", v: "Automotive suppliers" }
  - { k: "Model", v: "SaaS, per-user subscription, hosted in BitUp's private cloud" }
  - { k: "Coverage", v: "29 modules, all 6 APQP phases, from kick-off to series production" }
numbers:
  - { v: "29", k: "modules, grouped by the 6 APQP phases, from planning to series life" }
  - { v: "8", k: "automotive industry standards implemented in the platform" }
  - { v: "2,293", k: "automated tests that run on every update, before it reaches clients" }
  - { v: "0", k: "implementation projects: import the data, run the first program" }
service: "automatizari"
order: 2
draft: false
---

## The situation

### Every automotive supplier runs the same process. Few have a system for it.

An automotive supplier has to prove to its customer, for every new part, that its process is under control: APQP planning, risk analysis (FMEA), control plan, measurement studies (MSA), statistical control (SPC), PPAP file. The same phases, the same gates, the same documents, at every plant in the world.

In practice, the process lives in dozens of Excel files that don't talk to each other, or in a generic platform every company has to configure for months before using it. Documents get written after the work, not during it, and the gaps show up at the audit.

ProQ came out of real work in a factory, not market research: we built the system that implements the process as it is, instead of asking the client to build it themselves.

## What we built

### The process, delivered as software

Phases, gates, deliverables, and rating scales are fixed in code, not in per-company settings. There is nothing to configure: import a control plan and run a program through the gates.

- **The core tools.** APQP programs, process flow diagram, FMEA (process and design), control plan, PPAP and PSW, MSA, metrology, SPC. Each document builds the next: flow → PFMEA → control plan → inspection and gage studies → the PPAP file.
- **Quality assurance.** In-process inspection, run at rate, safe launch plan, capability study, handover audit to production. Records are created by doing the work, not by documenting it afterwards.
- **Monitoring and compliance.** 8D complaints, pre-audit and preparation, customer-specific requirements, change control, packaging, certificates of conformity. Gaps are visible, not hidden.
- **Management and operations.** Portfolio dashboard, KPI targets, SQDCM board, daily meeting and gate reviews, workload and tasks, lean, cost tracking and COPQ, reports, alerts, and calendar.
- **The digital thread.** On every characteristic, from one end to the other: operation → failure mode → control point → measuring instrument → capability. Each link is green, yellow, or red, weakest first, and the missing study is created with one click.
- **Roles and AI Assist.** Five roles with separate approvals (administrator, program manager, quality, member, reader); a reader changes nothing, anywhere. AI assistance for drafting and explanations; the statistics come from code, not from language models.

## Figures

### What a product, not a project, means

ProQ is maintained as a product: the same version for all clients, updates included in the subscription, including when the methodology changes. (Rendered from `numbers`.)

## How it's operated

### Hosted in BitUp's private cloud

- **Hosted in our private cloud, in the EU.** ProQ runs as a container with a PostgreSQL database alongside, in BitUp's private cloud. Updates are not paid for separately.
- **Data isolation between companies is in the architecture, not in a filter.** Every record belongs to a company, and every query is limited to the user's company through a base class every model inherits.
- **No external dependencies at runtime.** The application is server-rendered, no build step, all components included; no requests to third-party CDNs.
- **Backup, retention, and data residency** are written in the hosting contract, not on a marketing page.
- **Support over email, from the people who wrote the code.** No level 1 reading from a script.

## What it proves

### Why it matters for your company

When BitUp proposes custom software or an automation to a company, it isn't proposing an idea. We built, launched, and operate a product for an industry where every document gets audited. We bring the same way of working to smaller projects: the process in code, not in configuration; records created during the work; errors visible, not silent; and we answer for running it, not just delivering it.

Details, modules, and pricing: [pro-q.ro](https://pro-q.ro).

---

Footnote (rendered by the layout): "ProQ is a BitUp Technology product."
