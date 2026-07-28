# CYBER LEARN — CURRICULUM ARCHITECTURE
**Version:** 1.0 | **Created:** 2026-07-26 | **Status:** Draft
**Constitutional Reference:** CONSTITUTION.md V1.1 (immutable)
**Knowledge Graph Reference:** docs/curriculum/KNOWLEDGE_GRAPH.md V1.0 (immutable)
**Scope:** Academies 1–5 | **Total Planned Lessons:** 380

---

## PART 0: ARCHITECTURE OVERVIEW

### 0.1 Constitutional Compliance Declaration

This document is subordinate to CONSTITUTION.md V1.1 and KNOWLEDGE_GRAPH.md V1.0. Every lesson, module, course, and academy decision traces to one or both source documents. Where this architecture adds specificity not covered by those documents, it does so in the spirit of their stated principles and does not contradict them.

### 0.2 Design Philosophy

Optimized for (in priority order):
1. **Best learning progression** — Difficulty curves calibrated to cognitive load theory; ZPD respected per Knowledge Graph design principles
2. **Conceptual integrity** — No concept appears without its KG-declared prerequisites; no circular dependencies
3. **Practical relevance** — Every module has a measurable hands-on outcome tied to a real-world scenario
4. **Long-term scalability** — Lesson IDs, KG references, and metadata schema support indefinite curriculum expansion
5. **Educational excellence** — Mastery learning (≥80% gate), retrieval practice, spaced repetition, desirable difficulty (KQI-E3: 50–70% first-attempt pass rate)

### 0.3 Lesson ID Convention

`A[n].C[n].M[n].L[n]`
- **A** = Academy (1–5)
- **C** = Course within academy (1–5)
- **M** = Module within course (1–4)
- **L** = Lesson within module (1–4)

Example: `A2.C3.M2.L4` = Academy 2, Course 3, Module 2, Lesson 4

### 0.4 Lesson Metadata Standard (Constitution Part 20 — 20 Required Fields)

Every lesson entry in this document carries all 20 fields in the compact format below:

```
Field 1:  lesson_id          (heading)
Field 2:  slug               (lowercase-hyphenated)
Field 3:  lesson_type        (expository | discovery | diagnostic)
Field 4:  duration           (minutes)
Field 5:  difficulty         (beginner | intermediate | advanced)
Field 6:  bloom_level        (remember | understand | apply | analyze | evaluate | create)
Field 7:  ethical_content    (true | false)
Field 8:  kg_nodes           (KG concept IDs)
Field 9:  prerequisites      (lesson IDs or "None")
Field 10: learning_objectives (3 minimum)
Field 11: skills_gained
Field 12: interactive_components_required
Field 13: animation_types_required
Field 14: practical_type     (simulation | guided-lab | free-lab | browser-exercise)
Field 15: assessment_type    (quiz-only | quiz-and-challenge | quiz-and-capstone)
Field 16: reflection_type    (articulation | metacognitive | transfer)
Field 17: ai_mentor_responsibilities
Field 18: career_connection
Field 19: certification_mapping
Field 20: accessibility_considerations
```

### 0.5 Cross-Academy Dependency Map

```
Academy 1 (Cybersecurity Foundations)
  └── Unlocks: Academy 2, 3, 4, 5 (all require A1 completion)

Academy 2 (Networking)
  ├── Requires: Academy 1
  └── Unlocks: Advanced networking modules in A4; SOC career path

Academy 3 (Linux)
  ├── Requires: Academy 1
  └── Unlocks: A5 Bash scripting; Linux Admin career path

Academy 4 (Windows Security)
  ├── Requires: Academy 1 + Academy 2 (Recommended)
  └── Unlocks: Active Directory modules in future academies; Blue Team path

Academy 5 (Programming for Security)
  ├── Requires: Academy 1
  ├── Recommends: Academy 2 (for socket/network modules)
  └── Unlocks: Security automation; Tool development; DevSecOps path
```

### 0.6 Spiral Learning Architecture (KG 8 Themes Across Academies)

| Theme                | Academy 1           | Academy 2              | Academy 3              | Academy 4               | Academy 5               |
|----------------------|---------------------|------------------------|------------------------|-------------------------|-------------------------|
| TCP/IP               | Concept intro       | Deep protocol study    | Socket & SSH layer     | WinSock, SMB            | Python sockets, scapy   |
| Authentication       | CIA + concept       | RADIUS, 802.1X         | PAM, /etc/shadow       | Kerberos, NTLM          | Auth code, hashing      |
| Encryption           | CIA triad concept   | TLS, HTTPS, SSH        | GPG, SSL certs         | BitLocker, CNG          | hashlib, cryptography   |
| Attacker Mindset     | Kill chain intro    | Nmap, Wireshark        | SUID abuse, privesc    | Registry persistence    | Exploit scripting       |
| OS Internals         | Overview only       | Network stack          | Kernel, FHS, systemd   | Registry, WMI, SAM      | subprocess, ctypes      |
| Network Security     | Firewall concept    | IDS, packet analysis   | iptables, auditd       | Windows Firewall, GPO   | Scapy, port scanner     |
| Risk                 | CIA/risk basics     | Network risk           | Privilege escalation   | AD misconfig risk       | Insecure code risk      |
| Web Technologies     | Browser/HTTP intro  | HTTP deep dive         | Nginx, curl            | IIS basics              | requests, SQL           |

### 0.7 Domain Coverage per Academy (Knowledge Graph Alignment)

| Academy | Primary KG Domains          | Coverage Depth | Disclosure Level |
|---------|-----------------------------|----------------|-----------------|
| A1      | D1 (partial), D6 (partial)  | L1 only        | L1              |
| A2      | D3 (full)                   | L1–L3          | L1–L2           |
| A3      | D2 Linux track (full)       | L1–L3          | L1–L2           |
| A4      | D2 Windows track (full), D8 basic | L1–L3    | L1–L2           |
| A5      | D4 (full)                   | L1–L3          | L1–L2           |

---

## PART 1: ACADEMY 1 — CYBERSECURITY FOUNDATIONS

### Academy Vision

Academy 1 is the entry point for every learner who arrives at Cyber Learn. It requires zero prior security knowledge. Its purpose is not to teach cybersecurity — it is to teach the *language, context, and mindset* that make all subsequent learning possible. A learner who completes Academy 1 understands what cybersecurity is, why it exists, how threats operate at a conceptual level, what principles govern defense, and what ethical and legal obligations apply to security professionals. They leave equipped to choose their specialization path with informed confidence.

**Why it exists:** Without a shared conceptual foundation, learners from different backgrounds (student, career changer, IT professional) will encounter subsequent academies at wildly different starting points. Academy 1 normalizes that baseline and establishes the vocabulary, mental models, and curiosity that make deeper learning possible.

**Target Learners:** All seven personas (Priya, Marcus, Sarah, David, Alex, Jordan, Jennifer). No prerequisites.

**Entry Requirements:** None. Assumes basic digital literacy (can use a web browser and file manager).

**Estimated Learning Hours:** 32–40 hours (including practicals and assessments)

**Suggested Pace:** 2–3 lessons per week (casual) to 1–2 courses per week (intensive)

**Exit Competencies:** Upon completing Academy 1, a learner can:
- Explain the CIA triad and apply it to real-world scenarios
- Identify major threat categories (malware, social engineering, insider threats, APT)
- Distinguish between threat, vulnerability, and risk
- Describe the kill chain and explain how attacks unfold in phases
- Apply basic risk assessment thinking to organizational decisions
- Articulate the ethical and legal boundaries of security research
- Make an informed decision about which cybersecurity career path to pursue next

**Career Relevance:** Prerequisite for all career paths. Specifically surfaces: SOC Analyst, Security Awareness Trainer, IT Support, Risk Analyst, Compliance Analyst.

**Certification Alignment:** CompTIA ITF+ (full), CompTIA Security+ Domain 1 (partial), CompTIA A+ Core 2 (partial), (ISC)² CC (Certified in Cybersecurity) Domain 1–2 (partial)

---

### Course A1.C1 — The Digital Security Landscape

**Purpose:** Establish context. Learners understand why cybersecurity matters, what the threat landscape looks like, and what careers exist before any technical content is introduced. This course is deliberately narrative-first and anxiety-reducing.

**Learning Outcomes:**
- Articulate why cybersecurity is a societal and organizational necessity
- Describe how a cyberattack unfolds from target selection to impact
- Identify 5+ career roles in cybersecurity and their responsibilities
- Explain the difference between offensive and defensive security work

**Estimated Hours:** 7–9 hours | **Difficulty:** beginner | **Prerequisites:** None
**Career Relevance:** All roles — this is career-discovery content
**Certification Alignment:** ITF+ Domain 1; Security+ Domain 1 (conceptual)

---

#### Module A1.C1.M1 — Why Cybersecurity Matters

**Module Objectives:**
1. Understand the real-world consequences of security failures
2. Recognize that cybersecurity affects every person and organization
3. Experience the "security mindset" for the first time

**KG Domain Coverage:** SEC-01 (What is cybersecurity), SEC-02 (Impact of security failures), CB-01 (Basic digital systems)
**Practical Outcomes:** Learner maps a fictional breach to its real-world consequences using the interactive timeline
**Required Interactive Components:** AttackTimelineViewer, ClickableDiagram, QuizWidget
**Animation Categories:** News-headline montage, breach ripple-effect, security professional day-in-life
**Simulations:** Breach consequence explorer (choose an industry, see attack impact)
**Assessment Strategy:** Quiz-only (4 lessons × 5 questions); no challenge at this stage

**Practical Progression:**
- **Beginner:** Identify which CIA property is violated in 3 provided breach summaries
- **Intermediate:** Map a given breach (Target 2013) to its timeline phases
- **Advanced:** Draft a 1-paragraph "impact statement" for a fictional breach scenario
- **Capstone:** Not applicable at module level for M1

---

##### A1.C1.M1.L1 — The Cost of Insecurity
- **Slug:** the-cost-of-insecurity | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-01, SEC-02, CB-01 | **Prereqs:** None
- **Interactive:** AttackTimelineViewer (major breach timeline 2010–2024), QuizWidget
- **Animations:** headline-news-montage, financial-loss-counter, data-records-lost-counter
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 1, (ISC)² CC Domain 1 | **Careers:** All roles | **Accessibility:** Timeline keyboard-navigable; counter animations have static fallback; all text alternatives provided

**Learning Objectives:**
1. Explain why cybersecurity failures have consequences beyond financial loss
2. Identify at least three sectors severely impacted by cyberattacks (healthcare, finance, infrastructure)
3. Describe the concept of a "data breach" and what types of data are most targeted

**Skills Gained:** breach awareness, CIA triad intro, digital risk literacy
**AI Mentor:** Personalise breach examples to learner's stated industry; flag if learner minimises personal exposure ("it won't happen to me")

---

##### A1.C1.M1.L2 — A Day in the Life of a Security Professional
- **Slug:** day-in-life-security-professional | **Type:** expository | **Duration:** 25 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-01, SEC-15 | **Prereqs:** A1.C1.M1.L1
- **Interactive:** ClickableDiagram (security org chart), QuizWidget
- **Animations:** soc-analyst-morning-routine, alert-triage-flow, escalation-path
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 1, (ISC)² CC Domain 5 | **Careers:** SOC Analyst, Security Engineer, CISO | **Accessibility:** Org chart screen-reader labels; animation pause controls

**Learning Objectives:**
1. Describe at least three daily tasks performed by a SOC analyst
2. Distinguish between tier-1, tier-2, and tier-3 analyst responsibilities
3. Explain why cybersecurity is a team effort across an organization

**Skills Gained:** role awareness, SOC workflow understanding, security team structure
**AI Mentor:** Ask learner which role resonates; suggest career path preview; surface relevant personas (Jordan the SOC analyst)

---

##### A1.C1.M1.L3 — How the Internet Changed Everything
- **Slug:** how-internet-changed-everything | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-01, CB-06, SEC-01 | **Prereqs:** A1.C1.M1.L1
- **Interactive:** ClickableDiagram (internet growth timeline), ComparisonTable (pre/post-internet attack surface)
- **Animations:** internet-growth-animation, attack-surface-expansion, connected-devices-counter
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** ITF+ Domain 1 | **Careers:** All roles | **Accessibility:** Timeline interactions keyboard-accessible; prefers-reduced-motion alternative for growth animations

