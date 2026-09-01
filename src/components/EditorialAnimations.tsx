import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'motion/react';
import { Layers, Sparkles } from 'lucide-react';

const LEFT_LOTTIE_URL = 'https://lottie.host/44eb2d76-c911-4d64-9775-e186d2bdec7b/XhDwOZ3IOO.lottie';
const RIGHT_LOTTIE_URL = 'https://lottie.host/4e648a1c-c0b3-4ae5-b9cc-053acc71df58/6PDwf2X432.lottie';
const LOCAL_LEFT_FALLBACK = '/hero-left-animation.lottie';
const LOCAL_RIGHT_FALLBACK = '/hero-right-animation.lottie';

/**
 * Hero Lottie Animation - Loads the exact Lottie URL requested by user
 * with graceful local fallback if sandboxed iframe blocks remote fetch.
 */
export const HeroSideLottie: React.FC<{ 
  src?: string;
  fallbackSrc?: string;
  flip?: boolean; 
  className?: string 
}> = ({ 
  src = LEFT_LOTTIE_URL,
  fallbackSrc = LOCAL_LEFT_FALLBACK,
  flip = false, 
  className = '' 
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <motion.div
      animate={{
        y: flip ? [5, -5, 5] : [-5, 5, -5],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      <div className={`w-full h-full flex items-center justify-center ${flip ? 'scale-x-[-1]' : ''}`}>
        <DotLottieReact
          src={currentSrc}
          loop
          autoplay
          onError={() => {
            if (currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            }
          }}
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};

// Aliases for compatibility
export const HeroLeftAnimation: React.FC<{ className?: string }> = ({ className = 'w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52' }) => (
  <HeroSideLottie 
    src={LEFT_LOTTIE_URL} 
    fallbackSrc={LOCAL_LEFT_FALLBACK}
    className={className} 
  />
);

export const HeroRightAnimation: React.FC<{ className?: string }> = ({ className = 'w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52' }) => (
  <HeroSideLottie 
    src={RIGHT_LOTTIE_URL} 
    fallbackSrc={LOCAL_RIGHT_FALLBACK}
    className={className} 
  />
);

const CTA_LOTTIE_URL = 'https://lottie.host/b1347271-4a89-4c5c-af78-db09b1c75f7d/qJZ4TbKIlH.lottie';
const LOCAL_CTA_FALLBACK = '/hero-animation.lottie';

/**
 * Editorial CTA Animation - Loads the exact Lottie animation requested
 */
export const CtaBannerAnimation: React.FC<{ className?: string }> = ({ 
  className = 'w-24 h-24 sm:w-28 sm:h-28 mx-auto' 
}) => {
  return (
    <HeroSideLottie 
      src={CTA_LOTTIE_URL} 
      fallbackSrc={LOCAL_CTA_FALLBACK}
      className={className} 
    />
  );
};
