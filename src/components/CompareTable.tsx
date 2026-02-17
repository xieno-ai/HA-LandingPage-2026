import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { trackCtaClick, useSectionView } from '@/utils/tracking'

type Row = {
  feature: string
  holo: boolean
  others: boolean
}

const rows: Row[] = [
  { feature: 'Canadian-owned medical alert provider', holo: true, others: false },
  { feature: 'Longest battery life: up to 7 days without charging', holo: true, others: false },
  { feature: 'Caregiver app: see your loved one\u2019s location anytime', holo: true, others: false },
  { feature: 'Clear pricing: no hidden fees or surprise costs', holo: true, others: false },
  { feature: 'Free shipping across Canada', holo: true, others: false },
  { feature: '30-day satisfaction guarantee', holo: true, others: false },
  { feature: 'Automatic fall detection', holo: true, others: true },
  { feature: 'Canada-wide location tracking', holo: true, others: true },
  { feature: 'Water-resistant protection', holo: true, others: true },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
}

const Check = ({ delay }: { delay: number }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    variants={checkVariants}
    transition={{ delay, duration: 0.35, type: 'spring', stiffness: 400, damping: 15 }}
  >
    <circle cx="12" cy="12" r="12" fill="var(--blue)" />
    <path d="M7.5 12l3 3L16.5 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

const CheckMuted = ({ delay }: { delay: number }) => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    variants={checkVariants}
    transition={{ delay, duration: 0.35, type: 'spring', stiffness: 400, damping: 15 }}
  >
    <circle cx="10" cy="10" r="10" fill="var(--text-tertiary)" opacity="0.2" />
    <path d="M6 10l2.5 2.5L14 7.5" stroke="var(--text-tertiary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

const Dash = () => (
  <span className="compare__dash">&mdash;</span>
)

export default function CompareTable() {
  const sectionRef = useSectionView('compare')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(wrapperRef, { once: true, margin: '-80px' })

  return (
    <section className="compare section" ref={sectionRef}>
      <div className="compare__inner container">
        <motion.div
          ref={wrapperRef}
          className="compare__wrapper"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          {/* Column headers with title in the spacer slot */}
          <div className="compare__col-headers">
            <h2 className="compare__title">
              See how Holo Alert stacks up.
            </h2>
            <motion.div
              className="compare__header-col compare__header-col--holo"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="compare__device-hero">
                <img src="/devices/holo-pro-clear.avif" alt="Holo Pro" width={72} height={88} loading="lazy" />
              </div>
              <span className="compare__col-label">Holo Alert</span>
            </motion.div>

            <div className="compare__header-col compare__header-col--others">
              <span className="compare__col-label">Others</span>
            </div>
          </div>

          {/* Rows */}
          <div className="compare__body">
            {rows.map((row, i) => (
              <motion.div
                key={i}
                className="compare__row"
                variants={rowVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <span className="compare__feature">{row.feature}</span>
                <span className="compare__cell compare__cell--holo">
                  {row.holo ? <Check delay={0.4 + 0.06 * i} /> : <Dash />}
                </span>
                <span className="compare__cell compare__cell--others">
                  {row.others ? <CheckMuted delay={0.5 + 0.06 * i} /> : <Dash />}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA below table */}
          <div className="compare__cta">
            <a href="#pricing" className="btn btn--primary" onClick={() => trackCtaClick('Find the Right Device', 'compare_table')}>
              Find the Right Device
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
