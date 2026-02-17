import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackNavClick, trackPhoneClick } from '@/utils/tracking'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Devices', 'How It Works', 'Pricing', 'FAQ']

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <a href="#" className="header__logo">
          <img src="/logo/holo_shield.png" alt="Holo Alert" className="header__logo-icon" width={26} height={26} />
          <span className="header__logo-text">HOLO ALERT</span>
        </a>

        <nav className="header__nav">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="header__link" onClick={() => trackNavClick(item, 'desktop')}>
              {item}
            </a>
          ))}
        </nav>

        <button
          className="header__burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="header__mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="header__mobile-link"
                onClick={() => { trackNavClick(item, 'mobile'); setMobileOpen(false) }}
              >
                {item}
              </a>
            ))}
            <a href="tel:18884114656" className="header__mobile-cta" onClick={() => { trackPhoneClick('header_mobile'); setMobileOpen(false) }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M16.5 12.69v2.5a1.67 1.67 0 01-1.82 1.67A16.5 16.5 0 011.14 3.32 1.67 1.67 0 012.8 1.5h2.5a1.67 1.67 0 011.67 1.43 10.7 10.7 0 00.58 2.35 1.67 1.67 0 01-.37 1.76l-1.06 1.06a13.33 13.33 0 005.78 5.78l1.06-1.06a1.67 1.67 0 011.76-.37 10.7 10.7 0 002.35.58 1.67 1.67 0 011.43 1.7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Call 1-888-411-4656
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
