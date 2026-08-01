import { useEffect, useRef, useState } from 'react';

/**
 * Animates a numeric-looking stat string (e.g. "1,248+", "2.5 L+", "28")
 * from 0 up to its final value once it scrolls into view.
 * Non-numeric strings (e.g. "Day 1") are rendered as-is, unanimated.
 */
export default function CountUpStat({ value, duration = 1400 }) {
  // Strip commas/spaces before parsing so "1,248+" and "2.5 L+" animate correctly.
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const isDecimal = match && match[1].includes('.');
  const hasComma = /,/.test(value);

  const format = (n) => {
    const rounded = isDecimal ? Number(n.toFixed(1)) : Math.round(n);
    return hasComma ? rounded.toLocaleString('en-IN') : String(rounded);
  };

  const [display, setDisplay] = useState(numeric === null ? value : format(0) + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numeric * eased;
            setDisplay(format(current) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, suffix, duration, isDecimal]);

  return <span ref={ref}>{display}</span>;
}