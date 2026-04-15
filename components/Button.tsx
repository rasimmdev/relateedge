import Link from "next/link"

type Props = {
    children: React.ReactNode
    href: string
    variant?: 'primary' | 'secondary' | 'tertiary'
    className?: string
    style?: React.CSSProperties
}

const variants = {
    primary: 'bg-indigo-600 text-white',
    secondary: 'bg-white text-indigo-600 border border-indigo-100',
    tertiary: 'bg-transparent text-indigo-600',
}

export default function ButtonLink({
    children,
    href,
    variant = 'primary',
    className = '',
    style = {},
}: Props) {
    return (
        <Link
            href={href}
            className={`
                group
                rounded-xl px-5 py-3 text-sm font-bold inline-block shadow-sm
                ${variants[variant]}
                relative overflow-hidden
                transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5
                ${className}
            `}
            style={style}
        >
            <span className="relative z-10">{children}</span>

            {/* Shine effect on hover */}
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
        </Link>
    )
}