**Learning Objectives:**
1. Explain how the internet's growth exponentially increased the attack surface for organizations
2. Identify three technological shifts (cloud, mobile, IoT) that created new security challenges
3. Recognize the connection between digital convenience and security risk

**Skills Gained:** attack surface concept, digital transformation awareness, risk-convenience tradeoff
**AI Mentor:** Connect to learner's personal device count; surface the "your phone is a computer" realization point

---

##### A1.C1.M1.L4 — The Security Mindset
- **Slug:** the-security-mindset | **Type:** discovery | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-01, SEC-19 | **Prereqs:** A1.C1.M1.L1, A1.C1.M1.L2, A1.C1.M1.L3
- **Interactive:** ScenarioSimulator (everyday situations: spotting the weakness), QuizWidget
- **Animations:** lock-picking-mindset-metaphor, assume-breach-visualization
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** ITF+ Domain 1, Security+ Domain 1 | **Careers:** All roles | **Accessibility:** Scenario simulator fully keyboard-navigable; no time-pressure mechanics

**Learning Objectives:**
1. Apply the "assume breach" mindset to three everyday digital scenarios
2. Distinguish between a user's perspective and an attacker's perspective on the same system
3. Analyze a simple scenario to identify its weakest security link

**Skills Gained:** adversarial thinking, assumption challenging, security observation
**AI Mentor:** Validate "I never thought about it that way" insights; gently push past surface-level answers in challenge responses

---

#### Module A1.C1.M2 — Anatomy of an Attack

**Module Objectives:**
1. Understand that attacks follow predictable phases
2. Identify different attacker archetypes and their motivations
3. Analyze a real breach through the lens of the kill chain

**KG Domain Coverage:** SEC-05 (Attack types overview), SEC-08 (Kill chain model), SEC-03 (Threat concept)
**Practical Outcomes:** Learner maps a case study breach to kill chain phases
**Required Interactive Components:** AttackTimelineViewer, ClickableDiagram, ScenarioSimulator, QuizWidget
**Animation Categories:** Kill chain phase-by-phase, attacker archetype profiles, breach case study walkthrough
**Simulations:** Kill chain mapper (drag phases onto a breach timeline)
**Assessment Strategy:** Quiz-only for L1–L2; quiz-and-challenge for L3–L4

**Practical Progression:**
- **Beginner:** Label kill chain phases on a pre-drawn attack diagram
- **Intermediate:** Identify which kill chain phase is depicted in each of 5 breach snippets
- **Advanced:** Map the SolarWinds breach to all 7 kill chain phases with evidence
- **Capstone:** Not applicable at module level

---

##### A1.C1.M2.L1 — What is a Cyberattack?
- **Slug:** what-is-a-cyberattack | **Type:** expository | **Duration:** 25 min | **Difficulty:** beginner | **Bloom's:** remember | **Ethical Content:** false
- **KG Nodes:** SEC-05, SEC-03, SEC-01 | **Prereqs:** A1.C1.M1.L4
- **Interactive:** ClickableDiagram (attack category wheel), QuizWidget
- **Animations:** attack-type-montage, hacker-motivation-spectrum
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, Security+ Domain 1 | **Careers:** SOC Analyst, Blue Team | **Accessibility:** Category wheel screen-reader labeled; color coding supplemented with icons

**Learning Objectives:**
1. Define a cyberattack and distinguish it from accidental system failures
2. List five major categories of cyberattacks (malware, phishing, DoS, MitM, SQL injection)
3. Explain the concept of attack motivation (financial, political, espionage, disruption)

**Skills Gained:** attack taxonomy, motivation analysis, threat vocabulary
**AI Mentor:** Correct conflation of hacking with movie tropes; introduce the reality of automated, opportunistic attacks

---

##### A1.C1.M2.L2 — The Kill Chain: How Attacks Unfold
- **Slug:** kill-chain-how-attacks-unfold | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-08, SEC-05, SEC-03 | **Prereqs:** A1.C1.M2.L1
- **Interactive:** AttackTimelineViewer (interactive kill chain), DragDropOrdering (arrange kill chain phases)
- **Animations:** kill-chain-phase-walkthrough, reconnaissance-to-exfiltration-flow
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** SOC Analyst, Blue Team, Threat Intelligence | **Accessibility:** Drag-drop has keyboard alternative; animation has step-by-step text mode

**Learning Objectives:**
1. Name all seven phases of the Lockheed Martin Kill Chain in correct order
2. Describe what an attacker does at each kill chain phase
3. Explain how defenders can disrupt an attack at any phase

**Skills Gained:** kill chain model, attack phase analysis, defender opportunity mapping
**AI Mentor:** Use 3-level hint system if learner mislabels phases; connect phases to defensive tools they will learn in later academies

---

##### A1.C1.M2.L3 — Who Are the Attackers?
- **Slug:** who-are-the-attackers | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-03, SEC-05, SEC-19 | **Prereqs:** A1.C1.M2.L1
- **Interactive:** ClickableDiagram (attacker archetype profiles), ComparisonTable (motivation vs. capability matrix)
- **Animations:** threat-actor-spectrum, nation-state-vs-script-kiddie
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Security+ Domain 1, ITF+ Domain 2 | **Careers:** Threat Intelligence, SOC Analyst | **Accessibility:** Profile cards keyboard-navigable; matrix color-coded with text labels

**Learning Objectives:**
1. Distinguish between six attacker archetypes: script kiddie, hacktivist, cybercriminal, insider, nation-state, APT
2. Analyze how attacker motivation shapes attack choice and persistence
3. Explain why the same vulnerability may be exploited differently by different actor types

**Skills Gained:** threat actor profiling, motivation analysis, threat intelligence foundations
**AI Mentor:** Flag if learner stereotypes hackers; surface the reality of insider threats as statistically significant

---

##### A1.C1.M2.L4 — Case Study: The SolarWinds Breach
- **Slug:** case-study-solarwinds | **Type:** discovery | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-08, SEC-05, SEC-03, SEC-18 | **Prereqs:** A1.C1.M2.L1, A1.C1.M2.L2, A1.C1.M2.L3
- **Interactive:** AttackTimelineViewer (SolarWinds timeline), DragDropOrdering (map breach to kill chain)
- **Animations:** supply-chain-attack-animation, solarwinds-orion-compromise-flow
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** Threat Intelligence, SOC Analyst, Security Engineer | **Accessibility:** Timeline zoom keyboard-controlled; full text transcript of animation available

**Learning Objectives:**
1. Describe the SolarWinds supply chain attack at a conceptual level (no technical depth required)
2. Map the SolarWinds breach to at least five kill chain phases with justification
3. Explain what "supply chain attack" means and why it is difficult to detect

**Skills Gained:** case study analysis, supply chain attack concept, kill chain application
**AI Mentor:** Guide kill chain mapping with hints at 3 levels; celebrate when learner identifies the "trusted software update" as the attack vector

---

#### Module A1.C1.M3 — Security Career Landscape

**Module Objectives:**
1. Understand the breadth of cybersecurity career options
2. Distinguish blue team (defensive) from red team (offensive) work
3. Identify learning paths and first concrete next steps

**KG Domain Coverage:** SEC-15 (Career paths), SEC-16 (Penetration testing concept), D6 L1 career awareness
**Practical Outcomes:** Learner completes a career self-assessment and maps their background to 2–3 suitable paths
**Required Interactive Components:** ClickableDiagram, ComparisonTable, QuizWidget, ConceptFlashCards
**Animation Categories:** Career-day role profiles, red-vs-blue team game, lab setup timelapse
**Simulations:** Career path decision tree (background → recommended path)
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Match 6 job titles to their primary responsibility
- **Intermediate:** Read 3 job postings and identify which certifications they require
- **Advanced:** Write a 3-sentence "why this role" statement for your chosen path
- **Capstone:** Not applicable at module level

---

##### A1.C1.M3.L1 — Roles in Cybersecurity
- **Slug:** roles-in-cybersecurity | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-15, SEC-01 | **Prereqs:** A1.C1.M2.L4
- **Interactive:** ClickableDiagram (career map), ConceptFlashCards (role definitions)
- **Animations:** role-showcase-cards, team-org-chart-reveal
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 1, (ISC)² CC Domain 5 | **Careers:** All roles (career awareness) | **Accessibility:** Flashcards keyboard-flippable; career map screen-reader labeled with role descriptions

**Learning Objectives:**
1. Name at least eight distinct cybersecurity job roles and their primary function
2. Explain the difference between technical and non-technical security roles
3. Describe how security roles collaborate within an organization

**Skills Gained:** career awareness, role differentiation, organizational security structure
**AI Mentor:** Surface 2–3 roles that match learner's stated background and interests

---

##### A1.C1.M3.L2 — Blue Team vs. Red Team
- **Slug:** blue-team-vs-red-team | **Type:** expository | **Duration:** 25 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-15, SEC-16, SEC-09 | **Prereqs:** A1.C1.M3.L1
- **Interactive:** ComparisonTable (blue vs. red activities), ClickableDiagram (purple team concept)
- **Animations:** red-blue-purple-team-spectrum, adversarial-simulation-loop
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 1, (ISC)² CC | **Careers:** SOC Analyst, Penetration Tester, Purple Team | **Accessibility:** Comparison table screen-reader compatible; color coding not sole differentiator

**Learning Objectives:**
1. Explain the primary mission of the blue team and the red team
2. Describe what purple team work involves and why it bridges offense and defense
3. Identify which team is responsible for activities like vulnerability scanning, incident response, and penetration testing

**Skills Gained:** team structure knowledge, offensive/defensive roles, purple team concept
**AI Mentor:** Help learner identify whether they are drawn to offense or defense; avoid "hackers are evil" framing

---

##### A1.C1.M3.L3 — Certifications and Learning Paths
- **Slug:** certifications-and-learning-paths | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-15 | **Prereqs:** A1.C1.M3.L1
- **Interactive:** ClickableDiagram (certification roadmap), ComparisonTable (cert vs. cert comparison)
- **Animations:** cert-path-reveal, hours-to-cert-estimate
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** ITF+ (this lesson explains it), Security+, A+, Network+, Linux+ | **Careers:** All roles | **Accessibility:** Roadmap diagram has linear text alternative; all paths aria-labeled

**Learning Objectives:**
1. Identify the primary CompTIA, (ISC)², and EC-Council entry-to-mid certifications and their target levels
2. Explain why certifications alone do not replace practical experience
3. Map a personal background to a recommended starting certification

**Skills Gained:** certification awareness, learning path planning, self-directed learning
**AI Mentor:** Recommend a first certification based on learner's current role and stated goals

---

##### A1.C1.M3.L4 — Your First Steps in Security
- **Slug:** your-first-steps-in-security | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-15, SEC-01 | **Prereqs:** A1.C1.M3.L1, A1.C1.M3.L2, A1.C1.M3.L3
- **Interactive:** ScenarioSimulator (build your 90-day plan), QuizWidget
- **Animations:** learning-path-journey, lab-setup-montage
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** ITF+ Domain 1 | **Careers:** All roles | **Accessibility:** Plan builder fully keyboard-navigable; no drag-required interactions

**Learning Objectives:**
1. Apply the knowledge from Course 1 to construct a personal 90-day cybersecurity learning goal
2. Identify three free resources (TryHackMe, Cyber Learn practicals, CTFs) for hands-on practice
3. Explain what a "home lab" is and why it accelerates learning

**Skills Gained:** self-directed learning, goal setting, resource identification
**AI Mentor:** Save learner's stated goal; reference it in future lessons as motivational anchor

---

### Course A1.C1 — Capstone

**Title:** Security Landscape Survey Report
**Type:** quiz-and-capstone | **Duration:** 45 min | **Difficulty:** beginner

**Scenario:** Learner plays the role of a newly hired IT coordinator at a small retail company. They have been asked to prepare a 1-page "state of cybersecurity" briefing for the CEO. They must:
1. Identify the top 3 threat categories facing retail companies
2. Map one example breach to the kill chain
3. Recommend 2 security roles the company should hire
4. Recommend 1 certification the IT team should pursue

