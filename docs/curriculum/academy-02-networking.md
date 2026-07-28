# CYBER LEARN — ACADEMY 2: NETWORKING
**Version:** 1.0 | **Created:** 2026-07-28 | **Status:** Draft
**Parent Document:** docs/curriculum/CURRICULUM_ARCHITECTURE.md V1.0
**Constitutional Reference:** CONSTITUTION.md V1.1
**Knowledge Graph Reference:** docs/curriculum/KNOWLEDGE_GRAPH.md V1.0
**KG Primary Domain:** D3 (Networking) — full coverage L1–L3; D9 (Defensive Security) intro nodes

---

## Academy Vision

Academy 2 is the networking foundation every cybersecurity professional must own. It requires Academy 1 completion. Its purpose is to transform an abstract concept — "computers communicate with each other" — into a precise, inspectable mental model of how data moves across networks, how protocols are designed, how packets are captured and read, and where network-layer attacks originate. A learner who completes Academy 2 can read a packet capture, map any protocol exchange to the OSI and TCP/IP models, configure basic firewall rules, explain six categories of network attack, and produce a structured network analysis report.

**Why it exists:** Network knowledge is the universal substrate of cybersecurity. SOC analysts trace intrusions through network logs. Penetration testers map attack paths through topology. Incident responders recover from breaches by reading packet captures. Cloud engineers protect east-west traffic. Without a solid networking foundation, every downstream academy becomes harder and shallower than it needs to be. The Knowledge Graph (D3 dependency vector) confirms: D3 is a prerequisite for D5, D6, D7, D9, D10, D11, D12, D13, and D14.

**Target Learners:** All seven personas. Primary focus: Marcus (career changer needing structured protocol knowledge), Jordan (aspiring SOC analyst building triage skills), Sarah (student mapping theory to tools), Alex (CTF enthusiast formalizing instincts). Secondary: Priya and David will find the protocol depth familiar but benefit from the security-first framing.

**Entry Requirements:** Academy 1 complete (≥80% capstone mastery gate). Assumes learner can apply the CIA triad, name the kill chain phases, and distinguish threat from vulnerability.

**Estimated Learning Hours:** 35–45 hours (including practicals, labs, and assessments)

**Suggested Pace:** 2–3 lessons per week (casual) to 1–2 courses per week (intensive)

**Exit Competencies:** Upon completing Academy 2, a learner can:
- Map any common protocol exchange to the correct OSI and TCP/IP layer
- Calculate subnet boundaries and write CIDR notation for IPv4 networks
- Capture live traffic in Wireshark and apply meaningful display filters
- Perform host discovery and port scanning with Nmap in an authorized lab
- Read a TCP conversation in Wireshark and identify connection state transitions
- Explain DNS, DHCP, HTTP, HTTPS, and TLS at the packet level
- Identify and explain ARP poisoning, SYN flood, DNS spoofing, MITM, rogue DHCP, and BGP hijacking
- Write firewall rules for a given policy and design a segmented network with a DMZ
- Produce a structured network analysis report from Nmap output and PCAP evidence

**Career Relevance:** Foundation for SOC Analyst (direct), Network Security Engineer, Penetration Tester, Cloud Security Engineer, Incident Responder, Security Analyst. Directly unlocks the SOC career path (PATH-2) per Knowledge Graph.

**Certification Alignment:** CompTIA Network+ N10-009 (~75%), CompTIA Security+ Domain 3 (~55%), (ISC)² CC Domain 4 Communications and Network Security (~65%), Cisco CCNA 200-301 (foundational, ~40%), Cisco CyberOps Associate (~30%)

---

## PART 1: COURSE A2.C1 — NETWORK FUNDAMENTALS

**Purpose:** Establish the mental model. Before any tool, protocol, or attack can be understood, learners must be able to visualize what happens when data travels from one host to another. This course builds that visualization layer by layer — OSI model, TCP/IP model, encapsulation, IP addressing, subnetting, MAC addresses, ARP, switches, VLANs, and NAT. Content is deliberately conceptual-first. The lab environment uses packet simulations, not live traffic, to reduce cognitive load. Security implications are introduced as seeds for later courses, not as the primary focus.

**Learning Outcomes:**
- Describe each OSI layer and its role, and map it to the TCP/IP model
- Explain what happens at each layer when a packet is sent from one host to another
- Calculate a subnet and CIDR notation given an IP address and mask
- Distinguish between MAC and IP addresses and explain when each is used
- Explain how ARP resolves addresses and why it matters for security
- Describe what VLANs and NAT do and why networks use them

**Estimated Hours:** 7–9 hours | **Difficulty:** beginner | **Prerequisites:** A1 Capstone (≥80% mastery gate)
**Career Relevance:** Foundation for all technical roles; directly required by Network+ and CCNA
**Certification Alignment:** CompTIA Network+ Domains 1–2, (ISC)² CC Domain 4, Cisco CCNA Sections 1–2

---

### Module A2.C1.M1 — How Networks Communicate

**Module Objectives:**
1. Understand the OSI model as a conceptual layering framework, not a protocol specification
2. Explain how the TCP/IP model simplifies the OSI model for practical use
3. Trace data encapsulation layer by layer from application to physical
4. Apply a security-layer lens to the OSI model to foreshadow attack categories

**KG Domain Coverage:** NET-01 (OSI model), NET-02 (TCP/IP model)
**Practical Outcomes:** Learner traces a web request through all 7 OSI layers and identifies the PDU name and primary protocol at each layer
**Required Interactive Components:** ClickableDiagram (OSI layer explorer), PacketFlowDiagram (encapsulation visualizer), ComparisonTable (OSI vs. TCP/IP), QuizWidget
**Animation Categories:** OSI layer-by-layer reveal, encapsulation wrapping sequence, TCP/IP layer collapse
**Simulations:** Packet journey simulator — learner clicks "Send HTTP request" and watches data transform at each OSI layer with header additions visible
**Assessment Strategy:** Quiz-only for L1–L2; quiz-and-challenge for L3–L4

**Practical Progression:**
- **Beginner:** Match 10 protocol names (HTTP, TLS, TCP, IP, Ethernet) to their OSI layers using drag-and-drop
- **Intermediate:** Label the 4-layer TCP/IP model and identify where each OSI layer collapses into it
- **Advanced:** Trace a DNS query through all 7 OSI layers, naming the PDU name at each layer
- **Capstone:** Not applicable at module level

---

##### A2.C1.M1.L1 — The OSI Model
- **Slug:** the-osi-model | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-01 | **Prereqs:** A1.C5.M3.L4 (Academy 1 mastery gate ≥80%)
- **Interactive:** ClickableDiagram (7-layer OSI stack — click each layer for detail, PDU name, and example protocols), QuizWidget
- **Animations:** osi-layer-reveal, pdu-name-per-layer, protocol-placement-animation
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, (ISC)² CC Domain 4, CCNA Section 1.1 | **Careers:** All technical roles | **Accessibility:** OSI stack keyboard-navigable layer by layer; all layer descriptions available as plain text; no color-only encoding of layer relationships

**Learning Objectives:**
1. Name all seven OSI layers in order (Physical, Data Link, Network, Transport, Session, Presentation, Application) and state each layer's primary responsibility
2. Identify the correct PDU name (bits, frames, packets, segments, data) for the four lower OSI layers
3. Give one real-world protocol example for each of the top four layers (Application: HTTP; Presentation: TLS; Session: NetBIOS; Transport: TCP)

**Skills Gained:** OSI model comprehension, protocol layering concept, PDU naming, layer-responsibility mapping
**AI Mentor:** If learner conflates OSI with TCP/IP, clarify immediately — OSI is a conceptual model invented for vendor interoperability discussions; TCP/IP is the implemented suite that runs the internet. Offer a mnemonic only after the learner demonstrates understanding of each layer's purpose, not as the first teaching tool.

---

##### A2.C1.M1.L2 — TCP/IP in Practice
- **Slug:** tcp-ip-in-practice | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-02, NET-01 | **Prereqs:** A2.C1.M1.L1
- **Interactive:** ComparisonTable (OSI 7 layers vs. TCP/IP 4 layers — side by side), ClickableDiagram (TCP/IP stack with protocol examples per layer), QuizWidget
- **Animations:** osi-to-tcpip-collapse, internet-protocol-suite-overview, real-network-stack-trace
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.1 | **Careers:** Network Engineer, SOC Analyst, Security Engineer | **Accessibility:** Comparison table has proper column and row headers for screen readers; animated collapse has static before/after alternative; no flashing content

**Learning Objectives:**
1. Map each TCP/IP layer (Network Access, Internet, Transport, Application) to its corresponding OSI layer(s) and explain why the models differ in layer count
2. Identify which protocols operate at each TCP/IP layer (Ethernet at Network Access; IP at Internet; TCP/UDP at Transport; HTTP/DNS/DHCP at Application)
3. Explain why the TCP/IP model is the operational model used in real networks and the OSI model is used for conceptual discussion

**Skills Gained:** TCP/IP model, OSI-to-TCP/IP mapping, protocol suite awareness, model selection reasoning
**AI Mentor:** Build on NET-01 from the previous lesson; flag if learner attempts to memorize the OSI-to-TCP/IP mapping without understanding why the compression occurred (hint: the top three OSI layers are indistinguishable in practice for IP-based protocols)

---

##### A2.C1.M1.L3 — Encapsulation and De-encapsulation
- **Slug:** encapsulation-de-encapsulation | **Type:** discovery | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-01, NET-02 | **Prereqs:** A2.C1.M1.L1, A2.C1.M1.L2
- **Interactive:** PacketFlowDiagram (step-by-step encapsulation — header added per layer), ClickableDiagram (PDU anatomy: header/payload/trailer labels), QuizWidget
- **Animations:** encapsulation-wrapping-sequence, de-encapsulation-unwrapping, header-inspection-zoom
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 1, CCNA Section 1.2 | **Careers:** Network Engineer, SOC Analyst, Incident Responder | **Accessibility:** Encapsulation animation controllable with pause and step-by-step buttons; all PDU diagrams have fully labeled text alternatives; WCAG 2.2 AA focus indicators on all controls

**Learning Objectives:**
1. Explain what encapsulation means and why each layer adds its own header (and Layer 2 adds a trailer for the FCS)
2. Trace an HTTP request through the full encapsulation sequence: HTTP data → TCP segment → IP packet → Ethernet frame → bits
3. Describe de-encapsulation and identify which device at the destination strips each header layer

**Skills Gained:** encapsulation mechanics, header anatomy, packet build sequence, de-encapsulation concept
**AI Mentor:** Use the "envelope inside an envelope" analogy — each layer wraps the previous layer's output. Confirm the learner understands that headers at each layer are only read and stripped by the corresponding layer at the destination, not by intermediate devices (routers read IP headers, not TCP or HTTP headers).

---

##### A2.C1.M1.L4 — The OSI Model Through a Security Lens
- **Slug:** osi-model-security-lens | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-01, NET-02, SEC-01 | **Prereqs:** A2.C1.M1.L1, A2.C1.M1.L2, A2.C1.M1.L3
- **Interactive:** ClickableDiagram (OSI stack with attack type labels per layer), ComparisonTable (security control vs. OSI layer it operates at), QuizWidget
- **Animations:** attack-layer-targeting-reveal, defense-per-layer-overview, security-control-placement
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Network+ Domain 2, Security+ Domain 3 | **Careers:** SOC Analyst, Penetration Tester, Network Security Engineer | **Accessibility:** Attack mapping diagram readable without color; each cell has a text label; no drag-required interaction; reduced-motion alternative for reveal animation

**Learning Objectives:**
1. Map four attack categories (ARP spoofing at L2, IP spoofing at L3, SYN flood at L4, HTTP injection at L7) to the OSI layer they primarily target
2. Explain why security controls are deployed at multiple OSI layers rather than at a single layer — defense in depth
3. Identify which OSI layer a firewall (L3/L4), an IDS (L3–L7), and a WAF (L7) each primarily operate at

**Skills Gained:** security-layer mapping, defense-in-depth connection to OSI, attack surface reasoning, control placement
**AI Mentor:** Connect explicitly to the kill chain from Academy 1 — "the OSI layer tells you *where in the stack* the attacker is operating; the kill chain tells you *when in the campaign* they are operating." These are orthogonal views of the same event. Surface this dual-axis mental model early because it will be required for PCAP analysis in A2.C3.

---

### Module A2.C1.M2 — IP Addressing and Routing

**Module Objectives:**
1. Understand IPv4 address structure, address classes, and private vs. public ranges
2. Calculate subnets and write CIDR notation from scratch
3. Explain how routing decisions are made at Layer 3
4. Describe IPv6 and why the transition from IPv4 is relevant to security practice

**KG Domain Coverage:** NET-03 (IP address), NET-04 (Subnet/CIDR), NET-18 (Routing)
**Practical Outcomes:** Learner subnets a /24 network into four equal subnets, calculates the broadcast address and usable host range for each, and traces a simulated packet through a routing table
**Required Interactive Components:** SubnetCalculatorWidget, ClickableDiagram (routing table lookup), QuizWidget, ConceptFlashCards (private address classes)
**Animation Categories:** IPv4 binary breakdown, subnet mask masking animation, routing table longest-prefix match walk-through
**Simulations:** Subnet design tool — learner inputs host requirements per subnet; system validates the CIDR design
**Assessment Strategy:** Quiz-only for L1 and L4; quiz-and-challenge for L2 and L3

**Practical Progression:**
- **Beginner:** Identify the network and host portions of five IPv4 addresses given their subnet masks
- **Intermediate:** Subnet a 192.168.10.0/24 network into four equal subnets; provide network address, broadcast, and usable range for each
- **Advanced:** Read a simplified routing table and trace the packet path from source to destination using longest-prefix match
- **Capstone:** Not applicable at module level

---

##### A2.C1.M2.L1 — IPv4 Fundamentals
- **Slug:** ipv4-fundamentals | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-03 | **Prereqs:** A2.C1.M1.L4
- **Interactive:** ClickableDiagram (IPv4 address anatomy — four octets, binary and decimal views), ConceptFlashCards (private RFC 1918 ranges), QuizWidget
- **Animations:** ip-address-binary-breakdown, address-class-reveal, private-vs-public-differentiation
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.6 | **Careers:** Network Engineer, Systems Administrator, Security Analyst | **Accessibility:** Binary/decimal toggle available; all address examples readable as plain text; flashcards keyboard-navigable; no time-pressure mechanics

**Learning Objectives:**
1. Explain the structure of an IPv4 address: 32-bit value written as four decimal octets separated by dots
2. Identify the three classful ranges A (1–126), B (128–191), C (192–223) and their default subnet masks
3. List the three private IPv4 ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) from RFC 1918 and explain why private addressing exists

**Skills Gained:** IPv4 addressing, address classes, private vs. public ranges, octet-to-binary conversion
**AI Mentor:** Proactively flag the MAC vs. IP confusion — both concepts appear in this module. Reinforce: MAC is Layer 2 and locally scoped; IP is Layer 3 and globally routable. This distinction is the conceptual prerequisite for understanding ARP.

---

##### A2.C1.M2.L2 — Subnetting and CIDR
- **Slug:** subnetting-and-cidr | **Type:** expository | **Duration:** 55 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-04, NET-03 | **Prereqs:** A2.C1.M2.L1
- **Interactive:** SubnetCalculatorWidget (step-by-step guided subnet calculation), ClickableDiagram (CIDR slash-notation anatomy), QuizWidget
- **Animations:** subnet-mask-binary-masking, cidr-slash-notation-reveal, host-count-calculation
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 1, CCNA Section 1.7 | **Careers:** Network Engineer, Security Engineer, Cloud Security | **Accessibility:** Subnet calculator provides screen-reader output for all computed fields; binary animations include digit-by-digit text alternatives; calculator fully keyboard-navigable

**Learning Objectives:**
1. Convert a subnet mask between dotted-decimal and CIDR slash notation in both directions
2. Calculate the network address, broadcast address, and usable host count for a given IP/CIDR block
3. Divide a /24 network into a specified number of equal subnets and identify the network/broadcast addresses for each

**Skills Gained:** subnetting, CIDR notation, binary masking, host range calculation, network design basics
**AI Mentor:** This is a known KQI-E3 high-friction lesson — subnetting has the highest first-attempt failure rate in networking curricula. Use backward traversal to NET-03 (binary/octet understanding) before allowing retry. Scaffold explicitly: confirm binary → decimal conversion before starting subnet mask work. Never advance a learner to L3 without ≥80% on the subnet challenge.

---

##### A2.C1.M2.L3 — How Routing Works
- **Slug:** how-routing-works | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-18, NET-03, NET-04 | **Prereqs:** A2.C1.M2.L1, A2.C1.M2.L2
- **Interactive:** ClickableDiagram (routing table — destination, mask, next-hop, interface), PacketFlowDiagram (hop-by-hop routing with TTL decrement), QuizWidget
- **Animations:** routing-decision-longest-prefix, default-gateway-role, ttl-decrement-per-hop
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, CCNA Section 1.8 | **Careers:** Network Engineer, Security Engineer, Cloud Security | **Accessibility:** Routing table keyboard-navigable with aria row/column labels; longest-prefix match highlighted in text as well as color; flow animation has step controls

**Learning Objectives:**
1. Explain what a routing table contains and how a router performs longest-prefix match to choose the next hop
2. Describe the role of the default gateway (0.0.0.0/0) for hosts that need to reach destinations outside their local subnet
3. Explain what TTL (Time to Live) is, how it is decremented per hop, and how it prevents routing loops

**Skills Gained:** routing table reading, longest-prefix match, default gateway concept, TTL, next-hop selection
**AI Mentor:** Plant the forward reference to dynamic routing protocols (OSPF, BGP) — covered in A2.C5. Confirm learners understand that static routing (manual table entries) and dynamic routing (protocol-learned entries) both produce the same routing table structure; they differ only in how entries are populated.

---

##### A2.C1.M2.L4 — IPv6 and Why It Matters
- **Slug:** ipv6-and-why-it-matters | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-03 | **Prereqs:** A2.C1.M2.L1, A2.C1.M2.L2
- **Interactive:** ComparisonTable (IPv4 vs. IPv6 — address length, notation, header, NAT dependency), ClickableDiagram (IPv6 address anatomy — 8 groups of 4 hex digits), QuizWidget
- **Animations:** ipv6-address-group-expansion, ipv4-exhaustion-context, dual-stack-network-visualization
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.9 | **Careers:** Network Engineer, Cloud Security, Systems Administrator | **Accessibility:** Long IPv6 addresses broken into labeled groups with aria descriptions; comparison table has proper row/column headers; no color-only differentiation between IPv4 and IPv6

**Learning Objectives:**
1. Explain why IPv4 address exhaustion drove the development of IPv6 and what the 128-bit address space provides
2. Identify the structure of an IPv6 address and apply the two abbreviation rules (omit leading zeros per group; collapse one all-zero sequence with ::)
3. Describe dual-stack networking and explain why IPv6 security configurations matter even in predominantly IPv4 environments

**Skills Gained:** IPv6 addressing, address abbreviation, dual-stack concept, IPv6 security awareness
**AI Mentor:** Note the KG gap on IPv6-specific attack surface (extension header abuse, neighbor discovery spoofing) — beyond Academy 2 scope. Flag it as a topic to revisit in advanced networking electives. For now, ensure learner can read and abbreviate an IPv6 address correctly.

---

### Module A2.C1.M3 — Ethernet and the Local Network

**Module Objectives:**
1. Understand MAC addresses as Layer 2 identifiers distinct from IP addresses
2. Explain how ARP translates between MAC and IP and why it is stateless and unauthenticated
3. Describe how switches learn MAC addresses and how VLANs create separate broadcast domains
4. Explain NAT as a necessary workaround for IPv4 scarcity and identify its security implications

