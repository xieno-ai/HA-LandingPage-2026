import { useState } from 'react'
import { motion } from 'framer-motion'
import { trackFaqOpen, trackPhoneClick, useSectionView } from '@/utils/tracking'

const faqs = [
  {
    question: 'Do I need a landline or internet connection?',
    answer: 'No. All Holo Alert devices work on cellular networks. No landline, no Wi-Fi, and no base station required. Just wear the device and you\'re connected.',
  },
  {
    question: 'What happens when I press the button?',
    answer: 'You\'re connected directly to a trained operator at our 24/7 monitoring centre. They\'ll already have your medical profile on screen and can send the right help to your location. If you can\'t speak, they\'ll dispatch emergency services automatically.',
  },
  {
    question: 'Does it work outside my home?',
    answer: 'Yes. Every Holo Alert device works anywhere in Canada with cellular coverage. At home, in the garden, at the grocery store, or on a walk. You\'re not limited to a certain range from a base station.',
  },
  {
    question: 'What if I fall and can\'t press the button?',
    answer: 'All Holo Alert devices include automatic fall detection. If a fall is detected and you don\'t cancel the alert within a few seconds, the device connects you to our monitoring centre automatically. No button press needed.',
  },
  {
    question: 'Is there a contract or cancellation fee?',
    answer: 'We offer month-to-month options for full flexibility. No long-term commitment required. We also offer a 30-day satisfaction guarantee, so you can try it risk-free.',
  },
  {
    question: 'How do I set it up?',
    answer: 'You don\'t. We configure everything before your device ships. When it arrives, just take it out of the box. Our care team will call you to do a quick test together and answer any questions, so you\'re confident before you start.',
  },
  {
    question: 'Can I wear it in the shower?',
    answer: 'Yes. All Holo Alert devices are water-resistant (IP67) and safe for showering. They\'re not designed for swimming or full submersion.',
  },
  {
    question: 'How do I know which device is right for me?',
    answer: 'It comes down to how you want to wear it. The Holo Pro is a compact pendant, the Holo Mini is a lightweight wristband, and the Holo Active is a full smartwatch. All three include 24/7 monitoring, GPS location, and fall detection. Our team can help you choose. Just call or chat with us.',
  },
  {
    question: 'What if my parent refuses to wear it?',
    answer: 'This is common, and it\'s exactly why we offer three different styles. Many people who resist a pendant are comfortable with a wristband or smartwatch that doesn\'t look medical. We\'re happy to talk through what might be the best fit. No pressure.',
  },
  {
    question: 'Is Holo Alert a Canadian company?',
    answer: 'Yes. Holo Alert is Canadian owned and operated, serving Canadians across the country. Our support team is based in Canada and our devices ship free from coast to coast.',
  },
]

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqs[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
      <button className="faq__question" onClick={onClick}>
        <span>{faq.question}</span>
        <svg
          className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="faq__answer-wrapper">
        <div>
          <p className="faq__answer">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useSectionView('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="faq section" id="faq" ref={sectionRef}>
      <div className="faq__inner container">
        <motion.div
          className="faq__sidebar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="faq__title">FAQs</h2>
          <p className="faq__subtitle">Your questions answered</p>
          <p className="faq__contact">
            Can't find what you're looking for? Call our{' '}
            <a href="tel:18884114656" className="faq__contact-link" onClick={() => trackPhoneClick('faq')}>care team</a>
          </p>
        </motion.div>

        <motion.div
          className="faq__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => {
                const opening = openIndex !== i
                setOpenIndex(openIndex === i ? null : i)
                if (opening) trackFaqOpen(faq.question)
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
