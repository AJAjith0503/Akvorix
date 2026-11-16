"use client";

import React from 'react';
import { useScramble } from '../../hooks/useScramble';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
  variant?: 'default' | 'heading' | 'decrypt-mask';
  autoPlay?: boolean;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  as: Component = "span",
  onClick,
  variant = 'default',
  autoPlay = false
}) => {
  const { displayText, startScramble, stopScramble, isHovering, activeIndex } = useScramble(text);
  const [containerChars, setContainerChars] = React.useState(text.length);

  React.useEffect(() => {
    setContainerChars(text.length);
  }, [text]);

  React.useEffect(() => {
    if (autoPlay) {
      startScramble();
    }
  }, [autoPlay, startScramble]);

  if (variant === 'heading') {
    return (
      <Component
        className={`cursor-pointer transition-colors duration-300 inline-block ${className} ${isHovering ? 'bg-[#e21b22] text-white px-2 rounded-sm' : ''}`}
        onMouseEnter={startScramble}
        onMouseLeave={stopScramble}
        onClick={onClick}
      >
        {displayText}
      </Component>
    );
  }

  if (variant === 'decrypt-mask') {
    return (
      <Component
        className={`cursor-pointer inline-flex overflow-hidden align-middle ${className}`}
        onMouseEnter={startScramble}
        onMouseLeave={stopScramble}
        onClick={onClick}
        style={{
          width: `${containerChars}ch`,
          transition: 'width 280ms ease',
          fontFamily: '"JetBrains Mono", monospace'
        }}
      >
        {displayText.split('').map((char, index) => {
          const isActive = index === activeIndex;
          return (
            <span
              key={`${text}-${index}`}
              className={`inline-flex h-[1.2em] w-[1ch] items-center justify-center transition-colors duration-100 ${isActive ? 'bg-white text-[#6B3F69]' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </Component>
    );
  }

  return (
    <Component
      className={`cursor-pointer transition-colors duration-300 inline ${className} ${isHovering ? 'bg-red-600 text-white px-1' : ''}`}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
    >
      {displayText}
    </Component>
  );
};

export default ScrambleText;
