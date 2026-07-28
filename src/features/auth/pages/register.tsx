import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/constants'

export function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-foreground">Start your mission</h2>
        <p className="text-sm text-muted-foreground">Create your account — it's free</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="HackerAlias"
            autoComplete="name"
            required
            startIcon={<User />}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            startIcon={<Mail />}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
            startIcon={<Lock />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            }
          />
        </div>

        <Button type="submit" variant="cyber" size="lg" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to={ROUTES.AUTH.LOGIN} className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
