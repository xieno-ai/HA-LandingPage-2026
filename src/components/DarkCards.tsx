import { motion } from 'framer-motion'
import { CanadaMap } from './ui/map'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}


export default function DarkCards() {
  return (
    <section className="dark-cards section">
      <div className="dark-cards__inner container">
        <div className="dark-cards__grid">
          {/* Canada Coverage Card */}
          <motion.div
            className="dark-card dark-card--map"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            {/* Map fills entire card background */}
            <div className="dark-card__map-bg">
              <CanadaMap />
            </div>

            {/* Gradient fade so header text is readable */}
            <div className="dark-card__map-fade" />

            {/* Text content overlaid on top */}
            <div className="dark-card__content dark-card__content--over">
              <p className="dark-card__label">Coast to coast coverage.</p>
              <h3 className="dark-card__title">
                Protection that works<br />across all of Canada.
              </h3>
            </div>
          </motion.div>

          {/* Why Families Choose Card */}
          <motion.div
            className="dark-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <div className="dark-card__content">
              <p className="dark-card__label">Why families choose Holo Alert.</p>
              <h3 className="dark-card__title">
                Canadian-owned. Human-supported.<br />Always on.
              </h3>
            </div>
            <div className="dark-card__features">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1L12.5 7.5L19 8.5L14.5 13L15.8 19.5L10 16.5L4.2 19.5L5.5 13L1 8.5L7.5 7.5L10 1Z" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                    </svg>
                  ),
                  text: 'Canadian owned and operated — serving Canadians only',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="6" r="3.5" stroke="var(--blue)" strokeWidth="1.5"/>
                      <path d="M3 17.5c0-3.5 3-6 7-6s7 2.5 7 6" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  text: 'Real people at our monitoring centre, 24/7',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="5" y="1.5" width="10" height="17" rx="2" stroke="var(--blue)" strokeWidth="1.5"/>
                      <line x1="8" y1="15.5" x2="12" y2="15.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  text: 'No landline needed — works on cellular anywhere in Canada',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1.5L3 5.5V9.5C3 14 6 17.5 10 18.5C14 17.5 17 14 17 9.5V5.5L10 1.5Z" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M7 10L9 12L13 8" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  text: 'Automatic fall detection on every device',
                },
              ].map((item, i) => (
                <div key={i} className="dark-card__feature">
                  <span className="dark-card__feature-icon">{item.icon}</span>
                  <span className="dark-card__feature-text">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
