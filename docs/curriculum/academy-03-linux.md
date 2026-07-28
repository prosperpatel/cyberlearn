# CYBER LEARN — ACADEMY 3: LINUX
**Version:** 1.0 | **Created:** 2026-07-28 | **Status:** Draft
**Parent Document:** docs/curriculum/CURRICULUM_ARCHITECTURE.md V1.0
**Constitutional Reference:** CONSTITUTION.md V1.1
**Knowledge Graph Reference:** docs/curriculum/KNOWLEDGE_GRAPH.md V1.0
**KG Primary Domain:** D2 (Operating Systems — Linux track) — full coverage L1–L3; D9 (Defensive Security) intro nodes

---

## Academy Vision

Academy 3 is the Linux foundation every cybersecurity professional must own. It requires Academy 1 completion. Its purpose is to transform a learner who has never typed a terminal command into one who can navigate a Linux system with confidence, administer users and files, manage processes and services, configure basic networking and firewall rules, and apply Linux skills to real-world security tasks including log analysis, incident response, and system hardening.

**Why it exists:** Linux is the operating system of the internet. Web servers, cloud infrastructure, containerised workloads, security appliances, network devices, and almost every enterprise security tool run on Linux. A cybersecurity professional who cannot use Linux is like a carpenter who cannot use a saw — technically a professional, but practically limited in every scenario that matters. The Knowledge Graph (D2 Linux track) confirms: OS-L01 through OS-L11 are prerequisites for D9 (Defensive Security), D10 (Offensive Security), D11 (Cloud Security), and D13 (Incident Response). Without this academy, every downstream specialisation becomes harder and shallower than it needs to be.

**Target Learners:** All seven personas. Primary focus: Marcus (computer science student building practical Linux depth), Jordan (aspiring SOC analyst who encounters Linux servers daily but lacks command fluency), David (IT administrator confident on Windows who needs Linux equivalency). Secondary: Sarah (career changer for whom the terminal feels alien but achievable), Alex (developer who uses Linux servers but has never hardened one).

**Entry Requirements:** Academy 1 complete (≥80% capstone mastery gate). Assumes learner can explain the CIA triad, knows what an operating system does, can describe processes and files at a conceptual level, and understands basic networking at the packet level (Academy 2 recommended but not required for Courses 1–3).

**Estimated Learning Hours:** 40–52 hours (including practicals, labs, and assessments)

**Suggested Pace:** 2–3 lessons per week (casual) to 1–2 courses per week (intensive)

**Exit Competencies:** Upon completing Academy 3, a learner can:
- Navigate the Linux filesystem, manipulate files and directories, and understand the Filesystem Hierarchy Standard
- Read and decode file permissions (rwx, octal, SUID/SGID, sticky bit) and configure ownership with chmod and chown
- Manage users, groups, and sudo access; read /etc/passwd and /etc/shadow; configure PAM authentication policies
- Write practical Bash scripts using variables, loops, conditionals, pipes, and redirection
- Manage Linux processes with ps, top, kill, and signals; configure and control services with systemd
- Manage storage with fdisk, lsblk, and mount; understand LVM at a conceptual level
- Install and remove software with apt and dnf; compile software from source
- Read, filter, and analyse system logs with grep, awk, journalctl, and tail -f
- Configure network interfaces and diagnose connectivity with ip, ss, and ping
- Configure SSH for hardened key-based authentication and restrict root login
- Write and manage iptables firewall rules for basic host protection
- Configure SELinux or AppArmor in enforcing mode and interpret policy violations
- Apply CIS benchmark hardening principles to a fresh Linux installation
- Use auditd to monitor system calls and detect privilege escalation attempts
- Respond to a Linux security incident: collect volatile data, analyse logs, identify persistence mechanisms, and write an incident report

**Career Relevance:** Foundation for SOC Analyst (direct), Linux Administrator, Blue Team Analyst, Cloud Security Engineer, Incident Responder, DevOps/DevSecOps Engineer, Junior Penetration Tester. Directly supports PATH-2 (SOC), PATH-4 (Linux Admin), and PATH-7 (Cloud Security) per Knowledge Graph.

**Certification Alignment:** Linux Professional Institute Linux Essentials 010 (~90%), LPIC-1 101/102 (~75%), CompTIA Linux+ XK0-005 (~80%), CompTIA Security+ SY0-701 Domain 3 (partial, ~30%), Red Hat RHCSA EX200 (foundational, ~40%)

---

## Course Structure Overview

| Course | Title | Modules | Lessons | KG Nodes |
|--------|-------|---------|---------|----------|
| A3.C1 | Linux Foundations | 4 | 16 | OS-L01, OS-L04, OS-L07 (intro) |
| A3.C2 | Linux Administration | 4 | 16 | OS-L01, OS-L02, OS-L03, OS-L04, OS-L07 |
| A3.C3 | Processes and System Management | 4 | 16 | OS-L08, OS-L09 |
| A3.C4 | Networking and Security | 4 | 16 | OS-L05, OS-L11, OS-L15 |
| A3.C5 | Linux for Cybersecurity | 4 | 16 | OS-L06, OS-L10, OS-L11, OS-L13, OS-L15 |

**Total: 5 courses × 4 modules × 4 lessons = 80 lessons**

---

## PART 1: COURSE A3.C1 — LINUX FOUNDATIONS

**Purpose:** Before typing a meaningful command, learners need a mental model: what Linux is, how it is organised, and why security professionals use it. This course builds that model layer by layer — Linux philosophy and ecosystem, the terminal and shell interface, the filesystem and its standard hierarchy, and finally the Bash shell fundamentals that power every Linux workflow. Content is deliberately conceptual-first and confidence-building. Every concept is immediately applied in a TerminalSimulator so learners never experience theory without grounding. Security implications are introduced as seeds, not as the primary focus — the full security harvest comes in Courses 4 and 5.

**Learning Outcomes:**
- Explain what Linux is, how it differs from proprietary operating systems, and why it dominates security work
- Identify the major Linux distribution families and their package managers
- Navigate the Linux terminal with confidence: pwd, ls, cd, mkdir, mv, rm
- Read man pages and extract the information needed to use any unfamiliar command
- Explain the Filesystem Hierarchy Standard and the security significance of key directories
- Work with files using cat, less, head, tail, grep, and nano
- Create symbolic links and hard links; create, list, and extract tar archives
- Use environment variables, the PATH, I/O redirection, pipes, and shell expansion correctly

**Estimated Hours:** 8–10 hours | **Difficulty:** beginner | **Prerequisites:** A1.C5.M3.L4 (Academy 1 mastery gate ≥80%)
**Career Relevance:** Foundation for all Linux-dependent roles; required for any technical role involving server administration, security analysis, or cloud operations
**Certification Alignment:** Linux Essentials 010 Topic 1–3, LPIC-1 Topic 101–103, CompTIA Linux+ Domain 1

---

### Module A3.C1.M1 — The Linux Ecosystem

**Module Objectives:**
1. Understand Linux as an open-source kernel distinct from any specific distribution
2. Distinguish major Linux distribution families and their package management systems
3. Describe the Linux kernel's role in hardware abstraction and privilege separation
4. Explain open-source licensing and its security implications

**KG Domain Coverage:** OS-L04 (Package management — partial intro), CB-07 (OS concept, revisited with Linux specifics)
**Practical Outcomes:** Learner maps three distributions to their package manager, identifies whether a given license allows modification and redistribution, and explains the kernel/user-space division using a provided diagram
**Required Interactive Components:** ClickableDiagram (distribution family tree), ComparisonTable (Debian vs. RHEL vs. Arch), ClickableDiagram (kernel architecture — user space/kernel space/hardware), ComparisonTable (GPL vs. MIT vs. Apache), QuizWidget
**Animation Categories:** Unix-to-Linux evolution timeline, kernel-userspace syscall flow, distribution family tree reveal, open-source contribution cycle
**Simulations:** Distribution selector (choose a use case → recommended distro with rationale); kernel space isolation demo (user process attempts direct hardware access → kernel intercepts)
**Assessment Strategy:** Quiz-only for L1, L2, and L4; quiz-and-challenge for L3

**Practical Progression:**
- **Beginner:** Match five Linux distributions (Ubuntu, Debian, Fedora, CentOS, Arch) to their package manager (apt vs. dnf/yum vs. pacman)
- **Intermediate:** Identify whether each of four listed software licenses (GPL, MIT, Apache, proprietary) permits commercial use and requires sharing of modifications
- **Advanced:** Label the five components of a provided kernel architecture diagram: hardware, HAL, kernel space, system call interface, user space
- **Capstone:** Not applicable at module level

---

##### A3.C1.M1.L1 — What Is Linux? History and Philosophy
- **Slug:** what-is-linux-history-philosophy | **Type:** expository | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-07 | **Prereqs:** A1.C5.M3.L4 (Academy 1 mastery gate ≥80%)
- **Interactive:** ClickableDiagram (Linux evolution timeline: UNIX 1969 → Minix → Linux 0.01 1991 → modern distributions), QuizWidget
- **Animations:** unix-linux-evolution-timeline, kernel-distribution-relationship-reveal, linux-everywhere-montage
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 1, CompTIA Linux+ Domain 1 | **Careers:** All technical roles | **Accessibility:** Timeline keyboard-navigable with arrow keys; all animation frames have static fallback text; no color-only encoding of historical periods; screen-reader output enabled for all interactive elements

**Learning Objectives:**
1. Explain what Linux is: an open-source kernel created by Linus Torvalds in 1991, derived from UNIX principles, licensed under the GPL, that powers servers, cloud infrastructure, containers, Android devices, and almost every security tool used in professional practice
2. Describe the relationship between the Linux kernel and a distribution: the kernel is the core that manages hardware, memory, and processes; a distribution (distro) packages the kernel with a shell, utilities, a package manager, and optionally a desktop environment to form a usable operating system
3. Identify three reasons Linux dominates cybersecurity: it is open source (auditable), it is the default operating system for servers and cloud (where security work happens), and it is the runtime environment for virtually every professional security tool (Wireshark, Nmap, Metasploit, auditd)

**Skills Gained:** Linux history, kernel vs. distribution relationship, UNIX philosophy, Linux use cases in security, open source auditability concept
**AI Mentor:** If the learner comes from a Windows background, connect to their existing mental model: "Linux is to Windows what an open workshop is to a commercial appliance — you can see and modify every part, but you need to know what you are doing. This transparency is exactly why security professionals trust it: the code that runs on your server is the same code anyone in the world can audit." Surface the forward reference to kernel internals in L3 and to the security tool ecosystem in Course 5.

---

##### A3.C1.M1.L2 — Linux Distributions and the Package Ecosystem
- **Slug:** linux-distributions-package-ecosystem | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L04 | **Prereqs:** A3.C1.M1.L1
- **Interactive:** ClickableDiagram (distribution family tree — Debian branch: Ubuntu/Mint/Kali; RHEL branch: Fedora/CentOS/AlmaLinux; Arch branch; SUSE branch), ComparisonTable (Debian vs. RHEL family — package format, package manager, update model, enterprise use), QuizWidget
- **Animations:** distro-family-tree-reveal, apt-install-flow-animated, dnf-install-flow-animated, package-dependency-resolution
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 2, CompTIA Linux+ Domain 1, LPIC-1 Topic 101 | **Careers:** Linux Administrator, DevOps Engineer, SOC Analyst, Cloud Security Engineer | **Accessibility:** Distribution tree navigable by keyboard with aria labels per branch; comparison table has proper column and row headers; package manager syntax examples rendered in accessible code blocks; no color-only differentiation between distribution families

**Learning Objectives:**
1. Identify the two dominant Linux distribution families: Debian-based (Ubuntu, Kali, Debian — use apt and .deb packages) and Red Hat-based (RHEL, Fedora, CentOS, AlmaLinux — use dnf/yum and .rpm packages) and explain that core Linux knowledge transfers across both families even when the package commands differ
2. Explain what a package manager does: resolves software dependencies automatically, downloads from verified repositories, installs, updates, and removes software — and contrast this with manually downloading and installing executables (why package managers are more secure: packages are signed and from trusted repositories)
3. Select the appropriate distribution for three professional scenarios: Ubuntu Server 22.04 LTS for learning and general server use, Kali Linux for penetration testing (pre-loaded security tools), RHEL/AlmaLinux for enterprise production servers requiring long-term support

**Skills Gained:** Distribution family identification, apt vs. dnf/yum command mapping, package manager security model, repository concept, distribution selection reasoning, .deb vs. .rpm package formats
**AI Mentor:** Flag the most common beginner mistake: spending time choosing the "best" distribution instead of learning Linux itself. For this academy, all practicals use Ubuntu 22.04 LTS. Confirm the learner understands that the foundational skills — navigation, permissions, processes, logs — transfer identically across all distributions. The package manager is the only significant surface-level difference in day-to-day work. Also surface the security relevance: Kali Linux is NOT for learning or production use; it is a specialised pentesting platform, and running it as your daily driver is both inadvisable and a sign of missing the distinction between learning tools and working tools.

---

##### A3.C1.M1.L3 — The Linux Kernel: Architecture and Security Role
- **Slug:** linux-kernel-architecture-security-role | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-07, OS-L04 | **Prereqs:** A3.C1.M1.L1, A3.C1.M1.L2
- **Interactive:** ClickableDiagram (kernel architecture — hardware layer, kernel space: scheduler/memory manager/VFS/network stack/device drivers, system call interface, user space: libraries/applications), QuizWidget
- **Animations:** kernel-userspace-syscall-flow, hardware-abstraction-layer-reveal, kernel-module-loading-animation, privilege-ring-separation
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 1, LPIC-1 Topic 101, CompTIA Linux+ Domain 1 | **Careers:** Linux Administrator, Systems Engineer, Malware Analyst, Security Engineer | **Accessibility:** Kernel architecture diagram fully labeled with aria roles per layer; system call flow animation steppable with keyboard controls; all layer names available as text alongside diagram; ring privilege levels described textually as well as visually

**Learning Objectives:**
1. Describe what the Linux kernel does: manages hardware resources (CPU scheduling, memory allocation, I/O), enforces privilege separation between kernel space (ring 0, full hardware access) and user space (ring 3, hardware access only through system calls), and provides the system call interface that user programs use to request kernel services
2. Explain the concept of a system call: the mechanism by which a user-space program requests a privileged operation (open a file, create a socket, fork a process) — and identify why this boundary is the most important security enforcement point in the entire operating system
3. Identify three kernel subsystems relevant to security: the VFS (Virtual File System — enforces file permissions), the network stack (enforces socket permissions and packet filtering hooks used by iptables), and LSM (Linux Security Modules — the extension point for SELinux and AppArmor mandatory access control)

**Skills Gained:** Kernel architecture, user space vs. kernel space, ring privilege levels, system call interface, VFS, network stack, LSM introduction, kernel module concept
**AI Mentor:** Connect to Academy 1 content — the learner already knows about processes and OS abstraction from A1.C2.M2. Now anchor that knowledge specifically: "Every security control you will configure in this academy — file permissions, sudo restrictions, iptables rules, SELinux policies, auditd rules — is ultimately enforced by the kernel at the system call boundary. When you understand that, every security tool you use makes more sense." Forward-reference OS-L11 (SELinux/AppArmor) in Course 4.

---

##### A3.C1.M1.L4 — Open Source, Licensing, and the Security Community
- **Slug:** open-source-licensing-security-community | **Type:** discovery | **Duration:** 30 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-07, OS-L04 | **Prereqs:** A3.C1.M1.L1, A3.C1.M1.L2, A3.C1.M1.L3
- **Interactive:** ComparisonTable (GPL vs. MIT vs. Apache vs. Proprietary — four freedoms, modification requirement, commercial use, source access), ClickableDiagram (open-source security tool ecosystem map), QuizWidget
- **Animations:** open-source-contribution-flow, peer-review-security-audit-effect, cve-kernel-patch-lifecycle
- **Practical:** browser-exercise | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 1, CompTIA Linux+ Domain 1 | **Careers:** Security Researcher, DevOps Engineer, Compliance Analyst, All technical roles | **Accessibility:** License comparison table has proper headers; tool ecosystem map keyboard-navigable with aria descriptions per tool; no time-pressure in any interaction; all text content available without animation