**KG Domain Coverage:** NET-05 (MAC), NET-06 (ARP), NET-16 (NAT), NET-19 (VLANs)
**Practical Outcomes:** Learner reads a simulated ARP table, identifies which device responded to an ARP request, and explains how the switch makes a forwarding decision based on its MAC address table
**Required Interactive Components:** ClickableDiagram (ARP request/reply exchange), PacketFlowDiagram (switch MAC table learning), ComparisonTable (hub vs. switch vs. router), QuizWidget
**Animation Categories:** ARP request broadcast + unicast reply, MAC address table learning, VLAN broadcast domain segmentation, NAT table translation
**Simulations:** ARP exchange simulator; VLAN boundary visualizer showing which devices can and cannot communicate
**Assessment Strategy:** Quiz-only for L1–L2; quiz-and-challenge for L3–L4

**Practical Progression:**
- **Beginner:** Read an ARP table and identify which IP maps to which MAC for five entries
- **Intermediate:** Explain step-by-step what happens when Host A sends a packet to Host B's IP address when the ARP cache is empty
- **Advanced:** Identify which VLAN a host belongs to and determine whether inter-VLAN routing is required for two hosts to communicate
- **Capstone:** Not applicable at module level

---

##### A2.C1.M3.L1 — MAC Addresses and Ethernet Frames
- **Slug:** mac-addresses-ethernet-frames | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-05 | **Prereqs:** A2.C1.M2.L4
- **Interactive:** ClickableDiagram (Ethernet frame anatomy — preamble, destination MAC, source MAC, EtherType, payload, FCS), QuizWidget
- **Animations:** mac-address-anatomy-oui-device, ethernet-frame-field-build, switch-mac-table-lookup
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, CCNA Section 2.1 | **Careers:** Network Engineer, SOC Analyst, Security Analyst | **Accessibility:** Ethernet frame diagram fully labeled with aria field descriptions; hex values in MAC addresses paired with verbal equivalents in the UI; no time-pressure in any interaction

**Learning Objectives:**
1. Explain what a MAC address is: a 48-bit Layer 2 identifier burned into the NIC, written as six hex octets, with the first three forming the OUI
2. Describe an Ethernet frame's key fields — destination MAC, source MAC, EtherType, payload, FCS — and the purpose of each
3. Explain how a switch uses its MAC address table to make unicast forwarding decisions and what happens when a MAC is unknown (flooding)

**Skills Gained:** MAC addressing, Ethernet frame structure, OUI concept, switch forwarding logic, flooding vs. unicast forwarding
**AI Mentor:** Reinforce the Layer 2 (MAC) vs. Layer 3 (IP) distinction — it is the most common early confusion and is directly relevant to ARP poisoning in A2.C4.M3. If learner confuses them, return to the NET-01 OSI mental model and anchor MAC at Layer 2, IP at Layer 3.

---

##### A2.C1.M3.L2 — ARP: Translating Addresses
- **Slug:** arp-translating-addresses | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-06, NET-05, NET-03 | **Prereqs:** A2.C1.M3.L1
- **Interactive:** PacketFlowDiagram (ARP request as broadcast + ARP reply as unicast), ClickableDiagram (ARP table format), QuizWidget
- **Animations:** arp-request-broadcast-flood, arp-reply-unicast-return, arp-cache-population, gratuitous-arp-intro
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, CCNA Section 2.2 | **Careers:** SOC Analyst, Network Engineer, Incident Responder | **Accessibility:** ARP exchange diagram keyboard-steppable with aria step announcements; all frame field labels available as text; color not used as sole differentiator between request and reply

**Learning Objectives:**
1. Explain what ARP does (resolves an IP address to a MAC address on a local subnet) and why it is needed given the Layer 2/Layer 3 distinction
2. Describe the ARP request (broadcast: "Who has 192.168.1.10?") and ARP reply (unicast: "I have it; here is my MAC") exchange step by step
3. Identify two fundamental security weaknesses of ARP: it is stateless (no handshake) and unauthenticated (any host can reply)

**Skills Gained:** ARP protocol operation, ARP cache mechanics, gratuitous ARP concept, ARP security weaknesses
**AI Mentor:** Plant the ARP poisoning foreshadow explicitly — "ARP has no authentication mechanism. Any host on the LAN can send a gratuitous ARP claiming to own any IP address, and neighboring hosts will update their ARP caches without verification. We will exploit this in A2.C4.M3 and learn to detect it using Wireshark in A2.C3." This forward-reference is instructionally intentional per the spiral learning architecture.

---

##### A2.C1.M3.L3 — Switches, VLANs, and Network Segmentation
- **Slug:** switches-vlans-network-segmentation | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-19, NET-05 | **Prereqs:** A2.C1.M3.L1, A2.C1.M3.L2
- **Interactive:** ClickableDiagram (VLAN topology: two broadcast domains, trunk link, inter-VLAN routing), ComparisonTable (hub vs. unmanaged switch vs. managed VLAN switch), QuizWidget
- **Animations:** broadcast-domain-before-vlan, vlan-segmentation-reveal, trunk-link-dot1q-tagging, inter-vlan-routing-need
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 2, CCNA Section 2.3 | **Careers:** Network Engineer, Security Engineer, Cloud Security | **Accessibility:** VLAN topology diagram has text-based adjacency list as an alternative; trunk vs. access port distinction conveyed in text labels, not color alone; all animations have reduced-motion alternatives

**Learning Objectives:**
1. Explain what a VLAN is and how it creates logically separate broadcast domains on a single physical switch
2. Describe how 802.1Q trunk links carry traffic from multiple VLANs between switches and into a router for inter-VLAN routing
3. Explain why VLANs are a network security control and name VLAN hopping as a forward-reference attack technique

**Skills Gained:** VLAN concept, 802.1Q tagging, broadcast domain segmentation, trunk vs. access ports, network segmentation rationale
**AI Mentor:** Flag the forward reference: VLAN hopping (double-tagging and switch spoofing) is covered in A2.C4. Reinforce that VLANs alone are not a sufficient security boundary if native VLAN and trunk port configurations are not hardened — a critical distinction for the network defense design capstone.

---

##### A2.C1.M3.L4 — NAT: Sharing One Address
- **Slug:** nat-sharing-one-address | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-16, NET-03, NET-04 | **Prereqs:** A2.C1.M2.L2, A2.C1.M3.L1
- **Interactive:** PacketFlowDiagram (NAT translation: private source IP → public IP → reply translation back), ClickableDiagram (NAT translation table format), QuizWidget
- **Animations:** nat-overload-pat-translation, nat-table-population, nat-teardown-on-session-close
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Network+ Domain 2, CCNA Section 4.4 | **Careers:** Network Engineer, Systems Administrator, Cloud Security | **Accessibility:** NAT table display aria-labeled per column; flow diagram fully steppable; no pointer-only interactions; all decision logic described in text

**Learning Objectives:**
1. Explain what NAT (Network Address Translation) is, why it exists (IPv4 address exhaustion), and what PAT (Port Address Translation / NAT Overload) adds to allow multiple private hosts to share one public IP
2. Describe how a NAT table maps (inside local IP: port) to (inside global IP: port) entries and how replies are translated back
3. Identify one security implication of NAT: it provides incidental obscurity (hides internal topology) but is not a firewall and must not be treated as a security boundary

**Skills Gained:** NAT and PAT operation, NAT table mechanics, inside/outside local/global terminology, NAT security limitations
**AI Mentor:** Connect to IPv6 from L4 of M2 — NAT exists as a workaround for IPv4 exhaustion; IPv6 eliminates the need for NAT in theory, but NAT persists for organizational policy reasons. Note that many cloud environments implement NAT for internal routing (VPC NAT gateways) even where IPv6 is available.

---

### Course A2.C1 — Capstone

**Title:** Map the Network
**Type:** quiz-and-capstone | **Duration:** 60 min | **Difficulty:** beginner

**Scenario:** Learner takes the role of a new network technician at Helix Corp's branch office. A network diagram is provided with 12 devices across three subnets. The learner must:
1. Given three CIDR blocks (/26, /27, /28), calculate the network address, broadcast address, and usable host range for each subnet
2. Label which OSI layer is responsible for three given traffic types: an ARP broadcast (Layer 2), an IP packet traversing two routers (Layer 3), and an HTTP request from browser to server (Layer 7)
3. Read a simplified ARP table and answer three questions: which MAC owns 192.168.1.5, which device has a stale entry, and what device generates a gratuitous ARP on startup
4. Explain in writing (2–3 sentences) why Subnet A cannot communicate directly with Subnet B without a router, and identify which device acts as the default gateway

**Assessment Criteria:** Subnet calculation accuracy (40%), OSI layer mapping accuracy (25%), ARP table reading accuracy (20%), written explanation quality (15%)
**KG Validation:** NET-01, NET-02, NET-03, NET-04, NET-05, NET-06, NET-16, NET-18, NET-19 all exercised
**Mastery Gate:** ≥80% to unlock Course A2.C2

---

## PART 2: COURSE A2.C2 — CORE PROTOCOLS

**Purpose:** Protocols are the grammar of networking — precise, unambiguous rules that allow two machines to communicate without ambiguity. This course builds deep fluency in the seven protocols every security professional encounters every day: TCP, UDP, DNS, DHCP, HTTP, HTTPS, and TLS. The learning arc moves from raw transport layer mechanics (TCP state machine, UDP tradeoffs) to application-layer workflows (DNS resolution, DHCP lease) to security-layer protection (TLS handshake, certificate validation). By the end, learners can read any of these protocols in a packet capture and recognize normal, anomalous, and malicious behavior.

**Learning Outcomes:**
- Explain TCP's three-way handshake and four-way termination, and read TCP flags in a packet capture
- Map TCP state machine transitions and identify which state an attack like a SYN flood exploits
- Explain UDP's design tradeoffs and identify which application protocols use it and why
- Describe DNS resolution recursively from stub resolver to root server to TLD to authoritative
- Explain what DHCP DORA is and why rogue DHCP servers are a threat
- Read an HTTP request and response and identify method, status code, headers, and body
- Explain how TLS encrypts HTTP traffic and what a certificate chain validates

**Estimated Hours:** 8–10 hours | **Difficulty:** beginner–intermediate | **Prerequisites:** A2.C1 Capstone (≥80%)
**Career Relevance:** SOC Analyst (protocol recognition), Penetration Tester (protocol exploitation), Network Engineer (protocol configuration), Incident Responder (protocol-level traffic analysis)
**Certification Alignment:** CompTIA Network+ Domains 1 and 2, Security+ Domain 3, (ISC)² CC Domain 4, CCNA Sections 1–4

---

### Module A2.C2.M1 — TCP and UDP

**Module Objectives:**
1. Explain the TCP three-way handshake and understand why it establishes state
2. Read TCP flags and identify which flag combination means which phase of a connection
3. Trace TCP state machine transitions from SYN_SENT through ESTABLISHED through TIME_WAIT
4. Explain UDP's design philosophy and identify use cases where it is preferred over TCP

**KG Domain Coverage:** NET-09 (TCP three-way handshake), NET-13 (TCP state machine), NET-10 (UDP)
**Practical Outcomes:** Learner reads three Wireshark screenshots and correctly identifies whether each represents a new connection, data transfer, graceful termination, or RST teardown
**Required Interactive Components:** PacketFlowDiagram (TCP handshake + termination), ClickableDiagram (TCP state machine diagram), ComparisonTable (TCP vs. UDP), QuizWidget
**Animation Categories:** TCP three-way handshake animation with flag labels, TCP four-way FIN termination, TCP state transition on each packet, UDP datagram vs. TCP segment comparison
**Simulations:** TCP connection simulator — learner clicks through each packet in a connection lifecycle and labels the state after each step
**Assessment Strategy:** Quiz-only for L1 and L3; quiz-and-challenge for L2 and L4

**Practical Progression:**
- **Beginner:** Label the three packets in a TCP handshake with the correct flag (SYN, SYN-ACK, ACK)
- **Intermediate:** Trace the TCP state machine from CLOSED through ESTABLISHED through TIME_WAIT for a client connection
- **Advanced:** Identify the TCP port, sequence number, and acknowledgment number for each packet in a provided connection exchange
- **Capstone:** Not applicable at module level

---

##### A2.C2.M1.L1 — TCP and the Three-Way Handshake
- **Slug:** tcp-three-way-handshake | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-09 | **Prereqs:** A2.C1.M3.L4
- **Interactive:** PacketFlowDiagram (SYN → SYN-ACK → ACK with sequence/acknowledgment numbers), ClickableDiagram (TCP header anatomy), QuizWidget
- **Animations:** tcp-handshake-sequence, tcp-flag-bits-reveal, sequence-number-synchronization
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, Security+ Domain 3, CCNA Section 1.5 | **Careers:** SOC Analyst, Network Engineer, Incident Responder | **Accessibility:** Handshake animation steppable; TCP header fields labeled with aria; sequence number values shown as text alongside the visualization; all interactions keyboard-accessible

**Learning Objectives:**
1. Explain why TCP uses a three-way handshake (SYN → SYN-ACK → ACK) to establish a connection and what "state" means in this context
2. Identify the TCP flags (SYN, ACK, FIN, RST, PSH, URG) and the combination used in each phase of connection establishment
3. Explain what sequence numbers and acknowledgment numbers are and why they ensure ordered, reliable delivery

**Skills Gained:** TCP handshake mechanics, TCP flags, sequence/acknowledgment numbers, connection-oriented transport concept
**AI Mentor:** Reinforce why the handshake requires three packets rather than two — the client must acknowledge the server's sequence number for bidirectional sequence synchronization. This detail becomes critical when explaining SYN flood attacks in A2.C4.

---

##### A2.C2.M1.L2 — The TCP State Machine
- **Slug:** tcp-state-machine | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-13, NET-09 | **Prereqs:** A2.C2.M1.L1
- **Interactive:** ClickableDiagram (TCP state machine — states as nodes, transitions as labeled edges), PacketFlowDiagram (four-way FIN termination), QuizWidget
- **Animations:** state-machine-traversal-client, state-machine-traversal-server, rst-termination-comparison
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 1, Security+ Domain 3 | **Careers:** SOC Analyst, Penetration Tester, Incident Responder | **Accessibility:** State machine diagram navigable by keyboard with aria announcements per state; current state highlighted with both color and border weight; reduced-motion alternative available

**Learning Objectives:**
1. Name the primary TCP states (CLOSED, LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT_1/2, TIME_WAIT, CLOSE_WAIT, LAST_ACK) and identify what triggers each transition
2. Describe the four-way FIN termination sequence (FIN → ACK → FIN → ACK) and explain why it differs from the three-way handshake
3. Explain what the SYN_RECEIVED state is and why a half-open connection queue overflow is the mechanism behind a SYN flood attack

**Skills Gained:** TCP state machine, connection lifecycle, FIN vs. RST termination, half-open connection concept
**AI Mentor:** The SYN_RECEIVED state is the critical forward-reference for A2.C4.M3.L2 (SYN flood). Flag it explicitly: "Remember this state — it is the exact mechanism the SYN flood attack will abuse." Learners who understand the state machine make significantly more sense of the attack later.

---

##### A2.C2.M1.L3 — UDP: Fast and Connectionless
- **Slug:** udp-fast-and-connectionless | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-10 | **Prereqs:** A2.C2.M1.L1
- **Interactive:** ComparisonTable (TCP vs. UDP — header size, reliability, ordering, overhead, use cases), QuizWidget
- **Animations:** udp-datagram-vs-tcp-segment, dns-over-udp-example, streaming-vs-file-transfer-tradeoff
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.5 | **Careers:** Network Engineer, SOC Analyst, Security Analyst | **Accessibility:** Comparison table has proper headers; animations have static alternative tables; no time-based interactions

**Learning Objectives:**
1. Explain what connectionless means in the context of UDP and why the absence of a handshake reduces latency
2. List four protocols that use UDP (DNS, DHCP, TFTP, video streaming via RTP) and explain why each prefers speed over reliability
3. Identify the four fields in a UDP header (source port, destination port, length, checksum) and contrast them with TCP's 20+ byte header

**Skills Gained:** UDP protocol mechanics, UDP use cases, TCP vs. UDP tradeoff reasoning, UDP header structure
**AI Mentor:** Correct the common misconception that UDP is inherently insecure and TCP is inherently secure — the transport layer protocol does not determine security; encryption (TLS) is applied at the application layer regardless of whether TCP or UDP is used underneath (QUIC uses UDP + TLS).

---

##### A2.C2.M1.L4 — Ports, Services, and the Socket Concept
- **Slug:** ports-services-socket-concept | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-09, NET-10 | **Prereqs:** A2.C2.M1.L1, A2.C2.M1.L2, A2.C2.M1.L3
- **Interactive:** ClickableDiagram (well-known port table — 0–1023), ScenarioSimulator (identify which port a given service uses), QuizWidget
- **Animations:** socket-pair-animation, port-number-ranges-reveal, netstat-output-walkthrough
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Network+ Domain 1, Security+ Domain 3, CCNA Section 1.5 | **Careers:** SOC Analyst, Penetration Tester, Network Engineer | **Accessibility:** Port table keyboard-navigable with search; scenario simulator fully keyboard-accessible; no drag interactions; table has column and row headers

**Learning Objectives:**
1. Explain what a port number is and how the (IP address, port number, protocol) tuple uniquely identifies a network socket
2. Memorize the most critical well-known port/service mappings: 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS, 3389 RDP, 445 SMB
3. Identify the three port ranges (well-known 0–1023, registered 1024–49151, ephemeral 49152–65535) and explain how ephemeral ports work in a TCP connection

**Skills Gained:** port numbers, well-known services, socket concept, ephemeral ports, port-to-service mapping
**AI Mentor:** This is the mental model that makes Nmap output readable. Confirm learner has memorized the critical port list before they proceed to A2.C3. Reference the "netstat -an" output they will encounter in the guided lab — the socket notation they see there (192.168.1.1:443) directly mirrors what they learned in this lesson.

---

### Module A2.C2.M2 — DNS and DHCP

**Module Objectives:**
1. Trace a DNS resolution from the stub resolver through recursive resolver, root, TLD, and authoritative nameserver
2. Distinguish between DNS record types (A, AAAA, CNAME, MX, NS, PTR, TXT) and their uses
3. Explain the DHCP DORA process and what information a DHCP server provides
4. Identify DNS and DHCP as attack surfaces and name the attacks that abuse them

**KG Domain Coverage:** NET-07 (DNS), NET-08 (DHCP)
**Practical Outcomes:** Learner traces a complete DNS resolution for "www.example.com" through all four query stages and identifies the IP address returned at each step
**Required Interactive Components:** PacketFlowDiagram (DNS recursive resolution), ClickableDiagram (DNS record types reference), ComparisonTable (DHCP DORA packets), QuizWidget
**Animation Categories:** DNS recursive resolution walk-through, DNS cache population, DHCP DORA sequence, rogue DHCP race
**Simulations:** DNS resolver simulator — learner types a domain name and steps through each resolution stage; DHCP DORA packet builder
**Assessment Strategy:** Quiz-only for L1 and L3; quiz-and-challenge for L2 and L4

**Practical Progression:**
- **Beginner:** Label the four stages of a DNS recursive resolution query for "mail.corp.example.com"
- **Intermediate:** Identify the correct DNS record type for six use cases (mapping hostname to IPv4, canonical name alias, mail server, reverse lookup)
- **Advanced:** Explain why a rogue DHCP server can execute a MITM attack and which DHCP message type the rogue must win in the race condition
- **Capstone:** Not applicable at module level

---

##### A2.C2.M2.L1 — DNS: The Internet's Directory
- **Slug:** dns-the-internets-directory | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-07 | **Prereqs:** A2.C2.M1.L4
- **Interactive:** PacketFlowDiagram (stub resolver → recursive resolver → root → TLD → authoritative), ClickableDiagram (DNS hierarchy tree), QuizWidget
- **Animations:** dns-recursive-resolution-animation, dns-cache-ttl-countdown, dns-hierarchy-reveal
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.6 | **Careers:** Network Engineer, SOC Analyst, Security Analyst | **Accessibility:** DNS resolution flow steppable with keyboard; each resolution stage labeled as text; hierarchy tree navigable with aria; no motion required to complete the learning objective

