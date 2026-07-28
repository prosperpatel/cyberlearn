import { Terminal, Play, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const LABS = [
  { id: '1', title: 'Linux Sandbox',        desc: 'Full Ubuntu terminal in your browser',    icon: '🐧', free: true,  status: 'ready'   },
  { id: '2', title: 'Web Exploit Lab',       desc: 'Vulnerable web app — find the flags',    icon: '🌐', free: true,  status: 'ready'   },
  { id: '3', title: 'Network Analysis Lab',  desc: 'Wireshark + live packet capture',         icon: '🔌', free: false, status: 'soon'    },
  { id: '4', title: 'Password Cracker Lab',  desc: 'Hashcat + John the Ripper',               icon: '🔑', free: false, status: 'soon'    },
]

export function Labs() {
  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-cyber-green/15 border border-cyber-green/25">
          <Terminal className="size-5 text-cyber-green" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Labs</h1>
          <p className="text-sm text-muted-foreground">Hands-on environments — no setup required</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {LABS.map((lab) => (
          <Card key={lab.id} variant="interactive">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="text-3xl">{lab.icon}</div>
              <div className="flex-1 min-w-0 space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{lab.title}</h3>
                    {!lab.free && <Badge variant="pro">PRO</Badge>}
                    {lab.status === 'soon' && <Badge variant="default">Soon</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{lab.desc}</p>
                </div>
                <Button
                  variant={lab.free && lab.status === 'ready' ? 'success' : 'outline'}
                  size="sm"
                  disabled={lab.status !== 'ready'}
                  className="gap-1.5"
                >
                  {lab.free ? <Play className="size-3.5" /> : <Lock className="size-3.5" />}
                  {lab.free && lab.status === 'ready' ? 'Launch Lab' : lab.free ? 'Coming Soon' : 'Unlock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
