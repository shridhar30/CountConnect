import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl
        shadow-2xl shadow-black/20 relative overflow-hidden
        ${hover ? 'hover:bg-white/10 hover:border-white/20' : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlassCard;