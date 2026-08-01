# Mission Blueprint

## Ethical Hacking & VAPT — Module 1, Mission 1
## What Is Ethical Hacking?

**Blueprint Version:** 1.1
**Status:** Production Ready
**State:** Frozen
**Based On:** Module Design Document v1.1, Section 11 — Mission 1 Blueprint
**Source Materials:** None available — MDD-only generation
**Date:** 2026-08-01

---

> **FROZEN DOCUMENT.** This blueprint is the authoritative planning reference for Mission 1 content generation. Future lesson generation must consume this blueprint — never modify it. If inconsistencies are discovered during generation, record them in REVIEW_NOTES.md and continue generating. Do not alter this file.

---

> **Note on Source Material:** No IIIT Bangalore PDFs, lecture transcripts, Zoom chats, or course notes were found anywhere in the project at the time this blueprint was frozen. When source materials are provided, they must be reviewed against this blueprint for alignment. Any gaps or conflicts must be recorded in REVIEW_NOTES.md before content generation resumes.

---

---

## Section 1 — Mission Goal

Establish the foundational definition of ethical hacking, the professional requirement of authorisation, and the distinction between ethical and malicious hacking.

The single non-negotiable outcome of this mission: the learner must finish understanding that **written authorisation from the system owner is what distinguishes ethical security testing from unauthorised access** — not skill, not intent, not whether damage was caused.

Every block in this mission exists to build toward and reinforce that one principle.

---

---

## Section 2 — Learning Objectives

Upon completing Mission 1, learners will be able to:

1. Define ethical hacking in their own words, correctly referencing authorisation, scope, and professional context — not merely "hacking with permission"
2. Explain the defining professional difference between a criminal hacker and an ethical hacker, and understand why authorisation is the key distinguishing factor
3. Describe what written authorisation means and why verbal permission is insufficient in professional security practice
4. Define the concept of scope in a penetration testing engagement and give one example of an in-scope and one out-of-scope activity
5. Explain the term VAPT and distinguish a Vulnerability Assessment (identifies weaknesses) from a Penetration Test (validates and proves exploitability)

---

---

## Section 3 — Mission Success Criteria

A learner has successfully completed Mission 1 when they can demonstrate all of the following without assistance:

- ✓ Explain ethical hacking in their own words without using "hacking with permission" as the complete definition — they must reference authorisation, scope, and professional context
- ✓ State the defining professional difference between ethical security testing and unauthorised access (written authorisation from the system owner)
- ✓ Explain why verbal agreement is insufficient as a substitute for written authorisation in professional security engagements
- ✓ Given a scenario (e.g., "A developer tests a client's API without a signed contract"), correctly identify whether the activity is authorised and explain why
- ✓ Define scope in their own words and give one example of an in-scope activity and one out-of-scope activity
- ✓ Distinguish between a Vulnerability Assessment and a Penetration Test in two or fewer sentences
- ✓ Expand the acronym VAPT and explain what the combined methodology offers over either component alone

---

---

## Section 4 — Required Concepts

All of the following must appear in Mission 1. No required concept may be omitted, abbreviated beyond recognition, or deferred to a later mission.

| # | Concept | What Must Be Covered |
|---|---|---|
| 1 | Definition of Ethical Hacking | Authorised, scoped, professionally conducted security testing — not just "good intent" |
| 2 | Authorisation as a Professional and Legal Requirement | Written permission from the system owner defines the boundary of ethical security testing; regardless of intent or outcome, testing without explicit authorisation is never professionally acceptable and carries significant consequences |
| 3 | Written vs. Verbal Permission | Why verbal agreements are insufficient in professional security practice and what "written" means in the context of an engagement |
| 4 | Scope | Definition, importance, and what constitutes a scope violation — including the principle that crossing scope is a violation even if the finding is critical |
| 5 | Rules of Engagement (Introduction) | Brief introduction only — what it is and why it exists; full treatment is covered in a later mission |
| 6 | Vulnerability Assessment vs. Penetration Test | VA identifies weaknesses; PT validates and proves exploitability — they are not synonyms |
| 7 | VAPT | The combined methodology; what it means in professional practice |
| 8 | The Three Core Constraints | Permission, Scope, Confidentiality — the operating framework every ethical hacker works within |

---

---

## Section 5 — Optional Concepts

These may be introduced if they appear naturally in context, but must never displace time or attention from Required Concepts:

