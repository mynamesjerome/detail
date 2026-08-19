import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'blue';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'lg',
  src = '/logo.png'
}) => {
  const [imgError, setImgError] = useState(false);

  const logoHeights = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-14',
    lg: 'h-14 sm:h-16',
    xl: 'h-16 sm:h-20'
  };

  const textSizes = {
    sm: { title: 'text-xs sm:text-sm', subtitle: 'text-[9px] sm:text-[10px]' },
    md: { title: 'text-sm sm:text-base', subtitle: 'text-[10px] sm:text-xs' },
    lg: { title: 'text-base sm:text-lg', subtitle: 'text-xs sm:text-sm' },
    xl: { title: 'text-lg sm:text-xl', subtitle: 'text-sm sm:text-base' }
  };

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 group cursor-pointer select-none bg-transparent ${className}`}>
      {!imgError ? (
        <>
          <img
            src={src}
            alt="Gavin's Car Detailing Logo"
            onError={() => setImgError(true)}
            className={`w-auto object-contain bg-transparent transition-all duration-300 group-hover:scale-105 filter drop-shadow-md ${logoHeights[size]}`}
          />
          <div className="flex flex-col text-left leading-none shrink-0">
            <span className={`font-black text-white tracking-widest uppercase font-serif group-hover:text-blue-400 transition-colors ${textSizes[size].title}`}>
              Gavin's
            </span>
            <span className={`font-bold text-blue-400 tracking-wider uppercase mt-1 ${textSizes[size].subtitle}`}>
              Car Detailing
            </span>
          </div>
        </>
      ) : (
        /* Fallback logo display if /logo.png has not been uploaded yet */
        <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden p-1.5 transition-all duration-300 group-hover:scale-105 shadow-xl ${logoHeights[size]} bg-slate-950 border border-slate-800`}>
          <img
            src="/android-chrome-192x192.png"
            alt="Gavin's Car Detailing"
            className="h-full w-auto aspect-square object-contain bg-transparent rounded-xl"
          />
          <div className="flex flex-col text-left pl-2 pr-3 leading-none">
            <span className="font-black text-white text-sm sm:text-base tracking-widest uppercase font-serif group-hover:text-blue-400 transition-colors">
              Gavin's
            </span>
            <span className="font-bold text-blue-400 text-[10px] sm:text-xs tracking-widest uppercase mt-0.5">
              Car Detailing
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


