"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "I stopped sending generic templates. Same week, three clients replied to proposals I rewrote with a hook first.",
    author: "Maya K.",
    role: "Full-stack freelancer",
  },
  {
    text: "The hardest part was not knowing what was wrong. When I lead with one specific line from the job post, replies picked up.",
    author: "Jordan L.",
    role: "UX designer, Upwork",
  },
  {
    text: "Short, specific, and one clear ask at the end — that alone beat every long essay I used to paste.",
    author: "Alex R.",
    role: "Developer",
  },
  {
    text: "Tracking sent vs. replied finally showed me which openings were worth the connect spend.",
    author: "Samira T.",
    role: "Copywriter",
  },
] as const;

const INTERVAL_MS = 7000;

export default function AuthQuoteSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <div className="relative min-h-44">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0"
          >
            <p className="text-lg leading-relaxed text-white/95 md:text-xl">
              <span className="text-white/50">&ldquo;</span>
              {quote.text}
              <span className="text-white/50">&rdquo;</span>
            </p>
            <div className="mt-6 border-t border-white/20 pt-5">
              <p className="font-medium text-white">{quote.author}</p>
              <p className="mt-0.5 text-sm text-white/65">{quote.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Quote slides">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show quote ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i === index ? "bg-white" : "bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
