---
title: "How we built our own helpdesk: WhatsApp, an AI assistant, and a person"
description: "Why I didn't buy a ticketing system, what a support request at BitUp looks like today, from first WhatsApp message to month-end report, and what I learned building it."
pubDate: 2026-09-10
author: "Marius Galmati"
tags: ["IT support", "automation", "AI", "from the inside"]
heroImage: "../../../assets/blog/helpdesk/whatsapp-cipri.jpg"
draft: false
translationOf: "cum-ne-am-construit-propriul-helpdesk"
---

Every business owner I've talked to in recent years has asked, one way or another, the same question: "and when I have a problem, where does it go? Who answers?" Good question. In a small company, IT support usually looks like this: a number you call hoping someone picks up, an email sent Tuesday and forgotten until Thursday, a post-it on the monitor saying "tell X". Nobody knows how many problems there were last month, how long each took, what got fixed, what was left hanging.

I wanted BitUp's answer to be one, and short. So I built the system that gives it.

## Why I didn't buy one

I tried. Ticketing systems on the market are good, but built for corporations: a portal with an account to create and a password to remember, a ten-field form for "my printer doesn't work", per-agent licenses, and a feature list where a 30-person company uses three.

I wanted three things, together. A channel people already use, no account, no new app. A first reply right away, at any hour, not "we will get back to you as soon as possible". And a written trail for every request, so at month's end I can tell the client exactly what happened, not from memory.

The channel was obvious: WhatsApp. My clients' employees are already there all day. The rest I built.

## What a support request looks like today

Here's a real request, from first message to report. I've hidden the client's name and phone numbers.

**1. You write on WhatsApp.** An employee writes to the BitUp support number, in their own words: "hi, I can't connect to the VPN". That's it. No account, no form, no need to know what a ticket is.

**2. Cipri recognizes you.** Cipri, our virtual assistant, identifies the company by phone number and replies in seconds. Not with a paragraph, but with the questions that matter for that problem, and buttons: "There's an error", "It won't connect", "I want a ticket".

![WhatsApp conversation with Cipri: the message "I can't connect to the VPN", the clarifying questions, and the reply buttons](../../../assets/blog/helpdesk/whatsapp-cipri.jpg)

**3. It collects what matters.** Screenshots, error messages, details. For common problems it suggests fix-it steps; if they work, it closes there and nobody else gets bothered. Any time, "I want a ticket" jumps straight to the next step.

**4. It opens the ticket by itself.** When the steps don't solve it, Cipri creates the ticket in BitUp Helpdesk with all the context: who wrote, which company, what problem, what was tried, attachments, priority. A person picks it up, name on the ticket, work time clocked.

![Ticket created automatically in BitUp Helpdesk: description, channel, priority, attachment, WhatsApp conversation, and work timer](../../../assets/blog/helpdesk/tichet-helpdesk.jpg)

**5. You hear back on the same channel.** If you wrote on WhatsApp, the status comes back on WhatsApp. If you opened the ticket from the helpdesk.bitup.ro form, it comes over email. And at month's end, the company gets the report with all its activity: what was asked, what was fixed, how long it took, what's still open. The report is generated from tickets. Nobody writes it from memory.

## What the AI does and what it doesn't

Because I work in security, I know the next question, so I'll answer before it's asked.

Cipri runs on the WhatsApp Business API, with a language model (ChatGPT) behind it. What it does: the immediate first reply, clarifying the problem, fix-it steps for common situations, collecting attachments, opening the ticket with all the context.

What it doesn't do: go into the client's systems, change passwords, run commands, or decide on its own that a problem is closed when the person says it isn't. Anything the steps don't solve goes to a person.

The data: conversations and tickets live in the BitUp platform, isolated per client in the database. One company can't see or touch anything from another. The assistant gets only the current request's context, not access to anyone's infrastructure.

## What I learned building it

**The first reply matters more than a fast fix.** The person writing "it doesn't work" wants, above all, to know someone heard them. A reply in ten seconds, even one that only asks a question, changes the tone of the whole conversation.

**Buttons beat paragraphs.** The first version of Cipri wrote a lot. People didn't read it. Now it asks one question and gives three buttons.

**Write everything down and the monthly report comes on its own.** I didn't build the report as a separate feature. It appeared because every request, every minute worked, and every fix were already written somewhere. The report is just what happened, in order.

**The person stays where it matters.** AI is good at listening, asking, and organizing. Not at taking responsibility. There's always a person's name on the ticket, and that person answers.

**A name matters more than I thought.** Nobody used "the BitUp virtual assistant". "Message Cipri" caught on in the first week.

## Why I'm telling you this

If you're a BitUp client, this is your day-to-day: you don't chase anyone, nothing gets lost, and at month's end you know exactly what you paid for.

If you're not, this is how we work. We built the flow for ourselves, put it in production, and use it daily before proposing it to anyone. We bring the same approach into your company: the process in code, a person where it matters, and a record of everything.

Got a support, ordering, or approval process that lives on the phone and over email? Tell me what keeps repeating and where things get lost. In 30 minutes we'll see whether it's worth automating, and how. It's called the [IT Health Check](/en/it-health-check) and it's free.
