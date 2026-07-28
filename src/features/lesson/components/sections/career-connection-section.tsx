import { motion } from 'framer-motion'
import { Briefcase, DollarSign, ChevronRight, Award, Building2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { CareerConnectionSection } from '@/types/lesson-engine'

interface Props { section: CareerConnectionSection }

export function CareerConnectionSectionRenderer({ section }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 text-primary">
          <Briefcase className="size-5" />
          <span className="text-xs font-bold uppercase tracking-widest font-mono text-muted-foreground">
            Career Connection
          </span>
        </div>
        <h2 className="text-xl font-bold text-foreground">Why this skill matters in the real world</h2>
        <p className="text-muted-foreground leading-relaxed">{section.realWorldUsage}</p>
      </motion.div>

      {/* Career path */}
      {section.careerPath && section.careerPath.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Career path
          </h3>
          <div className="relative pl-5 space-y-0">
            {section.careerPath.map((step, i) => {
              const isLast = i === section.careerPath!.length - 1
              return (
                <div key={i} className="relative flex gap-4">
                  {!isLast && (
                    <div className="absolute left-0 top-5 w-0.5 h-full bg-border" />
                  )}
                  <div className="absolute left-[-4px] top-2 size-2 rounded-full bg-primary border-2 border-background" />
                  <div className="pb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary font-bold">{i + 1}</span>
                      <p className="text-sm text-foreground font-medium">{step}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Roles */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Roles that use this skill
        </h3>
        <div className="space-y-2">
          {section.roles.map((role, i) => (
            <Card key={i} variant="flat" className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="font-semibold text-sm text-foreground">{role.title}</p>
                {role.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{role.description}</p>
                )}
              </div>
              {role.salaryRange && (
                <div className="flex items-center gap-1 text-xs font-bold text-cyber-green shrink-0">
                  <DollarSign className="size-3" />
                  {role.salaryRange}
                </div>
              )}
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Companies */}
      {section.companies && section.companies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Building2 className="size-4" />
            Companies hiring
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.companies.map((co) => (
              <span
                key={co}
                className="px-3 py-1.5 rounded-lg bg-base-800 border border-border text-sm text-foreground"
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
          className="space-y-3"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Award className="size-4" />
            Relevant certifications
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {section.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 rounded-lg border border-border bg-base-800 px-3 py-2"
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
