import { z } from 'zod'
import { DAILY_GOALS, EXPERIENCE_LEVELS, INTERESTS, LEARNING_GOALS } from '../types/profile'

export const profileSchema = z.object({
  displayName: z.string().trim().min(2, 'Use at least 2 characters.').max(50, 'Use 50 characters or fewer.'),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9_]{3,24}$/, 'Use 3–24 lowercase letters, numbers, or underscores.'),
  country:  z.string().regex(/^[A-Z]{2}$/, 'Please select a country.'),
  experience: z.enum(EXPERIENCE_LEVELS),
  goal:       z.enum(LEARNING_GOALS),
  interests:  z.array(z.enum(INTERESTS)).min(1, 'Choose at least one area.'),
  dailyGoal:  z.union(
    DAILY_GOALS.map(g => z.literal(g)) as [
      z.ZodLiteral<15>,
      z.ZodLiteral<30>,
      z.ZodLiteral<45>,
      z.ZodLiteral<60>,
      z.ZodLiteral<90>,
    ],
  ),
})