**Assessment Criteria:** Completeness (all 4 sections), accuracy of kill chain mapping, plausibility of recommendations
**KG Validation:** SEC-01, SEC-03, SEC-05, SEC-08, SEC-15 all exercised

---

### Course A1.C2 — Computer Essentials for Security

**Purpose:** Security concepts become meaningless without knowing what they are securing. This course builds the minimum computer science foundation a security professional needs: how data is stored, how programs run, what an operating system does, and how computers communicate. Content is deliberately accessible — no programming, no command line, just mental models.

**Learning Outcomes:**
- Explain how binary encoding represents data in computers
- Describe the roles of RAM, CPU, and storage in program execution
- Explain what an operating system does and how it manages processes and files
- Describe how computers communicate over a network at a high level

**Estimated Hours:** 7–9 hours | **Difficulty:** beginner | **Prerequisites:** A1.C1 complete
**Career Relevance:** Systems Administrator, Security Analyst, Any technical role
**Certification Alignment:** CompTIA ITF+ (full), CompTIA A+ Core 1 (partial)

---

#### Module A1.C2.M1 — How Computers Work

**Module Objectives:**
1. Understand binary as the fundamental language of computing
2. Explain how memory types differ in purpose and persistence
3. Describe how a CPU executes instructions

**KG Domain Coverage:** CB-01 (digital systems), CB-02 (binary/number systems), CB-03 (memory), CB-04 (CPU operations)
**Practical Outcomes:** Learner converts decimal numbers to binary and identifies memory types in a simulated system diagram
**Required Interactive Components:** ClickableDiagram, ComparisonTable, QuizWidget, ConceptFlashCards
**Animation Categories:** Binary bit-flip visualization, memory hierarchy pyramid, CPU fetch-decode-execute cycle
**Simulations:** Computer anatomy explorer (click components to reveal function)
**Assessment Strategy:** Quiz-only for L1–L2; quiz-and-challenge for L3–L4

**Practical Progression:**
- **Beginner:** Convert 5 decimal numbers to binary using a provided guide
- **Intermediate:** Match memory types (L1 cache, RAM, SSD, HDD) to a speed/capacity matrix
- **Advanced:** Trace a simple instruction through the fetch-decode-execute cycle
- **Capstone:** Not applicable at module level

---

##### A1.C2.M1.L1 — Bits, Bytes, and Binary
- **Slug:** bits-bytes-and-binary | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-02, CB-01 | **Prereqs:** A1.C1.M3.L4
- **Interactive:** ClickableDiagram (binary counter), ConceptFlashCards (bit/byte/KB/MB/GB), QuizWidget
- **Animations:** bit-flip-animation, binary-to-text-encoding, byte-size-comparison
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 1 Domain 1 | **Careers:** All technical roles | **Accessibility:** Binary counter keyboard-incrementable; all animations have text transcript

**Learning Objectives:**
1. Explain what a bit and byte are and how binary represents data
2. Convert simple decimal numbers (0–255) to binary and back
3. Describe how text, images, and files are all represented as binary data

**Skills Gained:** binary literacy, data representation understanding, digital encoding concept
**AI Mentor:** Use the KG-documented gap CB-G1 (endianness) — introduce concept but do not require mastery at this level

---

##### A1.C2.M1.L2 — Memory: RAM, ROM, and Storage
- **Slug:** memory-ram-rom-storage | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-03, CB-01 | **Prereqs:** A1.C2.M1.L1
- **Interactive:** ComparisonTable (memory type comparison), ClickableDiagram (memory hierarchy)
- **Animations:** ram-volatility-demo, storage-speed-hierarchy, rom-chip-visualization
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 1 | **Careers:** Systems Administrator, Security Analyst | **Accessibility:** Memory hierarchy navigable without color; table has proper headers

**Learning Objectives:**
1. Distinguish between volatile (RAM) and non-volatile (ROM, SSD, HDD) memory
2. Explain why RAM matters for security (memory forensics concept introduced)
3. Describe the memory hierarchy in terms of speed and capacity tradeoffs

**Skills Gained:** memory types, volatility concept, storage hierarchy
**AI Mentor:** Plant the seed for memory forensics — "attackers leave traces in RAM, which is why incident responders always capture memory first"

---

##### A1.C2.M1.L3 — The CPU: The Brain of the System
- **Slug:** cpu-brain-of-system | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-04, CB-01 | **Prereqs:** A1.C2.M1.L1
- **Interactive:** ClickableDiagram (CPU architecture overview), AnimationPlayer (fetch-decode-execute)
- **Animations:** cpu-clock-cycle, multi-core-visualization, instruction-pipeline
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 1 | **Careers:** Systems Administrator, Malware Analyst | **Accessibility:** CPU diagram labeled with aria roles; animation has pause and step-through controls

**Learning Objectives:**
1. Describe the fetch-decode-execute cycle in plain language
2. Explain what clock speed and core count mean for performance
3. Identify the registers, ALU, and control unit as the CPU's primary components

**Skills Gained:** CPU operations, instruction cycle understanding, hardware literacy
**AI Mentor:** KG gap CB-G2 (stack/heap) — introduce the stack conceptually; full treatment in Academy 3

---

##### A1.C2.M1.L4 — How Programs Execute
- **Slug:** how-programs-execute | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-04, CB-03, CB-07 | **Prereqs:** A1.C2.M1.L1, A1.C2.M1.L2, A1.C2.M1.L3
- **Interactive:** ProcessTreeViewer (simple process tree), ClickableDiagram (source to execution pipeline)
- **Animations:** compile-link-load-execute, process-in-memory-layout
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** ITF+ Domain 2 | **Careers:** Malware Analyst, Security Developer | **Accessibility:** Process tree screen-reader navigable; all flow diagrams have text equivalents

**Learning Objectives:**
1. Trace a program's journey from source code to running process (compile → link → load → execute)
2. Explain what a process is and how it differs from a program file
3. Describe how memory is allocated when a program runs (code, stack, heap at conceptual level)

**Skills Gained:** process concept, execution pipeline, memory allocation basics
**AI Mentor:** Reference the KG stack/heap gap (CB-G2); tell learner this mental model will become critical when they study buffer overflows in advanced academies

---

#### Module A1.C2.M2 — Operating Systems Overview

**Module Objectives:**
1. Explain what an OS does and why it exists
2. Navigate the file system conceptually (files, directories, permissions idea)
3. Understand processes and services from an OS perspective
4. Compare Windows and Linux at a surface level

**KG Domain Coverage:** CB-07 (OS concept), CB-08 (file systems), CB-09 (processes), OS-L01 (Linux intro), OS-W01 (Windows intro)
**Practical Outcomes:** Learner identifies OS components in a simulated environment and completes a file-system navigation exercise
**Required Interactive Components:** FilePermissionsExplorer, ProcessTreeViewer, ComparisonTable, QuizWidget
**Animation Categories:** OS kernel metaphor, file-system tree navigation, process spawn visualization
**Simulations:** OS anatomy explorer, file-tree navigator
**Assessment Strategy:** Quiz-and-challenge for L2 and L4; quiz-only for L1 and L3

**Practical Progression:**
- **Beginner:** Label OS components in a provided diagram (kernel, shell, file system, applications)
- **Intermediate:** Use the simulated file navigator to find a "hidden" configuration file
- **Advanced:** Identify 3 running processes in a simulated process list and explain their purpose
- **Capstone:** Not applicable at module level

---

##### A1.C2.M2.L1 — What is an Operating System?
- **Slug:** what-is-an-operating-system | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-07, CB-01 | **Prereqs:** A1.C2.M1.L4
- **Interactive:** ClickableDiagram (OS layer diagram), QuizWidget
- **Animations:** os-as-translator-metaphor, kernel-user-space-split
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 2 | **Careers:** Systems Administrator, Any technical | **Accessibility:** Layer diagram keyboard-navigable; metaphor animation has text description

**Learning Objectives:**
1. Explain what an operating system does in terms of resource management and abstraction
2. Distinguish between the kernel and user space
3. Name three common operating systems and their primary use contexts

**Skills Gained:** OS concept, kernel/userspace distinction, OS market awareness
**AI Mentor:** Ask learner what OS they use daily; personalize examples accordingly

---

##### A1.C2.M2.L2 — Files, Folders, and the File System
- **Slug:** files-folders-file-system | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** CB-08, CB-07 | **Prereqs:** A1.C2.M2.L1
- **Interactive:** FilePermissionsExplorer (visual, not command-line), ClickableDiagram (file system tree)
- **Animations:** file-tree-growth, metadata-reveal, directory-hierarchy
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 2 | **Careers:** Systems Administrator, Forensics Analyst | **Accessibility:** File tree navigable via keyboard; permission visualizations have icon+text labels

**Learning Objectives:**
1. Explain the hierarchical structure of a file system (root, directories, files)
2. Describe file metadata (name, size, type, timestamps, owner) and its security relevance
3. Identify the difference between an absolute path and a relative path

**Skills Gained:** file system navigation, metadata understanding, path concepts
**AI Mentor:** Introduce the concept that timestamps can be manipulated — flag for future forensics context

---

##### A1.C2.M2.L3 — Processes and Services
- **Slug:** processes-and-services | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-09, CB-07 | **Prereqs:** A1.C2.M2.L1
- **Interactive:** ProcessTreeViewer (simulated), QuizWidget
- **Animations:** process-lifecycle, daemon-service-visualization, parent-child-process-tree
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, A+ Core 2 | **Careers:** Systems Administrator, SOC Analyst | **Accessibility:** Process tree screen-reader navigable with process descriptions

**Learning Objectives:**
1. Explain what a process is and how it differs from a program file
2. Describe what a service (daemon) is and give three examples
3. Explain why monitoring running processes is important for security

**Skills Gained:** process lifecycle, service awareness, process-based threat detection concept
**AI Mentor:** Connect to malware persistence — malware often hides as a service; prime for deeper treatment in Academy 3 and 4

---

##### A1.C2.M2.L4 — Windows vs. Linux: Key Differences
- **Slug:** windows-vs-linux-key-differences | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** CB-07, CB-08, OS-L01, OS-W01 | **Prereqs:** A1.C2.M2.L1, A1.C2.M2.L2, A1.C2.M2.L3
- **Interactive:** ComparisonTable (Windows vs. Linux: structure, commands, security), QuizWidget
- **Animations:** side-by-side-os-boot, file-system-structure-comparison
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** ITF+ Domain 2, A+ Core 2 | **Careers:** Systems Administrator, SOC Analyst | **Accessibility:** Comparison table properly headed; no color-only distinctions

**Learning Objectives:**
1. Identify three fundamental structural differences between Windows and Linux
2. Explain why Linux dominates servers and Windows dominates enterprise desktops
3. Describe the security implications of the Unix permission model vs. Windows ACLs at a conceptual level

**Skills Gained:** OS comparison, platform awareness, permission model concept
**AI Mentor:** Ask learner which OS they are most comfortable with; set expectations that both academies (A3, A4) will require dedicated time

---

#### Module A1.C2.M3 — The Internet Basics

**Module Objectives:**
1. Explain how data travels from one computer to another
2. Understand IP addresses and DNS at a conceptual level
3. Understand what happens when you visit a website

**KG Domain Coverage:** CB-06, NET-01 (networking intro), NET-02 (IP addressing intro), NET-10 (DNS intro)
**Practical Outcomes:** Learner traces a web request from browser to server using an interactive diagram
**Required Interactive Components:** PacketFlowVisualizer, ClickableDiagram, QuizWidget
**Animation Categories:** Packet journey animation, DNS resolution step-by-step, HTTP request-response
**Simulations:** "What happens when you press Enter" interactive walkthrough
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Label the path a packet takes from browser to server on a provided diagram
- **Intermediate:** Trace a DNS lookup through its phases using the interactive simulator
- **Advanced:** Identify which part of an HTTP request contains sensitive data (cookies, credentials)
- **Capstone:** Module 3 feeds into Course 2 Capstone

---

##### A1.C2.M3.L1 — How the Internet Works
- **Slug:** how-the-internet-works | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-06, NET-01 | **Prereqs:** A1.C2.M2.L4
- **Interactive:** PacketFlowVisualizer (basic), ClickableDiagram (internet topology)
- **Animations:** packet-journey-across-internet, router-forwarding-decisions, fiber-optic-cable-globe
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, Network+ Domain 1 | **Careers:** Network Engineer, SOC Analyst | **Accessibility:** Packet flow animation controllable by keyboard; topology diagram text-labeled