**Learning Objectives:**
1. Explain what open source means in terms of the four freedoms (use for any purpose, study how it works, modify it, distribute copies and modifications) and explain why source code availability makes open-source software generally better-audited for security flaws than proprietary alternatives
2. Distinguish the three major open-source license families and their security compliance implications: GPL (copyleft — modifications must be shared under GPL, which means backdoored forks are visible), MIT/Apache (permissive — code can be incorporated into proprietary products, reducing audit visibility), and proprietary (source unavailable — trust must be placed entirely in the vendor)
3. Describe how the Linux kernel security community operates: CVEs are reported to the kernel security team, patches are typically available within days, and the entire process is public — and contrast this with the longer, opaque disclosure cycles typical of proprietary OS vendors

**Skills Gained:** Open source four freedoms, GPL copyleft vs. permissive licenses, license compliance awareness, open-source security audit community, kernel CVE lifecycle, software supply chain transparency concept
**AI Mentor:** Connect to Academy 1's CVE knowledge (SEC-17). The learner already understands the CVE lifecycle; now surface the paradox: open source means any attacker can also read the code. Correct this proactively — "The security of open source comes from the ratio of defenders to attackers in the review community, and from the speed of patch delivery once a flaw is found. A proprietary OS with undisclosed vulnerabilities actively being exploited by a nation-state is demonstrably more dangerous than an open-source OS with a public CVE that was patched last week."

---

### Module A3.C1.M2 — Your First Terminal

**Module Objectives:**
1. Understand the relationship between the terminal emulator and the shell interpreter
2. Navigate the Linux filesystem fluently using pwd, ls, cd, mkdir, mv, and rm
3. Access built-in help systems confidently — man pages, --help, and apropos
4. Develop productive terminal habits: history, tab completion, and essential Ctrl shortcuts

**KG Domain Coverage:** CB-07 (OS concept, applied), CB-08 (file systems, applied at terminal level)
**Practical Outcomes:** Learner navigates a multi-level directory tree, creates a directory structure, moves and renames files, reads a man page synopsis, uses tab completion throughout, and recovers from a hung command using Ctrl+C
**Required Interactive Components:** TerminalSimulator (full Bash session with pre-loaded filesystem), ClickableDiagram (terminal anatomy: prompt components, command structure), ClickableDiagram (man page anatomy), QuizWidget
**Animation Categories:** Terminal prompt anatomy reveal, command-options-arguments structure, man page navigation keys, tab completion autocomplete demo, Ctrl signal effects
**Simulations:** Guided terminal navigation scenario; man page reader (interactive man ls within the TerminalSimulator)
**Assessment Strategy:** Quiz-only for L1 and L3; quiz-and-challenge for L2 and L4

**Practical Progression:**
- **Beginner:** Use pwd, ls -la, and cd to navigate from /home/user to /var/log and back, confirming location at each step with pwd
- **Intermediate:** Create a directory structure (/tmp/lab/evidence/logs), move a file from one directory to another, and rename it — using only terminal commands
- **Advanced:** Use man ls to find the flag that sorts output by modification time in reverse order, and apply it to /var/log
- **Capstone:** Not applicable at module level

---

##### A3.C1.M2.L1 — The Terminal and Shell
- **Slug:** the-terminal-and-shell | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** CB-07 | **Prereqs:** A3.C1.M1.L4
- **Interactive:** TerminalSimulator (live Bash prompt — echo, pwd, whoami, uname -a, date), ClickableDiagram (terminal anatomy: prompt = username@hostname:directory$, command = verb, flags = modifiers, arguments = targets), QuizWidget
- **Animations:** terminal-prompt-anatomy-reveal, shell-interpreting-command-sequence, bash-vs-sh-vs-zsh-comparison
- **Practical:** guided-lab | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 2, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** All technical roles, Linux Administrator, SOC Analyst | **Accessibility:** TerminalSimulator provides screen-reader output for all command results via aria-live region; prompt components labeled individually with aria descriptions; keyboard-only interaction throughout; all color differentiation in the prompt also described textually

**Learning Objectives:**
1. Distinguish a terminal emulator from a shell: the terminal emulator (gnome-terminal, xterm, the SSH client window) is the display program that provides a text interface; the shell (Bash, sh, zsh) is the command interpreter that reads your input, expands variables, locates programs, and executes them — and explain that when you "use the terminal" you are actually interacting with the shell
2. Read the anatomy of a standard Bash prompt: `username@hostname:current_directory$` — where $ indicates a regular user and # indicates root — and identify what each component communicates about the current session state
3. Identify the three-part structure of any Linux command: the command name (the verb), zero or more options/flags (modifiers that change behaviour, prefixed with - or --), and zero or more arguments (the targets or inputs the command acts on) — and apply this structure to parse three unfamiliar commands from their syntax alone

**Skills Gained:** Terminal vs. shell distinction, Bash prompt anatomy, command name/options/arguments structure, root vs. user prompt indicator, shell selection awareness (bash/sh/zsh), basic orientation commands (whoami, uname, date, echo)
**AI Mentor:** Many learners feel intimidated by the terminal because there is no visual hint about what to type. Normalise this explicitly: "The terminal feels alien at first because commands have no menus or buttons. But every Linux command follows the same three-part pattern: what to do, how to do it, and what to do it to. Once that pattern is locked in, reading any new command becomes intuitive — and man pages become your superpower." Confirm the learner can identify the three parts in `ls -la /var/log` before advancing to L2.

---

##### A3.C1.M2.L2 — Essential Navigation Commands
- **Slug:** essential-navigation-commands | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** CB-07, CB-08 | **Prereqs:** A3.C1.M2.L1
- **Interactive:** TerminalSimulator (pwd, ls, ls -la, cd, mkdir -p, mv, cp, rm, rmdir), ClickableDiagram (working directory concept — current position in the filesystem tree), QuizWidget
- **Animations:** pwd-working-directory-reveal, ls-la-output-field-decode, cd-absolute-vs-relative-path, rm-vs-rmdir-failure-case
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, SOC Analyst, All technical roles | **Accessibility:** TerminalSimulator keyboard-navigable with screen-reader output; ls output color coding (file types) also labeled textually; working directory diagram steppable with keyboard; all command examples provided in accessible code blocks with plain-language descriptions

**Learning Objectives:**
1. Use `pwd` to print the current working directory, `ls -la` to list all files (including hidden dot files) with full metadata (permissions, links, owner, group, size, timestamp, name), and `cd` to navigate using both absolute paths (/var/log/auth.log specifies from the root) and relative paths (../logs specifies relative to current position) — and explain that `cd ~` always returns to the home directory and `cd -` returns to the previous directory
2. Create a directory with `mkdir directoryname` and nested directories with `mkdir -p parent/child/grandchild`; rename or move files with `mv source destination`; copy files with `cp source destination`; remove empty directories with `rmdir` and non-empty directories with `rm -r` — and explain why `rm -r` without review is one of the most dangerous commands a beginner can run
3. Distinguish between three critical directory shortcuts: / (the filesystem root — the top of everything), ~ (the home directory — /home/username, your personal space), and . (current directory) / .. (parent directory) — and explain why confusing / and ~ is the single most common beginner navigation error

**Skills Gained:** pwd, ls, ls -la, cd with absolute and relative paths, mkdir -p, mv, cp, rm, rmdir, home vs. root directory distinction, hidden files (dot files), . and .. directory references
**AI Mentor:** The most dangerous moment in a beginner's Linux life is `rm -rf` with the wrong path. Surface this early and clearly: "Before you run any rm command, run `ls` on the same target first to see exactly what you are about to delete. This habit takes three seconds and has saved countless systems." Also reinforce the absolute vs. relative path distinction using a concrete mnemonic: "Absolute paths always start with /. If your path does not start with /, it is relative — interpreted from where you are right now."

---

##### A3.C1.M2.L3 — Getting Help: man, --help, and apropos
- **Slug:** getting-help-man-help-apropos | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** CB-07 | **Prereqs:** A3.C1.M2.L1, A3.C1.M2.L2
- **Interactive:** TerminalSimulator (man ls, ls --help, man -k "list files", apropos network), ClickableDiagram (man page anatomy — NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES, SEE ALSO sections labeled), QuizWidget
- **Animations:** man-page-navigation-keys-demo, synopsis-notation-decode-animation, apropos-keyword-search-results
- **Practical:** guided-lab | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 2, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, All technical roles | **Accessibility:** Man page navigator fully keyboard-accessible (q to quit, / to search, n/N to navigate matches, spacebar to page); man page anatomy diagram text-labeled with aria descriptions per section; SYNOPSIS notation symbols listed in an accessible table; screen-reader output enabled for TerminalSimulator man page display

**Learning Objectives:**
1. Navigate a man page: use arrow keys to scroll, / followed by a search term to find content, n/N to move between matches, and q to quit — and identify the five sections that matter most: NAME (what the command does), SYNOPSIS (how to call it), DESCRIPTION (detailed explanation), OPTIONS (all available flags), and EXAMPLES (if present)
2. Decode SYNOPSIS notation: square brackets [] mean the item is optional, an ellipsis ... means the item is repeatable, words in italics or UPPERCASE are placeholders to replace with actual values, and a vertical bar | means "or" — and apply this to parse the SYNOPSIS of ls and cp without reading the full DESCRIPTION
3. Use `command --help` when a brief usage reminder is sufficient, and `apropos keyword` (equivalent to `man -k keyword`) when you know what you want to do but not which command does it — and explain when each approach is more efficient than searching online

**Skills Gained:** man page navigation (q/space/arrows/search), SYNOPSIS notation decoding, --help usage, apropos/man -k keyword search, info pages awareness, man page sections (1 user commands, 5 file formats, 8 admin commands)
**AI Mentor:** Flag this as the highest-leverage skill in the module: "A Linux professional who can fluently read man pages can independently learn any tool that exists. The man page is always accurate, always current, and always available offline — even during an incident when you have no internet access. Invest in this skill now. It compounds for the rest of your career." If learner struggles with SYNOPSIS notation, use the three-symbol cheat sheet: "[] = optional. ... = repeat. UPPERCASE = replace with your value."

---

##### A3.C1.M2.L4 — Your First Shell Session: Putting It Together
- **Slug:** first-shell-session-putting-it-together | **Type:** discovery | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** CB-07, CB-08 | **Prereqs:** A3.C1.M2.L1, A3.C1.M2.L2, A3.C1.M2.L3
- **Interactive:** TerminalSimulator (complete guided navigation and exploration scenario using all M2 commands), QuizWidget
- **Animations:** shell-history-up-arrow-demo, tab-completion-autocomplete-animation, ctrl-c-ctrl-z-ctrl-d-signal-effects
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Linux Essentials Topic 2, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, SOC Analyst, All technical roles | **Accessibility:** Free lab provides screen-reader output for all commands; tab completion described textually alongside animation; Ctrl shortcuts described with both visual notation and plain-language effect descriptions; all objectives achievable via keyboard alone

**Learning Objectives:**
1. Use command history efficiently: press up/down arrows to recall previous commands, type `history` to see the numbered history list, use `!!` to re-run the last command, and `!n` to re-run command number n — and explain why command history is a forensic artifact that incident responders always collect (stored in ~/.bash_history)
2. Apply tab completion to complete partial file paths and command names by pressing Tab once (completes if unique) or twice (shows all matches if ambiguous) — and explain why tab completion is a security habit, not just a convenience: it prevents typos in rm and mv commands where a single character error can delete the wrong target
3. Interpret and correctly apply four essential Ctrl shortcuts: Ctrl+C (sends SIGINT to terminate a running process), Ctrl+Z (sends SIGTSTP to suspend a process to the background), Ctrl+D (sends EOF — end of input — which logs out of the shell or terminates programs waiting for stdin), and Ctrl+L (clears the terminal screen without losing history)

**Skills Gained:** Command history (up/down arrows, history command, !!, !n, ~/.bash_history), tab completion (single and double tab), Ctrl+C/Z/D/L shortcuts, basic process signal concept (SIGINT/SIGTSTP), forensic value of shell history
**AI Mentor:** The forward reference to signals (Ctrl+C sends SIGINT, Ctrl+Z sends SIGTSTP) is intentional — full Linux signals coverage is in Course 3, Module 1. For now, the behavioural knowledge (what happens when you press these) is sufficient and immediately practical. Flag the ~/.bash_history forensic significance explicitly: "During a Linux incident investigation, one of the first things a responder does is read the bash history of every user account on the system. If an attacker used the machine, their commands may still be there. This is also why attackers sometimes delete or clear the history file — which is itself a suspicious indicator."

---

### Module A3.C1.M3 — The Linux Filesystem

**Module Objectives:**
1. Understand the Filesystem Hierarchy Standard and the security significance of key directories
2. Work with files at a deeper level: inodes, metadata, file types, and link counts
3. View and edit file contents using cat, less, head, tail, grep, and nano
4. Create symbolic links, hard links, and compressed tar archives

**KG Domain Coverage:** OS-L01 (Linux file system hierarchy — primary node for this module), CB-08 (file systems — deeper treatment)
**Practical Outcomes:** Learner navigates the FHS, identifies three security-critical directories, reads the inode metadata of a suspicious file, extracts the last 50 lines of a log file with tail, creates a hard link and a symlink and explains the difference, and packages a directory into a gzip-compressed tar archive
**Required Interactive Components:** ClickableDiagram (FHS directory tree with security annotations), ClickableDiagram (inode structure anatomy), ComparisonTable (file types in ls -l output), TerminalSimulator (cat/less/head/tail/grep/nano/ln/tar), QuizWidget
**Animation Categories:** FHS directory purpose reveal, inode anatomy expand animation, ls -l output field-by-field decode, tail -f live log monitoring, hard-link shared inode vs. symlink pointer, tar archive create-extract sequence
**Simulations:** Security-annotated FHS explorer (click directory → see its purpose and security relevance); inode inspector (click a file → reveal full inode metadata)
**Assessment Strategy:** Quiz-only for L1 and L2; quiz-and-challenge for L3 and L4

**Practical Progression:**
- **Beginner:** Match eight FHS directories (/bin, /etc, /home, /var/log, /tmp, /proc, /root, /opt) to their purpose using drag-and-drop
- **Intermediate:** Run `ls -li /etc/passwd` and decode every field of the output: inode number, permissions, link count, owner, group, size, timestamp, and filename
- **Advanced:** Use tail -n 50 /var/log/syslog and grep "error" to extract all error messages from the last 50 log lines
- **Capstone:** Not applicable at module level

---

##### A3.C1.M3.L1 — Filesystem Hierarchy Standard (FHS)
- **Slug:** filesystem-hierarchy-standard | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L01 | **Prereqs:** A3.C1.M2.L4
- **Interactive:** ClickableDiagram (FHS directory tree: / with expandable children — /bin, /sbin, /etc, /home, /var, /tmp, /proc, /dev, /usr, /opt, /root — each click reveals purpose and security notes), QuizWidget
- **Animations:** fhs-directory-purpose-reveal, proc-filesystem-virtual-demo, security-critical-directories-highlight, world-writable-tmp-warning
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 104 | **Careers:** Linux Administrator, Security Analyst, Incident Responder, Forensics Analyst | **Accessibility:** Directory tree keyboard-navigable with Tab and Enter; each directory node has an aria label with its purpose; security-critical directories marked with both a text label and an icon; /proc virtual filesystem explained in text before the animation