**Learning Objectives:**
1. Explain what DNS does (translates human-readable domain names to IP addresses) and why it exists
2. Trace a recursive DNS query for "www.example.com" through all four stages: stub resolver → recursive resolver → root nameserver → TLD nameserver → authoritative nameserver → response
3. Explain what DNS caching is, what a TTL controls, and why a long TTL can slow down propagation of a DNS change

**Skills Gained:** DNS resolution process, recursive vs. authoritative resolver distinction, DNS hierarchy, DNS caching and TTL
**AI Mentor:** Connect DNS to the security context from Academy 1 — DNS is on the kill chain. Attackers use DNS for C2 (DNS tunneling), for reconnaissance (zone transfers), and as an attack target (DNS spoofing). Plant all three as forward-references without over-explaining them here.

---

##### A2.C2.M2.L2 — DNS Record Types
- **Slug:** dns-record-types | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-07 | **Prereqs:** A2.C2.M2.L1
- **Interactive:** ClickableDiagram (DNS record type reference card — A, AAAA, CNAME, MX, NS, PTR, TXT, SOA), QuizWidget, ConceptFlashCards
- **Animations:** dns-record-lookup-by-type, mx-record-mail-flow, ptr-reverse-lookup-animation
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, Security+ Domain 3 | **Careers:** Network Engineer, SOC Analyst, Systems Administrator | **Accessibility:** Flashcards fully keyboard-navigable; record type table has row headers; DNS zone file examples use monospace with screen-reader labels for fields

**Learning Objectives:**
1. Identify the seven most common DNS record types (A, AAAA, CNAME, MX, NS, PTR, TXT) and the information each stores
2. Explain when a CNAME is used instead of an A record, and what "canonical name" means
3. Describe what a PTR record is (reverse DNS lookup) and explain why it is used in spam filtering and security logging

**Skills Gained:** DNS record types, zone file reading, MX routing concept, PTR records, TXT record versatility (SPF, DKIM)
**AI Mentor:** Learners who encounter `nslookup` or `dig` output in the lab will need to recognize record types immediately. Confirm flashcard mastery of A, AAAA, CNAME, MX before advancing. TXT records (SPF, DKIM, DMARC) are touched lightly here and revisited in email protocol security.

---

##### A2.C2.M2.L3 — DHCP: Automatic Address Assignment
- **Slug:** dhcp-automatic-address-assignment | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-08 | **Prereqs:** A2.C2.M2.L1
- **Interactive:** PacketFlowDiagram (DHCP DORA — Discover, Offer, Request, Acknowledge), ClickableDiagram (DHCP lease fields), QuizWidget
- **Animations:** dhcp-dora-broadcast-sequence, dhcp-lease-database, dhcp-renewal-process
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, CCNA Section 1.6 | **Careers:** Network Engineer, Systems Administrator, SOC Analyst | **Accessibility:** DORA sequence animation steppable; broadcast vs. unicast packets visually and textually distinguished; all DHCP option fields labeled

**Learning Objectives:**
1. Describe the DHCP DORA process (Discover → Offer → Request → Acknowledge) and identify which packets are broadcasts vs. unicasts
2. List the four pieces of information a DHCP server provides in the Acknowledge packet: IP address, subnet mask, default gateway, DNS server
3. Explain what a DHCP lease is, how renewal works, and what happens when a lease expires

**Skills Gained:** DHCP DORA process, DHCP lease concept, DHCP scope, lease renewal, stateless address configuration
**AI Mentor:** DHCP provides the default gateway and DNS server — both are critical network configuration values that attackers can hijack via rogue DHCP (covered in L4). Ensure learner understands that a client trusts whatever the DHCP server tells it, with no authentication.

---

##### A2.C2.M2.L4 — DNS and DHCP as Attack Surfaces
- **Slug:** dns-dhcp-attack-surfaces | **Type:** discovery | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** true
- **KG Nodes:** NET-07, NET-08, NET-23 | **Prereqs:** A2.C2.M2.L1, A2.C2.M2.L2, A2.C2.M2.L3
- **Interactive:** ScenarioSimulator (detect a rogue DHCP server scenario), AttackTimelineViewer (DNS spoofing attack chain), QuizWidget
- **Animations:** rogue-dhcp-race-condition, dns-cache-poisoning-simplified, dhcp-starvation-attack
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 2 | **Careers:** SOC Analyst, Penetration Tester, Network Security Engineer | **Accessibility:** Scenario simulator fully keyboard-navigable; attack chain presented as an accessible ordered list in addition to timeline; no animations required to complete objectives

**Ethical Framing (Guardrail ETH1):** DNS and DHCP attacks are covered because understanding how they work is essential for detecting and defending against them. The scenarios in this lesson are presented from a defender's perspective — the goal is to recognize attack indicators and implement countermeasures. Learners are not given weaponized tools or step-by-step offensive instructions.

**Learning Objectives:**
1. Explain how a rogue DHCP server executes a MITM attack by responding to a DHCP Discover before the legitimate server and providing a malicious default gateway or DNS server address
2. Describe DNS cache poisoning: how an attacker injects a forged DNS response to redirect traffic for a legitimate domain to a malicious IP
3. Identify the defensive countermeasure for each attack: DHCP snooping (rogue DHCP), DNSSEC (cache poisoning), DNS over HTTPS/TLS (eavesdropping)

**Skills Gained:** rogue DHCP mechanics, DNS cache poisoning concept, DHCP snooping, DNSSEC awareness, DoH/DoT awareness
**AI Mentor:** This lesson crosses into offensive territory for the first time in the course. Use the ethical framing as a teaching moment — "understanding how the attack works is what makes the defense meaningful." If a learner asks how to execute these attacks in a real environment, redirect to the authorized lab environment in A2.C4 where these concepts are revisited with controlled tooling.

---

### Module A2.C2.M3 — HTTP and HTTPS

**Module Objectives:**
1. Understand HTTP as a stateless request-response protocol at the application layer
2. Explain what cookies and sessions are and how they add state to a stateless protocol
3. Describe the TLS handshake and what it establishes (encryption keys, certificate validation)
4. Read HTTP traffic in a PCAP and identify the method, status code, headers, and body

**KG Domain Coverage:** NET-11 (HTTP), NET-20 (HTTPS), NET-12 (packet capture)
**Practical Outcomes:** Learner opens a provided Wireshark file, follows a TCP stream containing an HTTP exchange, and correctly identifies the request method, URL, status code, and three response headers
**Required Interactive Components:** TerminalEmulator (HTTP request construction), PacketFlowDiagram (TLS handshake), ClickableDiagram (HTTP request/response anatomy), QuizWidget
**Animation Categories:** HTTP request-response cycle, TLS handshake key exchange, certificate chain validation, HTTPS vs. HTTP traffic visibility difference
**Simulations:** HTTP request builder — learner constructs a GET request with headers and observes the server response format
**Assessment Strategy:** Quiz-only for L1 and L2; quiz-and-challenge for L3 and L4

**Practical Progression:**
- **Beginner:** Label each field in a provided HTTP GET request (method, URL, HTTP version, Host header, User-Agent)
- **Intermediate:** Identify the HTTP status code for five scenarios: 200 (OK), 301 (redirect), 403 (forbidden), 404 (not found), 500 (server error)
- **Advanced:** Explain the TLS handshake in four steps (ClientHello, ServerHello + certificate, key exchange, Finished) without referring to notes
- **Capstone:** Not applicable at module level

---

##### A2.C2.M3.L1 — HTTP: The Web's Protocol
- **Slug:** http-the-webs-protocol | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-11 | **Prereqs:** A2.C2.M1.L4, A2.C2.M2.L1
- **Interactive:** ClickableDiagram (HTTP request anatomy — method, URL, version, headers, body), ClickableDiagram (HTTP response anatomy — status line, headers, body), QuizWidget
- **Animations:** http-request-response-cycle, http-methods-overview, status-code-categories-reveal
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, Security+ Domain 2, (ISC)² CC Domain 4 | **Careers:** Web Security Analyst, SOC Analyst, Application Security Engineer | **Accessibility:** HTTP message anatomy diagrams fully text-labeled; all field names aria-described; no color-only encoding of request vs. response

**Learning Objectives:**
1. Explain what HTTP is, what stateless means in this context, and why each HTTP request is independent by default
2. Identify the four most important HTTP methods (GET, POST, PUT, DELETE) and the semantic difference between them
3. Read an HTTP response status code and classify it by category (1xx informational, 2xx success, 3xx redirect, 4xx client error, 5xx server error)

**Skills Gained:** HTTP protocol mechanics, stateless request-response model, HTTP methods, status codes, header fields
**AI Mentor:** Connect to the web technologies spiral — HTTP is the foundation of web application security (XSS, CSRF, SQLi all operate in HTTP). Reference this connection explicitly; learners who understand HTTP at this level will have a significant advantage when they encounter web application security in later academies.

---

##### A2.C2.M3.L2 — Cookies, Sessions, and State Management
- **Slug:** cookies-sessions-state-management | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-11 | **Prereqs:** A2.C2.M3.L1
- **Interactive:** ClickableDiagram (Set-Cookie header anatomy — name, value, domain, path, Secure, HttpOnly, SameSite), ScenarioSimulator (trace a login session across three requests), QuizWidget
- **Animations:** cookie-set-and-send-cycle, session-token-lifecycle, secure-vs-httponly-flag-effect
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Security+ Domain 2, (ISC)² CC Domain 4 | **Careers:** Web Security Analyst, Application Security Engineer, SOC Analyst | **Accessibility:** Cookie anatomy diagram text-labeled; Set-Cookie header shown as readable code block with aria; scenario simulator keyboard-accessible; reduced-motion alternative for cookie lifecycle animation

**Learning Objectives:**
1. Explain why cookies exist (HTTP is stateless; cookies add per-user state) and how the browser stores and re-sends them automatically
2. Describe what a session token is, how it differs from storing credentials in a cookie, and why session fixation is a risk
3. Identify the security-relevant cookie attributes: Secure (HTTPS only), HttpOnly (no JavaScript access), SameSite (CSRF protection)

**Skills Gained:** cookies, session management, cookie security attributes, session token concept, stateful web applications
**AI Mentor:** Flag the forward reference to cookie theft and session hijacking in web application security — the HttpOnly flag exists specifically to prevent XSS from stealing session cookies. This connection will be activated when the learner reaches application security content.

---

##### A2.C2.M3.L3 — TLS and HTTPS
- **Slug:** tls-and-https | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-20, NET-11 | **Prereqs:** A2.C2.M3.L1, A2.C2.M3.L2
- **Interactive:** PacketFlowDiagram (TLS 1.3 handshake — ClientHello, ServerHello, certificate, key exchange, Finished), ClickableDiagram (certificate chain: root CA → intermediate CA → end-entity), QuizWidget
- **Animations:** tls-handshake-simplified, certificate-chain-validation, symmetric-key-derivation, https-vs-http-visibility
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 2, Security+ Domain 3, (ISC)² CC Domain 3 | **Careers:** Network Security Engineer, SOC Analyst, Web Security Analyst | **Accessibility:** TLS handshake animation steppable; certificate chain diagram navigable by keyboard; cryptographic terms linked to a glossary; all technical terms defined before use per Guardrail T1

**Learning Objectives:**
1. Explain what TLS does: encrypts the HTTP payload, authenticates the server via certificate, and negotiates a shared symmetric key using asymmetric cryptography
2. Describe the TLS 1.3 handshake in four stages (ClientHello, ServerHello + certificate + key share, server Finished, client Finished) and what is accomplished at each stage
3. Explain what a certificate chain is (root CA → intermediate CA → end-entity cert) and how a browser validates it using the trust store

**Skills Gained:** TLS protocol mechanics, TLS handshake, X.509 certificates, certificate chain validation, asymmetric vs. symmetric key use in TLS, HTTPS security properties
**AI Mentor:** This is the most technically dense lesson in C2. Monitor for learners who conflate TLS and HTTPS — HTTPS is HTTP carried over TLS. Use the analogy: TLS is the secure tunnel; HTTP is the content traveling through it. If learner struggles with asymmetric cryptography, reference the encryption spiral — full cryptography coverage is in the Cryptography domain (Academy sequence TBD).

---

##### A2.C2.M3.L4 — Reading HTTP Traffic in Wireshark
- **Slug:** reading-http-traffic-wireshark | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-11, NET-12, NET-20 | **Prereqs:** A2.C2.M3.L1, A2.C2.M3.L2, A2.C2.M3.L3
- **Interactive:** TerminalEmulator (simulated Wireshark interface with preloaded PCAP), PacketFlowDiagram (TCP stream follow), QuizWidget
- **Animations:** wireshark-follow-tcp-stream, http-request-in-pcap, https-encrypted-payload-comparison
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Network+ Domain 2, Security+ Domain 3 | **Careers:** SOC Analyst, Incident Responder, Penetration Tester | **Accessibility:** Wireshark emulator provides screen-reader output for all packet fields; PCAP navigation keyboard-accessible; all column headers labeled; no time-pressure in lab

**Learning Objectives:**
1. Open a TCP stream in a Wireshark capture file and identify the HTTP method, URL, Host header, and response status code
2. Compare HTTP traffic (visible plaintext payload) with HTTPS traffic (encrypted payload) in the same PCAP and explain what an attacker on the network can observe from each
3. Use the Wireshark filter `http` or `tcp.port == 80` to isolate HTTP traffic in a multi-protocol capture

**Skills Gained:** Wireshark TCP stream follow, HTTP dissection in PCAP, plaintext vs. encrypted traffic comparison, basic Wireshark filtering
**AI Mentor:** This lesson bridges C2 (protocols) to C3 (analysis). Confirm the learner can follow a TCP stream and identify HTTP fields before they progress to the full Wireshark module. If learner has difficulty navigating the Wireshark emulator, offer the 3-hint scaffold (Hint 1: menu location; Hint 2: click sequence; Hint 3: full step-by-step walkthrough) per Guardrail S2.

---

### Course A2.C2 — Capstone

**Title:** Protocol Detective
**Type:** quiz-and-capstone | **Duration:** 70 min | **Difficulty:** beginner–intermediate

**Scenario:** Learner receives a network incident brief from a Helix Corp SOC analyst: "We captured traffic from an unknown device on the corporate network. We need you to analyze the PCAP, identify what protocols it was using, and determine whether its behavior is normal or suspicious." The learner must:
1. Open the provided PCAP file in the Wireshark emulator and identify the protocols present (TCP, UDP, DNS, DHCP, HTTP)
2. Follow the TCP stream for the HTTP conversation and extract: source IP, destination IP, HTTP method, URL, and server response code
3. Identify three DNS queries in the capture and answer: which domain was queried, what record type was requested, and what IP address was returned
4. Determine whether the DHCP exchange is normal (four-packet DORA) or anomalous (unexpected additional DHCP Offer)
5. Write a 3-sentence incident brief stating what the device was doing, whether it is suspicious, and what follow-up action is recommended

**Assessment Criteria:** Protocol identification accuracy (30%), HTTP stream analysis (25%), DNS query analysis (20%), DHCP anomaly identification (15%), written brief quality (10%)
**KG Validation:** NET-07, NET-08, NET-09, NET-10, NET-11, NET-12, NET-13, NET-20 all exercised
**Mastery Gate:** ≥80% to unlock Course A2.C3

---

## PART 3: COURSE A2.C3 — NETWORK ANALYSIS

**Purpose:** Tools without understanding are useless; understanding without tools is incomplete. This course gives learners both. It starts with Wireshark — the most important analysis tool in networking and security — and progresses to Nmap, the industry-standard network scanner. The final module adds depth on the application protocols learners will encounter daily in enterprise environments: SMB, SSH, email protocols, LDAP, SNMP, and Kerberos. By the end, learners can analyze a packet capture independently, produce a documented Nmap scan report, and recognize the protocol signatures of the most common enterprise services.

**Learning Outcomes:**
- Open a PCAP in Wireshark, apply display filters, and follow TCP and UDP conversations
- Read a Wireshark capture to identify protocol anomalies and reconstruct application-layer content
- Perform host discovery, port scanning, service detection, and OS detection with Nmap in an authorized lab
- Produce a structured Nmap report documenting open ports, services, and versions
- Identify SMB, SSH, FTP, SMTP, IMAP, LDAP, SNMP, and Kerberos traffic in a packet capture

**Estimated Hours:** 8–10 hours | **Difficulty:** intermediate | **Prerequisites:** A2.C2 Capstone (≥80%)
**Career Relevance:** SOC Analyst (primary), Incident Responder (primary), Penetration Tester (primary), Network Security Engineer (secondary)
**Certification Alignment:** CompTIA Network+ Domain 3, Security+ Domain 3 and 5, (ISC)² CC Domain 4, CompTIA CySA+ (introductory), eJPT (foundational)

---

### Module A2.C3.M1 — Packet Capture and Wireshark

**Module Objectives:**
1. Navigate the Wireshark interface and understand packet list, packet detail, and packet bytes panes
2. Write and apply Wireshark display filters to isolate specific traffic
3. Follow TCP and UDP conversations and reconstruct application-layer exchanges
4. Analyze DNS and HTTP traffic captured from a simulated network

**KG Domain Coverage:** NET-12 (packet capture), NET-28 (Wireshark display filters)
**Practical Outcomes:** Learner captures traffic in a simulated environment, applies four display filters, follows a TCP stream, and identifies an anomalous DNS response in the PCAP
**Required Interactive Components:** TerminalEmulator (Wireshark interface simulation), PacketFlowDiagram (conversation reconstruction), QuizWidget
**Animation Categories:** Wireshark pane orientation, display filter syntax, TCP stream reconstruction, PCAP file anatomy
**Simulations:** Wireshark emulator with pre-loaded PCAPs — learner performs all analysis tasks within the browser; no local software installation required
**Assessment Strategy:** Quiz-only for L1; quiz-and-challenge for L2, L3, and L4

**Practical Progression:**
- **Beginner:** Open a preloaded PCAP in the Wireshark emulator and identify five protocol types visible in the packet list
- **Intermediate:** Write a display filter to show only DNS traffic and count the number of unique domains queried
- **Advanced:** Follow the TCP stream for a suspicious HTTP connection and extract the User-Agent header and URL path
- **Capstone:** Not applicable at module level

---

##### A2.C3.M1.L1 — Your First Packet Capture
- **Slug:** your-first-packet-capture | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-12 | **Prereqs:** A2.C2.M3.L4
- **Interactive:** TerminalEmulator (Wireshark emulator — packet list, packet detail, bytes panes), ClickableDiagram (Wireshark interface anatomy), QuizWidget
- **Animations:** wireshark-interface-orientation, packet-list-to-detail-drill-down, pcap-file-format-overview
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Network+ Domain 3, Security+ Domain 3 | **Careers:** SOC Analyst, Incident Responder, Network Engineer | **Accessibility:** Wireshark emulator provides full keyboard navigation; all pane elements have aria labels; packet detail tree keyboard-expandable; screen-reader output enabled for selected packet fields

**Learning Objectives:**
1. Navigate the Wireshark interface: identify the packet list pane (one row per packet), packet detail pane (protocol tree), and packet bytes pane (hex dump)
2. Identify the information visible in the packet list columns: frame number, timestamp, source IP, destination IP, protocol, length, and Info summary
3. Click a packet to expand its protocol tree in the detail pane and identify the Ethernet, IP, TCP, and application-layer sections

**Skills Gained:** Wireshark interface navigation, packet detail tree, protocol dissection, PCAP reading workflow
**AI Mentor:** Many learners feel overwhelmed by the volume of data in a real packet capture. Frame the cognitive load explicitly: "You do not need to read every packet. You need to ask a question, apply a filter, and look only at what answers that question. The rest of this module teaches you exactly that."

---

