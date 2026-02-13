import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { trackShopNow, trackGetQuote, trackSectionView, buildOutboundUrl } from '@/utils/tracking'

const devices = [
  {
    name: 'Holo Mini',
    category: 'Wristband',
    description:
      'Simple, lightweight, and built for all-day comfort. Wear it on your wrist, on a lanyard, or clipped to your belt — whatever feels right.',
    features: [
      'Lightweight wristband design (1.2 oz)',
      'Automatic fall detection',
      'Up to 7-day battery life',
      'Water-resistant — safe for showering',
    ],
    dailyPrice: '1.83',
    monthlyPrice: '54.95',
    image: '/devices/holo-mini.avif',
    imageScale: 1.25,
    featured: false,
    url: 'https://www.holoalert.ca/products/the-holo-mini',
  },
  {
    name: 'Holo Pro',
    category: 'Pendant | Most Popular',
    description:
      'Our most popular device. Compact enough to wear around your neck and forget about — until you need it.',
    features: [
      'Compact pendant design (1.3 oz)',
      'Automatic fall detection — always on',
      'Up to 3-day battery life',
      'Optional caregiver app with real-time location',
    ],
    dailyPrice: '1.67',
    monthlyPrice: '49.95',
    image: '/devices/holo-pro.avif',
    featured: true,
    url: 'https://www.holoalert.ca/products/holo-pro',
  },
  {
    name: 'Holo Active',
    category: 'Smartwatch',
    description:
      'A full smartwatch with medical alert built in. For people who want health tracking, a colour display, and safety that doesn\'t look medical.',
    features: [
      'AMOLED colour touchscreen',
      'Heart rate & step tracking',
      'Automatic fall detection',
      'Daily charging required',
    ],
    dailyPrice: '2.17',
    monthlyPrice: '64.95',
    image: '/devices/holo-active.avif',
    featured: false,
    url: 'https://www.holoalert.ca/products/holo-pro',
  },
]

const benefits = [
  { label: 'Free Shipping', detail: 'Across Canada' },
  { label: 'Total Flexibility', detail: 'Month-to-month freedom' },
  { label: '30-Day Guarantee', detail: 'Full money back' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

function useCountUp(target: number, duration: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) { setValue(0); return }
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration, decimals])

  return value
}

function AnimatedPrice({ value, prefix = '$', suffix = '', decimals = 0, active }: {
  value: number; prefix?: string; suffix?: string; decimals?: number; active: boolean
}) {
  const count = useCountUp(value, 1400, active, decimals)
  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : count.toLocaleString('en-CA')
  return <>{prefix}{formatted}{suffix}</>
}

function ComparisonBars() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="pricing__savings"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      <h3 className="pricing__savings-title">
        The safety they need, at a fraction of the cost.
      </h3>

      <div className="pricing__comparison-bars">
        <div className="pricing__bar-row">
          <span className="pricing__bar-label">Assisted Living</span>
          <div className="pricing__bar pricing__bar--expensive">
            <motion.div
              className="pricing__bar-fill"
              style={{ transformOrigin: 'left center' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="pricing__bar-value"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <AnimatedPrice value={4000} active={isInView} /> – <AnimatedPrice value={8000} active={isInView} />/mo
            </motion.span>
          </div>
        </div>
        <div className="pricing__bar-row">
          <span className="pricing__bar-label">Holo Alert</span>
          <div className="pricing__bar pricing__bar--holo">
            <motion.div
              className="pricing__bar-fill"
              style={{ transformOrigin: 'left center' }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            />
            <motion.span
              className="pricing__bar-value"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Starting at <AnimatedPrice value={49.95} decimals={2} active={isInView} />/mo
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function useSectionView(sectionName: string) {
  const ref = useRef<HTMLElement>(null)
  const hasFired = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true
          trackSectionView(sectionName)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])
  return ref
}

export default function Pricing() {
  const sectionRef = useSectionView('pricing')
  return (
    <section className="pricing section" id="pricing" ref={sectionRef}>
      <div className="pricing__inner container">
        <motion.div
          className="pricing__header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="pricing__title">
            Pick the device that fits your life.
          </h2>
          <p className="pricing__subtitle">
            Every Holo Alert device includes 24/7 professional monitoring, two-way voice, GPS location, and free shipping across Canada. The difference is how you prefer to wear it.
          </p>
        </motion.div>

        <div className="pricing__grid">
          {devices.map((device, i) => (
            <motion.div
              key={i}
              className="pricing__card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <HoverBorderGradient
                as="div"
                duration={1.5}
                containerClassName="rounded-[24px] w-full h-full border-[var(--border)] bg-transparent hover:bg-transparent gap-0 p-px cursor-default"
                className="pricing__card-inner w-full bg-[var(--bg-white)] rounded-[inherit] p-0 text-[var(--text-primary)] overflow-hidden"
              >
                <div className={`pricing__card-banner ${device.featured ? 'pricing__card-banner--featured' : ''}`}>
                  {device.category}
                </div>

                <div className="pricing__card-image">
                  <img
                    src={device.image}
                    alt={device.name}
                    width={200}
                    height={200}
                    loading="lazy"
                    style={device.imageScale ? { transform: `scale(${device.imageScale})` } : undefined}
                  />
                </div>

                <div className="pricing__card-body">
                  <h3 className="pricing__plan-name">{device.name}</h3>

                  <p className="pricing__description">{device.description}</p>

                  <ul className="pricing__features">
                    {device.features.map((feature, j) => (
                      <li key={j} className="pricing__feature">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pricing__feature-check">
                          <path d="M3.5 8.5l3 3 6-6.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pricing__price-block">
                    <div className="pricing__price">
                      <span className="pricing__currency">$</span>
                      <span className="pricing__amount">{device.monthlyPrice}</span>
                      <span className="pricing__period">/month</span>
                    </div>
                    <p className="pricing__daily">
                      That's just <strong>${device.dailyPrice}/day</strong>
                    </p>
                  </div>

                  <a href={buildOutboundUrl(device.url)} target="_blank" rel="noopener noreferrer" className={`pricing__cta btn ${device.featured ? 'btn--primary' : 'btn--dark'}`} onClick={() => trackShopNow(device.name, device.monthlyPrice)}>
                    Shop Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  <a href="#" className="pricing__secondary-link" onClick={() => trackGetQuote(device.name)}>
                    Or Get FREE Quote
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </HoverBorderGradient>
            </motion.div>
          ))}
        </div>

        {/* Zone A: Risk Reversal — Benefits Grid */}
        <motion.div
          className="pricing__benefits"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <p className="pricing__benefits-label">Every plan includes</p>
          <div className="pricing__benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="pricing__benefit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="pricing__benefit-check">
                  <circle cx="10" cy="10" r="10" fill="var(--green)" />
                  <path d="M6 10l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <span className="pricing__benefit-label">{b.label}</span>
                  <span className="pricing__benefit-detail">{b.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Zone B: Cost Comparison — Animated Visual Bar */}
        <ComparisonBars />
      </div>
    </section>
  )
}