**Learning Objectives:**
1. Explain how data is broken into packets and reassembled at the destination
2. Describe the role of routers in forwarding packets across the internet
3. Identify the difference between a LAN and the internet (WAN)

**Skills Gained:** packet concept, routing concept, LAN vs. WAN
**AI Mentor:** Surface the KG-documented gap NET-G2 (packet literacy) — this lesson begins building that literacy

---

##### A1.C2.M3.L2 — IP Addresses and Domain Names
- **Slug:** ip-addresses-and-domain-names | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-02, NET-10, CB-06 | **Prereqs:** A1.C2.M3.L1
- **Interactive:** ClickableDiagram (IP address anatomy), QuizWidget
- **Animations:** ip-address-assignment, dns-translates-names, ipv4-vs-ipv6-comparison
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, Network+ Domain 1 | **Careers:** Network Engineer, SOC Analyst | **Accessibility:** IP diagrams labeled with aria; color-coded octets also use text annotations

**Learning Objectives:**
1. Explain what an IP address is and why every device on a network needs one
2. Describe what DNS does (translates domain names to IP addresses)
3. Distinguish between a public IP address and a private IP address

**Skills Gained:** IP addressing concept, DNS concept, public vs. private IP
**AI Mentor:** Surface the KG-documented gap NET-G1 (DNS as attack surface) — introduce that DNS can be abused; full treatment in Academy 2

---

##### A1.C2.M3.L3 — Browsers, Servers, and HTTP
- **Slug:** browsers-servers-and-http | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-06, NET-01, WEB-01 | **Prereqs:** A1.C2.M3.L1, A1.C2.M3.L2
- **Interactive:** ClickableDiagram (HTTP request anatomy), PacketFlowVisualizer (HTTP over TCP)
- **Animations:** client-server-handshake, http-vs-https-comparison, cookie-lifecycle
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** ITF+ Domain 2, Security+ Domain 2 | **Careers:** Web Security, SOC Analyst | **Accessibility:** HTTP request diagram fully labeled; browser exercise has keyboard-only mode

**Learning Objectives:**
1. Explain the client-server model and how browsers request web pages
2. Describe what HTTP and HTTPS are and the importance of the S
3. Identify three common HTTP methods (GET, POST, PUT) and when each is used

**Skills Gained:** HTTP literacy, client-server concept, HTTPS importance
**AI Mentor:** Plant the seed for web security — "POST requests carry form data including passwords; understanding this is why HTTPS is not optional"

---

##### A1.C2.M3.L4 — Your Digital Footprint
- **Slug:** your-digital-footprint | **Type:** discovery | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-01, NET-01, CB-06 | **Prereqs:** A1.C2.M3.L1, A1.C2.M3.L2, A1.C2.M3.L3
- **Interactive:** ScenarioSimulator (footprint mapper), QuizWidget
- **Animations:** osint-data-aggregation, tracking-cookies-visualization
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** ITF+ Domain 5, Security+ Domain 5 | **Careers:** Privacy Analyst, SOC Analyst | **Accessibility:** Footprint mapper keyboard-accessible; no auto-tracking simulations that alarm users

**Learning Objectives:**
1. Identify what data is left behind by normal internet activity (IP logs, cookies, search history)
2. Analyze a fictional user's digital footprint and identify what an attacker could learn from it
3. Explain the concept of OSINT (Open Source Intelligence) at a high level

**Skills Gained:** digital footprint awareness, OSINT introduction, privacy concepts
**AI Mentor:** Do not create anxiety about personal privacy; frame as knowledge that enables protection

---

### Course A1.C2 — Capstone

**Title:** Anatomy of a Device on the Internet
**Type:** quiz-and-capstone | **Duration:** 50 min | **Difficulty:** beginner

**Scenario:** Learner is given a fictional laptop profile (OS: Windows 10, browser: Chrome, connected to home WiFi). They must:
1. Identify all software components (OS, browser, network stack) and their security roles
2. Trace a web request from the laptop to a banking website through DNS → HTTP → TLS
3. Identify 3 points in that journey where an attacker could intercept or tamper
4. Recommend 1 mitigation for each identified interception point

**Assessment Criteria:** Journey accuracy, threat identification quality, mitigation plausibility
**KG Validation:** CB-01 through CB-09, NET-01, NET-02, NET-10, WEB-01 all exercised

---

### Course A1.C3 — Threats, Vulnerabilities, and Risk

**Purpose:** Having established what computers and networks are (C2), learners now systematically understand what can go wrong. This course introduces the threat taxonomy, vulnerability lifecycle, and risk management concepts that underpin all defensive security work. It is deliberately broad (not deep) — depth comes in later academies.

**Learning Outcomes:**
- Classify threats by type (malware, social engineering, insider, APT)
- Distinguish threat, vulnerability, exploit, and risk
- Explain the CVE/CVSS system and the patch management lifecycle
- Apply basic qualitative risk assessment to a simple scenario

**Estimated Hours:** 8–10 hours | **Difficulty:** beginner | **Prerequisites:** A1.C1, A1.C2
**Career Relevance:** Risk Analyst, SOC Analyst, Security Engineer, Compliance Analyst
**Certification Alignment:** Security+ Domain 1, ITF+ Domain 2, (ISC)² CC Domain 2

---

#### Module A1.C3.M1 — The Threat Landscape

**Module Objectives:**
1. Classify and describe major malware families
2. Recognize social engineering techniques
3. Understand insider threats as a distinct and serious category

**KG Domain Coverage:** SEC-05 (attack types), SEC-07 (malware), SEC-06 (social engineering), SEC-03 (threat definition)
**Practical Outcomes:** Learner identifies malware type from a given description and recognizes a phishing email
**Required Interactive Components:** AttackTimelineViewer, ScenarioSimulator, QuizWidget, ConceptFlashCards
**Animation Categories:** Malware lifecycle animations, phishing email dissection, insider threat narrative
**Simulations:** Phishing email identifier, malware behavior sandbox (observational)
**Assessment Strategy:** Quiz-and-challenge for L2 and L4; quiz-only for L1 and L3

**Practical Progression:**
- **Beginner:** Match 6 malware descriptions to their type (virus, worm, ransomware, trojan, rootkit, spyware)
- **Intermediate:** Identify the social engineering technique used in each of 4 scenario descriptions
- **Advanced:** Analyze a fictional phishing email and list 5 indicators of compromise
- **Capstone:** Not applicable at module level

---

##### A1.C3.M1.L1 — Malware: Types and Behavior
- **Slug:** malware-types-and-behavior | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-07, SEC-05, SEC-03 | **Prereqs:** A1.C2.M2.L3
- **Interactive:** ConceptFlashCards (malware types), AttackTimelineViewer (malware infection timeline)
- **Animations:** ransomware-encryption-spread, worm-network-propagation, rootkit-stealth-visualization
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 1, ITF+ Domain 2 | **Careers:** SOC Analyst, Malware Analyst | **Accessibility:** Animation speed controls; flashcards keyboard-navigable with screen-reader descriptions

**Learning Objectives:**
1. Describe six malware families (virus, worm, trojan, ransomware, rootkit, spyware) and their distinguishing behaviors
2. Explain how malware is typically delivered to a victim system
3. Describe the impact of a ransomware attack on an organization's operations

**Skills Gained:** malware taxonomy, delivery mechanism awareness, ransomware impact understanding
**AI Mentor:** Avoid technical detail on malware construction; focus on behavior recognition and defender response

---

##### A1.C3.M1.L2 — Social Engineering and Phishing
- **Slug:** social-engineering-and-phishing | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-06, SEC-05 | **Prereqs:** A1.C3.M1.L1
- **Interactive:** ScenarioSimulator (spot-the-phish), QuizWidget
- **Animations:** phishing-email-anatomy, vishing-call-reconstruction, pretexting-scenario
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 1, ITF+ Domain 2 | **Careers:** Security Awareness, SOC Analyst | **Accessibility:** Phishing simulator fully text-based; no urgency-inducing time pressure in assessment

**Learning Objectives:**
1. Define social engineering and explain why it is effective against technical controls
2. Identify five indicators of a phishing email (urgency, spoofed sender, suspicious links, grammar, requests)
3. Distinguish between phishing, spear-phishing, vishing, and smishing

**Skills Gained:** phishing identification, social engineering awareness, human vulnerability recognition
**AI Mentor:** Normalize that anyone can be fooled; reduce shame response; focus on process not blame

---

##### A1.C3.M1.L3 — Insider Threats
- **Slug:** insider-threats | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-05, SEC-03 | **Prereqs:** A1.C3.M1.L1
- **Interactive:** ScenarioSimulator (insider scenario analysis), ComparisonTable (malicious vs. negligent insider)
- **Animations:** insider-threat-narrative, data-exfiltration-by-employee
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** Risk Analyst, SOC Analyst | **Accessibility:** Scenario text is screen-reader accessible; no audio-only content

**Learning Objectives:**
1. Distinguish between malicious and negligent insider threats with examples
2. Identify behavioral indicators that may suggest insider threat activity
3. Explain organizational controls (least privilege, monitoring, separation of duties) that reduce insider risk

**Skills Gained:** insider threat recognition, behavioral indicators, control concepts
**AI Mentor:** Treat this topic sensitively; emphasize organizational controls over surveillance culture

---

##### A1.C3.M1.L4 — Nation-State and APT Threats
- **Slug:** nation-state-and-apt-threats | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-05, SEC-08, SEC-03 | **Prereqs:** A1.C3.M1.L1, A1.C3.M1.L2, A1.C3.M1.L3
- **Interactive:** AttackTimelineViewer (APT campaign timeline), ClickableDiagram (APT lifecycle)
- **Animations:** apt-patience-timeline, stealthy-persistence-visualization
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** Threat Intelligence, SOC Analyst | **Accessibility:** APT timeline keyboard-navigable; full text alternative for animations

**Learning Objectives:**
1. Explain what an Advanced Persistent Threat (APT) is and how it differs from opportunistic attacks
2. Describe the three characteristics of APT: advanced techniques, persistent access, targeted objectives
3. Analyze a fictional APT scenario and identify what makes it "advanced" and "persistent"

**Skills Gained:** APT concept, threat actor sophistication spectrum, long-dwell threat awareness
**AI Mentor:** Surface the knowledge that most organizations will never face a nation-state threat, but will face APT techniques used by criminal groups

---

#### Module A1.C3.M2 — Vulnerabilities and Exploits

**Module Objectives:**
1. Understand what vulnerabilities are and how they are catalogued
2. Explain the vulnerability lifecycle from discovery to patch
3. Introduce the concept of exploitation without providing technical attack instruction

**KG Domain Coverage:** SEC-17 (vulnerability management), SEC-05 (exploits), KG gap: KG-documented knowledge gap progression
**Practical Outcomes:** Learner looks up a real CVE, reads its CVSS score, and explains the score in plain language
**Required Interactive Components:** ClickableDiagram, ScenarioSimulator, QuizWidget
**Animation Categories:** CVE lifecycle, CVSS score breakdown, patch deployment timeline
**Simulations:** CVE reader (structured view of a real CVE), CVSS score calculator (educational)
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Read 3 plain-language CVE descriptions and identify affected system
- **Intermediate:** Interpret a CVSS score (e.g., 9.8 Critical) and explain what makes it high
- **Advanced:** Compare patch-available date vs. exploitation-in-wild date for 3 historical CVEs
- **Capstone:** Not applicable at module level

---

##### A1.C3.M2.L1 — What is a Vulnerability?
- **Slug:** what-is-a-vulnerability | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-17, SEC-05, SEC-03 | **Prereqs:** A1.C3.M1.L4
- **Interactive:** ClickableDiagram (vulnerability anatomy), QuizWidget
- **Animations:** lock-flaw-metaphor, software-bug-to-vulnerability, vulnerability-attack-surface
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 1, ITF+ Domain 2 | **Careers:** Vulnerability Analyst, SOC Analyst | **Accessibility:** All diagrams text-labeled; no motion-only information