##### A2.C3.M1.L2 — Wireshark Display Filters
- **Slug:** wireshark-display-filters | **Type:** expository | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-28, NET-12 | **Prereqs:** A2.C3.M1.L1
- **Interactive:** TerminalEmulator (display filter practice with real-time packet count feedback), QuizWidget
- **Animations:** display-filter-syntax-anatomy, comparison-operators-walkthrough, filter-compound-with-and-or
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 3, Security+ Domain 3, CySA+ | **Careers:** SOC Analyst, Incident Responder, Network Security Engineer | **Accessibility:** Filter input field labeled; error messages aria-announced; packet count display screen-reader accessible; all filter examples provided in text format alongside the interactive

**Learning Objectives:**
1. Write Wireshark display filters using protocol names (`dns`, `http`, `tcp`), field values (`ip.addr == 10.0.0.1`, `tcp.port == 443`), and comparison operators (`==`, `!=`, `>`, `contains`)
2. Combine filters using logical operators (`&&` for AND, `||` for OR, `!` for NOT) to create targeted multi-condition filters
3. Apply four critical security analysis filters: show only SYN packets (`tcp.flags.syn == 1 && tcp.flags.ack == 0`), show only DNS responses (`dns.flags.response == 1`), show only HTTP traffic to a specific IP, show failed TLS handshakes

**Skills Gained:** Wireshark display filter syntax, protocol field filters, compound filters, security-focused filter patterns
**AI Mentor:** Wireshark display filter syntax is not the same as BPF (Berkeley Packet Filter) capture filter syntax. Flag this distinction to avoid confusion when learners later encounter tcpdump (which uses BPF). Wireshark display filters operate post-capture on the loaded PCAP; BPF capture filters operate at capture time to limit what is saved.

---

##### A2.C3.M1.L3 — Following TCP Conversations
- **Slug:** following-tcp-conversations | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-09, NET-12, NET-13 | **Prereqs:** A2.C3.M1.L1, A2.C3.M1.L2
- **Interactive:** TerminalEmulator (follow TCP stream on preloaded PCAP), PacketFlowDiagram (conversation reconstruction view), QuizWidget
- **Animations:** tcp-stream-reassembly, wireshark-stream-color-coding, conversation-statistics-view
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 3, Security+ Domain 3, CySA+ | **Careers:** SOC Analyst, Incident Responder, Network Forensics | **Accessibility:** TCP stream display provides full text output readable by screen reader; color-coding of client vs. server data supplemented by directional arrows and text labels; stream content exportable as plain text

**Learning Objectives:**
1. Use Wireshark's "Follow TCP Stream" feature to reassemble the full application-layer conversation from fragmented TCP packets
2. Identify which stream direction is client-to-server vs. server-to-client and read the reassembled HTTP, FTP, or SMTP content
3. Use the Wireshark Conversations window to view all TCP conversations in a PCAP, sort by bytes transferred, and identify the highest-volume connection

**Skills Gained:** TCP stream reassembly, application-layer content extraction, conversation statistics, data volume analysis
**AI Mentor:** Reinforce that following a TCP stream reveals the plaintext content of unencrypted connections — HTTP, FTP, Telnet, and SMTP are all exposed. This is the fundamental reason why plaintext protocols are treated as a security risk. For HTTPS streams, the stream will show encrypted data and learner will understand why TLS matters viscerally.

---

##### A2.C3.M1.L4 — Analyzing DNS and HTTP Traffic
- **Slug:** analyzing-dns-http-traffic | **Type:** discovery | **Duration:** 55 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-07, NET-11, NET-12 | **Prereqs:** A2.C3.M1.L1, A2.C3.M1.L2, A2.C3.M1.L3
- **Interactive:** TerminalEmulator (multi-protocol PCAP with DNS anomaly), PacketFlowDiagram (suspicious DNS response highlighting), QuizWidget
- **Animations:** dns-in-wireshark-view, http-response-in-pcap, anomaly-detection-walk-through
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, CySA+, Network+ Domain 3 | **Careers:** SOC Analyst, Incident Responder, Threat Hunter | **Accessibility:** PCAP analysis view screen-reader accessible; anomalous packets highlighted with both color and a text marker column; all filter steps listed as a numbered procedure in addition to being demonstrated

**Learning Objectives:**
1. Filter a PCAP to show all DNS traffic and identify the queried domain, query type, and response IP for five DNS transactions
2. Identify a suspicious DNS response: an IP address that differs from the expected authoritative answer (indicator of DNS spoofing or cache poisoning)
3. Filter to show only HTTP POST requests and extract the form fields transmitted in the request body (credentials sent in cleartext)

**Skills Gained:** DNS traffic analysis in Wireshark, DNS anomaly detection, HTTP POST body inspection, credential exposure in plaintext protocols, PCAP-based threat hunting basics
**AI Mentor:** If learner identifies credentials in a cleartext HTTP POST, use it as the "aha" moment — this is exactly what an attacker performing an on-path attack would see. Connect to HTTPS and TLS from A2.C2.M3: the HTTPS version of this POST would show only encrypted bytes. The contrast between the two is the most memorable argument for encrypted protocols.

---

### Module A2.C3.M2 — Network Scanning with Nmap

**Module Objectives:**
1. Understand what network scanning is and why it is an authorized, essential security activity
2. Perform host discovery using Nmap ping sweep and ICMP probes
3. Execute port scans using different Nmap scan types and interpret the output
4. Use Nmap service detection and OS detection and produce a formatted scan report

**KG Domain Coverage:** NET-14 (Nmap)
**Practical Outcomes:** Learner runs a complete Nmap scan against an authorized lab target, interprets the open/closed/filtered port states, identifies the running services and versions, and produces a formatted scan summary
**Required Interactive Components:** TerminalEmulator (Nmap in authorized lab environment), ClickableDiagram (Nmap output anatomy), QuizWidget
**Animation Categories:** TCP SYN scan packet flow, Nmap scan type comparison, service fingerprinting exchange, OS detection probes
**Simulations:** Nmap lab environment — authorized target range; all scans run in a sandboxed simulation; learner types real Nmap commands and receives simulated output
**Assessment Strategy:** Quiz-and-challenge for all four lessons; free-lab for L4

**Practical Progression:**
- **Beginner:** Run a ping sweep against a /24 subnet and identify which hosts are up using `nmap -sn 192.168.1.0/24`
- **Intermediate:** Perform a SYN scan on a single host and interpret the open, closed, and filtered port states
- **Advanced:** Add service version detection and OS detection flags to a scan and identify the running software versions from the output
- **Capstone:** Not applicable at module level

---

##### A2.C3.M2.L1 — Nmap Basics and Host Discovery
- **Slug:** nmap-basics-host-discovery | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** true
- **KG Nodes:** NET-14 | **Prereqs:** A2.C3.M1.L4
- **Interactive:** TerminalEmulator (Nmap lab — ping sweep), ClickableDiagram (Nmap output anatomy — host status, port state, protocol), QuizWidget
- **Animations:** nmap-ping-sweep-visualization, arp-scan-vs-icmp-scan, host-up-down-determination
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 5, Network+ Domain 4, eJPT, CEH | **Careers:** Penetration Tester, SOC Analyst, Network Security Engineer | **Accessibility:** Terminal emulator provides screen-reader output for all command results; Nmap output formatting uses monospace with labeled sections; all interactive elements keyboard-accessible

**Ethical Framing (Guardrail ETH1):** Nmap is a legitimate network administration and security assessment tool. Scanning networks or systems without explicit written authorization is illegal under the Computer Fraud and Abuse Act (US), the Computer Misuse Act (UK), and equivalent legislation in most jurisdictions. Every scan in this module is performed against an authorized lab environment. Unauthorized scanning is not practiced, demonstrated, or encouraged.

**Learning Objectives:**
1. Explain what Nmap is, what it is used for, and why authorization is a legal and ethical prerequisite before any scan
2. Run a host discovery (ping sweep) scan with `nmap -sn <target-range>` and interpret which hosts responded as up
3. Explain the difference between host discovery and port scanning, and why a two-phase approach (discover then scan) is more efficient

**Skills Gained:** Nmap basic usage, ping sweep, host discovery, -sn flag, authorized scanning workflow
**AI Mentor:** Reinforce the ethical framing every time a new Nmap capability is introduced. The lab environment is explicitly authorized. If a learner asks about scanning targets outside the lab, redirect clearly: "All Nmap exercises run in an authorized lab. Scanning any system without written authorization is illegal. If you want to scan your own home network, the principle is the same — own the target."

---

##### A2.C3.M2.L2 — Port Scanning Techniques
- **Slug:** port-scanning-techniques | **Type:** expository | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** true
- **KG Nodes:** NET-14 | **Prereqs:** A2.C3.M2.L1
- **Interactive:** TerminalEmulator (TCP SYN scan, TCP connect scan, UDP scan), ComparisonTable (scan type vs. stealth vs. speed vs. accuracy), QuizWidget
- **Animations:** tcp-syn-scan-packet-flow, connect-scan-vs-syn-scan, filtered-port-firewall-effect
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 5, Network+ Domain 4, eJPT, CEH | **Careers:** Penetration Tester, SOC Analyst, Network Security Engineer | **Accessibility:** Scan type comparison table has proper headers; terminal output uses monospace with screen-reader labels; animation has step-through alternative

**Ethical Framing (Guardrail ETH1):** Port scanning reveals what services a system is running. This information is essential for network administration, vulnerability assessment, and authorized penetration testing. All scan techniques in this lesson are performed in the authorized lab. Learners are taught to document their authorization and scope before any real-world engagement.

**Learning Objectives:**
1. Distinguish between three Nmap scan types: TCP SYN scan (-sS, half-open), TCP connect scan (-sT, full three-way handshake), and UDP scan (-sU)
2. Interpret the three port states Nmap reports: open (service listening and responding), closed (port reachable but no service), filtered (firewall dropped or rejected the probe)
3. Explain why a SYN scan is considered "stealthier" than a connect scan in terms of what is logged by the target system

**Skills Gained:** TCP SYN scan, TCP connect scan, UDP scan, port state interpretation, scan stealth concept
**AI Mentor:** Flag the common misconception that a SYN scan is "invisible" — it is logged by modern firewalls and IDS systems regardless of whether it completes the handshake. The term "stealth" is relative to older application-level logging, not network-level detection. This distinction matters for the blue-team perspective in A2.C4.

---

##### A2.C3.M2.L3 — Service and OS Detection
- **Slug:** nmap-service-os-detection | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** true
- **KG Nodes:** NET-14 | **Prereqs:** A2.C3.M2.L1, A2.C3.M2.L2
- **Interactive:** TerminalEmulator (Nmap -sV -O scan with service fingerprinting output), ClickableDiagram (service version field anatomy in Nmap output), QuizWidget
- **Animations:** service-banner-grabbing-animation, os-detection-probe-series, version-confidence-scoring
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 5, Network+ Domain 4, eJPT, CEH | **Careers:** Penetration Tester, Vulnerability Analyst, SOC Analyst | **Accessibility:** Service detection output in screen-reader accessible monospace with labeled fields; OS guess confidence percentages labeled with text; all Nmap flags listed in a text reference table

**Ethical Framing (Guardrail ETH1):** Service detection actively interrogates open ports to fingerprint running software versions. Version information is used in authorized assessments to identify unpatched software and match known CVEs. In this lesson, all interrogation is against the lab environment. Learners are not taught to use version data to exploit unpatched systems — that belongs to advanced penetration testing academies.

**Learning Objectives:**
1. Run Nmap with service version detection (`-sV`) and interpret the output fields: port, state, service name, version string, and extra information
2. Explain how Nmap identifies service versions (banner grabbing and probe-response matching against the nmap-service-probes database)
3. Run OS detection (`-O`) and interpret the OS guess output including accuracy percentage and the caveats on reliability

**Skills Gained:** -sV flag, -O flag, service fingerprinting, version detection interpretation, OS fingerprinting concept, nmap-service-probes awareness
**AI Mentor:** Connect version detection to the vulnerability management lifecycle: knowing that a host runs Apache 2.4.51 allows a defender (or attacker) to check the NVD for known CVEs. This is the direct bridge from network scanning to vulnerability management — a connection worth making explicit for learners on the SOC or blue-team path.

---

##### A2.C3.M2.L4 — Documenting Nmap Output
- **Slug:** documenting-nmap-output | **Type:** guided-lab | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-14 | **Prereqs:** A2.C3.M2.L1, A2.C3.M2.L2, A2.C3.M2.L3
- **Interactive:** TerminalEmulator (Nmap -oN -oX -oG output formats), QuizWidget
- **Animations:** nmap-output-format-comparison, report-template-population
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 5, Network+ Domain 4 | **Careers:** Penetration Tester, Network Security Engineer, Vulnerability Analyst | **Accessibility:** Output format examples rendered in accessible code blocks; XML output has a plain-text alternative summary; lab instructions available as a numbered text list

**Learning Objectives:**
1. Save Nmap output in three formats using the `-oN` (normal), `-oX` (XML), and `-oG` (grepable) flags and explain the use case for each
2. Produce a structured scan summary table from Nmap output containing: host IP, open ports, service names, and version strings
3. Explain what information a penetration tester must include in a scope document before running Nmap in a real engagement (authorization, IP ranges, exclusions, timing constraints)

**Skills Gained:** Nmap output formats, scan documentation, report structure, engagement scope documentation
**AI Mentor:** This lesson is the professionalization layer on top of the technical scanning skills. Emphasize that tool usage without documentation is unprofessional and legally risky. Penetration testers who cannot produce clean, attributed scan reports are not effective in the field. This directly connects to the career-connection for Marcus and Jordan personas.

---

### Module A2.C3.M3 — Protocols in Depth

**Module Objectives:**
1. Identify SMB, SSH, and FTP traffic characteristics and security posture
2. Understand the email protocol stack (SMTP, IMAP, POP3) at the protocol level
3. Recognize LDAP and SNMP in packet captures and understand their security implications
4. Understand how Kerberos authentication flows across the network

**KG Domain Coverage:** NET-26 (SMB), NET-27 (LDAP), and surrounding application-layer protocol nodes
**Practical Outcomes:** Learner identifies five protocols in a mixed enterprise PCAP and classifies each as encrypted or cleartext, identifying which ones represent security risks in their default configuration
**Required Interactive Components:** TerminalEmulator (multi-protocol PCAP), ClickableDiagram (enterprise protocol map), ComparisonTable (protocol vs. port vs. encrypted default), QuizWidget
**Animation Categories:** SMB authentication exchange, SSH key exchange handshake, SMTP relay chain, LDAP bind request, Kerberos TGT exchange
**Simulations:** Enterprise network protocol explorer — learner clicks on a device and sees which protocols it uses for which function
**Assessment Strategy:** Quiz-only for L1 and L2; quiz-and-challenge for L3 and L4

**Practical Progression:**
- **Beginner:** Match eight enterprise protocols to their default port numbers and classify each as encrypted by default or cleartext by default
- **Intermediate:** Read a Wireshark capture of an SMB authentication and identify the protocol version, user, and domain
- **Advanced:** Trace a Kerberos authentication sequence: AS-REQ, AS-REP (TGT), TGS-REQ, TGS-REP (ticket) through a provided annotated PCAP
- **Capstone:** Not applicable at module level

---

##### A2.C3.M3.L1 — SMB, SSH, and FTP
- **Slug:** smb-ssh-ftp | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-26 | **Prereqs:** A2.C3.M2.L4
- **Interactive:** ComparisonTable (SMB vs. SSH vs. FTP — port, encryption, use case, security risk), TerminalEmulator (simulated SSH connection establishment), QuizWidget
- **Animations:** smb-authentication-exchange, ssh-key-exchange-handshake, ftp-active-vs-passive-mode
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 3, Network+ Domain 1, (ISC)² CC Domain 4 | **Careers:** SOC Analyst, Systems Administrator, Network Security Engineer | **Accessibility:** Comparison table has proper headers; SSH handshake animation steppable with text labels; no color-only encoding for protocol types

**Learning Objectives:**
1. Explain what SMB (Server Message Block) is used for (file sharing, printer sharing, domain authentication) and identify SMBv1 as a deprecated and dangerous protocol (EternalBlue reference)
2. Describe how SSH differs from Telnet: SSH encrypts all traffic including credentials; Telnet transmits everything in cleartext
3. Explain FTP active vs. passive mode and identify why FTP transmits credentials in cleartext (a security risk corrected by SFTP and FTPS)

**Skills Gained:** SMB protocol basics, SSH vs. Telnet comparison, FTP modes, cleartext protocol risks, protocol version awareness
**AI Mentor:** Flag SMBv1 and EternalBlue as a forward-reference to the malware and incident response content — WannaCry and NotPetya both exploited SMBv1. The connection between "protocol version matters" and "real-world catastrophic outbreak" is powerful and memorable.

---

##### A2.C3.M3.L2 — Email Protocols: SMTP, IMAP, and POP3
- **Slug:** email-protocols-smtp-imap-pop3 | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-11 | **Prereqs:** A2.C3.M3.L1
- **Interactive:** PacketFlowDiagram (SMTP relay chain — MUA to MTA to MTA to MDA), ComparisonTable (IMAP vs. POP3), ClickableDiagram (email header anatomy — From, To, Received, DKIM-Signature, X-Spam-Status), QuizWidget
- **Animations:** smtp-relay-chain-animation, imap-folder-sync-vs-pop3-download, email-header-trace
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 1, Security+ Domain 2 | **Careers:** SOC Analyst, Systems Administrator, Security Engineer | **Accessibility:** SMTP relay diagram has a labeled adjacency list text alternative; email header example rendered as accessible code block; comparison table has row and column headers

**Learning Objectives:**
1. Describe the role of SMTP (sending and relaying email between mail servers, port 25/587) and distinguish it from IMAP (port 143/993) and POP3 (port 110/995) for client retrieval
2. Trace an email's journey from the sender's MUA through at least two MTAs to the recipient's MDA and identify where SMTP is used at each hop
3. Read an email header to extract the sending IP address from the Received headers and identify SPF, DKIM, and DMARC result fields

**Skills Gained:** SMTP relay chain, IMAP vs. POP3, email header analysis, SPF/DKIM/DMARC awareness, email tracing for phishing investigation
**AI Mentor:** Email header analysis is a core SOC skill used in phishing triage. The "Received" header chain is the forensic trail that reveals the true origin of an email, independent of the spoofable "From" field. Flag this explicitly for Jordan (SOC analyst persona) as a skill that appears in day-one job duties.

---

##### A2.C3.M3.L3 — LDAP and SNMP
- **Slug:** ldap-and-snmp | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-27 | **Prereqs:** A2.C3.M3.L1
- **Interactive:** ClickableDiagram (LDAP directory tree — DN structure, organizational units, object classes), ComparisonTable (LDAP vs. LDAPS vs. LDAP + StartTLS), QuizWidget
- **Animations:** ldap-bind-request-response, ldap-search-filter-animation, snmp-get-trap-animation
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 3, Network+ Domain 1, (ISC)² CC Domain 4 | **Careers:** SOC Analyst, Security Engineer, Active Directory Administrator | **Accessibility:** LDAP tree diagram keyboard-navigable; DN strings available as aria-labeled text; SNMP OID notation explained with a plain-language alternative; no pointer-only interactions

**Learning Objectives:**
1. Explain what LDAP is (Lightweight Directory Access Protocol, port 389/636), what an LDAP directory stores (users, groups, computers, policies), and how Distinguished Names (DNs) identify objects
2. Identify why plain LDAP (port 389) is a security risk (credentials transmitted in cleartext) and name the two encrypted alternatives (LDAPS on port 636, LDAP with StartTLS)
3. Explain what SNMP is (Simple Network Management Protocol), what it is used for (monitoring device metrics, trap alerts), and why SNMPv1/v2 community strings are a security risk

**Skills Gained:** LDAP directory concept, DN structure, LDAP encryption options, SNMP versions, community string risk, network management protocol awareness
**AI Mentor:** LDAP is the query layer underneath Active Directory — learners who understand LDAP will have a significant advantage in Academy 4 (Windows Security) where AD authentication and LDAP enumeration are covered in depth. Plant this connection explicitly.