**Learning Objectives:**
1. Identify the purpose of the ten most security-relevant FHS directories: /bin and /usr/bin (user command binaries), /sbin and /usr/sbin (system administration binaries, typically requires root), /etc (system configuration files — the most security-sensitive directory for most administrators), /home (user home directories), /var/log (system and application log files), /tmp and /var/tmp (world-writable temporary directories), /proc (virtual filesystem — does not exist on disk, generated by the kernel to expose process and system state), /root (the root user's home directory), /opt (third-party application software)
2. Explain why /tmp and /var/tmp are security concerns: they are world-writable (any user can write to them), making them the most common location where attackers drop payloads, unpack tools, and stage privilege escalation exploits — and why incident responders always examine these directories first
3. Explain what /proc is: a virtual filesystem that exposes the kernel's internal view of running processes and system state as readable files — and identify three security-relevant paths: /proc/$PID/cmdline (command line of any running process), /proc/net/tcp (all open TCP connections), /proc/sys/kernel/hostname (readable system hostname)

**Skills Gained:** FHS directory purposes, /etc security significance, /tmp and /var/tmp world-writable risk, /proc virtual filesystem, /var/log importance, /root vs /home distinction, incident response directory prioritisation
**AI Mentor:** Plant the incident response mental model explicitly: "When you respond to a Linux security incident, the FHS is your investigation map. Malware typically drops files to /tmp or /var/tmp. Attackers modify configuration in /etc. Forensic evidence is in /var/log. Rootkits hide in /lib or /usr/lib. Persistence mechanisms land in /etc/cron.d or ~/.bashrc. This map makes everything in Course 5's incident response content make immediate sense — so commit these locations now."

---

##### A3.C1.M3.L2 — Files, Directories, and Inodes
- **Slug:** files-directories-inodes | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L01 | **Prereqs:** A3.C1.M3.L1
- **Interactive:** ClickableDiagram (inode structure: inode number, file type and permissions, link count, owner UID, group GID, file size, access/modify/change timestamps, data block pointers), ComparisonTable (file types in ls -l first character: - regular, d directory, l symlink, b block device, c character device, p named pipe, s socket), QuizWidget
- **Animations:** inode-anatomy-expand-animation, ls-l-field-by-field-decode, filename-in-directory-entry-not-inode, deleted-file-inode-persistence
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 104 | **Careers:** Linux Administrator, Forensics Analyst, Incident Responder | **Accessibility:** Inode structure diagram fully text-labeled with aria descriptions for each field; ls -l output decoded field by field with screen-reader announcements; file type table has proper column and row headers; animation has reduced-motion alternative showing static before-and-after states

**Learning Objectives:**
1. Explain what an inode is: a kernel data structure that stores all file metadata (permissions, owner, group, timestamps, size, and pointers to data blocks on disk) but NOT the filename — filenames are stored in directory entries that point to the inode, which is why a single file can have multiple names (hard links) and why renaming a file does not change its inode
2. Decode the complete output of `ls -li`: the leftmost column is the inode number, followed by the 10-character type-and-permissions field, link count, owner name, group name, file size in bytes, last modification timestamp, and filename — and identify the first character of the permissions field (- regular file, d directory, l symbolic link, b/c device files, p named pipe, s socket)
3. Explain why inode persistence matters for digital forensics: when a file is deleted on Linux, the directory entry is removed but the inode (and its data blocks) are not immediately overwritten — they are marked as available for reuse, which means deleted file recovery is possible until those blocks are overwritten by new data

**Skills Gained:** Inode concept, ls -li output parsing (inode number + all fields), file type first-character identification (- d l b c p s), hard link count, three timestamps (atime/mtime/ctime), forensic significance of inode persistence, deleted file recoverability concept
**AI Mentor:** The inode concept is simultaneously one of the most-tested topics in Linux certification exams and one of the most practically useful forensic concepts in the field. If learner struggles, use the library analogy: "The inode is the catalog card — it tells you everything about the item (size, location, last checked out) but not the title. The title (filename) is in the shelf index (directory). This is why you can have two different 'titles' pointing to the same catalog card (hard links), and why ripping out the title card (deleting the filename) doesn't destroy the actual book (inode + data) until no more catalog cards point to it."

---

##### A3.C1.M3.L3 — Viewing and Editing Files
- **Slug:** viewing-and-editing-files | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L01, OS-L09 | **Prereqs:** A3.C1.M3.L1, A3.C1.M3.L2
- **Interactive:** TerminalSimulator (cat /etc/hostname, less /var/log/syslog, head -n 20 /etc/passwd, tail -n 50 /var/log/auth.log, tail -f /var/log/auth.log, grep "Failed" /var/log/auth.log, nano /tmp/test.txt), ComparisonTable (viewer tools: cat vs. less vs. head vs. tail — use case, handles large files, interactive), QuizWidget
- **Animations:** less-navigation-keys-demo, tail-f-live-log-animation, nano-basic-keystroke-overlay, grep-pattern-highlight-reveal
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, SOC Analyst, Incident Responder | **Accessibility:** TerminalSimulator screen-reader output for all file content; less navigation keys documented in an accessible text table alongside the animation; nano controls listed in a reference table; grep results highlighted with both color and a >> text marker; no color-only encoding of matching lines

**Learning Objectives:**
1. View file contents using four tools appropriate to different situations: `cat filename` (full output, appropriate for short files), `less filename` (paged navigation with / search, appropriate for any size), `head -n 20 filename` (first 20 lines), `tail -n 50 filename` (last 50 lines), and `tail -f filename` (follow mode — streams new lines as they are appended, essential for live log monitoring during an incident)
2. Search within files using `grep pattern filename` and explain the three most security-useful grep flags: `-i` (case-insensitive, catches Failed and failed and FAILED), `-r` (recursive — search all files in a directory tree), and `-n` (show line numbers) — and construct a grep command to find all failed SSH login attempts in /var/log/auth.log
3. Edit a plain-text configuration file with nano: open it with `nano filename`, edit text normally, save with Ctrl+O then Enter, and exit with Ctrl+X — and explain why all Linux system configuration lives in plain text files in /etc and why editing them with a text editor (not a GUI application) is the standard administrative method

**Skills Gained:** cat, less (navigation keys + / search), head -n, tail -n, tail -f (live monitoring), grep with -i/-r/-n flags, nano (open/edit/save/exit), configuration file as plain text concept, /var/log/auth.log as primary security log
**AI Mentor:** `tail -f /var/log/auth.log` is one of the most frequently used commands in a live incident response scenario — it lets a responder watch SSH brute-force attempts in real time as they arrive. Surface this directly: "In Course 5, you will watch an attacker's SSH brute-force attack arriving in real time using exactly this command. Every grep option you learn here is a tool you will use to extract attack indicators from logs." Also explicitly flag the vim vs. nano choice: this academy uses nano throughout for simplicity; learners who want vim depth are directed to LPIC-1 study materials, but nano is sufficient for all Academy 3 practicals.

---

##### A3.C1.M3.L4 — Links, Archives, and Compression
- **Slug:** links-archives-compression | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L01 | **Prereqs:** A3.C1.M3.L1, A3.C1.M3.L2, A3.C1.M3.L3
- **Interactive:** TerminalSimulator (ln -s, ln, ls -li to confirm inode sharing, tar czf/tzf/xzf, gzip, gunzip, find /tmp -type l), ClickableDiagram (hard link vs. symlink: hard link shares inode number; symlink has its own inode pointing to a path), QuizWidget
- **Animations:** hard-link-shared-inode-animation, symlink-pointer-to-path-animation, tar-archive-create-list-extract-sequence
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, Security Analyst, Incident Responder | **Accessibility:** Hard link vs. symlink diagram text-labeled; inode sharing shown in text as well as animation (ls -li output with matching inode numbers); tar command flags explained in an accessible flag decoder table; no drag interactions required

**Learning Objectives:**
1. Create a symbolic link with `ln -s target linkname` and a hard link with `ln target linkname`, and explain the critical security difference: a symlink is a special file whose content is a path string pointing to the target (if the target moves or is deleted, the symlink breaks); a hard link is a second directory entry pointing to the same inode (survives target rename or deletion, does not break, but cannot cross filesystem boundaries)
2. Create, list, and extract a gzip-compressed tar archive by decoding each flag in the mnemonic: `tar czf archive.tar.gz directory/` (c=create, z=gzip compress, f=use this filename), `tar tzf archive.tar.gz` (t=list contents), `tar xzf archive.tar.gz` (x=extract) — and explain that .tar.gz (also written .tgz) is the standard archive format for Linux software distribution and forensic evidence packaging
3. Identify the security implication of symbolic links in privileged operations: TOCTOU (Time-of-Check-Time-of-Use) races occur when a privileged process checks whether a file is safe to access and then accesses it, with an attacker substituting a symlink to a sensitive target in the window between the check and the access — this is a common class of local privilege escalation vulnerability

**Skills Gained:** symbolic links (ln -s), hard links (ln), inode sharing confirmation with ls -li, tar czf/tzf/xzf, gzip/gunzip, .tar.gz format, TOCTOU symlink race concept (forward reference to privilege escalation in Course 5)
**AI Mentor:** The TOCTOU foreshadow is planted here and will be activated fully in A3.C5.M2.L4 (Privilege Escalation). Surface it now as a curiosity hook: "When a program running as root checks if a file is safe and then opens it, there is a tiny window between the check and the open. An attacker who can replace the file with a symlink in that window can trick the program into opening /etc/shadow instead. Understanding symlinks now makes that attack make intuitive sense when we get to it." Also ensure learners can confirm hard link sharing by running ls -li on both the original and the link — the identical inode number is the proof.

---

### Module A3.C1.M4 — Bash Shell Basics

**Module Objectives:**
1. Understand how Bash resolves commands and where to configure the shell environment
2. Work with environment variables and the PATH — including their security implications
3. Master stdin, stdout, and stderr redirection and pipe-based command chaining
4. Use shell expansion and quoting correctly — and avoid the word-splitting bugs that break scripts

**KG Domain Coverage:** OS-L07 (Bash scripting — introduction and foundations), CB-08 (file systems — applied through redirection)
**Practical Outcomes:** Learner correctly exports an environment variable, modifies PATH temporarily, builds a three-command pipeline to count failed SSH logins, and demonstrates the difference between quoted and unquoted variable expansion
**Required Interactive Components:** TerminalSimulator (env, export, echo $PATH, pipe chains, redirection operators, glob patterns), ClickableDiagram (stdin/stdout/stderr flow diagram — file descriptors 0/1/2), ClickableDiagram (Bash command resolution order: alias → function → built-in → external), QuizWidget
**Animation Categories:** Command lookup order animation, PATH search left-to-right, stdout-to-file redirection, pipe-between-commands flow, glob pattern matching, brace expansion reveal
**Simulations:** Redirection lab (learner builds progressively complex redirect and pipe commands and observes output); PATH hijacking demo (conceptual — shows how a malicious binary in front of PATH intercepts a command)
**Assessment Strategy:** Quiz-only for L1; quiz-and-challenge for L2, L3, and L4

**Practical Progression:**
- **Beginner:** Use `echo $HOME`, `echo $PATH`, and `printenv USER` to display three environment variables and explain what each stores
- **Intermediate:** Redirect the output of `ls -la /etc` to a file, then redirect only the error output of a command that targets a non-existent path to a separate error log
- **Advanced:** Build the command: `grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head -5` — explain what each stage does and what the final output represents
- **Capstone:** Not applicable at module level

---

##### A3.C1.M4.L1 — The Bash Shell: Power and Anatomy
- **Slug:** bash-shell-power-anatomy | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C1.M3.L4
- **Interactive:** TerminalSimulator (type ls, type echo, type cd, which bash, echo $SHELL, bash --version), ClickableDiagram (Bash command resolution order: alias → shell function → Bash built-in → external command via PATH), QuizWidget
- **Animations:** command-lookup-order-step-through, login-vs-non-login-shell-startup-files, bash-history-file-location
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 105 | **Careers:** Linux Administrator, Security Engineer, SOC Analyst | **Accessibility:** Command resolution order diagram step-through keyboard-controlled; .bashrc vs. .bash_profile distinction explained in text before animation; all startup file names and their purposes listed in an accessible table; screen-reader output for all TerminalSimulator commands

**Learning Objectives:**
1. Explain how Bash resolves a command name in priority order: alias (defined in ~/.bashrc) → shell function (defined in the current session) → Bash built-in (cd, echo, pwd, type, export, source — commands the shell handles internally without forking) → external command (any program found by searching directories in $PATH from left to right) — and use `type commandname` to determine which category any command belongs to
2. Distinguish between a login shell (started when you log in via SSH or the console — reads /etc/profile then ~/.bash_profile or ~/.profile) and a non-login interactive shell (started when you open a terminal inside a graphical session — reads ~/.bashrc) and explain why the practical rule is: "Put environment variable exports and path modifications in ~/.bashrc and source ~/.bashrc from ~/.bash_profile to cover both cases"
3. Identify where Bash stores command history: ~/.bash_history (written when the shell exits), how many commands it stores (controlled by HISTSIZE and HISTFILESIZE variables), and explain one security implication: history can expose credentials typed by mistake on the command line, which is why `export HISTCONTROL=ignorespace` (ignore commands starting with a space) is a common sensitive-command workaround

**Skills Gained:** Bash command resolution order (alias/function/built-in/external), `type` command, login vs. non-login shell, ~/.bashrc vs. ~/.bash_profile, source command, $SHELL variable, ~/.bash_history location, HISTSIZE/HISTFILESIZE, HISTCONTROL
**AI Mentor:** The login vs. non-login shell distinction confuses even experienced Linux users. Use the single-sentence rule: "If you logged in (SSH, console) it's a login shell and .bash_profile runs. If you opened a terminal app after logging in, it's non-login and .bashrc runs. The safe solution: put everything in .bashrc and add `source ~/.bashrc` to your .bash_profile." Also flag the history credential leak risk: typing `mysql -u root -pMyPassword123` on the command line stores that password in ~/.bash_history in plaintext. The solution is `mysql -u root -p` (prompts for password, which does not get stored).

---

##### A3.C1.M4.L2 — Environment Variables and the PATH
- **Slug:** environment-variables-and-path | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C1.M4.L1
- **Interactive:** TerminalSimulator (env, printenv HOME, MYVAR=hello, echo $MYVAR, export MYVAR, unset MYVAR, export PATH=$PATH:/usr/local/sbin, echo $PATH), ClickableDiagram (PATH resolution: left-to-right directory search with first-match-wins), QuizWidget
- **Animations:** env-variable-inheritance-to-child-process, path-search-left-to-right-animation, export-vs-shell-variable-scope, path-hijacking-malicious-directory-first
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 105 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer | **Accessibility:** PATH search order animation steppable with keyboard; all TerminalSimulator outputs have screen-reader labels; environment variable list in a reference table with plain-language descriptions; PATH hijacking risk described in text before animation

**Learning Objectives:**
1. View all environment variables with `env` or `printenv`; create a shell-local variable with `VARNAME=value` (available only in the current shell); export it to child processes with `export VARNAME=value` (inherited by any process spawned from this shell); and remove it with `unset VARNAME` — and explain the critical distinction between a shell variable and an environment variable
2. Explain what $PATH is (a colon-separated list of directories searched left to right when you type a command), how to append a directory to it temporarily (`export PATH=$PATH:/new/dir`) and permanently (add the export to ~/.bashrc), and identify the six most important system PATH directories: /usr/local/sbin, /usr/local/bin, /usr/sbin, /usr/bin, /sbin, /bin
3. Identify PATH hijacking as a privilege escalation risk: if a script or cron job running as root uses a command without a full path (e.g., `ls` instead of `/bin/ls`), an attacker who can write a malicious file named `ls` to a directory that appears earlier in root's PATH can trick the root process into executing arbitrary code — and explain that this is why well-written privileged scripts always use absolute paths

**Skills Gained:** env/printenv, shell variable vs. environment variable, export, unset, $PATH structure, temporary vs. permanent PATH modification, first-match-wins PATH resolution, PATH hijacking risk, absolute path usage in privileged scripts
**AI Mentor:** PATH hijacking is a real local privilege escalation technique that appears on the OSCP exam and in real incident investigations. Activate the attacker mindset spiral explicitly: "This is one of the first things a penetration tester checks on a Linux box: are there cron jobs or SUID programs that run external commands without absolute paths? If so, and if any directory in the PATH is writable, it's game over." Forward-reference A3.C5.M2.L4 (Privilege Escalation) where this vector is exercised in a practical.

---

##### A3.C1.M4.L3 — Redirection, Pipes, and the UNIX Philosophy
- **Slug:** redirection-pipes-unix-philosophy | **Type:** discovery | **Duration:** 50 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07, OS-L09 | **Prereqs:** A3.C1.M4.L1, A3.C1.M4.L2
- **Interactive:** TerminalSimulator (>, >>, <, 2>, 2>&1, |, tee, /dev/null), ClickableDiagram (stdin=fd0/stdout=fd1/stderr=fd2 flow diagram with redirection arrows), QuizWidget
- **Animations:** stdout-to-file-redirection-animation, stderr-separate-from-stdout, pipe-between-commands-flow, tee-split-output-animation, dev-null-discard
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, SOC Analyst, Security Engineer, Incident Responder | **Accessibility:** stdin/stdout/stderr diagram labeled with both color and file descriptor numbers (0/1/2); pipe diagram steppable with keyboard; all redirection operators listed in an accessible table with plain-language descriptions; reduced-motion alternative for data flow animations

**Learning Objectives:**
1. Redirect stdout using `>` (overwrite — destroys existing content) and `>>` (append — adds to end of file), redirect stderr using `2>`, redirect both stdout and stderr to the same file using `2>&1`, and discard output silently using `> /dev/null` (or `2>/dev/null`) — and explain why capturing stderr separately is essential for debugging and why `2>&1` is the standard form for log files that must capture all output
2. Connect commands in a pipeline using `|` to build command chains: `cat /var/log/auth.log | grep "Failed password" | wc -l` counts failed logins; explain that each pipe sends the stdout of the left command to the stdin of the right command, that commands run concurrently with buffered streams, and that this is the UNIX philosophy in action: small programs that do one thing well, combined to do complex things
3. Use `tee` to simultaneously write output to a file and pass it to stdout: `command | tee output.log | next_command` — and explain why `tee` is essential for audit trails in security work where a command's output must be both preserved as evidence and processed further in the same pipeline

**Skills Gained:** stdout (fd1), stderr (fd2), stdin (fd0), `>` overwrite, `>>` append, `2>` stderr redirect, `2>&1` combined, `/dev/null` discard, pipe `|` operator, concurrent pipeline execution, `tee` command, UNIX philosophy (composability), wc -l
**AI Mentor:** Preview the security power of pipelines with a concrete command the learner cannot fully understand yet but will in Course 2: `grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head -10`. Explain what it produces (top 10 IPs attempting SSH brute force) and tell the learner: "By the end of Module 4 you will understand every piece of this. By Course 2 you will build ones like it from scratch." The anticipation of mastery is motivating.

---

##### A3.C1.M4.L4 — Shell Expansion and Quoting
- **Slug:** shell-expansion-and-quoting | **Type:** discovery | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C1.M4.L1, A3.C1.M4.L2, A3.C1.M4.L3
- **Interactive:** TerminalSimulator (glob: *.log, ?.txt, [abc]*; brace: {1..5}, {a,b,c}; variable: $VAR, ${VAR}; command substitution: $(date), $(whoami); quoting: "double", 'single', backslash), QuizWidget
- **Animations:** glob-pattern-matching-animation, brace-expansion-sequence-reveal, command-substitution-dollar-paren-vs-backtick, word-splitting-unquoted-variable-bug
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 1, LPIC-1 Topic 103 | **Careers:** Linux Administrator, Security Engineer, DevOps Engineer | **Accessibility:** Glob pattern matching reference table fully text-described; brace expansion output shown as text alongside animation; quoting rules summarised in an accessible reference table; word-splitting bug demonstrated both visually and with text output comparison

**Learning Objectives:**
1. Use glob patterns to match filenames: `*` (matches any characters including none), `?` (matches exactly one character), `[abc]` (matches one character from the set), and `[a-z]` (matches one character in the range) — and explain why `rm *.log` must always be preceded by `ls *.log` to verify the match set before deletion, and why glob patterns are expanded by the shell (not the command) before execution
2. Apply Bash quoting rules correctly: double quotes `"value"` allow variable (`$VAR`) and command substitution (`$(cmd)`) expansion but prevent glob expansion; single quotes `'value'` suppress all expansion (the string is literal); backslash `\` escapes the single next character — and identify the word-splitting bug where an unquoted variable containing spaces is treated as multiple arguments (`rm $FILENAME` vs. `rm "$FILENAME"`)
3. Use command substitution with `$(command)` to embed command output inside another command: `echo "Logged in as $(whoami) on $(hostname)"`, `touch "backup_$(date +%Y%m%d).tar.gz"` — and explain why the modern `$()` form is preferred over the older backtick form (cleaner nesting, visually distinct from regular text)

**Skills Gained:** glob patterns (* ? [] ranges), brace expansion ({1..5} {a,b}), tilde expansion (~), variable expansion ($VAR/${VAR}), command substitution $(), quoting (double/single/backslash), word splitting hazard with unquoted variables, argument injection risk via unquoted variables
**AI Mentor:** Word splitting with unquoted variables is the source of one of the most common and dangerous shell script bugs. Use the memorable example: a variable containing "my important file" → `rm $FILENAME` deletes three things: my, important, file. `rm "$FILENAME"` correctly deletes one file named "my important file". This is not just a functionality bug — it is a security issue in setuid scripts where an attacker who controls the value of a variable can inject extra arguments into privileged commands. Forward-reference shell scripting security in Course 5.

---

### Course A3.C1 — Capstone

**Title:** Your First Linux Investigation
**Type:** quiz-and-capstone | **Duration:** 75 min | **Difficulty:** beginner

**Scenario:** Learner takes the role of a junior security analyst at Helix Corp. A senior analyst has reported that an Ubuntu 22.04 server may have been accessed by an unauthorised user over the past 48 hours. Learner is given access to a pre-configured TerminalSimulator representing the live system and must complete a structured initial investigation:

1. Navigate to the three highest-priority investigation locations (/var/log, /tmp, and /home) using only absolute paths; run `ls -la` on each and document the full output — identify any files modified in the last 48 hours (use `ls -lt` to sort by time), any world-executable files in /tmp, or any files owned by root in /home
2. Use `ls -li /tmp` to retrieve the inode metadata of each file present, record the inode number, permissions, owner, size, and last modification timestamp for each file, and identify any file whose permissions include the executable bit (x) — these are high-priority artefacts
3. Extract the last 100 lines of /var/log/auth.log using `tail -n 100 /var/log/auth.log`, then count the total number of failed authentication attempts using `grep "Failed password" /var/log/auth.log | wc -l`, and identify the unique usernames targeted using `grep "Failed password" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -rn`
4. Identify any successful logins from external IP addresses using `grep "Accepted" /var/log/auth.log`, extract the source IP address and username from each successful login event, and compare the successful login times against the failed login times to determine whether a brute-force attack succeeded
5. Write a structured 5-sentence incident note documenting: what suspicious artefacts were found, the timeline of authentication events, whether any successful login followed a brute-force pattern, what the probable attacker actions were, and what the recommended immediate next steps are

**Assessment Criteria:** Correct navigation and file listing (20%), inode metadata accuracy (20%), log analysis accuracy and pipeline correctness (35%), incident note quality and precision (25%)
**KG Validation:** OS-L01 (filesystem hierarchy), OS-L07 (Bash/pipelines), OS-L09 (syslog/auth.log), CB-07 (OS internals), CB-08 (filesystem) — all exercised
**Mastery Gate:** ≥80% to unlock Course A3.C2

---

## PART 2: COURSE A3.C2 — LINUX ADMINISTRATION

**Purpose:** The learner can navigate and read a Linux system; this course teaches control — who can access what, and how to manage that access at every level. File permissions, special bits, user and group administration, package management as a security discipline, and Bash scripting as an administrative automation tool. This is the course where Linux transitions from a novelty to a profession. Every topic is approached from a security-first perspective: permissions are taught alongside misconfiguration risks, user management alongside /etc/shadow and authentication hardening, package management alongside package integrity, and scripting alongside the production habits that prevent scripts from becoming vulnerabilities.

**Learning Outcomes:**
- Decode the full 10-character permissions string and calculate octal equivalents
- Use chmod (symbolic and octal) and chown/chgrp to configure file access
- Explain SUID, SGID, and sticky bit semantics and their security implications
- Configure umask for secure default permissions
- Create, modify, and delete user accounts and groups; read /etc/passwd, /etc/shadow, /etc/group
- Configure and audit sudoers for least-privilege access
- Use apt to install, update, search, and remove packages; manage repositories with signature verification
- Write Bash scripts using variables, conditionals, loops, and functions with production-grade error handling

**Estimated Hours:** 9–11 hours | **Difficulty:** beginner–intermediate | **Prerequisites:** A3.C1 Capstone (≥80%)
**Career Relevance:** Linux Administrator, DevOps Engineer, SOC Analyst, Security Engineer, Compliance Analyst
**Certification Alignment:** Linux Essentials 010 Topics 4–5, LPIC-1 Topics 104–105 and 107, CompTIA Linux+ Domains 1–2 and 4, RHCSA EX200 (foundational)

---

### Module A3.C2.M1 — File Permissions and Ownership

**Module Objectives:**
1. Decode the full rwx permission string in ls -l output for owner, group, and others
2. Apply chmod in both symbolic and octal notation to set desired permissions
3. Use chown and chgrp to configure file ownership and group assignment
4. Understand SUID, SGID, and sticky bit semantics and umask defaults

**KG Domain Coverage:** OS-L02 (Permissions model — primary node for this module), OS-L06 (SUID/SGID bits — introduced here, fully exercised in Course 5)
**Practical Outcomes:** Learner decodes four ls -l permission strings, sets permissions using both octal and symbolic chmod, changes file ownership, identifies the SUID bit on /usr/bin/passwd, configures umask 027, and verifies the resulting default permissions on new files
**Required Interactive Components:** ClickableDiagram (rwx bit decoder — 10 characters with expandable field explanations), TerminalSimulator (chmod/chown/chgrp/stat/umask/find -perm), ComparisonTable (symbolic vs. octal chmod notation), QuizWidget
**Animation Categories:** ls-l-permissions-string-decode, chmod-symbolic-vs-octal-comparison, ownership-owner-group-others-reveal, suid-effective-uid-switch, sticky-bit-deletion-protection, umask-subtraction-from-base
**Simulations:** Permissions calculator (set rwx checkboxes → show octal value and ls output); SUID execution flow demo (caller UID 1001 executes SUID binary → effective UID becomes 0 → operation → returns to 1001)
**Assessment Strategy:** Quiz-only for L1 and L4; quiz-and-challenge for L2 and L3

**Practical Progression:**
- **Beginner:** Decode the permissions string `-rwxr-xr--` for owner, group, and others; identify the file type; calculate the octal equivalent (754)
- **Intermediate:** Use `chmod 644`, `chmod u+x`, and `chmod o-w` to set three different configurations on three files in a TerminalSimulator and verify each with ls -la
- **Advanced:** Identify the SUID bit in `ls -l /usr/bin/passwd` output (-rwsr-xr-x); explain why passwd must be SUID root and what would happen if the bit were removed
- **Capstone:** Not applicable at module level

---

##### A3.C2.M1.L1 — Understanding the rwx Permission Model
- **Slug:** understanding-rwx-permission-model | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L02 | **Prereqs:** A3.C1.M4.L4 (A3.C1 Capstone ≥80%)
- **Interactive:** ClickableDiagram (10-character permission string: first char=file type, chars 2–4=owner rwx, 5–7=group rwx, 8–10=others rwx — click each section for detailed explanation), QuizWidget
- **Animations:** permission-string-field-by-field-decode, read-write-execute-semantic-reveal, owner-group-others-three-categories, world-readable-security-warning
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 104 | **Careers:** Linux Administrator, Security Analyst, All technical roles | **Accessibility:** Permission string labeled character-by-character with aria descriptions per field; each rwx category explained in text before animation; no color-only encoding of permission bits; screen-reader output for all interactive elements

**Learning Objectives:**
1. Decode the 10-character permissions field in ls -l output: the first character identifies the file type (- regular, d directory, l symlink, b block device, c character device), and the remaining 9 characters are three groups of three (rwx) specifying read, write, and execute permissions separately for the owner, the group, and others — and calculate the total permissions on any file by reading all three groups independently
2. Explain what r, w, and x mean for files versus directories: for a file, r=read content, w=modify content, x=run as a program; for a directory, r=list contents with ls, w=create or delete files inside, x=traverse (cd into it) — and identify the non-obvious case where x without r on a directory means a user can cd into it and access files by exact name but cannot list its contents
3. Identify the three security questions a permissions string answers: WHO has access (owner, group, or world), WHAT operations are permitted (r, w, x), and WHY this matters — world-readable /etc/shadow exposes password hashes; world-writable /etc allows configuration tampering; a missing x on /usr/bin prevents any program execution

**Skills Gained:** 10-character permission string decoding, file type first character (- d l b c), owner/group/others categories, r/w/x semantics for files vs. directories, world-readable security implications, directory x-without-r behaviour
**AI Mentor:** The most important insight at this level: on a directory, write permission is not about writing to the directory file itself — it is about creating and deleting files inside it. A learner who misunderstands this will always be confused by why a file they cannot modify can be deleted. The correct framing: "Write on a directory = the right to edit the directory's file list. Write on a file = the right to edit the file's content." Also flag the world-readable /etc/shadow scenario — historically this misconfiguration allowed any local user to copy all password hashes and crack them offline.

---

##### A3.C2.M1.L2 — chmod and chown: Setting Permissions and Ownership
- **Slug:** chmod-chown-setting-permissions-ownership | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L02 | **Prereqs:** A3.C2.M1.L1
- **Interactive:** TerminalSimulator (chmod 644, chmod 755, chmod u+x, chmod g-w, chmod o=r, chown alice:staff file.txt, chgrp sudo /etc/sudoers, stat file.txt, ls -la after each change), ComparisonTable (symbolic notation: u/g/o/a + +/-/= + r/w/x vs. octal: 4=r 2=w 1=x summed per category), QuizWidget
- **Animations:** octal-calculation-animation (4+2+1 summed per field), symbolic-chmod-operator-reveal, chown-user-colon-group-syntax, chmod-recursive-flag-warning
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 104 | **Careers:** Linux Administrator, Security Analyst | **Accessibility:** Octal calculator shows arithmetic step-by-step in text; symbolic operators described in plain language alongside symbols; chown syntax decoded character by character with aria labels; TerminalSimulator screen-reader output for all results

**Learning Objectives:**
1. Set file permissions using octal notation: calculate each digit by summing r=4, w=2, x=1 for each permission group (e.g., 644 means owner rw- = 4+2+0=6, group r-- = 4+0+0=4, others r-- = 4) — and apply the three most common patterns: 644 (standard non-executable file — readable by all, writable by owner), 755 (standard directory or executable — owner can do all, group and others can read and execute), 600 (private file — only owner can read/write, used for SSH keys and sensitive configs)
2. Set file permissions using symbolic notation: combine u (user/owner), g (group), o (others), a (all three) with + (add), - (remove), = (set exactly) and r/w/x — for example `chmod u+x script.sh` adds execute for the owner, `chmod o-rwx private/` removes all permissions for others, `chmod g=r data.txt` sets group to read-only exactly — and explain that symbolic notation is preferred for incremental changes (add one bit) while octal is preferred when setting all permissions at once
3. Change file ownership with `chown user:group file` (change both owner and group simultaneously), `chown user file` (owner only), `chown :group file` (group only), and `chgrp group file` (group only via the dedicated command) — and explain that only root can change a file's owner to another user, which is why chown always requires sudo, and why `chmod -R` must always be preceded by `ls -la` on the target path to verify exactly what will be modified recursively

**Skills Gained:** chmod octal notation (4+2+1 per field), chmod symbolic notation (u/g/o/a with +/-/= and r/w/x), chown (user:group syntax), chgrp, chmod -R recursive flag and its risks, stat command for full file metadata, common permission patterns (644/755/600)
**AI Mentor:** Octal notation has exactly three rules: r=4, w=2, x=1. Sum them for the group you want. Repeat three times. If learner struggles, offer the binary mnemonic: rwx = 111 in binary = 7; rw- = 110 = 6; r-x = 101 = 5; r-- = 100 = 4. Three patterns cover 90% of real-world use: 644, 755, 600. Flag that `chmod -R` on the wrong path is a common disaster: someone runs `chmod -R 777 /` thinking they are targeting a subdirectory, and has created a world-writable system. Always verify the exact path before adding -R.

---

##### A3.C2.M1.L3 — Special Permissions: SUID, SGID, and Sticky Bit
- **Slug:** special-permissions-suid-sgid-sticky-bit | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L02, OS-L06 | **Prereqs:** A3.C2.M1.L1, A3.C2.M1.L2
- **Interactive:** TerminalSimulator (ls -la /usr/bin/passwd, find / -perm -4000 2>/dev/null, chmod 4755 /tmp/testbin, chmod 2755 /tmp/testdir, chmod 1777 /tmp, ls -la /tmp), ClickableDiagram (SUID execution flow: caller UID 1001 → kernel sees SUID bit → effective UID becomes file owner → operation completes → returns to UID 1001), QuizWidget
- **Animations:** suid-effective-uid-switch-animation, sgid-directory-group-inheritance, sticky-bit-deletion-protection-reveal, find-suid-binaries-output
- **Practical:** simulation | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 104, CompTIA Security+ Domain 3 | **Careers:** Linux Administrator, Security Analyst, Incident Responder | **Accessibility:** SUID execution flow labeled with text descriptions per step; effective vs. real UID distinction explained textually; sticky bit semantics described before animation; all terminal output screen-reader accessible

**Learning Objectives:**
1. Explain the SUID (Set User ID) bit: when set on an executable, the program runs with the effective UID of the file's owner rather than the calling user's UID — identify it in ls -l output as `s` in the owner execute position (-rwsr-xr-x), calculate its octal prefix (4, e.g., chmod 4755), and explain the legitimate use case: /usr/bin/passwd must be SUID root because it writes to /etc/shadow, a root-owned file — without SUID, unprivileged users could not change their own password
2. Explain SGID (Set Group ID): on an executable, the program runs with the file's group as the effective GID; on a directory, new files created inside inherit the directory's group rather than the creator's primary group — identify it as `s` in the group execute position, calculate its octal prefix (2, e.g., chmod 2755), and explain the directory use case: shared project directories where all files must belong to a shared group regardless of who creates them
3. Explain the sticky bit: when set on a world-writable directory, only the file owner and root can delete or rename files inside it — identify it as `t` in the others execute position (drwxrwxrwt), calculate its octal prefix (1, e.g., chmod 1777), and explain why /tmp has the sticky bit: without it, any user could delete any other user's temporary files — and identify the incident response command to locate all SUID binaries on a system: `find / -perm -4000 -type f 2>/dev/null`

**Skills Gained:** SUID (s in owner execute, chmod 4xxx, effective UID switch), SGID (s in group execute, chmod 2xxx, directory group inheritance), sticky bit (t in others execute, chmod 1xxx, /tmp protection), real vs. effective UID concept, find -perm -4000 for SUID audit, legitimate SUID binaries (/usr/bin/passwd, /usr/bin/sudo)
**AI Mentor:** Plant the security foreshadow explicitly but frame it as curiosity: "If a program has the SUID bit set and contains a command injection vulnerability, an attacker who finds it has a local root escalation path. This is why one of the first things a security auditor does on any Linux system is run `find / -perm -4000 2>/dev/null` and compare the results against a known-good baseline — any unexpected SUID binary is worth investigating immediately. Course 5 activates this knowledge into an active skill. For now, understand the mechanism: SUID = the program temporarily borrows the file owner's identity from the kernel's perspective."

---

##### A3.C2.M1.L4 — umask and Default Permission Management
- **Slug:** umask-and-default-permission-management | **Type:** expository | **Duration:** 35 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L02 | **Prereqs:** A3.C2.M1.L1, A3.C2.M1.L2, A3.C2.M1.L3
- **Interactive:** TerminalSimulator (umask, umask 022, touch testfile && ls -la testfile, mkdir testdir && ls -la testdir, umask 027, umask 077), ClickableDiagram (umask calculation: base 666 for files − umask = result; base 777 for directories − umask = result), QuizWidget
- **Animations:** umask-subtraction-from-base-animation, umask-022-step-by-step-calculation, umask-027-security-significance, etc-login-defs-system-default
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 104 | **Careers:** Linux Administrator, Security Engineer, Compliance Analyst | **Accessibility:** umask calculation shown as both octal subtraction and bit-level table; common umask values listed with their resulting file and directory permissions; all examples available as text; no timed interactions

**Learning Objectives:**
1. Explain what umask is: a value subtracted from the maximum default permissions (666 for new files, 777 for new directories) to determine actual creation permissions — so `umask 022` yields files with 644 (666 − 022) and directories with 755 (777 − 022), the standard default on most Linux systems, while `umask 027` yields files with 640 and directories with 750 (no permissions for others at all)
2. View the current umask with `umask`, set it temporarily with `umask value`, and set it permanently by adding the line to ~/.bashrc (user-specific) or /etc/profile and /etc/login.defs (system-wide default for new accounts) — and identify the security significance of the three common values: 022 (standard — others can read), 027 (restricted — others have no access, appropriate for most server environments), 077 (maximum restriction — owner only, appropriate for root and service accounts)
3. Explain why umask matters for compliance: the CIS Benchmark for Linux recommends umask 027 or stricter for all interactive user sessions and umask 077 for root and service accounts, because a permissive umask (like 000) creates world-writable files by default — any script or application that creates temp files would expose their contents to all local users, which is a data confidentiality violation on multi-user systems

**Skills Gained:** umask concept, subtraction from 666/777, umask 022 (default), umask 027 (restricted), umask 077 (owner-only), viewing and setting umask, /etc/login.defs for system defaults, ~/.bashrc for per-user defaults, CIS Benchmark umask guidance
**AI Mentor:** The umask subtraction formula confuses learners because it is octal subtraction, not boolean NOT. Prevent the common error: "umask 022 does NOT mean 'remove the bits represented by 022.' It means: start with 666 for files, subtract 022 digit by digit to get 644. The 0 in the hundreds position means no restriction at all. The 2 in the tens means remove write from group. The 2 in the units means remove write from others." If learners ask why umask is backwards from chmod, acknowledge it as a valid question — it is a historical UNIX design choice, and understanding it as subtraction from a theoretical maximum is the correct mental model.

---

### Module A3.C2.M2 — Users and Groups

**Module Objectives:**
1. Understand Linux identity: how the kernel uses UIDs and GIDs to enforce access control
2. Read and interpret /etc/passwd, /etc/shadow, and /etc/group as security-relevant databases
3. Create, modify, and delete user accounts and groups using standard administration tools
4. Configure sudo for least-privilege access and audit sudoers for dangerous entries

**KG Domain Coverage:** OS-L03 (Users and groups — /etc/passwd, /etc/shadow, UID 0 = root — primary node for this module)
**Practical Outcomes:** Learner creates a new user account with a home directory, assigns it to a supplementary group, sets a password and password expiry policy, reads /etc/shadow and identifies the hash algorithm prefix, and adds a sudoers entry granting one specific command without granting a full root shell
**Required Interactive Components:** ClickableDiagram (/etc/passwd field decoder — 7 fields with expandable explanations), ClickableDiagram (/etc/shadow field decoder — 9 fields), TerminalSimulator (useradd/usermod/userdel/groupadd/groupmod/passwd/chage/visudo/sudo -l), QuizWidget
**Animation Categories:** passwd-file-seven-field-reveal, shadow-hash-algorithm-prefix, uid-zero-root-privilege, useradd-creates-home-and-passwd-entries, visudo-syntax-validation-flow, sudo-execution-and-logging
**Simulations:** User creation wizard (set useradd flags → see resulting /etc/passwd and /etc/shadow entries); sudoers entry builder (configure user, host, runas, command → generate correct syntax and preview audit log entry)
**Assessment Strategy:** Quiz-only for L1 and L2; quiz-and-challenge for L3 and L4

**Practical Progression:**
- **Beginner:** Decode the root entry in /etc/passwd — `root:x:0:0:root:/root:/bin/bash` — identifying all seven fields including the meaning of UID 0
- **Intermediate:** Create user `analyst`, set a password, assign to supplementary group `secops`, and verify the account appears correctly in /etc/passwd, /etc/shadow, and /etc/group
- **Advanced:** Add a sudoers entry allowing `analyst` to run `/usr/bin/tcpdump` as root without a password prompt, then verify with `sudo -l -U analyst`
- **Capstone:** Not applicable at module level

---

##### A3.C2.M2.L1 — Linux Identity: UIDs, GIDs, and /etc/passwd
- **Slug:** linux-identity-uids-gids-passwd | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L03 | **Prereqs:** A3.C2.M1.L4
- **Interactive:** ClickableDiagram (/etc/passwd entry anatomy — 7 colon-separated fields: username:x:UID:GID:GECOS:home:shell — click each field for detailed explanation), TerminalSimulator (cat /etc/passwd, id, id alice, getent passwd alice, awk -F: '($3==0){print}' /etc/passwd), QuizWidget
- **Animations:** passwd-seven-field-reveal, uid-zero-root-privilege-animation, uid-range-system-vs-human, getent-vs-cat-passwd-nsswitch
- **Practical:** simulation | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 5, CompTIA Linux+ Domain 2, LPIC-1 Topic 107 | **Careers:** Linux Administrator, SOC Analyst, Incident Responder, Forensics Analyst | **Accessibility:** /etc/passwd decoder keyboard-navigable with field names announced by screen reader; UID range table available as text alongside animation; all command outputs in accessible code blocks; no timed interactions

**Learning Objectives:**
1. Decode the seven fields of an /etc/passwd entry: username (login name), password placeholder (always x on modern systems — actual hash lives in /etc/shadow), UID (numeric user identifier — the kernel enforces all permissions using UIDs, not usernames), GID (primary group ID), GECOS (comment field — conventionally the full name), home directory, and login shell (set to /sbin/nologin or /bin/false for service accounts that must not have interactive access)
2. Explain how the kernel uses UIDs to enforce access: UID 0 is the unconditional superuser (root) with no kernel permission checks applied; UIDs 1–999 are reserved for system and service accounts; UIDs 1000+ are human user accounts on Debian/Ubuntu systems — and identify why UID 0 matters more than the name "root": any account assigned UID 0 has full kernel privilege regardless of what it is called, making UID-0 account auditing a first step in any incident investigation
3. Use `id` to display the current user's UID, primary GID, and all supplementary group memberships; use `id username` to inspect any account; and use `getent passwd username` to query through the Name Service Switch (which includes LDAP and Active Directory in enterprise environments, not only /etc/passwd) — and explain why `cat /etc/passwd` is incomplete on domain-joined systems where accounts live in LDAP rather than local files

**Skills Gained:** /etc/passwd seven fields, UID 0 superuser semantics, UID ranges (0 / 1–999 / 1000+), GECOS field, /sbin/nologin for service accounts, `id` command, `getent passwd`, NSS awareness, `awk -F: '($3==0){print}' /etc/passwd` for UID-0 audit
**AI Mentor:** The UID-0 insight is critical and commonly missed: "Root is not a name — it is a number. An account named 'backup' or 'support' with UID 0 has exactly the same kernel privilege as the root account. Attackers who persist on a Linux system sometimes create a backdoor account with UID 0 and an innocuous name. This is why `awk -F: '($3==0){print}' /etc/passwd` is one of the first commands a responder runs — not `grep root /etc/passwd`."

---

##### A3.C2.M2.L2 — Groups, /etc/group, and Effective Access
- **Slug:** groups-etc-group-effective-access | **Type:** expository | **Duration:** 40 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L03 | **Prereqs:** A3.C2.M2.L1
- **Interactive:** ClickableDiagram (/etc/group anatomy — 4 fields: groupname:x:GID:member-list — click each for explanation), TerminalSimulator (groups, groups alice, cat /etc/group, groupadd secops, usermod -aG secops alice, newgrp secops, id after each), QuizWidget
- **Animations:** primary-vs-supplementary-group-animation, group-permission-check-order-flow, usermod-aG-vs-usermod-G-comparison, newgrp-subshell-effect
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 5, CompTIA Linux+ Domain 2, LPIC-1 Topic 107 | **Careers:** Linux Administrator, Security Engineer | **Accessibility:** /etc/group decoder text-labeled with aria descriptions per field; permission check order flow steppable with keyboard; usermod -aG vs. -G comparison shown as side-by-side text output; all command examples in accessible code blocks

**Learning Objectives:**
1. Decode the four fields of /etc/group: group name, password field (almost always x or empty — group passwords are a legacy feature rarely used), GID (numeric group ID used by the kernel for all permission checks), and the comma-separated member list (supplementary members only — users whose primary group is this GID do not appear in the member list) — and use `groups username` to display all groups a user belongs to, both primary and supplementary
2. Explain the critical safety rule of `usermod -aG`: the `-a` flag means append — it adds the user to the new group while preserving all existing supplementary group memberships; omitting `-a` replaces the entire supplementary group list with only the new group, which can silently remove access to shared directories, monitoring tools, and services — this is one of the most dangerous Linux administration mistakes and it takes effect immediately
3. Explain how the kernel resolves group permissions at file access time: (1) Is the accessing user the file's owner? Apply owner permissions. (2) Does any of the user's groups match the file's group? Apply group permissions. (3) Otherwise apply others permissions. The first matching category wins — they are not combined — and demonstrate why this matters: a file with permissions `640` owned by root:secops is accessible to members of secops but not to users whose only group is `users`, even if `users` has read access to the parent directory

**Skills Gained:** /etc/group four fields, primary group vs. supplementary groups, `groups` command, `groupadd`, `usermod -aG` (critical: always include -a), `newgrp` for temporary group switch, kernel permission check order (owner → group → others), first-match-wins evaluation, GID in /etc/passwd vs. /etc/group
**AI Mentor:** Engrave the `-a` rule: "The `-a` in `usermod -aG` stands for append. Without it, you set the entire group list to exactly one entry and remove every other group the user was in. If that user was in `sudo`, `docker`, `secops`, and `adm`, you have just silently stripped all of those memberships. The user will not know until they try to use sudo and get denied. Always `-aG`. Never just `-G`." Also explain `newgrp secops`: it opens a new subshell with secops as the active primary group, useful for creating files that inherit the group without logging out — the group switch evaporates when you exit the subshell.

---

##### A3.C2.M2.L3 — Password Security: /etc/shadow and Account Policies
- **Slug:** password-security-etc-shadow-policies | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L03 | **Prereqs:** A3.C2.M2.L1, A3.C2.M2.L2
- **Interactive:** ClickableDiagram (/etc/shadow field anatomy — 9 fields: username:hash:lastchange:min:max:warn:inactive:expire:reserved — click each for explanation), TerminalSimulator (sudo cat /etc/shadow, passwd alice, chage -l alice, chage -M 90 -W 14 alice, passwd -l alice, passwd -u alice, ls -la /etc/shadow), QuizWidget
- **Animations:** shadow-access-restriction-640-reveal, hash-algorithm-prefix-identification, chage-policy-field-mapping, account-lock-bang-prepend-animation
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 5, CompTIA Linux+ Domain 2, LPIC-1 Topic 107, CompTIA Security+ Domain 3 | **Careers:** Linux Administrator, Security Engineer, Compliance Analyst, SOC Analyst | **Accessibility:** /etc/shadow decoder keyboard-navigable with aria descriptions per field; hash prefix table available as text; chage output explained field by field in text; account lock/unlock status described textually and visually

**Learning Objectives:**
1. Explain why /etc/shadow exists: historically, password hashes were stored in /etc/passwd which is world-readable (required so any program can look up usernames) — this allowed any local user to copy the hashes and crack them offline. /etc/shadow stores the hashes with permissions 640 (readable only by root and the shadow group) — verify with `ls -la /etc/shadow` — and identify the hash format: `$id$salt$hash` where $1$=MD5 (dangerously weak, broken in seconds on GPU hardware), $5$=SHA-256, $6$=SHA-512 (current standard on most Linux systems), and $y$=yescrypt (modern default on Ubuntu 22.04+, memory-hard and GPU-resistant)
2. Decode the nine fields of /etc/shadow: username, hashed password (! means account locked — hash prepended with !, * means no-login service account), days since epoch of last password change, minimum days between changes (0 = change any time), maximum days before forced change, warning days before expiry, inactive days after expiry before account disable, account expiry date (days since epoch, empty = never), reserved field — and use `chage -l username` to read these in human-readable form
3. Configure password aging policies with chage and lock/unlock accounts with passwd: `chage -M 90 username` (maximum 90-day password lifetime), `chage -W 14 username` (14-day warning before expiry), `chage -I 30 username` (disable account 30 days after password expires), `passwd -l username` (lock — prepends ! to hash), `passwd -u username` (unlock — removes !) — and state the CIS Benchmark requirements: password max age ≤365 days, minimum age ≥1 day, warning ≥7 days, disable inactive accounts within 30 days

**Skills Gained:** /etc/shadow nine fields, /etc/shadow access restriction (640 / shadow group), hash algorithm prefixes ($1$/$5$/$6$/$y$), chage -l / -M / -W / -I, passwd -l (lock) / -u (unlock), ! and * in hash field, account expiry, CIS Benchmark password policy requirements, GPU cracking speed context for hash algorithm selection
**AI Mentor:** The hash algorithm prefix is a fast triage signal during incident response: "$1$" means MD5 — billions of hashes per second on a consumer GPU, effectively crackable for any password under 12 characters. "$6$" means SHA-512 — much slower but still crackable for weak passwords. "$y$" (yescrypt) is intentionally memory-hard and GPU-resistant. Surface this practically: "If you find an /etc/shadow backup file in /tmp or leaked via a misconfigured web server, the first thing you check is the hash prefix — because that tells you exactly how urgent the password rotation is. MD5 hashes = rotate immediately and treat all accounts as compromised."

---

##### A3.C2.M2.L4 — sudo and the Principle of Least Privilege
- **Slug:** sudo-principle-of-least-privilege | **Type:** expository | **Duration:** 50 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L03 | **Prereqs:** A3.C2.M2.L1, A3.C2.M2.L2, A3.C2.M2.L3
- **Interactive:** TerminalSimulator (sudo -l, sudo -l -U alice, sudo /usr/bin/tcpdump, sudo su -, sudo visudo, cat /etc/sudoers, cat /etc/sudoers.d/*), ClickableDiagram (sudoers entry anatomy: `user HOST=(runas) command` — click each token for explanation), QuizWidget
- **Animations:** sudo-authentication-and-logging-flow, sudo-vs-su-security-comparison, sudoers-entry-parse-animation, sudo-command-in-auth-log-reveal
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Linux Essentials Topic 5, CompTIA Linux+ Domain 2, LPIC-1 Topic 105, CompTIA Security+ Domain 3 | **Careers:** Linux Administrator, Security Engineer, SOC Analyst, Compliance Analyst | **Accessibility:** sudoers entry diagram text-labeled with aria descriptions per token; sudo flow steppable with keyboard; all syntax examples in accessible code blocks with plain-language annotations; auth.log entry decoded field by field

**Learning Objectives:**
1. Explain what sudo does and why it is preferred over `su -`: sudo runs a single command as another user (typically root) after authenticating with the caller's own password and logs every invocation to /var/log/auth.log with timestamp, username, and exact command; `su -` opens a full root shell requiring root's password, logs only the su event but not subsequent commands, and grants unrestricted root access for the duration of the session — explain why sudo is the security standard: it enforces least privilege, avoids sharing root's password, and creates a complete audit trail
2. Read and write sudoers entries correctly: the format is `user HOST=(runas) command` — `alice ALL=(ALL) ALL` grants alice full root on all hosts; `alice ALL=(root) /usr/bin/tcpdump` restricts to one command; `alice ALL=(root) NOPASSWD: /usr/sbin/service nginx restart` waives the password prompt for that specific command; `%secops ALL=(root) /usr/bin/journalctl` grants the entire secops group access to journalctl — and explain that all sudoers editing must be done with `visudo`, which validates syntax before saving (a syntax error in /etc/sudoers without visudo locks out all sudo access system-wide)
3. Identify the two most dangerous sudoers misconfigurations that appear in real penetration tests and security audits: (1) `ALL=(ALL) NOPASSWD: ALL` — full unrestricted root with no authentication, reducing sudo to a pass-through; (2) per-command grants for tools that can spawn a shell — `find`, `less`, `vim`, `python3`, `perl`, `awk`, `nmap`, `tee` — because any of these tools can be used to obtain a shell as root even when granted only for a specific named binary — audit with `sudo -l -U username` for any account and `grep -r NOPASSWD /etc/sudoers /etc/sudoers.d/` for system-wide review

**Skills Gained:** sudo vs. su comparison, sudo -l (self) / sudo -l -U (any user), /var/log/auth.log sudo logging, sudoers entry format (user HOST=(runas) command), ALL keyword, NOPASSWD flag, %group syntax, visudo mandatory usage, /etc/sudoers.d/ drop-in files, shell-spawning tool risks (find/less/vim/python3), grep audit for NOPASSWD entries
**AI Mentor:** Flag the shell-escape risk with concrete examples that appear in real CTF challenges and penetration tests: "If you see `alice ALL=(root) NOPASSWD: /usr/bin/find` in sudoers, alice has root. The command `sudo find /tmp -exec /bin/bash \;` spawns a root shell via find's -exec flag. The same is true for vim (`sudo vim` then `:!/bin/bash`), less (`sudo less /etc/passwd` then `!bash`), and Python (`sudo python3 -c 'import pty; pty.spawn("/bin/bash")'`). Every time you write a per-command sudoers entry, check whether the tool has a known shell escape — GTFOBins.github.io documents them all."

---

### Module A3.C2.M3 — Shell Environment and Bash Scripting

**Module Objectives:**
1. Write executable Bash scripts with correct structure, variable handling, and exit codes
2. Implement control flow using conditionals and loops to automate repetitive tasks
3. Create reusable functions that accept arguments and return status codes
4. Harden scripts with set -euo pipefail, trap, and syslog integration

**KG Domain Coverage:** OS-L07 (Bash scripting — variables, loops, conditionals, pipes, redirection — primary node for this module)
**Practical Outcomes:** Learner writes a working user-audit script that accepts a list of usernames as arguments, checks each with `id`, reports found or missing, counts failures, and exits with a non-zero code if any account was not found — then hardens it with set -euo pipefail and a trap handler that logs to syslog on unexpected exit
**Required Interactive Components:** TerminalSimulator (nano script.sh, chmod +x, bash -x debug trace, $? exit codes, if/for/while/functions, set -euo pipefail, trap, logger), ClickableDiagram (script anatomy: shebang → set options → variable declarations → function definitions → main logic → exit), CodeDiffViewer (fragile vs. hardened version of the same script), QuizWidget
**Animation Categories:** shebang-interpreter-resolution, if-double-bracket-test-evaluation, for-loop-iteration-sequence, function-call-and-return, set-euo-error-stop-demonstration, trap-cleanup-on-exit
**Simulations:** Script builder (fill in variable/conditional/loop blocks → see completed working script); bash -x trace reader (step through execution with each expanded command highlighted)
**Assessment Strategy:** Quiz-only for L1; quiz-and-challenge for L2, L3, and L4

**Practical Progression:**
- **Beginner:** Write a 6-line script that accepts a directory as `$1`, checks with `[ -d "$1" ]`, and prints "Directory found" or "Directory not found: $1" — then make it executable and run it
- **Intermediate:** Add a for loop inside the found branch that lists the 5 newest files using `ls -lt "$1" | tail -n 5`
- **Advanced:** Convert the directory check to a function, add `set -euo pipefail`, and add a trap that prints "Script failed at line $LINENO" to syslog on ERR
- **Capstone:** Not applicable at module level

---

##### A3.C2.M3.L1 — Writing Your First Script: Shebang, Variables, and Exit Codes
- **Slug:** writing-first-script-shebang-variables | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C2.M2.L4
- **Interactive:** TerminalSimulator (nano script.sh, #!/usr/bin/env bash, chmod +x, ./script.sh, bash script.sh, VARNAME="value", echo "$VARNAME", readonly CONST, $0 $1 $2 $# $@ $?), ClickableDiagram (script anatomy: shebang → variable declarations → main code block → exit N), QuizWidget
- **Animations:** shebang-interpreter-path-resolution, chmod-x-executable-bit, dollar-special-variables-reveal, exit-code-zero-nonzero-meaning
- **Practical:** guided-lab | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 3, CompTIA Linux+ Domain 4, LPIC-1 Topic 105 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer | **Accessibility:** Script anatomy diagram text-labeled with aria descriptions; special variable table fully text-described; exit code table (0=success, 1=general error, 2=misuse, 126=not executable, 127=command not found) as accessible table; all terminal output screen-reader accessible

**Learning Objectives:**
1. Write a minimal executable Bash script: first line is `#!/usr/bin/env bash` (the shebang — instructs the kernel to use the bash interpreter found via PATH, more portable than hardcoding #!/bin/bash), save the file, make it executable with `chmod +x script.sh`, and run it with `./script.sh` — and explain that `./` is required because the current directory is not in PATH by design (a security measure that prevents accidentally running a malicious script named `ls` dropped into the current directory)
2. Declare and use variables: assign with `VARNAME="value"` (no spaces around =, always double-quote assignments that may contain spaces), reference with `"$VARNAME"` (always quoted to prevent word splitting), declare constants with `readonly VARNAME="value"` — and use the six most important special variables: `$0` (script name), `$1`/`$2` (positional arguments), `$#` (argument count), `$@` (all arguments as separate quoted words), `$?` (exit code of the last command — 0 = success, non-zero = failure)
3. Return meaningful exit codes from scripts: `exit 0` (success), `exit 1` (general failure), `exit 2` (usage error — wrong arguments) — and explain why this discipline matters: scripts called by cron jobs, monitoring systems, CI pipelines, and other scripts depend on exit codes to determine whether to continue, alert, or retry; a script that always exits 0 regardless of internal failures is indistinguishable from success and can mask errors indefinitely

**Skills Gained:** shebang `#!/usr/bin/env bash`, chmod +x, `./script` execution, `bash script` execution, variable assignment (no spaces around =), always-quote references (`"$VAR"`), readonly constants, $0/$1/$2/$#/$@/$?, exit 0/1/2, exit code semantics, `./ ` safety explanation
**AI Mentor:** Three habits that separate professional Bash scripts from amateur ones: (1) Always use `#!/usr/bin/env bash`, never `#!/bin/sh` unless you are deliberately targeting POSIX sh and need maximum portability at the cost of Bash features. (2) Always quote every variable reference — `"$VARNAME"` not `$VARNAME`. (3) Always exit with a meaningful code. Without these three, a script that works in development will fail unpredictably in production. These are not style preferences — they prevent real bugs.

---

##### A3.C2.M3.L2 — Control Flow: Conditionals and Loops
- **Slug:** control-flow-conditionals-loops | **Type:** expository | **Duration:** 50 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C2.M3.L1
- **Interactive:** TerminalSimulator (if [[ ]]; then/elif/else/fi, test -f/-d/-r/-w/-x/-z/-n, for item in list, for ((i=0;i<5;i++)), while [[ ]], until, break, continue), ClickableDiagram (if-elif-else-fi flow diagram with condition evaluation path), ComparisonTable (while vs. until: condition polarity; for-in vs. C-style for: use cases), QuizWidget
- **Animations:** if-double-bracket-evaluation-sequence, for-in-loop-variable-iteration, while-condition-check-loop-exit, test-file-operators-reference
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** CompTIA Linux+ Domain 4, LPIC-1 Topic 105 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer | **Accessibility:** if/elif/else flow diagram labeled with text per branch; loop iteration shown step by step in text; test operator table fully text-described; control flow keywords in accessible reference table with plain-language descriptions

**Learning Objectives:**
1. Write if/elif/else conditionals using `[[ ]]` double brackets: `if [[ condition ]]; then commands; elif [[ other ]]; then commands; else commands; fi` — use string comparisons (`==`, `!=`), numeric comparisons (`-eq`, `-ne`, `-lt`, `-le`, `-gt`, `-ge`), and file tests (`-f` file exists and is regular, `-d` directory exists, `-r` readable, `-w` writable, `-x` executable, `-e` exists any type, `-s` non-empty, `-z` string is empty, `-n` string is non-empty) — and explain that `[[ ]]` is preferred over `[ ]`: it is a Bash keyword rather than a command, handles unquoted variables safely, and supports `&&` and `||` inside the test without quoting issues
2. Write for loops in two forms: `for item in list; do commands; done` (iterates over a word list, e.g., `for user in $(cat users.txt); do` or `for file in /var/log/*.log; do`) and `for ((i=0; i<10; i++)); do commands; done` (C-style arithmetic loop for counted iterations) — and write while and until loops: `while [[ condition ]]; do commands; done` (continues while condition is true) and `until [[ condition ]]; do commands; done` (continues until condition becomes true) — use `break` to exit a loop early and `continue` to skip to the next iteration
3. Apply control flow to a real administration task: write a script that reads a list of usernames from a file (one per line), loops over them with a for loop, checks whether each exists using `id "$user" &>/dev/null`, prints a found or not-found message, and counts the failures — then exits with `exit 1` if the failure count is greater than zero, making the script detectable by monitoring systems

**Skills Gained:** if/elif/else/fi, `[[ ]]` double brackets, file test operators (-f/-d/-r/-w/-x/-e/-s/-z/-n), string comparison (== !=), numeric comparison (-eq/-ne/-lt/-le/-gt/-ge), for-in loop, C-style for loop, while/until loops, break/continue, practical user-validation pattern, counting failures with a counter variable
**AI Mentor:** The most important practical shift here: "Security professionals write scripts because manual repetition is where mistakes happen. Checking 200 user accounts by running `id username` 200 times by hand is error-prone, undocumented, and not reproducible. The same check as a 10-line script runs in under a second, produces consistent output, can be version-controlled, and reruns identically for the next quarterly audit. The hour you invest in the script pays back every time the audit repeats." Also surface `set -e` and `set -u` as a preview of L4 — the two most important hardening options for any production script.

---

##### A3.C2.M3.L3 — Functions, Arguments, and Script Inputs
- **Slug:** functions-arguments-script-inputs | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07 | **Prereqs:** A3.C2.M3.L1, A3.C2.M3.L2
- **Interactive:** TerminalSimulator (function definition, local VARNAME, return N, $1/$2 inside function, shift, getopts, read -p prompt, read -s silent), ClickableDiagram (function call stack: main → helper_function → return value → main continues), QuizWidget
- **Animations:** function-definition-and-call-animation, local-vs-global-scope-reveal, getopts-flag-parsing-sequence, read-s-silent-input-no-echo
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** CompTIA Linux+ Domain 4, LPIC-1 Topic 105 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer | **Accessibility:** Function call stack diagram text-labeled with aria descriptions; local vs. global scope shown as text comparison; getopts example decoded step by step; read -s password pattern described in text alongside animation

**Learning Objectives:**
1. Define and call Bash functions: `function_name() { commands; }` — inside the function, `$1`, `$2`, and `$@` refer to the function's own arguments (separate from the script's positional parameters); use `local VARNAME="value"` to scope variables to the function only (prevents global namespace pollution and variable collision); use `return N` to return an exit code (0–255) — and call the function with `function_name arg1 arg2`, then check `$?` immediately after the call to test whether the function succeeded
2. Process command-line flags with `getopts`: `while getopts "f:v" flag; do case $flag in f) FILE="$OPTARG";; v) VERBOSE=true;; esac; done` — the colon after a letter means that flag requires an argument stored in `$OPTARG`; and use `shift` to advance through positional parameters (`shift` moves $2 to $1, $3 to $2, etc., useful for processing argument lists sequentially after getopts finishes)
3. Accept interactive input with `read` and handle sensitive inputs securely: `read -p "Enter username: " USER` (display prompt then read into USER), `read -s -p "Enter password: " PASS; echo` (silent mode — input not echoed to terminal, essential for passwords) — and explain why accepting passwords as command-line arguments (`./script.sh --password=MyPass`) is insecure: arguments appear in `ps aux` output visible to all users on the system and are stored in ~/.bash_history

