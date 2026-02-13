import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Star } from 'lucide-react'
import { trackCtaClick } from '@/utils/tracking'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
}

export default function Hero() {
  return (
    <motion.section
      className="hero-split"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Side: Content */}
      <div className="hero-split__content">
        <div>
          <motion.div variants={containerVariants}>
            <motion.h1 className="hero-split__title" variants={itemVariants}>
              Independence isn't something you give up.<br />
              <span className="hero-split__title-accent">It's something you protect.</span>
            </motion.h1>
            <motion.div className="hero-split__divider" variants={itemVariants} />
            <motion.p className="hero-split__subtitle" variants={itemVariants}>
              Whether you're looking out for a loved one or for yourself, Holo Alert is the simple, reliable way to stay connected to help — with 24/7 monitoring, automatic fall detection, and location tracking built into a device that's comfortable enough to wear every day.
            </motion.p>
            <motion.div className="hero-split__actions" variants={itemVariants}>
              <a href="#pricing" className="btn btn--dark" onClick={() => trackCtaClick('Explore Our Devices', 'hero')}>Explore Our Devices</a>
            </motion.div>

            <motion.div className="hero-split__footer" variants={itemVariants}>
              <div className="hero-split__trust-item">
                <ShieldCheck size={18} className="hero-split__trust-icon" />
                <span>Canadian-Owned & Operated</span>
              </div>
              <div className="hero-split__trust-item">
                <Clock size={18} className="hero-split__trust-icon" />
                <span>24/7 Professional Monitoring</span>
              </div>
              <div className="hero-split__trust-item">
                <Star size={18} className="hero-split__trust-icon" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Image with Clip Path */}
      <motion.div
        className="hero-split__image"
        style={{
          backgroundImage: 'url(/lifestyle/HeroSenior.avif)',
        }}
        initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
        animate={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        transition={{ duration: 1.2, ease: 'circOut' }}
      />
    </motion.section>
  )
}