---

##### A2.C3.M3.L4 — Kerberos on the Network
- **Slug:** kerberos-on-the-network | **Type:** expository | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-27, NET-09 | **Prereqs:** A2.C3.M3.L1, A2.C3.M3.L3
- **Interactive:** PacketFlowDiagram (Kerberos exchange — AS-REQ, AS-REP, TGS-REQ, TGS-REP, AP-REQ), ClickableDiagram (Kerberos components — KDC, TGT, service ticket, SPN), QuizWidget
- **Animations:** kerberos-tgt-acquisition, kerberos-service-ticket-exchange, kerberos-ticket-anatomy
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 3, (ISC)² CC Domain 4, CCNA Security | **Careers:** SOC Analyst, Security Engineer, Active Directory Administrator, Penetration Tester | **Accessibility:** Kerberos flow diagram steppable with keyboard; each message labeled with its name and content summary; animation has reduced-motion alternative; all acronyms (KDC, TGT, SPN) expanded on first use per Guardrail T1

**Learning Objectives:**
1. Describe the four Kerberos message exchanges (AS-REQ, AS-REP with TGT, TGS-REQ, TGS-REP with service ticket) and what each message accomplishes
2. Explain what the Key Distribution Center (KDC) does (issues TGTs and service tickets) and why clients never send their password over the network
3. Identify Kerberos traffic by port (88/UDP and TCP) and explain why Kerberos tickets appearing in a Wireshark capture outside a domain context is an anomaly indicator

**Skills Gained:** Kerberos authentication flow, TGT and service ticket concepts, KDC role, Kerberos ticket anatomy, Kerberos anomaly indicators
**AI Mentor:** Kerberos is a single KG node (conceptually) that expands massively in Academy 4 (Active Directory). Surface the sub-node gap explicitly: Pass-the-Ticket, Kerberoasting, and Golden Ticket attacks are all downstream of understanding this ticket exchange. This lesson plants the seed; Academy 4 grows it. Note that KG Part 14 identifies Kerberos as a complex concept requiring sub-node expansion.

---

### Course A2.C3 — Capstone

**Title:** The Analyst's Lab
**Type:** quiz-and-capstone | **Duration:** 80 min | **Difficulty:** intermediate

**Scenario:** A security incident has been declared at Helix Corp. The SOC has collected a 48-hour PCAP from the network tap and an Nmap scan of all active hosts. Learner plays the role of a Tier-2 SOC analyst and must:
1. Open the PCAP in the Wireshark emulator, apply filters to isolate traffic by protocol, and produce a protocol usage summary (which protocols, which hosts, approximate volume)
2. Identify the three anomalous events in the PCAP: a cleartext FTP login (credentials visible), an SMBv1 negotiation response (deprecated protocol in use), and a DNS query to a domain with no A record response (possible C2 beacon)
3. Run an Nmap scan in the authorized lab environment (`nmap -sV -O <target>`), produce a formatted scan table, and identify any service running on a non-standard port
4. Write a one-page incident brief: what was found, why it is significant, and three immediate remediation recommendations

**Assessment Criteria:** PCAP protocol identification (25%), anomaly detection accuracy (35%), Nmap scan documentation (25%), incident brief quality (15%)
**KG Validation:** NET-07, NET-09, NET-12, NET-14, NET-26, NET-27, NET-28 all exercised
**Mastery Gate:** ≥80% to unlock Course A2.C4

---

## PART 4: COURSE A2.C4 — NETWORK SECURITY

**Purpose:** Knowing how networks work is necessary but insufficient. This course applies that knowledge to the adversarial domain — learners see how attackers exploit the same protocols they have spent three courses learning, and how defenders build layered controls to detect and stop those exploits. The arc moves from foundational controls (firewalls, VPNs, segmentation) through wireless security to six concrete network attack techniques (ARP poisoning, SYN flood, DNS spoofing, MITM, rogue DHCP, DoS amplification). Each attack is paired with its detection signature and defensive countermeasure. Ethical framing precedes all offensive content per Guardrail ETH1.

**Learning Outcomes:**
- Explain the difference between stateful and stateless firewalls and write basic access control rules
- Design a network with at least two security zones and a DMZ for a given organizational scenario
- Explain how VPNs create encrypted tunnels and distinguish IPsec from TLS-based VPNs
- Identify the security requirements of 802.11 wireless networks and distinguish WPA2 from WPA3
- Explain and detect ARP poisoning, SYN flood, DNS spoofing, and MITM attacks
- Identify the defensive countermeasures for each attack category covered in this course

**Estimated Hours:** 9–11 hours | **Difficulty:** intermediate | **Prerequisites:** A2.C3 Capstone (≥80%)
**Career Relevance:** SOC Analyst (primary), Network Security Engineer (primary), Penetration Tester (secondary), Cloud Security Engineer (secondary)
**Certification Alignment:** CompTIA Security+ Domain 3 and 4, Network+ Domain 2 and 4, (ISC)² CC Domain 4, CompTIA CySA+, CEH Domain 9

---

### Module A2.C4.M1 — Firewalls, NAT, and VPNs

**Module Objectives:**
1. Distinguish between stateless (ACL-based) and stateful (connection-tracking) firewalls and explain when each is appropriate
2. Write firewall rules using source/destination IP, port, and protocol
3. Explain how VPNs create encrypted tunnels and distinguish the two main VPN architectures
4. Design a network with security zones and a DMZ

**KG Domain Coverage:** NET-15 (Firewall), NET-17 (VPN), NET-19 (VLANs)
**Practical Outcomes:** Learner writes a five-rule firewall policy for a provided network scenario and identifies which packets are permitted, denied, or inspected
**Required Interactive Components:** ScenarioSimulator (firewall rule builder), ClickableDiagram (DMZ topology), ComparisonTable (stateful vs. stateless, IPsec vs. TLS VPN), QuizWidget
**Animation Categories:** Stateful inspection connection tracking, DMZ traffic flow, IPsec tunnel establishment, VPN split tunneling
**Simulations:** Firewall rule builder — learner constructs rules and tests packets against them; DMZ designer — drag-and-drop topology builder
**Assessment Strategy:** Quiz-only for L1; quiz-and-challenge for L2, L3, and L4

**Practical Progression:**
- **Beginner:** Identify whether each of five packets is permitted or denied by a provided five-rule firewall ACL
- **Intermediate:** Write a firewall rule set for a scenario: allow HTTP/HTTPS from anywhere to the web server in the DMZ; allow established connections back; deny everything else
- **Advanced:** Design a three-zone network (internal, DMZ, internet) with firewall rules between each pair of zones; justify each rule
- **Capstone:** Not applicable at module level

---

##### A2.C4.M1.L1 — Stateful vs. Stateless Firewalls
- **Slug:** stateful-vs-stateless-firewalls | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-15 | **Prereqs:** A2.C3.M3.L4
- **Interactive:** ComparisonTable (stateless ACL vs. stateful firewall — state tracking, return traffic handling, performance, attack resistance), ClickableDiagram (stateful connection table), QuizWidget
- **Animations:** stateless-acl-packet-check, stateful-connection-table-tracking, ack-without-syn-drop
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Security+ Domain 3, Network+ Domain 2, (ISC)² CC Domain 4 | **Careers:** Network Security Engineer, SOC Analyst, Security Engineer | **Accessibility:** Comparison table has proper headers; connection table diagram navigable by keyboard; all state transitions labeled as text

**Learning Objectives:**
1. Explain what a stateless firewall (ACL-based) does: evaluates each packet independently against a rule list without tracking connection state
2. Explain what a stateful firewall does: maintains a connection state table and allows return traffic for established connections without an explicit permit rule
3. Identify the security advantage of stateful inspection: it can detect and drop ACK packets with no matching SYN state, blocking a common port-scan evasion technique

**Skills Gained:** stateless vs. stateful firewall concepts, connection state table, implicit deny, return traffic handling, firewall evasion awareness
**AI Mentor:** Reinforce the connection to TCP state machine from A2.C2.M1.L2 — a stateful firewall tracks the same state transitions (SYN, SYN-ACK, ESTABLISHED) that the learner already understands. This is spiral learning activating prior knowledge.

---

##### A2.C4.M1.L2 — Writing Firewall Rules
- **Slug:** writing-firewall-rules | **Type:** guided-lab | **Duration:** 55 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-15, NET-19 | **Prereqs:** A2.C4.M1.L1
- **Interactive:** ScenarioSimulator (firewall rule builder with packet test tool), ClickableDiagram (rule processing — top-to-bottom, first match wins), QuizWidget
- **Animations:** rule-order-first-match-wins, implicit-deny-at-end, rule-shadowing-demonstration
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 3, Network+ Domain 4, (ISC)² CC Domain 4 | **Careers:** Network Security Engineer, Security Engineer, SOC Analyst | **Accessibility:** Rule builder fully keyboard-navigable; packet test results announced by aria; rule list uses proper table structure; test scenarios available as text descriptions alongside the interactive

**Learning Objectives:**
1. Write an ACL-style firewall rule using the five-tuple: source IP, destination IP, source port, destination port, protocol — and apply permit or deny
2. Explain the first-match-wins processing model and demonstrate how rule order affects which packets are allowed or blocked
3. Identify three common firewall misconfigurations: an overly broad permit-any rule, a deny rule that shadows a more-specific permit, and a missing implicit deny at the bottom of a rule list

**Skills Gained:** firewall rule writing, five-tuple access control, rule order, rule shadowing, implicit deny, ACL debugging
**AI Mentor:** This lesson has the highest practical complexity in M1. Use the 3-hint scaffold per Guardrail S2 if learner cannot construct a rule that correctly permits HTTP return traffic without allowing arbitrary inbound connections. Hint 1: "A return packet has the destination port in the ephemeral range." Hint 2: "A stateful firewall handles return traffic automatically — you only need the outbound permit." Hint 3: Full rule with explanation.

---

##### A2.C4.M1.L3 — VPNs and Encrypted Tunnels
- **Slug:** vpns-encrypted-tunnels | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-17 | **Prereqs:** A2.C4.M1.L1, A2.C2.M3.L3
- **Interactive:** PacketFlowDiagram (IPsec tunnel mode — original packet encapsulated, new IP header added), ComparisonTable (IPsec vs. SSL/TLS VPN — use case, protocol layer, client requirements), QuizWidget
- **Animations:** vpn-tunnel-encapsulation, split-tunneling-vs-full-tunnel, certificate-auth-vs-psk
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Security+ Domain 3, Network+ Domain 2, CCNA Security | **Careers:** Network Security Engineer, Security Engineer, Remote Access Administrator | **Accessibility:** Tunnel encapsulation diagram fully text-labeled; comparison table has headers; IPsec/TLS terminology defined on first use; no animation required to complete learning objectives

**Learning Objectives:**
1. Explain what a VPN does: creates an encrypted tunnel that extends a private network across a public network, protecting confidentiality and integrity of transit data
2. Distinguish IPsec VPNs (Layer 3, typically site-to-site, requires IKE key exchange) from TLS/SSL VPNs (Layer 7, typically remote-access, runs over HTTPS port 443)
3. Explain split tunneling: what it is (routing only corporate traffic through the VPN, not all internet traffic), its performance benefit, and its security risk (endpoint connects to untrusted networks simultaneously)

**Skills Gained:** VPN mechanics, IPsec vs. TLS VPN, tunnel mode vs. transport mode, split tunneling, remote-access security
**AI Mentor:** Many learners use commercial VPNs for privacy but do not understand how they differ from enterprise VPNs. Distinguish clearly: a commercial VPN (ExpressVPN, NordVPN) moves trust to the VPN provider; an enterprise VPN (Cisco AnyConnect, Palo Alto GlobalProtect) extends corporate network access to remote employees. They solve different problems.

---

##### A2.C4.M1.L4 — Network Segmentation and the DMZ
- **Slug:** network-segmentation-dmz | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-15, NET-19, NET-16 | **Prereqs:** A2.C4.M1.L1, A2.C4.M1.L2, A2.C4.M1.L3
- **Interactive:** ClickableDiagram (three-zone topology: internet, DMZ, internal network with firewall rules shown per segment boundary), ScenarioSimulator (design a DMZ for a given scenario), QuizWidget
- **Animations:** dmz-traffic-flow-web-request, lateral-movement-without-segmentation, segmentation-containing-breach
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 2, (ISC)² CC Domain 4 | **Careers:** Network Security Engineer, Security Architect, Security Engineer | **Accessibility:** Topology diagram has text-based adjacency description; traffic flow animation steppable; DMZ designer tool fully keyboard-navigable; no drag-only interactions

**Learning Objectives:**
1. Explain what a DMZ (Demilitarized Zone) is and why public-facing servers (web, email, DNS) are placed there rather than on the internal network
2. Describe the two-firewall DMZ architecture (one firewall between internet and DMZ, one between DMZ and internal) and explain what each firewall controls
3. Analyze a given network scenario and identify where segmentation would contain a breach: an attacker who compromises a DMZ web server should not be able to reach the internal HR database

**Skills Gained:** DMZ concept, two-firewall architecture, security zone design, lateral movement containment, defense-in-depth topology
**AI Mentor:** Connect to the Academy capstone scenario (Helix Corp network incident) — the capstone network will have a DMZ that the learner designs. This lesson is the prerequisite mental model. Ensure learner can articulate *why* the DMZ exists before they design one.

---

### Module A2.C4.M2 — Wireless Security

**Module Objectives:**
1. Understand 802.11 standards and the security evolution from WEP to WPA3
2. Explain the WPA2 and WPA3 authentication and encryption mechanisms
3. Identify common wireless attack techniques and their indicators
4. Implement wireless security configuration for a given enterprise scenario

**KG Domain Coverage:** D3 Networking domain — wireless security subcomponent (pending KG sub-node expansion per KG Part 14)
**Practical Outcomes:** Learner identifies the security protocol in use for three simulated wireless networks and explains which is vulnerable and why, then configures a simulated access point with WPA3-Personal settings
**Required Interactive Components:** ClickableDiagram (802.11 association process), ComparisonTable (WEP vs. WPA vs. WPA2 vs. WPA3), ScenarioSimulator (AP configuration panel), QuizWidget
**Animation Categories:** 802.11 association and authentication exchange, WPA2 four-way handshake, evil twin AP race condition, WPA3 SAE dragonfly handshake
**Simulations:** Wireless security configuration simulator — learner configures an AP with correct WPA3 settings, SSID broadcast, and client isolation
**Assessment Strategy:** Quiz-only for L1 and L4; quiz-and-challenge for L2 and L3

**Practical Progression:**
- **Beginner:** Match four wireless security protocols (WEP, WPA, WPA2-TKIP, WPA2-AES) to their vulnerability status (broken/deprecated vs. acceptable vs. recommended)
- **Intermediate:** Explain the WPA2 four-way handshake and identify what is exchanged (PTK derivation, not the PSK itself)
- **Advanced:** Identify three indicators in a wireless environment that suggest an evil twin attack is in progress
- **Capstone:** Not applicable at module level

---

##### A2.C4.M2.L1 — 802.11 Standards and the Wireless Security Timeline
- **Slug:** 80211-standards-wireless-security-timeline | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-05, NET-09 | **Prereqs:** A2.C4.M1.L4
- **Interactive:** ComparisonTable (802.11a/b/g/n/ac/ax — frequency, max speed, key security changes), ClickableDiagram (wireless association and authentication phases), QuizWidget
- **Animations:** 802dot11-association-process, wep-rc4-weakness-simplified, wpa-transition-timeline
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, Security+ Domain 3 | **Careers:** Network Security Engineer, Systems Administrator, SOC Analyst | **Accessibility:** Standards comparison table has proper headers; timeline navigable without animation; all encryption algorithm names defined before use per Guardrail T1

**Learning Objectives:**
1. Identify the major 802.11 standards (b, g, n, ac, ax) and their operating frequencies (2.4 GHz vs. 5 GHz vs. 6 GHz for Wi-Fi 6E)
2. Describe the wireless association process (probe → authentication → association) and explain what happens before a client can send data
3. Explain why WEP was deprecated (RC4 stream cipher key reuse vulnerability, ICV forgery) and why WPA was only a temporary fix

**Skills Gained:** 802.11 standards, wireless association process, WEP vulnerability, WPA/WPA2 progression, frequency band tradeoffs
**AI Mentor:** Many learners assume wireless security protocols are a solved problem. Correct this proactively — WEP is still in use on legacy devices; WPA2-TKIP has known weaknesses; only WPA2-AES and WPA3 represent acceptable current standards. The history matters because legacy devices create real vulnerabilities in enterprise environments today.

---

##### A2.C4.M2.L2 — WPA2 and WPA3
- **Slug:** wpa2-and-wpa3 | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-09 | **Prereqs:** A2.C4.M2.L1
- **Interactive:** PacketFlowDiagram (WPA2 four-way handshake — ANonce, SNonce, MIC, GTK), ComparisonTable (WPA2-Personal vs. WPA2-Enterprise vs. WPA3-Personal vs. WPA3-Enterprise), QuizWidget
- **Animations:** wpa2-four-way-handshake, pmk-ptk-derivation-simplified, wpa3-sae-dragonfly-comparison
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Network+ Domain 2, Security+ Domain 3 | **Careers:** Network Security Engineer, Penetration Tester, SOC Analyst | **Accessibility:** Four-way handshake animation steppable; key derivation explained in text alongside the diagram; all cryptographic terms linked to glossary; WPA3 SAE described in plain English before technical animation

**Learning Objectives:**
1. Explain the WPA2 four-way handshake: what is exchanged (nonces for PTK derivation, not the PSK itself), what the MIC verifies, and why this handshake can be captured for offline dictionary attack
2. Distinguish WPA2-Personal (PSK) from WPA2-Enterprise (802.1X with RADIUS authentication) and explain why Enterprise is preferred for organizations
3. Explain what WPA3-SAE (Simultaneous Authentication of Equals) adds over WPA2-PSK: forward secrecy per-session and resistance to offline dictionary attacks

**Skills Gained:** WPA2 handshake mechanics, PTK derivation, WPA2-Personal vs. Enterprise, RADIUS/802.1X concept, WPA3-SAE advantage, forward secrecy
**AI Mentor:** The WPA2 four-way handshake is directly relevant to the offline PSK cracking technique (hashcat against captured handshake) that appears in penetration testing content. Plant it now without over-explaining the attack — "understanding how the PTK is derived from the PMK tells you exactly why capturing the handshake is useful to an attacker."

---

##### A2.C4.M2.L3 — Wireless Attack Techniques
- **Slug:** wireless-attack-techniques | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** true
- **KG Nodes:** NET-24 | **Prereqs:** A2.C4.M2.L1, A2.C4.M2.L2
- **Interactive:** AttackTimelineViewer (evil twin attack chain), ScenarioSimulator (identify attack type from indicator set), QuizWidget
- **Animations:** evil-twin-deauth-then-connect, krack-attack-simplified, pmkid-capture
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4, CEH Domain 5 | **Careers:** Penetration Tester, Network Security Engineer, SOC Analyst | **Accessibility:** Attack chain timeline navigable by keyboard; scenario simulator fully text-based input; animation has reduced-motion alternative; all attack techniques described in text before animation

**Ethical Framing (Guardrail ETH1):** Wireless attacks are studied because knowing how they work is required to detect them and configure defenses against them. The scenarios in this lesson are presented from a defender's perspective. Learners are not given tool download instructions or step-by-step commands for attacking real wireless networks. Any wireless security assessment must be performed only on networks the learner owns or has explicit written authorization to test.

**Learning Objectives:**
1. Explain the evil twin attack: how an attacker deploys a rogue AP with the same SSID, forces clients to deauthenticate from the legitimate AP (802.11 deauth frames), and captures credentials when clients reconnect to the malicious AP
2. Describe two other wireless attack categories: WPS PIN brute-forcing (offline attack against the 8-digit WPS PIN) and PMKID capture (WPA2 offline dictionary attack without requiring a connected client)
3. Identify three defensive countermeasures: disable WPS, deploy 802.1X/RADIUS instead of PSK, enable Management Frame Protection (MFP/802.11w) to authenticate deauthentication frames

