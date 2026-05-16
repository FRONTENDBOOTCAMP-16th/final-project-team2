'use client'

import Link from 'next/link'

export interface NaviProps {
  name: string
  href?: string
  icon?: React.ReactNode
  text?: string
  onClick?: () => void
}

interface NaviListProps {
  items: NaviProps[]
  label: string
  className?: string
  mainMenu?: boolean
}

export default function NavList({
  items,
  label,
  className,
  mainMenu,
}: NaviListProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex gap-3">
        {items.map((item, index) => (
          <li key={index} className="group relative items-center flex">
            {item.href ? (
              <Link
                className="cursor-pointer text-foreground transition-all hover:font-medium hover:text-primary"
                href={item.href || ""}
              >
                {item.icon ? (
                  <p className="rounded-full bg-muted p-2 hover:bg-primary-light transition-colors">
                    {item.icon}
                  </p>
                ) : (
                  <>{item.name}</>
                )}
                {mainMenu ? (
                  <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                ) : (
                  <></>
                )}
              </Link>
            ) : (
              <button
                className="cursor-pointer text-foreground hover:text-primary transition-colors"
                onClick={item.onClick}
                type="button"
              >
                {item.icon ? (
                  <p className="rounded-full bg-muted p-2 hover:bg-primary-light transition-colors">
                    {item.icon}
                  </p>
                ) : (
                  <>{item.text}</>
                )}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
