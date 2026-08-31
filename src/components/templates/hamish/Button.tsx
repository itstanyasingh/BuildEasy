import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  secondary?: boolean;
  accentColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  secondary = false,
  accentColor = '#00f0ff',
  className = '',
  style,
  ...props
}) => {
  const hexColor = accentColor.startsWith('#') ? accentColor : `#${accentColor}`;

  if (secondary) {
    return (
      <button
        style={{ ...style, '--accent': hexColor } as React.CSSProperties}
        className={`group relative overflow-hidden bg-transparent border-b-2 border-r-2 border-[#1e1e24] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8e8e93] transition-all duration-300 hover:text-white hover:border-[var(--accent)] cursor-pointer ${className}`}
        {...props}
      >
        {/* Dynamic sliding fill */}
        <span 
          style={{ background: hexColor }}
          className="absolute inset-0 block h-full w-full -translate-x-full bg-opacity-10 transition-transform duration-300 group-hover:translate-x-0" 
        />
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
      </button>
    );
  }

  return (
    <button
      style={{ ...style, '--accent': hexColor } as React.CSSProperties}
      className={`group relative bg-transparent px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:text-white cursor-pointer ${className}`}
      {...props}
    >
      {/* Background slide panel */}
      <span 
        style={{ background: hexColor }}
        className="absolute inset-0 block h-full w-full bg-opacity-100 transition-transform duration-300 group-hover:scale-y-0 origin-bottom" 
      />
      <span 
        style={{ border: `1px solid ${hexColor}` }}
        className="absolute inset-0 block h-full w-full scale-y-0 border-opacity-50 transition-transform duration-300 group-hover:scale-y-100 origin-bottom" 
      />

      {/* Decorative corner visual accents */}
      <span 
        style={{ borderLeft: `2px solid ${hexColor}`, borderTop: `2px solid ${hexColor}` }}
        className="absolute top-0 left-0 block h-2 w-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
      />
      <span 
        style={{ borderRight: `2px solid ${hexColor}`, borderBottom: `2px solid ${hexColor}` }}
        className="absolute bottom-0 right-0 block h-2 w-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
      />

      <span className="relative z-10 flex items-center justify-center gap-2 mix-blend-difference group-hover:text-white">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1.5">{icon}</span>}
      </span>
    </button>
  );
};
