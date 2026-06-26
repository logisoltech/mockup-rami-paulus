"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const WORD = "Northline";

function finishLoading(setDone, overlayRef) {
  document.documentElement.classList.add("loader-complete");
  document.body.style.overflow = "";
  if (overlayRef.current) {
    gsap.set(overlayRef.current, { display: "none" });
  }
  window.dispatchEvent(new Event("loader-complete"));
  setDone(true);
}

export default function SiteLoader({ children }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const content = contentRef.current;
      const overlay = overlayRef.current;
      if (!content || !overlay) return;

      const navItems = content.querySelectorAll(".reveal-nav");
      const heroItems = content.querySelectorAll(".reveal-hero");

      document.body.style.overflow = "hidden";

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        document.documentElement.classList.add("loader-complete");
        gsap.set([content, navItems, heroItems], {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        finishLoading(setDone, overlayRef);
        return;
      }

      const counter = { val: 0 };

      gsap.set(".loader-letter span", { yPercent: 110 });
      gsap.set(".loader-line", { scaleX: 0 });
      gsap.set(".loader-sub", { opacity: 0, y: 8 });
      gsap.set(".loader-counter", { opacity: 0 });
      gsap.set(navItems, { opacity: 0, y: 20 });
      gsap.set(heroItems, { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        onComplete: () => finishLoading(setDone, overlayRef),
      });

      tl.to(".loader-counter", { opacity: 1, duration: 0.4, ease: "power2.out" });

      tl.to(
        counter,
        {
          val: 100,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(counter.val),
              ).padStart(3, "0");
            }
          },
        },
        0,
      );

      tl.to(
        ".loader-letter span",
        {
          yPercent: 0,
          duration: 0.75,
          stagger: 0.055,
          ease: "power3.out",
        },
        0.15,
      );

      tl.to(
        ".loader-line",
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.55,
      );

      tl.to(
        ".loader-sub",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        1.1,
      );

      tl.to({}, { duration: 0.35 });

      tl.to(
        ".loader-inner",
        {
          opacity: 0,
          y: -16,
          duration: 0.45,
          ease: "power2.in",
        },
        "+=0",
      );

      tl.add(() => {
        document.documentElement.classList.add("loader-complete");
        gsap.set(content, { opacity: 1 });
      }, "reveal");

      tl.to(
        overlay,
        {
          yPercent: -100,
          duration: 1.05,
          ease: "power4.inOut",
        },
        "reveal",
      );

      tl.to(
        navItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
        "reveal+=0.55",
      );

      tl.to(
        heroItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
        },
        "reveal+=0.7",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {!done && (
        <div ref={overlayRef} className="site-loader" aria-hidden="true">
          <div className="loader-counter">
            <span ref={counterRef}>000</span>
          </div>

          <div className="loader-inner">
            <div className="loader-word" aria-label={WORD}>
              {WORD.split("").map((char, i) => (
                <span className="loader-letter" key={`${char}-${i}`}>
                  <span>{char}</span>
                </span>
              ))}
            </div>

            <div className="loader-line" />

            <p className="loader-sub">Advisory</p>
          </div>
        </div>
      )}

      <div ref={contentRef} className="site-content">
        {children}
      </div>
    </div>
  );
}
