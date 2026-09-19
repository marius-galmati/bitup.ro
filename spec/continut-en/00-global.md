# 00 — Global elements

Final copy. Copy verbatim. `[[…]]` = placeholder from `PLACEHOLDERS.md`.

## Menu

- Services ▾ (full-width panel, DESIGN.md § Panoul „Servicii”)
  - IT support and administration → `/en/services/it-support`
  - Security and continuity → `/en/services/security`
  - Automation and software → `/en/services/automation`
  - All services → `/en/services`
  - In the panel, each service carries the positioning sentence from `02-services.md` § The three groups under its title; the left column reuses the H1 and lead from § Hero of the same page; the box on the right reuses the question and button from § Final CTA band; the bottom strip has the phone, the email, and “Client support” → `/en/support`. The wording is reused, not rewritten.
- How we work → `/en/how-we-work`
- Results → `/en/results`
- About → `/en/about`
- Blog → `/en/blog`
- Phone (link `tel:+40757150894`): `+40 757 150 894`
- Language switcher: `RO · EN` (`aria-label`: "Change language")
- Theme switcher (icon button; `aria-label`: "Switch theme: light / dark"; same `title`)
- Primary button: **Free IT Health Check** → `/en/it-health-check`

Mobile menu, bottom: `Call: +40 757 150 894` · `Clients: message Cipri on WhatsApp` → `/en/support` · `RO · EN` · theme

## Footer

