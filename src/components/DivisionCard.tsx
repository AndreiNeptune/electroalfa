'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface DivisionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  index: number;
}

export default function DivisionCard({ title, description, icon: Icon, image, index }: DivisionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl border border-steel-dark overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors z-10" />
        </div>
      )}
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="w-12 h-12 bg-steel rounded-2xl flex items-center justify-center text-navy mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        
        <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-orange transition-colors">
          {title}
        </h3>
        
        <p className="text-navy/70 font-medium leading-relaxed">
          {description}
        </p>
        
        <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-bold text-orange uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Details
          <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}
