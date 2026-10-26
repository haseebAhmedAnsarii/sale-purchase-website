import type { ComponentPropsWithoutRef } from 'react'

// Shared page container: centered, max-w-[90rem], responsive gutters
export function Container({ className = '', children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-16 ${className}`} {...rest}>
      {children}
    </div>
  )
}
