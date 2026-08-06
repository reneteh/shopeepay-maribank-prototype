import React, { useState } from 'react';
import { X, Plus, QrCode, ArrowLeftRight, Building2, CheckCircle, Smartphone } from 'lucide-react';

interface QuickActionModalsProps {
  activeAction: 'topup' | 'pay' | 'transfer' | 'bank' | null;
  onClose: () => void;
  shopeePayBalance: number;
  onTopUp: (amount: number) => void;
  onTransfer: (amount: number) => void;
}

export const QuickActionModals: React.FC<QuickActionModalsProps> = ({
  activeAction,
  onClose,
  shopeePayBalance,
  onTopUp,
  onTransfer,
}) => {
  const [amount, setAmount] = useState<number>(50);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!activeAction) return null;

  const handleActionSubmit = (type: string) => {
    if (type === 'topup') {
      onTopUp(amount);
      setSuccessMsg(`Successfully topped up $${amount} to ShopeePay Wallet!`);
    } else if (type === 'transfer') {
      onTransfer(amount);
      setSuccessMsg(`Successfully transferred $${amount}!`);
    } else {
      setSuccessMsg(`Transaction processed successfully!`);
    }
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-[#FF5722] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sm">
            {activeAction === 'topup' && (
              <>
                <Plus className="w-5 h-5" /> Top Up ShopeePay
              </>
            )}
            {activeAction === 'pay' && (
              <>
                <QrCode className="w-5 h-5" /> Pay / QR Scan
              </>
            )}
            {activeAction === 'transfer' && (
              <>
                <ArrowLeftRight className="w-5 h-5" /> Transfer Funds
              </>
            )}
            {activeAction === 'bank' && (
              <>
                <Building2 className="w-5 h-5" /> Bank Transfer & Link
              </>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col gap-4">
          {successMsg ? (
            <div className="flex flex-col items-center text-center py-6 gap-3">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
              <div className="text-sm font-bold text-slate-800">{successMsg}</div>
            </div>
          ) : (
            <>
              {activeAction === 'topup' && (
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-slate-500">
                    Select Top Up Amount (From Linked Bank / PayNow):
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[20, 50, 100, 200, 500, 1000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          amount === val
                            ? 'bg-[#FF5722] text-white border-[#FF5722]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleActionSubmit('topup')}
                    className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md mt-2 hover:bg-orange-600 transition-colors"
                  >
                    Confirm Top Up of ${amount}
                  </button>
                </div>
              )}

              {activeAction === 'pay' && (
                <div className="flex flex-col items-center text-center gap-4 py-2">
                  <div className="w-48 h-48 bg-slate-900 rounded-2xl border-4 border-[#FF5722] flex flex-col items-center justify-center text-white relative p-4">
                    <QrCode className="w-24 h-24 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] text-cyan-300 font-mono mt-2">
                      Align QR code inside scanner
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Pay at any SGQR, PayNow, or ShopeePay merchant directly.
                  </p>

                  <button
                    onClick={() => handleActionSubmit('pay')}
                    className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-orange-600 transition-colors"
                  >
                    Simulate Merchant QR Payment ($15.00)
                  </button>
                </div>
              )}

              {activeAction === 'transfer' && (
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-slate-500">
                    Enter Amount to Transfer:
                  </div>

                  <div className="bg-slate-100 p-3 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-slate-500">Amount ($):</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-24 bg-white px-2 py-1 rounded text-right font-bold text-sm border border-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Available balance: <strong>${shopeePayBalance.toLocaleString()}</strong>
                  </div>

                  <button
                    onClick={() => handleActionSubmit('transfer')}
                    className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md mt-2 hover:bg-orange-600 transition-colors"
                  >
                    Send Transfer Now
                  </button>
                </div>
              )}

              {activeAction === 'bank' && (
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-slate-500">
                    Linked Bank Account & Transfers:
                  </div>

                  <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-100 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Primary Linked Bank:</span>
                      <span className="text-[#FF5722]">MariBank Singapore</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Instant $0 transfer between ShopeePay and MariBank is enabled.
                    </div>
                  </div>

                  <button
                    onClick={() => handleActionSubmit('bank')}
                    className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md mt-2 hover:bg-orange-600 transition-colors"
                  >
                    Manage Bank Links
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
