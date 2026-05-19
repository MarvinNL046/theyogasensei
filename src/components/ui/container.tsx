import type { ElementType, ReactNode } from 'react'
import { cn } from '#/lib/utils'

type ContainerSize = 'narrow' | 'default' | 'wide'

const SIZE: Record<ContainerSize, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}

export interface ContainerProps {
  as?: ElementType
  size?: ContainerSize
  className?: string
  children: ReactNode
}

export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-6 md:px-8', SIZE[size], className)}>
      {children}
    </Tag>
  )
}
