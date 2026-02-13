import { motion } from 'framer-motion'

export default function PhoneCarousel() {
  return (
    <section className="phone-section section" id="devices">
      <div className="phone-section__inner container">
        <div className="phone-section__card">
          <div className="phone-section__phone">
            <div className="phone-section__phone-frame">
              <div className="phone-section__phone-notch" />
              <div className="phone-section__phone-screen">
                <div className="phone-section__screen-top">
                  <span className="phone-section__screen-time">Holo Alert</span>
                </div>
                <div className="phone-section__screen-content">
                  <p className="phone-section__screen-question" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                    Mom — All Clear
                  </p>
                  <div className="phone-section__screen-answer">
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Recent Activity</p>
                    <p>Movement detected at home — 3 min ago</p>
                    <p>Daily check-in completed — 9:15 AM</p>
                    <p>Medication reminder sent — 8:00 AM</p>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: 8, marginBottom: 4 }}>Device & Location</p>
                    <p>Holo Pro — Battery 92% — Home</p>
                    <p>Monitoring: Connected — Signal Strong</p>
                  </div>
                </div>
                <div className="phone-section__screen-bottom">
                  <div className="phone-section__screen-input" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Send Check-In</span>
                    <span style={{ color: 'var(--blue)' }}>View History</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="phone-section__text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="phone-section__title">
              Your family's safety hub, right in your pocket.
            </h2>
            <p className="phone-section__desc">
              The Holo Alert caregiver app keeps your whole care circle connected. Track your loved one's real-time location, receive instant notifications if help is requested, view activity history, and message other caregivers — all from your phone. You can even use it for non-emergency check-ins when you just want to know they're okay.
            </p>
            <div className="phone-section__actions">
              <a href="#how-it-works" className="phone-section__video-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="var(--blue)" strokeWidth="1.5"/>
                  <path d="M8.5 7l4.5 3-4.5 3V7z" fill="var(--blue)"/>
                </svg>
                See how it works
              </a>
              <div className="phone-section__arrows">
                <button className="phone-section__arrow" aria-label="Previous">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="phone-section__arrow" aria-label="Next">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
