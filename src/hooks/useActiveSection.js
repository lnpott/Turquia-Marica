import { useEffect, useState } from 'react'

const DEFAULT_SECTIONS = ['cardapio', 'sobre', 'localizacao', 'reviews']
const THRESHOLDS = Array.from({ length: 21 }, (_, index) => index / 20)

function visiblePixels(rect, viewportHeight) {
  return Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
}

export default function useActiveSection(sectionIds = DEFAULT_SECTIONS) {
  const [activeSection, setActiveSection] = useState('topo')
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const ids = sectionKey.split('|').filter(Boolean)
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const visibility = new Map()
    const selectActive = () => {
      const viewportHeight = window.innerHeight
      const candidates = sections.map((section) => {
        const entry = visibility.get(section.id)
        const pixels = entry?.isIntersecting ? visiblePixels(entry.boundingClientRect, viewportHeight) : 0
        return { id: section.id, pixels, ratio: entry?.intersectionRatio ?? 0 }
      }).filter(({ pixels }) => pixels > 0)

      if (!candidates.length) {
        if (window.scrollY < viewportHeight * 0.35) setActiveSection('topo')
        return
      }

      candidates.sort((a, b) => b.pixels - a.pixels || b.ratio - a.ratio || ids.indexOf(a.id) - ids.indexOf(b.id))
      setActiveSection(candidates[0].id)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibility.set(entry.target.id, entry))
      selectActive()
    }, {
      rootMargin: '-76px 0px -72px 0px',
      threshold: THRESHOLDS,
    })

    sections.forEach((section) => observer.observe(section))
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 0.2) setActiveSection('topo')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionKey])

  return activeSection
}