**Learning Objectives:**
1. Define vulnerability, exploit, and payload and explain how they relate
2. Classify vulnerabilities by origin (software bug, misconfiguration, design flaw, human error)
3. Explain what an attack surface is and give three examples of attack surface components

**Skills Gained:** vulnerability taxonomy, exploit concept, attack surface understanding
**AI Mentor:** Distinguish "vulnerability" from "patch is available" — some vulnerabilities have no patch

---

##### A1.C3.M2.L2 — CVEs and the Vulnerability Lifecycle
- **Slug:** cves-and-vulnerability-lifecycle | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-17, SEC-05 | **Prereqs:** A1.C3.M2.L1
- **Interactive:** ClickableDiagram (CVE lifecycle), ScenarioSimulator (CVE reader)
- **Animations:** cve-assignment-process, cvss-scoring-breakdown, nvd-database-visualization
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** Vulnerability Analyst, Patch Manager | **Accessibility:** External resource viewing has guided walkthrough; screen-reader compatible CVE viewer

**Learning Objectives:**
1. Explain what a CVE identifier is and how the CVE/NVD database works
2. Interpret a CVSS base score and its component vectors (AV, AC, PR, UI, S, C, I, A)
3. Describe the five phases of the vulnerability lifecycle (discovery → disclosure → patch → deployment → remediation)

**Skills Gained:** CVE literacy, CVSS interpretation, vulnerability lifecycle awareness
**AI Mentor:** Explain why CVSS score alone does not determine patching priority (exploitability in the wild matters more)

---

##### A1.C3.M2.L3 — Zero-Days and Patch Management
- **Slug:** zero-days-and-patch-management | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-17, SEC-05, SEC-03 | **Prereqs:** A1.C3.M2.L1, A1.C3.M2.L2
- **Interactive:** AttackTimelineViewer (zero-day from discovery to patch), ClickableDiagram
- **Animations:** zero-day-window-of-exposure, patch-tuesday-cycle, mean-time-to-patch
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 1, (ISC)² CC Domain 2 | **Careers:** Vulnerability Analyst, Security Engineer | **Accessibility:** Timeline keyboard-navigable; animated clock face has text alternative

**Learning Objectives:**
1. Explain what a zero-day vulnerability is and why it is especially dangerous
2. Describe the challenges organizations face in patch management at scale
3. Analyze the risk exposure window between vulnerability disclosure and patch deployment

**Skills Gained:** zero-day concept, patch management challenges, risk window analysis
**AI Mentor:** Validate the learner's recognition that patch management is an operations problem, not just a security problem

---

##### A1.C3.M2.L4 — The Exploit Development Mindset
- **Slug:** exploit-development-mindset | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** true
- **KG Nodes:** SEC-05, SEC-17, SEC-16 | **Prereqs:** A1.C3.M2.L1, A1.C3.M2.L2, A1.C3.M2.L3
- **Interactive:** ScenarioSimulator (authorized vs. unauthorized scenario chooser), QuizWidget
- **Animations:** ethical-hacker-vs-criminal-divergence, authorization-concept-visualization
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 1, CEH Domain 1 | **Careers:** Penetration Tester, Security Researcher | **Accessibility:** Ethical scenario choices fully text-based; no pressure mechanics

**ETHICAL CONTENT DECLARATION:** This lesson introduces exploit development as a mindset used by both authorized security researchers and malicious actors. Defensive countermeasures are covered in the same lesson. Security Reviewer sign-off required before publication.

**Learning Objectives:**
1. Explain what "thinking like an attacker" means in the context of authorized security research
2. Describe the legal boundary between ethical hacking and unauthorized access (referencing CFAA and UK CMA)
3. Explain why understanding exploitation helps defenders — and why that understanding requires strict ethical boundaries

**Skills Gained:** ethical hacking concept, authorization framing, defender benefit of attacker knowledge
**AI Mentor:** ETH1 + ETH2 required: present ethical framing first; ensure learner completes the defensive countermeasure section before quiz unlocks

---

#### Module A1.C3.M3 — Risk Fundamentals

**Module Objectives:**
1. Formalize the definitions of risk, threat, vulnerability, and impact
2. Apply qualitative risk assessment
3. Understand risk tolerance and organizational risk appetite

**KG Domain Coverage:** SEC-11 (risk management), SEC-03 (threat/vuln/risk definitions)
**Practical Outcomes:** Learner completes a simplified risk assessment matrix for a fictional scenario
**Required Interactive Components:** ScenarioSimulator, ComparisonTable, QuizWidget
**Animation Categories:** Risk matrix construction, likelihood vs. impact visualization, risk register demo
**Simulations:** Risk matrix builder (drag scenarios onto likelihood/impact grid)
**Assessment Strategy:** Quiz-and-challenge for L2 and L4; quiz-only for L1 and L3

**Practical Progression:**
- **Beginner:** Place 5 risks on a 2×2 likelihood/impact matrix
- **Intermediate:** Calculate qualitative risk score for 3 scenarios
- **Advanced:** Draft a 5-row risk register with risk owner, control, and residual risk
- **Capstone:** Risk section feeds into Course 3 Capstone

---

##### A1.C3.M3.L1 — Risk, Threat, and Vulnerability Defined
- **Slug:** risk-threat-vulnerability-defined | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-11, SEC-03 | **Prereqs:** A1.C3.M2.L4
- **Interactive:** ComparisonTable (risk vs. threat vs. vulnerability), QuizWidget
- **Animations:** risk-equation-animation (Risk = Threat × Vulnerability × Impact), venn-diagram-reveal
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** Risk Analyst, Compliance Analyst | **Accessibility:** Equation animation has static formula view; table properly headed

**Learning Objectives:**
1. Formally distinguish threat, vulnerability, exploit, impact, and risk using precise definitions
2. Apply the risk equation (Risk = Threat × Vulnerability × Impact) to a simple scenario
3. Explain how a threat can exist without a vulnerability being exploitable

**Skills Gained:** risk vocabulary, risk equation, threat/vulnerability independence concept
**AI Mentor:** Flag common confusions: "threat = danger", "vulnerability = weakness" — reinforce precision

---

##### A1.C3.M3.L2 — Risk Assessment Basics
- **Slug:** risk-assessment-basics | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-11 | **Prereqs:** A1.C3.M3.L1
- **Interactive:** ScenarioSimulator (risk matrix builder), QuizWidget
- **Animations:** qualitative-vs-quantitative-comparison, likelihood-impact-matrix-build
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** Risk Analyst, Compliance | **Accessibility:** Risk matrix drag-drop has keyboard alternative; color-coded cells also text-labeled

**Learning Objectives:**
1. Explain the difference between qualitative and quantitative risk assessment
2. Populate a 3×3 risk matrix with three provided risk scenarios
3. Identify which risks should be prioritized based on the matrix

**Skills Gained:** qualitative risk assessment, risk matrix use, risk prioritization
**AI Mentor:** Introduce the concept that risk matrices are subjective — different teams may score the same risk differently

---

##### A1.C3.M3.L3 — Risk Tolerance and Appetite
- **Slug:** risk-tolerance-and-appetite | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-11 | **Prereqs:** A1.C3.M3.L1
- **Interactive:** ScenarioSimulator (organization type selector — bank vs. startup), ComparisonTable
- **Animations:** risk-appetite-spectrum, board-level-risk-decision
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** CISO, Risk Manager, Compliance | **Accessibility:** Organization selector keyboard-navigable; risk spectrum has text labels

**Learning Objectives:**
1. Define risk tolerance and risk appetite and explain how they differ between organizations
2. Analyze why a startup and a hospital may have different risk tolerances for the same threat
3. Explain what "accept," "mitigate," "transfer," and "avoid" mean as risk responses

**Skills Gained:** risk tolerance concept, risk response strategies, sector-specific risk reasoning
**AI Mentor:** Connect to learner's stated industry if provided; surface relevant regulatory context

---

##### A1.C3.M3.L4 — Building a Risk Register
- **Slug:** building-a-risk-register | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-11, SEC-03 | **Prereqs:** A1.C3.M3.L1, A1.C3.M3.L2, A1.C3.M3.L3
- **Interactive:** ScenarioSimulator (risk register builder), QuizWidget
- **Animations:** risk-register-template-reveal, governance-lifecycle
- **Practical:** free-lab | **Assessment:** quiz-and-capstone | **Reflection:** transfer
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** Risk Analyst, CISO, GRC Analyst | **Accessibility:** Register builder fully keyboard-navigable; downloadable template available

**Learning Objectives:**
1. Identify the minimum fields required in a security risk register (risk ID, description, owner, likelihood, impact, response, residual risk)
2. Populate a 5-row risk register for a fictional e-commerce company
3. Explain how a risk register is used in ongoing security governance

**Skills Gained:** risk register construction, risk ownership, governance lifecycle
**AI Mentor:** Celebrate the completion of learner's first risk register as a real deliverable; connect to GRC career path

---

### Course A1.C3 — Capstone

**Title:** Threat and Risk Report: The Meridian Clinic
**Type:** quiz-and-capstone | **Duration:** 55 min | **Difficulty:** beginner

**Scenario:** Learner receives a fictional one-page IT profile for Meridian Clinic (small healthcare provider, Windows workstations, one internet-connected server, no dedicated security staff). They must:
1. Identify at least 4 threats specific to a healthcare environment
2. Classify each threat by type (malware, social engineering, insider, APT)
3. Map 2 threats to relevant vulnerabilities in the clinic's described setup
4. Populate a 4-row risk register with risk scores, responses, and owners

**Assessment Criteria:** Threat identification relevance, risk register completeness, response appropriateness
**KG Validation:** SEC-03, SEC-05, SEC-06, SEC-07, SEC-11, SEC-17 exercised

---

### Course A1.C4 — Security Principles and Mindset

**Purpose:** Now that learners understand what goes wrong (C3), this course establishes the foundational principles that guide what goes right. CIA triad receives deep treatment. Defense in depth, zero trust, and security-by-design are introduced as architectural principles, not products. Threat modeling at beginner level is introduced.

**Learning Outcomes:**
- Explain each CIA property with precision and apply it to scenarios
- Describe defense-in-depth as an architectural principle
- Explain zero trust and why "trust but verify" is obsolete
- Apply a simplified threat modeling process to a basic scenario

**Estimated Hours:** 8–9 hours | **Difficulty:** beginner | **Prerequisites:** A1.C1, A1.C2, A1.C3
**Career Relevance:** Security Architect, Security Engineer, SOC Analyst, Risk Analyst
**Certification Alignment:** Security+ Domain 1 & 2, (ISC)² CC Domain 1, CompTIA CySA+

---

#### Module A1.C4.M1 — CIA Triad and Core Principles

**Module Objectives:**
1. Achieve precise understanding of each CIA property with scenario-based application
2. Understand non-repudiation and authentication as security principles
3. Identify which CIA property is violated in breach scenarios

**KG Domain Coverage:** SEC-02 (CIA triad), SEC-14 (authentication concept)
**Practical Outcomes:** Learner correctly classifies 10 security incidents by which CIA property is primarily violated
**Required Interactive Components:** ScenarioSimulator, ComparisonTable, QuizWidget, ConceptFlashCards
**Animation Categories:** CIA triad reveal, data breach impact by property, non-repudiation chain
**Simulations:** CIA violation classifier (scenario → violated property)
**Assessment Strategy:** Quiz-and-challenge for L4; quiz-only for L1–L3

**Practical Progression:**
- **Beginner:** Match 6 breach scenarios to CIA property violated
- **Intermediate:** For each CIA property, provide one preventive and one detective control
- **Advanced:** Analyze a breach summary and explain which properties were violated, in what order, and why
- **Capstone:** Not applicable at module level

---

##### A1.C4.M1.L1 — Confidentiality: Keeping Secrets
- **Slug:** confidentiality-keeping-secrets | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-02, SEC-13 | **Prereqs:** A1.C3.M3.L4
- **Interactive:** ScenarioSimulator (confidentiality violation spotter), QuizWidget
- **Animations:** encryption-as-envelope-metaphor, data-classification-tiers, unauthorized-read-animation
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 2, ITF+ Domain 3 | **Careers:** All roles | **Accessibility:** Scenario choices text-based; encryption metaphor has static diagram alternative

