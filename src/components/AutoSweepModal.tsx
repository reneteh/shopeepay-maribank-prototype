import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, TrendingUp, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface AutoSweepModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoSweepEnabled: boolean;
  onToggleAutoSweep: (enabled: boolean) => void;
  shopeePayBalance: number;
}

export const AutoSweepModal: React.FC<AutoSweepModalProps> = ({
  isOpen,
  onClose,
  autoSweepEnabled,
  onToggleAutoSweep,
  shopeePayBalance,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onToggleAutoSweep(!autoSweepEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF5722] to-[#FF3D00] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-sm">MariBank Auto-Sweep</span>
          </div>

          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 text-center">
          <div className="w-14 h-14 bg-orange-100 text-[#FF5722] rounded-2xl flex items-center justify-center mx-auto">
            <Zap className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {autoSweepEnabled ? 'Disable Auto-Sweep?' : 'Enable Auto-Sweep Idle Cash?'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Auto-Sweep automatically transfers idle ShopeePay funds to MariBank every midnight to earn 3.5% p.a. compound interest, while ensuring instant payment liquidity when you shop.
            </p>
          </div>

          <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-100 text-left space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
              <span className="text-slate-700">
                <strong>Zero Friction:</strong> Liquidity is instantly available whenever you pay via ShopeePay.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
              <span className="text-slate-700">
                <strong>Daily Interest:</strong> Interest calculated daily on your combined MariBank balance.
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl text-[11px] text-blue-700 flex items-center gap-2 border border-blue-100 text-left">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Regulated by Monetary Authority of Singapore (MAS).</span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-3 text-white rounded-xl font-bold text-xs shadow-md transition-colors ${
                autoSweepEnabled
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#FF5722] hover:bg-orange-600'
              }`}
            >
              {autoSweepEnabled ? 'Turn OFF' : 'Turn ON Auto-Sweep'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
