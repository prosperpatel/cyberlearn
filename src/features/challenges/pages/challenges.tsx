import { Target, Zap, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { difficultyVariant } from '@/lib/utils'
import type { Difficulty } from '@/types'

const CHALLENGES = [
  { id: '1', title: 'Decode the Flag',   category: 'Cryptography',    difficulty: 'beginner'     as Difficulty, xp: 100, time: '15m', solved: 1240 },
  { id: '2', title: 'XSS Hunter',        category: 'Web Security',     difficulty: 'intermediate' as Difficulty, xp: 250, time: '30m', solved: 540  },
  { id: '3', title: 'Packet Storm',      category: 'Networking',       difficulty: 'advanced'     as Difficulty, xp: 500, time: '1h',  solved: 210  },
  { id: '4', title: 'Ransomware Triage', category: 'Malware Analysis', difficulty: 'expert'       as Difficulty, xp: 1000,time: '2h',  solved: 48   },
]

export function Challenges() {
  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyber-red/15 border border-cyber-red/25">
          <Target className="size-5 text-cyber-red" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Challenges</h1>
          <p className="text-sm text-muted-foreground">Solve. Don't memorize.</p>
        </div>
      </div>

      <div className="space-y-3">
        {CHALLENGES.map((ch) => (
          <Card key={ch.id} variant="interactive">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{ch.title}</h3>
                  <Badge variant={difficultyVariant(ch.difficulty)}>{ch.difficulty}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{ch.category}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" />{ch.time}</span>
                  <span>{ch.solved.toLocaleString()} solved</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-primary font-mono">
                  <Zap className="size-3" />+{ch.xp} XP
                </div>
                <Button variant="outline" size="sm">Attempt</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