**Skills Gained:** function definition syntax, $1/$2/$@ inside functions, local variables, return N exit codes, $? after function call, getopts flag parsing, $OPTARG, shift command, read -p for prompts, read -s for silent password input, CLI argument credential exposure via ps/history
**AI Mentor:** The `read -s` pattern for passwords is a professional habit many scripts get wrong: "If you see a script invoked as `backup.sh --password=MyPass123`, that password is visible in `ps aux` to every user on the system and is stored in the caller's ~/.bash_history. The correct pattern is `read -s -p 'Enter database password: ' DB_PASS; echo` — which leaves no trace in history or process listing. This is how production scripts that handle credentials should always work, and it is one of the first things a security reviewer checks when auditing automation."

---

##### A3.C2.M3.L4 — Hardening Scripts: set -euo pipefail, trap, and Logging
- **Slug:** hardening-scripts-set-euo-trap-logging | **Type:** discovery | **Duration:** 55 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07, OS-L09 | **Prereqs:** A3.C2.M3.L1, A3.C2.M3.L2, A3.C2.M3.L3
- **Interactive:** TerminalSimulator (set -euo pipefail, trap 'cleanup' EXIT, trap 'log_error $LINENO' ERR, logger -t myscript "message", date +%Y%m%d_%H%M%S, full hardened backup script end-to-end), CodeDiffViewer (fragile vs. hardened version of the same 20-line administration script), QuizWidget
- **Animations:** set-e-stops-on-error-animation, set-u-unset-variable-error-reveal, pipefail-catches-pipeline-failure, trap-exit-cleanup-sequence, logger-writes-to-syslog
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** CompTIA Linux+ Domain 4, LPIC-1 Topic 105 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer | **Accessibility:** CodeDiffViewer uses color plus annotation labels; diff described textually line by line; set/trap/logger explained in plain language before code examples; all terminal output screen-reader accessible; no timed interactions