| Concept | Condition for Inclusion | Notes |
|---|---|---|
| Legal statute names (Computer Misuse Act, CFAA) | If source material references them | Brief mention as examples only — not the focus; full legal and regulatory treatment is covered in a later mission |
| Brief history of ethical hacking as a profession | If the story benefits from historical grounding | Should not become a history lesson |
| Bug bounty programmes | If the Micro Practical naturally introduces them | Brief mention as a context example only; full treatment is covered in a later mission |
| Concept of CVE and CVSS | NOT included in this mission | Covered in a later mission (Reporting); the existing mission.json placeholder incorrectly listed this as a Mission 1 objective — corrected in the production freeze |

---

---

## Section 6 — Key Terminology

The following terms must be introduced, defined in plain language, and anchored with an example or analogy before the mission ends. No term may appear in a block without an explanation on first use.

| Term | Plain-Language Definition Required |
|---|---|
| Ethical Hacking | The authorised, scoped, professionally conducted process of testing a system's security to find vulnerabilities before attackers do |
| Authorisation | Formally documented permission from the system owner to conduct security testing, typically established through a signed engagement agreement |
| Scope | The defined boundaries of what a tester is permitted to test — systems, time period, methods allowed |
| Penetration Testing (Pen Test) | An authorised, controlled attack simulation that attempts to exploit vulnerabilities to demonstrate real-world impact |
| Vulnerability Assessment | A systematic scan and review to identify and catalogue security weaknesses — without attempting to exploit them |
| VAPT | Vulnerability Assessment and Penetration Testing — the combined methodology used in professional engagements |
| Rules of Engagement (RoE) | The document specifying exactly what a tester is and is not permitted to do during an engagement |
| Scope Violation | Any action taken by a tester outside the defined boundaries of their authorisation |
| Confidentiality | The obligation to protect client data and findings from disclosure outside the engagement |

---

---

## Section 7 — Story Concept

**Story Type:** Character contrast — two people, same skill level, different outcomes
**Narrative Purpose:** The story introduces the core principle (authorisation as the professional and legal boundary) through human experience before the lesson names and formalises it

**Story Structure:**
- **Setup:** Introduce two characters with identical technical skills — both capable, both genuinely interested in security, both noticing the same vulnerability in a system
- **Divergence:** One character acts without authorisation — motivated by curiosity or a genuine desire to help, but without written permission. The other operates within a formal, documented engagement with the same objective.
- **Consequence:** The unauthorised character faces real consequences — legal, professional, or personal — despite causing no damage and genuinely meaning well. The authorised tester completes their work, reports findings, and is thanked.
- **End point:** The story ends at the moment of consequence, before any explanation. The lesson that follows explains *why* this happened.

**Tone:** Human, specific, non-judgmental toward the unauthorised character — the story should create empathy for someone making an understandable mistake, which makes the lesson more effective, not less.

**Requirements:**
- Both characters must be named and specific — not "a hacker" and "an ethical hacker"
- The setting must be concrete (e.g., a startup's web application, a hospital system, a retail company's checkout page)
- The vulnerability discovered must be real but non-technical — something a beginner can picture (e.g., "a login page that accepted any password for admin accounts")
- The consequence must be credible — not over-dramatised, not trivialised
- The story must contain no unexplained technical jargon
- The story must not name any real company, person, or incident

**What the story must NOT do:**
- Name the principle it illustrates (the lesson does that)
- Preach or moralize — it should show, not tell
- Make the authorised character seem smug or the unauthorised character seem stupid

---

---

## Section 8 — Real-World Case Study Recommendation

**Case Study Theme:** An individual who discovered a genuine security vulnerability in a company's system without authorisation, reported it in good faith, and still faced serious professional or legal consequences

**Why this theme:** It is the most direct illustration of Required Concept 2 — that authorisation matters regardless of intent, good faith, or whether harm was caused

**Scenario Parameters for the Fictionalised Case Study:**
- The discoverer was technically skilled and found a real, significant vulnerability
- No data was stolen, no systems were damaged
- The discoverer disclosed the vulnerability to the company
- Consequences — including potential legal action — occurred regardless of disclosure and good intent
- The contrast: a security researcher operating under a formal Bug Bounty or engagement contract would have been thanked and compensated for the same discovery

**Case Study Structure (must follow MDD Section 14.3):**
1. What happened, in plain language
2. Why it happened — specifically which required concept made this the outcome
3. What would have changed the outcome — the countermeasure that Mission 1 teaches

