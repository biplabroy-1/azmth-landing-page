/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DataPoints = () => {
  const points = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 5 + 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {points.map((point) => (
        <motion.div
          key={point.id}
          className="absolute bg-white/40 will-change-[opacity]"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: '2px',
            height: '2px',
          }}
          animate={{
            opacity: [point.opacity, point.opacity * 2, point.opacity],
          }}
          transition={{
            duration: point.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const GridLines = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
            <div className="absolute w-full h-full" 
                 style={{ 
                     backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                     backgroundSize: '100px 100px'
                 }} 
            />
        </div>
    )
}

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <GridLines />
      <DataPoints />
      
      {/* Subtle vignettes instead of colored blobs */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
      
      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;