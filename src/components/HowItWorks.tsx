import { motion } from 'framer-motion'
import { Watch, PackageCheck, HeartPulse } from 'lucide-react'

const steps = [
  {
    icon: <Watch size={24} />,
    title: 'Find the right fit for your lifestyle.',
    description:
      'Pendant, wristband, or smartwatch. Pick what\'s comfortable and what you\'ll want to wear. Every device ships free and comes with professional monitoring included.',
    benefits: [
      'GPS location, fall detection & two-way voice',
      'Water-resistant with multi-day battery life',
      'Free shipping anywhere in Canada',
    ],
  },
  {
    icon: <PackageCheck size={24} />,
    title: 'Ready to go the moment it arrives.',
    description:
      'We set everything up before your device ships, so when it arrives, just take it out of the box. Our care team calls within 24 hours to do a quick test together, make sure everything\'s working, and answer any questions.',
    benefits: [
      'Arrives ready to go: no setup required',
      'Care team calls to walk you through a quick test',
      'Ask questions and get comfortable before you start',
    ],
  },
  {
    icon: <HeartPulse size={24} />,
    title: 'Help responds, even if you can\'t press the button.',
    description:
      'Press the SOS button and a trained operator responds with your medical profile on hand. And if you fall and can\'t reach the button, automatic fall detection connects you to help on its own. It works anywhere in Canada with cellular coverage.',
    benefits: [
      '24/7 professional monitoring, coast to coast',
      'Falls detected automatically. No button press, no delay',
      'Your care circle is notified',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
}

export default function HowItWorks() {
  return (
    <section className="how section" id="how-it-works">
      <div className="how__inner container">
        <motion.div
          className="how__header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="how__title">Getting started is the easy part.</h2>
          <p className="how__subtitle">
            No installs. No base station. No confusing tech. Pick a device, and 24/7 professional help is one button away from the moment it arrives.
          </p>
        </motion.div>

        {/* Step indicators with connecting line */}
        <motion.div
          className="how__indicators"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="how__indicators-line" aria-hidden="true" />
          <div className="how__indicators-row">
            {steps.map((_, i) => (
              <div key={i} className="how__indicator">
                {i + 1}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step cards */}
        <div className="how__grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="how__card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="how__card-icon">
                {step.icon}
              </div>
              <h3 className="how__card-title">{step.title}</h3>
              <p className="how__card-desc">{step.description}</p>
              <ul className="how__card-benefits">
                {step.benefits.map((benefit, j) => (
                  <li key={j} className="how__card-benefit">
                    <span className="how__card-dot-ring">
                      <span className="how__card-dot" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