**Content requirement:** The case study must be entirely fictionalised. It may draw structural parallels to real-world patterns (unauthorised disclosure incidents are well-documented in public record) but must not reference or closely adapt any specific real incident or real person.

---

---

## Section 9 — Memory Anchor Concept

**Anchor Target:** The three core constraints of ethical hacking — Permission, Scope, Confidentiality

**Anchor Approach:** A structural analogy that maps all three constraints to something the learner already understands from everyday life

**Design Direction:**
- The analogy should use a professional context the learner can visualise — a contractor, inspector, auditor, or similar authorised professional who works inside someone else's space
- The three constraints should map *structurally* — each element of the analogy must correspond directly to Permission, Scope, and Confidentiality, not merely sound similar
- The anchor must survive examination: if a learner applies it to a novel scenario, it should still hold

**Key requirement from MDD (Section 13.6):** The memory anchor must be **familiar** (learner already knows the reference), **structural** (maps to the concept under examination), and **sticky** (specific enough to be memorable). Generic analogies ("think of it like a lock and key") are not acceptable.

**Suggested structural framing for the content writer:** Consider analogies where a professional is given: (1) explicit permission to enter a space, (2) defined rooms or areas they may access, and (3) an obligation to keep what they find confidential. The content writer should choose the most specific and vivid version of this that feels natural for the target audience.

---

---

## Section 10 — Interactive Diagram Concept

**Diagram Title:** The Authorisation Boundary

**Diagram Purpose:** Visually illustrate the professional boundary that separates identical technical actions — one authorised, one not — and show the three core constraints that define the authorised side

**Diagram Type:** Split-panel node diagram

**Structure:**

```
LEFT PANEL — Authorised Testing        RIGHT PANEL — Unauthorised Access
────────────────────────────────       ──────────────────────────────────
[Written Authorisation]                [No Authorisation]
        ↓                                       ↓
[Defined Scope]                        [No Defined Boundary]
        ↓                                       ↓
[Confidentiality Obligation]           [No Accountability]
        ↓                                       ↓
[Ethical Hacker ✓]                     [Unauthorised Actor ✗]
```

**Central element:** A vertical line or boundary between the two panels, labelled "Authorisation" — visually representing the single thing that distinguishes them

**Colour guidance:**
- Left panel: cyber-green accent — authorised, professional, legitimate
- Right panel: red accent — unauthorised
- Central boundary: cyan — the key concept

**Interactivity:** Each node on hover/tap should show a one-sentence explanation of what that element means in practice

**Caption:** "Identical technical skills. Different outcomes. Authorisation is the only variable."

**Note for diagram writer:** This diagram is deliberately conceptual, not technical. It should not show tools, network diagrams, or technical components. It is a visual representation of the professional distinction between authorised testing and unauthorised access.

---

---

## Section 11 — Questions Learners Commonly Ask

These questions should be anticipated in the Student Questions block. Answers must be clear, direct, and calibrated to a beginner audience.

| Question | Handling Direction |
|---|---|
| "If I find a vulnerability and don't damage anything, is it still a problem?" | The handling direction should be clear and emphatic without making jurisdiction-specific legal claims: in professional cybersecurity practice, security testing without explicit authorisation is never acceptable — regardless of intent, damage, or whether findings are disclosed. The exact consequences vary by jurisdiction, but the professional standard is universal and unambiguous. |
| "What does written authorisation actually look like — is an email enough?" | Acknowledge this is a real and important question. Give a brief, honest answer (an email can provide some protection but a signed engagement agreement is standard professional practice). Direct the learner to a later mission for the full treatment of engagement documents. |
| "Is bug hunting the same as ethical hacking?" | Brief answer: bug bounty programmes are one authorised context for ethical hacking. There are many others. The defining feature is always authorisation — not the format of the engagement. |
| "What's the difference between a hacker and a penetration tester?" | At this level: the words describe related but different things. "Hacker" describes a capability; "penetration tester" describes a professional engaged under contract. Both can refer to the same person in different contexts. |
| "Can a company take action against me for reporting a vulnerability even if I didn't intend harm?" | Careful handling required. Acknowledge that the professional and legal landscape is genuinely complex and varies by jurisdiction. The safe answer: the strongest professional protection — and the standard professional practice — is written authorisation before any testing begins. Direct the learner to a later lesson on Responsible Disclosure. |

---

---

## Section 12 — Common Misconceptions

