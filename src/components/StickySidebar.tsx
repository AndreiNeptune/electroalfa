'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StickySidebarProps {
  sections: Section[];
}

export default function StickySidebar({ sections }: StickySidebarProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently most visible in viewport
      let currentSection = sections[0]?.id;
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // We check the distance from the top third of the viewport
          const distance = Math.abs(rect.top - window.innerHeight / 3);
          
          if (rect.top < window.innerHeight / 2 && distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add a slight offset for the fixed header (e.g. 100px)
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-32 flex flex-col gap-8">
      {/* Tracker Line */}
      <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-steel-dark rounded-full -z-10"></div>

      {sections.map((section, index) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="flex items-center gap-6 group text-left relative"
          >
            {/* Step Icon / Number */}
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-orange text-white shadow-[0_0_15px_rgba(255,107,0,0.5)] scale-110' 
                  : 'bg-white border-2 border-steel-dark text-navy group-hover:border-navy group-hover:scale-105'
              }`}
            >
              {section.icon ? section.icon : (index + 1)}
            </div>

            {/* Label */}
            <span 
              className={`font-semibold tracking-wide transition-colors duration-300 ${
                isActive ? 'text-orange' : 'text-navy/60 group-hover:text-navy'
              }`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
