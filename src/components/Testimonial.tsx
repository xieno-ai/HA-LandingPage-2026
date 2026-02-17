import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { Testimonial } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { useSectionView } from "@/utils/tracking";

const testimonials: Testimonial[] = [
  {
    text: "Amazing service in explaining the product, great sales offers, and easy setup. The staff reached out to us for the setup and test run. You have provided us with such peace of mind.",
    name: "Angela Robinson",
    location: "Ontario",
  },
  {
    text: "The unit arrived within 3 days. Instructions were very clear and easy to follow. A timely phone call came within several hours and clarified any issues or concerns I had. More than satisfied with my new protection.",
    name: "Bob Morris",
    location: "Alberta",
  },
  {
    text: "Purchased the Holo Alert system for my mother who is prone to falling. The device has worked as expected and the support we received throughout the purchase and use has been very helpful. Highly recommend.",
    name: "Peter B.",
    location: "British Columbia",
  },
  {
    text: "The fall notification has gone off twice: once when I slipped and sat heavily on a hard chair, another when I put it on too quickly. Guess I know it'll work when I need it!",
    name: "Sandra Wadden",
    location: "Nova Scotia",
  },
  {
    text: "It's a great investment. It's my life and I need to feel safe. My girls are glad you could help me.",
    name: "Carin Nielsen",
    location: "Manitoba",
  },
  {
    text: "Start to finish, easy as anything. Small company. Attention to details. Setup was a breeze. Haven't had to use it yet but loving it so far.",
    name: "Anne-Louise McLaughlin",
    location: "Ontario",
  },
  {
    text: "The setup was quick and easy. It gives me such peace of mind to know there will be someone there, with the push of a button, if I need them.",
    name: "Norma Graham",
    location: "Saskatchewan",
  },
  {
    text: "I am extremely happy for having my monitor. I feel safe. If I am in need of help, I know that someone will be available to help me.",
    name: "Gail Frampton",
    location: "New Brunswick",
  },
  {
    text: "I saw Holo Alert on Facebook and noted it was a Canadian company located in Edmonton, Alberta. Yes, I liked that part. I received an almost instant response. Liked that as well.",
    name: "Donna Brown",
    location: "Alberta",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  const sectionRef = useSectionView('testimonials')

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="testimonials__badge">
            Testimonials
          </div>

          <h2 className="testimonials__title">
            What families are saying
          </h2>
          <p className="testimonials__subtitle">
            Real stories from families across Canada.
          </p>
        </motion.div>

        <div
          className="flex justify-center overflow-hidden"
          style={{
            gap: 24,
            maxHeight: 740,
            maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
        >
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={15}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