**Skills Gained:** evil twin attack mechanics, 802.11 deauth abuse, WPS vulnerability, PMKID attack concept, MFP/802.11w defense, wireless IDS indicators
**AI Mentor:** Use the three-indicator framework for evil twin detection: same SSID with different BSSID (MAC address), signal strength change when "roaming" to the rogue, and certificate warning if the captive portal uses TLS. These are learnable detection patterns that a SOC analyst would see in wireless IDS output.

---

##### A2.C4.M2.L4 — Securing Wireless Networks
- **Slug:** securing-wireless-networks | **Type:** guided-lab | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-17, NET-15 | **Prereqs:** A2.C4.M2.L1, A2.C4.M2.L2, A2.C4.M2.L3
- **Interactive:** ScenarioSimulator (enterprise AP configuration panel — WPA3-Enterprise, RADIUS, client isolation, management VLAN), QuizWidget
- **Animations:** 802dot1x-radius-authentication-flow, client-isolation-broadcast-block, management-vlan-separation
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4 | **Careers:** Network Security Engineer, Systems Administrator, SOC Analyst | **Accessibility:** AP configuration simulator fully keyboard-navigable; all setting labels have help text; configuration results announced by aria; no drag interactions required

**Learning Objectives:**
1. Configure a simulated wireless AP with WPA3-Enterprise settings, specifying the RADIUS server IP, authentication port, and shared secret
2. Enable client isolation on the AP and explain why it prevents client-to-client communication without impacting internet access
3. Place the AP management interface on a separate VLAN and explain why mixing management and data traffic is a security risk

**Skills Gained:** WPA3-Enterprise configuration, RADIUS integration, client isolation, management VLAN, wireless hardening checklist
**AI Mentor:** Learners who plan to pursue the Network+ or Security+ should be able to articulate all four wireless hardening decisions made in this lab from memory. Run a brief retrieval challenge at the end: "Without looking at the lab, name four wireless security configurations you just applied and the reason for each."

---

### Module A2.C4.M3 — Network Attack Techniques

**Module Objectives:**
1. Understand ARP poisoning and MITM attacks — how they work and how to detect them
2. Understand SYN flood and DoS attacks — the mechanism and the defense
3. Understand DNS spoofing — the mechanism and the DNSSEC defense
4. Apply defensive measures for all three attack categories in a combined network scenario

**KG Domain Coverage:** NET-21 (TCP SYN flood), NET-22 (ARP poisoning), NET-23 (DNS spoofing), NET-24 (MITM)
**Practical Outcomes:** Learner analyzes a PCAP containing indicators of an ARP poisoning attack, identifies the attacker's MAC, the victim's IP, and the malicious ARP reply, then recommends three countermeasures
**Required Interactive Components:** AttackTimelineViewer (MITM attack chain), PacketFlowDiagram (ARP poisoning exchange), ScenarioSimulator (SYN flood defense configuration), QuizWidget
**Animation Categories:** ARP poisoning gratuitous ARP spam, MITM traffic interception, SYN flood half-open queue exhaustion, DNS spoofing forged response injection
**Simulations:** ARP poisoning PCAP analysis; SYN flood defense configuration (SYN cookies enabled/disabled comparison)
**Assessment Strategy:** Quiz-and-challenge for all four lessons; free-lab elements in L1 and L4

**Practical Progression:**
- **Beginner:** Identify the attacker's MAC in a simplified ARP table where two entries claim to own the same IP
- **Intermediate:** Explain the SYN flood attack mechanism step-by-step: how the half-open queue is exhausted and why legitimate connections are then refused
- **Advanced:** Write three Wireshark display filters that would detect the ARP poisoning, SYN flood, and DNS spoofing scenarios covered in this module
- **Capstone:** Not applicable at module level

---

##### A2.C4.M3.L1 — ARP Poisoning and MITM Attacks
- **Slug:** arp-poisoning-mitm-attacks | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** true
- **KG Nodes:** NET-22, NET-24, NET-06 | **Prereqs:** A2.C4.M2.L4
- **Interactive:** PacketFlowDiagram (ARP poisoning — attacker sends gratuitous ARPs to victim and gateway), AttackTimelineViewer (MITM chain: poison → intercept → forward), QuizWidget
- **Animations:** arp-poisoning-gratuitous-arp-flood, arp-table-corruption, mitm-traffic-interception-relay
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4, CEH Domain 9, eJPT | **Careers:** Penetration Tester, SOC Analyst, Incident Responder | **Accessibility:** Attack flow diagram steppable with keyboard; each attack step described as numbered text alongside the animation; all ARP table entries labeled; reduced-motion alternative available

**Ethical Framing (Guardrail ETH1):** ARP poisoning is studied because it is one of the most common LAN-based attack techniques and understanding it is essential for detecting it in PCAP analysis, configuring dynamic ARP inspection, and designing network architecture that limits its blast radius. This lesson covers the mechanism and detection from a defender's perspective. Tool-specific commands for executing the attack are not provided.

**Learning Objectives:**
1. Explain how ARP poisoning works: the attacker sends unsolicited gratuitous ARP replies to both the victim and the gateway, corrupting their ARP caches so traffic intended for the gateway flows through the attacker first
2. Describe what the attacker can do once positioned on-path: passively read plaintext traffic, selectively modify packets, or strip TLS (SSL stripping) from HTTP redirects before the victim connects
3. Identify three detection and prevention countermeasures: Dynamic ARP Inspection (DAI) on managed switches, static ARP entries for critical hosts, and monitoring for duplicate IP-to-MAC mappings in ARP tables

**Skills Gained:** ARP poisoning mechanics, on-path MITM position, SSL stripping concept, Dynamic ARP Inspection, ARP anomaly detection
**AI Mentor:** Activate the ARP foreshadow planted in A2.C1.M3.L2 — "We told you ARP had no authentication. Here is what that means in practice." The spiral learning effect here is intentional. Learners who remember the foreshadow will feel the "I knew this was coming" satisfaction that reinforces retention.

---

##### A2.C4.M3.L2 — SYN Flood and DoS Basics
- **Slug:** syn-flood-dos-basics | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** true
- **KG Nodes:** NET-21, NET-09, NET-13 | **Prereqs:** A2.C4.M3.L1
- **Interactive:** PacketFlowDiagram (SYN flood — half-open queue filling, legitimate connection refused), ScenarioSimulator (SYN cookie defense toggle — observe queue behavior with and without), QuizWidget
- **Animations:** syn-flood-queue-exhaustion, syn-cookie-stateless-response, dos-vs-ddos-scale-difference
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 3, Network+ Domain 4, (ISC)² CC Domain 4 | **Careers:** Network Security Engineer, SOC Analyst, Security Engineer | **Accessibility:** Queue exhaustion animation includes a text-based counter showing queue fill percentage; scenario simulator toggle has accessible label and result description; all attack phases described in text alongside the visual

**Ethical Framing (Guardrail ETH1):** DoS attacks are studied to understand how they achieve impact (queue exhaustion, bandwidth saturation, resource depletion) and how defenses work (SYN cookies, rate limiting, scrubbing centers). This lesson does not provide tools or techniques for executing DoS attacks against unauthorized targets. Executing a DoS attack without authorization is a serious criminal offense in all jurisdictions.

**Learning Objectives:**
1. Explain how a SYN flood attack works: the attacker sends a high volume of SYN packets with spoofed source IPs; the server allocates a half-open connection entry for each SYN-ACK sent, exhausting the SYN backlog queue until legitimate connections are refused
2. Describe how SYN cookies defend against SYN floods without maintaining per-connection state: the server encodes connection information in the initial sequence number and only allocates state when a valid ACK arrives
3. Distinguish a DoS (single source) from a DDoS (distributed sources) attack and explain why rate-limiting a single IP is insufficient against a DDoS with thousands of sources

**Skills Gained:** SYN flood mechanics, half-open connection queue, SYN cookies, DoS vs. DDoS distinction, rate limiting limitations, scrubbing center concept
**AI Mentor:** Activate the TCP state machine knowledge from A2.C2.M1.L2 — "The SYN_RECEIVED state we studied is exactly what the attacker fills the queue with." This is the second spiral activation in A2.C4 and reinforces why learning the state machine was foundational rather than academic.

---

##### A2.C4.M3.L3 — DNS Spoofing
- **Slug:** dns-spoofing | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** true
- **KG Nodes:** NET-23, NET-07 | **Prereqs:** A2.C4.M3.L1, A2.C4.M2.M2.L1
- **Interactive:** PacketFlowDiagram (DNS spoofing — attacker wins race to reply with forged IP), AttackTimelineViewer (DNS cache poisoning chain — Kaminsky attack simplified), QuizWidget
- **Animations:** dns-race-condition-spoofing, dns-cache-poisoning-kaminsky, dnssec-signature-validation-defense
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4 | **Careers:** SOC Analyst, Network Security Engineer, Penetration Tester | **Accessibility:** Race condition animation steppable; forged vs. legitimate response color-coded with text labels; Kaminsky attack described as a numbered sequence in text; DNSSEC validation explained in plain English before technical diagram

**Ethical Framing (Guardrail ETH1):** DNS spoofing is a critical network attack to understand because DNS is a foundational internet service. Defenders who understand how forged responses are injected and cached can properly configure DNSSEC, DoH, and monitoring rules. This lesson presents the attack mechanism and detection patterns. Step-by-step tool usage for attacking production DNS infrastructure is not covered.

**Learning Objectives:**
1. Explain how DNS spoofing works: the attacker monitors DNS queries and injects a forged UDP response with a spoofed source IP, winning a race against the legitimate response to populate the victim's cache with a malicious IP
2. Describe the Kaminsky DNS cache poisoning attack at a conceptual level: how randomizing Transaction IDs alone is insufficient, and why randomizing source UDP ports (source port randomization) was the stop-gap fix
3. Explain what DNSSEC provides (cryptographic signatures on DNS records that resolvers validate before accepting) and what it does not provide (encryption of the DNS query itself — DoH and DoT address that)

**Skills Gained:** DNS spoofing mechanics, Transaction ID, UDP source port randomization, DNSSEC validation, DoH and DoT awareness, DNS monitoring
**AI Mentor:** The learner studied DNS in A2.C2.M2.L1 and saw it as a helpful service. This lesson reveals the attack surface that that same helpfulness creates. Connect the forward-reference planted in A2.C2.M2.L1 — "We told you DNS was an attack surface in Course 2. Here is the mechanism." This is the third spiral activation in the academy.

---

##### A2.C4.M3.L4 — Defending Against Network Attacks
- **Slug:** defending-against-network-attacks | **Type:** guided-lab | **Duration:** 55 min | **Difficulty:** intermediate | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** NET-15, NET-22, NET-23, NET-24, NET-21 | **Prereqs:** A2.C4.M3.L1, A2.C4.M3.L2, A2.C4.M3.L3
- **Interactive:** ScenarioSimulator (Helix Corp network — configure DAI, SYN cookies, DNSSEC), ClickableDiagram (control-to-attack mapping table), QuizWidget
- **Animations:** dai-blocking-gratuitous-arp, syn-cookie-defense-flow, dnssec-validation-chain
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4, (ISC)² CC Domain 4, CySA+ | **Careers:** Network Security Engineer, SOC Analyst, Security Engineer | **Accessibility:** Scenario simulator fully keyboard-navigable; configuration results announced by aria; control-to-attack mapping table has row/column headers; all defensive concepts summarized as a text checklist alongside the interactive

**Learning Objectives:**
1. Configure Dynamic ARP Inspection (DAI) in the simulated environment and explain how it validates ARP packets against the DHCP snooping binding table
2. Enable SYN cookies on the simulated server and observe the change in half-open queue behavior during a simulated SYN flood test
3. Write three Wireshark display filters that would detect the attack indicators for the three attacks covered in this module: ARP poisoning (`arp.duplicate-address-detected`), SYN flood (`tcp.flags.syn == 1 && tcp.flags.ack == 0 && tcp.analysis.retransmission == 0`), DNS spoofing (anomalous TTL in DNS response)

**Skills Gained:** DAI configuration, DHCP snooping binding table, SYN cookie configuration, defense control mapping, detection filter writing, defensive posture evaluation
**AI Mentor:** This lesson is the synthesis point for the entire module. If a learner cannot map each attack to its countermeasure without referencing the lab notes, use the retrieval protocol — close the lab, list the three attacks, and ask the learner to describe the countermeasure from memory. Return to the lab only after successful unprompted recall per the spaced-retrieval principle.

---

### Course A2.C4 — Capstone

**Title:** Network Defense Design
**Type:** quiz-and-capstone | **Duration:** 90 min | **Difficulty:** intermediate

**Scenario:** Helix Corp is redesigning its network after a security incident. The CISO has given learner a set of requirements and a blank network topology canvas:
- Requirements: web server accessible from the internet (HTTP/HTTPS), internal employee workstations (no direct internet), HR database server (accessible only from internal finance VLAN), wireless network for employees (WPA3-Enterprise), remote-access VPN for 200 remote workers
- Threat model: ARP poisoning risk on LAN, SYN flood risk on the web server, DNS spoofing risk on the recursive resolver

Learner must:
1. Draw the network topology (using the drag-and-drop designer) with zones: internet, DMZ (web server), internal LAN, management VLAN
2. Write the firewall rule set for the DMZ (minimum 5 rules)
3. Select and justify the wireless security protocol for the employee wireless network
4. Configure one defensive control for each of the three named threats (DAI for ARP, SYN cookies for SYN flood, DNSSEC for DNS spoofing)
5. Write a 1-paragraph executive summary explaining the design decisions to a non-technical audience

**Assessment Criteria:** Topology correctness (30%), firewall rule accuracy (25%), wireless selection justification (15%), threat countermeasure accuracy (20%), executive summary clarity (10%)
**KG Validation:** NET-15, NET-17, NET-19, NET-21, NET-22, NET-23, NET-24 all exercised
**Mastery Gate:** ≥80% to unlock Course A2.C5

---

## PART 5: COURSE A2.C5 — ADVANCED NETWORKING AND CAPSTONE

**Purpose:** Academy 2 ends where real network engineering begins. This course introduces the topics that separate a learner who understands networking from one who can reason about large, complex, and dynamic networks: routing protocols, load balancers, SDN, BGP security risks, network traffic monitoring, IDS/IPS, and network forensics. It then compresses everything learned in the academy into a three-lesson capstone preparation sequence and delivers the Academy 2 capstone — a full network incident investigation scenario. A learner who passes the capstone is ready to begin applying Academy 2 knowledge in a professional context.

**Learning Outcomes:**
- Distinguish static routing from dynamic routing protocols (RIP, OSPF, BGP) at a conceptual level
- Explain what load balancers, reverse proxies, and CDNs do and where they sit in network architecture
- Describe what SDN is and how it decouples the control plane from the data plane
- Explain BGP's role in internet routing and the security risk of BGP hijacking
- Use NetFlow/IPFIX data to identify anomalous traffic patterns
- Explain what IDS and IPS are, how they differ, and what signatures and anomaly-based detection mean
- Apply all Academy 2 knowledge to an incident investigation scenario

**Estimated Hours:** 9–12 hours | **Difficulty:** intermediate | **Prerequisites:** A2.C4 Capstone (≥80%)
**Career Relevance:** Network Engineer (primary), SOC Analyst (primary), Threat Hunter (primary), Security Architect (secondary)
**Certification Alignment:** CompTIA Network+ Domains 2–5, Security+ Domain 3, (ISC)² CC Domain 4, Cisco CCNA Sections 5–7, CompTIA CySA+

---

### Module A2.C5.M1 — Routing Protocols and Network Architecture

**Module Objectives:**
1. Understand why dynamic routing protocols exist and what problems they solve over static routing
2. Distinguish RIP, OSPF, and BGP in terms of use case and scale
3. Explain the role of load balancers, reverse proxies, and CDNs in scalable network architecture
4. Describe what SDN is and why it matters for network programmability and security automation

**KG Domain Coverage:** NET-18 (Routing — advanced), NET-29 (BGP hijacking)
**Practical Outcomes:** Learner reads a simplified OSPF routing table showing link-state costs and traces the optimal path from source to destination
**Required Interactive Components:** ClickableDiagram (routing protocol comparison — scale vs. convergence vs. complexity), PacketFlowDiagram (CDN request routing), ComparisonTable (OSPF vs. BGP — interior vs. exterior), QuizWidget
**Animation Categories:** OSPF hello packet exchange, BGP AS path attribute, CDN anycast routing, SDN control/data plane separation
**Simulations:** Routing protocol explorer — learner modifies link costs and observes OSPF path recalculation
**Assessment Strategy:** Quiz-only for L1 and L3; quiz-and-challenge for L2 and L4

**Practical Progression:**
- **Beginner:** Identify which routing protocol is most appropriate for three scenarios: small office (static), enterprise WAN (OSPF), internet exchange point (BGP)
- **Intermediate:** Read an OSPF cost table and identify the least-cost path from a source to a destination with three possible routes
- **Advanced:** Explain what a BGP route announcement is and describe the attack surface that allows a BGP hijacking to redirect internet traffic
- **Capstone:** Not applicable at module level

---

##### A2.C5.M1.L1 — Dynamic Routing Protocols
- **Slug:** dynamic-routing-protocols | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-18 | **Prereqs:** A2.C4.M3.L4
- **Interactive:** ComparisonTable (static vs. RIP vs. OSPF vs. BGP — scope, convergence, admin overhead, security), ClickableDiagram (OSPF area topology), QuizWidget
- **Animations:** static-route-manual-entry, rip-hop-count-advertisement, ospf-link-state-database-sync
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, CCNA Section 3.4 | **Careers:** Network Engineer, Security Architect, Network Security Engineer | **Accessibility:** Protocol comparison table has proper headers; OSPF topology diagram keyboard-navigable; animation has step-through controls; all protocol acronyms expanded on first use

**Learning Objectives:**
1. Explain why dynamic routing protocols exist: they automate routing table maintenance when network topology changes, eliminating the need to manually update static routes on every router
2. Distinguish RIP (distance-vector, hop count metric, converges slowly, max 15 hops), OSPF (link-state, cost metric, fast convergence, hierarchical areas), and BGP (path-vector, AS path attribute, internet-scale, policy-driven) by use case
3. Explain what "convergence" means in a dynamic routing context and why slow convergence is a reliability risk after a link failure

**Skills Gained:** dynamic routing motivation, RIP vs. OSPF vs. BGP conceptual distinction, convergence concept, routing protocol selection criteria
**AI Mentor:** This lesson is conceptual overview, not configuration depth. Learners who want OSPF and BGP configuration mastery are directed to the CCNA learning path. For Academy 2, the goal is to recognize which protocol is in use, understand its scale, and identify its security implications — not to configure it.

---

##### A2.C5.M1.L2 — Load Balancers, Proxies, and CDNs
- **Slug:** load-balancers-proxies-cdns | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-18, NET-11 | **Prereqs:** A2.C5.M1.L1
- **Interactive:** ClickableDiagram (load balancer topology — VIP, real server pool, health check), ComparisonTable (forward proxy vs. reverse proxy vs. CDN — traffic direction, use case, who benefits), QuizWidget
- **Animations:** load-balancer-round-robin, reverse-proxy-request-forwarding, cdn-anycast-nearest-pop
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 2, (ISC)² CC Domain 4 | **Careers:** Network Engineer, Cloud Security Engineer, Web Security Analyst | **Accessibility:** Load balancer topology diagram has text adjacency description; comparison table has headers; CDN animation has text-based path description

**Learning Objectives:**
1. Explain what a load balancer does (distributes traffic across a pool of servers, provides a virtual IP, performs health checks) and distinguish Layer 4 (TCP/UDP) from Layer 7 (application-aware) load balancing
2. Distinguish a forward proxy (sits in front of the client, used for content filtering and anonymization) from a reverse proxy (sits in front of servers, used for load balancing, TLS termination, and WAF)
3. Explain what a CDN (Content Delivery Network) does: caches content at geographically distributed PoPs and uses anycast routing to direct users to the nearest cache