These must be directly and explicitly dismantled within the mission content — not glossed over.

| Misconception | Why It Must Be Addressed | Where to Address It |
|---|---|---|
| "If I mean well and don't cause damage, I haven't done anything wrong" | This is the most dangerous misconception for a beginner. Professional cybersecurity practice requires authorisation regardless of intent or outcome. Consequences vary by jurisdiction, but the professional standard is clear and universal. | Theory block (Required Concept 2) + Case Study |
| "Ethical hacking means hacking with good intentions" | Good intent alone is not sufficient justification. The definition of ethical hacking must be corrected to emphasise authorisation, not morality. | Theory block (Required Concept 1) + Story outcome |
| "Scope is a suggestion — if I find something critical outside scope, I should investigate it" | Scope is a professional and contractual boundary, not a preference. Crossing it is a violation even when the finding is important. | Theory block (Required Concept 4) + a specific scenario example |
| "Verbal permission from a manager is good enough" | Verbal agreements are insufficient in professional security practice and have failed real practitioners. The story should create this scenario; the theory must resolve it explicitly. | Story + Theory block (Required Concept 3) |
| "Vulnerability Assessment and Penetration Testing are the same thing" | These two terms are used interchangeably by beginners. The VA-vs-PT distinction must be made concrete with a comparison, not just defined. | Theory block (Required Concepts 6 and 7) |

---

---

## Section 13 — Quiz Topics

All quiz questions must be scenario-based. The following are the scenario themes the quiz writer should cover. No definition-recall questions.

| # | Scenario Theme | Concept Being Tested | Difficulty |
|---|---|---|---|
| 1 | A person discovers a vulnerability while using a web app as a normal customer and decides to investigate further — is this authorised? | Authorisation as a professional requirement | Low |
| 2 | A security consultant has a signed engagement letter but tests a server that is not listed in the scope document — is this a scope violation? | Scope as a professional and contractual boundary | Low |
| 3 | A developer's manager verbally tells them to "check if the payment system is secure" — what does the tester need before beginning? | Written authorisation vs. verbal permission | Low |
| 4 | A company asks a security firm to "find all vulnerabilities" — the firm runs automated scans and produces a list of weaknesses. They do not attempt to exploit any of them. Which service did the company receive? | VA vs. PT distinction | Medium |
| 5 | A researcher finds a critical vulnerability outside the defined scope. They notify the client. Have they acted professionally within the engagement? | Scope violation — even with good intent | Medium |

---

---

## Section 14 — Flashcard Topics

The Flashcards block should produce cards for all Key Terminology in Section 6. The following list defines the front/back structure for each card.

| Front (Term or Prompt) | Back (Answer) | Priority |
|---|---|---|
| What is ethical hacking? | Authorised, scoped, professionally conducted security testing — not "hacking with good intentions" | Essential |
| What is the defining professional difference between ethical security testing and unauthorised access? | Written authorisation from the system owner | Essential |
| What is scope in a penetration test? | The defined boundaries of what the tester is permitted to test | Essential |
| What is a Vulnerability Assessment? | A systematic identification of security weaknesses — without exploitation | Essential |
| What is a Penetration Test? | An authorised, controlled attack that proves vulnerabilities are exploitable | Essential |
| What does VAPT stand for? | Vulnerability Assessment and Penetration Testing | Essential |
| What are the three core constraints of ethical hacking? | Permission, Scope, Confidentiality | Essential |
| What is a Rules of Engagement document? | The document specifying exactly what a tester is and is not permitted to do | Supporting |
| What is a scope violation? | Any testing action performed outside the defined authorisation boundaries | Supporting |
| Why is verbal permission insufficient in professional practice? | Verbal agreements are not a reliable basis for a professional security engagement — written, signed authorisation is the professional standard | Supporting |

---

---

## Section 15 — Micro Practical Concept

**Activity:** Find and read a real Responsible Disclosure or Bug Bounty policy from a publicly accessible major technology company

**Objective:** Give learners the experience of reading a real authorisation document — the kind that defines the professional boundary between permitted and unpermitted security research — as a direct extension of what the mission just taught

**Time:** 5 minutes
**Tools Required:** Web browser + internet connection
**Difficulty:** Beginner — no prior knowledge or technical skills required
**Account Creation Required:** No
**Personal Data Entry Required:** No

