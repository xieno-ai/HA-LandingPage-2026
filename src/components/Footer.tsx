import { trackPhoneClick } from '@/utils/tracking'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <svg width="120" height="28" viewBox="0 0 120 28" fill="none">
                <text x="0" y="22" fontFamily="var(--font-sans)" fontWeight="600" fontSize="20" fill="var(--text-primary)">
                  HOLO ALERT
                </text>
              </svg>
            </a>
            <p className="footer__tagline">
              Safety, independence & peace of mind for Canadian families.
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <a href="tel:18884114656" style={{ color: 'var(--text-primary)', fontWeight: 600 }} onClick={() => trackPhoneClick('footer')}>1-888-411-4656</a>
              <br />
              <span style={{ fontSize: '0.75rem' }}>Available 24/7 — call or press your button anytime</span>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Holo Alert Inc. All rights reserved. Canadian-owned & operated.
          </p>
          <div className="footer__badges">
            <span className="footer__badge">ULC Certified</span>
            <span className="footer__badge">CSAA Five Diamond</span>
            <span className="footer__badge">24/7 Monitored</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
