"use client";

import { motion } from "framer-motion";

/** Word-by-word reveal for headings. Renders an accessible single string. */
export function SplitWords({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  /** lowercased words to render in the brand gradient */
  highlight?: string[];
}) {
  const words = text.split(" ");
  const hl = highlight.map((w) => w.toLowerCase());

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHi = hl.includes(word.toLowerCase().replace(/[.,]/g, ""));
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              aria-hidden
              className={isHi ? "inline-block text-gradient" : "inline-block"}
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.05 }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
