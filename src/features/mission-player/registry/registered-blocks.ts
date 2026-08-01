/**
 * Registered Blocks — the plugin manifest for all built-in block types.
 *
 * This is the ONLY file you edit when adding a new block type (step 2 of 2).
 * See HOW_TO_ADD_BLOCK.md for the complete guide.
 *
 * Upgrade path: when a production renderer is ready for a block type,
 * replace `PlaceholderBlock` with the real component import below.
 *
 * Example upgrade:
 *   Before: registerBlock('story', PlaceholderBlock)
 *   After:  import { StoryBlock } from '../components/blocks/story-block'
 *           registerBlock('story', StoryBlock)
 */

import { registerBlock } from './block-registry'
import { PlaceholderBlock } from '../components/placeholder-block'

// ── Built-in block type registrations ────────────────────────────────────────
// Each line maps a block type string → the React component that renders it.
// The registry accepts any string type — custom block types from plugins or
// future academies can be registered here too.

registerBlock('mission-brief',      PlaceholderBlock)
registerBlock('story',              PlaceholderBlock)
registerBlock('theory',             PlaceholderBlock)
registerBlock('case-study',         PlaceholderBlock)
registerBlock('memory-anchor',      PlaceholderBlock)
registerBlock('funny-illustration', PlaceholderBlock)
registerBlock('analogy',            PlaceholderBlock)
registerBlock('diagram',            PlaceholderBlock)
registerBlock('micro-practical',    PlaceholderBlock)
registerBlock('interactive',        PlaceholderBlock)
registerBlock('discussion',         PlaceholderBlock)
registerBlock('student-questions',  PlaceholderBlock)
registerBlock('common-mistakes',    PlaceholderBlock)
registerBlock('glossary',           PlaceholderBlock)
registerBlock('cheat-sheet',        PlaceholderBlock)
registerBlock('quiz',               PlaceholderBlock)
registerBlock('flashcards',         PlaceholderBlock)
registerBlock('assignment',         PlaceholderBlock)
registerBlock('lab',                PlaceholderBlock)
registerBlock('summary',            PlaceholderBlock)
registerBlock('mission-complete',   PlaceholderBlock)
registerBlock('ai-tutor',           PlaceholderBlock)

// ── Future / custom block types ───────────────────────────────────────────────
// As new academies and block types are added, register them here:
//
// import { VideoBlock }    from '../components/blocks/video-block'
// import { TimelineBlock } from '../components/blocks/timeline-block'
// registerBlock('video',    VideoBlock)
// registerBlock('timeline', TimelineBlock)
