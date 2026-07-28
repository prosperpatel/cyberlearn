/**
 * SectionRenderer — pure dispatch component.
 *
 * Receives a LessonSection (discriminated union) and renders the appropriate
 * component. The `never` exhaustive check in the default branch ensures that
 * TypeScript errors at compile time if a new section type is added to the union
 * but has no renderer here.
 *
 * Adding a new section type:
 *   1. Add the type to `LessonSection` in types/lesson-engine.ts
 *   2. Add the component below
 *   3. TypeScript will error here until you handle it — zero silent omissions
 */

import type { LessonSection } from '@/types/lesson-engine'
import type { useLessonProgress } from '../hooks/use-lesson-progress'

import { HookSectionRenderer }           from './sections/hook-section'
import { StorySectionRenderer }           from './sections/story-section'
import { ObjectivesSectionRenderer }      from './sections/objectives-section'
import { ExplanationSectionRenderer }     from './sections/explanation-section'
import { DiagramSectionRenderer }         from './sections/diagram-section'
import { AnimationSectionRenderer }       from './sections/animation-section'
import { RealWorldSectionRenderer }       from './sections/real-world-section'
import { PracticalSectionRenderer }       from './sections/practical-section'
import { AIMentorSectionRenderer }        from './sections/ai-mentor-section'
import { ChallengeSectionRenderer }       from './sections/challenge-section'
import { CommonMistakesSectionRenderer }  from './sections/common-mistakes-section'
import { QuizSectionRenderer }            from './sections/quiz-section'
import { ReflectionSectionRenderer }      from './sections/reflection-section'
import { SummarySectionRenderer }         from './sections/summary-section'
import { CareerConnectionSectionRenderer }from './sections/career-connection-section'

type ProgressHook = ReturnType<typeof useLessonProgress>

interface SectionRendererProps {
  section:  LessonSection
  progress: ProgressHook
}

export function SectionRenderer({ section, progress }: SectionRendererProps) {
  switch (section.type) {
    case 'hook':
      return <HookSectionRenderer section={section} />

    case 'story':
      return <StorySectionRenderer section={section} />

    case 'objectives':
      return <ObjectivesSectionRenderer section={section} />

    case 'explanation':
      return <ExplanationSectionRenderer section={section} />

    case 'diagram':
      return <DiagramSectionRenderer section={section} />

    case 'animation':
      return <AnimationSectionRenderer section={section} />

    case 'real-world-example':
      return <RealWorldSectionRenderer section={section} />

    case 'practical':
      return (
        <PracticalSectionRenderer
          section={section}
          isComplete={progress.isPracticalComplete(section.id)}
          onComplete={() => {
            progress.markPracticalDone(section.id)
            progress.markCurrentComplete()
          }}
        />
      )

    case 'ai-mentor':
      return <AIMentorSectionRenderer section={section} />

    case 'challenge':
      return (
        <ChallengeSectionRenderer
          section={section}
          priorAttempt={progress.getChallengeState(section.id)}
          onComplete={() => progress.markCurrentComplete()}
          onChallenge={(answer, correct) =>
            progress.recordChallenge(section.id, answer, correct)
          }
        />
      )

    case 'common-mistakes':
      return <CommonMistakesSectionRenderer section={section} />

    case 'quiz':
      return (
        <QuizSectionRenderer
          section={section}
          priorAttempt={progress.getQuizAttempt(section.id)}
          onSubmit={(attempt) => {
            progress.submitQuiz(section.id, attempt)
            if (attempt.passed) progress.markCurrentComplete()
          }}
        />
      )

    case 'reflection':
      return (
        <ReflectionSectionRenderer
          section={section}
          savedNote={progress.getReflection(section.id)}
          onSave={(text) => progress.setReflection(section.id, text)}
        />
      )

    case 'summary':
      return <SummarySectionRenderer section={section} />

    case 'career-connection':
      return <CareerConnectionSectionRenderer section={section} />

    default: {
      // Exhaustive check — if TypeScript errors here, you forgot to add a renderer
      const _exhaustive: never = section
      console.warn('[SectionRenderer] Unknown section type:', (_exhaustive as LessonSection).type)
      return null
    }
  }
}
