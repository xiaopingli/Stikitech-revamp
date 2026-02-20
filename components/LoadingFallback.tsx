import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] h-full bg-pearlWhite">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-stikiRed rounded-full animate-spin mb-4"></div>
      <p className="text-charcoal font-bold tracking-widest uppercase text-sm">Loading System...</p>
    </div>
  );
};

export default LoadingFallback;
