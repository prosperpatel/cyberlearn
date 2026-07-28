import { Trophy, Zap, Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const BOARD = [
  { rank: 1,  name: 'n0xious',    xp: 48200, streak: 30, country: '🇺🇸' },
  { rank: 2,  name: 'hex_witch',  xp: 41700, streak: 22, country: '🇩🇪' },
  { rank: 3,  name: 'r00tsec',    xp: 38900, streak: 15, country: '🇮🇳' },
  { rank: 4,  name: 'bytebandit', xp: 33100, streak: 9,  country: '🇬🇧' },
  { rank: 5,  name: 'shellsurge', xp: 29400, streak: 7,  country: '🇯🇵' },
  { rank: 6,  name: 'cryptkid',   xp: 25800, streak: 5,  country: '🇧🇷' },
  { rank: 142,name: 'You',        xp: 3240,  streak: 7,  country: '🏠', isMe: true },
]

const RANK_STYLES: Record<number, string> = {
  1: 'text-yellow-400',
  2: 'text-slate-300',
  3: 'text-amber-600',
}

export function Leaderboard() {
  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyber-orange/15 border border-cyber-orange/25">
          <Trophy className="size-5 text-cyber-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">Top hackers this month</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">GLOBAL RANKING</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {BOARD.map((entry, i) => (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center gap-4 px-5 py-3.5',
                'border-b border-border last:border-0',
                'transition-colors',
                (entry as { isMe?: boolean }).isMe
                  ? 'bg-primary/5 border-l-2 border-l-primary'
                  : 'hover:bg-base-800',
                i > 0 && i < BOARD.length - 2 && 'border-border',
              )}
            >
              {/* Rank number */}
              <span
                className={cn(
                  'w-8 text-sm font-black text-center shrink-0',
                  RANK_STYLES[entry.rank] ?? 'text-muted-foreground',
                )}
              >
                {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : `#${entry.rank}`}
              </span>

              {/* Avatar */}
              <Avatar fallback={entry.name} size="sm" ring={entry.rank === 1 ? 'success' : 'none'} />

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold font-mono">{entry.name}</span>
                  <span className="text-sm">{entry.country}</span>
                  {(entry as { isMe?: boolean }).isMe && <Badge variant="primary" className="text-[10px]">YOU</Badge>}
                </div>
              </div>

              {/* Streak */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-cyber-orange">
                <Flame className="size-3" />
                <span className="font-mono font-bold">{entry.streak}</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1 text-xs font-bold text-primary font-mono">
                <Zap className="size-3" />
                {entry.xp.toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
