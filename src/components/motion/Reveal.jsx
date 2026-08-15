import { useEffect, useRef, useState } from 'react'

function Reveal({ as = 'div', className = '', stagger = false, children, ...props }) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ))

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (revealed) return undefined

    if (!('IntersectionObserver' in window)) {
      const frame = window.requestAnimationFrame(() => setRevealed(true))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(true)
        observer.unobserve(entry.target)
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [revealed])

  const Component = as
  return (
    <Component
      {...props}
      ref={ref}
      className={`scroll-reveal duration-reveal ease-reveal ${stagger ? 'scroll-reveal-stagger [&_li]:duration-smooth [&_li]:ease-smooth' : ''} ${revealed ? 'is-revealed' : ''} ${className}`}
      data-revealed={revealed ? 'true' : 'false'}
    >
      {children}
    </Component>
  )
}

export default Reveal
