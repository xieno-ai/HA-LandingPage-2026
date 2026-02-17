import { motion } from 'framer-motion'

const cards = [
  {
    image: '/lifestyle/independent.avif',
    title: 'Independence at home.',
    subtitle: 'Stay in your home, keep your routines, and know that help is always one button away.',
  },
  {
    image: '/lifestyle/family.avif',
    title: 'Peace of mind for families.',
    subtitle: 'Fewer worried calls, fewer "what ifs." Know that 24/7 professional monitoring is in place.',
  },
  {
    image: '/lifestyle/confidence.avif',
    title: 'Confidence on the go.',
    subtitle: 'Fall detection and GPS location work wherever you are: at home, in the garden, or out in the neighbourhood.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function LifestyleCards() {
  return (
    <section className="lifestyle section">
      <div className="lifestyle__inner container">
        <motion.div
          className="lifestyle__header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="lifestyle__title">
            Safety that supports independence, not the other way around.
          </h2>
          <p className="lifestyle__desc">
            Staying safe shouldn't mean giving up the life you've built. Seniors keep their independence. Families stop worrying. And everyone sleeps a little better at night.
          </p>
        </motion.div>

        <div className="lifestyle__grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="lifestyle__card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="lifestyle__card-image">
                <img src={card.image} alt={card.title} loading="lazy" width={400} height={420} />
                <div className="lifestyle__card-overlay">
                  <h3 className="lifestyle__card-title">{card.title}</h3>
                  <p className="lifestyle__card-subtitle">{card.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
