import { motion } from 'framer-motion'
import { TriangleAlert, BedDouble, Activity } from 'lucide-react'
import { useSectionView } from '@/utils/tracking'

const stats = [
  {
    icon: <TriangleAlert size={22} />,
    text: '1 in 4 Canadians over 65 experience a fall each year.',
  },
  {
    icon: <BedDouble size={22} />,
    text: 'Falls lead to an average of 10 extra days in hospital.',
  },
  {
    icon: <Activity size={22} />,
    text: '85% of senior injury hospitalizations are fall-related.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function FallRisk() {
  const sectionRef = useSectionView('fall_risk')

  return (
    <section className="fall-risk section" ref={sectionRef}>
      <div className="fall-risk__inner container">
        <motion.div
          className="fall-risk__card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="fall-risk__image-col">
            <div className="fall-risk__image-wrapper">
              <img
                src="/lifestyle/SeniorFun.avif"
                alt="Active senior staying safe with Holo Alert"
                className="fall-risk__image"
                width={380}
                height={507}
                loading="lazy"
                decoding="async"
              />
              <div className="fall-risk__image-badge">
                <span className="fall-risk__badge-name">Pearl</span>
                <span className="fall-risk__badge-age">77 years young</span>
              </div>
            </div>
          </div>

          <div className="fall-risk__content">
            <motion.h2
              className="fall-risk__title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Falls are a reality. Being unprepared doesn't have to be.
            </motion.h2>

            <motion.p
              className="fall-risk__desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              For Canadians over 65, falls are the leading cause of injury. The difference between a close call and a crisis is how fast help arrives. Holo Alert connects you to 24/7 professional monitoring, so no one has to face a fall alone.
            </motion.p>

            <div className="fall-risk__stats">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="fall-risk__stat"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                >
                  <div className="fall-risk__stat-icon">{stat.icon}</div>
                  <p className="fall-risk__stat-text">{stat.text}</p>
                </motion.div>
              ))}
            </div>

            <p className="fall-risk__source">Source: Public Health Agency of Canada</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
