'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

interface Props {
  children: React.ReactNode
}

export function SmoothScroll({ children }: Props) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
