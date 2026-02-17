import { motion } from 'framer-motion'
import { trackPhoneClick } from '@/utils/tracking'

export default function Banner() {
  return (
    <motion.div
      className="banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="banner__inner container">
        <span className="banner__text">
          Canadian-owned & operated. 24/7 professional monitoring across Canada
        </span>
        <a href="tel:18884114656" className="banner__text" style={{ fontWeight: 600, marginLeft: 12, whiteSpace: 'nowrap' }} onClick={() => trackPhoneClick('banner')}>
          Call 1-888-411-4656
          <svg className="banner__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }}>
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  )
}