**Skills Gained:** load balancer concept, Layer 4 vs. Layer 7 load balancing, VIP, forward vs. reverse proxy, CDN and anycast, TLS termination
**AI Mentor:** Connect to TLS from A2.C2.M3.L3 — a reverse proxy performing TLS termination means it decrypts HTTPS traffic before forwarding to backend servers. This creates a security design consideration: is the backend-to-proxy leg also encrypted? This is a real enterprise architecture question and a good discussion prompt for advanced learners.

---

##### A2.C5.M1.L3 — Software-Defined Networking
- **Slug:** software-defined-networking | **Type:** expository | **Duration:** 35 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-18 | **Prereqs:** A2.C5.M1.L1
- **Interactive:** ClickableDiagram (SDN architecture — controller, northbound API, southbound API, data plane devices), ComparisonTable (traditional networking vs. SDN), QuizWidget
- **Animations:** sdn-control-data-plane-separation, openflow-flow-rule-installation, sdn-centralized-policy-push
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Network+ Domain 2, CCNA Section 6.1 | **Careers:** Network Security Engineer, Cloud Security Engineer, Security Architect | **Accessibility:** SDN architecture diagram keyboard-navigable; API layers labeled with text; animation controllable via play/pause

**Learning Objectives:**
1. Explain what SDN is: it decouples the control plane (decisions about where traffic goes) from the data plane (forwarding traffic according to decisions), centralizing control in a software controller
2. Identify the northbound API (controller to applications — policy intent) and southbound API (controller to switches — OpenFlow, NETCONF) and explain what each interface is used for
3. Explain one security benefit (centralized policy enforcement, rapid response to threats by pushing new flow rules to all switches) and one security risk (the SDN controller is a single point of failure and a high-value attack target)

**Skills Gained:** SDN architecture, control plane vs. data plane, northbound vs. southbound API, OpenFlow concept, SDN security tradeoffs
**AI Mentor:** SDN is increasingly relevant for cloud-native security (AWS VPC, Azure NSG, Google Cloud VPC all use SDN principles). For learners on the cloud security path, this lesson is foundational. For learners on the SOC path, the relevance is that threat response in modern environments often means pushing a firewall rule via API rather than logging into a device — SDN is why that is possible.

---

##### A2.C5.M1.L4 — BGP Security Risks and BGP Hijacking
- **Slug:** bgp-security-risks-bgp-hijacking | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-29, NET-18 | **Prereqs:** A2.C5.M1.L1, A2.C5.M1.L2, A2.C5.M1.L3
- **Interactive:** AttackTimelineViewer (BGP hijack — AS announces more-specific prefix, traffic rerouted), ClickableDiagram (BGP AS path routing), QuizWidget
- **Animations:** bgp-prefix-announcement, bgp-hijack-more-specific-prefix, rpki-route-origin-validation
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3, Network+ Domain 4 | **Careers:** Network Security Engineer, SOC Analyst, Threat Analyst | **Accessibility:** BGP hijack timeline keyboard-navigable; AS path diagram has text adjacency description; all BGP terms defined before use; animation has step-through alternative

**Learning Objectives:**
1. Explain what BGP is, why it is used for internet routing between Autonomous Systems (ASes), and why it is fundamentally a trust-based protocol with no built-in authentication of route announcements
2. Describe how a BGP hijack occurs: an AS announces a more-specific IP prefix than the legitimate owner, causing other ASes to prefer the more-specific route and send traffic to the attacker's AS
3. Explain RPKI (Resource Public Key Infrastructure) as the emerging mitigation: it cryptographically binds IP prefixes to authorized ASes, allowing route origin validation (ROV) to reject invalid announcements

**Skills Gained:** BGP AS path routing, BGP hijacking mechanism, prefix specificity attack, RPKI and ROV, internet routing trust model
**AI Mentor:** BGP hijacking is classified as a NET-29 (L4 concept) — it is introduced here for awareness but mastery is not expected at Academy 2 level. The goal is that learners recognize BGP hijacking in news coverage and understand the mechanism well enough to explain why it works. Full BGP security depth is deferred to advanced networking electives.

---

### Module A2.C5.M2 — Network Monitoring and Defense

**Module Objectives:**
1. Understand what network traffic analysis (NetFlow/IPFIX) reveals that packet capture does not
2. Explain how IDS and IPS work and distinguish signature-based from anomaly-based detection
3. Apply network forensics techniques to reconstruct a network-based incident
4. Build a conceptual network visibility architecture for a given organization

**KG Domain Coverage:** NET-25 (NetFlow/IPFIX), NET-12 (packet capture), NET-28 (Wireshark)
**Practical Outcomes:** Learner analyzes a NetFlow summary showing anomalous traffic (a host sending outbound data at 50× its baseline) and writes a hypothesis about what activity this represents, then identifies the PCAP evidence that would confirm or deny the hypothesis
**Required Interactive Components:** ClickableDiagram (network visibility stack — span port, NetFlow, SIEM, packet broker), ComparisonTable (NetFlow vs. PCAP — coverage, storage, fidelity), TerminalEmulator (NetFlow viewer), QuizWidget
**Animation Categories:** NetFlow collection architecture, IDS signature match, anomaly baseline deviation alert, packet broker tap architecture
**Simulations:** NetFlow anomaly detector — learner reviews 24 hours of flow data and identifies the anomalous host
**Assessment Strategy:** Quiz-only for L1; quiz-and-challenge for L2, L3, and L4

**Practical Progression:**
- **Beginner:** Read a NetFlow summary table and identify the five fields in each flow record: source IP, destination IP, source port, destination port, byte count
- **Intermediate:** Compare a 7-day NetFlow baseline for a host and identify which day's traffic profile is anomalous and why
- **Advanced:** Given a hypothesis (possible data exfiltration) and a PCAP, identify which filter to apply and what evidence would confirm or deny the hypothesis
- **Capstone:** Not applicable at module level

---

##### A2.C5.M2.L1 — NetFlow and Network Traffic Analysis
- **Slug:** netflow-network-traffic-analysis | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-25 | **Prereqs:** A2.C5.M1.L4
- **Interactive:** ClickableDiagram (NetFlow architecture — exporter, collector, analyzer), ComparisonTable (NetFlow vs. full PCAP — storage cost, visibility, fidelity), TerminalEmulator (NetFlow record viewer), QuizWidget
- **Animations:** netflow-record-export, flow-aggregation-collector, baseline-and-deviation
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Network+ Domain 3, Security+ Domain 4, CySA+ | **Careers:** SOC Analyst, Threat Hunter, Network Security Engineer | **Accessibility:** NetFlow record table has proper column headers; flow viewer screen-reader accessible; comparison table has proper structure; animation has pause control

**Learning Objectives:**
1. Explain what NetFlow (and its open standard IPFIX) is: a protocol in which network devices export summary records of every flow they handle, including source/destination IP, port, protocol, byte count, and duration
2. Distinguish NetFlow from full packet capture: NetFlow provides broad coverage of all flows at low storage cost but no payload data; PCAP provides full packet content for targeted flows at high storage cost
3. Explain how NetFlow enables traffic baselining: by recording normal traffic patterns over time, anomalies (unusual volume, unusual destination, new protocol) become detectable deviations from baseline

**Skills Gained:** NetFlow/IPFIX mechanics, flow records, NetFlow vs. PCAP comparison, traffic baselining, anomaly detection via flow data
**AI Mentor:** NetFlow is the data source behind many SIEM and NTA products (Darktrace, Stealthwatch, ExtraHop). Learners on the SOC path will encounter NetFlow in their first week on the job. Emphasize that the skill being built here — reading flow data and spotting anomalies — is directly transferable to commercial NTA tools.

---

##### A2.C5.M2.L2 — IDS and IPS
- **Slug:** ids-and-ips | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** NET-15 | **Prereqs:** A2.C5.M2.L1
- **Interactive:** ComparisonTable (IDS vs. IPS — inline vs. passive, response capability, false positive impact), ClickableDiagram (IDS placement — network IDS at span port vs. host IDS), QuizWidget
- **Animations:** ids-signature-match, anomaly-baseline-alert, ips-inline-block, false-positive-operational-impact
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Security+ Domain 3, Network+ Domain 3, (ISC)² CC Domain 4, CySA+ | **Careers:** SOC Analyst, Network Security Engineer, Threat Hunter | **Accessibility:** IDS/IPS comparison table has headers; IDS placement diagram has text alternative; animation has pause and step controls; all technical terms defined before use

**Learning Objectives:**
1. Distinguish IDS (Intrusion Detection System — passive, alerts only, placed at span port) from IPS (Intrusion Prevention System — inline, can block traffic, higher false-positive risk)
2. Explain the two detection methods: signature-based (matches known attack patterns against a ruleset — fast and precise but cannot detect novel attacks) and anomaly-based (deviates from a learned baseline — can detect unknown attacks but generates more false positives)
3. Explain the placement challenge: a network IDS/IPS cannot inspect encrypted TLS traffic unless SSL inspection/TLS interception is also deployed; identify the privacy and legal implications of TLS inspection

**Skills Gained:** IDS vs. IPS, signature vs. anomaly detection, passive vs. inline placement, span port, false positive concept, TLS inspection implications
**AI Mentor:** Connect to the OSI security lens from A2.C1.M1.L4 — an IDS operates at Layers 3–7, inspecting packets after they are decapsulated. A firewall at Layer 3/4 makes permit/deny decisions; an IDS at Layer 7 detects application-layer attack patterns. Both are required in a layered defense architecture.

---

##### A2.C5.M2.L3 — Network Forensics Basics
- **Slug:** network-forensics-basics | **Type:** discovery | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** analyze | **Ethical Content:** false
- **KG Nodes:** NET-25, NET-28, NET-12 | **Prereqs:** A2.C5.M2.L1, A2.C5.M2.L2
- **Interactive:** TerminalEmulator (NetFlow + PCAP combined analysis scenario), AttackTimelineViewer (incident reconstruction from network evidence), QuizWidget
- **Animations:** evidence-timeline-reconstruction, netflow-to-pcap-pivot, chain-of-custody-concept
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 4, CySA+, (ISC)² CC Domain 4 | **Careers:** Incident Responder, Threat Hunter, Digital Forensics Analyst | **Accessibility:** Evidence timeline navigable by keyboard; PCAP viewer screen-reader accessible; chain of custody process described as numbered steps alongside the visual; no time-pressure in lab

**Learning Objectives:**
1. Describe the network forensics investigation process: establish timeline → identify anomalous flows in NetFlow data → pivot to PCAP for the anomalous flow → extract artifacts → document chain of custody
2. Use NetFlow data to identify the initial compromise time, affected hosts, data volume transferred, and destination — and pivot to PCAP to recover the specific files or credentials transferred
3. Explain what chain of custody means in a network forensics context and why PCAP files must be hash-verified before analysis

**Skills Gained:** network forensics workflow, NetFlow-to-PCAP pivoting, evidence timeline, artifact extraction, chain of custody concept, hash verification
**AI Mentor:** This lesson is a preview of Academy-level incident response content. Learners who want to pursue the DFIR path (PATH-4 in the Knowledge Graph) should note that this lesson covers the network layer of a full incident investigation; the host layer (memory forensics, log analysis) is covered in later academies.

---

##### A2.C5.M2.L4 — Building Network Visibility
- **Slug:** building-network-visibility | **Type:** guided-lab | **Duration:** 55 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-25, NET-15, NET-12 | **Prereqs:** A2.C5.M2.L1, A2.C5.M2.L2, A2.C5.M2.L3
- **Interactive:** ScenarioSimulator (design a network visibility architecture for Helix Corp — place span ports, NetFlow exporters, IDS sensors), ClickableDiagram (visibility coverage matrix), QuizWidget
- **Animations:** span-port-placement, netflow-exporter-on-core-switch, ids-coverage-gap-visualization
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Security+ Domain 3–4, CySA+, Network+ Domain 3 | **Careers:** Network Security Engineer, SOC Architect, Threat Hunter | **Accessibility:** Visibility architecture designer fully keyboard-navigable; coverage matrix readable as text table; placement decisions confirmed via text output; no drag-only interactions

**Learning Objectives:**
1. Design a network visibility architecture for a given organization: identify where to place span ports (core switches, north-south perimeter), where to enable NetFlow export (edge routers, distribution switches), and where to place IDS/IPS sensors
2. Explain what a "visibility gap" is (a network segment or traffic flow not covered by any collection mechanism) and identify three common visibility gaps in typical enterprise networks (encrypted east-west traffic, cloud workloads, VPN traffic)
3. Describe the role of a SIEM in aggregating NetFlow, IDS alerts, and other log sources into a correlated timeline for investigation

**Skills Gained:** network visibility architecture, span port placement, NetFlow exporter placement, IDS sensor placement, visibility gap identification, SIEM concept
**AI Mentor:** This lesson closes the loop from A2.C4 (attacks and defenses) to A2.C5 (monitoring and detection). Ensure learner can articulate the full defense-in-depth stack: firewall (prevent) → IDS/IPS (detect) → NetFlow (investigate) → PCAP (confirm). This stack is the foundational mental model of the SOC.

---

### Module A2.C5.M3 — Capstone Preparation

**Module Objectives:**
1. Review and reinforce Network Fundamentals and Core Protocols (Academy 2 Courses 1–2)
2. Review and reinforce Network Analysis and Security (Academy 2 Courses 3–4)
3. Apply all Academy 2 skills in a time-limited CTF-style network challenge
4. Demonstrate Academy 2 mastery in the final capstone assessment

**KG Domain Coverage:** NET-01 through NET-29 (full D3 coverage)
**Practical Outcomes:** Learner completes all four modules and passes the Academy 2 capstone with ≥80%
**Required Interactive Components:** All components from A2.C1–C5; QuizWidget (adaptive retrieval)
**Animation Categories:** Adaptive — AI Mentor selects review animations based on gap detection
**Simulations:** All prior lab environments available for review; CTF challenge environment (new)
**Assessment Strategy:** Diagnostic for L1–L2; free-lab for L3; quiz-and-capstone for L4

**Practical Progression:**
- **L1:** Adaptive diagnostic quiz — AI Mentor identifies weak concept areas from all prior courses
- **L2:** Targeted review — AI Mentor returns learner to specific lessons or practicals based on diagnostic results
- **L3:** CTF network challenge — combined Wireshark and Nmap analysis in a time-limited scenario
- **L4:** Academy 2 Capstone Assessment

---

##### A2.C5.M3.L1 — Network Foundations Review
- **Slug:** network-foundations-review | **Type:** diagnostic | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** NET-01, NET-02, NET-03, NET-04, NET-05, NET-06, NET-07, NET-08, NET-09, NET-10, NET-11, NET-12 | **Prereqs:** A2.C5.M2.L4
- **Interactive:** QuizWidget (adaptive — 25 questions sampling NET-01 through NET-12), ConceptFlashCards (retrieval prompt for critical protocol facts)
- **Animations:** adaptive — rendered by AI Mentor based on detected gaps
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Network+, Security+ | **Careers:** All roles | **Accessibility:** Quiz fully keyboard-navigable; flashcards keyboard-accessible; all adaptive content meets WCAG 2.2 AA; no timed pressure in diagnostic phase

**Learning Objectives:**
1. Recall the OSI model layers and TCP/IP layers from memory and map any given protocol to its correct layer
2. Perform a subnet calculation (network address, broadcast, usable host range) for a given /26, /27, or /28 block without a calculator
3. Explain DNS resolution, DHCP DORA, TCP handshake, and ARP exchange from memory

**Skills Gained:** retrieval of NET-01 through NET-12 knowledge, gap identification, spaced repetition activation
**AI Mentor:** Run the backward traversal algorithm — identify which concept nodes the learner answers incorrectly and flag them for targeted review before L2. Provide a gap report after the diagnostic: "You answered subnetting questions correctly but had difficulty with TCP state machine and ARP mechanics. Your L2 review will focus on these areas." Do not advance learner to L2 without a complete gap report.

---

##### A2.C5.M3.L2 — Network Security Review
- **Slug:** network-security-review | **Type:** diagnostic | **Duration:** 50 min | **Difficulty:** intermediate | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** NET-13, NET-14, NET-15, NET-17, NET-19, NET-20, NET-21, NET-22, NET-23, NET-24, NET-25, NET-26, NET-27, NET-28 | **Prereqs:** A2.C5.M3.L1
- **Interactive:** QuizWidget (adaptive — 25 questions sampling NET-13 through NET-28), ScenarioSimulator (identify which attack is occurring from a set of indicators)
- **Animations:** adaptive — rendered by AI Mentor based on detected gaps
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Network+, Security+, CySA+ | **Careers:** SOC Analyst, Penetration Tester, Network Security Engineer | **Accessibility:** All adaptive components meet WCAG 2.2 AA; scenario simulator fully keyboard-navigable; all attack indicators described in text

**Learning Objectives:**
1. Identify which attack is occurring from a set of five indicators (e.g., duplicate MAC in ARP table = ARP poisoning; SYN packets without matching ACKs = SYN flood; DNS response with unexpected IP = DNS spoofing)
2. Explain the countermeasure for each of the six attack categories covered in the academy (ARP poisoning → DAI; SYN flood → SYN cookies; DNS spoofing → DNSSEC; evil twin → MFP/802.11w; BGP hijacking → RPKI; rogue DHCP → DHCP snooping)
3. Recall the Wireshark display filters for detecting ARP anomalies, SYN floods, and DNS spoofing from memory

**Skills Gained:** integrated attack recognition, countermeasure mapping, retrieval of NET-13 through NET-28, detective reasoning from indicators
**AI Mentor:** After the diagnostic, provide learner with a readiness assessment: "Based on your diagnostic performance across both reviews, you are ready / almost ready / not yet ready for the capstone." If not ready, prescribe targeted lesson review with specific lesson IDs. Do not allow the capstone until both diagnostics achieve ≥75% (lower gate than the 80% mastery gate to allow for the capstone challenge).

---

##### A2.C5.M3.L3 — Network CTF Challenge
- **Slug:** network-ctf-challenge | **Type:** discovery | **Duration:** 75 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** NET-01, NET-07, NET-09, NET-12, NET-14, NET-22, NET-28 | **Prereqs:** A2.C5.M3.L1, A2.C5.M3.L2
- **Interactive:** TerminalEmulator (Wireshark + Nmap combined environment — CTF flag format), QuizWidget (flag submission)
- **Animations:** none — this is a free exploration lesson
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** eJPT, CompTIA PenTest+ (foundational) | **Careers:** Penetration Tester, SOC Analyst, CTF Competitor | **Accessibility:** All lab environment controls keyboard-navigable; flag submission field labeled; help system available via keyboard shortcut; no time limit (self-paced within session)

**Learning Objectives:**
1. Apply Wireshark analysis skills to find a hidden flag embedded in an HTTP payload within a provided PCAP
2. Apply Nmap scanning to discover the open ports and running services on four authorized lab hosts and document findings
3. Identify an ARP anomaly in the PCAP and extract the attacker's MAC address as a flag

**Skills Gained:** integrated tool usage (Wireshark + Nmap), CTF methodology, flag extraction, documentation under challenge conditions
**AI Mentor:** CTF challenges have a different failure mode than standard lessons — learners may get stuck without a linear path forward. Provide the 3-hint system per Guardrail S2 for each flag: Hint 1 (which tool and filter to start with), Hint 2 (specific field or command to look at), Hint 3 (exact location with explanation). CTFs build metacognition — after each flag, ask: "What did you try first? Why did it not work? What did you try instead?"

---

