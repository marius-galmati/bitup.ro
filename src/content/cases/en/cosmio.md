---
title: "Cosmio: a cloud accounting platform, with backup, replication, and a recovery plan, from a single partner"
client: "Cosmio Fintech SRL"
kicker: "Cloud, backup, and disaster recovery"
summary: "Cosmio is an automated accounting platform for service companies. Since March 2026, BitUp hosts, protects, and operates its production infrastructure, on a monthly subscription, with recovery objectives written into the contract and tested quarterly."
logo: "/logos/cosmio.svg"
logoDark: false
facts:
  - { k: "Client", v: "Cosmio Fintech SRL" }
  - { k: "Industry", v: "Fintech · automated accounting (SaaS)" }
  - { k: "Services", v: "Managed cloud hosting, backup, disaster recovery, operations and maintenance" }
  - { k: "Since", v: "March 2026, monthly subscription" }
  - { k: "Data", v: "EU only: production in Cluj-Napoca, DR in Germany" }
numbers:
  - { v: "≤ 4", unit: "hours", k: "RPO: maximum data loss allowed, aligned with 4-hour replication" }
  - { v: "≤ 15", unit: "min", k: "Technical RTO: server started from the DR replica" }
  - { v: "1–2", unit: "hours", k: "RTO end-to-end: application working and validated by the client after failover" }
  - { v: "24/7", k: "Coverage for critical incidents: response under an hour, resolution under 4 hours" }
  - { v: "4", unit: "/ year", k: "Disaster recovery tests, isolated, without stopping production, with a client-approved report" }
service: "securitate"
order: 1
footnote: "Case study published with the consent of Cosmio Fintech SRL. It contains no details of the client's internal system configuration, no personal data, and no contract values. Cosmio can request its withdrawal at any time."
draft: true
consent: "[[ACORD_COSMIO]]"
---

## The situation

### A platform that can't afford to lose data

Cosmio keeps the books up to date for its clients' companies. If the platform stops or loses data, its clients stop too. The Cosmio team builds the product; it doesn't want to build an infrastructure department as well.

The requirements were clear from the start: data stays in the European Union, data centers are ISO/IEC 27001-certified, recovery objectives (how much time and how much data can be lost) are written down, measured, and tested, and responsibility for the whole infrastructure sits with a single partner.

## What we delivered

### Everything included, operated by BitUp

We didn't sell components. We took over responsibility for the whole chain: from the server the application runs on to the test that proves recovery after a disaster.

- **Managed cloud hosting.** Production virtual servers (Windows and Linux) in an ISO/IEC 27001-certified data center in Cluj-Napoca, on mirrored NVMe storage. BitUp operates the virtualization platform and the storage, with guaranteed resources.
- **Deployment and migration.** Installing and hardening the operating systems, installing and configuring the PostgreSQL database, deploying the application and connecting it to the database, migrating an existing server. Critical parameters documented for operations and restore.
- **Local backup, tested.** Image-level backup for all servers, on dedicated mirrored storage, with daily retention for 7 days and extra points at 14, 30, and 90 days. The restore was tested at go-live, not assumed.
- **Off-site disaster recovery.** Veeam replication every 4 hours to a second ISO/IEC 27001-certified data center, in Germany, with three restore points kept. Failover and failback operated by BitUp, with a temporary access point provided in case of disaster.
- **Built-in security.** Firewall and access restricted strictly to the ports needed, encrypted transport between the two locations (WireGuard, ChaCha20/Poly1305), operating systems hardened and updated in announced maintenance windows, with emergency patching for critical vulnerabilities.
- **Operations and maintenance.** Daily monitoring of backup and replication jobs, incident support by severity level, a quarterly disaster recovery test with a written report, a recovery runbook, operational records, and a single communication channel: BitUp Helpdesk.

## Commitments

### Figures written in the contract, not in a brochure

Every objective below is defined in the contract, measured at every test, and reported to the client.

## How we work

### Clear responsibilities, documented decisions

- **BitUp answers for the infrastructure:** servers, storage, backup, replication, failover and failback, transport security, updates, records.
- **Cosmio answers for the application and the data:** it validates functionally after any restore or failover and approves changes that touch the recovery objectives.
- **Any major change goes through a change request** with impact, risk, implementation plan, and rollback plan, approved by the client first.
- **The failover decision is made together**, recorded in the ticket, and in critical cases BitUp is authorized to act immediately and document.
- **A single channel:** BitUp Helpdesk, with full traceability for every incident, restore, and test.

## Result

### What changed for Cosmio

The Cosmio team knows, in writing, how much data it can lose in the worst case and how fast the platform comes back. Backup is no longer an assumption: it's tested every quarter, with a report. And when a problem comes up, there's one number to call and one partner accountable.

> [[CITAT_COSMIN]]
> — Cosmin Cenan, managing director, Cosmio Fintech SRL