**Learning Objectives:**
1. Harden every production script with `set -euo pipefail` immediately after the shebang: `-e` exits the script immediately when any command returns non-zero (unless handled with `|| true` or an if statement); `-u` treats any reference to an unset variable as a fatal error (prevents the catastrophic case where `rm -rf "${TMPDIR}/"` becomes `rm -rf /` when $TMPDIR is unset); `-o pipefail` makes a pipeline fail if any component command fails, not only the last one — and explain that omitting these options produces scripts that silently continue past failures and can cause cascading damage that is difficult to diagnose
2. Use `trap` to run cleanup or logging code on script exit: `trap 'cleanup_function' EXIT` (runs on any exit, normal or abnormal), `trap 'echo "Caught INT" | logger -t myscript' INT TERM` (catches Ctrl+C and kill signals), `trap 'logger -t myscript "Error at line $LINENO"' ERR` (logs the line number of any failing command) — and explain why trap-based cleanup is essential for scripts that create temporary files, hold locks, or open database connections: without trap, an interrupted script leaves the system in a partial state
3. Write scripts that produce auditable output: use `logger -t script_name "message"` to write directly to syslog (appears in /var/log/syslog and is captured by rsyslog/journald — visible even when the script runs from cron with no terminal); use `date +%Y%m%d_%H%M%S` to generate sortable timestamps for log messages and backup filenames; and design cron-safe scripts that produce no stdout output on success (cron emails any stdout to the root account, creating noise) and write all status information to syslog

