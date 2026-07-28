/**
 * Interactive Learning Library — TypeScript API
 *
 * Every interface is lesson-agnostic. Components receive structured data
 * via props and never reference specific lesson content.
 */

import type { ReactNode } from 'react'

// ============================================================
// INTERACTIVE DIAGRAM
// ============================================================

export type NodeType =
  | 'client' | 'server' | 'database' | 'attacker'
  | 'firewall' | 'switch' | 'router' | 'cloud' | 'phone' | 'default'

export type EdgeType = 'normal' | 'attack' | 'data' | 'blocked' | 'encrypted'

export interface DiagramNode {
  id:           string
  label:        string
  sublabel?:    string
  type?:        NodeType
  x:            number      // coordinate in SVG space (0–800)
  y:            number      // coordinate in SVG space (0–500)
  description?: string
  metadata?:    Record<string, string>
}

export interface DiagramEdge {
  id:            string
  from:          string     // node id
  to:            string     // node id
  label?:        string
  type?:         EdgeType
  animated?:     boolean
  bidirectional?: boolean
}

export interface InteractiveDiagramProps {
  nodes:              DiagramNode[]
  edges?:             DiagramEdge[]
  highlightedNodes?:  string[]
  highlightedEdges?:  string[]
  onNodeClick?:       (node: DiagramNode) => void
  onEdgeClick?:       (edge: DiagramEdge) => void
  showTooltips?:      boolean
  enableZoom?:        boolean
  enablePan?:         boolean
  initialZoom?:       number
  viewWidth?:         number   // SVG coordinate space width (default 800)
  viewHeight?:        number   // SVG coordinate space height (default 500)
  className?:         string
  animated?:          boolean
}

// ============================================================
// PACKET FLOW VISUALIZER
// ============================================================

export type NetworkNodeType =
  | 'computer' | 'switch' | 'router' | 'firewall' | 'server' | 'attacker' | 'cloud'

export interface NetworkNode {
  id:     string
  label:  string
  type:   NetworkNodeType
  detail?: string
}

export interface PacketMetadata {
  protocol:  string
  size:      string
  payload?:  string
  flags?:    string[]
  ttl?:      number
  src?:      string
  dst?:      string
  extra?:    Record<string, string>
}

export interface NetworkPacket {
  id:        string
  label?:    string
  color?:    string
  metadata?: PacketMetadata
  loop?:     boolean    // respawn after reaching the end
  delayMs?:  number     // start delay in ms
}

export interface PacketFlowVisualizerProps {
  nodes:          NetworkNode[]
  packets:        NetworkPacket[]
  onPacketClick?: (packet: NetworkPacket) => void
  autoPlay?:      boolean
  className?:     string
  direction?:     'vertical' | 'horizontal'
}

// ============================================================
// TERMINAL SIMULATOR
// ============================================================

export type TerminalLineType = 'output' | 'command' | 'error' | 'success' | 'system' | 'comment'
export type TerminalMode     = 'readonly' | 'guided' | 'practice'

export interface TerminalLine {
  text:      string
  type:      TerminalLineType
  animated?: boolean   // type character by character
  delay?:    number    // ms before this line appears
}

export interface TerminalStep {
  prompt?:         string
  description?:    string
  expectedCommand: string
  output:          TerminalLine[]
  hint?:           string
  successMessage?: string
}

export interface TerminalSimulatorProps {
  mode:        TerminalMode
  title?:      string
  prompt?:     string          // default '$'
  // readonly mode
  lines?:      TerminalLine[]
  // guided mode
  steps?:      TerminalStep[]
  // practice mode — map of command string → response lines
  commands?:   Record<string, TerminalLine[]>
  unknownResponse?: TerminalLine[]
  onComplete?: () => void
  onCommand?:  (command: string, correct?: boolean) => void
  className?:  string
}

// ============================================================
// CODE DIFF VIEWER
// ============================================================

export type DiffLineType = 'added' | 'removed' | 'unchanged'

export interface DiffLine {
  type:           DiffLineType
  content:        string
  oldLineNumber?: number
  newLineNumber?: number
  explanation?:   string
}

export interface CodeDiffViewerProps {
  original:         string
  modified:         string
  language?:        string
  originalLabel?:   string
  modifiedLabel?:   string
  /** Optional per-line explanations: key = new line content, value = explanation */
  explanations?:    Record<string, string>
  showLineNumbers?: boolean
  className?:       string
}

// ============================================================
// ATTACK TIMELINE
// ============================================================

export type AttackPhase =
  | 'discovery' | 'recon' | 'exploitation'
  | 'persistence' | 'impact' | 'recovery'

