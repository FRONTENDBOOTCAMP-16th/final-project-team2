'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ProductTodaySaleCardProps {
  children: ReactNode
  title: string
  subTitle?: string
  fullImage?: boolean
}

export default function ProductTodaySaleCard({
  children,
  title,
  subTitle,
  fullImage = false,
}: ProductTodaySaleCardProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <>
      <div ref={ref} className="m-auto max-w-7xl px-4 py-22.5">
        <div className="text-center relative">
          {/* 장식 요소 */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full" />
          
          <h2 
            className={`text-4xl md:text-5xl font-bold gradient-text transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {title}
          </h2>
          <p 
            className={`mbs-5 mb-12.5 text-muted-foreground text-lg transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {subTitle}
          </p>
        </div>
        {fullImage ? (
          <div 
            className={`[&_a>div]:w-full! [&_li>button]:right-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {children}
          </div>
        ) : (
          <div 
            className={`flex flex-1 flex-col gap-6 lg:flex-row transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {children}
          </div>
        )}
      </div>
    </>
  )
}