**Learning Objectives:**
1. Define confidentiality precisely: ensuring data is accessible only to authorized parties
2. Identify three controls that enforce confidentiality (encryption, access control, classification)
3. Explain a confidentiality violation with a real-world example (data breach, insider exfiltration)

**Skills Gained:** confidentiality definition, data classification concept, encryption introduction
**AI Mentor:** Connect to learner's personal context — their medical records, banking data, or work files

---

##### A1.C4.M1.L2 — Integrity: Trusting Data
- **Slug:** integrity-trusting-data | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-02, SEC-13 | **Prereqs:** A1.C4.M1.L1
- **Interactive:** ClickableDiagram (hash function concept), ScenarioSimulator (spot-the-tampered-file)
- **Animations:** hashing-visualization, file-tamper-detection-demo, checksum-comparison
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 2, ITF+ Domain 3 | **Careers:** Forensics Analyst, SOC Analyst | **Accessibility:** Hash animation has step-by-step text mode; file comparison diagram labeled

**Learning Objectives:**
1. Define integrity precisely: ensuring data is accurate and has not been tampered with
2. Explain how cryptographic hashing provides integrity verification
3. Give three examples of integrity violations (database tampering, log deletion, firmware modification)

**Skills Gained:** data integrity concept, hashing introduction, tamper detection awareness
**AI Mentor:** Plant the seed for digital forensics — evidence integrity (chain of custody) depends on this principle

---

##### A1.C4.M1.L3 — Availability: Keeping Systems Running
- **Slug:** availability-keeping-systems-running | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-02 | **Prereqs:** A1.C4.M1.L1
- **Interactive:** ScenarioSimulator (DoS impact calculator), ComparisonTable (HA strategies)
- **Animations:** dos-ddos-visualization, redundancy-failover-animation, uptime-sla-concept
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 2, ITF+ Domain 3 | **Careers:** SOC Analyst, Infrastructure | **Accessibility:** Impact calculator keyboard-accessible; animation pause controls present

**Learning Objectives:**
1. Define availability precisely: ensuring systems and data are accessible to authorized users when needed
2. Explain how DoS and DDoS attacks threaten availability
3. Describe three availability controls (redundancy, load balancing, backup/recovery)

**Skills Gained:** availability definition, DoS concept, resilience controls
**AI Mentor:** Emphasize that availability failures are often not attacks — hardware failure, power outage, human error are more common causes

---

##### A1.C4.M1.L4 — Non-Repudiation and Authentication
- **Slug:** non-repudiation-and-authentication | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-02, SEC-14 | **Prereqs:** A1.C4.M1.L1, A1.C4.M1.L2, A1.C4.M1.L3
- **Interactive:** ClickableDiagram (digital signature chain), QuizWidget
- **Animations:** digital-signature-metaphor, mfa-factors-visualization, repudiation-denial-scenario
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 1 | **Careers:** SOC Analyst, IAM Specialist | **Accessibility:** Digital signature diagram labeled with aria; MFA factors icon+text

**Learning Objectives:**
1. Explain non-repudiation and why it matters in audit trails, financial transactions, and legal contexts
2. Define authentication and distinguish it from authorization
3. Describe the three authentication factors (something you know, have, are) with examples

**Skills Gained:** non-repudiation concept, authentication factors, authorization distinction
**AI Mentor:** Introduce that Academy 4 covers Kerberos and NTLM as deep implementations of these concepts

---

#### Module A1.C4.M2 — Defense in Depth

**Module Objectives:**
1. Understand defense in depth as an architectural philosophy
2. Classify security controls by type and function
3. Introduce zero trust as an evolution beyond perimeter security

**KG Domain Coverage:** SEC-09 (defense in depth), SEC-04 (security controls), SEC-10 (zero trust)
**Practical Outcomes:** Learner designs a 3-layer defense-in-depth model for a fictional small company
**Required Interactive Components:** ClickableDiagram, ComparisonTable, ScenarioSimulator, QuizWidget
**Animation Categories:** Castle-and-moat to layered defense metaphor, zero trust verification flow, control classification
**Simulations:** Defense layer builder (click to add controls to each layer), zero trust scenario
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Label a provided defense-in-depth diagram with correct control categories
- **Intermediate:** For a given attack scenario, identify which layer would catch it
- **Advanced:** Design a defense-in-depth model for a fictional hospital, including physical, technical, and administrative controls
- **Capstone:** Not applicable at module level

---

##### A1.C4.M2.L1 — The Layers of Defense
- **Slug:** the-layers-of-defense | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-09, SEC-04 | **Prereqs:** A1.C4.M1.L4
- **Interactive:** ClickableDiagram (defense layers), ScenarioSimulator (attacker stops at which layer?)
- **Animations:** castle-metaphor-to-layered-defense, attack-stopped-at-layer-visualization
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 2 | **Careers:** Security Architect, SOC Analyst | **Accessibility:** Layer diagram keyboard-navigable; metaphor animation has text description

**Learning Objectives:**
1. Explain the defense-in-depth principle: multiple independent security layers so that no single failure leads to compromise
2. Identify six defensive layers (physical, perimeter, network, host, application, data)
3. Explain why defense in depth is preferred over "strong perimeter" security

**Skills Gained:** layered defense concept, defense architecture thinking, perimeter security limitations
**AI Mentor:** Connect to cloud security context — the perimeter dissolved; defense in depth is now more important than ever

---

##### A1.C4.M2.L2 — Security Controls: Preventive, Detective, Corrective
- **Slug:** security-controls-preventive-detective-corrective | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-04, SEC-09 | **Prereqs:** A1.C4.M2.L1
- **Interactive:** ComparisonTable (controls by type and function), ScenarioSimulator (control selector)
- **Animations:** preventive-barrier, detective-alarm, corrective-response-sequence
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 2 | **Careers:** Security Engineer, Risk Analyst | **Accessibility:** Table has row/column headers; scenario selector keyboard-navigable

**Learning Objectives:**
1. Classify security controls as preventive, detective, corrective, or compensating
2. Apply control classification to 8 real-world security measures (firewall, IDS, antivirus, backup, etc.)
3. Explain why a balanced mix of all control types is required

**Skills Gained:** control taxonomy, control selection thinking, balanced defense
**AI Mentor:** Flag if learner over-relies on preventive controls; explain the "assume breach" philosophy requires detective and corrective controls too

---

##### A1.C4.M2.L3 — Zero Trust Architecture
- **Slug:** zero-trust-architecture | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-10, SEC-09 | **Prereqs:** A1.C4.M2.L1, A1.C4.M2.L2
- **Interactive:** ScenarioSimulator (verify-every-request scenario), ClickableDiagram (ZTA pillars)
- **Animations:** never-trust-always-verify, perimeter-collapse-animation, microsegmentation-visualization
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 2 | **Careers:** Security Architect, Cloud Security | **Accessibility:** Scenario simulator fully keyboard-navigable; ZTA pillars have text descriptions

**Learning Objectives:**
1. Explain zero trust's core principle: "never trust, always verify" regardless of network location
2. Identify the five pillars of zero trust (identity, device, network, application, data)
3. Analyze why zero trust became necessary with cloud adoption and remote work

**Skills Gained:** zero trust principles, ZTA pillars, cloud-era security thinking
**AI Mentor:** Connect zero trust to microsegmentation — learner will implement this conceptually in Academy 2

---

##### A1.C4.M2.L4 — Security by Design
- **Slug:** security-by-design | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** SEC-09, SEC-04, SEC-10 | **Prereqs:** A1.C4.M2.L1, A1.C4.M2.L2, A1.C4.M2.L3
- **Interactive:** ScenarioSimulator (build-vs-retrofit comparison), QuizWidget
- **Animations:** sdlc-security-integration, secure-defaults-reveal, shift-left-concept
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 2 | **Careers:** Security Developer, Architect | **Accessibility:** SDLC animation pauseable; no motion required for comprehension

**Learning Objectives:**
1. Explain "security by design" and why retrofitting security is more expensive than building it in
2. Evaluate two architectural choices (default-open vs. default-deny; public vs. private by default) for security implications
3. Describe the "shift left" concept in software development security

**Skills Gained:** security-by-design principle, shift-left concept, secure defaults
**AI Mentor:** Particularly relevant for learner persona Alex (developer) — connect to DevSecOps path

---

#### Module A1.C4.M3 — Thinking Like a Security Professional

**Module Objectives:**
1. Apply the adversarial mindset to analyze systems
2. Perform basic threat modeling (STRIDE at conceptual level)
3. Communicate security findings to non-technical stakeholders

**KG Domain Coverage:** SEC-19 (threat modeling), SEC-20 (security metrics), SEC-15 (professional skills)
**Practical Outcomes:** Learner completes a STRIDE threat model for a simple login form
**Required Interactive Components:** ScenarioSimulator, ClickableDiagram, QuizWidget
**Animation Categories:** STRIDE concept reveal, threat model conversation, risk communication to board
**Simulations:** STRIDE threat modeler (login system), risk communication roleplay
**Assessment Strategy:** Quiz-and-challenge for L2–L4; quiz-only for L1

**Practical Progression:**
- **Beginner:** Apply STRIDE categories to 6 provided threat descriptions
- **Intermediate:** Identify 3 STRIDE threats against a simple web login form
- **Advanced:** Document a full STRIDE threat model for the login form with mitigations
- **Capstone:** Feeds into Course 4 Capstone

---

##### A1.C4.M3.L1 — The Adversarial Mindset
- **Slug:** the-adversarial-mindset | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** SEC-19, SEC-05 | **Prereqs:** A1.C4.M2.L4
- **Interactive:** ScenarioSimulator (spot-the-weakness from attacker view), QuizWidget
- **Animations:** attacker-recon-perspective, weak-link-finder, switch-perspective-animation
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 1, CEH Domain 1 | **Careers:** Penetration Tester, Security Architect | **Accessibility:** Scenario interactions fully keyboard-navigable; no hidden content requiring hover

**Learning Objectives:**
1. Describe what it means to "think like an attacker" in an authorized context
2. Apply the adversarial perspective to identify 3 weaknesses in a described system
3. Explain why understanding attacker goals helps defenders set priorities

**Skills Gained:** adversarial thinking, weakness identification, defender prioritization
**AI Mentor:** Frame this as protective skill not enabling harm; connect to the ethical hacking discussion from A1.C3

---

##### A1.C4.M3.L2 — Threat Modeling Basics
- **Slug:** threat-modeling-basics | **Type:** discovery | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-19 | **Prereqs:** A1.C4.M3.L1
- **Interactive:** ScenarioSimulator (STRIDE modeler), ClickableDiagram (DFD data flow), QuizWidget
- **Animations:** dfd-construction, stride-category-reveal, mitigation-mapping
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 1, (ISC)² SSCP | **Careers:** Security Architect, AppSec Engineer | **Accessibility:** STRIDE modeler keyboard-navigable; DFD diagram labeled with flow descriptions

**Learning Objectives:**
1. Name the six STRIDE threat categories and give one example threat per category
2. Identify what a Data Flow Diagram (DFD) is and how it is used in threat modeling
3. Apply STRIDE to a simple login form and identify at least 4 threats

**Skills Gained:** STRIDE model, DFD basics, structured threat identification
**AI Mentor:** Use the 3-level hint system if learner cannot identify STRIDE threats from the scenario

---

##### A1.C4.M3.L3 — Security Metrics and KPIs
- **Slug:** security-metrics-and-kpis | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** SEC-20, SEC-11 | **Prereqs:** A1.C4.M3.L1
- **Interactive:** ComparisonTable (good vs. bad metrics), QuizWidget
- **Animations:** metric-dashboard-visualization, mean-time-to-detect-explained
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** CISO, Risk Manager, SOC Lead | **Accessibility:** Dashboard visualization has text summary; all charts have accessible data tables

**Learning Objectives:**
1. Explain why security metrics matter for justifying investment and measuring improvement
2. Identify 5 common security KPIs (MTTD, MTTR, patch rate, phishing click rate, vulnerability count)
3. Evaluate whether a given metric is actionable or vanity

**Skills Gained:** security measurement, KPI awareness, metric evaluation
**AI Mentor:** Connect to CISO persona Jennifer — board reporting requires translating technical metrics to business risk

