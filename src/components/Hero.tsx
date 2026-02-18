import { ShieldCheck, Clock, Star } from 'lucide-react'
import { trackCtaClick, useSectionView } from '@/utils/tracking'

export default function Hero() {
  const sectionRef = useSectionView('hero')

  return (
    <section ref={sectionRef} className="hero-split hero-split--animate">
      {/* Left Side: Content */}
      <div className="hero-split__content">
        <div>
          <div className="hero-split__stagger">
            <h1 className="hero-split__title hero-split__anim-item" style={{ animationDelay: '0.2s' }}>
              Independence isn't something you give up.<br />
              <span className="hero-split__title-accent">It's something you protect.</span>
            </h1>
            <div className="hero-split__divider hero-split__anim-item" style={{ animationDelay: '0.35s' }} />
            <p className="hero-split__subtitle hero-split__anim-item" style={{ animationDelay: '0.5s' }}>
              Whether you're looking out for a loved one or for yourself, Holo Alert keeps you connected to help, 24/7. Automatic fall detection, GPS location, and two-way voice built into a device light enough to forget you're wearing.
            </p>
            <div className="hero-split__actions hero-split__anim-item" style={{ animationDelay: '0.65s' }}>
              <a href="#pricing" className="btn btn--dark" onClick={() => trackCtaClick('Explore Our Devices', 'hero')}>Explore Our Devices</a>
            </div>

            <div className="hero-split__footer hero-split__anim-item" style={{ animationDelay: '0.8s' }}>
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
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Image with Clip Path */}
      <div className="hero-split__image hero-split__image--clip">
        <img
          src="/lifestyle/HeroSenior.avif"
          alt="Senior woman smiling with confidence wearing Holo Alert"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={960}
          height={640}
          className="hero-split__img"
        />
      </div>
    </section>
  )
}
