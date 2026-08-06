import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  showFrame: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, showFrame }) => {
  if (!showFrame) {
    return <div className="w-full max-w-md mx-auto min-h-screen relative bg-white shadow-2xl">{children}</div>;
  }

  return (
    <div className="py-6 flex justify-center items-center min-h-[calc(100vh-60px)] bg-slate-950 p-2 sm:p-4">
      <div className="w-full max-w-[420px] bg-slate-900 border-[10px] sm:border-[12px] border-slate-800 rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden relative border-slate-700/80">
        {/* Speaker / Dynamic Island Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-40 flex items-center justify-center gap-2 px-2 shadow-inner">
          <div className="w-2.5 h-2.5 bg-slate-900 border border-slate-800 rounded-full" />
          <div className="w-1.5 h-1.5 bg-blue-900/60 rounded-full" />
        </div>

        {/* Inner Screen Canvas */}
        <div className="w-full bg-white min-h-[780px] max-h-[840px] overflow-y-auto overflow-x-hidden relative scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};
