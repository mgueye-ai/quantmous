interface IconProps {
  size?: number
  className?: string
}

/** Icons are decorative: the surrounding link or button carries the label. */
function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    className: ['icon', className].filter(Boolean).join(' '),
  } as const
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function LinkedInIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function StravaIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor">
      <path d="M15.39 17.94 13.3 13.83h-3.07L15.39 24l5.15-10.17h-3.07M8.38 8.23l2.84 5.6h4.17L10.46 0 3.46 13.83h4.17" />
    </svg>
  )
}

export function GitHubIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" {...stroke} />
      <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" {...stroke} />
    </svg>
  )
}

export function ArrowUpRightIcon({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 17 17 7M8.5 7H17v8.5" {...stroke} />
    </svg>
  )
}

export function ArrowDownIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" {...stroke} />
    </svg>
  )
}

export function PlayIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M10.2 8.9 15.3 12l-5.1 3.1V8.9Z" {...stroke} fill="currentColor" />
    </svg>
  )
}

export function MenuIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.5 8h17M3.5 16h17" {...stroke} />
    </svg>
  )
}

export function CloseIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6 6l12 12M18 6 6 18" {...stroke} />
    </svg>
  )
}

export function PlusIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 5v14M5 12h14" {...stroke} />
    </svg>
  )
}

export function FileTextIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 3.5h7.2L18.5 8v12.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" {...stroke} />
      <path d="M14 3.5V8h4.5" {...stroke} />
      <path d="M8.5 12.5h7M8.5 16h5.5" {...stroke} />
    </svg>
  )
}

export function ImageIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" {...stroke} />
      <circle cx="8.6" cy="9.8" r="1.6" {...stroke} />
      <path d="m3.6 17 4.6-4.3a2 2 0 0 1 2.7 0l3 2.8m0 0 1.8-1.6a2 2 0 0 1 2.7 0l2 1.8" {...stroke} />
    </svg>
  )
}

export function SwimIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="16.4" cy="6.6" r="1.9" {...stroke} />
      <path d="m5.4 12.9 4.2-3.4 3.6 2.6-2.3 1.9" {...stroke} />
      <path d="m13.2 12.1 2.4-2.1" {...stroke} />
      <path d="M2.5 18.2c1.6 0 1.6 1.4 3.2 1.4s1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4" {...stroke} />
    </svg>
  )
}

export function BikeIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="5.4" cy="16.6" r="3.6" {...stroke} />
      <circle cx="18.6" cy="16.6" r="3.6" {...stroke} />
      <path d="m5.4 16.6 4.2-6.1h5.1l4 6.1" {...stroke} />
      <path d="M9.6 10.5 8.3 7.6h-1.9" {...stroke} />
      <path d="M12.3 16.6 14.7 7.6" {...stroke} />
      <path d="M13.3 7.6h3.1" {...stroke} />
    </svg>
  )
}

export function RunIcon({ size = 26, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="15.4" cy="4.9" r="1.9" {...stroke} />
      <path d="m8.2 20.6 2.6-4.4-2.4-2.6a2.4 2.4 0 0 1-.1-3l2.4-2.8 3.1-.6 3 2.5 2.8.7" {...stroke} />
      <path d="m13.8 12.9 2.2 2.8.7 4.9" {...stroke} />
      <path d="M8.1 10.9 4.4 11.8" {...stroke} />
    </svg>
  )
}
