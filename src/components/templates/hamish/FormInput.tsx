import React, { useState } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextArea?: boolean;
  accentColor?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  isTextArea = false,
  accentColor = '#00f0ff',
  className = '',
  id,
  value,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hexColor = accentColor.startsWith('#') ? accentColor : `#${accentColor}`;

  const hasValue = (value as string)?.length > 0;

  const inputClasses = `w-full bg-[#08080c] bg-opacity-75 border-b border-[#2d2d3a] px-4 py-4 text-sm font-sans font-medium text-white placeholder-transparent outline-none transition-all duration-300 ${
    focused ? 'border-opacity-100 shadow-[0_4px_24px_rgba(0,0,0,0.5)]' : 'border-opacity-50'
  }`;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Interactive top line that expands outward on focus */}
      <span
        style={{ background: hexColor, transform: focused ? 'scaleX(1)' : 'scaleX(0)' }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-500 ease-out z-10"
      />

      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputClasses} min-h-[140px] resize-none`}
          {...props as any}
        />
      ) : (
        <input
          id={id}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={inputClasses}
          {...props as any}
        />
      )}

      {/* Floating typography label */}
      <label
        htmlFor={id}
        style={{ color: focused ? hexColor : undefined }}
        className={`absolute left-4 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? '-translate-y-6 text-[10px] opacity-100'
            : 'translate-y-4 text-xs opacity-40'
        }`}
      >
        {label}
      </label>

      {/* Futuristic corner accent marker */}
      <span 
        style={{ borderRight: `1px solid ${hexColor}`, borderTop: `1px solid ${hexColor}`, opacity: focused ? 1 : 0 }}
        className="absolute top-0 right-0 h-1.5 w-1.5 transition-opacity duration-300"
      />
    </div>
  );
};
