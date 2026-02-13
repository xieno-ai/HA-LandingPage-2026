import React from "react";

export type Testimonial = {
  text: string;
  name: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const duration = props.duration || 10;

  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          paddingBottom: 24,
          animation: `testimonial-scroll ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[0, 1].map((index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name }, i) => (
              <div
                className="testimonial-card rounded-3xl border border-border/60 shadow-sm w-full"
                key={i}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                      <path d="M8 1.3l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.5l4-.6L8 1.3z"/>
                    </svg>
                  ))}
                </div>
                <div style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--text-primary)" }}>
                  {text}
                </div>
                <div style={{ marginTop: "1.25rem", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                  {name}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
