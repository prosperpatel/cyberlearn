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
import { MissionBriefBlock }     from '../components/blocks/mission-brief-block'
import { DiscussionBlock }        from '../components/blocks/discussion-block'
import { StoryBlock }             from '../components/blocks/story-block'
import { CaseStudyBlock }         from '../components/blocks/case-study-block'
import { TheoryBlock }            from '../components/blocks/theory-block'
import { MemoryAnchorBlock }      from '../components/blocks/memory-anchor-block'
import { DiagramBlock }           from '../components/blocks/diagram-block'
import { StudentQuestionsBlock }  from '../components/blocks/student-questions-block'
import { CommonMistakesBlock }    from '../components/blocks/common-mistakes-block'
import { AnalogyBlock }           from '../components/blocks/analogy-block'
import { CheatSheetBlock }        from '../components/blocks/cheat-sheet-block'
import { QuizBlock }              from '../components/blocks/quiz-block'
import { FlashcardsBlock }        from '../components/blocks/flashcards-block'
import { MicroPracticalBlock }    from '../components/blocks/micro-practical-block'
import { MissionCompleteBlock }   from '../components/blocks/mission-complete-block'

// ── Built-in block type registrations ────────────────────────────────────────
// Each line maps a block type string → the React component that renders it.
// The registry accepts any string type — custom block types from plugins or
// future academies can be registered here too.

registerBlock('mission-brief',      MissionBriefBlock)
registerBlock('discussion',         DiscussionBlock)
registerBlock('story',              StoryBlock)
registerBlock('case-study',         CaseStudyBlock)
registerBlock('theory',             TheoryBlock)
registerBlock('memory-anchor',      MemoryAnchorBlock)
registerBlock('diagram',            DiagramBlock)
registerBlock('student-questions',  StudentQuestionsBlock)
registerBlock('common-mistakes',    CommonMistakesBlock)
registerBlock('analogy',            AnalogyBlock)
registerBlock('cheat-sheet',        CheatSheetBlock)
registerBlock('quiz',               QuizBlock)
registerBlock('flashcards',         FlashcardsBlock)
registerBlock('micro-practical',    MicroPracticalBlock)
registerBlock('mission-complete',   MissionCompleteBlock)

// Still using placeholder until production renderers are built:
registerBlock('funny-illustration', PlaceholderBlock)
registerBlock('interactive',        PlaceholderBlock)
registerBlock('glossary',           PlaceholderBlock)
registerBlock('assignment',         PlaceholderBlock)
registerBlock('lab',                PlaceholderBlock)
registerBlock('summary',            PlaceholderBlock)
registerBlock('ai-tutor',           PlaceholderBlock)

// ── Future / custom block types ───────────────────────────────────────────────
// As new academies and block types are added, register them here:
//
// import { VideoBlock }    from '../components/blocks/video-block'
// import { TimelineBlock } from '../components/blocks/timeline-block'
// registerBlock('video',    VideoBlock)
// registerBlock('timeline', TimelineBlock)