**Column 1 — the company**
BitUp Technology SRL
Cluj-Napoca, Romania
VAT no. RO42613248 · Trade Register no. J12/1556/2020
office@bitup.ro · +40 757 150 894
LinkedIn: [BitUp Technology](https://www.linkedin.com/company/bitup-technology)

Note for Claude Code: Marius's personal LinkedIn profile doesn't appear in the footer; it appears on About, on Contact, and in the author box. The registered office (Câmpia Turzii) doesn't appear in the footer. It appears only in the identification block on `/en/terms` and `/en/privacy`, where the law requires the controller's full details.

**Column 2 — services**
IT support and administration · Security and continuity · Automation and software · Free IT Health Check

**Column 3 — the company**
How we work · Results · About · Team · Blog · Contact · Client support

**Column 4 — partners**
Microsoft Partner · Fortinet Advocate · Veeam Partner · Anthropic Partner (badges from [[LOGO_PARTENERI]], level under each)

**Bottom row**
© 2026 BitUp Technology SRL · Terms → `/en/terms` · Privacy → `/en/privacy` · Cookies → `/en/cookies` · Cookie settings (button, reopens the banner) · `RO · EN`

## Consent banner (cookies)

Shows on first visit, at the bottom, without blocking the page. Text:

**Title:** Statistics cookies, only if you want them
**Text:** We use Google Analytics to see which pages get read and where visitors come from. It doesn't start until you accept, doesn't run ads, and doesn't sell anything to anyone. You can change your mind anytime from "Cookie settings" at the bottom of the page. [How we use cookies](/en/cookies)
**Buttons (equal):** **Accept** · **Decline**

When reopened from the footer, same text, with the current choice marked under the buttons: "Currently: accepted" / "Currently: declined".

## Final CTA band (CtaBand)

Default variant (homepage, services, how we work, results, about):

**What would a day be like without worrying about systems, backups, and data security?**
Start with 30 minutes. We'll tell you exactly where you stand and what it would mean for us to take that worry off your hands.
Button: **Book the IT Health Check** → `/en/it-health-check`
Under the button, mono: `+40 757 150 894 · office@bitup.ro`

Variant for blog and case studies:

**Want to see where your company stands with IT?**
30 minutes, remote, 10 checks, one page with what's fine, what's urgent, and what it would cost. No obligations.
Button: **Book the IT Health Check**

Variant for the IT Health Check page (no band; the form is the CTA).

## FactStrip (removed from under the homepage hero on 17 September 2026, at Marius's request)

Note for Claude Code: the strip no longer appears on the homepage. The values stay here because the component QA page uses them, and the `FactStrip` component is still used on About, on the case studies, and on Contact.

The four cells were, on `--surface`, full container width: `Since 2020` · `Cluj-Napoca` · `Response under 2 hours during business hours` · Microsoft Partner · Fortinet Advocate · Veeam Partner · Anthropic Partner (badges from [[LOGO_PARTENERI]], monochrome; text until they exist). The hero has no trust row: the information doesn't appear twice on the same screen.

("Response under 2 hours" is the contractual time during business hours; the real helpdesk average, under 30 minutes, appears in the copy on /en/services/it-support, /en/how-we-work, and /en/support, not in the FactStrip.)

## Signature under forms

"A person replies, within one business day." (text row in `--muted`, no avatar)

## Author box (articles)

96 px portrait + "Marius Galmati, BitUp founder. In IT since 2017, the last two and a half years in information security at a Fortune 500 corporation. He writes about what surfaces when you run IT for small companies: what breaks, what repeats, what's worth automating." Link: LinkedIn → https://www.linkedin.com/in/nicolae-marius-galmati

(Third person, deliberately: it's a bio box, not the company's voice.)

## Consent (checkbox, both forms)

"I agree that BitUp Technology SRL may use the details above to reply to this request. We don't use them for anything else and don't pass them on. Details in the [Privacy policy](/en/privacy)."

## Form messages

- Required field empty: "Fill in [field name] so we can call you back."
- Invalid email: "That email doesn't look right. Please check it."
- Invalid phone: "Write the number with the prefix, for example 0740 123 456."
- Send error: "It didn't send. Not your fault. Your text is still here; try again in a minute, or call us directly at +40 757 150 894 / write to office@bitup.ro."
- Anti-spam check failed (Turnstile): "The anti-spam check didn't pass. Reload the page and try again; if it keeps happening, email us directly at office@bitup.ro."
- Button while sending: "Sending…"
- Without JavaScript (`<noscript>`, both forms): "The form needs JavaScript for the anti-spam check. Call +40 757 150 894, write to office@bitup.ro, or pick a time in the calendar." + the Calendly link (https://calendly.com/marius-galmati-bitup/30min).

## The /en/thank-you page

Title: Got it. What happens next · BitUp
Description: Your request has reached us. Here's what happens next.
`noindex`

**H1 (kind=radiografie):** Got it. We'll call you.
Text: "The request came to us, not to a queue. We'll call within one business day, we'll pick a 30-minute slot for the health check, and we'll tell you what we need from you beforehand (almost nothing: who your IT person is, if any, and what brought you here)."
Row under text: "If you'd rather skip the call, pick a 30-minute slot directly: [Pick a time in the calendar](https://calendly.com/marius-galmati-bitup/30min)" (external link, new tab, `data-event="calendly_click"`).
Meanwhile, two useful things: [How a health check works](/en/it-health-check#how-it-works) · [How we work afterward](/en/how-we-work)

**H1 (kind=contact):** Got your message.
Text: "We'll reply personally, within one business day, from office@bitup.ro. If it's urgent, call +40 757 150 894."
Row under text: "Want to talk directly? [Pick a 30-minute slot](https://calendly.com/marius-galmati-bitup/30min)"

## The 404 page

Title: Page not found · BitUp
**H1:** This page doesn't exist.
Text: "Maybe it moved when we rebuilt the site, maybe it's a typo. What you're looking for is most likely here:"
Links: Services → `/en/services` · Free IT Health Check → `/en/it-health-check` · How we work → `/en/how-we-work` · Contact → `/en/contact`
Under: "If you got here from a link on another site, email us at office@bitup.ro and we'll fix it."
This English block sits under a rule, below the Romanian version (from `continut/00-global.md` § 404), because there's one 404 page.

## Miscellaneous microcopy

- "Learn more" links are never used. Links say what comes next: "See what the subscription includes", "How a health check works", "Read the Cosmio case".
- The WhatsApp button on /en/support: "Message Cipri on WhatsApp".
- Reading-time label on the blog: "5 min read".
- Draft label (staging only): "Draft, unpublished".
- Theme switcher: `aria-label` "Switch theme: light / dark".
- Language switcher: `aria-label` "Change language"; the RO link has `hreflang="ro"` and `lang="ro"`.
- External links (Calendly, LinkedIn, helpdesk.bitup.ro, wa.me): open in a new tab, with `rel="noopener"`; no "external link" icon.
- Date on the legal pages: "Last updated: September 10, 2026".
- Skip link (first focusable element on the page): "Skip to content".
- Menu (hamburger) button, `aria-label`: "Menu" when closed, "Close menu" when open.
- `aria-label` on the header navigation: "Main navigation".
- `aria-label` on the footer navigation: "Secondary navigation".
- `aria-label` on the consent banner region: "Cookies".
- `aria-label` on the table of contents on the legal pages: "Contents".
