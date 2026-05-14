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
                className="cursor-pointer text-[#2D3142] opacity-80 transition-all hover:font-medium hover:opacity-100 dark:text-white"
                href={item.href || ""}
              >
                {item.icon ? (
                  <p className="rounded-full bg-[#F5F5F5] p-1.5 dark:bg-black">
                    {item.icon}
                  </p>
                ) : (
                  <>{item.name}</>
                )}
                {mainMenu ? (
                  <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-full"></span>
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
                  <p className="rounded-full bg-[#F5F5F5] p-1.5 dark:bg-black">
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
