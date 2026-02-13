import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { Testimonial } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
  {
    text: "Amazing service in explaining the product, great sales offers, and easy setup. The staff reached out to us for the setup and test run. You have provided us with such peace of mind.",
    name: "Angela Robinson",
  },
  {
    text: "The unit arrived within 3 days. Instructions were very clear and easy to follow. A timely phone call came within several hours and clarified any issues or concerns I had. More than satisfied with my new protection.",
    name: "Bob Morris",
  },
  {
    text: "Purchased the Holo Alert system for my mother who is prone to falling. The device has worked as expected and the support we received throughout the purchase and use has been very helpful. Highly recommend.",
    name: "Peter B",
  },
  {
    text: "The fall notification has gone off twice — once when I slipped and sat heavily on a hard chair, another when I put it on too quickly. Guess I know it'll work when I need it!",
    name: "Sandra Wadden",
  },
  {
    text: "It's a great investment — it's my life and I need to feel safe. My girls are glad you could help me.",
    name: "Carin Nielsen",
  },
  {
    text: "Start to finish, easy as anything. Small company. Attention to details. Setup was a breeze. Haven't had to use it yet but loving it so far.",
    name: "Anne-Louise McLaughlin",
  },
  {
    text: "The setup was quick and easy. It gives me such peace of mind to know there will be someone there, with the push of a button, if I need them.",
    name: "Norma Graham",
  },
  {
    text: "I am extremely happy for having my monitor. I feel safe — if I am in need of help, I know that someone will be available to help me.",
    name: "Gail Frampton",
  },
  {
    text: "I saw Holo Alert on Facebook and noted it was a Canadian company located in Edmonton, Alberta. Yes, I liked that part. I received an almost instant response — liked that as well.",
    name: "Donna Brown",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="testimonials">
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
            What our users say
          </h2>
          <p className="testimonials__subtitle">
            See what our customers have to say about us.
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
