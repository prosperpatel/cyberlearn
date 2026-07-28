import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, getInitials } from '@/lib/utils'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs:  'size-6  text-[10px]',
        sm:  'size-8  text-xs',
        md:  'size-10 text-sm',
        lg:  'size-12 text-base',
        xl:  'size-16 text-lg',
        '2xl': 'size-20 text-xl',
      },
      ring: {
        none:    '',
        default: 'ring-2 ring-border',
        primary: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        success: 'ring-2 ring-cyber-green ring-offset-2 ring-offset-background',
      },
    },
    defaultVariants: { size: 'md', ring: 'none' },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ring, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, ring, className }))}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt ?? fallback ?? 'Avatar'}
      className="aspect-square size-full object-cover"
    />
    <AvatarPrimitive.Fallback
      className="flex size-full items-center justify-center bg-base-700 text-muted-foreground font-medium"
    >
      {fallback ? getInitials(fallback) : '?'}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
))
Avatar.displayName = 'Avatar'

export { Avatar }