**What the Learner Does:**
1. Navigates to a major technology company's security page (Google, Microsoft, GitHub, Cloudflare, or similar — learner chooses)
2. Locates the Responsible Disclosure Policy, Security Policy, or Bug Bounty Programme page
3. Reads through it and identifies three things: what is explicitly in scope, what is explicitly out of scope, and one rule they did not expect
4. Notes one thing that surprised them — a rule they expected or did not expect

**Success Criteria (self-verifiable):**
- Learner found a published policy from a real company
- Learner can name at least one activity the policy explicitly permits
- Learner can name at least one activity the policy explicitly forbids

**Reflection Question:** Why do companies publish these policies at all? What does it tell you about the relationship between the company and security researchers who may find vulnerabilities in their products?

**Design Notes:**
- The Micro Practical should not provide a specific URL — learners should find the policy themselves; this is itself a small research skill
- If the learner cannot find one easily, a hint should be available (e.g., "try searching: [company name] responsible disclosure policy")
- The reflection question bridges naturally to the next mission's themes — this Micro Practical acts as a bridge into subsequent content

---

---

## Section 16 — Skills Learned

| Skill | Category | Applied In |
|---|---|---|
| Defining ethical hacking with precision — not a casual definition | Vocabulary / Mindset | All future missions |
| Identifying whether an action is inside or outside authorised scope | Analytical | Covered extensively in later missions and every technical module |
| Explaining the professional and contractual framework that governs penetration testing at a conceptual level | Legal / Professional | Expanded in later missions |
| Reading and interpreting a published security policy or disclosure document | Practical research | Micro Practical |
| Applying the three-constraint framework (Permission, Scope, Confidentiality) to evaluate a scenario | Applied reasoning | Expanded in advanced modules |

---

---

## Section 17 — Estimated Duration

| Activity | Time |
|---|---|
| Phase 1: Engage (Story + Reflection Question) | 4–6 minutes |
| Phase 2: Learn (Theory + Diagram + Case Study) | 8–10 minutes |
| Phase 3: Reinforce (Memory Anchor + Discussion + Student Questions + Common Mistakes) | 6–8 minutes |
| Phase 4: Apply (Cheat Sheet + Quiz + Flashcards) | 5–7 minutes |
| Phase 5: Complete (Micro Practical + Mission Complete) | 5–6 minutes |
| **Total** | **28–37 minutes** |

---

---

## Section 18 — XP Reward

| Item | XP |
|---|---|
| Mission completion | 80 XP |
| Quiz completion (80%+ score) | Included in 80 XP total |
| Micro Practical completion | Included in 80 XP total |

**Total Mission XP:** 80 XP

---

---

## Section 19 — Prerequisites

**Hard Prerequisites:** None. Mission 1 is the entry point. No prior cybersecurity, programming, or technical knowledge is assumed.

**Assumed Learner State:** The learner has a working web browser, can navigate to a website, and has a basic curiosity about cybersecurity. Nothing else is assumed.

**Vocabulary the learner may not know on arrival:**
- Vulnerability, exploit, penetration test, authorisation, scope — all must be defined on first use within the mission
- Technical terms like "CVE", "CVSS", "Metasploit" must not appear in this mission (they belong in later missions)

---

---

## Section 20 — Mission Completion Criteria

A learner is considered to have completed Mission 1 when:

| Requirement | Threshold |
|---|---|
| All non-optional blocks viewed | 100% of 16 blocks |
| Quiz attempted | At least one attempt required |
| Quiz minimum score | 80% (4/5 questions or equivalent) |
| Micro Practical attempted | Required — completion self-reported |
| Minimum XP earned | 64 XP (80% of 80 XP) |

**Block Completion Minimum:** 14 of 16 blocks

**Quiz Retry Policy:** Unlimited attempts. No waiting period between retries on this mission (beginner-friendly — waiting periods are introduced in later missions).

---

---

## Immutability Notice

This blueprint is frozen. The following sections must never be modified during content generation:

- Section 1 — Mission Goal
- Section 2 — Learning Objectives
- Section 3 — Mission Success Criteria
- Section 4 — Required Concepts
- Section 5 — Optional Concepts
- Section 7 — Story Concept
- Section 9 — Memory Anchor Concept
- Section 10 — Interactive Diagram Concept
- Section 13 — Quiz Topics
- Section 14 — Flashcard Topics
- Section 15 — Micro Practical Concept

If a discrepancy or gap is discovered during content generation, record it in `REVIEW_NOTES.md` and continue generating. Do not return to this file.
