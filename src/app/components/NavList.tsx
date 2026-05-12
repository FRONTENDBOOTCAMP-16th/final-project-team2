'use client'

import Link from 'next/link'

interface NaviProps {
  name: string
  href?: string
  icon?: string
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
          <li key={index} className="group relative">
            {item.href ? (
              <Link
                className="cursor-pointer text-[#2D3142] opacity-80 transition-all hover:font-medium hover:text-[#FF6B6B] hover:opacity-100"
                href={item.href}
              >
                {item.icon ? (
                  <div className="rounded-full bg-[#F5F5F5] p-1.5">
                    {item.icon}
                  </div>
                ) : (
                  <>{item.name}</>
                )}
                {mainMenu ? (
                  <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full"></span>
                ) : (
                  <></>
                )}
              </Link>
            ) : (
              <button
                className="cursor-pointer"
                onClick={item.onClick}
                type="button"
              >
                {item.icon ? (
                  <div className="rounded-full bg-[#F5F5F5] p-1.5">
                    {item.icon}
                  </div>
                ) : (
                  <>{item.name}</>
                )}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
