import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ScanFace,
  Scan,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  PartyPopper,
} from 'lucide-react';
import { UserAccountState } from '../types';

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteActivation: (initialDeposit?: number) => void;
  userState: UserAccountState;
}

export const ActivationModal: React.FC<ActivationModalProps> = ({
  isOpen,
  onClose,
  onCompleteActivation,
  userState,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [scanning, setScanning] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(500);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep(2);
    }, 2000);
  };

  const handleStartOcr = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep(3);
    }, 2000);
  };

  const handleFinishActivation = () => {
    onCompleteActivation(depositAmount);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#FF5722] to-[#FF3D00] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-[#FF5722] rounded-full font-black text-sm flex items-center justify-center">
              M
            </div>
            <span className="font-bold text-sm">MariBank Activation</span>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-orange-50 px-4 py-2 border-b border-orange-100 flex items-center justify-between text-[11px] font-bold text-[#FF5722]">
          <span>Step {Math.min(step, 3)} of 3</span>
          <div className="flex gap-1">
            <div
              className={`w-6 h-1 rounded-full ${step >= 1 ? 'bg-[#FF5722]' : 'bg-slate-200'}`}
            />
            <div
              className={`w-6 h-1 rounded-full ${step >= 2 ? 'bg-[#FF5722]' : 'bg-slate-200'}`}
            />
            <div
              className={`w-6 h-1 rounded-full ${step >= 3 ? 'bg-[#FF5722]' : 'bg-slate-200'}`}
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <ScanFace className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Biometric Facial Verification
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Position your face clearly in the camera frame to securely verify your identity with
                  MAS regulatory compliance.
                </p>
              </div>

              {/* Viewport Box */}
              <div className="w-48 h-48 bg-slate-950 rounded-full border-4 border-[#FF5722] flex flex-col items-center justify-center relative overflow-hidden shadow-inner my-2">
                {scanning ? (
                  <div className="flex flex-col items-center gap-2 text-cyan-400">
                    <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-mono">Verifying Biometrics...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <ScanFace className="w-16 h-16 text-cyan-400/80 animate-pulse" />
                    <span className="text-[10px] text-cyan-300">Face Scan Ready</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleStartScan}
                disabled={scanning}
                className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                {scanning ? 'Scanning...' : 'Start 4-Sec Face Scan'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Scan className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  ID & Document OCR Scan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We need to verify your official ID card to instantly populate secure account info.
                </p>
              </div>

              {/* ID Frame */}
              <div className="w-full h-36 bg-slate-900 rounded-2xl border-2 border-dashed border-cyan-400 flex flex-col items-center justify-center relative overflow-hidden my-2 shadow-inner p-4">
                {scanning ? (
                  <div className="w-full space-y-2">
                    <div className="h-2 bg-cyan-400/30 rounded w-full animate-pulse" />
                    <div className="h-2 bg-cyan-400/50 rounded w-3/4 animate-pulse" />
                    <div className="h-2 bg-cyan-400/20 rounded w-1/2 animate-pulse" />
                    <span className="text-[10px] text-cyan-300 font-mono block text-center pt-2">
                      Extracting Document Data...
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <div className="w-12 h-8 border border-slate-600 rounded flex items-center justify-center">
                      <Lock className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-cyan-300">Position ID inside frame</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleStartOcr}
                disabled={scanning}
                className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                {scanning ? 'Extracting Data...' : 'Confirm ID Document'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Verification Complete!
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set initial deposit from ShopeePay to MariBank Savings to start earning 3.5% daily.
                </p>
              </div>

              <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600">Initial Transfer Amount:</span>
                  <span className="font-black text-[#FF5722] text-sm">${depositAmount}</span>
                </div>

                <input
                  type="range"
                  min="100"
                  max={Math.min(userState.shopeePayBalance, 10000)}
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="accent-[#FF5722] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$100</span>
                  <span>Max: ${userState.shopeePayBalance.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl text-[11px] text-blue-700 font-medium flex items-center gap-2 border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Deposits are SDIC insured up to statutory limits. Instant liquidity 24/7.</span>
              </div>

              <button
                onClick={handleFinishActivation}
                className="w-full bg-gradient-to-r from-[#FF5722] to-[#FF3D00] text-white py-3.5 rounded-xl font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Activate MariBank Account</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <PartyPopper className="w-8 h-8 text-[#FF5722]" />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">Congratulations!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Your MariBank Savings Account is now <strong className="text-emerald-600">Active</strong>!
                  You deposited <strong>${depositAmount}</strong> and are now compounding interest daily at 3.5% p.a.
                </p>
              </div>

              <div className="w-full bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Account Status:</span>
                  <span className="font-bold text-emerald-600">Active & Earning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Interest Rate:</span>
                  <span className="font-bold text-[#FF5722]">3.5% P.A. Daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MariBank Balance:</span>
                  <span className="font-bold text-slate-900">${depositAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-orange-600 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
