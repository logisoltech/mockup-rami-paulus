"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BrandRevealSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const strokeMask = section.querySelector(".brand-word-mask");
      const strokeGroup = section.querySelector(".brand-stroke-group");
      const fillGroup = section.querySelector(".brand-fill-group");
      const guides = section.querySelectorAll(".brand-guide");

      if (reducedMotion) {
        gsap.set(fillGroup, { opacity: 1 });
        gsap.set([strokeGroup, strokeMask], {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.set(stage, { scale: 1 });
        return;
      }

      gsap.set(strokeMask, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(strokeGroup, { opacity: 1 });
      gsap.set(fillGroup, { opacity: 0 });
      gsap.set(guides, { opacity: 0 });
      gsap.set(stage, { scale: 1, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=175%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(guides, { opacity: 1, duration: 0.2, ease: "none" }, 0.05);

      tl.to(
        strokeMask,
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "none" },
        0.05,
      );

      tl.to(
        stage,
        { scale: 1.34, duration: 1, ease: "power1.inOut" },
        0.05,
      );

      tl.to(
        stage,
        { scale: 1, duration: 0.75, ease: "power2.inOut" },
        1.05,
      );

      tl.to(
        fillGroup,
        { opacity: 1, duration: 0.55, ease: "power1.in" },
        1.05,
      );

      tl.to(strokeGroup, { opacity: 0, duration: 0.45, ease: "none" }, 1.1);

      tl.to(guides, { opacity: 0.2, duration: 0.3, ease: "none" }, 1.2);
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="brand-reveal" aria-label="Brand reveal">
      <div ref={stageRef} className="brand-reveal-stage">
        <div className="brand-reveal-frame">
          <span className="brand-guide brand-guide-top" aria-hidden="true" />
          <span className="brand-guide brand-guide-mid" aria-hidden="true" />
          <span className="brand-guide brand-guide-bottom" aria-hidden="true" />

          <div className="brand-copy">
            <div className="brand-word-mask">
              <svg
                className="brand-reveal-svg"
                viewBox="0 0 900 180"
                aria-hidden="true"
              >
                <g className="brand-stroke-group">
                  <text className="brand-svg-stroke brand-svg-primary" x="450" y="72">
                    Northline
                  </text>
                  <text className="brand-svg-stroke brand-svg-secondary" x="450" y="138">
                    Advisory
                  </text>
                </g>
              </svg>
            </div>

            <svg
              className="brand-reveal-svg brand-reveal-svg-fill"
              viewBox="0 0 900 180"
              aria-label="Northline Advisory"
            >
              <g className="brand-fill-group">
                <text className="brand-svg-fill brand-svg-primary" x="450" y="72">
                  Northline
                </text>
                <text className="brand-svg-fill brand-svg-secondary" x="450" y="138">
                  Advisory
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