---

##### A1.C4.M3.L4 — Communicating Risk to Stakeholders
- **Slug:** communicating-risk-to-stakeholders | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** SEC-20, SEC-11, SEC-15 | **Prereqs:** A1.C4.M3.L1, A1.C4.M3.L2, A1.C4.M3.L3
- **Interactive:** ScenarioSimulator (risk communication rewriter), QuizWidget
- **Animations:** technical-to-business-translation, board-room-security-briefing
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 5 | **Careers:** CISO, Risk Manager, Security Manager | **Accessibility:** Communication rewriter fully keyboard-navigable; no time pressure in revision exercise

**Learning Objectives:**
1. Rewrite a technical vulnerability description into business-impact language for a non-technical executive
2. Explain what a risk executive summary should and should not contain
3. Identify the difference between FUD-based communication and evidence-based risk communication

**Skills Gained:** risk communication, business-risk translation, stakeholder engagement
**AI Mentor:** Celebrate improved business-language drafts; flag jargon that would lose a non-technical audience

---

### Course A1.C4 — Capstone

**Title:** Security Design Review: The Axiom Startup
**Type:** quiz-and-capstone | **Duration:** 60 min | **Difficulty:** beginner

**Scenario:** Learner reviews the architecture of a fictional startup (web app, single server, no security controls described). They must:
1. Identify CIA triad violations in the described architecture
2. Apply STRIDE to identify 5 threats against the web app's login and data storage
3. Design a defense-in-depth model with controls at 4 layers
4. Write a 1-paragraph executive summary communicating the top 2 risks in business language

**Assessment Criteria:** STRIDE completeness, control layer coverage, CIA accuracy, communication clarity
**KG Validation:** SEC-02, SEC-04, SEC-09, SEC-10, SEC-11, SEC-19 exercised

---

### Course A1.C5 — Ethics, Laws, and Careers

**Purpose:** Security knowledge without ethical grounding is dangerous. This course ensures every learner understands the legal framework governing security work, the ethical responsibilities of security professionals, and what authorized security research looks like. It closes with the learner planning their personal career path — the last step before choosing their specialization academy.

**Learning Outcomes:**
- Identify the primary computer crime laws and what they prohibit
- Explain responsible disclosure and bug bounty programs
- Describe what authorized penetration testing involves
- Create a personal learning roadmap for the next 6 months

**Estimated Hours:** 6–8 hours | **Difficulty:** beginner | **Prerequisites:** A1.C1–A1.C4
**Career Relevance:** All roles (ethics is universal); specifically surfaces Penetration Tester, Security Researcher, GRC Analyst
**Certification Alignment:** Security+ Domain 1 & 5, (ISC)² CC Domain 1, CEH Domain 1

---

#### Module A1.C5.M1 — Legal and Ethical Framework

**Module Objectives:**
1. Understand the primary computer crime laws in the US and globally
2. Recognize what constitutes unauthorized access
3. Understand privacy laws and their security implications

**KG Domain Coverage:** SEC-12 (legal/ethical), GRC-01 (legal frameworks at L1)
**Practical Outcomes:** Learner identifies legal/illegal actions in 5 scenarios
**Required Interactive Components:** ScenarioSimulator, ComparisonTable, QuizWidget
**Animation Categories:** Law timeline, CFAA scope visualization, GDPR applicability map
**Simulations:** Legal/illegal action classifier
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Classify 6 actions as legal or illegal under the CFAA
- **Intermediate:** Identify which privacy law applies to a scenario (GDPR, HIPAA, CCPA)
- **Advanced:** Determine whether a described security test requires a scope document and why
- **Capstone:** Not applicable at module level

---

##### A1.C5.M1.L1 — Computer Crime Laws (CFAA, UK CMA, GDPR)
- **Slug:** computer-crime-laws-cfaa-cma-gdpr | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-12, GRC-01 | **Prereqs:** A1.C4.M3.L4
- **Interactive:** ClickableDiagram (law jurisdiction map), ScenarioSimulator (legal/illegal classifier)
- **Animations:** cfaa-timeline, gdpr-scope-visualization, jurisdiction-matters-scenario
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 5, (ISC)² CC Domain 1 | **Careers:** GRC Analyst, Penetration Tester | **Accessibility:** Jurisdiction map keyboard-navigable with text labels; scenario classifier is text-only

**Learning Objectives:**
1. Explain what the Computer Fraud and Abuse Act (CFAA) prohibits and its relevance to security professionals
2. Describe the UK Computer Misuse Act and how it compares to the CFAA
3. Identify three key GDPR obligations for organizations that process personal data

**Skills Gained:** legal framework awareness, CFAA scope, GDPR basics
**AI Mentor:** ETH1: Emphasize these laws apply to security professionals conducting unauthorized tests; not just criminals

---

##### A1.C5.M1.L2 — Privacy Laws and Compliance
- **Slug:** privacy-laws-and-compliance | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-12, GRC-01 | **Prereqs:** A1.C5.M1.L1
- **Interactive:** ComparisonTable (GDPR vs. HIPAA vs. CCPA vs. PCI-DSS), QuizWidget
- **Animations:** data-breach-notification-timeline, privacy-by-design-concept
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 5, CIPP/US | **Careers:** GRC Analyst, Compliance Analyst | **Accessibility:** Comparison table properly headed and screen-reader accessible

**Learning Objectives:**
1. Identify which privacy regulation applies to four sector-specific scenarios (healthcare, credit card, EU users, California residents)
2. Explain what a breach notification obligation means and typical notification windows
3. Describe "privacy by design" as a compliance strategy

**Skills Gained:** compliance framework awareness, breach notification, privacy-by-design concept
**AI Mentor:** Flag that compliance is the floor, not the ceiling; passing compliance audits does not mean security

---

##### A1.C5.M1.L3 — Responsible Disclosure
- **Slug:** responsible-disclosure | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** true
- **KG Nodes:** SEC-12, SEC-16 | **Prereqs:** A1.C5.M1.L1
- **Interactive:** ScenarioSimulator (disclose or not? timeline decisions), QuizWidget
- **Animations:** coordinated-disclosure-timeline, full-disclosure-risks, cvd-process
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Security+ Domain 5, CEH Domain 1 | **Careers:** Security Researcher, Penetration Tester | **Accessibility:** Timeline simulator keyboard-navigable; decision points text-labeled

**ETHICAL CONTENT DECLARATION:** Discusses vulnerability discovery and the ethical obligation to notify vendors before public disclosure. Includes defensive framing: if a researcher discovers a vulnerability, the right response is coordinated disclosure, not exploitation or sale.

**Learning Objectives:**
1. Define responsible disclosure (coordinated vulnerability disclosure) and explain its purpose
2. Describe the standard CVD timeline (notify vendor → wait for patch → public disclosure after deadline)
3. Evaluate the ethical trade-offs between full disclosure, coordinated disclosure, and silent disclosure

**Skills Gained:** responsible disclosure process, CVD timeline, ethical research principles
**AI Mentor:** ETH1 + ETH2 required; present ethical framing first; defensive response (legal disclosure) must be covered before quiz unlocks

---

##### A1.C5.M1.L4 — Ethics in Security Research
- **Slug:** ethics-in-security-research | **Type:** discovery | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** true
- **KG Nodes:** SEC-12, SEC-16 | **Prereqs:** A1.C5.M1.L1, A1.C5.M1.L2, A1.C5.M1.L3
- **Interactive:** ScenarioSimulator (ethical dilemma resolver), QuizWidget
- **Animations:** hacker-ethics-spectrum, dual-use-research-tradeoffs
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 5, CEH Domain 1 | **Careers:** Security Researcher, Penetration Tester | **Accessibility:** Ethical dilemma scenarios text-only; no visual-only cues for ethical judgment

**ETHICAL CONTENT DECLARATION:** Directly addresses dual-use research, where the same knowledge enables both attack and defense. Defensive framing is the explicit thesis: ethical researchers use their knowledge to improve security, not exploit it. Security Reviewer sign-off required.

**Learning Objectives:**
1. Apply an ethical decision framework to 3 security research dilemmas
2. Explain the "dual-use" nature of security knowledge and why it requires ethical commitment
3. Describe the professional codes of ethics for (ISC)² members and EC-Council certified practitioners

**Skills Gained:** applied ethics, professional codes of conduct, dual-use research awareness
**AI Mentor:** Validate ethical reasoning process even when learner's conclusion differs from "expected" — ethics involves judgment, not pattern matching

---

#### Module A1.C5.M2 — Ethical Hacking and Research

**Module Objectives:**
1. Understand what authorized penetration testing involves
2. Explain bug bounty programs and their ecosystem
3. Understand what constitutes proper scope and authorization

**KG Domain Coverage:** SEC-16 (penetration testing concept), SEC-12 (authorization)
**Practical Outcomes:** Learner writes a scope statement for a fictional authorized test
**Required Interactive Components:** ScenarioSimulator, ClickableDiagram, QuizWidget
**Animation Categories:** Pentest engagement lifecycle, bug bounty report submission, scope vs. out-of-scope
**Simulations:** Scope writer (guided), "is this in scope?" classifier
**Assessment Strategy:** Quiz-and-challenge for all lessons in this module

**Practical Progression:**
- **Beginner:** Classify 6 actions as in-scope or out-of-scope for a described pentest
- **Intermediate:** Identify the missing elements in a provided scope document
- **Advanced:** Write a complete scope statement for a fictional web application pentest
- **Capstone:** Feeds into Course 5 Capstone

---

##### A1.C5.M2.L1 — What is Penetration Testing?
- **Slug:** what-is-penetration-testing | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** true
- **KG Nodes:** SEC-16, SEC-12 | **Prereqs:** A1.C5.M1.L4
- **Interactive:** ClickableDiagram (pentest engagement phases), ComparisonTable (pentest vs. vulnerability scan vs. red team)
- **Animations:** pentest-engagement-lifecycle, rules-of-engagement-reveal
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 1, CEH Domain 1, OSCP (foundational) | **Careers:** Penetration Tester, Red Team | **Accessibility:** Phase diagram keyboard-navigable; comparison table screen-reader accessible

**ETHICAL CONTENT DECLARATION:** Introduces penetration testing as authorized simulation of attacks. Defensive framing: the goal is to find vulnerabilities before attackers do, to enable remediation. Authorization is presented as the essential boundary. Security Reviewer sign-off required.

**Learning Objectives:**
1. Define penetration testing and explain how it differs from a vulnerability scan and a red team exercise
2. Describe the five phases of a penetration test (planning, reconnaissance, exploitation, post-exploitation, reporting)
3. Explain why written authorization is an absolute requirement before any penetration test begins

**Skills Gained:** pentest concept, engagement phases, authorization requirement
**AI Mentor:** ETH1 required — present authorization framing first; learner must acknowledge ethical boundary before practical unlocks

---

##### A1.C5.M2.L2 — Bug Bounty Programs
- **Slug:** bug-bounty-programs | **Type:** discovery | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** SEC-16, SEC-12 | **Prereqs:** A1.C5.M2.L1
- **Interactive:** ClickableDiagram (bug bounty program anatomy), ScenarioSimulator (triage a bug report)
- **Animations:** bug-bounty-ecosystem, hacker-to-vendor-pipeline, reward-structure
- **Practical:** browser-exercise | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 1, CEH | **Careers:** Security Researcher, Bug Bounty Hunter | **Accessibility:** Bug bounty triage simulator keyboard-accessible; program anatomy diagram text-labeled

**Learning Objectives:**
1. Explain what a bug bounty program is and how it benefits both organizations and researchers
2. Describe the components of a bug bounty program (scope, rules, reward tiers, safe harbor)
3. Identify what makes a quality vulnerability report (reproduction steps, impact, CVSS)

**Skills Gained:** bug bounty awareness, vulnerability report quality, safe harbor concept
**AI Mentor:** Surface that bug bounties are not a reliable income source at beginner level; manage expectations while encouraging participation

---