**Skills Gained:** set -e (exit on error), set -u (unset variable is fatal), set -o pipefail (pipeline failure propagation), trap EXIT/INT/TERM/ERR, $LINENO in trap, logger -t for syslog integration, date +%Y%m%d_%H%M%S, cron-safe silent-unless-error design, temporary file cleanup pattern, lock file management concept
**AI Mentor:** `set -u` catches the single most dangerous class of Bash bugs: "Without -u, the script executes `rm -rf "${BACKUP_DIR}/"` even if $BACKUP_DIR is unset, which becomes `rm -rf /`. With -u, the script stops immediately on the unset variable with a clear error message. The same protection applies to database connection strings, backup destinations, and every variable that controls where data is written or deleted. Make `set -euo pipefail` the first line after every shebang — no exceptions for production scripts." Also surface the `logger` habit: cron jobs run without a terminal, so any print statement goes nowhere unless redirected. `logger` writes directly to syslog, ensuring every scheduled script execution is recorded regardless of how it was invoked.

---

### Module A3.C2.M4 — Administrative Tools and Automation

**Module Objectives:**
1. Install, update, search, and remove software using apt and dnf with dependency resolution and package integrity verification
2. Configure software repositories, manage GPG signing keys, and pin critical packages against unintended upgrades
3. Compile and install software from source using the configure-make-install workflow and verify build integrity before extraction
4. Schedule automated administrative tasks using cron and at; design cron jobs that are auditable, cron-environment-safe, and persistence-mechanism-aware

