"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const featured = testimonials.filter((t) => t.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prev = () => {
    setDirection("left");
    setCurrentIndex((i) => (i - 1 + featured.length) % featured.length);
  };

  const next = () => {
    setDirection("right");
    setCurrentIndex((i) => (i + 1) % featured.length);
  };

  const current = featured[currentIndex];

  return (
    <section className="py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
            What clients say.
          </h2>
        </AnimateIn>

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="relative bg-white rounded-3xl p-10 md:p-14 shadow-apple-sm border border-[#E8E8ED] overflow-hidden min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (dir) => ({ opacity: 0, x: dir === "right" ? 40 : -40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir) => ({ opacity: 0, x: dir === "right" ? -40 : 40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#1D1D1F] text-[#1D1D1F]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl text-[#1D1D1F] font-medium leading-relaxed mb-8">
                  &ldquo;{current.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1D1D1F] flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {current.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F]">{current.name}</p>
                    <p className="text-xs text-[#86868B]">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-[#D2D2D7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#1D1D1F] transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? "right" : "left");
                    setCurrentIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === currentIndex ? "bg-[#1D1D1F] w-4" : "bg-[#D2D2D7]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border border-[#D2D2D7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#1D1D1F] transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
