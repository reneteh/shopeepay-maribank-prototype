import React from 'react';
import { Smartphone, Presentation, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Screen, UserAccountState } from '../types';

interface TopNavbarProps {
  currentScreen: Screen;
  onNavigateScreen: (screen: Screen) => void;
  userState: UserAccountState;
  onResetSimulation: () => void;
  showMobileBorder: boolean;
  onToggleMobileBorder: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentScreen,
  onNavigateScreen,
  userState,
  onResetSimulation,
  showMobileBorder,
  onToggleMobileBorder,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 sticky top-0 z-40 flex items-center justify-between shadow-md">
      {/* Brand & App Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#FF5722] to-[#FF3D00] text-white rounded-xl font-black text-sm flex items-center justify-center shadow-md">
            S
          </div>
          <div>
            <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
              <span>ShopeePay & MariBank Prototype</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Live Prototype
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Design Challenge Submission for Monee • Rene Teh
            </div>
          </div>
        </div>
      </div>

      {/* Center View Controls */}
      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => onNavigateScreen('shopeepay')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentScreen === 'shopeepay'
              ? 'bg-[#FF5722] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>ShopeePay Home</span>
        </button>

        <button
          onClick={() => onNavigateScreen('maribank')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentScreen === 'maribank'
              ? 'bg-[#0055FE] text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-white text-[#0055FE] text-[9px] font-black flex items-center justify-center">
            M
          </div>
          <span>MariBank Savings</span>
          {userState.isMariBankActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => onNavigateScreen('activation')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentScreen === 'activation'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Activation Flow</span>
        </button>

        <button
          onClick={() => onNavigateScreen('deck')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            currentScreen === 'deck'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>Strategy Deck</span>
        </button>
      </div>

      {/* Right Tools & Reset */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMobileBorder}
          className="text-[11px] font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors hidden sm:flex items-center gap-1"
        >
          <span>Frame: {showMobileBorder ? 'Phone Frame' : 'Full Screen'}</span>
        </button>

        <button
          onClick={onResetSimulation}
          className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          title="Reset Simulation State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
