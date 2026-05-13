'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

import { translations, Locale } from '@/lib/i18n/translations';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export default function StatsCounter({ lang }: { lang: string }) {
  const t = translations[lang as Locale] || translations.en;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const stats: StatItem[] = [
    { id: '1', label: t.yearsExp, value: 33, suffix: '+' },
    { id: '2', label: t.employees, value: 500, suffix: '+' },
    { id: '3', label: t.projects, value: 1000, suffix: '+' },
    { id: '4', label: t.turnover, value: 50, prefix: '€' },
  ];

  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-black text-orange mb-2 flex items-center justify-center">
                {stat.prefix && <span>{stat.prefix}</span>}
                <Counter value={stat.value} duration={2} start={isInView} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="text-steel/80 font-medium uppercase tracking-wider text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// A simple counter component that animates from 0 to value
function Counter({ value, duration, start }: { value: number; duration: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, start]);

  return <>{count}</>;
}
