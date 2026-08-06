import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  X,
  ScanFace,
  Scan,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  PartyPopper,
  Camera,
  RotateCcw,
  CheckCircle2,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { UserAccountState } from '../types';

interface ActivationScreenProps {
  userState: UserAccountState;
  onNavigateBack: () => void;
  onCompleteActivation: (initialDeposit?: number) => void;
  onNavigateToMariBank?: () => void;
}

export const ActivationScreen: React.FC<ActivationScreenProps> = ({
  userState,
  onNavigateBack,
  onCompleteActivation,
  onNavigateToMariBank,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [scanning, setScanning] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(500);

  const handleStartScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep(2);
    }, 2200);
  };

  const handleStartOcr = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep(3);
    }, 2200);
  };

  const handleFinishActivation = () => {
    onCompleteActivation(depositAmount);
    setStep(4);
  };

  return (
    <div className="w-full bg-[#F5F5F7] min-h-full pb-28 flex flex-col font-sans relative text-slate-800">
      {/* Status Bar */}
      <div className="bg-[#FF5722] text-white px-5 pt-3 pb-1 flex justify-between items-center text-xs font-semibold tracking-tight shrink-0">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-4 h-2.5 border border-white rounded-[2px] flex items-center p-0.5">
            <div className="bg-white w-full h-full rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Screen Header Bar */}
      <div className="bg-gradient-to-r from-[#FF5722] to-[#FF3D00] text-white px-4 py-3 flex items-center justify-between shadow-sm shrink-0 border-b border-orange-600/20">
        <button
          onClick={onNavigateBack}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white text-[#FF5722] rounded-full font-black text-xs flex items-center justify-center shadow-sm">
            M
          </div>
          <span className="font-extrabold text-sm tracking-tight">MariBank Account Activation</span>
        </div>

        <button
          onClick={onNavigateBack}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Step Progress Bar Header */}
      <div className="bg-white px-5 py-3.5 border-b border-slate-200 flex flex-col gap-2.5 shrink-0 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-extrabold text-slate-900 tracking-tight">
            {step === 1 && 'Step 1: Face Scan Verification'}
            {step === 2 && 'Step 2: ID & Document OCR'}
            {step === 3 && 'Step 3: Deposit & Earn 3.5%'}
            {step === 4 && 'Account Activated Successfully!'}
          </span>
          <span className="text-[11px] font-bold text-[#FF5722]">
            {step <= 3 ? `Step ${step} of 3` : 'Completed'}
          </span>
        </div>

        {/* Segmented Step Indicator */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-[#FF5722]' : 'bg-slate-200'}`} />
            <span className={`text-[10px] font-bold text-center ${step >= 1 ? 'text-[#FF5722]' : 'text-slate-400'}`}>
              Face Scan
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-[#FF5722]' : 'bg-slate-200'}`} />
            <span className={`text-[10px] font-bold text-center ${step >= 2 ? 'text-[#FF5722]' : 'text-slate-400'}`}>
              ID Secure
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-[#FF5722]' : 'bg-slate-200'}`} />
            <span className={`text-[10px] font-bold text-center ${step >= 3 ? 'text-[#FF5722]' : 'text-slate-400'}`}>
              Earn Daily
            </span>
          </div>
        </div>
      </div>

      {/* Main Full Mobile Viewport Content with Generous Vertical Spacing */}
      <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
        {step === 1 && (
          <div className="flex flex-col justify-between min-h-[460px] h-full gap-5">
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4.5 shadow-sm border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <ScanFace className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    Biometric Facial Verification
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Position your face clearly within the frame. Our encrypted 4-second facial scanner
                    complies strictly with MAS digital identity standards.
                  </p>
                </div>
              </div>

              {/* Full Camera Oval Frame */}
              <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-xl border border-slate-800 my-1 min-h-[220px]">
                {/* Simulated Camera Feed Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

                <div className="relative flex items-center justify-center">
                  <div className={`w-32 h-32 rounded-full border-4 ${scanning ? 'border-cyan-400 animate-pulse' : 'border-dashed border-cyan-400/80'} flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]`}>
                    <ScanFace className={`w-16 h-16 ${scanning ? 'text-cyan-400 scale-105 animate-pulse' : 'text-cyan-400/70 animate-pulse'} transition-all`} />
                  </div>

                  {scanning && (
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                <div className="text-center relative z-10">
                  <span className="text-xs font-bold text-cyan-300 block">
                    {scanning ? 'Analyzing Facial Biometrics...' : 'Align face inside boundary'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Hold steady for instant clearance
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-bit Hardware Encrypted • Zero Data Retention</span>
              </div>
            </div>

            {/* Bottom Pinned CTA Button */}
            <div className="mt-auto pt-3">
              <button
                onClick={handleStartScan}
                disabled={scanning}
                className="w-full bg-[#FF5722] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{scanning ? 'Scanning Biometrics...' : 'Start 4-Sec Face Scan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col justify-between min-h-[460px] h-full gap-5">
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4.5 shadow-sm border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Scan className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    ID Document OCR Verification
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Place your official NRIC or Passport inside the rectangular guide. Algorithmic OCR
                    reads credential data automatically.
                  </p>
                </div>
              </div>

              {/* Camera ID Rectangular Viewport */}
              <div className="bg-slate-950 rounded-2xl p-5 text-white flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-xl border border-slate-800 my-1 min-h-[220px]">
                <div className="w-full max-w-[280px] h-36 border-2 border-dashed border-cyan-400 bg-slate-900/90 rounded-2xl p-3 flex flex-col justify-between relative shadow-inner">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      ID
                    </div>
                    <div className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      MAS COMPLIANT
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2 bg-slate-700/80 rounded w-3/4" />
                    <div className="h-2 bg-slate-700/80 rounded w-1/2" />
                  </div>

                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                    <span>NAME: JOHN DOE</span>
                    <span>PASS: OK</span>
                  </div>

                  {scanning && (
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                <div className="text-center relative z-10">
                  <span className="text-xs font-bold text-cyan-300 block">
                    {scanning ? 'Extracting ID Credentials...' : 'Position card within boundary'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Ensure text is clear and readable
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-100 flex items-center gap-2 text-xs">
                <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Instant MyInfo Clearance Enabled</span>
              </div>
            </div>

            {/* Bottom Pinned CTA Button */}
            <div className="mt-auto pt-3">
              <button
                onClick={handleStartOcr}
                disabled={scanning}
                className="w-full bg-[#FF5722] text-white py-3.5 rounded-2xl font-black text-sm shadow-lg hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{scanning ? 'Extracting Data...' : 'Confirm ID Document'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col justify-between min-h-[460px] h-full gap-5">
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4.5 shadow-sm border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                    Verification Complete!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Set your initial transfer amount from ShopeePay to MariBank to start earning 3.5% p.a. daily interest immediately.
                  </p>
                </div>
              </div>

              {/* Deposit Slider Card */}
              <div className="bg-white rounded-2xl p-4.5 shadow-md border border-slate-100 flex flex-col gap-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-600">Initial Transfer Amount:</span>
                  <span className="font-black text-2xl text-[#FF5722]">
                    ${depositAmount.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min="100"
                  max={Math.min(userState.shopeePayBalance, 10000)}
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full accent-[#FF5722] h-2.5 bg-slate-100 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>$100</span>
                  <span>ShopeePay Max: ${userState.shopeePayBalance.toLocaleString()}</span>
                </div>

                <div className="h-[1px] bg-slate-100 w-full my-0.5" />

                {/* Return Calculation Box */}
                <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-100 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      Estimated Daily Interest
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      Credited daily at midnight
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-[#FF5722]">
                      +${((depositAmount * 0.035) / 365).toFixed(2)}/day
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">3.5% P.A. Base</div>
                  </div>
                </div>
              </div>

              {/* Protection Badge */}
              <div className="bg-blue-50 text-blue-900 p-3 rounded-2xl border border-blue-100 flex items-start gap-2.5 text-xs">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong className="font-bold">SDIC Insured Protection:</strong> Deposits are insured
                  up to statutory limits by SDIC. Instant 1-second liquidity back to ShopeePay anytime.
                </div>
              </div>
            </div>

            {/* Bottom Pinned CTA Button */}
            <div className="mt-auto pt-3">
              <button
                onClick={handleFinishActivation}
                className="w-full bg-gradient-to-r from-[#FF5722] to-[#FF3D00] text-white py-3.5 rounded-2xl font-black text-sm shadow-xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Activate MariBank Account</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col justify-between min-h-[460px] h-full gap-5 py-2">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg my-2">
                <PartyPopper className="w-10 h-10 text-[#FF5722]" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Account Status: Active & Earning
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-3 tracking-tight">
                  Congratulations!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto leading-relaxed">
                  Your MariBank Savings Account is officially active! You transferred{' '}
                  <strong className="text-slate-900">${depositAmount.toLocaleString()}</strong> and are now compounding interest daily at 3.5% p.a.
                </p>
              </div>

              {/* Summary Ledger Box */}
              <div className="w-full bg-white p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">New MariBank Balance:</span>
                  <span className="font-black text-lg text-slate-900">
                    ${depositAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Interest Rate:</span>
                  <span className="font-bold text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    3.5% P.A. Daily
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">First Daily Payout:</span>
                  <span className="font-bold text-emerald-600">Tonight at 12:00 AM</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Auto-Sweep:</span>
                  <span className="font-bold text-blue-600">Enabled</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-auto pt-3">
              {onNavigateToMariBank && (
                <button
                  onClick={onNavigateToMariBank}
                  className="w-full bg-[#FF5722] text-white py-3.5 rounded-2xl font-black text-sm shadow-md hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to MariBank Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onNavigateBack}
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-2xl font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Return to ShopeePay Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
