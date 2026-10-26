interface Props {
  className?: string
  aspectRatio?: 'portrait' | 'square' | 'landscape'
  label?: string
  dimensions?: string
  size?: 'sm' | 'md' | 'lg'
}

export function PlaceholderImage({
  className = '',
  aspectRatio = 'portrait',
  label = 'Placeholder Image',
  dimensions = '600 × 800',
  size = 'md',
}: Props) {
  const aspectClass = {
    portrait: 'aspect-3/4',
    square: 'aspect-square',
    landscape: 'aspect-4/3',
  }[aspectRatio]

  const iconSizes = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20',
  }[size]

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-100/90 border border-gray-200/80 p-6 select-none transition-colors hover:bg-gray-100 ${aspectClass} ${className}`}
      role="img"
      aria-label={label}
    >
      {/* Background subtle diagonal hatch */}
      <svg
        className="absolute inset-0 h-full w-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diag-hatch" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="20" y2="0" stroke="#000" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-hatch)" />
      </svg>

      {/* Center Image Placeholder Graphic */}
      <div className="relative flex flex-col items-center justify-center text-center">
        <svg
          className={`${iconSizes} text-gray-400 mb-3`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-tight">
          {label}
        </span>
        {dimensions && (
          <span className="mt-1 text-[0.6875rem] text-gray-400 font-mono">
            {dimensions}
          </span>
        )}
      </div>
    </div>
  )
}