export type EventSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface TimelineEvent {
  id:          string
  title:       string
  description: string
  timestamp?:  string
  technique?:  string   // e.g. 'T1190 – Exploit Public-Facing Application'
  mitreId?:    string
  severity?:   EventSeverity
  artifacts?:  string[]
  ioc?:        string   // Indicator of Compromise
}

export interface AttackPhaseData {
  phase:  AttackPhase
  label:  string
  events: TimelineEvent[]
  icon?:  string
}

export interface AttackTimelineProps {
  phases:           AttackPhaseData[]
  onPhaseChange?:   (phase: AttackPhase, index: number) => void
  onEventClick?:    (event: TimelineEvent) => void
  className?:       string
  autoPlay?:        boolean
  autoPlayInterval?: number   // ms, default 4000
}

// ============================================================
// PROCESS FLOW
// ============================================================

export type FlowNodeShape = 'rectangle' | 'diamond' | 'oval' | 'parallelogram' | 'cylinder'

export interface FlowNode {
  id:          string
  label:       string
  shape:       FlowNodeShape
  description?: string
  x:           number
  y:           number
  variant?:    'default' | 'start' | 'end' | 'decision' | 'error'
}

export interface FlowEdge {
  id:     string
  from:   string
  to:     string
  label?: string
  type?:  'normal' | 'yes' | 'no' | 'error'
}

export interface ProcessFlowProps {
  nodes:         FlowNode[]
  edges:         FlowEdge[]
  activeNodeId?: string
  onNodeClick?:  (node: FlowNode) => void
  className?:    string
  animated?:     boolean
}

// ============================================================
// QUIZ WIDGETS
// ============================================================

// Drag & Drop
export interface DragItem {
  id:      string
  content: string
  icon?:   string
}

export interface DropZone {
  id:             string
  label:          string
  acceptedItemId: string   // correct answer item id
  hint?:          string
}

export interface DragDropProps {
  title?:      string
  items:       DragItem[]
  zones:       DropZone[]
  onComplete?: (correct: boolean, score: number, total: number) => void
  className?:  string
}

// Ordering
export interface OrderingItem {
  id:              string
  content:         string
  correctPosition: number   // 1-indexed
  hint?:           string
}

export interface OrderingProps {
  title?:      string
  items:       OrderingItem[]
  onComplete?: (correct: boolean) => void
  className?:  string
}

// Matching
export interface MatchingPair {
  id:    string
  left:  string
  right: string
}

export interface MatchingProps {
  title?:      string
  pairs:       MatchingPair[]
  onComplete?: (score: number, total: number) => void
  className?:  string
}

// Hotspot
export interface HotspotRegion {
  id:           string
  x:            number   // % 0–100 of image width
  y:            number   // % 0–100 of image height
  width:        number   // % 0–100
  height:       number   // % 0–100
  label:        string
  isCorrect:    boolean
  explanation?: string
}

export interface HotspotProps {
  question:    string
  context?:    string
  imageUrl?:   string   // optional; uses a placeholder if omitted
  imageAlt:    string
  regions:     HotspotRegion[]
  onAnswer?:   (regionId: string, correct: boolean) => void
  className?:  string
}

// Scenario Card
export interface ScenarioChoice {
  id:          string
  text:        string
  isCorrect:   boolean
  consequence: string
}

export interface ScenarioCardProps {
  scenario:    string
  context?:    string
  roleContext?: string   // e.g. 'You are a security analyst at...'
  choices:     ScenarioChoice[]
  onChoice?:   (choice: ScenarioChoice) => void
  className?:  string
}

// ============================================================
// REFLECTION CARD
// ============================================================

export interface ReflectionPrompt {
  id:           string
  text:         string
  placeholder?: string
}

export interface ReflectionCardProps {
  title?:      string
  prompts:     ReflectionPrompt[]
  storageKey?: string   // localStorage key for auto-save
  minWords?:   number
  onSave?:     (notes: Record<string, string>) => void
  className?:  string
}

// ============================================================
// CALLOUT
// ============================================================

export type CalloutVariant =
  | 'danger' | 'warning' | 'tip' | 'best-practice' | 'remember' | 'info'

export interface CalloutProps {
  variant:      CalloutVariant
  title?:       string
  children:     ReactNode
  className?:   string
  collapsible?: boolean
}

// ============================================================
// EXPANDABLE DIAGRAM
// ============================================================

export interface ExpandableNode {
  id:          string
  label:       string
  sublabel?:   string
  type?:       NodeType
  x:           number
  y:           number
  summary:     string
  details:     string     // markdown content shown in expanded panel
  tags?:       string[]
}

export interface ExpandableDiagramProps {
  nodes:             ExpandableNode[]
  edges?:            DiagramEdge[]
  defaultExpandedId?: string
  className?:        string
}
