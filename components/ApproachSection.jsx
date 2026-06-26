"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    bg: "#0f1c2e",
    number: "01",
    title: "Diagnose",
    text: "Understand the business, market, audience, and points of friction.",
  },
  {
    bg: "#0d2318",
    number: "02",
    title: "Clarify",
    text: "Translate complexity into a clear strategic direction and message.",
  },
  {
    bg: "#1a1528",
    number: "03",
    title: "Execute",
    text: "Turn decisions into practical systems, assets, and operating rhythm.",
  },
];

export default function ApproachSection() {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slides = slidesRef.current.filter(Boolean);
      if (!section || slides.length === 0) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(slides, { autoAlpha: 0, yPercent: 0 });
        gsap.set(slides[0], { autoAlpha: 1 });
        return;
      }

      gsap.set(slides, { autoAlpha: 0, yPercent: 8 });
      gsap.set(slides[0], { autoAlpha: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${SLIDES.length * 100}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        tl.to(
          slides[index - 1],
          {
            autoAlpha: 0,
            yPercent: -6,
            duration: 0.5,
            ease: "power2.inOut",
          },
          index,
        );

        tl.fromTo(
          slide,
          { autoAlpha: 0, yPercent: 8 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          index,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="approach-split" aria-label="Approach">
      <div className="approach-split-inner">
        <div className="approach-split-left">
          <p className="approach-brand">
            Northline
            <span>Approach</span>

          </p>
        </div>

        <div className="approach-split-right">
          {SLIDES.map((slide, index) => (
            <article
              key={slide.number}
              ref={(el) => {
                slidesRef.current[index] = el;
              }}
              className="approach-slide"
              style={{ backgroundColor: slide.bg }}
            >
              <span className="approach-slide-number">{slide.number}</span>
              <h3 className="approach-slide-title">{slide.title}</h3>
              <p className="approach-slide-text">{slide.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
