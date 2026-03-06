'use client'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { LenisContext } from './LenisContext'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      syncTouch: false,
    })

    setLenis(instance)

    // Scroll progress bar
    instance.on('scroll', ({ progress }: { progress: number }) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    })

    let rafId: number
    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {/* Scroll progress indicator */}
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #6052ff, #8577ff)',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      {children}
    </LenisContext.Provider>
  )
}
