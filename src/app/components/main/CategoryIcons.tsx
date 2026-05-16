'use client'

import Link from 'next/link'
import { Pencil, BookOpen, Scissors, Palette, Sparkles, Star } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const categories = [
  { icon: Pencil, name: '필기구', href: '/products/pens', color: 'bg-primary/10 text-primary' },
  { icon: BookOpen, name: '노트/메모지', href: '/products/notes', color: 'bg-secondary/10 text-secondary-dark' },
  { icon: Scissors, name: '사무용품', href: '/products/office', color: 'bg-accent/10 text-accent-dark' },
  { icon: Palette, name: '미술용품', href: '/products/art', color: 'bg-warning/10 text-warning' },
  { icon: Sparkles, name: '데코스티커', href: '/products/stickers', color: 'bg-primary-light/20 text-primary-dark' },
  { icon: Star, name: '인기상품', href: '/products/pens?sort=popular', color: 'bg-destructive/10 text-destructive' },
]

export default function CategoryIcons() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className={`text-3xl font-bold text-foreground transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          카테고리
        </h2>
        <p className={`mt-2 text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          원하는 문구를 찾아보세요
        </p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className={`group flex flex-col items-center p-6 rounded-3xl bg-card border-2 border-border 
              transition-all duration-500 hover:border-primary hover:shadow-xl
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-4 
              transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <category.icon className="w-8 h-8" />
            </div>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
