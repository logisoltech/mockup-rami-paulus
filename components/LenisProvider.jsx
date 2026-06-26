"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      wheelMultiplier: 1.35,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const startLenis = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };

    const stopLenis = () => {
      lenis.stop();
    };

    if (document.documentElement.classList.contains("loader-complete")) {
      startLenis();
    } else {
      stopLenis();
      window.addEventListener("loader-complete", startLenis, { once: true });
    }

    return () => {
      window.removeEventListener("loader-complete", startLenis);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return children;
}
