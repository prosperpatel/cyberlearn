// ── Components ─────────────────────────────────────────────────────────────────

export { Callout }               from './components/callout/callout'
export { ReflectionCard }        from './components/reflection-card/reflection-card'
export { CodeDiffViewer }        from './components/code-diff/code-diff-viewer'
export { TerminalSimulator }     from './components/terminal/terminal-simulator'
export { AttackTimeline }        from './components/attack-timeline/attack-timeline'
export { ProcessFlow }           from './components/process-flow/process-flow'
export { InteractiveDiagram }    from './components/interactive-diagram/interactive-diagram'
export { ExpandableDiagram }     from './components/expandable-diagram/expandable-diagram'
export { PacketFlowVisualizer }  from './components/packet-flow/packet-flow-visualizer'

export {
  DragDrop,
  Ordering,
  Matching,
  Hotspot,
  ScenarioCard,
} from './components/quiz-widgets'

// ── Types ──────────────────────────────────────────────────────────────────────

export type {
  // Diagram
  NodeType, EdgeType, DiagramNode, DiagramEdge, InteractiveDiagramProps,
  // Expandable
  ExpandableNode, ExpandableDiagramProps,
  // Packet flow
  NetworkNodeType, NetworkNode, NetworkPacket, PacketMetadata, PacketFlowVisualizerProps,
  // Terminal
  TerminalLineType, TerminalMode, TerminalLine, TerminalStep, TerminalSimulatorProps,
  // Code diff
  DiffLineType, DiffLine, CodeDiffViewerProps,
  // Attack timeline
  AttackPhase, EventSeverity, TimelineEvent, AttackPhaseData, AttackTimelineProps,
  // Process flow
  FlowNodeShape, FlowNode, FlowEdge, ProcessFlowProps,
  // Quiz
  DragItem, DropZone, DragDropProps,
  OrderingItem, OrderingProps,
  MatchingPair, MatchingProps,
  HotspotRegion, HotspotProps,
  ScenarioChoice, ScenarioCardProps,
  // Reflection
  ReflectionPrompt, ReflectionCardProps,
  // Callout
  CalloutVariant, CalloutProps,
} from './types'