**KG Domain Coverage:** OS-L04 (Package management — apt/dnf/repositories/GPG signing — primary node for this module), OS-L07 (Bash scripting — cron integration and automation patterns — applied)
**Practical Outcomes:** Learner installs a security tool with apt, adds a third-party repository with correct GPG key verification using the signed-by method, compiles a tool from source after verifying its checksum, writes a cron job that runs a nightly log analysis script and logs failures to syslog, and performs a system-wide cron audit identifying all scheduled tasks across every cron location
**Required Interactive Components:** TerminalSimulator (apt/dnf full lifecycle, dpkg -l, dpkg --verify, add-apt-repository, gpg --dearmor, apt-mark hold/unhold, apt-cache showhold, sha256sum, wget, tar xzf, ./configure, make, sudo make install, crontab -e/-l/-r, at/atq/atrm, cat /etc/crontab, ls /etc/cron.d/), ComparisonTable (apt vs. dnf: install/remove/search/update/info/cleanup — side-by-side mapping), ClickableDiagram (package signing chain: developer GPG-signs release → repository stores signed package → apt downloads package + signature → apt verifies GPG signature → installs only if verified), ClickableDiagram (cron expression five fields with ranges and special characters), QuizWidget
**Animation Categories:** apt-install-dependency-resolution, gpg-signature-verification-flow, configure-make-install-three-stage, cron-expression-field-by-field-build, cron-minimal-environment-contrast
**Simulations:** cron expression builder (set five time fields → preview next five execution times with human-readable labels); apt package state machine (search → install → hold → unhold → remove → purge — states shown as a lifecycle diagram)
**Assessment Strategy:** Quiz-only for L1 and L3; quiz-and-challenge for L2 and L4

**Practical Progression:**
- **Beginner:** Install `nmap` with apt, verify it appears in `dpkg -l | grep nmap`, run `nmap --version`, then remove it with `apt remove nmap` and confirm removal with `dpkg -l | grep nmap`
- **Intermediate:** Add the GitHub CLI repository by downloading its GPG key to /etc/apt/keyrings/ with gpg --dearmor, create the correct signed-by entry in /etc/apt/sources.list.d/, run `apt update`, install `gh`, and verify with `apt-cache policy gh` that the package came from the correct repository URL
- **Advanced:** Write a crontab entry that runs `/opt/scripts/log-audit.sh` every night at 3:15 AM, discards stdout, and pipes stderr to syslog via logger; verify with `crontab -l` and explain why the script must use absolute paths and declare its own PATH variable
- **Capstone:** Not applicable at module level

---

##### A3.C2.M4.L1 — Package Management with apt and dnf
- **Slug:** package-management-apt-dnf | **Type:** expository | **Duration:** 45 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L04 | **Prereqs:** A3.C2.M3.L4
- **Interactive:** TerminalSimulator (apt update, apt upgrade, apt install nmap, apt search nmap, apt show nmap, apt remove nmap, apt purge nmap, apt autoremove, dpkg -l, dpkg -l nmap, dpkg -l | awk '$1=="ii" {print $2, $3}', dpkg --verify, dnf install nmap, dnf search nmap, dnf info nmap, dnf remove nmap, dnf autoremove, dnf history, dnf history undo 5), ComparisonTable (apt vs. dnf: install/remove/search/upgrade/info/list-installed/cleanup/history — side-by-side command mapping), QuizWidget
- **Animations:** apt-install-dependency-resolution, apt-remove-vs-purge-config-file-fate, dpkg-status-codes-ii-rc-un-decode, dnf-transaction-history-rollback
- **Practical:** guided-lab | **Assessment:** quiz-only | **Reflection:** articulation
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 102 | **Careers:** Linux Administrator, DevOps Engineer, SOC Analyst, Cloud Security Engineer | **Accessibility:** apt vs. dnf comparison table has proper row and column headers for all ten command rows; dpkg status codes decoded in an accessible text reference table alongside animation; all TerminalSimulator outputs screen-reader accessible; no color-only encoding of package states; dependency resolution animation has steppable keyboard alternative showing each resolved dependency as text

**Learning Objectives:**
1. Manage the full package lifecycle with apt on Debian/Ubuntu systems: `apt update` (refresh the local package index from repositories — must run before install or upgrade to avoid installing stale, potentially vulnerable versions); `apt install packagename` (install with automatic dependency resolution); `apt upgrade` (upgrade all installed packages to the latest versions in the refreshed index); `apt search keyword` (search package names and descriptions in the local index); `apt show packagename` (display version, dependencies, description, and maintainer); `apt remove packagename` (uninstall the binary but preserve configuration files in /etc — useful before reinstallation); `apt purge packagename` (remove binary and all configuration files completely — use for decommissioning or clean reinstallation); `apt autoremove` (remove packages installed as dependencies that are no longer required by anything installed)
2. Translate the ten most common apt commands to their dnf equivalents for Red Hat-based systems: `dnf install`, `dnf remove`, `dnf search`, `dnf info`, `dnf upgrade` (equivalent to apt upgrade), `dnf check-update` (list available upgrades without applying them), `dnf autoremove`, `dnf list installed` (equivalent to dpkg -l for installed packages), `dnf history` (full transaction log with numeric IDs), and `dnf history undo ID` (roll back a specific transaction, reverting installed and removed packages to their prior state — a capability apt does not natively provide) — and identify the two most important dnf behavioral differences: transaction history with rollback, and module streams for managing multiple parallel software stack versions
3. Audit installed packages for incident response with dpkg on Debian systems: the first two characters of each `dpkg -l` line encode desired and actual state (ii = intended installed, currently installed correctly; rc = removed but configuration files remain; un = unknown, never installed) — use `dpkg -l | awk '$1=="ii" {print $2, $3}'` to enumerate every installed package and its version; use `dpkg --verify` to detect any installed package file modified since installation — each output line indicates a modified file (permission, content, or ownership change), while silence means all files match their original checksums; an unexpected output line from dpkg --verify on a critical binary is a high-priority indicator of compromise

**Skills Gained:** apt update/upgrade/install/remove/purge/autoremove/search/show, dpkg -l (ii/rc/un status codes), dpkg --verify for post-install file integrity, apt vs. dnf command mapping, dnf history and undo, package dependency resolution, apt-update-before-install discipline, remove vs. purge use cases, unauthorized package auditing for incident response
**AI Mentor:** Reinforce the `apt update` discipline: "Running `apt install` without a prior `apt update` installs from a potentially weeks-old local index. If a CVE was patched three weeks ago and your index is older, you install the vulnerable version even though the patched one is available. `apt update && apt install` is the correct form — never separate them by more than a day in a production environment." Also separate remove from purge clearly: "Remove is for routine uninstallation. Purge is for decommissioning — if you purge a web server, its /etc configuration is gone; if you reinstall it later, you start from clean defaults with no inherited misconfiguration. Use purge whenever you intend the service to be fully gone from the system."

---