##### A1.C5.M2.L3 — Rules of Engagement
- **Slug:** rules-of-engagement | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** true
- **KG Nodes:** SEC-12, SEC-16 | **Prereqs:** A1.C5.M2.L1
- **Interactive:** ScenarioSimulator (in-scope/out-of-scope decisions), QuizWidget
- **Animations:** roe-document-anatomy, scope-boundary-visualization
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 5, CEH Domain 1 | **Careers:** Penetration Tester | **Accessibility:** Scope decision simulator keyboard-navigable; document anatomy labeled

**ETHICAL CONTENT DECLARATION:** Presents Rules of Engagement as the legal and ethical protection for both tester and client. Emphasizes that actions outside the ROE expose the tester to criminal liability regardless of intent.

**Learning Objectives:**
1. Identify the minimum contents of a Rules of Engagement (ROE) document
2. Classify 6 actions as within or outside a described scope
3. Explain what happens legally if a tester exceeds their authorized scope

**Skills Gained:** ROE document reading, scope adherence, legal exposure awareness
**AI Mentor:** ETH1 required; emphasize that scope violations are crimes, not technicalities

---

##### A1.C5.M2.L4 — Writing Security Reports
- **Slug:** writing-security-reports | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-16, SEC-15 | **Prereqs:** A1.C5.M2.L1, A1.C5.M2.L2, A1.C5.M2.L3
- **Interactive:** ScenarioSimulator (report rewriter), QuizWidget
- **Animations:** pentest-report-anatomy, executive-summary-vs-technical-findings
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 5, CEH | **Careers:** Penetration Tester, Security Consultant | **Accessibility:** Report rewriter tool keyboard-navigable; template download available

**Learning Objectives:**
1. Identify the required sections of a penetration test report (executive summary, methodology, findings, remediation)
2. Write a finding entry with: title, severity, description, evidence, impact, and remediation recommendation
3. Explain how to calibrate report language for a technical audience vs. an executive audience

**Skills Gained:** security report writing, finding documentation, audience calibration
**AI Mentor:** Celebrate a well-written finding; coach on conciseness and evidence requirement

---

#### Module A1.C5.M3 — Your Cybersecurity Learning Path

**Module Objectives:**
1. Map personal background to appropriate cybersecurity career paths
2. Understand the academy structure and what to study next
3. Set a realistic 6-month learning goal

**KG Domain Coverage:** SEC-15, Learning Path references PATH-1 through PATH-11
**Practical Outcomes:** Learner creates a personal 6-month learning roadmap
**Required Interactive Components:** ScenarioSimulator (path planner), ClickableDiagram, QuizWidget
**Animation Categories:** Career path decision tree, academy journey preview, CTF and lab environment
**Simulations:** Path planner, "choose your next academy" simulator, CTF intro environment
**Assessment Strategy:** Quiz-and-challenge for L3–L4; quiz-only for L1–L2

**Practical Progression:**
- **Beginner:** Identify which 2 academies align with their stated career goal
- **Intermediate:** List 3 free resources to practice each skill in their chosen path
- **Advanced:** Write a 6-month learning plan with specific milestones
- **Capstone:** This module IS the course and academy capstone preparation

---

##### A1.C5.M3.L1 — From Learner to Practitioner
- **Slug:** from-learner-to-practitioner | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** SEC-15 | **Prereqs:** A1.C5.M2.L4
- **Interactive:** ClickableDiagram (learner-to-professional journey), ConceptFlashCards (career milestones)
- **Animations:** experience-ladder, portfolio-building-montage
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** All | **Careers:** All | **Accessibility:** Journey diagram keyboard-navigable; career milestone cards screen-reader labeled

**Learning Objectives:**
1. Describe the typical progression from studying cybersecurity to landing a first role
2. Identify three types of evidence that demonstrate practical skill (CTF writeups, lab screenshots, GitHub projects)
3. Explain why certifications, experience, and portfolio together create a stronger case than any one alone

**Skills Gained:** career progression awareness, portfolio concept, learning-to-work transition
**AI Mentor:** Personalize timeline to learner's stated current job and target; normalize that most paths take 1–2 years of deliberate practice

---

##### A1.C5.M3.L2 — Building Your Home Lab
- **Slug:** building-your-home-lab | **Type:** discovery | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-15, CB-07 | **Prereqs:** A1.C5.M3.L1
- **Interactive:** ScenarioSimulator (lab design chooser), ClickableDiagram (VM lab topology)
- **Animations:** virtualbox-setup-timelapse, lab-network-design, kali-linux-intro
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** CompTIA A+, Security+ | **Careers:** All technical roles | **Accessibility:** Lab setup guide available as text document; animation captions present

**Learning Objectives:**
1. Explain what a virtual machine is and why it is essential for security practice
2. Describe a minimal home lab setup (host machine, hypervisor, 2 VMs)
3. Apply this knowledge to choose appropriate VMs for their next academy (Kali, Windows Server, Ubuntu)

**Skills Gained:** virtualization concept, lab design, VM selection
**AI Mentor:** Calibrate lab expectations to learner's hardware; suggest cloud-based alternatives (TryHackMe, Cyber Learn practicals) if hardware is limited

---

##### A1.C5.M3.L3 — CTFs and Practice Environments
- **Slug:** ctfs-and-practice-environments | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** SEC-15, SEC-16 | **Prereqs:** A1.C5.M3.L1
- **Interactive:** ScenarioSimulator (first CTF challenge walkthrough), QuizWidget
- **Animations:** ctf-challenge-categories, flag-capture-animation, leaderboard-reveal
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ | **Careers:** Penetration Tester, SOC Analyst | **Accessibility:** CTF simulator fully text-navigable; animation of flag capture has text confirmation

**Learning Objectives:**
1. Explain what a CTF (Capture The Flag) competition is and the main challenge categories
2. Identify three beginner-friendly CTF platforms (PicoCTF, CTFtime, TryHackMe)
3. Complete a walkthrough of a beginner-level CTF challenge (web, crypto, or forensics category)

**Skills Gained:** CTF awareness, challenge category recognition, first practical exploit experience (controlled)
**AI Mentor:** Celebrate completion of first CTF challenge; normalize that not solving challenges is part of learning

---

##### A1.C5.M3.L4 — Academy 1 Capstone Preparation
- **Slug:** academy-1-capstone-preparation | **Type:** diagnostic | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** SEC-01, SEC-02, SEC-03, SEC-05, SEC-08, SEC-11, SEC-12, SEC-15 | **Prereqs:** All prior A1 lessons
- **Interactive:** ScenarioSimulator (self-assessment quiz), ConceptFlashCards (all A1 concepts)
- **Animations:** knowledge-map-reveal (shows all concepts covered), path-forward-animation
- **Practical:** simulation | **Assessment:** quiz-and-capstone | **Reflection:** transfer
- **Certs:** ITF+, Security+ Domain 1 & 5 | **Careers:** All roles | **Accessibility:** Self-assessment keyboard-navigable; knowledge map has text alternative

**Learning Objectives:**
1. Self-assess competency across all five Academy 1 courses
2. Identify 2–3 concepts requiring review before the capstone
3. Confirm readiness for the Academy 1 capstone assessment

**Skills Gained:** metacognitive self-assessment, knowledge gap identification, capstone readiness
**AI Mentor:** Run a backward-traversal diagnostic per KG AI Mentor operations; surface specific lessons to revisit based on quiz performance

---

### Course A1.C5 — Capstone

**Title:** Investigate and Report: The Breach at Meridian Health (Full)
**Type:** quiz-and-capstone | **Duration:** 90 min | **Difficulty:** beginner

**Scenario:** Learner receives a multi-page case file for a fictional healthcare data breach at Meridian Health:
- IT profile: Windows workstations, SQL Server, Office 365, no MDA/SIEM
- Timeline: phishing email → credential theft → lateral movement → data exfiltration
- Indicators: 3 suspicious email headers, unusual login times, large outbound transfer

**Deliverables:**
1. Threat and attacker classification (who, what motivation)
2. Kill chain mapping (all 7 phases mapped to timeline events)
3. CIA triad impact assessment (which properties violated, in what order)
4. Risk register with 4 identified risks (scored, with responses and owners)
5. Executive summary (1 paragraph, business language, no jargon)
6. Top 3 defense-in-depth recommendations with control type classification

**Assessment Criteria:** Technical accuracy (60%), communication quality (20%), completeness (20%)
**Mastery Gate:** ≥80% overall score to unlock Academy 2 / 3 / 4 / 5

---

### Academy 1 — Knowledge Graph Validation

**Concepts Covered (D1 subset + D6 L1–L2):**
- CB-01, CB-02, CB-03, CB-04, CB-06, CB-07, CB-08, CB-09 (Computer Basics essentials)
- NET-01, NET-02, NET-10 (Networking intro only — full treatment in Academy 2)
- WEB-01 (Web technologies intro — full treatment later)
- OS-L01, OS-W01 (OS intro only — full treatment in Academies 3 and 4)
- SEC-01 through SEC-20 (Cybersecurity Fundamentals, L1 and L2)
- GRC-01 (Legal framework intro — full treatment in future GRC academy)

**Dependency Validation:**
- No concept appears without its prerequisite in the lesson sequence
- NET-01 introduced in A1.C2.M3 only after CB-01–CB-06 are established
- SEC concepts reference CB concepts taught in C2 — course ordering enforces this
- OS-L01 and OS-W01 are surface-level only; no OS-Lxx depth without Academy 3

**Orphan Check:** All CB and SEC concepts introduced in A1 are referenced at least once in a practical or assessment. No orphan concepts.

**Circular Dependency Check:** A1 has no dependencies on A2–A5. All intra-A1 lesson prerequisites are linear within each module. Verified clean.

---

### Academy 1 — Certification Mapping

| Certification | Coverage in A1 | Domain % Covered |
|---------------|---------------|-----------------|
| CompTIA ITF+  | Domains 1, 2, 3, 5 | ~80% |
| CompTIA A+ Core 2 | Domain 1 partial | ~20% |
| CompTIA Security+ | Domains 1, 2, 5 (conceptual) | ~35% |
| (ISC)² CC | Domains 1, 2, 5 partial | ~30% |
| EC-Council CEH | Domain 1 (ethics/legal) | ~15% |

---

### Academy 1 — Career Path Mapping

| Career Path | A1 Contributions |
|-------------|-----------------|
| SOC Analyst | Threat taxonomy, kill chain, CIA triad, log-level thinking |
| Blue Team | Defense in depth, security controls, STRIDE, risk register |
| Penetration Tester | Adversarial mindset, kill chain, authorized testing concepts |
| Risk/GRC Analyst | Risk assessment, risk register, compliance frameworks |
| Security Researcher | Responsible disclosure, CVE system, ethical research |
| IT Support → Security | OS overview, computer fundamentals, security mindset |
| CISO / Manager | Risk communication, metrics, compliance, career context |

---

### Academy 1 — Assessment Strategy

**Per-lesson:** Quiz unlocks after practical completion. Mastery gate: ≥80%.
**Per-module:** No separate module quiz — lesson quizzes collectively assess module objectives.
**Per-course:** Course capstone synthesizes all module objectives. ≥80% to proceed.
**Academy capstone:** A1.C5 capstone is the Academy 1 gate. ≥80% unlocks all specialization academies.
**AI Mentor diagnostics:** Run after every failed attempt. Backward traversal to identify missing prerequisites. Offer targeted review before retry.
**KQI-E3 Target:** First-attempt pass rate target 50–70% (desirable difficulty). Calibrate question complexity accordingly.

---

### Academy 1 — Implementation Readiness

**Priority 1 — Lessons (implement first):**
A1.C1.M1.L1, A1.C1.M2.L2 (Kill Chain), A1.C4.M1.L1–L3 (CIA Triad), A1.C3.M1.L1 (Malware)

**Priority 2 — Interactive Components:**
AttackTimelineViewer (needed by A1.C1.M2), ScenarioSimulator (needed by A1.C3.M2, A1.C4.M3), QuizWidget (universal)

**Priority 3 — Animations:**
kill-chain-phase-walkthrough, ransomware-encryption-spread, cia-triad-reveal, phishing-email-anatomy

**Priority 4 — Practicals:**
A1.C3.M1 phishing identifier, A1.C4.M3.L2 STRIDE modeler, A1.C5.M3.L3 CTF walkthrough

**Priority 5 — Capstones:**
Meridian Health capstone scenario and assessment rubric

<!-- APPEND_ACADEMY_2 -->
