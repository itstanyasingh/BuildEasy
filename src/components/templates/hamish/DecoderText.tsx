import React, { useState, useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#$@&*-+=[]{}|;:,.<>?';

interface DecoderTextProps {
  text: string;
  delay?: number;
  trigger?: boolean;
  className?: string;
  startOnHover?: boolean;
}

export const DecoderText: React.FC<DecoderTextProps> = ({
  text,
  delay = 0,
  trigger = true,
  className = '',
  startOnHover = false,
}) => {
  const [output, setOutput] = useState('');
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger && !hovered) {
      setOutput(text);
      return;
    }

    let isCancelled = false;
    let frameId: number;
    let timeoutId: NodeJS.Timeout;

    const startDecoder = () => {
      let count = 0;
      const targetText = text || '';
      const length = targetText.length;
      
      const animate = () => {
        if (isCancelled) return;
        
        const result = targetText.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < count) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join('');
        
        setOutput(result);
        
        if (count < length) {
          count += 1 / 2.5; // Controls decoding speed
          frameId = requestAnimationFrame(animate);
        } else {
          setOutput(targetText);
        }
      };

      frameId = requestAnimationFrame(animate);
    };

    timeoutId = setTimeout(startDecoder, delay);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [text, delay, trigger, hovered]);

  const handleMouseEnter = () => {
    if (startOnHover) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (startOnHover) {
      setHovered(false);
    }
  };

  return (
    <span 
      ref={containerRef} 
      className={`font-mono tracking-wider ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {output || text}
    </span>
  );
};
