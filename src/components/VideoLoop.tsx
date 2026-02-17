import { motion } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useSectionView, trackVideoView } from '@/utils/tracking'

const VIMEO_URL = 'https://player.vimeo.com/video/1164848214'

export default function VideoLoop() {
  const [showIframe, setShowIframe] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const sectionViewRef = useSectionView('video')
  const videoFired = useRef(false)

  const mergedRef = useCallback((node: HTMLElement | null) => {
    (sentinelRef as React.MutableRefObject<HTMLElement | null>).current = node;
    (sectionViewRef as React.MutableRefObject<HTMLElement | null>).current = node
  }, [sectionViewRef])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowIframe(true)
          if (!videoFired.current) {
            videoFired.current = true
            trackVideoView()
          }
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="video-loop section" ref={mergedRef}>
      <div className="video-loop__inner container">
        <motion.div
          className="video-loop__frame"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {showIframe ? (
            <iframe
              src={`${VIMEO_URL}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
              className="video-loop__video"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Holo Alert lifestyle video"
            />
          ) : (
            <div className="video-loop__placeholder" />
          )}

          <div className="video-loop__overlay">
            <motion.h2
              className="video-loop__text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Keep living your life.<br />
              We're here when you need us.
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
