# 06 — Free IT Health Check (`/en/it-health-check`)

**Title:** Free IT Health Check: where your company stands, in 30 minutes · BitUp
**Description:** 30 minutes, remote, 10 checks: backup, passwords, access, email, updates, security. You get one page: what's fine, what's urgent, and what it would cost. No obligation.

**JSON-LD:** global + FAQPage from § FAQ. No CtaBand; the form is the CTA.

Required anchors: `#how-it-works`, `#form`.

---

## Hero (internal, with the form visible on the right on desktop)

Eyebrow: `Free IT Health Check`
**H1:** In 30 minutes you'll know where your company stands on backup, security, and access
Lead: Remote, with you or your IT person. You get one page: what's fine, what's urgent, and what fixing it would cost. No obligation, no sales pitch.

On desktop, to the right of the hero: the form (§ Form). On mobile, the form comes after § What you get, with a "Jump to form" button in the hero linking to `#form`.

---

## The 10 checks

Eyebrow: `What we check`
**H2:** Ten questions you should know the answer to

Numbered list in two columns (icons allowed here, 20 px, teal):

1. **Does the backup exist, and has anyone ever restored from it?** Not "it's running", but "we pulled something out of it this month".
2. **Who has admin rights, and why?** Usually too many people, and at least one who no longer works for you.
3. **Passwords and two-step verification.** On Microsoft 365 or Google, on the bank, on everything that matters.
4. **Updates on servers and workstations.** When they were last done and who's watching.
5. **Antivirus or EDR, and who looks at the alerts.** An antivirus nobody looks at is just an icon.
6. **The firewall and remote access.** What's open to the internet and why.
7. **Can your email be faked?** SPF, DKIM, DMARC: if they're missing, someone can send emails "from you".
8. **Who owns the domain, the hosting, and the licenses?** On which account, with which card, with which email. We've seen companies lose their domain.
9. **What happens when the person who knows the passwords leaves?** If the answer is "I don't know", that's the most urgent item on the list.
10. **What obligations the company has (NIS2, GDPR), and how far it is from them.** Yes, no, or "probably, because of X".

---

## How it works {#how-it-works}

Eyebrow: `How it works`
**H2:** Three steps, none of them asks you to install anything

Steps (3):

**1. You fill in the form.** Two minutes. We call you within one business day and set a 30-minute slot. `[[CAPACITATE_RADIOGRAFII]]`

**2. We talk for 30 minutes, on video.** You or your IT person. We go through the 10 points. You show us what you have, we ask, we take notes. We don't connect to anything or install anything.

**3. You get the page the same day.** A traffic light on the 10 points, three recommendations in order of urgency, and a cost estimate, if you want to go further. With us or someone else.

---

## What you get

Eyebrow: `What you get`
**H2:** One page, not a 40-page report

Text (two columns, sample report on the right: `[[CAPTURA_RAPORT_RADIOGRAFIE]]`, Figure with the caption "Sample report. The colors are the sample company's, not yours."):

One page you can read in two minutes and pass on to your IT person or business partner. On it: the 10 points in green, yellow, or red, one sentence each; the three things we'd do first, and why; and, if you ask, what it would cost for us to fix them, in the subscription or as a project.

What you don't get: a sales pitch, a follow-up call three days later, or a weekly email. If you want to continue, you write to us.

---

## Form {#form}

Title above the form: **Book the health check**
Short text: Two minutes. We'll call you.

Fields (from `ARHITECTURA.md` § Formulare, kind=radiografie):
- Your name *
- Company *
- How many employees * (select: under 10 · 10–30 · 30–100 · over 100)
- Phone *
- Email *
- What worries you most about your IT? (optional), placeholder: "For example: I don't know if the backup works"
- Consent * (text from `00-global.md`)
- Button: **Send and we'll call you**
- Under the button: the signature from `00-global.md`.

Success → `/en/thank-you?kind=radiografie`.

---

## Who does it

Eyebrow: `Who`
**H2:** Me, not a team of consultants

Text (square portrait on the left):

Marius Galmati, founder of BitUp. I've worked in IT since 2017, the last two and a half years in information security at a Fortune 500 corporation, on ISO 27001 audits and continuity plans. The health check is done by me, not by an automated form: in 30 minutes I see things a form doesn't. → About me (`/en/about`)

---

## FAQ {#faq}

Faq:

**Is it actually free? What's the catch?**
Yes, free. The catch, if you want to call it that: some companies that do the health check become clients, because they see how we work. The rest leave with a useful page. Both are fine with us.

**Do I have to install anything or give you passwords?**
No. We don't connect to anything or install anything, you give us no passwords. You show us what you have on screen and answer questions.

**What happens with what I tell you?**
It stays between us. The notes sit in our system, we don't give them to anyone; if we don't continue, we delete them on request. Details in the [Privacy policy](/en/privacy).

**What if I don't want to continue afterwards?**
Nothing happens. We don't call you or send you offers. You have the page, do what you want with it.

**Can our IT person join?**
Yes, we'd recommend it. It's not a test for them; often they already know the problems and had no one to listen.
