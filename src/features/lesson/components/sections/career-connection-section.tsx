import { motion } from 'framer-motion'
import { Briefcase, DollarSign, ChevronRight, Award, Building2, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { CareerConnectionSection } from '@/types/lesson-engine'

interface Props { section: CareerConnectionSection }

export function CareerConnectionSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-[820px] mx-auto px-6 sm:px-8 py-14 sm:py-20 space-y-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/12">
            <Briefcase className="size-4 text-primary" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground font-mono">
            Career Connection
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
          Why this skill matters in the real world
        </h2>
        <p className="text-[1.0625rem] text-foreground/80 leading-[1.85]">
          {section.realWorldUsage}
        </p>
      </motion.div>

      {/* Career path */}
      {section.careerPath && section.careerPath.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="size-3.5 text-muted-foreground" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Career path
            </h3>
          </div>

          <div className="relative pl-7">
            {/* Connecting line */}
            <div className="absolute left-[9px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {section.careerPath.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.07 }}
                className="relative flex gap-4 pb-5 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-[-18px] top-[5px] size-[10px] rounded-full bg-primary ring-2 ring-background" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-primary font-bold">Step {i + 1}</span>
                  </div>
                  <p className="text-[1.0625rem] text-foreground leading-[1.75] mt-0.5">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Roles */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Briefcase className="size-3.5 text-muted-foreground" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Roles that use this skill
          </h3>
        </div>
        <div className="space-y-2.5">
          {section.roles.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.06 }}
            >
              <Card variant="flat" className={cn(
                'flex items-center justify-between gap-4 p-4 sm:p-5',
                'hover:bg-base-700/60 transition-colors',
              )}>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-bold text-base text-foreground leading-snug">{role.title}</p>
                  {role.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>
                  )}
                </div>
                {role.salaryRange && (
                  <div className="flex items-center gap-1 text-sm font-bold text-cyber-green shrink-0 bg-cyber-green/10 border border-cyber-green/20 rounded-lg px-2.5 py-1">
                    <DollarSign className="size-3.5" />
                    {role.salaryRange}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Companies */}
      {section.companies && section.companies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Building2 className="size-3.5 text-muted-foreground" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Companies hiring
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {section.companies.map((co) => (
              <span
                key={co}
                className="px-3.5 py-1.5 rounded-lg bg-base-800 border border-border text-sm text-foreground hover:border-primary/30 hover:bg-base-700 transition-colors cursor-default"
              >
                {co}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications */}
      {section.certifications && section.certifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Award className="size-3.5 text-muted-foreground" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Relevant certifications
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {section.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 rounded-xl border border-border bg-base-800 px-4 py-3 hover:border-primary/30 transition-colors"
              >
                <ChevronRight className="size-3.5 text-primary shrink-0" />
                <span className="text-sm font-mono font-semibold text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
