'use client'

import Image from "next/image"
import Link from "next/link"

interface NaviProps {
  name: string
  href?: string
  icon?: string
  onClick?: () => void
}

interface NaviListProps {
  items: NaviProps[]
  label: string
}

export default function NavList({ items, label }: NaviListProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-3">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link
                href={item.href}
              >
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    priority
                  />
                ) : (
                  <>{item.name}</>
                )}
              </Link>
            ) : (
              <button 
                onClick={item.onClick} 
                type="button"
                >
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                  ): (
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