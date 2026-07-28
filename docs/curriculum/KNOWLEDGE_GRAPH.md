# CYBER LEARN — KNOWLEDGE GRAPH
## The Learning Dependency Engine

> *This document is the authoritative curriculum architecture for Cyber Learn. It governs lesson sequencing, prerequisite enforcement, learning path design, AI Mentor adaptive logic, and search/recommendation behavior. All decisions comply with the Cyber Learn Constitution (Version 1.1).*

**Document Type:** Curriculum Architecture  
**Audience:** Curriculum Architects, AI Engineers, Product Team, Content Authors  
**Status:** Governing — all lesson sequencing must comply with this graph  
**Last Updated:** 2026  
**Review Cycle:** Annual, or on addition of a new Academy

---

## TABLE OF CONTENTS

1. [Design Principles](#part-1-design-principles)
2. [Foundational Knowledge Domains](#part-2-foundational-knowledge-domains)
3. [Dependency Graph](#part-3-dependency-graph)
4. [Concept Map](#part-4-concept-map)
5. [Learning Paths](#part-5-learning-paths)
6. [Prerequisite Matrix](#part-6-prerequisite-matrix)
7. [Difficulty Curve](#part-7-difficulty-curve)
8. [Spiral Learning](#part-8-spiral-learning)
9. [Cross-Discipline Connections](#part-9-cross-discipline-connections)
10. [Knowledge Gaps](#part-10-knowledge-gaps)
11. [AI Mentor Integration](#part-11-ai-mentor-integration)
12. [Search & Recommendation Engine](#part-12-search--recommendation-engine)
13. [Implementation Readiness](#part-13-implementation-readiness)
14. [Self Review](#part-14-self-review)

---

# PART 1: DESIGN PRINCIPLES

## 1.1 Why Knowledge Graphs Improve Learning

A knowledge graph is not a curriculum table of contents. A table of contents is a list of what will be covered. A knowledge graph is a map of what each concept requires, enables, and connects to — and in what order those connections must be traversed.

The difference matters because human learning is not sequential in the way a table of contents implies. Knowledge is networked in the brain, not linear. When a learner encounters a new concept, the brain searches for existing schema to attach it to. If no attachment point exists — because the prerequisite concepts were never taught — the new concept either fails to stick, or it is stored as isolated trivia disconnected from actionable understanding.

A knowledge graph solves this by making dependency relationships explicit and enforceable. When a lesson in the graph specifies that it requires concept X as a prerequisite, the platform can enforce that the learner has encountered concept X before unlocking the lesson. When the AI Mentor detects that a learner is struggling with concept Y, it can traverse the graph backward to identify which prerequisite concepts may be weak, and recommend targeted review rather than generic "try again" advice.

The knowledge graph serves five purposes in Cyber Learn:

**1. Sequencing:** Guarantees that no learner encounters a concept before the concepts it depends on.

**2. Unlocking:** Provides the logic that determines when a lesson or learning path becomes available to a learner. Completion of prerequisite concepts unlocks dependent concepts.

**3. Adaptive support:** Gives the AI Mentor a map to navigate when a learner struggles. The AI Mentor can say "Your difficulty with SQL injection suggests you may not be solid on how HTTP requests work — here's a review."

**4. Recommendation:** Powers "what should I learn next" recommendations that are educationally grounded, not based on popularity or marketing.

**5. Gap detection:** Identifies when a learner has skipped forward in the graph (because they came with prior experience) and has holes that will cause later difficulty.

## 1.2 Progressive Disclosure

**Principle:** The learner sees only what they are ready to understand. Concepts are revealed in the order in which they can be genuinely comprehended, not in the order they appear in a textbook index.

**The problem it solves:** A beginner who encounters the phrase "RSA-2048 asymmetric key exchange with forward secrecy" immediately after their first lesson on what a computer is will disengage. Not because they are not intelligent, but because they have no cognitive framework on which to hang those words. The phrase is noise, not signal.

**How Cyber Learn applies it:**

The curriculum architecture is organized in layers of disclosure. At the beginner level, networking is disclosed as: "Computers talk to each other by sending packets across cables and wireless signals." At the intermediate level: "Packets are structured according to the TCP/IP protocol stack, which has four layers." At the advanced level: "TCP's three-way handshake is stateful — the SYN, SYN-ACK, ACK sequence creates a session, and that statefulness is what TCP reset attacks and SYN flood attacks exploit." At the expert level: "The TIME_WAIT state in TCP connection teardown creates a subtle window for injection attacks in specific implementation contexts."

The same concept — how computers communicate — is disclosed progressively. Each disclosure is complete and accurate at its level. None of them are wrong; they are refined.

**Implementation rule:** Every concept in the Knowledge Graph is assigned a disclosure level (1–4). Lessons at level 1 may reference level 1 concepts from any domain. Lessons at level 2 may reference level 1 and level 2 concepts. A level 2 lesson that introduces a level 3 concept requires either a forward reference tooltip (see Section 10.8 of the Constitution) or a curriculum architecture review.

## 1.3 Scaffolding

**Principle:** The learner is never asked to perform a cognitive task without the supporting structure needed to succeed at it. Scaffolding is reduced gradually as competence grows. Scaffolding is never removed all at once.

**The problem it solves:** Presenting a complex task to an underprepared learner does not teach independence — it teaches helplessness. The learner concludes that the task is beyond them, rather than recognizing that they were set up to fail.

**How Cyber Learn applies it:**

The Knowledge Graph encodes scaffolding requirements at two levels:

*Domain-level scaffolding:* Domains that appear earlier in the graph (Computer Basics, Networking) provide the cognitive scaffolding for later domains (Network Security, Cloud Security). A learner cannot understand network segmentation as a security control without understanding what a VLAN is. The graph enforces this.

*Lesson-level scaffolding:* Within each lesson, the sequence moves from maximum scaffolding (concept explanation with worked example → guided simulation → guided practical with all steps provided) to minimum scaffolding (challenge with no guidance, only hints on request). This is the Constitution's three-level hint system (Constitution, Guardrail S2) applied structurally.

**Implementation rule:** Every lesson in the graph is tagged with a scaffolding level for its practical (fully-guided, semi-guided, independent, challenge-only). The lesson's position in the domain's sequence determines which scaffolding level is appropriate.

## 1.4 Cognitive Load Management

**Principle:** The number of new concepts introduced in any lesson or section is limited to what working memory can hold and process simultaneously. When more concepts are needed, they are chunked, sequenced, and connected to prior knowledge before being combined.

**The science:** Sweller's Cognitive Load Theory (1988) establishes that working memory holds approximately 4±1 chunks of new information simultaneously. When instruction exceeds this capacity, learning stops and the learner enters cognitive overload — characterized by confusion, frustration, and the inability to retain any of the presented material.

**Three types of cognitive load:**
- **Intrinsic load:** The inherent complexity of the concept being learned. Cannot be reduced, but can be managed through chunking.
- **Extraneous load:** Complexity introduced by poor instruction design (confusing explanations, cluttered UI, unclear examples). Must be minimized.
- **Germane load:** Cognitive effort that produces learning (forming schemas, making connections). Must be maximized.

**How Cyber Learn applies it:**

The Knowledge Graph controls intrinsic load by limiting the number of new concepts introduced in any single lesson to three or fewer, and requiring that complex concepts be decomposed into simpler sub-concepts that are taught in sequence (Constitution, Guardrail C1).

Extraneous load is controlled through the platform's design system (Constitution, Parts 7–9) and content writing standards (Constitution, Part 10).

Germane load is maximized through reflection prompts, connection activities, and the requirement that every practical involves genuine problem-solving rather than procedure-following (Constitution, Section 6.1, Practical section).

**Implementation rule:** Every lesson node in the Knowledge Graph tracks its `concept_count` (number of new major concepts introduced). Lessons with `concept_count > 3` are flagged for curriculum review. Lessons with `concept_count = 1` at advanced levels are permitted and encouraged — depth over breadth.

## 1.5 Spiral Learning

**Principle:** Core concepts are not taught once and assumed retained. They are revisited at increasing levels of depth and complexity throughout the curriculum. Each revisitation adds nuance, expands scope, and reinforces prior understanding.

**The science:** Bruner's spiral curriculum (1960) argues that any subject can be taught in some intellectually honest form to any learner at any stage. As the learner matures, the same subject is revisited with greater sophistication. This produces concepts that are understood at multiple levels simultaneously — a richer and more durable knowledge structure than single-exposure learning.

**How Cyber Learn applies it:**

Networking is introduced as a foundational domain. It is revisited in Network Security, again in Cloud (as virtual networking), again in Incident Response (as network forensics), again in Offensive Security (as network reconnaissance and exploitation), and again in Threat Intelligence (as network-based IOC analysis). Each revisitation is not repetition — it is the same terrain viewed from a new elevation.

The Knowledge Graph formally tracks which concepts appear in multiple domains (see Part 8: Spiral Learning). Lessons that revisit a concept from a prior domain are marked with a `revisits` edge pointing to the earlier concept node.

**Implementation rule:** Constitution Guardrail R1 requires that core concepts appear in at least two subsequent lessons after their introduction. The Knowledge Graph makes this requirement measurable and verifiable — every concept node must have at least two outbound `revisited_in` edges in the final curriculum.

## 1.6 Retrieval Practice

**Principle:** Testing knowledge — forcing the brain to actively retrieve information — strengthens memory traces more than any amount of re-reading or re-watching. Retrieval practice should be frequent, low-stakes, and embedded throughout learning — not reserved for the end.

**The science:** Roediger & Karpicke (2006) demonstrated that students who studied material and then took a test retained 50% more of the content after a week than students who spent the same time re-studying. The act of retrieval, regardless of whether the answer is correct, strengthens the memory trace.

**How Cyber Learn applies it:**

The Knowledge Graph is the backbone of the platform's spaced retrieval system. When a learner completes a lesson on Concept A, the graph identifies which subsequent lessons revisit Concept A. Before those lessons teach their new content, they include a retrieval prompt: "Before we continue — can you recall the three steps in a TCP handshake?" This is not a quiz for a grade. It is a deliberate activation of the prior knowledge the current lesson will build upon.

The AI Mentor's personalization model uses the Knowledge Graph to track concept-level retrieval performance. Concepts the learner has not successfully retrieved in more than 14 days are flagged for a low-stakes review prompt (see Part 11).

**Implementation rule:** The Knowledge Graph's edge type `retrieval_prerequisite` marks concepts that must be retrieved (not merely acknowledged) before a lesson begins. Lessons with `retrieval_prerequisite` edges generate a short recall prompt at the beginning of the lesson.

## 1.7 Interleaving

**Principle:** Mixing different but related types of problems during practice produces better long-term retention and transfer than practicing one type of problem repeatedly until mastery before moving to the next.

**The science:** Rohrer & Taylor (2007) showed that interleaved practice produces worse immediate performance but dramatically better retention and transfer than blocked practice (practicing one skill type exhaustively before moving to the next). The difficulty of switching between problem types is itself a desirable difficulty (Bjork, 1994) that forces the learner to identify which solution strategy applies — a metacognitive skill that is central to real-world performance.

**How Cyber Learn applies it:**

Challenges within advanced modules present problems that draw on concepts from multiple lessons and domains simultaneously. A web application security challenge does not present five SQL injection problems in a row; it presents an application with multiple vulnerability types, requiring the learner to identify what kind of vulnerability they are looking at before determining how to exploit or remediate it.

The Knowledge Graph identifies `can_interleave_with` relationships between concepts that are appropriately mixed in challenge environments. Curriculum architects use these relationships to design multi-concept challenges.

**Implementation rule:** Every Module in the Knowledge Graph must include at least one interleaved challenge that draws on concepts from at least two different lessons in the module. Capstone projects interleave concepts across the entire course.

## 1.8 Mastery Learning

**Principle:** A learner does not advance until they have demonstrated genuine competence at the current level. Time is the variable, not learning. Every learner achieves mastery; some require more time and support to do so.

**The science:** Bloom (1968) established that given adequate time and appropriate instruction, 95% of learners can achieve what only the top 20% achieve under conventional fixed-time instruction. Mastery learning does not sort learners by ability — it ensures that all learners reach the threshold before proceeding.

**How Cyber Learn applies it:**

The Knowledge Graph encodes mastery thresholds at every concept node. The Constitution (Section 12.5) specifies an 80% quiz threshold and full practical completion as the minimum mastery requirement. Learners who do not meet the threshold receive targeted remediation — not a generic "try again," but a diagnosis based on which specific questions they missed, mapped to the Knowledge Graph to identify which concept is weak.

**Implementation rule:** Every concept node in the Knowledge Graph has a `mastery_threshold` property (quiz score percentage and practical completion boolean). The lesson unlock logic uses these thresholds. A learner with 75% on a concept's quiz cannot unlock the concept's dependent nodes until they retry and reach 80%.

---

# PART 2: FOUNDATIONAL KNOWLEDGE DOMAINS

The Cyber Learn curriculum is organized into 19 knowledge domains. These domains are not equal in size, depth, or independence — they form a directed dependency graph. The visual representation below is simplified; full dependency detail is in Part 3.

## Domain Tier Map

```
TIER 0 — PRE-SECURITY FOUNDATIONS
(Must be established before any security domain)

  [D1] Computer Basics
       ↓
  [D2] Operating Systems ←→ [D3] Networking ←→ [D4] Programming
                                    ↓
                              [D5] Web Technologies

TIER 1 — SECURITY FUNDAMENTALS
(Require all Tier 0 domains)

  [D6] Cybersecurity Fundamentals
       ↓
  [D7] Cryptography ←→ [D8] Identity & Access Management

TIER 2 — CORE SECURITY DOMAINS
(Require Tier 0 and Tier 1)

  [D9] Defensive Security
  [D10] Offensive Security
  [D11] Cloud Security

TIER 3 — THREAT OPERATIONS
(Require Tier 1 and selected Tier 2)

  [D12] Threat Intelligence
  [D13] Incident Response
  [D14] Digital Forensics

TIER 4 — ADVANCED SPECIALIZATIONS
(Require Tier 2 and selected Tier 3)

  [D15] Malware Analysis
  [D16] Reverse Engineering
  [D17] AI Security
  [D18] DevSecOps
  [D19] Governance, Risk & Compliance
```

---

## D1: Computer Basics

**Why this domain exists:** Every concept in cybersecurity ultimately operates on a physical or virtual machine. An attacker exploiting a buffer overflow is abusing how memory is allocated in a CPU. A defender analyzing logs is reading records generated by the operating system's I/O subsystem. Without a mental model of how computers work, security knowledge is a set of techniques with no underlying mechanics.

**What it covers:** Hardware architecture (CPU, memory, storage, I/O), binary and hexadecimal number systems, how processes work, virtualization, and the fundamental concept of programs executing as sequences of instructions on hardware.

**Who needs it:** Every learner on every path. No exceptions.

**Prerequisite for:** All other domains.

**Learner entry point:** No prerequisites. This is where all paths begin.

**Cybersecurity relevance:** Buffer overflows exploit memory layout. Rootkits hide in the OS kernel. Firmware attacks persist below the OS. Understanding hardware is the floor on which all security knowledge rests.

---

## D2: Operating Systems

**Why this domain exists:** The operating system is the primary attack surface for most threats. Most persistence mechanisms (malware, backdoors, scheduled tasks, services) live at the OS layer. Most defensive tools (EDR, host-based IDS, event logging) operate at the OS layer. A security professional who does not understand the OS is working blind.

**What it covers:** Two parallel tracks:
- **Windows track:** File system (NTFS), registry, Active Directory, user account management, Windows services, PowerShell, event logging, UAC, Windows Defender, authentication (NTLM, Kerberos)
- **Linux track:** File system hierarchy, permissions (rwx, SUID/SGID), users and groups, processes, shell scripting, SSH, package management, logging (syslog, journald), iptables/nftables

**Who needs it:** All learners. Windows-focused learners (SOC Analyst, DFIR) need both tracks; Linux-focused learners (Penetration Tester, Cloud Security) emphasize the Linux track.

**Prerequisite for:** All Tier 1, Tier 2, Tier 3, and Tier 4 domains.

**Cybersecurity relevance:** Most attacks target OS-level mechanisms (privilege escalation, credential theft, persistence). Defenders respond at the OS level (process analysis, log analysis, hardening).

---

## D3: Networking

**Why this domain exists:** Networks are the medium through which all remote attacks are delivered and all remote defenses are applied. A security professional who cannot read a packet capture, understand routing, or configure a firewall rule is unable to perform the core tasks of most security roles.

**What it covers:** OSI model, TCP/IP stack, IP addressing and subnetting, MAC addresses and ARP, DNS, DHCP, HTTP/HTTPS, routing and switching, firewalls, VPNs, wireless networking, packet analysis (Wireshark/tcpdump), Nmap fundamentals.

**Who needs it:** All learners. The depth required varies by role — a SOC analyst needs deep familiarity; a GRC analyst needs conceptual understanding.

**Prerequisite for:** All Tier 1 domains, Network Security, Web Technologies, Cloud, Incident Response, Offensive Security, Digital Forensics, Threat Intelligence.

**Cybersecurity relevance:** Network reconnaissance is the first phase of every penetration test and most real attacks. Network traffic analysis is the primary evidence source in most incident investigations. Network segmentation is a fundamental defensive control.

---

## D4: Programming

**Why this domain exists:** Programming is the difference between a security professional who can use tools and one who can understand, modify, and build them. At the beginner level, programming enables reading exploit code, writing automation scripts, and understanding what vulnerable code looks like. At the advanced level, it enables exploit development, custom tooling, and vulnerability research.

**What it covers:**
- **Python fundamentals:** Variables, data types, control flow, functions, modules, file I/O, error handling
- **Python for security:** Socket programming, HTTP requests, parsing output, writing simple scanners and scripts
- **Bash scripting:** Loops, conditionals, pipes, redirection, cron, common tools (grep, awk, sed, cut)
- **SQL fundamentals:** SELECT, JOIN, INSERT, UPDATE, WHERE, subqueries
- **Web basics:** HTML structure, JavaScript fundamentals (for understanding XSS), HTTP requests from code
- **Regular expressions:** Pattern matching, extraction, substitution

**Who needs it:** Most learners need Python and Bash at minimum. Penetration testers, malware analysts, and reverse engineers need deeper programming knowledge (C, assembly basics).

**Prerequisite for:** Web Technologies (JavaScript/HTML understanding), Offensive Security (scripting, exploit writing), DevSecOps (code review, SAST), Malware Analysis (reading malicious code), Reverse Engineering (understanding compiled code).

**Cybersecurity relevance:** SQL injection requires understanding SQL. XSS requires understanding JavaScript. Exploit development requires C and assembly. Automation of security tasks requires Python. Programming is not optional for serious security work.

---

## D5: Web Technologies

**Why this domain exists:** The web is the primary attack surface of the modern internet. Web application vulnerabilities (OWASP Top 10) account for the majority of publicly disclosed breaches. Every security role that involves endpoints, applications, or APIs requires web technology literacy.

**What it covers:** HTTP protocol deep dive (methods, status codes, headers, cookies, sessions), TLS/SSL handshake, web application architecture (frontend/backend/database tiers), REST APIs, authentication mechanisms (Basic Auth, Bearer tokens, JWT, OAuth2, OpenID Connect), browser security model (same-origin policy, CORS, CSP), web servers (Nginx, Apache concepts), CDN and caching.

**Who needs it:** Application Security, Penetration Testers (web path), SOC Analysts (analyzing web logs), Cloud Security Engineers, DevSecOps, Incident Responders.

**Prerequisite for:** Web Application Security (core), API Security, Cloud Security (IAM/OAuth), AI Security (LLM APIs).

**Cybersecurity relevance:** SQL injection, XSS, CSRF, SSRF, authentication bypasses, OAuth misconfigurations — all are web vulnerabilities. Understanding HTTP is the minimum literacy requirement for application security work.

---

## D6: Cybersecurity Fundamentals

**Why this domain exists:** Before learning any specific technique or tool, learners must develop the security mindset — the habit of thinking about systems in terms of trust boundaries, attack surfaces, and threat models. Without this foundation, security knowledge is a collection of disconnected facts rather than an integrated way of thinking.

**What it covers:** CIA Triad, AAA (Authentication, Authorization, Accounting), threat modeling, attack surface analysis, defense in depth, zero trust principles, the distinction between vulnerability / threat / risk / exploit, security controls taxonomy (preventive, detective, corrective, deterrent, compensating), security policies, the attacker's mindset.

**Who needs it:** All learners. This is the intellectual foundation for every security domain.

**Prerequisite for:** All Tier 2, Tier 3, and Tier 4 domains.

**Cybersecurity relevance:** A learner who can threat-model a system before attacking it is a penetration tester. A learner who can threat-model a system before defending it is a security architect. The mindset is the skill — the tools are just its expression.

---

## D7: Cryptography

**Why this domain exists:** Cryptography is the mathematical foundation of security. Authentication, secure communications, data integrity, digital signatures, and certificate trust chains all rest on cryptographic primitives. A security professional who does not understand cryptography cannot evaluate whether a security control is actually secure.

**What it covers:** Symmetric encryption (AES, stream ciphers), asymmetric encryption (RSA, ECC), hash functions (SHA-2, SHA-3, MD5 weaknesses), message authentication codes (HMAC), digital signatures, Public Key Infrastructure (PKI), TLS/SSL in depth, key exchange (Diffie-Hellman, ECDH), password hashing (bcrypt, Argon2, PBKDF2 — and why MD5/SHA1 are wrong for passwords), random number generation in security contexts.

**Who needs it:** All paths at varying depth. GRC analysts need conceptual understanding. Developers need implementation knowledge. Penetration testers need attack knowledge (weak ciphers, certificate issues). Malware analysts and reverse engineers need deep cryptographic understanding to analyze obfuscation.

**Prerequisite for:** Identity & IAM (TLS, certificates, Kerberos internals), Cloud Security (KMS, certificate management), DevSecOps (secrets management, API security), Web Application Security (TLS misconfigurations, JWT attacks).

**Cybersecurity relevance:** TLS misconfiguration, expired certificates, weak cipher suites, JWT none algorithm attacks, broken PRNG — all are cryptographic failures with direct security impact.

---

## D8: Identity & Access Management (IAM)

**Why this domain exists:** Identity is the new perimeter. In a world of cloud services, remote work, and zero trust, the question "who are you and what are you authorized to do?" is the central question of security. Misconfigurations in identity systems are among the most impactful and most common sources of real-world breaches.

**What it covers:** Authentication factors (knowledge, possession, inherence), password security (policies, storage, attacks), multi-factor authentication (TOTP, FIDO2/WebAuthn, push), Single Sign-On (SSO), SAML 2.0, OAuth2 and OpenID Connect, Kerberos, LDAP and Active Directory, Privileged Access Management (PAM), zero trust identity, federation and trust relationships.

**Who needs it:** All paths. Identity misconfigurations affect every environment. SOC analysts investigate identity-based attacks. Penetration testers abuse identity systems. Cloud engineers configure IAM policies. GRC professionals audit identity governance.

**Prerequisite for:** Cloud Security (cloud IAM), Offensive Security (credential attacks, Active Directory exploitation), Defensive Security (identity monitoring), Incident Response (credential theft investigation).

**Cybersecurity relevance:** Credential theft, pass-the-hash, pass-the-ticket, Kerberoasting, OAuth token theft, SAML assertion forgery — all are identity attacks that account for a majority of real-world breaches.

---

## D9: Defensive Security

**Why this domain exists:** Defenders need a systematic toolkit — not just awareness of threats, but the tools, processes, and mental models for detecting, responding to, and recovering from attacks. This domain transforms security awareness into security operations capability.

**What it covers:** Network monitoring (IDS/IPS: Snort, Suricata), SIEM platforms (Splunk, Microsoft Sentinel, Elastic Security), EDR solutions (CrowdStrike Falcon, Carbon Black, Microsoft Defender for Endpoint), log management and analysis, vulnerability management (Nessus, OpenVAS), patch management, security hardening (CIS Benchmarks, DISA STIGs), data loss prevention, email security (SPF, DKIM, DMARC, anti-phishing), SOC operations and alert triage.

**Who needs it:** SOC Analysts (core domain), Incident Responders (primary toolset), Security Engineers (build and tune tools), Threat Hunters (query and hunt in SIEM/EDR).

**Prerequisite for:** Incident Response, Threat Hunting, Threat Intelligence (contextualizing defensive alerts).

**Cybersecurity relevance:** Detection is the primary activity of security operations. A defender who cannot write a Splunk query, tune an EDR alert, or read IDS output cannot do the work.

---

## D10: Offensive Security

**Why this domain exists:** Defenders who understand how attackers think and what tools they use are dramatically more effective than those who do not. Offensive security knowledge is not exclusively for penetration testers — it is the adversarial context that makes defensive decisions meaningful.

**What it covers:** Penetration testing methodology (PTES, OWASP Testing Guide), reconnaissance (passive: OSINT; active: scanning, enumeration), exploitation frameworks (Metasploit), web application testing (Burp Suite), network attacks (ARP poisoning, MITM), password attacks (cracking with Hashcat, spraying, stuffing), post-exploitation (privilege escalation, lateral movement, persistence), social engineering (phishing, pretexting), reporting and documentation, ethical and legal scope.

**Who needs it:** Penetration Testers (core domain), Red Team members, SOC Analysts (to understand what they are detecting), Application Security Engineers (to think like an attacker).

**Prerequisite for:** Advanced Red Teaming, Malware Analysis (understanding attacker tooling), Threat Hunting (knowing what attacker behaviors look like at the host and network level).

**Cybersecurity relevance:** Every defensive decision is a response to an offensive capability. Understanding offensive techniques is the only way to make rational defensive investments.

---

## D11: Cloud Security

**Why this domain exists:** Cloud infrastructure now hosts the majority of enterprise workloads, and cloud-specific attack surfaces (misconfigured S3 buckets, overpermissioned IAM roles, exposed metadata endpoints) account for a large and growing share of real-world breaches. Cloud security is not "regular security in the cloud" — it requires understanding the shared responsibility model and cloud-native attack techniques.

**What it covers:** Cloud service models (IaaS, PaaS, SaaS, FaaS), major providers (AWS, Azure, GCP) overview, shared responsibility model, cloud IAM (roles, policies, service accounts, least privilege), cloud storage security, virtual networks (VPCs, security groups, NACLs), container security (Docker, Kubernetes), serverless security, cloud logging and monitoring (CloudTrail, Azure Monitor, GCP Audit Logs), cloud misconfiguration attacks, CSPM tools, secrets management in cloud (KMS, Vault).

**Who needs it:** Cloud Security Engineers (core domain), DevSecOps engineers, Penetration Testers (cloud assessment path), Incident Responders (cloud IR).

**Prerequisite for:** DevSecOps (cloud-native CI/CD security), AI Security (AI/ML infrastructure in cloud).

**Cybersecurity relevance:** Capital One breach (misconfigured WAF + SSRF → AWS metadata endpoint). SolarWinds supply chain compromise used cloud infrastructure. Tesla cryptomining via exposed Kubernetes dashboard. Cloud misconfiguration is the defining vulnerability class of the 2020s.

---

## D12: Threat Intelligence

**Why this domain exists:** Knowing that attacks happen is not actionable. Knowing who attacks, how they operate, which techniques they use, and what indicators to look for is actionable. Threat intelligence transforms abstract risk into specific, prioritized defensive action.

**What it covers:** Threat intelligence lifecycle (direction, collection, processing, analysis, dissemination, feedback), OSINT techniques, MITRE ATT&CK framework (tactics, techniques, procedures), threat actor profiling (nation-state APTs, cybercriminal groups, insiders), IOC types (file hashes, IPs, domains, registry keys, behavioral patterns), kill chain model, diamond model, threat feeds (commercial and open-source), STIX/TAXII, ISAC participation.

**Who needs it:** Threat Intelligence Analysts (core domain), Threat Hunters (to build hunt hypotheses), SOC Analysts Tier 2+ (to contextualize alerts), Incident Responders (to understand attacker TTPs during investigation).

**Prerequisite for:** Threat Hunting (advanced), Advanced Incident Response.

**Cybersecurity relevance:** Attribution, prioritization, and proactive defense all depend on threat intelligence. A SOC analyst who can map an alert to a specific APT's known TTPs can make a much faster and more accurate escalation decision than one who can only see the raw alert.

---

## D13: Incident Response

**Why this domain exists:** Breaches are not prevented 100% of the time. When prevention fails, the speed and quality of response determines the difference between a contained incident and a catastrophic breach. IR is the organized, systematic approach to containing, eradicating, and recovering from security incidents.

**What it covers:** PICERL phases (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned), alert triage and escalation, evidence collection and chain of custody, containment strategies, communication protocols (internal, external, regulatory), IR playbooks, root cause analysis, post-incident reporting, regulatory notification requirements.

**Who needs it:** Incident Responders (core domain), SOC Analysts (alert triage → escalation is the entry point to IR), DFIR specialists, Security Engineers (building and maintaining detection capabilities).

**Prerequisite for:** Digital Forensics (forensics is a component of IR), advanced Threat Intelligence application.

**Cybersecurity relevance:** Mean time to detect (MTTD) and mean time to respond (MTTR) are the primary metrics by which security operations are judged. IR capability is what those metrics measure.

---

## D14: Digital Forensics

**Why this domain exists:** Evidence is the foundation of incident investigation and legal proceedings. Digital forensics is the discipline of collecting, preserving, and analyzing digital evidence in a way that maintains its integrity and admissibility. Without forensic discipline, investigations produce unreliable conclusions and evidence is inadmissible in legal contexts.

**What it covers:** Forensic principles (chain of custody, write protection, hash verification, documentation), disk imaging (dd, FTK Imager, dcfldd), file system forensics (MFT, deleted file recovery, timestamps), memory forensics (Volatility framework), network forensics (pcap analysis), log analysis (Windows Event Logs, syslog), browser and email forensics, timeline analysis (Plaso, log2timeline), mobile forensics basics, legal considerations.

**Who needs it:** DFIR specialists (core domain), Incident Responders (forensic evidence collection is part of IR), Law enforcement and legal teams (admissibility).

**Prerequisite for:** Advanced Malware Analysis (extracting malware from forensic images), threat attribution work.

**Cybersecurity relevance:** Without forensics, IR produces a remediation but not an understanding. Understanding what happened, how it happened, and what the attacker accessed is only possible through forensic analysis.

---

## D15: Malware Analysis

**Why this domain exists:** Malware is the primary delivery mechanism for most cyberattacks. Understanding how malware works — how it persists, communicates, and evades detection — is essential for building effective defenses and for investigating incidents where malware is involved. Malware analysis turns an unknown threat into a characterized and defended-against threat.

**What it covers:** Malware taxonomy (virus, worm, trojan, RAT, ransomware, rootkit, spyware, botnet, dropper, loader), malware delivery methods, persistence mechanisms, C2 infrastructure (beaconing, domain generation algorithms, fast flux), anti-analysis techniques (obfuscation, packing, sandbox detection, anti-debugging), static analysis (file properties, strings, PE analysis, VirusTotal, YARA rules), dynamic analysis (sandboxing, Cuckoo, behavioral logging, network traffic capture).

**Who needs it:** Malware Analysts (core domain), DFIR specialists (malware is usually present in major incidents), Threat Intelligence analysts (characterizing threat actor tooling), advanced SOC Tier 2+ (understanding alerts generated by malware behavior).

**Prerequisite for:** Reverse Engineering (malware RE is the advanced form of malware analysis).

**Cybersecurity relevance:** Every ransomware attack, APT campaign, and supply chain compromise uses malware. The ability to characterize malware determines how quickly an organization can defend against it.

---

## D16: Reverse Engineering

**Why this domain exists:** Reverse engineering is the deepest form of technical security analysis. When the source code is not available — which is true of most malware, most firmware, and many proprietary applications — RE is the only way to understand exactly what a program does. RE practitioners find vulnerabilities in binary code, analyze malware at the assembly level, and recover protected algorithms.

**What it covers:** x86/x64 assembly language, calling conventions, stack and heap mechanics, executable formats (PE on Windows, ELF on Linux), disassembly tools (IDA Pro, Ghidra, Binary Ninja), dynamic analysis and debugging (x64dbg, GDB, pwndbg), anti-debugging and anti-analysis techniques, binary patching, binary exploitation (stack buffer overflow, heap exploitation, format string vulnerabilities, ROP chains), vulnerability research methodology.

**Who needs it:** Malware Analysts (advanced), Vulnerability Researchers, CTF competitors, Red Team operators (exploit development), specialized DFIR practitioners.

**Prerequisite for:** Advanced vulnerability research, exploit development, firmware analysis.

**Cybersecurity relevance:** Stuxnet was characterized through RE. The NSA EternalBlue exploit was reverse engineered by attackers from a Microsoft patch. Firmware vulnerabilities in routers and IoT devices are only discoverable through RE. This is the top of the technical skill stack in offensive security.

---

## D17: AI Security

**Why this domain exists:** AI systems are increasingly deployed in security-critical contexts (fraud detection, access control, threat detection) and are simultaneously becoming attack targets and attack enablers. Security professionals must understand both how AI can be attacked and how AI can be used to attack.

**What it covers:** AI/ML fundamentals for security practitioners (supervised/unsupervised/reinforcement learning at a conceptual level), adversarial machine learning (evasion attacks, poisoning attacks, model extraction, model inversion), AI in offensive security (AI-assisted phishing, deepfakes, automated reconnaissance), AI in defensive security (anomaly detection, UEBA, AI-assisted threat hunting), LLM security (prompt injection, jailbreaking, training data extraction, insecure output handling), AI governance and ethics in security contexts.

**Who needs it:** AI Security specialists (emerging role), Security Engineers building AI-powered tools, Penetration Testers (AI system assessment), Governance professionals (AI risk assessment).

**Prerequisite for:** Advanced AI red teaming, AI system security architecture.

**Cybersecurity relevance:** ChatGPT-assisted phishing campaigns emerged immediately upon GPT-4 release. Adversarial examples fool image recognition systems used in security cameras. LLM prompt injection can cause AI agents to exfiltrate data. AI security is the frontier domain of the 2020s.

---

## D18: DevSecOps

**Why this domain exists:** Security that is applied after software is built is expensive, incomplete, and frequently overridden by delivery pressure. DevSecOps integrates security into every stage of the software development lifecycle — design, development, testing, deployment, and operations — making it a continuous activity rather than a gate at the end of the pipeline.

**What it covers:** Secure SDLC, threat modeling in software design (STRIDE, DREAD, PASTA), static application security testing (SAST: Semgrep, CodeQL, SonarQube), dynamic application security testing (DAST: OWASP ZAP, Burp Suite Enterprise), software composition analysis (SCA: Snyk, Dependabot), container security scanning (Trivy, Grype), infrastructure as code security (Checkov, tfsec), CI/CD pipeline security, secrets management (HashiCorp Vault, AWS Secrets Manager), security champions programs.

**Who needs it:** Application Security Engineers (core domain), Security Engineers working with development teams, Cloud Security Engineers (IaC security), Developers who are security champions.

**Prerequisite for:** Advanced cloud-native security, software supply chain security.

**Cybersecurity relevance:** The SolarWinds attack was a supply chain compromise delivered through the build pipeline. Log4Shell affected virtually every Java application. DevSecOps is the systematic answer to software supply chain risk.

---

## D19: Governance, Risk & Compliance (GRC)

**Why this domain exists:** Technical security controls exist within a business context. Risk decisions — what to protect, how much to invest, which risks to accept — require a systematic framework. Regulatory requirements (GDPR, HIPAA, PCI DSS, SOX) impose legal obligations. GRC is the discipline that connects technical security to business decision-making.

**What it covers:** Risk management frameworks (NIST CSF, ISO 27001, COBIT, NIST RMF), compliance requirements by vertical (GDPR for all organizations handling EU data, HIPAA for healthcare, PCI DSS for payment processing, SOX for public companies), security policy lifecycle (development, approval, enforcement, exception management), security auditing, business continuity and disaster recovery (BCP/DR), vendor risk management, data classification, security awareness training programs, regulatory reporting.

**Who needs it:** GRC Analysts (core domain), CISOs and Security Leaders, Healthcare security professionals (HIPAA), Financial sector professionals (SOX, PCI DSS), Privacy professionals (GDPR), Security Architects (framework application).

**Cybersecurity relevance:** Most organizations face regulatory fines larger than the cost of the security incidents that triggered them. GRC professionals prevent breaches through risk management and avoid regulatory consequences through compliance.

---

# PART 3: DEPENDENCY GRAPH

## 3.1 How to Read This Graph

Each domain entry below specifies:
- **Requires:** Domains that must be substantially complete before this domain begins
- **Core Concepts:** The essential concepts that define this domain
- **Enables:** Domains and concepts that become accessible after this domain is mastered
- **Advanced Concepts:** Concepts within this domain that require the core concepts as prerequisites
- **Cross-Domain Connections:** Specific relationships to other domains (detailed in Part 9)

The notation `D[n]` refers to the numbered domains in Part 2.

---

## D1 → Computer Basics

```
Requires:    None (entry point)

Core Concepts:
  ├── Binary and hexadecimal number systems
  ├── CPU architecture (registers, ALU, fetch-decode-execute)
  ├── Memory hierarchy (registers → cache → RAM → storage)
  ├── Process vs. thread model
  ├── System calls (user space ↔ kernel space boundary)
  ├── File systems (FAT, NTFS, ext4 — conceptual)
  └── Virtualization (Type 1 / Type 2 hypervisors)

Enables:
  ├── D2: Operating Systems (OS manages all of the above)
  ├── D3: Networking (network interface is a hardware component)
  ├── D7: Cryptography (hardware RNG, TPM)
  └── D16: Reverse Engineering (assembly runs on CPU)

Advanced Concepts (require core concepts first):
  ├── Memory segmentation (stack, heap, data, text segments)
  ├── Virtual memory and paging (MMU, page tables, TLB)
  ├── Hardware security features (NX/XD bit, SMEP, SMAP, TPM, Secure Boot)
  ├── Endianness (big-endian vs. little-endian — critical for RE and network protocol analysis)
  └── Interrupt handling and exception dispatch
```

---

## D2 → Operating Systems

```
Requires:    D1 (Computer Basics — full)

Core Concepts:
  WINDOWS TRACK
  ├── NTFS file system (permissions, alternate data streams, MFT)
  ├── Windows Registry (structure, persistence locations)
  ├── User Account Control (UAC) and privilege model
  ├── Windows authentication (NTLM, NTHash)
  ├── Windows services and the service control manager
  ├── Windows event logging (Security, System, Application, PowerShell logs)
  ├── PowerShell basics (cmdlets, pipeline, execution policy)
  └── Windows Defender and Windows Firewall basics

  LINUX TRACK
  ├── File system hierarchy standard (FHS)
  ├── Permissions model (rwx, octal, SUID/SGID/sticky bit)
  ├── Users, groups, and /etc/passwd / /etc/shadow
  ├── Process management (PID, PPID, ps, top, kill)
  ├── Shell scripting (bash variables, conditionals, loops, pipes)
  ├── Package management (apt/dpkg, yum/rpm)
  ├── SSH and key-based authentication
  └── System logging (syslog, journald, /var/log/)

Enables:
  ├── D6: Cybersecurity Fundamentals (attack surfaces on real OSes)
  ├── D7: Cryptography (OS cryptographic APIs, keystore)
  ├── D8: IAM (Active Directory, Linux PAM)
  ├── D9: Defensive Security (EDR, event log analysis, hardening)
  ├── D10: Offensive Security (privilege escalation, persistence)
  ├── D13: Incident Response (host-based evidence)
  ├── D14: Digital Forensics (file system analysis, memory forensics)
  └── D15: Malware Analysis (malware operates at OS level)

Advanced Concepts:
  WINDOWS
  ├── Active Directory architecture (domains, forests, trusts, OUs, GPO)
  ├── Kerberos protocol (AS-REQ/AS-REP, TGS-REQ/TGS-REP, tickets)
  ├── Windows access token model and impersonation
  ├── Named pipes and inter-process communication
  ├── Windows Management Instrumentation (WMI) — and its abuse
  ├── AppLocker / WDAC application whitelisting
  ├── Windows Credential Store (LSASS, SAM, NTDS.dit)
  └── Living-off-the-land binaries (LOLBins) — legitimate tools abused

  LINUX
  ├── Linux kernel security modules (SELinux, AppArmor)
  ├── Capabilities system (fine-grained privilege)
  ├── Namespaces and cgroups (container isolation foundations)
  ├── D-Bus and inter-process communication
  ├── Auditd and Linux audit framework
  └── LD_PRELOAD and dynamic linker abuse
```

---

## D3 → Networking

```
Requires:    D1 (Computer Basics — network interface is hardware)

Core Concepts:
  ├── OSI model (7 layers — purpose and protocols at each)
  ├── TCP/IP model (4 layers — how OSI maps to reality)
  ├── IPv4 addressing (dotted decimal, octets, classes)
  ├── Subnetting (subnet masks, CIDR notation, /24 → /30)
  ├── MAC addresses and the ARP protocol
  ├── TCP (three-way handshake, flags, state machine, teardown)
  ├── UDP (connectionless, use cases, tradeoffs vs. TCP)
  ├── DNS (resolution process, record types: A, AAAA, MX, CNAME, PTR, NS, TXT)
  ├── DHCP (DORA process, lease, scope)
  ├── HTTP (methods, status codes, headers, cookies)
  ├── HTTPS (TLS handshake at a conceptual level)
  ├── Packet capture fundamentals (Wireshark interface and filters)
  └── Nmap fundamentals (TCP SYN scan, service detection, OS detection)

Enables:
  ├── D5: Web Technologies (HTTP/HTTPS deep dive)
  ├── D6: Cybersecurity Fundamentals (network attack surfaces)
  ├── D7: Cryptography (TLS deep dive)
  ├── D9: Defensive Security (network monitoring, IDS/IPS)
  ├── D10: Offensive Security (reconnaissance, network attacks)
  ├── D11: Cloud Security (virtual networking)
  ├── D12: Threat Intelligence (network-based IOCs)
  ├── D13: Incident Response (network evidence)
  └── D14: Digital Forensics (network forensics / pcap analysis)

Advanced Concepts:
  ├── Routing protocols (static routes, OSPF concepts, BGP basics)
  ├── Switching (VLANs, STP, 802.1Q trunking)
  ├── Network Address Translation (NAT, PAT, DNAT)
  ├── Load balancing (L4 vs. L7, round-robin, health checks)
  ├── Proxies and reverse proxies (forward proxy, transparent proxy, MITM implications)
  ├── VPNs (IPsec tunnel/transport mode, IKEv2, OpenVPN, WireGuard)
  ├── Wireless networking (802.11 standards, WPA2, WPA3, EAP methods)
  ├── Network protocols deep dive:
  │     SMTP / IMAP / POP3 (email and its abuse)
  │     FTP / SFTP (and why FTP is insecure)
  │     RDP / VNC / SSH (remote access protocols)
  │     LDAP (directory services protocol)
  │     SNMP (network management and its historical insecurity)
  │     Kerberos (network authentication protocol)
  │     NFS / SMB (file sharing and their exploitation)
  └── Software-defined networking (SDN) concepts
```

---

## D4 → Programming

```
Requires:    D1 (Computer Basics — programs run on hardware)
             D2 (Operating Systems — programs run on OSes) [recommended]

Core Concepts:
  PYTHON FUNDAMENTALS
  ├── Variables, data types (int, str, list, dict, set, bool)
  ├── Control flow (if/elif/else, for, while, break, continue)
  ├── Functions (definition, parameters, return values, scope)
  ├── Modules and imports (os, sys, re, json, subprocess)
  ├── File I/O (read, write, append, context managers)
  ├── Error handling (try/except/finally, exception types)
  └── Basic OOP (classes, methods, inheritance — conceptual level)

  BASH SCRIPTING
  ├── Variables and quoting rules
  ├── Conditionals (if/test, case)
  ├── Loops (for, while)
  ├── Pipes and redirection (|, >, >>, <, 2>, /dev/null)
  ├── Command substitution ($() syntax)
  └── Essential tools (grep, awk, sed, cut, sort, uniq, wc, find, xargs)

  SQL FUNDAMENTALS
  ├── SELECT statements (columns, WHERE, ORDER BY, LIMIT)
  ├── JOINs (INNER, LEFT, RIGHT — conceptual and practical)
  ├── INSERT, UPDATE, DELETE
  ├── Subqueries (inline and correlated)
  └── Database schema concepts (tables, columns, data types, primary/foreign keys)

  REGEX
  ├── Character classes ([a-z], \d, \w, \s)
  ├── Quantifiers (*, +, ?, {n,m})
  ├── Anchors (^, $, \b)
  ├── Groups and capture groups
  └── Practical: extracting IPs, emails, URLs from text

Enables:
  ├── D5: Web Technologies (JavaScript understanding for XSS, HTTP from code)
  ├── D9: Defensive Security (scripting detection rules, automation)
  ├── D10: Offensive Security (exploit scripts, automation)
  ├── D15: Malware Analysis (reading Python malware, scripted analysis)
  ├── D16: Reverse Engineering (understanding compiled code from source)
  └── D18: DevSecOps (code review, SAST understanding)

Advanced Concepts:
  ├── Python for security:
  │     Socket programming (raw TCP/UDP connections)
  │     Scapy (packet crafting and manipulation)
  │     HTTP requests library (automating web interactions)
  │     Paramiko (SSH automation)
  │     Writing simple port scanners, banner grabbers, hash crackers
  ├── C programming basics (pointers, memory allocation, buffer operations)
  │     → Required for buffer overflow understanding and RE
  ├── JavaScript fundamentals (DOM, event handlers, fetch API)
  │     → Required for XSS understanding and browser security
  └── Assembly language introduction (x86 registers, stack, basic instructions)
          → Required for Reverse Engineering domain
```

---

## D5 → Web Technologies

```
Requires:    D3 (Networking — HTTP is a network protocol)
             D4 (Programming — web apps are programs)

Core Concepts:
  ├── HTTP protocol deep dive:
  │     Methods (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD)
  │     Status codes (2xx success, 3xx redirect, 4xx client error, 5xx server error)
  │     Headers (Content-Type, Authorization, Cookie, Set-Cookie, CORS, CSP)
  │     Request/response cycle in detail
  ├── Cookies and sessions:
  │     Cookie attributes (HttpOnly, Secure, SameSite, Expires, Domain, Path)
  │     Session tokens (generation, storage, invalidation)
  │     Cookie-based vs. token-based authentication
  ├── TLS/SSL in web context:
  │     Certificate chain validation
  │     TLS handshake step by step (client hello → certificate → key exchange → finished)
  │     Common TLS misconfigurations (expired cert, weak cipher, self-signed, pinning bypass)
  ├── Web application architecture:
  │     Frontend (HTML/CSS/JS in browser)
  │     Backend (application server: Python/Django, Node/Express, Java/Spring)
  │     Database tier (relational: MySQL/PostgreSQL, NoSQL: MongoDB/Redis)
  │     Three-tier architecture and its attack surface model
  ├── REST APIs:
  │     Resource-oriented design, HTTP methods as CRUD
  │     JSON request and response formats
  │     API authentication (API keys, Bearer tokens)
  ├── Authentication mechanisms:
  │     HTTP Basic Auth (and why it's weak without TLS)
  │     Session-based auth (stateful server sessions)
  │     JWT (structure: header.payload.signature, algorithm attacks)
  │     OAuth2 (authorization_code, client_credentials, implicit — and their risks)
  │     OpenID Connect (OAuth2 extension for authentication)
  └── Browser security model:
        Same-Origin Policy (SOP) — what it prevents and what it doesn't
        Cross-Origin Resource Sharing (CORS) — when to allow it and misconfigurations
        Content Security Policy (CSP) — what it prevents and how to bypass weak policies

Enables:
  ├── D10: Offensive Security (web application attack surface)
  ├── D11: Cloud Security (cloud APIs, OAuth in cloud context)
  ├── D17: AI Security (LLM APIs are web APIs)
  └── D18: DevSecOps (securing web application code)

Advanced Concepts:
  ├── WebSockets (bidirectional communication, security implications)
  ├── GraphQL (query language, introspection attacks, authorization issues)
  ├── gRPC (binary protocol, protobuf, service reflection)
  ├── Server-side rendering vs. client-side rendering (security implications of each)
  ├── Web application firewall (WAF) concepts and bypass techniques
  ├── CDN behavior and security (cache poisoning, origin IP exposure)
  └── HTTP/2 and HTTP/3 (QUIC) security implications
```

---

## D6 → Cybersecurity Fundamentals

```
Requires:    D1, D2, D3 (all Tier 0 foundations except Web Technologies)

Core Concepts:
  ├── CIA Triad:
  │     Confidentiality (unauthorized disclosure prevention)
  │     Integrity (unauthorized modification prevention)
  │     Availability (maintaining service despite attacks)
  │     Non-repudiation (extended: proving who did what)
  ├── AAA Framework:
  │     Authentication (proving identity)
  │     Authorization (what the authenticated identity can do)
  │     Accounting/Auditing (logging what happened)
  ├── Threat modeling:
  │     STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
  │     Identifying trust boundaries
  │     Threat model as a design tool (not a compliance artifact)
  ├── Risk fundamentals:
  │     Vulnerability (weakness that can be exploited)
  │     Threat (potential cause of harm)
  │     Risk = Threat × Vulnerability × Impact
  │     Likelihood vs. Impact scoring
  │     Risk treatment: Accept, Transfer, Avoid, Mitigate
  ├── Attack surface analysis:
  │     External attack surface (internet-facing assets)
  │     Internal attack surface (lateral movement paths)
  │     Human attack surface (social engineering targets)
  ├── Defense in depth:
  │     Layered controls (perimeter, network, host, application, data)
  │     Why no single control is sufficient
  │     Security through diversity (avoiding monoculture)
  ├── Zero trust model:
  │     Verify explicitly (every request, not just first)
  │     Use least privilege access
  │     Assume breach mentality
  ├── Security controls taxonomy:
  │     By function: Preventive, Detective, Corrective, Deterrent, Compensating, Recovery
  │     By implementation: Technical, Administrative, Physical
  └── Security mindset:
        Thinking adversarially (what could go wrong, how would I abuse this?)
        Attack trees and kill chains as thinking tools
        Security as a continuous process, not a state

Enables:
  ├── All Tier 2, Tier 3, Tier 4 domains
  └── Every domain benefits from the security mindset established here

Advanced Concepts:
  ├── Attack kill chains (Lockheed Martin model, applied to real incidents)
  ├── MITRE ATT&CK framework overview (tactics → techniques → sub-techniques)
  ├── Security architecture principles (fail-safe defaults, least privilege, separation of duties)
  ├── Common security design patterns (bastion host, DMZ, jump server)
  └── Security metrics fundamentals (MTTD, MTTR, coverage ratios)
```

---

## D7 → Cryptography

```
Requires:    D1 (Computer Basics — binary math, XOR operations)
             D4 (Programming — implementing crypto is programming)
             D6 (Cybersecurity Fundamentals — CIA triad context)

Core Concepts:
  ├── Symmetric encryption:
  │     AES (AES-128, AES-192, AES-256 — key sizes and security levels)
  │     Block cipher modes (ECB vs. CBC vs. GCM — why ECB is insecure)
  │     Stream ciphers (XOR with keystream, ChaCha20)
  │     Key management (generation, storage, rotation, distribution problem)
  ├── Hash functions:
  │     Properties (preimage resistance, second preimage resistance, collision resistance)
  │     SHA-2 family (SHA-256, SHA-512)
  │     SHA-3 (Keccak construction)
  │     MD5 and SHA-1 weaknesses (collision attacks, not suitable for security)
  │     Use cases (file integrity, password hashing, digital signatures)
  ├── Asymmetric encryption:
  │     RSA (key pair generation, encryption/decryption, the trapdoor function)
  │     Elliptic Curve Cryptography (ECC — smaller keys, same security level)
  │     Key exchange vs. encryption vs. signing (different operations, different algorithms)
  ├── Message Authentication Codes (MAC):
  │     HMAC construction (hash + key)
  │     Authenticated encryption (AES-GCM, ChaCha20-Poly1305)
  │     Why encryption without authentication is dangerous (padding oracle, bit-flipping)
  ├── Digital signatures:
  │     RSA signatures (sign with private key, verify with public key)
  │     ECDSA (digital signature algorithm on elliptic curves)
  │     Ed25519 (modern EdDSA — used in SSH keys, TLS 1.3)
  ├── Password hashing:
  │     Why MD5/SHA1 are wrong for passwords (fast hash = easy brute force)
  │     bcrypt (cost factor, adaptive)
  │     Argon2 (memory-hard, PBKDF competition winner)
  │     PBKDF2 (iterative, NIST-approved)
  │     Salting (preventing rainbow table attacks)
  ├── Public Key Infrastructure (PKI):
  │     Certificate structure (Subject, Issuer, Public Key, Validity, Extensions)
  │     Certificate Authority hierarchy (Root CA → Intermediate CA → Leaf cert)
  │     Certificate signing requests (CSR)
  │     Certificate Revocation (CRL, OCSP)
  │     Trust stores (browser/OS bundled root CAs)
  ├── Key exchange:
  │     Diffie-Hellman (shared secret without transmitting the secret)
  │     ECDH (elliptic curve DH — used in TLS 1.3)
  │     Perfect forward secrecy (ephemeral key exchange)
  └── TLS/SSL in depth:
        Handshake protocol (ClientHello → ServerHello → Certificate → KeyExchange → Finished)
        TLS 1.2 vs. TLS 1.3 (removed weak cipher suites, 0-RTT)
        Common TLS attacks (BEAST, POODLE, Heartbleed, DROWN)
        Certificate pinning and HPKP

Enables:
  ├── D8: IAM (Kerberos uses symmetric and asymmetric crypto, certificates)
  ├── D5: Web Technologies (TLS in context)
  ├── D9: Defensive Security (TLS inspection, certificate monitoring)
  ├── D10: Offensive Security (crypto attacks, certificate spoofing)
  ├── D11: Cloud Security (KMS, certificate management)
  └── D15/D16: Malware Analysis / RE (malware uses crypto for C2 and ransomware)

Advanced Concepts:
  ├── Homomorphic encryption (computing on encrypted data)
  ├── Zero-knowledge proofs (proving knowledge without revealing it)
  ├── Post-quantum cryptography (CRYSTALS-Kyber, CRYSTALS-Dilithium — NIST standards)
  ├── Cryptographic side-channel attacks (timing attacks, power analysis)
  └── Hardware security modules (HSM — tamper-resistant key storage)
```

---

## D8 → Identity & Access Management

```
Requires:    D2 (Operating Systems — AD, Linux PAM)
             D3 (Networking — identity protocols are network protocols)
             D7 (Cryptography — Kerberos, TLS client certs, digital signatures)
             D6 (Cybersecurity Fundamentals — least privilege, AAA)

Core Concepts:
  ├── Authentication factors:
  │     Knowledge (passwords, PINs, security questions)
  │     Possession (TOTP, hardware token, smart card, phone)
  │     Inherence (biometrics: fingerprint, face, voice)
  │     Location / behavior (contextual factors)
  │     MFA = combining factors from different categories
  ├── Password security:
  │     Password policies (length, complexity, history, expiry — and the research against complexity rules)
  │     Credential storage (hashing with salt — never plaintext, never reversible encryption)
  │     Password managers (rationale and enterprise solutions)
  │     Common password attacks (brute force, dictionary, credential stuffing, spraying)
  ├── Multi-factor authentication:
  │     TOTP (Time-based One-Time Passwords — RFC 6238, Google Authenticator)
  │     HOTP (HMAC-based OTP — counter-based)
  │     FIDO2/WebAuthn (phishing-resistant, hardware-bound)
  │     SMS OTP (deprecated — SIM swapping attack)
  │     Push notification authentication (Duo, Okta Verify)
  ├── Single Sign-On:
  │     Federation (separate identity provider from service provider)
  │     SSO benefits (fewer passwords, centralized control) and risks (single point of failure)
  ├── SAML 2.0:
  │     SP-initiated and IdP-initiated flows
  │     Assertions (authentication, attribute, authorization)
  │     XML signature and encryption
  │     Common SAML attacks (signature wrapping, XML injection)
  ├── OAuth2 and OpenID Connect:
  │     OAuth2 roles (Resource Owner, Client, Authorization Server, Resource Server)
  │     Grant types (Authorization Code + PKCE, Client Credentials, Device Code)
  │     OpenID Connect (ID tokens, UserInfo endpoint, claims)
  │     Common OAuth attacks (CSRF on authorization endpoint, open redirects, token leakage)
  ├── Kerberos:
  │     KDC components (AS and TGS)
  │     Ticket Granting Ticket (TGT) and Service Tickets
  │     The authentication flow (AS-REQ/AS-REP/TGS-REQ/TGS-REP/AP-REQ)
  │     Kerberos delegation (unconstrained, constrained, resource-based constrained)
  ├── LDAP and Active Directory:
  │     LDAP protocol (distinguished names, attributes, search operations)
  │     AD structure (domains, OUs, users, groups, computers, GPOs)
  │     AD authentication (Kerberos in domain, NTLM as fallback)
  │     Group membership and effective permissions
  └── Privileged Access Management:
        Just-in-time access (temporary elevation)
        Privileged identity workstations (PAWs)
        Password vaulting (CyberArk, BeyondTrust)
        Session recording for privileged access

Enables:
  ├── D9: Defensive Security (identity-based detection: impossible travel, credential theft alerts)
  ├── D10: Offensive Security (credential attacks, AD exploitation, pass-the-hash)
  ├── D11: Cloud Security (cloud IAM is built on these foundations)
  └── D18: DevSecOps (OAuth2 implementation security, API authentication)

Advanced Concepts:
  ├── Active Directory attack techniques:
  │     Pass-the-hash (NTLM relay, PTH)
  │     Pass-the-ticket (Kerberos ticket injection)
  │     Kerberoasting (SPN ticket request → offline cracking)
  │     AS-REP Roasting (accounts without preauth)
  │     DCSync (replicating NTDS.dit remotely)
  │     Golden Ticket and Silver Ticket attacks
  │     BloodHound and AD attack path analysis
  ├── Identity governance:
  │     Access reviews and certification
  │     Segregation of duties
  │     Birthright access and access lifecycle management
  └── Zero trust identity:
        Continuous verification
        Device trust (managed vs. BYOD)
        Risk-based authentication (adaptive MFA)
```

---

## D9 → Defensive Security

```
Requires:    D2 (Operating Systems — host-based tools)
             D3 (Networking — network-based tools)
             D6 (Cybersecurity Fundamentals — controls taxonomy, risk)
             D8 (IAM — identity-based detection) [recommended]

Core Concepts:
  ├── SIEM (Security Information and Event Management):
  │     Log collection architecture (agents, syslog, API-based)
  │     Log normalization and parsing
  │     Correlation rules (what makes a rule fire)
  │     Search queries (SPL for Splunk, KQL for Sentinel, Lucene for Elastic)
  │     Dashboards and reporting
  │     Alert tuning (reducing false positives without creating false negatives)
  ├── Network monitoring:
  │     IDS vs. IPS (detection vs. prevention)
  │     Signature-based detection (Snort rules, Suricata rules)
  │     Anomaly-based detection (baseline → deviation)
  │     Network traffic analysis (NTA) tools
  │     NetFlow / IPFIX analysis
  ├── Endpoint Detection and Response (EDR):
  │     Behavioral monitoring (process creation, network connections, registry changes)
  │     Threat hunting within EDR
  │     Response actions (isolate, kill process, block hash)
  │     EDR evasion techniques (from attacker perspective — to understand what to detect)
  ├── Vulnerability management:
  │     Scanning (authenticated vs. unauthenticated, agent-based vs. network-based)
  │     CVSS scoring (Base, Temporal, Environmental)
  │     Prioritization (CVSS + asset criticality + exploitability)
  │     Remediation tracking and SLAs
  │     Patch management lifecycle
  ├── Security hardening:
  │     CIS Benchmarks (operating system hardening baselines)
  │     DISA STIGs (DoD hardening standards)
  │     Hardening Windows (disable unnecessary services, enable auditing, restrict PowerShell)
  │     Hardening Linux (SSH hardening, firewall rules, disable root login)
  ├── Email security:
  │     SPF (Sender Policy Framework — authorized sending IP ranges)
  │     DKIM (DomainKeys Identified Mail — cryptographic email signing)
  │     DMARC (policy: what to do when SPF/DKIM fail)
  │     Anti-phishing controls (URL detonation, attachment sandboxing)
  └── SOC Operations:
        Alert triage (P1/P2/P3 classification)
        Runbooks and escalation procedures
        Shift handover and ticketing
        Metrics (MTTD, MTTR, false positive rate)

Enables:
  ├── D13: Incident Response (defensive tools are the eyes and hands of IR)
  ├── D12: Threat Intelligence (feeds into SIEM detection rules, IOC blocking)
  └── Threat Hunting (advanced application of defensive tooling)

Advanced Concepts:
  ├── SOAR (Security Orchestration, Automation, and Response):
  │     Playbook automation
  │     Integration with ticketing systems
  │     Automated enrichment and response
  ├── Deception technology:
  │     Honeypots (low-interaction vs. high-interaction)
  │     Honeytokens (canary credentials, canary documents)
  │     Deception-based detection advantages
  ├── Purple team operations:
  │     Red team provides TTPs, blue team builds detections
  │     ATT&CK-based coverage measurement
  └── Advanced threat hunting:
        Hypothesis-based hunting
        Behavioral analytics (UEBA)
        Custom YARA and Sigma rules
```

---

## D10 → Offensive Security

```
Requires:    D2 (Operating Systems — targets run on OSes)
             D3 (Networking — attacks traverse networks)
             D4 (Programming — exploitation requires scripting)
             D5 (Web Technologies — web is the primary attack surface)
             D6 (Cybersecurity Fundamentals — attack mindset, ethics)
             D8 (IAM — credentials are central to post-exploitation)

Core Concepts:
  ├── Penetration testing methodology:
  │     Engagement types (black box, grey box, white box)
  │     PTES phases (Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, Reporting)
  │     Rules of engagement (scope, authorization, emergency contacts)
  │     Legal framework (authorization is everything — Computer Fraud and Abuse Act, UK CMA, EU)
  ├── Reconnaissance:
  │     Passive OSINT (domain records, WHOIS, certificates, LinkedIn, Shodan, Google dorks)
  │     Active scanning (Nmap, Masscan, network enumeration)
  │     Enumeration (service banners, user enumeration, directory brute force)
  ├── Web application testing:
  │     Burp Suite (proxy, scanner, Intruder, Repeater, Decoder)
  │     OWASP Top 10 testing:
  │       A01 Broken Access Control
  │       A02 Cryptographic Failures
  │       A03 Injection (SQL, LDAP, Command, XPath)
  │       A04 Insecure Design
  │       A05 Security Misconfiguration
  │       A06 Vulnerable and Outdated Components
  │       A07 Identification and Authentication Failures
  │       A08 Software and Data Integrity Failures
  │       A09 Security Logging and Monitoring Failures
  │       A10 Server-Side Request Forgery (SSRF)
  ├── Exploitation:
  │     Metasploit framework (search, use, set options, exploit, sessions)
  │     Payload types (singles, stagers, stages — Meterpreter)
  │     Manual exploitation (exploiting known CVEs without Metasploit)
  │     Password attacks:
  │       Hash cracking (Hashcat, John the Ripper — dictionary, rule-based, brute force)
  │       Credential stuffing (previously leaked credentials)
  │       Password spraying (one password → many accounts)
  ├── Post-exploitation:
  │     Privilege escalation (Windows: unquoted service paths, DLL hijacking; Linux: SUID, sudo misconfig, cron)
  │     Lateral movement (pass-the-hash, WMI, PsExec, RDP)
  │     Persistence (registry run keys, scheduled tasks, services, startup folders)
  │     Defense evasion (obfuscation, living off the land, timestomping)
  │     Data exfiltration (staging, compression, encryption, covert channels)
  ├── Social engineering:
  │     Phishing (spear phishing, vishing, smishing, whaling)
  │     Pretexting (creating a believable scenario)
  │     Physical access (tailgating, impersonation)
  │     Pretexting calls (vishing — example scripts and countermeasures)
  └── Reporting:
        Executive summary (non-technical audience)
        Technical findings (reproduction steps, evidence, risk rating)
        Remediation recommendations
        Risk rating (CVSS, DREAD, qualitative)

Enables:
  ├── D15: Malware Analysis (understanding attacker tooling)
  ├── D16: Reverse Engineering (exploit development is advanced RE)
  └── Advanced Red Teaming (adversary simulation, C2 frameworks)

Advanced Concepts:
  ├── C2 frameworks (Cobalt Strike, Brute Ratel, Havoc — concepts and detection)
  ├── Active Directory attack paths (BloodHound, complete AD compromise chain)
  ├── Wireless attacks (WPA2 4-way handshake capture → offline cracking, PMKID attack, evil twin)
  ├── Physical security testing (lock picking concepts, badge cloning)
  └── Red team operations (long-dwell campaigns, operational security)
```

---

## D11 → Cloud Security

```
Requires:    D2 (Operating Systems — Linux is the cloud OS)
             D3 (Networking — cloud networking is software-defined networking)
             D7 (Cryptography — cloud key management)
             D8 (IAM — cloud IAM is the central security control)
             D6 (Cybersecurity Fundamentals — shared responsibility model requires this mindset)

Core Concepts:
  ├── Cloud service models:
  │     IaaS (you manage OS up), PaaS (you manage app up), SaaS (you manage data)
  │     Shared responsibility matrix per model
  ├── Cloud IAM:
  │     AWS IAM (users, roles, policies, resource-based policies, SCPs)
  │     Azure RBAC (management groups, subscriptions, resource groups, roles)
  │     GCP IAM (projects, service accounts, roles, conditions)
  │     Principle of least privilege in cloud (wildcard permissions are dangerous)
  │     Service account security (key rotation, workload identity federation)
  ├── Cloud storage security:
  │     S3 bucket policies and ACLs (public access block settings)
  │     Azure Blob access tiers and SAS tokens
  │     Cloud storage encryption (SSE-S3, SSE-KMS, CMEK)
  │     Common misconfigurations (public buckets, world-readable ACLs)
  ├── Virtual networking:
  │     VPCs and subnets (public vs. private)
  │     Security groups (stateful) vs. NACLs (stateless)
  │     VPC peering and Transit Gateway
  │     Private endpoints (keeping traffic off the internet)
  ├── Cloud logging and monitoring:
  │     AWS CloudTrail (API call logging — the foundation of cloud forensics)
  │     AWS Config (resource configuration compliance)
  │     Azure Monitor and Defender for Cloud
  │     GCP Cloud Audit Logs and Security Command Center
  ├── Container security:
  │     Docker security (non-root containers, read-only filesystem, capability dropping)
  │     Kubernetes security (RBAC, network policies, pod security standards, secrets management)
  │     Container image scanning (Trivy, Grype, Snyk Container)
  └── Cloud misconfiguration attacks:
        SSRF → IMDSv1 metadata service credential theft (CapitalOne-style)
        Privilege escalation via IAM (PassRole, wildcard policies)
        Public S3 bucket data exposure
        Overpermissioned Lambda functions
        Exposed Kubernetes API server

Enables:
  ├── D18: DevSecOps (cloud-native CI/CD and IaC security)
  └── Cloud penetration testing (advanced offensive cloud)

Advanced Concepts:
  ├── Serverless security (Lambda/Functions — event injection, layer security, IAM over-permission)
  ├── CSPM tools (Wiz, Orca, Prisma Cloud — continuous cloud posture)
  ├── Cloud-native SIEM (Sentinel, Chronicle — cloud log analysis at scale)
  ├── Multi-cloud security (different control planes, unified policy)
  └── Cloud supply chain (third-party integrations, marketplace images)
```

---

## D12 → Threat Intelligence

```
Requires:    D6 (Cybersecurity Fundamentals — threat model, risk language)
             D3 (Networking — network-based IOCs)
             D9 (Defensive Security — where intelligence is consumed)
             D10 (Offensive Security — understanding attacker TTPs) [recommended]

Core Concepts:
  ├── Intelligence lifecycle:
  │     Direction (requirements: what do we need to know?)
  │     Collection (OSINT, commercial feeds, human sources, technical collection)
  │     Processing (normalization, deduplication, enrichment)
  │     Analysis (from data to intelligence: pattern recognition, attribution)
  │     Dissemination (right format to right audience: technical IOCs vs. executive reports)
  │     Feedback (was the intelligence actionable?)
  ├── IOC types and their value:
  │     Atomic IOCs (IP addresses, domain names, file hashes — volatile, frequently changed by attackers)
  │     Computed IOCs (behavioral signatures, YARA rules, Snort signatures — more durable)
  │     Behavioral IOCs (TTP patterns, attacker behaviors — most durable and valuable)
  │     Pyramid of Pain (Bianco, 2013) — hash IOCs are easy for attackers to change; TTPs are hard
  ├── MITRE ATT&CK:
  │     Tactic categories (14 tactics from Reconnaissance to Impact)
  │     Technique structure (technique → sub-technique)
  │     Using ATT&CK for threat hunting hypotheses
  │     Using ATT&CK for detection coverage measurement
  │     ATT&CK for ICS and ATT&CK for Mobile (separate matrices)
  ├── Threat actor analysis:
  │     Nation-state APTs (Cozy Bear/APT29, Lazarus Group/APT38, APT41)
  │     Criminal groups (ransomware-as-a-service operators: LockBit, ALPHV/BlackCat)
  │     Hacktivist groups
  │     Insider threats (malicious vs. negligent)
  │     Attribution methodology (Diamond Model)
  ├── Kill chain model:
  │     Lockheed Martin Cyber Kill Chain (Reconnaissance → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives)
  │     MITRE ATT&CK as a more granular alternative
  ├── Diamond Model:
  │     Four features: Adversary, Infrastructure, Capability, Victim
  │     Meta-features and activity threads
  │     Using the Diamond Model for attribution and prediction
  └── Intelligence sharing:
        STIX 2.1 (Structured Threat Information Expression — data format)
        TAXII 2.1 (Trusted Automated Exchange of Intelligence — transport protocol)
        ISACs (Information Sharing and Analysis Centers — sector-specific)
        Traffic Light Protocol (TLP — sharing classification: TLP:RED, AMBER, GREEN, CLEAR)

Enables:
  ├── D13: Incident Response (TI provides attacker context during investigation)
  └── Advanced threat hunting (hunt hypotheses from TI)

Advanced Concepts:
  ├── Threat intelligence platforms (Recorded Future, ThreatConnect, MISP)
  ├── Counter-intelligence (detecting when your TTPs are known to the adversary)
  ├── Strategic intelligence (threat landscape reports for executive decision-making)
  └── Threat emulation (using TI to design realistic red team campaigns)
```

---

## D13 → Incident Response

```
Requires:    D2 (Operating Systems — host evidence)
             D3 (Networking — network evidence)
             D9 (Defensive Security — IR uses SIEM, EDR, IDS)
             D6 (Cybersecurity Fundamentals — risk, controls, CIA)

Core Concepts:
  ├── PICERL Framework:
  │     Preparation (IR plan, playbooks, tools, exercises)
  │     Identification (alert triage, initial scope, "is this an incident?")
  │     Containment (short-term: isolate; long-term: rebuild while investigating)
  │     Eradication (remove adversary access: malware, backdoors, compromised accounts)
  │     Recovery (restore services, verify clean state, monitor for recurrence)
  │     Lessons Learned (post-incident review, process improvement)
  ├── Alert triage:
  │     True positive vs. false positive classification
  │     Escalation criteria (P1: active breach, P2: high-confidence suspicious, P3: investigate)
  │     Initial data gathering (affected hosts, accounts, network segments, timeline)
  ├── Scope determination:
  │     Patient zero identification
  │     Blast radius assessment (what else could be affected?)
  │     Timeline reconstruction (when did this start?)
  ├── Evidence collection:
  │     Order of volatility (registers → RAM → swap → disk → remote logs)
  │     Memory acquisition (WinPmem, LiME, Magnet RAM Capture)
  │     Disk imaging (FTK Imager, dd)
  │     Log collection and preservation
  │     Chain of custody documentation
  ├── Communication:
  │     Internal escalation (IR team → management → board)
  │     External notification (legal, public relations, regulators)
  │     Regulatory requirements (GDPR: 72-hour breach notification, HIPAA, PCI DSS)
  │     Managing public disclosure
  └── IR Playbooks:
        Ransomware response playbook
        Data breach response playbook
        Insider threat response playbook
        DDoS response playbook

Enables:
  ├── D14: Digital Forensics (forensics is the analytical component of IR)
  └── Advanced IR specializations (cloud IR, ICS/OT IR)

Advanced Concepts:
  ├── Threat containment decision framework (when to isolate vs. observe)
  ├── Active directory recovery after complete compromise (golden ticket, domain trust compromise)
  ├── Ransomware negotiation and decryption (legal and operational considerations)
  ├── ICS/OT incident response (safety-critical system constraints)
  └── Cloud incident response (cloud-native evidence sources, ephemeral infrastructure challenges)
```

---

## D14 → Digital Forensics

```
Requires:    D2 (Operating Systems — file systems, logs, artifacts)
             D3 (Networking — network forensics)
             D13 (Incident Response — forensics serves IR)
             D7 (Cryptography — hash verification, encrypted evidence)

Core Concepts:
  ├── Forensic principles:
  │     Chain of custody (documentation proving evidence integrity)
  │     Write protection (hardware and software blockers)
  │     Hash verification (MD5/SHA1/SHA256 of disk images)
  │     Forensic copies vs. working copies
  │     Documentation standards
  ├── Disk forensics:
  │     Disk imaging (FTK Imager, dd, dcfldd, Guymager)
  │     File system analysis (NTFS: MFT, $Recycle.Bin, VSS; ext4: inodes, journal)
  │     Deleted file recovery (file carving, inode analysis)
  │     Timeline analysis (MAC times: Modified, Accessed, Changed)
  │     Artifact locations:
  │       Windows: Prefetch, LNK files, Jump Lists, UserAssist, ShimCache, AmCache
  │       Linux: bash_history, /var/log/auth.log, /proc/, cron files
  ├── Memory forensics:
  │     Memory acquisition techniques
  │     Volatility framework:
  │       Process analysis (pslist, pstree, cmdline, dlllist)
  │       Network connections (netstat, netscan)
  │       Registry extraction from memory
  │       Malware detection (malfind, hollowfind)
  │       Credential extraction (hashdump, lsadump)
  ├── Network forensics:
  │     PCAP analysis (Wireshark, tshark, NetworkMiner)
  │     Reconstructing sessions (TCP stream reassembly)
  │     Extracting files from network captures
  │     DNS forensics (resolving accessed domains from logs)
  │     Identifying C2 traffic patterns
  ├── Log analysis:
  │     Windows Event Log analysis (Security: 4624, 4625, 4648, 4688, 4720, 4776)
  │     Linux log analysis (/var/log/auth.log, syslog, audit.log)
  │     Application log analysis (web server logs, database logs)
  │     Log correlation across multiple sources
  └── Timeline analysis:
        Super timeline construction (Plaso/log2timeline)
        Event correlation across multiple artifact types
        Identifying attacker timeline from forensic evidence

Enables:
  ├── D15: Malware Analysis (forensics extracts malware for analysis)
  └── Expert witness and legal proceedings

Advanced Concepts:
  ├── Mobile device forensics (iOS: iTunes backup forensics, GrayKey concepts; Android: ADB, physical acquisition)
  ├── Cloud forensics (CloudTrail, S3 access logs, Azure Activity Log, ephemeral instance evidence)
  ├── Anti-forensics techniques (and their detection):
  │     Timestomping detection
  │     Secure deletion and recovery attempts
  │     Log clearing detection (event ID 1102, /var/log/auth.log gaps)
  └── Malware persistence artifact hunting (scheduled tasks, services, registry run keys in forensic context)
```

---

## D15 → Malware Analysis

```
Requires:    D2 (Operating Systems — malware runs on OSes)
             D4 (Programming — reading malicious code)
             D6 (Cybersecurity Fundamentals — malware threat context)
             D14 (Digital Forensics — malware extraction from forensic images) [recommended]

Core Concepts:
  ├── Malware taxonomy:
  │     Virus (self-replicating, requires host file)
  │     Worm (self-replicating, network propagation, no host file needed)
  │     Trojan (disguised as legitimate software)
  │     Ransomware (encrypts data, demands payment)
  │     Rootkit (hides itself and other malware at kernel or hypervisor level)
  │     RAT (Remote Access Trojan — attacker control)
  │     Botnet (C2-controlled network of compromised hosts)
  │     Spyware / Infostealer (credential and data theft)
  │     Dropper and Loader (delivers the actual payload)
  ├── Static analysis (no execution required):
  │     File identification (file command, magic bytes, PE header analysis)
  │     Strings extraction (strings command, FLOSS for encoded strings)
  │     PE analysis (PEiD, PEview, PE-bear: imports, exports, sections, entropy)
  │     VirusTotal (multi-engine scanning, behavioral reports)
  │     YARA rules (pattern matching signatures for malware families)
  │     Import analysis (which API calls does the binary import? → reveals intent)
  ├── Dynamic analysis (controlled execution):
  │     Sandboxing (Cuckoo Sandbox, AnyRun, Hybrid Analysis, Joe Sandbox)
  │     Process monitoring (Process Monitor, Process Hacker)
  │     Registry monitoring (changes to run keys, services, COM hijacking targets)
  │     Network monitoring (C2 connections, DNS lookups, HTTP beaconing)
  │     File system monitoring (dropped files, modified files, persistence artifacts)
  ├── Anti-analysis techniques:
  │     Packing and compression (UPX, custom packers — entropy detection)
  │     Obfuscation (string encoding, API hashing, code flow obfuscation)
  │     Anti-debugging (IsDebuggerPresent, NtQueryInformationProcess, timing checks)
  │     Anti-sandboxing (checking for VM artifacts: VMware registry keys, Vbox drivers)
  │     Evasion (fileless malware, process injection, DLL sideloading)
  ├── C2 infrastructure analysis:
  │     Beaconing patterns (interval, jitter, protocol)
  │     Domain generation algorithms (DGA) — detecting algorithmically generated domains
  │     Fast flux DNS
  │     Encrypted C2 (HTTPS C2, DNS tunneling, ICMP tunneling)
  └── YARA rule development:
        Writing rules based on static strings and byte patterns
        Rule families and metadata
        Testing rules (yarGen, retrohunting with VirusTotal)

Enables:
  ├── D16: Reverse Engineering (full binary analysis of complex malware)
  └── Threat intelligence production (characterizing malware families for feeds)

Advanced Concepts:
  ├── Code injection techniques (process hollowing, reflective DLL injection, shellcode injection)
  ├── Rootkit analysis (kernel-mode drivers, SSDT hooking, DKOM)
  ├── Ransomware cryptography analysis (identifying encryption algorithm → decryption feasibility)
  └── Malware family tracking (evolution of a family across samples)
```

---

## D16 → Reverse Engineering

```
Requires:    D1 (Computer Basics — CPU, memory, binary)
             D4 (Programming — C and assembly language)
             D15 (Malware Analysis — RE extends malware analysis) [for malware RE path]
             D10 (Offensive Security — exploit development context) [for vuln research path]

Core Concepts:
  ├── Assembly language (x86/x64):
  │     Registers (RAX, RBX, RCX, RDX, RSI, RDI, RSP, RBP, RIP)
  │     Instruction categories (data movement, arithmetic, logical, control flow)
  │     Stack mechanics (PUSH, POP, function prologues and epilogues)
  │     Calling conventions (System V AMD64 ABI, Microsoft x64, cdecl, stdcall)
  │     Reading compiler-generated code (recognizing if/else, loops, function calls in assembly)
  ├── Executable formats:
  │     PE format (Windows) — DOS header, PE header, section headers, sections (.text, .data, .rsrc)
  │     ELF format (Linux) — ELF header, program headers, section headers
  │     Imports and exports (IAT, export directory)
  │     Rich header and overlay data
  ├── Static analysis tools:
  │     IDA Pro (industry standard — disassembler and decompiler)
  │     Ghidra (NSA open-source — full-featured disassembler/decompiler)
  │     Binary Ninja (modern, scriptable)
  │     Radare2 (command-line, powerful, steep curve)
  │     Decompilers (Hex-Rays, Ghidra decompiler — pseudo-C output)
  ├── Dynamic analysis (debugging):
  │     x64dbg / OllyDbg (Windows debuggers)
  │     GDB with pwndbg / peda / GEF (Linux debugger)
  │     Setting breakpoints (software INT3, hardware breakpoints)
  │     Stepping (into, over, out)
  │     Inspecting memory and registers
  │     Patch-and-play (modifying execution at runtime)
  ├── Binary exploitation:
  │     Stack buffer overflow (overwriting return address → control RIP)
  │     Finding the offset (cyclic patterns)
  │     NX/DEP and bypass (return-oriented programming)
  │     ROP chains (finding gadgets, building chains with ROPgadget/ropper)
  │     ASLR and bypass (information leaks → defeating randomization)
  │     Heap exploitation (use-after-free, heap spray, tcache poisoning)
  │     Format string vulnerabilities (reading/writing memory via printf)
  └── Anti-analysis bypass:
        Manually unpacking packed executables
        Defeating anti-debugging (NOP patching, hook removal)
        Deobfuscating custom obfuscation schemes

Advanced Concepts:
  ├── Firmware analysis (extracting, mounting, and analyzing router/IoT firmware)
  ├── ARM architecture (mobile devices, IoT, Apple Silicon)
  ├── Kernel exploitation (ring 0 exploitation, driver vulnerabilities)
  ├── Browser exploitation (V8 JIT bugs, sandbox escapes)
  └── Vulnerability research methodology (fuzzing with AFL/libFuzzer, crash triage)
```

---

## D17 → AI Security

```
Requires:    D6 (Cybersecurity Fundamentals — threat model for AI systems)
             D4 (Programming — Python for ML concepts)
             D5 (Web Technologies — LLM APIs are web APIs)
             D10 (Offensive Security — attacking AI is offensive security) [recommended]

Core Concepts:
  ├── AI/ML fundamentals for security practitioners:
  │     Supervised learning (classification, regression) — model learns from labeled data
  │     Unsupervised learning (clustering, anomaly detection) — model finds patterns
  │     Deep learning basics (neural networks, layers, activation functions)
  │     Model training, validation, and inference pipeline
  │     What a model file is (weights, architecture) and why it matters for security
  ├── Adversarial machine learning:
  │     Evasion attacks (crafting inputs that fool a trained model without access to its internals)
  │     Poisoning attacks (corrupting training data to degrade model performance or insert backdoors)
  │     Model extraction (reconstructing a model through API queries)
  │     Model inversion (recovering training data from model outputs)
  │     Membership inference (determining if a specific data point was in the training set)
  ├── LLM security:
  │     Prompt injection (direct and indirect — injecting instructions into LLM context)
  │     Jailbreaking (bypassing safety filters through prompt engineering)
  │     Training data extraction (memorization of PII and secrets in training data)
  │     Insecure output handling (using LLM output in unsafe ways: code execution, HTML injection)
  │     Agentic LLM security (LLM agents with tool use — expanded attack surface)
  ├── AI in offensive security:
  │     AI-assisted phishing (personalized spear phishing at scale)
  │     Deepfakes for social engineering (synthetic voice, synthetic video)
  │     Automated vulnerability discovery (AI-assisted fuzzing, code analysis)
  │     AI-powered malware (evasion, adaptive C2)
  └── AI in defensive security:
        Anomaly detection (ML-based UEBA, network anomaly detection)
        AI-assisted threat hunting (pattern recognition in large datasets)
        Automated alert triage (reducing analyst workload)
        AI-generated YARA rules and Sigma rules

Advanced Concepts:
  ├── Federated learning security (distributed training attack surfaces)
  ├── AI supply chain attacks (compromised models in model hubs: HuggingFace)
  ├── Robustness testing for AI security tools (can your ML-based IDS be evaded?)
  └── Regulatory landscape for AI (EU AI Act, NIST AI RMF, ISO/IEC 42001)
```

---

## D18 → DevSecOps

```
Requires:    D4 (Programming — code is what DevSecOps secures)
             D5 (Web Technologies — web applications are the primary artifact)
             D6 (Cybersecurity Fundamentals — secure design principles)
             D11 (Cloud Security — modern DevSecOps is cloud-native) [recommended]
             D10 (Offensive Security — shift-left requires attacker thinking) [recommended]

Core Concepts:
  ├── Secure SDLC:
  │     Security requirements (abuse cases, security user stories)
  │     Threat modeling in design phase (STRIDE applied to architecture diagrams)
  │     Security design review (checklist and structured review)
  │     Code review for security (manual and tool-assisted)
  │     Security testing in QA phase
  │     Secure deployment practices
  ├── SAST (Static Application Security Testing):
  │     How SAST works (AST analysis, data flow analysis, taint tracking)
  │     Tools: Semgrep (rule-based, fast), CodeQL (semantic analysis), SonarQube
  │     Integrating SAST into CI pipeline (fail on high-severity findings)
  │     Reducing false positives (tuning, suppression with justification)
  ├── DAST (Dynamic Application Security Testing):
  │     How DAST works (attacking the running application)
  │     Tools: OWASP ZAP (open source), Burp Suite Enterprise, Nikto
  │     Integration into CI/CD (DAST against staging environment)
  ├── SCA (Software Composition Analysis):
  │     Why: 70-80% of modern codebases are open source dependencies
  │     Tools: Snyk, Dependabot, OWASP Dependency-Check, Black Duck
  │     SBOM (Software Bill of Materials — inventorying all dependencies)
  │     Vulnerability prioritization in SCA (reachability analysis)
  ├── Secrets management:
  │     Why secrets in code are catastrophically dangerous (GitGuardian statistics)
  │     Pre-commit hooks (detect-secrets, gitleaks — before secrets reach the repo)
  │     Secrets scanning in CI (scanning commit history for leaked secrets)
  │     Secrets management platforms (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault)
  │     Dynamic secrets (credentials that expire after use)
  ├── Container and IaC security:
  │     Container image scanning (Trivy — vulnerabilities in base images)
  │     Dockerfile best practices (non-root user, minimal base image, no secrets in layers)
  │     Infrastructure as Code scanning (Checkov, tfsec, KICS — misconfigs in Terraform, CloudFormation)
  │     Kubernetes security hardening (pod security standards, network policies, RBAC)
  └── CI/CD pipeline security:
        Pipeline as attack surface (poisoned pipeline execution — PPE)
        Branch protection rules (require PR review, no force push to main)
        Least privilege for pipeline service accounts
        Signed commits and artifact attestation (SLSA framework)
        Dependency pinning (pinning to SHA, not mutable tags)

Advanced Concepts:
  ├── Supply chain security (SLSA levels, sigstore, in-toto attestations)
  ├── Security champions program (embedding security knowledge in development teams)
  ├── Runtime application self-protection (RASP)
  └── API security testing automation (contract-based security testing, fuzzing APIs)
```

---

## D19 → Governance, Risk & Compliance

```
Requires:    D6 (Cybersecurity Fundamentals — risk language, controls taxonomy)
             D8 (IAM — identity governance is a core GRC domain)
             D9 (Defensive Security — security controls being governed)
             D2/D3 (OS and Networking — understand what's being protected)

Core Concepts:
  ├── Risk management frameworks:
  │     NIST Cybersecurity Framework (CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover)
  │     NIST Risk Management Framework (RMF — federal government and regulated industries)
  │     ISO/IEC 27001 (ISMS — information security management system)
  │     ISO/IEC 27002 (controls guidance — maps to 27001 Annex A)
  │     COBIT (IT governance — connects IT to business objectives)
  ├── Compliance requirements by vertical:
  │     GDPR (EU data protection — scope, lawful basis, rights, breach notification, DPO)
  │     HIPAA (US healthcare — PHI, covered entities, BAAs, safeguards)
  │     PCI DSS v4.0 (payment card data — 12 requirements, SAQ vs. full assessment)
  │     SOX (US public companies — IT general controls, financial data integrity)
  │     CCPA/CPRA (California — US state privacy law, similar to GDPR)
  ├── Security policies:
  │     Policy hierarchy (policy → standard → procedure → guideline)
  │     Acceptable use policy
  │     Information classification policy
  │     Access control policy
  │     Incident response policy
  │     Change management policy
  ├── Security auditing:
  │     Internal audit vs. external audit vs. penetration test
  │     Audit evidence (documentation, interviews, technical testing)
  │     Common audit frameworks (SOC 2 Type 1/Type 2, ISO 27001 certification)
  │     Audit finding classification (critical, high, medium, low, informational)
  ├── Business continuity and disaster recovery:
  │     BCP (Business Continuity Plan — how to operate during disruption)
  │     DRP (Disaster Recovery Plan — how to recover IT systems)
  │     RTO (Recovery Time Objective — how long you can be down)
  │     RPO (Recovery Point Objective — how much data loss is acceptable)
  │     Tabletop exercises (testing the plan without disrupting production)
  └── Vendor risk management:
        Inherent risk classification (data access, criticality of service)
        Security questionnaires (SIG, CAIQ)
        Contractual protections (DPAs, BAAs, right to audit)
        Continuous monitoring (vendor security ratings: BitSight, SecurityScorecard)

Advanced Concepts:
  ├── CISO skills (board communication, security budget justification, risk appetite)
  ├── Privacy engineering (privacy by design, data minimization, DPIA)
  ├── Security metrics for executives (risk dashboards, KRI vs. KPI)
  └── Regulatory enforcement landscape (GDPR fines, OCR enforcement actions, SEC cybersecurity rules)
```

---

# PART 4: CONCEPT MAP

A concept map documents the atomic units of knowledge within each domain — the individual ideas that must be understood, not just the topics that must be covered. Every concept below is a node in the knowledge graph. Each concept can be individually assessed, individually tracked, and individually retrieved by the AI Mentor.

## 4.1 Concept Map Notation

Each concept is listed as: `[CONCEPT_ID] Concept Name — one-line definition`

Concepts are tagged with their disclosure level:
- **L1** — Disclosed at beginner level (accessible without prior security knowledge)
- **L2** — Disclosed at intermediate level (requires L1 concepts in the domain)
- **L3** — Disclosed at advanced level (requires L2 + adjacent domain concepts)
- **L4** — Disclosed at expert level (requires mastery of multiple domains)

---

## D1: Computer Basics Concepts

```
[CB-01] L1  Binary number system — representing any value using only 0 and 1
[CB-02] L1  Hexadecimal — base-16 shorthand for binary, used pervasively in security tools
[CB-03] L1  CPU — executes program instructions in the fetch-decode-execute cycle
[CB-04] L1  RAM — volatile memory where running programs and their data are stored
[CB-05] L1  Storage — persistent memory (HDD, SSD) where files survive power-off
[CB-06] L1  Process — a running instance of a program with its own memory space
[CB-07] L1  Thread — a unit of execution within a process, sharing the process's memory
[CB-08] L1  Virtualization — creating software-simulated computers (VMs) on physical hardware
[CB-09] L2  System calls — the interface through which programs request OS kernel services
[CB-10] L2  User space vs. kernel space — the fundamental privilege boundary in operating systems
[CB-11] L2  Memory segmentation — text (code), data (globals), stack (local vars), heap (dynamic)
[CB-12] L2  Stack — LIFO memory region used for function calls, local variables, return addresses
[CB-13] L2  Heap — dynamically allocated memory managed by malloc/free or equivalent
[CB-14] L3  Virtual memory — OS abstraction giving each process its own address space
[CB-15] L3  Paging — virtual memory pages mapped to physical frames via page tables
[CB-16] L3  NX/XD bit — hardware flag marking memory pages as non-executable (exploit mitigation)
[CB-17] L3  Endianness — byte order: big-endian (MSB first) vs. little-endian (LSB first)
[CB-18] L4  TPM — dedicated security chip for cryptographic operations and secure boot
[CB-19] L4  SMEP/SMAP — CPU features preventing kernel from executing/reading user-space memory
[CB-20] L4  Hardware interrupt handling — CPU suspends execution to service hardware events
```

---

## D2: Operating Systems Concepts

```
WINDOWS
[OS-W01] L1  NTFS — Windows file system with permissions, journaling, alternate data streams
[OS-W02] L1  Windows Registry — hierarchical key-value database for system/app configuration
[OS-W03] L1  Windows user accounts — local users, administrators, and the SYSTEM account
[OS-W04] L1  Windows services — background processes managed by the Service Control Manager
[OS-W05] L1  UAC — prompts for elevation when administrator actions are requested
[OS-W06] L2  Windows Event Log — structured logs (Security, System, Application) with event IDs
[OS-W07] L2  PowerShell — task automation shell with full .NET access
[OS-W08] L2  NTLM authentication — challenge-response protocol used as fallback in Windows
[OS-W09] L2  Alternate Data Streams (ADS) — NTFS feature allowing hidden data attached to a file
[OS-W10] L2  Windows Defender / Defender for Endpoint — built-in AV and EDR
[OS-W11] L3  Active Directory — domains, forests, OUs, GPOs, trusts
[OS-W12] L3  Kerberos (Windows) — network authentication protocol used in AD environments
[OS-W13] L3  LSASS — Local Security Authority Subsystem; stores credentials in memory
[OS-W14] L3  Windows access tokens — objects representing a process or thread's security context
[OS-W15] L3  WMI — Windows Management Instrumentation; abused for lateral movement/persistence
[OS-W16] L3  LOLBins — legitimate Windows binaries abused by attackers to evade detection
[OS-W17] L4  NTDS.dit — Active Directory database containing all user and password hashes
[OS-W18] L4  AppLocker / WDAC — application whitelisting controls

LINUX
[OS-L01] L1  Linux file system hierarchy — /etc/, /home/, /var/, /proc/, /usr/ — what lives where
[OS-L02] L1  Permissions model — rwx for owner, group, and others; represented in octal
[OS-L03] L1  Users and groups — /etc/passwd and /etc/shadow; UID 0 = root
[OS-L04] L1  Package management — apt/dpkg (Debian), yum/rpm (Red Hat)
[OS-L05] L1  SSH — secure remote shell; key-based vs. password authentication
[OS-L06] L2  SUID/SGID bits — executable runs with owner's privileges regardless of caller
[OS-L07] L2  Bash scripting — variables, loops, conditionals, pipes, redirection
[OS-L08] L2  Process management — ps, top, kill; PID/PPID; zombie and orphan processes
[OS-L09] L2  Syslog / journald — /var/log/auth.log, /var/log/syslog
[OS-L10] L3  Linux capabilities — fine-grained privilege replacing binary root/non-root
[OS-L11] L3  SELinux / AppArmor — mandatory access control (MAC) systems
[OS-L12] L3  Namespaces and cgroups — OS primitives underlying container isolation
[OS-L13] L3  LD_PRELOAD — dynamic linker var used to inject shared libraries at startup
[OS-L14] L4  Linux kernel security modules — extension points for MAC and custom policies
[OS-L15] L4  Auditd — kernel auditing subsystem for detailed system call logging
```

---

## D3: Networking Concepts

```
[NET-01] L1  OSI model — 7-layer reference model (Physical through Application)
[NET-02] L1  TCP/IP model — 4-layer practical model (Network Access, Internet, Transport, Application)
[NET-03] L1  IP address — 32-bit (IPv4) or 128-bit (IPv6) network interface identifier
[NET-04] L1  Subnet mask / CIDR — defines network portion vs. host portion of an IP
[NET-05] L1  MAC address — 48-bit hardware address for layer 2 (Ethernet) communication
[NET-06] L1  ARP — maps IP addresses to MAC addresses on the local network
[NET-07] L1  DNS — resolves domain names to IP addresses (A, AAAA, MX, CNAME, TXT, PTR records)
[NET-08] L1  DHCP — auto-assigns IP, gateway, DNS to hosts (DORA process)
[NET-09] L1  TCP three-way handshake — SYN → SYN-ACK → ACK
[NET-10] L1  UDP — connectionless transport; no delivery guarantee, lower overhead
[NET-11] L1  HTTP — methods, status codes, headers, cookies
[NET-12] L1  Packet capture — recording network traffic (Wireshark, tcpdump)
[NET-13] L2  TCP state machine — LISTEN, SYN_SENT, ESTABLISHED, FIN_WAIT, TIME_WAIT, CLOSED
[NET-14] L2  Nmap — TCP SYN scan, service detection, OS detection
[NET-15] L2  Firewall — filters traffic based on rules; stateful vs. stateless
[NET-16] L2  NAT — translates private IPs to public IPs for internet routing
[NET-17] L2  VPN — encrypts traffic and tunnels it through untrusted networks
[NET-18] L2  Routing — forwarding packets toward destination across multiple networks
[NET-19] L2  VLANs — layer 2 isolation of broadcast domains
[NET-20] L2  HTTPS — HTTP over TLS
[NET-21] L3  TCP SYN flood — DoS sending SYN packets without completing handshakes
[NET-22] L3  ARP poisoning — fraudulent ARP replies to redirect layer 2 traffic
[NET-23] L3  DNS spoofing — returning malicious DNS responses to redirect connections
[NET-24] L3  MITM — attacker silently relays/modifies communication between two parties
[NET-25] L3  NetFlow / IPFIX — exporting network flow metadata for analysis
[NET-26] L3  SMB — Windows file sharing protocol; EternalBlue exploit vector
[NET-27] L3  LDAP — protocol for querying Active Directory
[NET-28] L3  Wireshark display filters — BPF-based packet filtering
[NET-29] L4  BGP hijacking — rerouting internet traffic via fraudulent routing announcements
[NET-30] L4  Protocol fuzzing — malformed protocol messages to discover implementation bugs
```

---

## D4: Programming Concepts

```
[PROG-01] L1  Variables and data types — named storage with type constraints
[PROG-02] L1  Control flow — if/else, for, while — conditional and iterative execution
[PROG-03] L1  Functions — named reusable blocks with inputs and outputs
[PROG-04] L1  File I/O — reading/writing files; context managers in Python
[PROG-05] L1  Error handling — try/except/finally; recovering from failure conditions
[PROG-06] L1  Shell scripting — bash variables, loops, pipes, redirection
[PROG-07] L1  SQL SELECT — filtering, sorting, and joining relational data
[PROG-08] L1  Regular expressions — pattern matching, extraction, substitution
[PROG-09] L2  Python modules — os, sys, re, json, subprocess for security automation
[PROG-10] L2  Socket programming — raw TCP/UDP connections from code
[PROG-11] L2  HTTP from code — Python requests library for web automation
[PROG-12] L2  SQL injection mechanics — exploiting unparameterized queries
[PROG-13] L3  OOP — classes, methods, inheritance, encapsulation
[PROG-14] L3  Scapy — Python library for crafting and receiving arbitrary network packets
[PROG-15] L3  C memory model — pointers, malloc/free, buffer operations
[PROG-16] L3  JavaScript event model — DOM, handlers, async — for XSS understanding
[PROG-17] L4  x86 assembly — registers, instructions, stack mechanics
[PROG-18] L4  Shellcode — position-independent machine code used as exploit payloads
```

---

## D5: Web Technologies Concepts

```
[WEB-01] L1  HTTP methods — GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
[WEB-02] L1  HTTP status codes — 2xx, 3xx, 4xx, 5xx
[WEB-03] L1  HTTP headers — Content-Type, Authorization, Cookie, Set-Cookie, etc.
[WEB-04] L1  Cookies — browser-stored data sent with every request to the origin
[WEB-05] L1  Sessions — server-side state identified by a session token in a cookie
[WEB-06] L1  HTTPS — HTTP + TLS for confidentiality and integrity
[WEB-07] L2  TLS handshake — cipher suite negotiation, cert exchange, session key establishment
[WEB-08] L2  JWT — header.payload.signature (Base64URL); signed, optionally encrypted
[WEB-09] L2  OAuth2 authorization code flow — secure delegated access
[WEB-10] L2  Same-Origin Policy — browser prevents cross-origin response reads
[WEB-11] L2  CORS — controlled exceptions to SOP via Access-Control headers
[WEB-12] L2  Content Security Policy — restricts what resources a page may load
[WEB-13] L2  REST API — resource-oriented URLs, HTTP verbs as CRUD
[WEB-14] L3  Cookie security attributes — HttpOnly, Secure, SameSite
[WEB-15] L3  JWT algorithm confusion — none algorithm, HS256/RS256 confusion attacks
[WEB-16] L3  OAuth2 vulnerabilities — CSRF, open redirect, implicit token leakage
[WEB-17] L3  SAML vulnerabilities — XML signature wrapping, XXE in assertions
[WEB-18] L3  WebSockets — bidirectional persistent connection; bypasses some HTTP controls
[WEB-19] L4  GraphQL — introspection exposure, missing field-level authorization
[WEB-20] L4  HTTP/2 specifics — HPACK compression, stream multiplexing security
```

---

## D6: Cybersecurity Fundamentals Concepts

```
[SEC-01] L1  CIA Triad — Confidentiality, Integrity, Availability
[SEC-02] L1  Vulnerability — a weakness that could be exploited
[SEC-03] L1  Threat — a potential cause of harm
[SEC-04] L1  Risk — likelihood × impact of a threat exploiting a vulnerability
[SEC-05] L1  Exploit — code or technique that abuses a vulnerability
[SEC-06] L1  Attack surface — all points where an attacker could try to enter
[SEC-07] L1  Defense in depth — multiple independent security layers
[SEC-08] L1  Least privilege — only the permissions needed for the task
[SEC-09] L2  Authentication — verifying identity
[SEC-10] L2  Authorization — determining what an authenticated identity may do
[SEC-11] L2  Non-repudiation — an action cannot be denied after the fact
[SEC-12] L2  Threat modeling — structured identification of threats and mitigations
[SEC-13] L2  STRIDE — Spoofing, Tampering, Repudiation, Info Disclosure, DoS, EoP
[SEC-14] L2  Risk treatment — Accept, Mitigate, Transfer, Avoid
[SEC-15] L2  Security controls — technical/administrative/physical risk reducers
[SEC-16] L2  Zero trust — never trust, always verify; no implicit trust by location
[SEC-17] L3  Lockheed Martin Kill Chain — Recon→Weaponize→Deliver→Exploit→Install→C2→Act
[SEC-18] L3  MITRE ATT&CK — adversary tactics and techniques observed in real attacks
[SEC-19] L3  Fail-safe defaults — deny by default; explicit grant required
[SEC-20] L3  Separation of duties — no single person completes a sensitive task alone
[SEC-21] L4  Security through obscurity — fails as primary control; marginal layer value only
[SEC-22] L4  Adversarial mindset — asking "how would I attack this?" before deploying
```

---

## D7: Cryptography Concepts

```
[CRYPT-01] L1  Encryption — plaintext → ciphertext via key; reversed with key
[CRYPT-02] L1  Symmetric encryption — same key for encrypt and decrypt
[CRYPT-03] L1  Asymmetric encryption — public key encrypts, private key decrypts
[CRYPT-04] L1  Hash function — one-way, fixed-size digest; deterministic
[CRYPT-05] L1  AES — dominant symmetric cipher (AES-128/192/256)
[CRYPT-06] L1  Salt — random value added pre-hash to defeat rainbow tables
[CRYPT-07] L2  Block cipher modes — ECB (insecure), CBC, CTR, GCM
[CRYPT-08] L2  RSA — asymmetric cipher based on integer factorization
[CRYPT-09] L2  ECC — asymmetric crypto with smaller keys than RSA
[CRYPT-10] L2  Digital signature — proves authorship and integrity
[CRYPT-11] L2  HMAC — keyed hash providing integrity + authentication
[CRYPT-12] L2  Diffie-Hellman — shared secret establishment over a public channel
[CRYPT-13] L2  PKI — CAs, certificates, and trust chains for public key distribution
[CRYPT-14] L2  Password hashing — bcrypt, Argon2, PBKDF2 (slow by design)
[CRYPT-15] L2  TLS — encrypted, authenticated channel over TCP
[CRYPT-16] L3  Perfect forward secrecy — ephemeral keys protect past sessions
[CRYPT-17] L3  ECB mode vulnerability — identical blocks produce identical ciphertext
[CRYPT-18] L3  Padding oracle attack — decrypt ciphertext via padding error messages
[CRYPT-19] L3  Timing attack — infer secrets from execution time differences
[CRYPT-20] L3  Certificate pinning — hardcoded expected cert to block MITM
[CRYPT-21] L4  Post-quantum cryptography — CRYSTALS-Kyber, Dilithium (NIST PQC)
[CRYPT-22] L4  Zero-knowledge proof — prove knowledge without revealing the secret
[CRYPT-23] L4  HSM — tamper-resistant device for cryptographic key operations
```

---

## D8: IAM Concepts

```
[IAM-01] L1  Authentication factors — know/have/are; MFA = different categories combined
[IAM-02] L1  Password — most common but weakest authentication credential
[IAM-03] L1  MFA — two or more factors; dramatically reduces account takeover risk
[IAM-04] L1  TOTP — 6-digit code from shared secret + timestamp
[IAM-05] L1  SSO — authenticate once, access multiple services
[IAM-06] L2  SAML 2.0 — XML-based federation SSO (Okta, Azure AD, ADFS)
[IAM-07] L2  OAuth2 — authorization delegation framework
[IAM-08] L2  OpenID Connect — identity layer on OAuth2; provides ID tokens
[IAM-09] L2  Kerberos — TGT → service ticket authentication flow
[IAM-10] L2  LDAP — protocol for querying directory services
[IAM-11] L2  PAM (Privileged Access Management) — controlling privileged accounts
[IAM-12] L2  RBAC — roles carry permissions; users carry roles
[IAM-13] L3  Pass-the-hash — using NTLM hash without plaintext password
[IAM-14] L3  Pass-the-ticket — Kerberos ticket injection for impersonation
[IAM-15] L3  Kerberoasting — SPN ticket request → offline service account cracking
[IAM-16] L3  AS-REP Roasting — attacking accounts with pre-auth disabled
[IAM-17] L3  Golden Ticket — forged TGT via krbtgt hash; persistent privileged access
[IAM-18] L3  FIDO2 / WebAuthn — phishing-resistant hardware-bound authentication
[IAM-19] L4  DCSync — replicating NTDS.dit hashes via AD replication rights abuse
[IAM-20] L4  BloodHound — graph-based AD attack path analysis
```

---

## D9–D19 Concepts (Summary — full concept taxonomy in lesson metadata)

```
DEFENSIVE SECURITY [DEF-XX]
[DEF-01] L1  SIEM — aggregates logs; enables search, alert, correlation
[DEF-02] L1  IDS/IPS — signature and anomaly-based network/host detection
[DEF-03] L1  EDR — endpoint behavior monitoring with remote response capability
[DEF-04] L1  Vulnerability scanner — identifies known CVEs in systems
[DEF-05] L1  Patch management — systematic security update application
[DEF-06] L2  CVSS — standardized vulnerability severity scoring
[DEF-07] L2  CIS Benchmarks / DISA STIGs — OS hardening baselines
[DEF-08] L2  SPF/DKIM/DMARC — email authentication against spoofing
[DEF-09] L2  SIEM correlation rule — fires alert on matching event patterns
[DEF-10] L3  Threat hunting — proactive search for undetected threats
[DEF-11] L3  SOAR — automated security orchestration and response playbooks
[DEF-12] L3  Honeypot / honeytoken — decoy assets that detect attackers on contact
[DEF-13] L3  Sigma rules — SIEM-agnostic detection rule standard
[DEF-14] L3  YARA rules — pattern-matching for malware identification
[DEF-15] L4  UEBA — ML-based anomaly detection on user/entity behavior
[DEF-16] L4  ATT&CK coverage mapping — measurable detection coverage

OFFENSIVE SECURITY [OFF-XX]
[OFF-01] L1  Penetration testing — authorized simulated attack
[OFF-02] L1  Scope — agreed boundary of what may/may not be tested
[OFF-03] L1  OSINT — intelligence from public sources
[OFF-04] L2  Nmap (offensive) — port/service/OS enumeration
[OFF-05] L2  Burp Suite — web proxy for intercepting/modifying HTTP
[OFF-06] L2  Metasploit — exploitation framework with searchable module database
[OFF-07] L2  SQL injection — database manipulation via unparameterized input
[OFF-08] L2  XSS — JavaScript injection executing in victim browsers
[OFF-09] L2  CSRF — victim's browser makes unintended authenticated requests
[OFF-10] L2  SSRF — server makes requests to internal resources
[OFF-11] L2  Privilege escalation — gaining higher privileges than initially obtained
[OFF-12] L3  Password spraying — one password across many accounts
[OFF-13] L3  Hashcat — GPU-accelerated hash cracking
[OFF-14] L3  Lateral movement — moving from compromised host to other hosts
[OFF-15] L3  Post-exploitation persistence — surviving reboots
[OFF-16] L3  Defense evasion — obfuscation, LOLBins, process injection
[OFF-17] L3  Phishing — deceptive communication for credential theft/malware delivery
[OFF-18] L4  C2 framework — infrastructure for persistent remote control
[OFF-19] L4  AD full compromise chain — foothold → domain admin

CLOUD SECURITY [CLD-XX]
[CLD-01] L1  Shared responsibility model — provider secures infra; customer secures workloads
[CLD-02] L1  IaaS/PaaS/SaaS — service models with different responsibility splits
[CLD-03] L2  Cloud IAM — policies granting identities permissions on resources
[CLD-04] L2  VPC — logically isolated network within cloud
[CLD-05] L2  Security groups — stateful firewall attached to cloud instances
[CLD-06] L2  CloudTrail / Audit Logs — every API call recorded
[CLD-07] L3  IMDS credential theft — SSRF → metadata endpoint → IAM role credentials
[CLD-08] L3  IAM privilege escalation — chaining permissions to reach admin
[CLD-09] L3  Container/Kubernetes security — non-root, image scanning, RBAC, network policies
[CLD-10] L3  IaC scanning — Checkov/tfsec finding misconfigs in Terraform/CloudFormation
[CLD-11] L4  CSPM — continuous cloud misconfiguration detection

THREAT INTELLIGENCE [TI-XX]
[TI-01] L1  IOC — observable artifact of compromise (hash, IP, domain, registry key)
[TI-02] L1  Threat actor — entity conducting attacks
[TI-03] L2  Pyramid of Pain — hierarchy by how hard IOCs are for attackers to change
[TI-04] L2  ATT&CK tactics — 14 categories from Reconnaissance to Impact
[TI-05] L2  Diamond Model — Adversary/Infrastructure/Capability/Victim correlation
[TI-06] L3  STIX 2.1 — standard JSON format for threat intelligence
[TI-07] L3  APT — sophisticated long-dwell adversary, typically nation-state

INCIDENT RESPONSE [IR-XX]
[IR-01] L1  Incident — event that has/may negatively impact CIA
[IR-02] L1  PICERL — Preparation/Identification/Containment/Eradication/Recovery/Lessons Learned
[IR-03] L2  Chain of custody — documented evidence integrity
[IR-04] L2  Order of volatility — RAM before disk; collect most volatile first
[IR-05] L3  MTTD/MTTR — Mean Time to Detect / Mean Time to Respond

DIGITAL FORENSICS [DFIR-XX]
[DFIR-01] L2  Forensic image — bit-for-bit copy with hash verification
[DFIR-02] L2  MFT — NTFS metadata recording all file system activity
[DFIR-03] L2  Volatility — memory forensics: processes, network, credentials from RAM
[DFIR-04] L3  Timeline analysis — correlating artifacts to reconstruct attacker activity
[DFIR-05] L3  Prefetch / ShimCache / AmCache — Windows execution evidence artifacts

MALWARE ANALYSIS [MAL-XX]
[MAL-01] L1  Malware taxonomy — virus, worm, trojan, ransomware, rootkit, RAT, dropper
[MAL-02] L2  Static analysis — file analysis without execution (strings, PE headers, VirusTotal)
[MAL-03] L2  Dynamic analysis — controlled execution in sandbox (Cuckoo, AnyRun)
[MAL-04] L2  C2 beaconing — malware phoning home on interval for commands
[MAL-05] L3  DGA — domain generation algorithm for resilient C2 infrastructure
[MAL-06] L3  Process injection — code injected into legitimate process to hide malware

REVERSE ENGINEERING [RE-XX]
[RE-01] L2  Disassembly — machine code → assembly mnemonics (IDA, Ghidra)
[RE-02] L2  Decompilation — machine code → approximate C pseudocode
[RE-03] L3  Buffer overflow — overwriting return address to redirect execution
[RE-04] L3  ROP chain — chaining existing code gadgets to execute arbitrary logic
[RE-05] L4  Heap exploitation — use-after-free, tcache poisoning

AI SECURITY [AIS-XX]
[AIS-01] L1  Adversarial examples — inputs crafted to fool trained ML models
[AIS-02] L2  Prompt injection — inserting instructions to override LLM behavior
[AIS-03] L2  Jailbreaking — bypassing LLM safety filters via prompt engineering
[AIS-04] L3  Model poisoning — corrupting training data to degrade or backdoor a model
[AIS-05] L3  Insecure LLM output handling — passing output to OS/SQL/HTML unsanitized

DEVSECOPS [DSO-XX]
[DSO-01] L1  SAST — source code security analysis without running the program
[DSO-02] L1  DAST — testing the running application from the outside
[DSO-03] L2  SCA — vulnerabilities in third-party dependencies
[DSO-04] L2  SBOM — complete inventory of software components
[DSO-05] L3  Secrets in code — hardcoded credentials detectable with gitleaks
[DSO-06] L3  SLSA — supply-chain integrity framework

GRC [GRC-XX]
[GRC-01] L1  NIST CSF 2.0 — Govern/Identify/Protect/Detect/Respond/Recover
[GRC-02] L1  Risk register — documented risks with likelihood, impact, treatment
[GRC-03] L2  GDPR — EU personal data regulation; 72-hour breach notification
[GRC-04] L2  PCI DSS — 12 requirements for cardholder data protection
[GRC-05] L2  ISO 27001 — international ISMS standard
[GRC-06] L3  SOC 2 Type 2 — audited trust service criteria report over time
[GRC-07] L3  RTO/RPO — recovery time and data-loss objectives for BCP/DR
```

---

# PART 5: LEARNING PATHS

A learning path is an ordered sequence of domains, courses, and modules designed for a specific career destination. Each path specifies required and optional domains, a capstone challenge, career outcomes, and certification alignment.

---

## PATH-1: Foundational (General Cybersecurity)

**Purpose:** Complete foundational knowledge every security professional needs regardless of specialization.

**Entry requirement:** None.

**Estimated duration:** 80–120 hours

**Domain sequence:**
```
Phase 1 — Technical Foundations:
  D1: Computer Basics              (required)
  D2: Operating Systems            (required — both Windows and Linux tracks)
  D3: Networking                   (required)
  D4: Programming                  (required — Python + Bash)
  D5: Web Technologies             (required)

Phase 2 — Security Mindset:
  D6: Cybersecurity Fundamentals   (required)

Phase 3 — Core Security:
  D7: Cryptography                 (required)
  D8: IAM                          (required)
  D9: Defensive Security           (required — overview level)
  D10: Offensive Security          (required — overview level)
```

**Required concepts by path completion:** All L1 concepts in D1–D10; all L2 concepts in D1–D8; L2 overview concepts in D9–D10.

**Capstone:** Multi-domain scenario — learner receives a fictional company profile and must (1) identify the primary attack surface, (2) explain which logs would detect a given attack, (3) select appropriate cryptographic controls for three data types.

**Career outcome:** Junior Security Analyst, SOC Tier 1

**Certification alignment:** CompTIA Security+, ISC2 CC

---

## PATH-2: SOC Analyst

**Entry requirement:** PATH-1 complete (or equivalent)

**Estimated duration:** 60–90 additional hours

**Domain sequence:**
```
D9: Defensive Security — deep dive      (required)
D10: Offensive Security — complete      (required)
D12: Threat Intelligence                (required)
D13: Incident Response                  (required)
D8: IAM — advanced AD attack concepts   (required)
```

**Required concepts:** All L1–L3 in D9; L1–L2 in D10, D12, D13; IAM-13 through IAM-17.

**Capstone:** Simulated SOC shift — triage a day's alerts, escalate the P1 correctly, write a brief incident report, propose one new detection rule.

**Career outcome:** SOC Analyst Tier 1/2, Security Operations Engineer

**Certification alignment:** CompTIA CySA+, EC-Council CND, Microsoft SC-200

---

## PATH-3: Penetration Tester

**Entry requirement:** PATH-1 complete

**Estimated duration:** 80–120 additional hours

**Domain sequence:**
```
D10: Offensive Security — complete           (required)
D5: Web Technologies — advanced              (required)
D8: IAM — AD attacks complete                (required)
D4: Programming — C basics + Python adv.     (required)
```

**Required concepts:** All L1–L3 in D10; L1–L3 in D5; L1–L3 in D8; PROG-15 (C memory model), PROG-17 (assembly intro).

**Optional enrichment:** D15 (Malware Analysis), D11 (Cloud), D16 (RE)

**Capstone:** Full lab penetration test — recon, exploit two vulnerabilities (one network, one web), escalate privileges, deliver professional report.

**Career outcome:** Penetration Tester, Ethical Hacker, Junior Red Team Operator

**Certification alignment:** OSCP, CompTIA PenTest+, eJPT, CEH

---

## PATH-4: Cloud Security Engineer

**Entry requirement:** PATH-1 complete

**Estimated duration:** 70–100 additional hours

**Domain sequence:**
```
D11: Cloud Security — complete                      (required)
D8: IAM — cloud IAM, OAuth2/OIDC                   (required)
D18: DevSecOps                                      (required)
D10: Offensive Security — cloud attack subset       (required)
```

**Capstone:** Receive a Terraform configuration with intentional misconfigurations — identify all issues via IaC scanning + manual review, prioritize by risk, propose remediated configs.

**Career outcome:** Cloud Security Engineer, AWS/Azure Security Specialist

**Certification alignment:** AWS Security Specialty, AZ-500, CCSP, Google Professional Cloud Security Engineer

---

## PATH-5: DFIR Analyst

**Entry requirement:** PATH-1 + PATH-2 complete (or equivalent)

**Estimated duration:** 60–90 additional hours

**Domain sequence:**
```
D14: Digital Forensics — complete           (required)
D13: Incident Response — advanced           (required)
D12: Threat Intelligence                    (required)
D10: Offensive Security — post-exploitation (required)
D15: Malware Analysis — static + dynamic    (required)
```

**Capstone:** Investigate a forensic image + memory dump from a compromised Windows host — reconstruct attack timeline, identify patient zero, extract malware, determine exfiltrated data, deliver structured incident report.

**Career outcome:** DFIR Analyst, Digital Forensics Examiner, IR Analyst

**Certification alignment:** GCFE, GCFA, GCIH, EnCE

---

## PATH-6: Malware Analyst

**Entry requirement:** PATH-1 + PATH-3 (or equivalent offensive knowledge)

**Estimated duration:** 60–90 additional hours

**Domain sequence:**
```
D15: Malware Analysis — complete        (required)
D16: Reverse Engineering — static + dynamic (required)
D14: Digital Forensics                  (required)
```

**Capstone:** Analyze three unknown samples (dropper, RAT, ransomware) — family ID, behavioral report, IOC list, YARA rule, kill chain summary.

**Career outcome:** Malware Analyst, Threat Researcher, Reverse Engineer

**Certification alignment:** GREM, GCFE

---

## PATH-7: Security Engineer

**Entry requirement:** PATH-1 + PATH-2 + D4 advanced programming

**Estimated duration:** 60–90 additional hours

**Domain sequence:**
```
D9: Defensive Security — advanced (SOAR, deception)    (required)
D11: Cloud Security                                    (required)
D18: DevSecOps                                         (required)
D10: Offensive Security — complete                     (required)
```

**Capstone:** Design a security monitoring stack for a fictional org — SIEM integration, EDR coverage, identity monitoring, CSPM, automated response playbooks; justify each against NIST CSF.

**Career outcome:** Security Engineer, Detection Engineer, Junior Security Architect

**Certification alignment:** CompTIA CySA+, CISSP (with experience), AWS Security Specialty

---

## PATH-8: Application Security Engineer

**Entry requirement:** PATH-1 + strong D4 + D5 mastery

**Estimated duration:** 70–100 additional hours

**Domain sequence:**
```
D10: Offensive Security — web focus     (required)
D5: Web Technologies — advanced         (required)
D18: DevSecOps — complete               (required)
D8: IAM — OAuth2/OIDC implementation    (required)
```

**Capstone:** Assess a GitHub repo — STRIDE threat model, SAST + SCA triage, two manual code review findings, secure code fixes, DAST CI/CD integration proposal.

**Career outcome:** Application Security Engineer, Product Security Engineer

**Certification alignment:** GWEB, CSSLP, OSWE

---

## PATH-9: GRC Analyst

**Entry requirement:** PATH-1 complete

**Estimated duration:** 60–90 additional hours

**Domain sequence:**
```
D19: GRC — complete                     (required)
D9: Defensive Security — conceptual     (required)
D8: IAM — conceptual                    (required)
D6: Cybersecurity Fundamentals — adv.   (required)
```

**Capstone:** Risk assessment for a fictional healthcare org — applicable regulations, NIST CSF 2.0 gap analysis, risk register (10 risks prioritized), 5 remediation recommendations with budget justification.

**Career outcome:** GRC Analyst, Compliance Manager, Risk Manager, ISO

**Certification alignment:** CISM, CRISC, CISA, CISSP, ISO 27001 Lead Auditor

---

## PATH-10: Threat Hunter

**Entry requirement:** PATH-2 complete + D12 Threat Intelligence

**Estimated duration:** 50–70 additional hours

**Domain sequence:**
```
D12: Threat Intelligence — advanced ATT&CK mapping      (required)
D9: Defensive Security — advanced UEBA/detection        (required)
D10: Offensive Security — complete                      (required)
D14: Digital Forensics — artifact identification focus  (required)
```

**Capstone:** Given a TI report on a specific APT — map TTPs to ATT&CK, identify detectable techniques, write 3 SIEM hunt queries, propose detections for uncovered techniques.

**Career outcome:** Threat Hunter, Senior SOC Analyst, Detection Engineer

**Certification alignment:** GCIH, GCIA, CompTIA CySA+

---

## PATH-11: AI Security Specialist

**Entry requirement:** PATH-1 + D4 (Python + ML libraries) + D5 + one of PATH-3 or PATH-8

**Estimated duration:** 60–80 additional hours

**Domain sequence:**
```
D17: AI Security — complete         (required)
D11: Cloud Security                 (required)
D10: Offensive Security — social engineering + API focus (required)
```

**Capstone:** Security assessment of a fictional LLM chatbot application — attack surface enumeration, prompt injection testing, training data extraction attempt, insecure output handling test, remediation report.

**Career outcome:** AI Security Engineer, ML Security Researcher, AI Red Team Operator

**Certification alignment:** Emerging domain — no established cert. Relevant: OSCP, AWS ML Specialty.

---

# PART 6: PREREQUISITE MATRIX

## 6.1 Domain-Level Prerequisites

| Domain | Required Before Starting | Recommended Before Starting | Can Run In Parallel |
|--------|--------------------------|-----------------------------|--------------------|
| D1: Computer Basics | None | None | D2/D3 (prior knowledge) |
| D2: Operating Systems | D1 | — | D3 |
| D3: Networking | D1 | — | D2 |
| D4: Programming | D1 | D2 | D3, D5 |
| D5: Web Technologies | D3 | D4 at 50% | D4 (second half) |
| D6: Cybersecurity Fund. | D1, D2, D3 | D4 at 50% | D4/D5 second halves |
| D7: Cryptography | D1, D6 | D4 | D8 (second half) |
| D8: IAM | D2, D3, D7 | D6 | D9 (first quarter) |
| D9: Defensive Security | D2, D3, D6 | D8 | D10 (with caution) |
| D10: Offensive Security | D2, D3, D4, D5, D6, D8 | D7 | D9 (with caution) |
| D11: Cloud Security | D2, D3, D7, D8 | D6 | D18 (second half) |
| D12: Threat Intelligence | D3, D6 | D9, D10 | D13 |
| D13: Incident Response | D2, D3, D9 | D6 | D14 |
| D14: Digital Forensics | D2, D3, D7 | D13 | D15 (second half) |
| D15: Malware Analysis | D2, D4, D6 | D14 | D16 (second half) |
| D16: Reverse Engineering | D1, D4 (C + asm) | D15 | — |
| D17: AI Security | D4, D5, D6 | D10 | D11 |
| D18: DevSecOps | D4, D5, D6 | D10, D11 | D17 |
| D19: GRC | D6 | D8, D9 | All Tier 2+ |

---

## 6.2 Concept-Level Prerequisite Patterns

**Pattern A — Same-domain sequential:** L1 before L2 before L3 before L4. No exceptions within a domain.

**Pattern B — Cross-domain hard dependency (examples):**
- `[IAM-13] Pass-the-hash` requires `[OS-W08] NTLM` + `[IAM-02] Password` + `[OFF-06] Metasploit`
- `[RE-03] Buffer overflow` requires `[CB-12] Stack` + `[CB-13] Heap` + `[PROG-15] C memory model` + `[PROG-17] x86 assembly`
- `[CLD-07] IMDS credential theft` requires `[OFF-10] SSRF` + `[CLD-03] Cloud IAM` + `[CLD-04] IAM role`

**Pattern C — Recommended co-requisite (introduce in adjacent lessons):**
- `[NET-21] TCP SYN flood` + `[DEF-02] IDS/IPS` (attack and its detection together)
- `[DSO-01] SAST` + `[OFF-07] SQL injection` (the tool exists to prevent the attack)

**Pattern D — Should learn after (wrong order creates misconceptions):**
- `[SEC-06] Attack surface` before `[SEC-07] Defense in depth`
- `[CRYPT-01] Encryption` before `[CRYPT-08] RSA`
- `[IAM-02] Password` before `[IAM-13] Pass-the-hash`

---

## 6.3 Mastery Gates

Constitution Part 12 specifies 80% quiz threshold. The platform enforces:

1. **Quiz gate:** ≥80% on current lesson quiz before next lesson unlocks
2. **Practical gate:** Practical must be marked complete, not just attempted
3. **Domain gate:** Next domain unlocks only when all required prerequisite domain lessons pass both gates
4. **Path gate:** Capstone unlocks only when all required domains for the path are complete

---

## 6.4 Bypass Rules (Experienced Learners)

**Placement assessment:** 30-question multi-domain assessment covering L1 and L2 concepts across D1–D6. Score ≥80% on a domain's section → option to skip that domain's content and take the domain assessment directly.

**Manual skip:** Learner requests skip → focused L2 assessment for that domain → ≥80% marks domain complete → <80% reveals specific gaps with targeted review.

**Unverified assumption tracking:** Even with bypasses, the system flags concepts not formally verified. The AI Mentor proactively checks these when they become relevant in subsequent lessons.

---

# PART 7: DIFFICULTY CURVE

## 7.1 Difficulty Dimensions

| Dimension | Definition | Weight |
|-----------|------------|--------|
| Conceptual density | New concepts introduced per lesson | 30% |
| Prerequisite load | Prior concepts held in working memory simultaneously | 25% |
| Abstraction level | Abstract vs. concrete | 20% |
| Practical complexity | Scaffolded step-by-step → open challenge | 20% |
| Emotional intensity | Ethical weight of material (offensive techniques) | 5% |

---

## 7.2 Domain Difficulty Ratings

```
Domain                      Density  Prereq   Abstract  Practical  Emotional  Overall
────────────────────────────────────────────────────────────────────────────────────────
D1:  Computer Basics           2        1        2          1          1        1.7
D2:  Operating Systems         3        2        2          2          1        2.3
D3:  Networking                3        2        3          2          1        2.5
D4:  Programming               3        2        3          3          1        2.7
D5:  Web Technologies          3        3        3          2          1        2.8
D6:  Cybersecurity Fund.       2        3        4          1          2        2.8
D7:  Cryptography              3        3        5          2          1        3.2
D8:  IAM                       3        4        3          3          1        3.1
D9:  Defensive Security        4        4        3          3          2        3.5
D10: Offensive Security        4        5        3          4          5        4.0
D11: Cloud Security            4        4        4          3          1        3.6
D12: Threat Intelligence       3        4        4          3          2        3.4
D13: Incident Response         3        4        3          4          3        3.5
D14: Digital Forensics         4        4        3          4          2        3.6
D15: Malware Analysis          4        4        4          4          3        3.9
D16: Reverse Engineering       5        5        5          5          2        4.7
D17: AI Security               4        4        5          3          2        3.8
D18: DevSecOps                 3        4        3          4          1        3.4
D19: GRC                       3        3        4          2          2        3.0
```

---

## 7.3 Critical Difficulty Transitions

**Transition 1 — D3→D6 (Networking → Cybersecurity Fundamentals):**
Shift from "how computers work" to "how computers are attacked." Abstraction jumps.
Mitigation: Open D6 with a concrete real breach narrative, then extract abstract principles from it.
Review trigger: Retrieve TCP handshake, DNS, and HTTP before D6 begins.

**Transition 2 — D6→D7 (Fundamentals → Cryptography):**
Most abstractly mathematical topic in the curriculum. Risk of learner disengagement if introduced mechanically.
Mitigation: Lead with what cryptography does (function) before how it works (mechanism). Never require mathematical proof understanding.
Review trigger: Reinforce binary/hex before hash functions.

**Transition 3 — D8/D9→D10 (IAM/Defensive → Offensive):**
Largest difficulty jump in the curriculum. Highest emotional intensity. Five required prerequisites must all be complete.
Mitigation: First lesson in D10 must establish legal/ethical framework before any technique is introduced (Constitution Guardrail ETH1). D10 practicals begin at semi-guided scaffolding; move to independent only after demonstrated competence.
Review trigger: Retrieve TCP handshake, HTTP, UAC, authentication types before D10 begins.

**Transition 4 — D10/D14→D15 (Offensive/Forensics → Malware Analysis):**
Large simultaneous prerequisite load — OS internals, programming, networking, and offensive concepts all active at once.
Mitigation: Provide explicit prerequisite checklist at D15 start with links to prior lessons. Redirect non-ready learners.
Review trigger: Process injection concepts (D2), C memory model (D4), PE file structure overview.

**Transition 5 — D15→D16 (Malware Analysis → Reverse Engineering):**
Largest single-step difficulty jump (3.9→4.7). Assembly language is a genuine cognitive barrier.
Mitigation: D4 must include an Assembly Introduction module. D15 must end with a bridge module previewing what RE adds beyond dynamic analysis.
Gate: D4's advanced concepts (C + assembly) must pass an assessment before D16 unlocks.

---

## 7.4 Mandatory Review Lesson Positions

| Before Domain | Review Topics | Format |
|--------------|---------------|--------|
| D7: Cryptography | Binary/hex, XOR | 10-question retrieval quiz + worked examples |
| D10: Offensive Security | TCP/IP, HTTP, auth types, UAC | 5 scenario-based retrieval prompts |
| D13: Incident Response | Log formats, SIEM query basics | Short quiz + one SIEM query exercise |
| D15: Malware Analysis | PE structure, process model, API calls | Flashcard retrieval + one static analysis warm-up |
| D16: Reverse Engineering | C memory model, x86 registers, stack | Scored assessment — must ≥75% to unlock D16 |

---

## 7.5 Scaffolding Escalation by Domain

```
Level              Domains                        Description
────────────────────────────────────────────────────────────────────────────
Fully-guided       D1, D2, D3                     All steps provided; commands given
Semi-guided        D4, D5, D6                     Objectives + key hints; steps implicit
Independent        D7, D8, D9, D10 (early)        Objectives only; 3-level hints on request
Challenge-only     D10 (adv.), D12–D16            Scenario + goal only; no steps
Multi-concept      D10 capstone, path capstones   Interleaved concepts across domains
```

All practicals implement the Constitution's 3-level hint system (Guardrail S2):
- **Hint 1 (Nudge):** A directing question without revealing anything
- **Hint 2 (Direction):** A pointer toward the relevant technique or tool
- **Hint 3 (Reveal):** The specific next step — but not the complete solution

Labs additionally require: <30s provisioning, full network isolation, synthetic credentials (Constitution Part 24, Lab DoD).

---

# PART 8: SPIRAL LEARNING

Spiral learning tracks which core concepts are revisited across the curriculum, at what depth each time, and what new understanding is added at each revisitation. Constitution Guardrail R1 requires core concepts to appear in at least two subsequent lessons after introduction. This part documents the spiral structure formally so it can be verified.

## 8.1 How to Read the Spiral

Each entry below lists:
- **Concept:** The core idea being spiraled
- **Level 1 (Introduction):** Where it is first taught; what the learner understands at this point
- **Level 2 (Revisitation):** Where it reappears; what new dimension is added
- **Level 3 (Advanced application):** Where it is used at full depth
- **Level 4 (Expert synthesis):** Where it appears as a component of a larger expert concept (not all concepts reach this level)

---

## Core Concept Spirals

### SPIRAL-01: TCP/IP Protocol Stack

**L1 — Introduction (D3: Networking):**
The learner understands the four-layer model. TCP creates a reliable stream via a three-way handshake. UDP is connectionless. IP addresses route packets. DNS resolves names.

**L2 — Revisitation (D6: Cybersecurity Fundamentals):**
The learner sees TCP/IP as an attack surface. The handshake is now discussed as a target (SYN flood). DNS is now discussed as a target (DNS spoofing). The same protocol stack is reframed through the lens of trust boundaries.

**L3 — Advanced application (D10: Offensive Security):**
The learner uses TCP/IP for active attacks — Nmap SYN scans exploit TCP's half-open state. ARP poisoning requires deep Ethernet/IP layer knowledge. Network reconnaissance is built on the protocol stack's predictable behavior.

**L4 — Expert synthesis (D15: Malware Analysis):**
Malware's C2 communication is analyzed at the protocol level. DNS tunneling exploits DNS query structure. HTTPS C2 hides in legitimate TLS sessions. The learner traces C2 traffic by understanding protocol anomalies.

---

### SPIRAL-02: Authentication

**L1 — Introduction (D6: Cybersecurity Fundamentals):**
Authentication is one of the three AAA principles. The learner understands the concept of proving identity and why it matters for access control.

**L2 — Revisitation (D8: Identity & Access Management):**
Authentication is now specific: passwords, TOTP, FIDO2, Kerberos, SAML. The learner understands how each factor works mechanically and what its weaknesses are.

**L3 — Advanced application (D10: Offensive Security):**
Authentication is now an attack target. Pass-the-hash bypasses password authentication. Kerberoasting attacks service account authentication. OAuth2 implicit flow leaks access tokens. The learner knows not just how auth works but precisely where each mechanism breaks.

**L4 — Expert synthesis (D11: Cloud Security / D18: DevSecOps):**
Authentication appears in cloud IAM role assumption (attackers abusing legitimate role assumption flows), in JWT implementation bugs in web APIs, and in CI/CD pipeline service account misconfiguration. The same fundamental concept of "proving who you are" appears at every layer of the modern stack.

---

### SPIRAL-03: Encryption and Cryptography

**L1 — Introduction (D7: Cryptography):**
The learner understands what encryption is, what symmetric vs. asymmetric means, what hash functions do, and why password storage requires specialized hashing (not standard hashes).

**L2 — Revisitation (D9: Defensive Security / D5: Web Technologies):**
Encryption appears in TLS inspection by security tools (the defender's need to decrypt traffic to inspect it), in HTTPS as the baseline web security control, and in email encryption/signing (S/MIME, PGP) as a defensive measure.

**L3 — Advanced application (D10: Offensive Security / D16: RE):**
The learner attacks weak cryptography: SSL stripping attacks, JWT algorithm confusion, hash cracking, and padding oracle exploitation. In Reverse Engineering, encryption appears as an obfuscation technique — malware uses RC4 or XOR to hide strings from static analysis.

**L4 — Expert synthesis (D15: Malware Analysis):**
Ransomware cryptography analysis — identifying the encryption algorithm from static analysis, determining if decryption is theoretically feasible, and understanding how ransomware key management works (online key generation vs. offline) determines whether victim files are recoverable.

---

### SPIRAL-04: The Attacker's Mindset

**L1 — Introduction (D6: Cybersecurity Fundamentals):**
The attacker mindset is introduced abstractly — thinking adversarially about systems, asking "what could go wrong?" before "how do I build this?" The kill chain model is introduced as a thinking framework.

**L2 — Revisitation (D9: Defensive Security):**
The attacker mindset reappears in detection engineering — a defender who cannot think like an attacker cannot write detection rules that catch attacker behavior. SOC analysts are taught to ask "if I were the attacker, would this alert catch me?"

**L3 — Advanced application (D10: Offensive Security):**
The mindset is now embodied in practice. The learner is the attacker in every practical. Reconnaissance, exploitation, and post-exploitation are not abstract — they are actions the learner takes against a real target in a safe environment.

**L4 — Expert synthesis (D12: Threat Intelligence / D18: DevSecOps):**
In Threat Intelligence, the attacker mindset becomes threat actor modeling — predicting what specific adversaries will do based on their past behavior. In DevSecOps, it becomes threat modeling in SDLC — the STRIDE framework applied to software architecture before a line of code is written.

---

### SPIRAL-05: Operating System Internals

**L1 — Introduction (D2: Operating Systems):**
The learner understands the Windows Registry, Linux file permissions, user accounts, services, and event logging as operational concepts — how to use an OS.

**L2 — Revisitation (D9: Defensive Security):**
OS internals become the substrate for detection. Windows Event IDs (4624, 4625, 4688, 4720) become meaningful — each one represents a security-relevant OS event. Linux audit logs reveal system call activity. The OS internals the learner learned in D2 now generate the evidence the defender reads.

**L3 — Advanced application (D10: Offensive Security):**
OS internals become the target. UAC bypass exploits Windows token model. SUID binaries exploit Linux permission model. Registry run keys are persistence mechanisms. The OS the learner understood operationally is now understood as an attack surface.

**L4 — Expert synthesis (D14/D15: Forensics + Malware Analysis):**
OS internals become forensic evidence sources. Windows Prefetch, ShimCache, AmCache, and the MFT all encode execution history. Linux bash_history, auth.log, and auditd records reconstruct the attacker's session. At the malware level, rootkits manipulate OS data structures (SSDT hooking, DKOM) to hide presence — requiring OS-level understanding to detect the manipulation.

---

### SPIRAL-06: Network Security

**L1 — Introduction (D3: Networking → D6: Fundamentals):**
Firewalls, IDS/IPS, and VPNs are introduced as conceptual defensive controls. The learner understands what they do at a high level.

**L2 — Revisitation (D9: Defensive Security):**
The learner operates network security tools. Snort rules, Suricata signatures, NetFlow analysis, and SIEM network log correlation are hands-on skills.

**L3 — Advanced application (D10: Offensive Security / D11: Cloud):**
Network security controls are bypassed. Firewall rules are evaded via allowed ports (HTTP/HTTPS). IDS is evaded via protocol fragmentation and encrypted C2. Cloud network security groups are misconfigured and exploited. The learner understands where defensive controls have gaps.

**L4 — Expert synthesis (D15/D17):**
Malware uses covert channels to bypass network controls — DNS tunneling, ICMP C2, steganography in HTTPS traffic. AI-driven network anomaly detection is the defender's answer to behavior that signature-based tools miss.

---

### SPIRAL-07: Web Applications

**L1 — Introduction (D5: Web Technologies):**
The learner understands how web applications work: HTTP request/response, sessions, cookies, REST APIs, TLS.

**L2 — Revisitation (D10: Offensive Security):**
Every web technology concept becomes an attack vector. Sessions are stolen. Cookies are manipulated. REST APIs are tested for authorization flaws. TLS is stripped or intercepted. OWASP Top 10 maps directly to D5 concepts.

**L3 — Advanced application (D18: DevSecOps):**
Web vulnerabilities are now prevented in code. SAST detects SQL injection patterns before deployment. DAST runs SQL injection and XSS tests against the running application. The learner writes secure code knowing exactly what the attacker will try.

**L4 — Expert synthesis (D17: AI Security):**
LLM applications are web applications with a new attack surface — prompt injection is injecting instructions the way XSS injects JavaScript; insecure output handling is the analogue of passing user input directly to eval().

---

### SPIRAL-08: Risk

**L1 — Introduction (D6: Cybersecurity Fundamentals):**
Risk = likelihood × impact. Risk treatment options are Accept, Mitigate, Transfer, Avoid. This is the conceptual framework.

**L2 — Revisitation (D9: Defensive Security):**
Risk becomes operational in vulnerability management. CVSS scoring produces a severity rating, but prioritization requires combining CVSS with asset criticality and exploitability in the wild — a practical application of the risk framework.

**L3 — Advanced application (D19: GRC):**
Risk becomes organizational. Risk registers, risk appetite statements, risk treatment plans, and regulatory frameworks translate technical risk into business language and legal obligation.

**L4 — Expert synthesis (Career-level, across paths):**
Risk-based security decisions — where to invest limited budgets, what to accept vs. remediate, how to communicate risk to boards — are the defining skill of security leadership. Every domain contributes evidence for risk decisions; GRC provides the framework for making them.

---

## 8.2 Spiral Enforcement Rule

Every concept marked as a "core concept" in the Knowledge Graph (any L1 or L2 concept across all domains) must appear in the `revisits` field of at least two subsequent lesson nodes in the curriculum metadata. Curriculum architects must verify this before a domain is marked complete in the content governance lifecycle.

The AI Mentor's concept tracking system uses spiral graph edges to schedule retrieval practice prompts: when a learner encounters a revisitation of a concept they learned earlier, a retrieval prompt fires before the new material begins.

---

# PART 9: CROSS-DISCIPLINE CONNECTIONS

Cross-discipline connections are explicit relationships between concepts in different domains that are not prerequisite relationships but are meaningful pedagogical bridges — places where two different domains illuminate the same underlying principle from different angles, where a concept in one domain directly enables or explains a concept in another, or where knowledge of one domain reveals the limits of another.

These connections power the "Related Concepts" and "You might also like" features, and inform the AI Mentor's ability to draw analogies across domains.

---

## 9.1 Connection Types

| Type | Symbol | Meaning |
|------|--------|---------|
| ATTACK_ENABLES_DEFENSE | A→D | Understanding the attack directly improves a defensive capability |
| DEFENSE_REVEALS_ATTACK | D→A | Studying a defensive tool reveals what attackers try to evade |
| SHARED_MECHANISM | ↔ | Two concepts in different domains use the same underlying mechanism |
| ANALOGY | ~ | One concept is a useful mental model for understanding another |
| REGULATORY_MANDATE | R→T | A compliance requirement drives a specific technical control |

---

## 9.2 Key Cross-Discipline Connections

```
CONNECTION-01 (A→D):
  [OFF-07] SQL injection ENABLES [DSO-01] SAST understanding
  Understanding how SQL injection works makes SAST rule output meaningful. A developer
  who has never tried SQL injection does not understand why SAST flags string concatenation
  in SQL queries. The attack explains the defensive tool.

CONNECTION-02 (A→D):
  [OFF-08] XSS ENABLES [WEB-12] CSP understanding
  Content Security Policy headers are only meaningful if you understand what they block.
  XSS mechanics explain exactly why 'unsafe-inline' in a CSP is dangerous.

CONNECTION-03 (A→D):
  [IAM-13] Pass-the-hash ENABLES [DEF-09] SIEM correlation rule design
  Knowing how pass-the-hash works (NTLM relay, same-host authentication with hash)
  directly informs writing the correlation rule to detect it (Event ID 4624 Type 3
  without prior 4648, cross-host within short timeframe).

CONNECTION-04 (SHARED_MECHANISM):
  [CRYPT-18] Padding oracle attack ↔ [WEB-15] JWT none algorithm attack
  Both exploit a server's error response to deduce secret information. The padding oracle
  uses decryption error messages; JWT none exploits the server accepting an unsigned token
  when it should reject it. Same class of vulnerability — trusting client-controlled data
  about a security property.

CONNECTION-05 (SHARED_MECHANISM):
  [OFF-07] SQL injection ↔ [AIS-02] Prompt injection
  Both attacks work by injecting instructions into a data channel that a processing system
  interprets as commands. SQL injection targets database query parsers; prompt injection
  targets LLM context windows. Learners who understand SQL injection can immediately grasp
  the structural analogy to prompt injection.

CONNECTION-06 (SHARED_MECHANISM):
  [NET-22] ARP poisoning ↔ [IAM-13] Pass-the-hash (NTLM relay)
  Both exploit the trust a system places in unauthenticated protocol messages — ARP trusts
  any reply claiming a MAC address, NTLM relay trusts any authentication challenge response
  from the relay. Both are man-in-the-middle attacks at different protocol layers.

CONNECTION-07 (D→A):
  [DEF-14] YARA rules REVEALS [MAL-06] Process injection evasion
  Studying what YARA rules can and cannot detect reveals why process injection is so
  effective — injected code leaves no file on disk for YARA to scan; only behavioral
  detection in memory can catch it.

CONNECTION-08 (A→D):
  [CLD-07] IMDS credential theft ENABLES [CLD-09] IaC scanning rationale
  Understanding that SSRF → IMDSv1 → IAM role credentials is a real attack vector
  makes the IaC rule "require IMDSv2" and "no wildcard IAM policies on EC2" meaningful.
  The attack explains why the checklist item exists.

CONNECTION-09 (~):
  [SEC-17] Kill chain ~ [TI-05] Diamond Model
  The kill chain describes attack sequence (temporal); the diamond model describes attack
  relationships (structural). They are complementary frameworks for understanding the same
  attacks. Learners who know one immediately understand the other's purpose.

CONNECTION-10 (R→T):
  [GRC-03] GDPR personal data protection MANDATES [CRYPT-01] Encryption at rest and transit
  GDPR Article 32 explicitly cites encryption as an appropriate technical measure. The
  regulatory requirement makes cryptographic controls not optional but legally required for
  organizations handling EU personal data.

CONNECTION-11 (R→T):
  [GRC-04] PCI DSS Requirement 6 MANDATES [DSO-02] DAST for payment applications
  PCI DSS explicitly requires security testing of payment application web interfaces.
  The compliance requirement drives the DevSecOps practice.

CONNECTION-12 (SHARED_MECHANISM):
  [RE-03] Buffer overflow ↔ [MAL-06] Process injection
  Buffer overflows typically result in shellcode execution in the overflowed buffer;
  process injection is shellcode execution in a remote process. The payload (shellcode)
  is the same; the delivery mechanism differs. Understanding one directly illuminates the other.

CONNECTION-13 (A→D):
  [OFF-15] Lateral movement ENABLES [IR-03] Chain of custody understanding
  The reason chain of custody and evidence preservation are critical in IR is that lateral
  movement means the attacker has accessed multiple hosts. Evidence collection must be
  comprehensive enough to trace the full movement path. The attack technique explains why
  the forensic requirement exists.

CONNECTION-14 (SHARED_MECHANISM):
  [DSO-05] Secrets in code ↔ [CLD-07] IMDS credential theft
  Both result in credential exposure — one via code repository scanning, one via SSRF.
  Both enable the same downstream attack: using the leaked credentials for unauthorized
  cloud API access. The consequence is identical; the exposure vector differs.

CONNECTION-15 (~):
  [MAL-05] DGA ~ [AIS-02] Prompt injection (indirect)
  Both are examples of systems designed to interpret input being weaponized through that
  interpretation. A DGA-enabled C2 exploits DNS resolution; prompt injection exploits LLM
  context interpretation. The shared principle: any system that "interprets" input is a
  potential injection target.
```

---

## 9.3 Cross-Domain Analogies (AI Mentor Reference)

The AI Mentor uses cross-domain analogies to accelerate understanding when a learner struggles with a concept. This table documents approved analogies — relationships where one concept is a reliable bridge to another.

| Struggling With | Analogous Concept Already Known | Analogy |
|----------------|--------------------------------|---------|
| [CRYPT-12] Diffie-Hellman | [SEC-08] Least privilege | Both establish the minimum required — DH establishes minimum shared information; least privilege establishes minimum required access |
| [AIS-02] Prompt injection | [OFF-07] SQL injection | Both inject instructions into a data channel that a processor interprets as commands |
| [CLD-03] Cloud IAM policies | [OS-L02] Linux file permissions | Both are permission systems: who can access what, and what actions are permitted |
| [MAL-03] Sandbox analysis | [NET-12] Packet capture | Both observe system behavior in a controlled/passive way rather than modifying it |
| [RE-03] Buffer overflow | [CB-12] Stack mechanics | Buffer overflow is what happens when you put too much on the stack without checking bounds |
| [TI-05] Diamond Model | [SEC-17] Kill chain | Kill chain = sequence; Diamond Model = relationships. Same attacks, different lenses |
| [GRC-07] RTO/RPO | [DEF-05] Patch management SLAs | Both are time-based commitments: how long you have before a gap becomes a failure |

---

# PART 10: KNOWLEDGE GAPS

Knowledge gaps are predictable misunderstandings, common omissions, and structural holes in cybersecurity education that produce dangerous half-knowledge in practitioners. Cyber Learn is designed to prevent them by design — not as an afterthought.

## 10.1 Why Knowledge Gaps Matter

A practitioner with a knowledge gap does not know they have one. A SOC analyst who has never been taught that NTLM hashes can be used without the plaintext password will not alert on pass-the-hash activity — they will see an authentication event and consider it normal. A developer who has never been taught that parameterized queries are the prevention for SQL injection, not input validation, will write "validation" code that appears defensive but is circumventable.

Knowledge gaps are more dangerous than no knowledge, because they create false confidence.

---

## 10.2 Common Knowledge Gaps by Domain

### COMPUTER BASICS GAPS

**Gap CB-G1: Endianness omission**
Most beginner curricula skip endianness. Consequence: learners cannot read network protocol captures correctly (network byte order is big-endian; x86 is little-endian). They misread memory dumps, cannot follow exploit tutorials that reference byte ordering, and make errors in protocol implementation.
**Cyber Learn prevention:** Endianness is taught in D1 at L3 with worked examples in both network captures and memory analysis.

**Gap CB-G2: The heap vs. stack distinction**
Beginners learn "programs use memory" but are not taught the difference between stack and heap. Consequence: they cannot understand buffer overflows on the stack vs. heap, cannot read Volatility output that distinguishes stack and heap allocations, and cannot follow malware analysis of heap spray techniques.
**Cyber Learn prevention:** Stack and heap are taught as distinct concepts in D1 (CB-12, CB-13) and revisited in D10 (exploitation) and D16 (RE).

---

### NETWORKING GAPS

**Gap NET-G1: DNS as an attack surface**
DNS is taught as "how domain names resolve to IP addresses" and then forgotten. Consequence: learners do not recognize DNS exfiltration (malware tunneling data in DNS queries), DNS C2 (malware receiving commands via TXT records), or DNS hijacking in cloud environments.
**Cyber Learn prevention:** DNS is introduced in D3, revisited as an attack vector in D10, revisited as a forensic evidence source in D14, and revisited as a malware C2 mechanism in D15.

**Gap NET-G2: Protocol analysis literacy**
Learners know what protocols exist but cannot read a packet capture. Consequence: they cannot perform network forensics, cannot validate whether a suspected C2 connection is real by inspecting the traffic, and cannot write Snort/Suricata rules because they have never seen what the bytes look like.
**Cyber Learn prevention:** Every networking lesson includes at least one Wireshark exercise. Packet capture literacy is a required skill, not optional enrichment.

---

### OPERATING SYSTEMS GAPS

**Gap OS-G1: The LSASS gap**
Learners know passwords exist but are not taught that Windows stores credential hashes in LSASS memory. Consequence: they cannot understand pass-the-hash attacks, cannot configure proper Credential Guard defenses, and cannot triage LSASS access alerts from EDR.
**Cyber Learn prevention:** LSASS is introduced in D2 (OS-W13) explicitly as a security-relevant component, not just a service. Its role in credential theft is taught in D8 (IAM), and its memory forensics are covered in D14 (DFIR).

**Gap OS-G2: Linux SUID/SGID as a privilege escalation vector**
Linux permissions are taught as "who can read/write/execute" but the SUID bit is skipped or glossed. Consequence: learners performing Linux privilege escalation in D10 have never heard of SUID, making the most common Linux PE technique incomprehensible.
**Cyber Learn prevention:** SUID/SGID is taught explicitly in D2 (OS-L06) with both a legitimate use case and a security implication. It is revisited in D10 as a specific PE vector.

---

### CRYPTOGRAPHY GAPS

**Gap CRYPT-G1: Hash ≠ encryption**
Learners conflate hash functions and encryption. Consequence: they believe hashed passwords can be "decrypted" (leading to security decisions based on this false model), do not understand why rainbow tables work (because hashing is deterministic), and misread security documentation.
**Cyber Learn prevention:** D7 opens by explicitly distinguishing the three operations — encryption (reversible with key), hashing (one-way, no key), MAC (one-way, with key). This distinction is stated, explained, and tested before any specific algorithm is introduced.

**Gap CRYPT-G2: The password hashing distinction**
Learners know passwords should be "hashed" but are not taught that general-purpose hash functions (MD5, SHA-256) are wrong for passwords. Consequence: they implement or accept password storage using SHA-256, which is vulnerable to GPU-based cracking due to its speed.
**Cyber Learn prevention:** CRYPT-14 (password hashing) explicitly teaches why bcrypt/Argon2 exist — they are computationally expensive by design. The specific failure mode (fast hash = GPU-crackable) is demonstrated with Hashcat run times.

---

### IAM GAPS

**Gap IAM-G1: MFA is not always phishing-resistant**
Learners are taught "MFA = secure" without understanding that TOTP and push notification MFA can be bypassed via real-time phishing (AiTM attacks, push fatigue). Consequence: organizations implement TOTP and consider themselves fully protected.
**Cyber Learn prevention:** D8 teaches all MFA methods together with their specific weaknesses. TOTP is explicitly labeled "phishing-susceptible." FIDO2/WebAuthn is labeled "phishing-resistant" with a clear explanation of why (bound to origin).

**Gap IAM-G2: OAuth2 scope blindness**
Learners learn OAuth2 conceptually but are not taught to evaluate what scope a request is asking for. Consequence: they authorize OAuth applications without reading the permissions, and they build OAuth clients that request overly broad scopes because they do not know how to request only what is needed.
**Cyber Learn prevention:** Every OAuth2 practical requires the learner to evaluate the scope being requested and justify whether it is appropriate for the application's stated purpose.

---

### OFFENSIVE SECURITY GAPS

**Gap OFF-G1: Authorization scope confusion**
Learners are taught offensive techniques without always internalizing that authorization is everything. Consequence: they scan systems they were not authorized to scan, use tools against out-of-scope targets during assessments, or fail to understand why computer crime law applies to unauthorized testing.
**Cyber Learn prevention:** Every offensive lesson opens with the authorization reminder. D10's first lesson is entirely dedicated to legal and ethical scope before any technique is introduced. Every practical specifies the exact scope boundary.

**Gap OFF-G2: Reporting as an afterthought**
Offensive security curricula focus on exploitation and treat reporting as a brief final step. Consequence: practitioners can find vulnerabilities but cannot communicate their impact to business stakeholders, making them significantly less effective as security professionals.
**Cyber Learn prevention:** Reporting is taught in D10 as a required skill with equal weight to technical execution. Every penetration testing capstone requires a full professional report, including executive summary and remediation recommendations.

---

### DEFENSIVE SECURITY GAPS

**Gap DEF-G1: Detection-without-context**
Learners can query a SIEM but do not know what they are looking for or what a finding means. Consequence: every alert looks equally important or equally ignorable; they cannot prioritize.
**Cyber Learn prevention:** D9's SIEM lessons are interleaved with D10 (offensive) content — learners build detection rules for attacks they have personally conducted in D10 practicals. The attacker context makes the detection rule meaningful.

**Gap DEF-G2: Tuning resistance**
Learners are taught to write detection rules but not that every rule generates false positives that must be tuned. Consequence: practitioners add rules but never tune them, creating alert fatigue that makes the SIEM less useful over time.
**Cyber Learn prevention:** Every D9 SIEM practical includes a tuning phase — the learner writes a rule, runs it against a log dataset containing both malicious and benign activity, measures the false positive rate, and refines the rule.

---

### CLOUD GAPS

**Gap CLD-G1: Shared responsibility misconception**
Learners believe the cloud provider secures everything. Consequence: organizations deploy workloads without hardening them, relying on the cloud provider for security that is explicitly the customer's responsibility.
**Cyber Learn prevention:** The shared responsibility model is the first concept in D11, before any specific service is introduced. The specific boundary is documented for IaaS, PaaS, and SaaS separately, with examples of real breaches caused by shared responsibility confusion.

**Gap CLD-G2: IAM policy complexity blindness**
Learners are taught to create IAM policies but not to audit or reason about the effective permissions of complex policy combinations. Consequence: they create policies that appear restrictive but are actually overpermissive due to resource wildcards, action wildcards, or inheritance from group policies.
**Cyber Learn prevention:** D11 includes a dedicated module on effective permission analysis — given a set of IAM policies, what can this identity actually do? This is practiced with intentionally tricky policy combinations.

---

### GRC GAPS

**Gap GRC-G1: Compliance ≠ security**
Learners are taught compliance frameworks as if achieving compliance means being secure. Consequence: organizations achieve PCI DSS compliance on paper while remaining exposed to attacks that are not addressed by the 12 requirements.
**Cyber Learn prevention:** D19 explicitly addresses the compliance-security gap. Every framework is taught with a "what this does not cover" section. The lesson on PCI DSS includes a case study of an organization that was PCI compliant at the time of a card data breach.

**Gap GRC-G2: Risk acceptance without documentation**
Learners understand risk treatment options but do not understand that risk acceptance must be documented, approved, and time-limited. Consequence: risks are "accepted" informally (i.e., ignored) rather than formally accepted with executive sign-off.
**Cyber Learn prevention:** D19 teaches risk treatment with a focus on the governance requirement — risk acceptance is a decision that must be documented in the risk register with an owner, an approval, and a review date.

---

## 10.3 Structural Gaps Prevented by Knowledge Graph Design

Beyond individual concept gaps, some structural gaps emerge from curriculum design choices. The Knowledge Graph prevents the following:

**Structural Gap S1: Teaching offense without defense**
Some curricula teach exploitation without teaching the corresponding defensive control. Result: learners who can attack but not protect, and who lack the full context of why the attack matters.
**Prevention:** Every offensive technique in D10 has a corresponding defensive control crosslinked in the graph. Instructors are required to include the defensive countermeasure in the same lesson (Constitution Guardrail ETH2).

**Structural Gap S2: Teaching defense without attacker context**
Some curricula teach security tools without teaching what attackers are trying to do. Result: defenders who know how to use the tool but not what to look for — they are reactive to rules that others have written rather than capable of writing their own.
**Prevention:** D9 (Defensive Security) explicitly requires D10 (Offensive Security) concepts in its advanced lessons. Learners cannot complete D9 fully without the attacker context from D10.

**Structural Gap S3: Teaching cryptography abstractly**
Crypto is taught mathematically without connection to when it fails. Result: learners can describe AES-256 but cannot recognize that a JWT using none algorithm is dangerously insecure.
**Prevention:** Every cryptographic concept in D7 is paired with a known failure mode — a real vulnerability or attack that occurs when the mechanism is misimplemented or misapplied.

**Structural Gap S4: No career-to-skill mapping**
Generic cybersecurity curricula teach everything to everyone equally. Result: a GRC analyst spends 40 hours on reverse engineering that will never be relevant to their work; a penetration tester spends 20 hours on risk frameworks.
**Prevention:** The 11 learning paths in Part 5 explicitly map which domains are required, recommended, and optional for each career destination.

---

# PART 11: AI MENTOR INTEGRATION

The AI Mentor is Cyber Learn's adaptive learning companion. Its behavior is governed by Constitution Part 23. This part documents how the AI Mentor uses the Knowledge Graph to provide personalized, educationally sound support.

## 11.1 AI Mentor's Knowledge Graph Operations

The AI Mentor has read access to the Knowledge Graph and to each learner's progress data (concepts mastered, quiz scores, retrieval performance over time). It uses four core graph operations:

**Operation 1 — Backward Traversal (Prerequisite Diagnosis)**
When a learner struggles with Concept X, the AI Mentor traverses backward through the graph's prerequisite edges to identify which prior concepts are likely weak. It generates a ranked list of prerequisite concepts to probe, weighted by how directly they underpin Concept X.

Example: Learner struggling with [IAM-15] Kerberoasting. Backward traversal identifies:
1. [IAM-09] Kerberos authentication flow (direct prerequisite)
2. [CRYPT-04] Hash functions (Kerberoasting involves offline hash cracking)
3. [OS-W12] Kerberos in Windows AD context (domain-specific implementation)
4. [OFF-13] Hashcat usage (the cracking tool used)

The AI Mentor probes these in order, starting with the most proximate prerequisite, rather than asking "what do you not understand about Kerberoasting?"

**Operation 2 — Forward Traversal (Motivation and Context)**
When a learner asks "why does this matter?" or shows low engagement, the AI Mentor traverses forward through the graph's `enables` edges to explain what concepts and career capabilities become available after mastering the current concept.

Example: Learner asking why [NET-13] TCP state machine matters. Forward traversal identifies:
→ [NET-21] TCP SYN flood (attack understanding)
→ [DEF-02] IDS/IPS rules (detecting TCP-based attacks)
→ [OFF-04] Nmap scanning (uses half-open SYN scan)
→ [IR-05] MTTD improvements (network-based detection)

"Understanding the TCP state machine unlocks your ability to understand how SYN flood attacks work, why your IDS fires on half-open connections, and what Nmap is actually doing when it scans. It is the foundation under all of those."

**Operation 3 — Concept Retrieval Scheduling**
The AI Mentor maintains a retrieval schedule for every concept the learner has been exposed to, based on spaced repetition principles. The Knowledge Graph's `revisited_in` edges inform the schedule — when a concept is about to be revisited in an upcoming lesson, the AI Mentor front-loads a retrieval prompt in the pre-lesson interface.

The retrieval prompt format (from Constitution Guardrail R2: retrieval must precede re-teaching):
> "Before we begin — can you recall [specific concept]? Take 30 seconds to think before clicking to reveal the answer."

**Operation 4 — Gap Detection (Unverified Assumption Tracking)**
For learners who bypassed foundational domains via placement assessment, the AI Mentor tracks which concepts were not formally verified. When an unverified concept appears in a current lesson, the AI Mentor adds a brief inline check:

> "This lesson assumes you know [unverified concept]. Quick check: [2-question mini-assessment]. All good → continue. Identified gap → here's the targeted review (15 min)."

---

## 11.2 AI Mentor Dialogue Modes

The AI Mentor operates in distinct dialogue modes based on the learner's current context. These modes are governed by Constitution Part 23 (permitted behaviors and prohibitions).

**Mode A — Conceptual Explanation**
Activated when: learner asks "what is X?" or "how does X work?"
Approach: Explain using the concept's L1 definition first, then add complexity based on learner's current position in the graph. An L3 learner asking "how does AES work?" gets a more detailed answer than an L1 learner asking the same question.
Constitution constraint: Always consistent with the concept's defined disclosure level. Do not explain at a level the learner has not yet unlocked.

**Mode B — Guided Discovery**
Activated when: learner is stuck in a practical
Approach: Do not give the answer. Ask a question that directs attention toward the relevant concept. If the learner cannot progress after the first nudge, escalate to the next hint level. Three hints maximum before offering to let the learner skip (with the option to return).
Constitution constraint: Never complete the practical for the learner (Constitution Part 23.3 absolute prohibition).

**Mode C — Prerequisite Diagnosis**
Activated when: learner fails a quiz (score <80%) or asks a question that implies a prerequisite gap
Approach: Run backward traversal (Operation 1). Present the diagnosis to the learner as a collaborative observation, not a judgment. "It looks like the concept of X might be worth reviewing — it's foundational to what we're working on now. Want to do a quick 10-minute review?"
Constitution constraint: Maintain Guardrail S1 (build confidence before complexity). Frame gaps as normal parts of learning, not failures.

**Mode D — Motivational Context**
Activated when: learner disengages, asks "why does this matter?", or shows extended time-on-task without progress
Approach: Run forward traversal (Operation 2). Connect the current concept to a specific career outcome relevant to the learner's stated path. "You're learning this because [specific application in their chosen career path]."
Constitution constraint: Must be accurate and specific. Generic encouragement ("keep going!") is explicitly prohibited — it must be grounded in real curriculum connections.

**Mode E — Assessment Support**
Activated when: learner completes a quiz or receives a quiz result
Approach: Every quiz answer, correct or incorrect, receives an explanation (Constitution Guardrail A4). For incorrect answers, the explanation includes: (a) why the chosen answer was wrong, (b) why the correct answer is right, and (c) which concept to review if this type of question was difficult.
Constitution constraint: AI Mentor cannot reveal quiz answers before the learner has attempted the question. Never complete assessments (Constitution Part 23.3).

**Mode F — Confidence Calibration (Three-Tier System)**
The AI Mentor uses a three-tier confidence model from Constitution Part 23 for its own answers:
- **High confidence:** Answer directly, no qualifier. (Established technical facts, well-documented standards)
- **Medium confidence:** Prefix with "generally speaking" or "in most common implementations." (Implementation-specific behavior, version-dependent details)
- **Low confidence:** Prefix with "I'm not certain, but..." + recommend authoritative source (RFC, official documentation, CVE advisory). (Edge cases, recent developments, implementation-specific quirks)
- **Unknown:** "This is outside what I can reliably address. I recommend [specific authoritative source]."

---

## 11.3 AI Mentor Adaptive Sequencing

When a learner completes a lesson, the AI Mentor evaluates the next recommended lesson using the following priority order:

1. **Mandatory next lesson:** If the next lesson in the current module has no domain-gate prerequisite not yet met, recommend it first.
2. **Concept reinforcement:** If a concept from the just-completed lesson appears as a `retrieval_prerequisite` in an upcoming lesson, surface that upcoming lesson as "coming up soon" with context.
3. **Gap remediation:** If a prerequisite gap was detected in the current lesson, recommend the specific targeted review before the next new lesson.
4. **Path-aligned next step:** If multiple options are available, recommend the one that moves the learner toward their declared career path.
5. **Spiral revisitation:** If the learner has a concept overdue for retrieval practice (not retrieved in >14 days), surface a lightweight retrieval activity before the next lesson.

---

## 11.4 What the AI Mentor Will Not Do

From Constitution Part 23, the following are absolute prohibitions regardless of learner request:

1. **Fabricate:** Will not invent vulnerability details, CVE information, tool capabilities, or standards content that it is not certain about. Must use the confidence model (Mode F) instead.
2. **Complete assessments:** Will not answer quiz questions for the learner, even when the learner is frustrated or the question seems trivial.
3. **Unlock gated content:** Will not help a learner access content they have not met the prerequisites for.
4. **Enable unethical behavior:** Will not provide offensive techniques without the ethical framing that is part of the lesson structure. Will not help a learner apply techniques outside of designated lab environments.
5. **Provide false encouragement:** Will not say "great job" for a wrong answer or pretend a struggle is resolved when it is not.
6. **Guess technical facts:** If uncertain, must say so. No hallucinated CVE IDs, no invented tool flags, no fabricated compliance requirements.

---

# PART 12: SEARCH & RECOMMENDATION ENGINE

## 12.1 Search Architecture

The Cyber Learn search engine is not a keyword search — it is a knowledge-graph-aware search that understands the relationships between concepts and uses them to surface the most educationally relevant results.

**Search input types:**
- **Topic search:** "SQL injection" → returns the SQL injection concept node, the lesson where it is introduced, all lessons where it is revisited, and the career paths where it is required
- **Career search:** "I want to become a penetration tester" → returns PATH-3 with the required domain sequence and current completion status
- **Concept search:** "how does Kerberos work" → returns the Kerberos concept node (IAM-09) with a disclosure-level-appropriate summary, links to the teaching lesson and all revisitations
- **Gap search:** "what do I need to learn X?" → traverses the prerequisite graph backward from X to the learner's current knowledge frontier and returns the shortest path

**Indexing:**
Every concept node, lesson node, and domain node is indexed with:
- Canonical name and all aliases (e.g., "pass-the-hash" = "PTH" = "NTLM relay authentication")
- Disclosure level (L1/L2/L3/L4)
- Domain membership
- Career path membership
- MITRE ATT&CK technique mapping (where applicable)
- Certification alignment (where applicable)
- Common misspellings and variant phrasings

---

## 12.2 Recommendation Engine

The recommendation engine produces three types of output:

**Type 1 — "What to learn next" (sequential)**
Algorithm:
1. Find the learner's current frontier in the Knowledge Graph (all concepts they have completed)
2. Find all concept nodes adjacent to the frontier (directly unlocked by completed prerequisites)
3. Filter by the learner's declared career path
4. Sort by: (a) path criticality (required > recommended > optional), then (b) concept difficulty (prefer concepts closest to current difficulty level), then (c) spiral reinforcement value (prefer concepts that revisit recently learned material)
5. Return top 3 recommendations

**Type 2 — "Concepts you should review" (retrieval)**
Algorithm:
1. Find all concepts the learner has completed
2. For each concept, calculate days since last successful retrieval
3. Apply a forgetting curve model (concepts decay in memory over time)
4. Flag concepts where predicted retention falls below 70%
5. Return as low-stakes retrieval activity recommendations, not as "you forgot this"

**Type 3 — "Related to what you are learning" (contextual)**
Algorithm:
1. Read the learner's current lesson
2. Find all cross-discipline connections (Part 9) involving concepts in this lesson
3. Filter to connections where the learner has already learned the related concept
4. Surface as "Related concept: [X] — you already know [Y], which is the same principle in a different context"

---

## 12.3 Search Result Prioritization

When multiple results match a search query, the following priority order applies:

1. **Exact concept ID match** (highest priority)
2. **Canonical name match** in a lesson the learner is currently working in
3. **Canonical name match** in a lesson the learner has access to (prerequisites met)
4. **Alias match** in accessible lessons
5. **Related concept match** (cross-discipline connections)
6. **Locked content match** (concept exists, but prerequisites not yet met — show with lock icon and prerequisite requirements)

---

## 12.4 Certification Alignment Search

Learners can search by certification (e.g., "OSCP") to see:
- Which learning paths prepare for this certification
- Which specific domains and concepts are most relevant
- Estimated completion time to be certification-ready
- Which concepts the learner has already covered that are on the certification's syllabus

This search does not guarantee passing the certification — it maps the curriculum coverage against the certification's published objectives.

**Supported certification alignments:**
CompTIA Security+, CompTIA CySA+, CompTIA PenTest+, OSCP, CEH, CISSP, CISM, CISA, CRISC, GCFE, GCFA, GCIH, GREM, GCIA, GWEB, CCSP, AWS Security Specialty, Microsoft SC-200, AZ-500, ISC2 CC, eJPT, CSSLP.

---

## 12.5 MITRE ATT&CK Integration

Every offensive technique taught in D10, D12, D13, D15, and D16 is tagged with the corresponding MITRE ATT&CK technique ID(s). This enables:

- **Learner-facing:** "This technique maps to ATT&CK T1003.001 (OS Credential Dumping: LSASS Memory)" — providing real-world context for the technique
- **Curriculum-facing:** Coverage gap analysis — which ATT&CK techniques are not yet covered by any lesson?
- **AI Mentor:** When discussing a detected alert in a scenario, the AI Mentor can explain the ATT&CK technique it represents
- **Search:** Learners can search by ATT&CK technique ID to find the relevant lesson

---

# PART 13: IMPLEMENTATION READINESS

This part describes the database design, data model, and implementation architecture required to operationalize the Knowledge Graph. It is a design specification — it does not implement the system. Implementation decisions (technology selection, hosting, API design) belong in a separate Technical Architecture document.

## 13.1 Data Model Philosophy

The Knowledge Graph is a property graph — nodes have properties, edges have types and properties. A relational database can represent this, but a native graph database (Neo4j or equivalent) is architecturally better suited because the core operations (backward traversal for prerequisite diagnosis, forward traversal for motivation, shortest path for gap analysis) are O(depth) in a graph database and O(n²) or worse in a relational database when the graph is large.

The choice of technology should be deferred until the graph reaches 1,000+ nodes. Until then, a well-designed relational schema or even a JSON document store can serve as the implementation substrate while the graph structure is validated.

---

## 13.2 Node Types

```
NODE: Concept
  Properties:
    concept_id       (string, primary key, e.g., "IAM-15")
    name             (string, canonical name, e.g., "Kerberoasting")
    aliases          (string[], e.g., ["SPN ticket cracking", "Kerberos ticket offline cracking"])
    definition       (string, one-line definition)
    domain_id        (string FK → Domain node)
    disclosure_level (enum: L1, L2, L3, L4)
    mastery_threshold (float, e.g., 0.80)
    mitre_technique_ids (string[], e.g., ["T1558.003"])
    certification_ids (string[], aligned certifications)
    bloom_level      (enum: remember, understand, apply, analyze, evaluate, create)
    status           (enum: active, deprecated, planned)
    created_at       (datetime)
    updated_at       (datetime)

NODE: Domain
  Properties:
    domain_id        (string, primary key, e.g., "D8")
    name             (string, e.g., "Identity & Access Management")
    tier             (int: 0–6)
    difficulty_rating (float, e.g., 3.1)
    description      (text)
    status           (enum: active, planned, deprecated)

NODE: Lesson
  Properties:
    lesson_id        (string, primary key — Constitution Part 20 format)
    slug             (string, URL-safe identifier)
    title            (string)
    domain_id        (string FK → Domain)
    module_id        (string FK → Module)
    disclosure_level (enum: L1, L2, L3, L4)
    bloom_level      (enum)
    lesson_type      (enum: expository, discovery, diagnostic — Constitution 6.2)
    estimated_duration (int, minutes)
    difficulty       (enum: beginner, intermediate, advanced, expert)
    status           (enum: draft, review, published, deprecated, archived — Constitution 22)
    version          (string, semver)
    ethical_content  (boolean)

NODE: LearningPath
  Properties:
    path_id          (string, primary key, e.g., "PATH-3")
    name             (string, e.g., "Penetration Tester")
    description      (text)
    estimated_hours_additional (int)
    entry_requirement (string, references another path or "none")
    certification_alignments (string[])
    career_outcomes  (string[])
    status           (enum: active, planned)

NODE: Learner
  Properties:
    learner_id       (string, primary key)
    declared_path_id (string FK → LearningPath)
    created_at       (datetime)
    — No PII beyond learner_id stored in the graph; PII in separate GDPR-compliant store

NODE: LearnerConceptRecord
  Properties:
    learner_id       (string FK → Learner)
    concept_id       (string FK → Concept)
    mastery_score    (float, 0.0–1.0)
    last_retrieved_at (datetime)
    verified         (boolean — false if bypassed via placement assessment)
    retrieval_count  (int)
    created_at       (datetime)
    updated_at       (datetime)
```

---

## 13.3 Edge Types

```
EDGE: REQUIRES
  From:  Concept (or Lesson or Domain)
  To:    Concept (or Lesson or Domain)
  Type:  Hard prerequisite — must be mastered before the From node unlocks
  Properties:
    strength (enum: required, recommended, optional)
    reason   (string, brief explanation)

EDGE: ENABLES
  From:  Concept
  To:    Concept (or Domain)
  Type:  What becomes accessible after mastering the From concept
  Properties:
    (none beyond type)

EDGE: REVISITS
  From:  Lesson (the revisiting lesson)
  To:    Concept (the concept being revisited)
  Type:  This lesson revisits a concept introduced in an earlier lesson
  Properties:
    revisitation_level (enum: L1→L2, L2→L3, L3→L4, application, synthesis)
    retrieval_required (boolean — if true, fire retrieval prompt at lesson start)

EDGE: CONNECTS
  From:  Concept
  To:    Concept
  Type:  Cross-discipline connection (Part 9) — not a prerequisite, a pedagogical bridge
  Properties:
    connection_type (enum: ATTACK_ENABLES_DEFENSE, DEFENSE_REVEALS_ATTACK,
                           SHARED_MECHANISM, ANALOGY, REGULATORY_MANDATE)
    description     (string, brief explanation of the connection)

EDGE: BELONGS_TO
  From:  Lesson
  To:    Domain
  Type:  This lesson is part of this domain

EDGE: TEACHES
  From:  Lesson
  To:    Concept
  Type:  This lesson introduces or significantly develops this concept
  Properties:
    introduction_level (enum: L1, L2, L3, L4)
    is_primary_source  (boolean — false if the lesson only revisits, not introduces)

EDGE: REQUIRED_BY_PATH
  From:  Domain (or Lesson)
  To:    LearningPath
  Type:  This domain/lesson is required for this learning path
  Properties:
    priority (enum: required, recommended, optional)

EDGE: MASTERED_BY (LearnerConceptRecord edge — runtime graph)
  From:  Learner
  To:    Concept
  Type:  This learner has mastered this concept
  Properties:
    score            (float)
    verified         (boolean)
    last_retrieved_at (datetime)
```

---

## 13.4 Scalability Considerations

**Graph size estimates (at full curriculum build-out):**
- Concept nodes: ~400 (20 per domain × 19 domains, with variation)
- Lesson nodes: ~500 (average 25 lessons per domain)
- Domain nodes: 19
- LearningPath nodes: 11
- REQUIRES edges: ~1,200 (average 3 prerequisites per concept)
- ENABLES edges: ~800
- REVISITS edges: ~600 (average 1.5 revisitations per core concept)
- CONNECTS edges: ~150 (cross-discipline connections documented in Part 9 and future additions)
- TEACHES edges: ~1,500 (average 3 concepts per lesson)

At this scale (~4,300 nodes + edges), any reasonable graph database or even a PostgreSQL schema with JSONB can handle the traversal queries with proper indexing. Native graph database benefits become significant at 10× this scale or higher.

**Runtime graph (learner progress):**
- LearnerConceptRecord nodes: number of learners × average concepts mastered
- At 10,000 learners each with 100 concepts mastered: 1,000,000 records
- This is a standard relational workload — store in PostgreSQL, not the graph database
- The graph database serves the curriculum graph (static, rarely updated); the relational store serves learner progress (dynamic, high-write)

**Query performance requirements:**
- Backward prerequisite traversal (diagnostic): <100ms for 5-hop traversal
- Forward path traversal (motivation): <100ms for 3-hop traversal
- Shortest-gap-path query: <500ms (acceptable for on-demand AI Mentor responses)
- Recommendation generation: <200ms (cached where possible)
- Search: <50ms for indexed concept lookups

---

## 13.5 Schema Migration Policy

From Constitution Part 25 (gap identified and addressed): the Knowledge Graph schema must include a migration policy.

**Rules:**
1. Adding new concept nodes, lesson nodes, or ENABLES/CONNECTS/REVISITS edges is always non-breaking (additive).
2. Adding a new REQUIRES edge for a concept that already has learners who have progressed past it must trigger a review: does the new prerequisite mean those learners should be considered to have a gap?
3. Removing a REQUIRES edge is non-breaking (learners who completed the requirement are still valid).
4. Changing a concept's `disclosure_level` upward (e.g., L2 → L3) means learners who completed it at L2 may need to re-verify the concept at L3.
5. All schema changes require a version bump in the graph schema version field and a changelog entry.
6. Learner progress data is never deleted during schema migration — it is preserved and annotated with the schema version at the time of completion.

---

# PART 14: SELF REVIEW

This part examines the Knowledge Graph from six distinct perspectives to identify gaps, inconsistencies, and risks before the document is adopted as governing curriculum architecture.

---

## Perspective 1: The Beginner Learner

*A person with no prior technical background, starting Cyber Learn for the first time*

**What works:**
The tiered domain structure (Tier 0 → Tier 6) provides a clear entry point with no prerequisites. PATH-1 (Foundational) is explicitly designed for zero-experience learners. The explicit prohibition on banned phrases (Constitution Guardrail T4: "simply," "obviously," "just") and the requirement to define every term before use (Guardrail T1) protect beginners from the casual condescension of most security content.

**Risks:**
The 19 domains presented in Part 2 may be overwhelming as a list. A beginner does not need to understand the entire curriculum map — they need to see one clear next step. The Knowledge Graph should never be exposed directly to learners in its full form; the platform's UI should translate it into a simplified, path-specific progression view.

**Concern:**
PATH-1 requires D10 (Offensive Security) at "overview level" as a required domain. The difficulty jump to D10 (rated 4.0 overall) from D9 (3.5) is the largest in the curriculum. Even at overview level, D10 introduces emotionally intense material (Constitution Guardrail ETH1 applies). Ensuring that D10's "overview" subset is genuinely accessible and appropriately scaffolded for PATH-1 learners requires explicit curriculum design work beyond what this document specifies.

**Recommendation:** Define what "overview level" means for D10 in PATH-1 — specifically which concepts are included, which are excluded, and what the scaffolding looks like. This should be resolved in the first Curriculum Architecture sprint.

---

## Perspective 2: A Cybersecurity Professor with 15 Years of Teaching Experience

*Evaluating whether the knowledge architecture is educationally sound*

**What works:**
The eight design principles in Part 1 are correctly cited from the research literature (Sweller, Bruner, Bloom, Roediger, Rohrer, Bjork) and accurately applied. The spiral learning structure in Part 8 demonstrates genuine understanding of how expert knowledge differs from novice knowledge — the same concept appears differently at each level because it is genuinely understood differently. The cross-discipline connections in Part 9 are the kind of pedagogical scaffolding that separates courses that produce practitioners from courses that produce test-passers.

**Risks:**
The concept maps in Part 4 use a flat notation that does not capture the internal structure of complex concepts. For example, [IAM-09] Kerberos is listed as a single concept node, but Kerberos has at least 8–10 sub-concepts that a learner must understand sequentially (AS-REQ, TGT structure, TGS-REQ, service ticket, AP-REQ, etc.). At the lesson design level, this granularity must be resolved.

**Concern:**
The mastery threshold (80% quiz score) is applied uniformly across all domains. Research suggests that appropriate mastery thresholds should vary by the criticality of the concept — a practitioner who "knows" offensive techniques at 75% can still harm systems, but the threshold does not capture this risk differential.

**Recommendation:** Consider domain-specific mastery thresholds: 80% for foundational and governance domains; 90% for offensive security concepts; 85% for defensive and forensics domains. Alternatively, maintain 80% but require 100% correct on safety-critical questions (ethical scope, legal authorization).

---

## Perspective 3: An Instructional Designer

*Evaluating whether the architecture can be operationalized into actual lessons*

**What works:**
The lesson metadata schema (Constitution Part 20) and the knowledge graph node structure (Part 13) are compatible — lesson metadata fields map cleanly to graph node properties. The three lesson types (Expository, Discovery, Diagnostic) from Constitution 6.2 give curriculum authors a clear structural choice. The educational guardrails (Constitution Part 21) are specific enough to be actionable — "one major new concept per section" can be enforced during content review.

**Risks:**
The prerequisite matrix in Part 6 is domain-level, not lesson-level. Curriculum authors writing individual lessons need to know which specific prior lessons are prerequisites, not just which domains. The transition from domain-level graph to lesson-level graph is not documented here — it must be completed during curriculum architecture work before any lessons are authored.

**Concern:**
The spiral learning requirements (Part 8) require every core concept to appear in at least two subsequent lessons (Guardrail R1). With ~400 concepts across ~500 lessons, tracking this manually is not feasible. This must be enforced in the CMS by the lesson metadata's `revisits` field, which must be part of the editorial workflow.

**Recommendation:** Before any lessons are authored, implement the lesson metadata schema in the CMS with required fields — specifically `concept_ids_introduced`, `concept_ids_revisited`, and `prerequisite_lesson_ids`. Attempting to retrofit these after lessons are written is prohibitively expensive.

---

## Perspective 4: A Hiring Manager in Cybersecurity

*Evaluating whether the curriculum produces job-ready practitioners*

**What works:**
The 11 learning paths map directly to real job titles and are aligned to recognized industry certifications. The capstone challenges are realistic — a penetration test with a professional report, a simulated SOC shift with alert triage, a forensic investigation with a structured report. These are the kinds of portfolio artifacts that differentiate candidates.

**Risks:**
The curriculum is technically strong but does not document which "soft skills" are developed. In practice, hiring managers rate communication, collaboration, and professional judgment as highly as technical skill. The capstone challenges include reporting (which exercises written communication), but no collaborative exercises (which exercise teamwork) or professional ethics scenarios (which exercise judgment under ambiguity) are documented here.

**Concern:**
Several paths (PATH-6: Malware Analyst, PATH-11: AI Security) are for roles that are still emerging and for which market demand varies significantly by geography and sector. Learners should be informed that these paths lead to specialized roles with fewer open positions than PATH-1/PATH-2/PATH-3.

**Recommendation:** Add career demand context to each learning path — a brief note on role availability, typical seniority at hire, and which industries hire most. This does not change the curriculum design but helps learners make informed path selections.

---

## Perspective 5: A Cognitive Scientist

*Evaluating whether the architecture reflects what we know about how memory and learning work*

**What works:**
The combination of spaced retrieval (tracked by the AI Mentor), interleaved practice (documented in Part 1.7 and enforced in module design), and mastery gating (80% threshold before advancing) reflects the three most empirically robust interventions in the learning science literature. The explicit prohibition on massed practice ("five SQL injection problems in a row") and the requirement for interleaved challenges are correctly motivated.

**Risks:**
The 14-day retrieval interval mentioned in Part 11 for flagging stale concepts is a reasonable starting point but should be adaptive. Research shows that optimal retrieval intervals vary by concept difficulty, learner history with the concept, and how critical the concept is. A fixed 14-day interval is better than nothing but is not optimal.

**Concern:**
The difficulty curve in Part 7 uses intuitive difficulty ratings rather than empirically measured ones. These ratings should be treated as hypotheses to be validated — the actual difficulty each learner experiences will vary, and KQI-E3 (quiz success rate target: 50–70% first attempt) provides the empirical signal to recalibrate domain difficulty ratings after launch.

**Recommendation:** Implement the difficulty ratings as adjustable parameters in the curriculum system, not hardcoded values. After each cohort completes a domain, recalibrate the difficulty rating based on actual first-attempt quiz success rates. If D7 (Cryptography, rated 3.2) produces consistently <40% first-attempt success rates, the difficulty is underrated and the scaffolding is insufficient.

---

## Perspective 6: A Principal Software Architect

*Evaluating whether the implementation design is scalable and maintainable*

**What works:**
The decision to separate the static curriculum graph (stored in graph/relational database) from the dynamic learner progress data (stored in relational database) is correct. Attempting to store both in the same system would create conflicting scaling requirements (curriculum graph is read-heavy and rarely updated; learner progress is write-heavy and must scale with user growth).

The schema migration policy in Part 13.5 addresses the most critical operational risk — what happens to learner progress when the curriculum changes. The rules are sound: additive changes are safe; changes that affect completed learner records require explicit evaluation.

**Risks:**
The AI Mentor integration described in Part 11 requires the AI Mentor to traverse the Knowledge Graph in real time during learner sessions. If the graph traversal latency requirements (100ms for backward traversal, 500ms for shortest-path query) are not met at scale, the AI Mentor experience degrades. This must be load-tested before launch.

**Concern:**
The concept node structure in Part 13.2 includes `certification_ids` as a property of Concept nodes. Certification syllabi change regularly (CompTIA revises Security+ every 3 years; OSCP has changed significantly multiple times). This creates a maintenance burden that must be owned by a specific role — likely the Curriculum Architect or a designated Certification Alignment Manager.

**Gaps requiring resolution before implementation:**
1. The specific graph database vs. relational schema decision must be made and documented in a Technical Architecture document.
2. The AI Mentor's graph traversal API must be specified — what queries does it make, what does it receive, what are the SLAs?
3. The CMS integration for lesson metadata must be designed before any lessons are authored (Instructional Designer's recommendation, above).
4. A data retention and privacy policy for LearnerConceptRecord data must be written (GDPR compliance for EU learners, Constitution Part 23 privacy constraints).

---

## 14.1 Remaining Gaps (To Be Resolved Before First Curriculum Sprint)

The following items are not resolved in this version of the Knowledge Graph and must be addressed before the curriculum team begins authoring lessons:

1. **Lesson-level prerequisite graph:** The domain-level prerequisite matrix (Part 6) must be expanded to lesson-level. Which specific lesson in D8 must be completed before which specific lesson in D10?

2. **PATH-1 / D10 overlap definition:** What exactly is "D10 at overview level" for PATH-1? Which concepts, which scaffolding level, which capstone subset?

3. **Concept sub-node expansion:** Complex concepts (Kerberos, TLS handshake, Active Directory) are represented as single nodes but require internal sub-concept structure at the lesson design level. The lesson metadata schema must capture this granularity.

4. **Lab environment mapping:** Each domain that includes labs must document which specific concepts require lab environments and what those environments consist of. Lab DoD (Constitution Part 24) applies.

5. **Career demand and role context:** Each learning path needs a brief career market context section for learner decision-making (Hiring Manager's recommendation).

6. **Domain-specific mastery thresholds:** Consider whether uniform 80% is appropriate across all domains, or whether offensive security and safety-critical content warrants a higher threshold.

7. **Adaptive retrieval interval:** Replace the fixed 14-day retrieval flag with a parameterized interval model that can be tuned based on empirical KQI data.

---

## 14.2 Document Status

This Knowledge Graph is the **Version 1.0** of Cyber Learn's curriculum architecture. It governs the complete design of the curriculum but does not replace:
- The Constitution (governing document — takes precedence on any conflict)
- The Lesson Taxonomy (Constitution Part 20 — governs individual lesson metadata)
- The Technical Architecture Document (not yet written — governs implementation)
- The CMS Design Document (not yet written — governs authoring workflows)

**Review trigger:** This document must be reviewed when:
- A new Academy (major domain cluster) is proposed
- The Constitution is updated in a way that affects curriculum design
- Empirical data (KQIs from live platform) contradicts the domain difficulty ratings or prerequisite assumptions
- A major new certification alignment is added (requiring new or modified learning paths)

---

*End of Knowledge Graph — Version 1.0*

*Governing documents: Cyber Learn Constitution V1.1 (E:/cyber learn/CONSTITUTION.md)*
*All curriculum decisions must comply with both this Knowledge Graph and the Constitution.*
*In case of conflict, the Constitution takes precedence.*