##### A2.C5.M3.L4 — Academy 2 Capstone Assessment
- **Slug:** academy-2-capstone-assessment | **Type:** diagnostic | **Duration:** 90 min | **Difficulty:** intermediate | **Bloom's:** evaluate | **Ethical Content:** false
- **KG Nodes:** NET-01 through NET-29 (full coverage) | **Prereqs:** A2.C5.M3.L1, A2.C5.M3.L2, A2.C5.M3.L3
- **Interactive:** TerminalEmulator (Wireshark + Nmap), ScenarioSimulator (network design tool), QuizWidget (40-question adaptive final)
- **Animations:** none
- **Practical:** free-lab | **Assessment:** quiz-and-capstone | **Reflection:** transfer
- **Certs:** Network+, Security+, (ISC)² CC Domain 4 | **Careers:** All technical roles | **Accessibility:** All capstone components keyboard-navigable and screen-reader accessible; no timed elements; all instructions available as text; 40-question quiz delivered in sections to reduce cognitive load

**Learning Objectives:**
1. Demonstrate mastery of all Academy 2 exit competencies in a combined assessment format
2. Apply Wireshark and Nmap in a realistic incident investigation scenario to identify network-based attack indicators
3. Design a segmented network with correct firewall rules and security controls for a given organizational threat model

**Skills Gained:** Academy 2 integrated mastery, network analysis, network design, attack identification, defense control selection
**AI Mentor:** This is a high-stakes assessment. Run pre-flight: confirm learner has completed both diagnostics and the CTF before unlocking. During the assessment, do not provide hints — this is the mastery gate. After completion, run forward traversal to show the learner what Academy 3, 4, and 5 will build on top of the knowledge they demonstrated today. If learner scores <80%, run backward traversal to identify the specific gaps and prescribe targeted review before the retake.

---

### Course A2.C5 — Capstone

**Title:** Network Incident Investigation at Helix Corp
**Type:** quiz-and-capstone | **Duration:** 90 min | **Difficulty:** intermediate

**Scenario:** Helix Corp's SOC has declared an incident. An endpoint on the finance VLAN (192.168.10.42) has been generating anomalous outbound traffic for the past 72 hours. The SOC has provided: a 72-hour NetFlow summary, a PCAP from the 6-hour peak activity window, an Nmap scan of the finance VLAN segment, and the current network topology diagram. Learner plays the role of a Tier-2 analyst who must:
1. Analyze the NetFlow summary: identify the destination IP, port, protocol, and total bytes transferred. Determine if the volume is consistent with normal business activity.
2. Open the PCAP: apply appropriate display filters, follow the relevant TCP streams, identify what data was transferred (file names in HTTP headers, cleartext credentials, or encrypted blobs)
3. Run Nmap against the finance VLAN segment (authorized scan): document all open ports and services. Identify any unexpected listening services.
4. Identify which attack technique is most consistent with the evidence: ARP poisoning, DNS spoofing, data exfiltration via cleartext protocol, or rogue service installation
5. Redesign the network controls that would have prevented or detected this incident earlier: specify which control, where it should be placed, and what evidence it would have generated

**Assessment Criteria:** NetFlow analysis accuracy (20%), PCAP analysis accuracy (25%), Nmap documentation (15%), attack attribution accuracy (25%), remediation quality (15%)
**KG Validation:** NET-01, NET-07, NET-09, NET-12, NET-14, NET-15, NET-22, NET-25, NET-28 all exercised
**Mastery Gate:** ≥80% to complete Academy 2 and unlock Academy 3, 4, and 5

---

## Academy 2 — Knowledge Graph Validation

**Concepts Covered (D3 full, L1–L3):**

| KG Node | Concept | First Introduced | Depth Achieved |
|---------|---------|-----------------|---------------|
| NET-01 | OSI model | A2.C1.M1.L1 | L2 — applied in security lens and PCAP analysis |
| NET-02 | TCP/IP model | A2.C1.M1.L2 | L2 — mapped to OSI, used in encapsulation |
| NET-03 | IP address | A2.C1.M2.L1 | L2 — full binary/decimal, classes, private/public |
| NET-04 | Subnet/CIDR | A2.C1.M2.L2 | L2 — calculation mastery required at capstone |
| NET-05 | MAC address | A2.C1.M3.L1 | L2 — frame anatomy, OUI, forwarding logic |
| NET-06 | ARP | A2.C1.M3.L2 | L3 — attack surface, poisoning foreshadowed |
| NET-07 | DNS | A2.C2.M2.L1 | L3 — recursive resolution, record types, attack surface |
| NET-08 | DHCP | A2.C2.M2.L3 | L3 — DORA, rogue DHCP attack |
| NET-09 | TCP handshake | A2.C2.M1.L1 | L3 — flags, sequence numbers, state machine |
| NET-10 | UDP | A2.C2.M1.L3 | L2 — header, use cases, TCP vs. UDP |
| NET-11 | HTTP | A2.C2.M3.L1 | L3 — headers, methods, status codes, PCAP reading |
| NET-12 | Packet capture | A2.C3.M1.L1 | L3 — Wireshark workflow, filters, stream follow |
| NET-13 | TCP state machine | A2.C2.M1.L2 | L3 — states, SYN flood connection |
| NET-14 | Nmap | A2.C3.M2.L1 | L3 — host discovery, port scan, service/OS detection |
| NET-15 | Firewall | A2.C4.M1.L1 | L3 — stateless/stateful, rule writing, DMZ design |
| NET-16 | NAT | A2.C1.M3.L4 | L2 — PAT, NAT table, security implications |
| NET-17 | VPN | A2.C4.M1.L3 | L2 — IPsec vs. TLS VPN, split tunneling |
| NET-18 | Routing | A2.C1.M2.L3 | L3 — static, RIP, OSPF, BGP conceptual |
| NET-19 | VLANs | A2.C1.M3.L3 | L3 — 802.1Q, DMZ design, VLAN hopping reference |
| NET-20 | HTTPS | A2.C2.M3.L3 | L3 — TLS handshake, certificate chain, PCAP comparison |
| NET-21 | TCP SYN flood | A2.C4.M3.L2 | L3 — queue exhaustion, SYN cookies |
| NET-22 | ARP poisoning | A2.C4.M3.L1 | L3 — gratuitous ARP, MITM position, DAI |
| NET-23 | DNS spoofing | A2.C4.M3.L3 | L3 — race condition, Kaminsky concept, DNSSEC |
| NET-24 | MITM | A2.C4.M3.L1 | L3 — on-path position, SSL stripping, traffic interception |
| NET-25 | NetFlow/IPFIX | A2.C5.M2.L1 | L2 — flow records, baselining, forensic pivoting |
| NET-26 | SMB | A2.C3.M3.L1 | L2 — SMBv1 risk, EternalBlue reference |
| NET-27 | LDAP | A2.C3.M3.L3 | L2 — directory concept, LDAPS, DN structure |
| NET-28 | Wireshark filters | A2.C3.M1.L2 | L3 — syntax, compound filters, security patterns |
| NET-29 | BGP hijacking | A2.C5.M1.L4 | L2 — mechanism, RPKI awareness (L3 deferred) |
| NET-30 | Protocol fuzzing | Deferred to advanced networking elective | Not covered in Academy 2 |

**Dependency Validation:**
- All D3 L1 concepts (NET-01 through NET-12) introduced before any L2 concepts are required
- NET-01 (OSI) introduced in A2.C1.M1.L1 before any layer-specific protocols are taught
- NET-03 and NET-04 (IP and subnetting) introduced before NET-16 (NAT) and NET-18 (routing) — correct per KG prerequisite matrix
- NET-09 (TCP handshake) introduced before NET-13 (TCP state machine) — correct ordering
- NET-06 (ARP) foreshadowed in A2.C1.M3.L2 and activated in A2.C4.M3.L1 — spiral learning requirement satisfied
- NET-22 and NET-23 (attack nodes) introduced only after foundational protocol nodes established — attack content not presented without prerequisite understanding per KG dependency rules
- IAM-15 (Kerberos) referenced in A2.C3.M3.L4 — cross-domain reference valid; IAM-15 is taught at awareness depth only (L2) pending full treatment in Academy 4

**Orphan Check:** All NET-01 through NET-29 concepts introduced are exercised in at least one practical, capstone, or assessment within the academy. NET-30 (protocol fuzzing) is explicitly deferred with a notation. No orphan concepts.

**Circular Dependency Check:** Academy 2 depends on Academy 1 (A1.C5.M3.L4 as entry prereq). No Academy 2 concept depends on Academy 3, 4, or 5 content. All intra-A2 lesson prerequisites are linear within modules and forward-sequential across modules. Verified clean.

**Cross-Domain References:**
- SEC-01 (cybersecurity fundamentals) activated in A2.C1.M1.L4 (OSI security lens) — valid; SEC-01 is an A1 exit competency
- IAM-15 (Kerberos) activated in A2.C3.M3.L4 at awareness level — valid; full treatment deferred to Academy 4 per KG domain tier structure
- DEF-02 (defense in depth) implicitly activated throughout A2.C4 — valid; SEC concepts from Academy 1 expected to be active

---

## Academy 2 — Certification Mapping

| Certification | Coverage in A2 | Domain % Covered |
|---------------|----------------|-----------------|
| CompTIA Network+ N10-009 | Domains 1, 2, 3, 4 | ~75% |
| CompTIA Security+ SY0-701 | Domain 3 (full), Domain 4 (partial), Domain 5 (partial) | ~55% |
| (ISC)² CC | Domain 4 (Communications and Network Security) | ~65% |
| Cisco CCNA 200-301 | Sections 1–4 (foundational concepts only) | ~40% |
| Cisco CyberOps Associate | Domain 2 (Security Monitoring) partial | ~30% |
| CompTIA CySA+ | Domain 2 (Threat and Vulnerability Management) intro | ~20% |
| EC-Council CEH | Domain 9 (Denial-of-Service), Domain 5 (Sniffing) partial | ~25% |

---

## Academy 2 — Career Path Mapping

| Career Path | A2 Contributions |
|-------------|-----------------|
| SOC Analyst (PATH-2) | PCAP analysis, Wireshark, NetFlow, IDS/IPS, protocol recognition, attack detection patterns |
| Penetration Tester (PATH-3) | Nmap, port scanning, protocol exploitation surfaces, wireless attack awareness, ARP/DNS attack mechanics |
| Network Security Engineer | Firewall design, DMZ architecture, VPN, VLAN segmentation, DAI, DNSSEC, BGP security |
| Cloud Security Engineer | Routing concepts, SDN, load balancers, VPC-level network security concepts |
| Incident Responder (PATH-5) | PCAP forensics, NetFlow investigation, network timeline reconstruction, evidence chain of custody |
| Threat Hunter | NetFlow baselining, anomaly detection, network visibility architecture, BGP hijacking awareness |
| Security Analyst | Fundamental protocol knowledge, attack pattern recognition, Wireshark filtering |

---

## Academy 2 — Assessment Strategy

**Per-lesson:** Quiz unlocks after practical completion. Mastery gate: ≥80%.
**Per-module:** No separate module quiz — lesson quizzes collectively assess module objectives. AI Mentor runs gap detection after each module to flag underperforming concepts.
**Per-course:** Course capstone synthesizes all module objectives. ≥80% to proceed to next course. AI Mentor runs backward traversal before capstone to confirm prerequisite mastery.
**Academy diagnostics:** Two diagnostic lessons (A2.C5.M3.L1, A2.C5.M3.L2) run adaptive retrieval across all NET nodes to identify gaps before the capstone.
**Academy capstone:** A2.C5.M3.L4 plus Course A2.C5 Capstone ("Network Incident Investigation at Helix Corp") is the Academy 2 gate. ≥80% unlocks Academy 3, 4, and 5 (all simultaneously, per the cross-academy dependency map).
**Ethical content assessments:** Lessons with `Ethical Content: true` include an ethics context check — learner must affirm the authorization requirement before the practical unlocks. This check is not graded but is mandatory.
**KQI-E3 Target:** First-attempt pass rate target 50–70% (desirable difficulty). Subnetting (A2.C1.M2.L2) and TLS mechanics (A2.C2.M3.L3) are expected to be below this range on first attempt and are explicitly flagged for AI Mentor intervention.
**AI Mentor diagnostics:** Backward traversal runs after every failed attempt. Targeted review offered before retry. No lesson allows unlimited retries without an AI Mentor review step after the second failure.

---

## Academy 2 — Implementation Readiness

**Priority 1 — Lessons (implement first):**
A2.C1.M1.L1 (OSI Model — required for all subsequent content), A2.C1.M2.L2 (Subnetting — high-friction, needs SubnetCalculatorWidget), A2.C2.M1.L1 (TCP Handshake — critical for A2.C4 attack content), A2.C3.M1.L1 (Wireshark — requires TerminalEmulator with Wireshark emulation), A2.C3.M2.L1 (Nmap — requires authorized lab sandbox)

**Priority 2 — Interactive Components (must be built before dependent lessons):**
- SubnetCalculatorWidget: required by A2.C1.M2.L2
- PacketFlowDiagram (extended with TCP/ARP/DNS modes): required by A2.C2.M1, A2.C4.M3
- TerminalEmulator (Wireshark emulation mode): required by A2.C3.M1 through A2.C3.M2
- TerminalEmulator (Nmap sandbox mode): required by A2.C3.M2
- ScenarioSimulator (firewall rule builder): required by A2.C4.M1.L2
- SubnetCalculatorWidget: required by A2.C1.M2.L2

**Priority 3 — Animations:**
- osi-layer-reveal, encapsulation-wrapping-sequence, tcp-handshake-sequence, dns-recursive-resolution-animation, arp-poisoning-gratuitous-arp-flood, tls-handshake-simplified

**Priority 4 — Practicals:**
- Wireshark emulator with preloaded PCAPs for A2.C3.M1 (4 PCAPs required: basic protocol, TCP conversation, DNS anomaly, HTTP POST credentials)
- Nmap sandbox environment for A2.C3.M2 (4 authorized target profiles required)
- Firewall rule builder for A2.C4.M1.L2
- Network design tool (drag-and-drop topology) for A2.C4 and A2.C5 capstones

**Priority 5 — Capstones:**
- Helix Corp network topology diagram (used in C1, C4, and C5 capstones — shared asset)
- "Network Incident Investigation at Helix Corp" PCAP and NetFlow dataset
- CTF challenge environment for A2.C5.M3.L3

**Dependency on Academy 1 Assets:**
- AttackTimelineViewer (used in A2.C4.M3): already built for A1.C1.M2 — extend with network attack scenarios
- QuizWidget (universal): already built for A1 — no changes required
- ComparisonTable: already built for A1 — no changes required
- ConceptFlashCards: already built for A1 — add NET domain cards

---

## Academy 2 — Self Review

### Perspective 1: Learner Experience
**Strength:** The OSI → encapsulation → IP addressing → protocols → analysis → security → advanced arc is coherent and builds genuine confidence before introducing threat content. The spiral activations (ARP foreshadow in C1 → ARP poisoning in C4; TCP state machine in C2 → SYN flood in C4; DNS in C2 → DNS spoofing in C4) create the "I knew this was coming" effect that reinforces retention.

**Gap identified:** The jump from beginner (C1–C2) to intermediate (C3) at the start of Course 3 is the steepest difficulty transition in the academy. A transitional lesson or module-level readiness check should be considered before the first Wireshark lesson. Flagged for V1.2 consideration.

### Perspective 2: Constitutional Compliance
**Compliance confirmed:**
- Guardrail T1 (define before use): all technical terms introduced in context before appearing in exercises
- Guardrail C1 (one major concept per section): verified — each lesson targets one KG node or one tightly related cluster
- Guardrail ETH1 (ethical framing before offensive content): all eight lessons with `Ethical Content: true` include an explicit ethical framing block
- Guardrail S1 (build confidence before complexity): beginner lessons in C1–C2 fully respect this; intermediate content in C3–C5 assumes C1–C2 mastery
- Guardrail S2 (3-level hint system): referenced explicitly in A2.C2.M3.L4, A2.C3.M2.L1, A2.C4.M1.L2, A2.C5.M3.L3; assumed for all practicals
- Guardrail R1 (spiral recurrence): ARP, TCP state machine, and DNS all reappear in at least two subsequent modules after introduction

**Gap identified:** WCAG 2.2 AA requirements (KQI-A1) are referenced per lesson but not formally audited at the component level. The SubnetCalculatorWidget, Nmap sandbox, and firewall rule builder are new components requiring dedicated accessibility review before production deployment.

### Perspective 3: Knowledge Graph Integrity
**Compliance confirmed:**
- All NET-01 through NET-29 nodes covered (NET-30 explicitly deferred with notation)
- No concept introduced without its KG-declared prerequisite in the lesson sequence
- Cross-domain references (IAM-15, SEC-01) are depth-appropriate for Academy 2
- D3 dependency chain respected: Academy 2 does not introduce content from D5, D7, D9, D10, D11, D12, D13, or D14 at depth — only forward-references where the KG designates them as enabled by D3

**Gap identified:** KG Part 14 identifies Kerberos as a complex concept requiring sub-node expansion. The treatment in A2.C3.M3.L4 is appropriately shallow (awareness level, L2 depth) but would benefit from explicit sub-node IDs once the KG expansion is complete. Flagged for KG V1.1 update.

### Perspective 4: Career Path Alignment
**Strength:** Academy 2 directly serves PATH-2 (SOC Analyst) more than any other academy. The combination of Wireshark, NetFlow, IDS/IPS, and protocol attack recognition maps precisely to Tier-1 and Tier-2 SOC analyst job descriptions. PATH-3 (Penetration Tester) is also meaningfully served by Nmap and the attack technique coverage.

**Gap identified:** The GRC path (PATH-11) is under-served by Academy 2 — network risk concepts (A2.C4) are relevant but there is no explicit connection to compliance frameworks (PCI-DSS network segmentation requirements, NIST CSF network controls). Flagged for optional supplemental lesson consideration in a future content sprint.

### Perspective 5: Assessment Design
**Strength:** The two-diagnostic + CTF + capstone structure in A2.C5.M3 is the most comprehensive capstone preparation in any academy designed so far. It gives learners two self-assessment opportunities with AI Mentor prescriptions before the high-stakes capstone gate.

**Gap identified:** The Nmap lab in A2.C3.M2 requires an authorized sandbox environment that does not yet exist. If this environment is not available by the time A2.C3 is authored, those lessons need a fallback to a simulated output format. This is a Priority 1 technical dependency that must be resolved before the course can be published.

### Perspective 6: Ethical and Safety Review
**Compliance confirmed:** All six lessons with offensive content include an ETH1-compliant ethical framing block that precedes the technical content. The framing specifies: (1) the educational purpose, (2) the authorization requirement, (3) the legal risk of unauthorized use, and (4) the defender's perspective from which the content is presented.

**Gap identified:** The wireless attack lesson (A2.C4.M2.L3) does not currently specify that the 3-hint system applies to the scenario simulator. This should be confirmed during lesson authoring. Add explicit hint-level definitions for the evil twin detection scenario.

### Perspective 7: Implementation Risk
**High-risk items requiring resolution before first curriculum sprint:**
1. **Wireshark emulator**: The most complex interactive component required in this academy. Must support TCP stream follow, display filters, and packet detail tree. No equivalent component exists from Academy 1 — net-new build required.
2. **Nmap sandbox**: Requires an authorized target environment that simulates real Nmap output without allowing learners to scan real hosts. Security boundary of the sandbox must be independently reviewed before deployment.
3. **SubnetCalculatorWidget**: New component. Must be fully keyboard-navigable and produce screen-reader output for all computed values per WCAG 2.2 AA.
4. **Helix Corp shared scenario asset**: The Helix Corp network topology and PCAP dataset appear in C1, C4, and C5 capstones. These must be designed as a cohesive scenario set before any capstone is authored.
5. **KQI-E3 calibration**: Subnetting and TLS handshake lessons are predicted high-friction points. First-attempt pass rates must be monitored and question difficulty adjusted if the target 50–70% range is not achieved within the first 500 learner attempts.

---

*Academy 2 complete. 60 lessons across 5 courses and 15 modules. All NET-01 through NET-29 Knowledge Graph nodes covered. Constitutional V1.1 compliance verified. Do NOT begin Academy 3 without explicit instruction.*