##### A3.C2.M4.L2 — Repositories, GPG Signing, and Package Integrity
- **Slug:** repositories-gpg-signing-package-integrity | **Type:** expository | **Duration:** 45 min | **Difficulty:** intermediate | **Bloom's:** understand | **Ethical Content:** false
- **KG Nodes:** OS-L04 | **Prereqs:** A3.C2.M4.L1
- **Interactive:** TerminalSimulator (cat /etc/apt/sources.list, ls /etc/apt/sources.list.d/, apt-cache policy packagename, curl -fsSL https://keyserver/key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/tool.gpg, echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/tool.gpg] https://packages.example.com/apt stable main" | sudo tee /etc/apt/sources.list.d/tool.list, apt update, apt install tool, apt-cache policy tool, apt-mark hold packagename, apt-mark unhold packagename, apt-cache showhold), ClickableDiagram (package signing chain of trust: developer GPG-signs release metadata → repository mirrors signed packages → apt downloads package + detached signature → apt verifies signature using stored public key → install proceeds only if verified, NO_PUBKEY error if key missing), QuizWidget
- **Animations:** sources-list-deb-line-field-by-field-decode, gpg-dearmor-keyring-creation, apt-mark-hold-prevents-upgrade, no-pubkey-error-correct-response
- **Practical:** guided-lab | **Assessment:** quiz-and-challenge | **Reflection:** metacognitive
- **Certs:** Linux Essentials Topic 4, CompTIA Linux+ Domain 1, LPIC-1 Topic 102, CompTIA Security+ Domain 2 | **Careers:** Linux Administrator, DevOps Engineer, Security Engineer, Supply Chain Security Analyst | **Accessibility:** GPG signing chain diagram fully text-labeled with aria descriptions per stage; sources.list entry decoded field by field with plain-language labels below each component; hold/unhold workflow described textually; NO_PUBKEY error response documented in text before animation; all terminal examples in accessible code blocks with annotations

**Learning Objectives:**
1. Decode a modern sources.list entry and add a third-party repository correctly: `deb [arch=amd64 signed-by=/etc/apt/keyrings/tool.gpg] https://packages.example.com/apt stable main` — `deb` means binary packages (deb-src means source packages for compilation), `arch=` restricts to an architecture, `signed-by=` specifies the GPG keyring used to verify this repository's packages (the modern replacement for the deprecated `apt-key add`), the URL is the repository base, `stable` is the distribution suite or codename, and `main` is the component — add a third-party repository correctly: (1) download the key with `curl -fsSL URL | sudo gpg --dearmor -o /etc/apt/keyrings/name.gpg`, (2) create a .list file in /etc/apt/sources.list.d/ with the signed-by path referencing the keyring file, (3) run `apt update` to import the index and verify the key resolves
2. Explain the package signing chain of trust and its precise scope: the developer GPG-signs the release metadata file; the repository distributes the signed metadata alongside package files; apt downloads both the package and the signed metadata; it verifies the cryptographic signature against the stored public key before installation — this protects against a network attacker or compromised mirror substituting a different package in transit; and explain clearly what it does not protect against: the upstream developer publishing malicious code in a legitimately signed release — the 2024 XZ Utils backdoor was distributed in correctly signed packages from a trusted maintainer; understanding the boundary of each control prevents misplaced confidence
3. Manage package version pinning: `apt-mark hold packagename` (freeze a package at its current version — apt upgrade skips it), `apt-mark unhold packagename` (re-enable automatic upgrading), `apt-cache showhold` (list all held packages system-wide) — explain the security trade-off: holding a package prevents unexpected breakage from upstream changes and protects a known-good configuration, but it also prevents security patches from being applied automatically; held packages must be reviewed on every CVE advisory cycle and manually upgraded when security-relevant fixes are available, making them a maintenance liability that requires tracking

**Skills Gained:** sources.list entry structure (deb, arch, signed-by, URL, suite, component), /etc/apt/sources.list.d/ drop-in files, gpg --dearmor keyring creation to /etc/apt/keyrings/, signed-by vs. deprecated apt-key, NO_PUBKEY error meaning and resolution, GPG signing chain scope and limitations, XZ Utils 2024 backdoor as upstream supply chain example, apt-mark hold/unhold, apt-cache showhold, version pinning security trade-off and maintenance discipline
**AI Mentor:** The supply chain context is nuanced and critical: "Package signing verifies that what apt downloaded matches what the repository published. It does not verify that what the repository published is safe — that requires a different control layer. The XZ Utils backdoor of 2024 reached users through correctly signed packages because the malicious code was contributed to the source tree before signing, by an attacker who spent two years building trust in the project. Understand the precise boundary of each control: GPG signing prevents transit tampering and mirror compromise. Source code integrity monitoring, reproducible builds, and community code review are what catch upstream compromise. Know what you are relying on and what you are not."

---

##### A3.C2.M4.L3 — Building Software from Source
- **Slug:** building-software-from-source | **Type:** expository | **Duration:** 40 min | **Difficulty:** intermediate | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L04 | **Prereqs:** A3.C2.M4.L1, A3.C2.M4.L2
- **Interactive:** TerminalSimulator (wget URL, curl -LO URL, sha256sum archive.tar.gz, tar xzf archive.tar.gz, cd source-dir, apt install build-essential, ./configure, ./configure --prefix=/usr/local, ./configure 2>&1 | grep -i error, apt install libssl-dev, make, make -j$(nproc), sudo make install, which tool, tool --version, checkinstall), ClickableDiagram (configure-make-install three stages: ./configure checks dependencies and generates a Makefile tailored to the current system → make compiles all source files into binaries and shared libraries → make install copies binaries/libraries/headers to the installation prefix), QuizWidget
- **Animations:** sha256sum-verify-before-extract, configure-dependency-check-sequence, make-j-parallel-compilation-animation, prefix-installation-path-mapping, checkinstall-creates-deb-wrapper
- **Practical:** guided-lab | **Assessment:** quiz-only | **Reflection:** metacognitive
- **Certs:** CompTIA Linux+ Domain 1, LPIC-1 Topic 102 | **Careers:** Linux Administrator, DevOps Engineer, Security Researcher, Malware Analyst | **Accessibility:** Three-stage build diagram text-labeled with aria descriptions per stage; common configure error messages listed in an accessible reference table with resolution steps for each; compilation progress described in text alongside animation; prefix path mapping shown as a text table; all terminal examples in accessible code blocks

**Learning Objectives:**
1. Follow the complete autoconf source build workflow: download the source tarball with `wget URL` or `curl -LO URL`; verify integrity with `sha256sum archive.tar.gz` against the checksum published on the official download page (if hashes differ, the file is corrupt or tampered — abort and re-download from the official source, never proceed past a failed checksum); extract with `tar xzf archive.tar.gz`; install the build toolchain with `apt install build-essential` (provides gcc, g++, make, and standard C headers); change into the source directory; run `./configure` to check for required libraries and system headers and generate a Makefile tailored to the current system; run `make` to compile (or `make -j$(nproc)` to parallelize compilation across all available CPU cores); run `sudo make install` to copy the compiled binaries, libraries, and headers to the installation prefix
2. Interpret `./configure` output and resolve dependency errors: a missing library produces `configure: error: library not found` or `checking for libssl... no` — resolve with `apt install libname-dev` where the -dev suffix provides the header files needed to compile against the library, not merely use it at runtime (the runtime library and the development headers are separate packages on Debian systems); use `./configure --prefix=/usr/local` (the default) to install to /usr/local/bin for binaries — /usr/local/bin appears before /usr/bin in the default PATH, so locally built binaries shadow distro-provided versions; use `--prefix=$HOME/.local` for user-level installations that do not require root access
3. Explain why compiling from source is sometimes necessary and always a maintenance responsibility: necessary when a specific version is required for a vulnerability test, when custom compile-time flags are needed, or when no distro package exists — but source builds carry ongoing costs: no automatic security updates (CVE monitoring and recompilation are entirely manual), no package manager tracking, and potential dependency conflicts with distro packages; explain `checkinstall` as the preferred alternative to bare `sudo make install`: it intercepts the installation, creates a .deb or .rpm package from the compiled output, making the software removable with `apt remove`, visible in `dpkg -l`, and tracked in the package database with a version that can be audited

**Skills Gained:** wget/curl download, sha256sum integrity verification, tar xzf extraction, build-essential, ./configure (dependency checking, Makefile generation), --prefix installation path, make / make -j$(nproc), sudo make install, -dev vs. runtime library packages, /usr/local/bin vs. /usr/bin precedence, checkinstall as package-manager-tracked alternative, source build security and maintenance trade-offs
**AI Mentor:** Connect to discipline and maintenance: "Compiling from source is not automatically more secure — you are adding an untracked binary to a privileged location with no automatic updates. Before choosing this path, answer three questions: Is the source from the official project repository with a verified SHA-256 checksum? Does the project publish security advisories you can subscribe to? Do you have a documented process for recompiling and reinstalling when a CVE is published? If the package manager version meets your technical requirement, it is almost always the better choice — signature verification, automatic security updates, and dpkg tracking come for free."

---

##### A3.C2.M4.L4 — Automation with cron, at, and Scheduled Tasks
- **Slug:** automation-cron-at-scheduled-tasks | **Type:** discovery | **Duration:** 50 min | **Difficulty:** beginner | **Bloom's:** apply | **Ethical Content:** false
- **KG Nodes:** OS-L07, OS-L04 | **Prereqs:** A3.C2.M3.L4, A3.C2.M4.L1
- **Interactive:** TerminalSimulator (crontab -e, crontab -l, crontab -r, cat /etc/crontab, ls -la /etc/cron.d/, ls /etc/cron.daily/ /etc/cron.weekly/ /etc/cron.monthly/, at now +1 hour, atq, atrm 3, for f in /var/spool/cron/crontabs/* /etc/cron.d/*; do echo "=== $f ==="; cat "$f"; done), ClickableDiagram (cron expression five fields: minute(0–59) | hour(0–23) | day-of-month(1–31) | month(1–12) | day-of-week(0–6, 0=Sunday) — click each field to reveal valid range, special characters with examples: * / , -), QuizWidget
- **Animations:** cron-expression-field-by-field-build, cron-no-terminal-minimal-environment-contrast, at-one-time-scheduling-flow, crontab-vs-etc-cron-d-scope-comparison
- **Practical:** free-lab | **Assessment:** quiz-and-challenge | **Reflection:** transfer
- **Certs:** Linux Essentials Topic 5, CompTIA Linux+ Domain 4, LPIC-1 Topic 107 | **Careers:** Linux Administrator, DevOps Engineer, SOC Analyst, Incident Responder | **Accessibility:** Cron expression field diagram text-labeled with field names, valid ranges, and worked examples per field; special characters listed in a plain-language table (*/,-); at command output screen-reader accessible; cron environment limitations listed in a text reference table; system-wide audit command decoded step by step in text; all scheduling examples in accessible code blocks

**Learning Objectives:**
1. Write and manage crontab entries: `crontab -e` opens the editor for the current user's personal crontab (stored in /var/spool/cron/crontabs/username), `crontab -l` lists current entries, `crontab -r` removes all entries without prompting (use with extreme care) — each cron line has six fields: `minute hour day-of-month month day-of-week command` — special characters: `*` means every value in the field, `/n` means every n steps (`*/15` = every 15 minutes), `,` separates listed values (`1,15` = at minute 1 and minute 15), `-` specifies a range (`1-5` = Monday through Friday) — and interpret the four most common time expressions: `0 2 * * *` (2:00 AM daily), `*/15 * * * *` (every 15 minutes), `0 0 * * 0` (midnight every Sunday), `0 3 1 * *` (3:00 AM on the first of each month)
2. Distinguish the four cron contexts and their scope: the per-user crontab (`crontab -e` for current user, /var/spool/cron/crontabs/username) runs commands as that user; /etc/crontab is the system-wide crontab with an extra username field inserted as the sixth field (before the command) specifying which account runs it; /etc/cron.d/ accepts drop-in files in the same /etc/crontab format, used by installed packages to add their own scheduled tasks without editing the main file; /etc/cron.daily/, /etc/cron.weekly/, and /etc/cron.monthly/ run executable scripts placed inside them at the corresponding interval via run-parts — perform a complete system-wide cron audit with: `for f in /var/spool/cron/crontabs/* /etc/cron.d/*; do echo "=== $f ==="; cat "$f"; done` and `ls /etc/cron.daily/ /etc/cron.weekly/ /etc/cron.monthly/`
3. Handle cron's minimal execution environment and schedule one-time tasks with at: cron runs with a stripped-down environment — PATH contains only /usr/bin:/bin, no HOME is set to the user's home directory, no aliases, no .bashrc sourcing — which is why every command in a crontab must use its absolute path (/usr/bin/python3 not python3, /opt/scripts/audit.sh not audit.sh) and scripts intended for cron must declare PATH explicitly at the top (`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`); scripts that work interactively but fail silently from cron almost always have a relative command reference or an assumed environment variable; schedule one-time tasks with `at`: `echo "/opt/scripts/patch.sh" | at 02:00 tomorrow`, `atq` to list pending jobs, `atrm N` to cancel job N before it runs

**Skills Gained:** crontab -e/-l/-r, five-field cron expression (*/,-), /etc/crontab (with username field) vs. /etc/cron.d/ vs. /var/spool/cron/crontabs/ vs. /etc/cron.daily|weekly|monthly, at/atq/atrm, cron minimal environment (PATH=/usr/bin:/bin only, no HOME, no .bashrc), absolute paths required in cron, PATH declaration at crontab top, cron job silent-on-success design with logger for errors, system-wide cron audit command for incident response, cron as attacker persistence mechanism
**AI Mentor:** Flag the persistence angle directly: "Cron is one of the most common persistence mechanisms on Linux. After gaining initial access, attackers add a crontab entry that re-downloads and re-executes their payload every few minutes — so even if the file is deleted, cron reinstalls it within the interval. During any Linux incident investigation, a system-wide cron audit is mandatory: check /var/spool/cron/crontabs/ for every user, /etc/cron.d/ for package-installed jobs, /etc/crontab for system tasks, and all run-parts directories. Any entry containing curl or wget that contacts an external URL is a high-priority red flag — legitimate scheduled maintenance does not download from the internet. Course 5 exercises this in a full investigation scenario." Also surface the silent failure design: cron sends stdout to the local mail account, which most servers never read — errors vanish completely. Design cron jobs to discard normal stdout with `>> /dev/null` and route errors to syslog with `2>&1 | logger -t jobname` so failures always appear in /var/log/syslog regardless of how the job was invoked.

---

### Course A3.C2 — Capstone

**Title:** Linux Administration Hardening Audit
**Type:** quiz-and-capstone | **Duration:** 90 min | **Difficulty:** beginner–intermediate

**Scenario:** Learner is a Linux administrator at Meridian Financial Services. An upcoming PCI-DSS compliance review requires the Ubuntu 22.04 production application server to pass a baseline security hardening check before the external assessors arrive. A senior security engineer has provided a six-point hardening checklist and access to a TerminalSimulator representing the live server — which has been seeded with eight intentional misconfigurations across permissions, user accounts, installed software, and scheduled tasks. The learner must identify and remediate each finding, then write and deploy a reusable hardening verification script that can be run before every future compliance review:

1. **Permissions audit:** Run `find / -perm -o+w -not -path "/proc/*" -not -path "/tmp/*" -not -path "/dev/*" -type f 2>/dev/null` to locate world-writable files outside expected locations; identify the world-writable configuration file in /etc (the simulator contains one — a web application config set to 777 by mistake) and remediate with `chmod 644`; find all SUID binaries with `find / -perm -4000 -type f 2>/dev/null`; compare against the baseline list of ten expected SUID binaries provided in the lab and document the one unexpected SUID binary — identify which binary it is, explain why it poses a local privilege escalation risk, and remove the SUID bit with `chmod u-s /path/to/binary`; verify /etc/shadow permissions with `ls -la /etc/shadow` and remediate with `chmod 640 /etc/shadow` if the permissions are incorrect

2. **User and group audit:** Check for UID-0 accounts beyond root using `awk -F: '($3==0){print}' /etc/passwd` — the simulator contains one unauthorised UID-0 account; identify it, document it as a critical finding, and use `usermod -u 1500 username` to reassign it a non-privileged UID (do not delete — the account may be needed for investigation); list all accounts with interactive login shells using `awk -F: '($7=="/bin/bash"){print $1}' /etc/passwd`; check for accounts with no password set using `sudo awk -F: '($2==""){print $1}' /etc/shadow` — identify and immediately lock the passwordless account with `passwd -l username`; audit sudoers with `sudo grep -r NOPASSWD /etc/sudoers /etc/sudoers.d/` — the simulator contains one full-root NOPASSWD entry (`ALL=(ALL) NOPASSWD: ALL`); explain why this is functionally equivalent to giving the account an unrestricted root shell, then use `sudo visudo` to replace it with a restricted per-command grant for one specific binary the account legitimately needs

3. **Password aging policy:** Use `chage -l username` on each interactive user account to identify accounts with no password maximum age configured (the Maximum field shows "never" for at least two accounts in the simulator); apply the CIS Benchmark Level 1 password policy to all interactive accounts: `sudo chage -M 90 -m 1 -W 14 username` (90-day maximum lifetime, 1-day minimum to prevent immediate re-use cycling, 14-day advance warning); verify the policy applied correctly with `chage -l username` and document the before and after state for each account in a structured table showing username, previous maximum, and new maximum

4. **Package security audit:** Identify unauthorised penetration testing tools installed on the production server by running `dpkg -l | awk '$1=="ii" {print $2}' | grep -E "^(netcat|ncat|nmap|masscan|john|hydra|aircrack-ng|sqlmap)"` — the simulator has two tools from this list installed; remove both with `apt purge` and verify removal with `dpkg -l | grep packagename`; run `apt list --upgradable 2>/dev/null` to identify available updates; cross-reference the pending upgrade list against the CVE reference sheet provided in the lab (which lists three packages with active CVEs at the current version) and apply all security updates with `apt upgrade -y`; run `dpkg --verify` after the upgrade and document any modified package files — each line of output is a finding that requires investigation

5. **Cron audit:** Perform a complete system-wide cron audit by examining every cron location: `sudo cat /etc/crontab`, `sudo cat /etc/cron.d/*`, `sudo for u in $(ls /var/spool/cron/crontabs/); do echo "=== $u ==="; sudo cat "/var/spool/cron/crontabs/$u"; done`, and `ls -la /etc/cron.daily/ /etc/cron.weekly/ /etc/cron.monthly/`; the simulator contains two malicious cron entries — one that uses curl to download from an external URL every 5 minutes (an active dropper re-installing a payload), and one that executes a script from /tmp (a world-writable directory, meaning any user could replace the script with arbitrary code); identify both entries, document the exact crontab file and line, explain the attack vector each represents, remove them by editing the relevant crontab or deleting the /etc/cron.d/ file, and verify removal with another full audit

6. **Hardening verification script:** Write `/opt/scripts/hardening-verify.sh` that automates all five checks above for future compliance reviews: open with `#!/usr/bin/env bash` and `set -euo pipefail`; declare a `FAILURES=0` counter; define five functions — `check_shadow_permissions` (verifies /etc/shadow is 640), `check_uid_zero_accounts` (verifies only root has UID 0), `check_suid_binaries` (compares current SUID binary list against a baseline file at /opt/scripts/suid-baseline.txt), `check_sudoers_nopasswd` (greps for ALL=(ALL) NOPASSWD: ALL in sudoers), and `check_cron_downloads` (greps all cron locations for curl or wget) — each function prints `[PASS] check-name` on success or `[FAIL] check-name: reason` on failure and increments FAILURES; after all five functions run, log the result with `logger -t hardening-verify "Audit complete: $FAILURES check(s) failed"` and exit with `exit $FAILURES` (0 = all pass, non-zero = remediation required) — make the script executable with `chmod 750 /opt/scripts/hardening-verify.sh`, run it as root, verify the syslog entry with `grep hardening-verify /var/log/syslog`, and confirm the exit code reflects the actual finding count

**Assessment Criteria:** Permissions audit accuracy and remediation correctness including SUID baseline comparison (20%), user and group audit completeness including UID-0 and sudoers remediation (25%), package audit identification, removal of unauthorized tools, and CVE update application (15%), cron audit completeness and malicious entry identification with correct remediation (20%), hardening script correctness, set -euo pipefail usage, function structure, syslog logging, and exit code semantics (20%)
**KG Validation:** OS-L02 (permissions, SUID/sticky bit), OS-L03 (users, /etc/shadow, sudo/sudoers), OS-L04 (package management, dpkg --verify, apt purge/upgrade), OS-L06 (SUID bits and privilege escalation risk), OS-L07 (Bash scripting, cron automation and audit) — all exercised and integrated across a realistic compliance workflow
**Mastery Gate:** ≥80% to unlock Course A3.C3
