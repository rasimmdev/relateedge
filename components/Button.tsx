import Link from 'next/link'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary'

type Base = {
  children: ReactNode
  variant?: Variant
  className?: string
  style?: CSSProperties
}

type Props =
  | (Base & { href: string; onClick?: undefined })
  | (Base & { onClick: MouseEventHandler<HTMLButtonElement>; href?: undefined })

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white',
  secondary: 'bg-white text-indigo-600 border border-indigo-100',
  tertiary: 'bg-transparent text-indigo-600',
}

const shell =
  'group cursor-pointer rounded-xl px-5 py-3 text-sm font-bold inline-block shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'

export default function ButtonLink(props: Props) {
  const { children, variant = 'primary', className = '', style = {} } = props
  const cls = `${shell} ${variants[variant]} ${className}`.trim()

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className="
                    absolute top-0 -left-[150%]
                    w-full h-full
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    skew-x-[-20deg]
                    group-hover:left-[150%]
                    transition-all duration-700
                    z-0
                "
      />
    </>
  )

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={cls} style={style}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={props.onClick} className={cls} style={style}>
      {inner}
    </button>
  )
}
