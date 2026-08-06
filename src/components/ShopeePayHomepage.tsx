import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  Bell,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  QrCode,
  ArrowLeftRight,
  Building2,
  Smartphone,
  Wallet,
  UtensilsCrossed,
  Gift,
  ShieldCheck,
  TrendingUp,
  CircleDollarSign,
  Grid,
  Home,
  ReceiptText,
  User,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { UserAccountState, CoreUtilitiesState } from '../types';

interface ShopeePayHomepageProps {
  userState: UserAccountState;
  onUpdateState: (newState: Partial<UserAccountState>) => void;
  onNavigateToMariBank: () => void;
  onOpenQuickAction: (action: 'topup' | 'pay' | 'transfer' | 'bank') => void;
  onToggleAutoSweepModal: () => void;
  onOpenActivation?: () => void;
}

export const ShopeePayHomepage: React.FC<ShopeePayHomepageProps> = ({
  userState,
  onUpdateState,
  onNavigateToMariBank,
  onOpenQuickAction,
  onToggleAutoSweepModal,
  onOpenActivation,
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [utilitiesState, setUtilitiesState] = useState<CoreUtilitiesState>('collapsed');
  const [activeTab, setActiveTab] = useState<'shopeepay' | 'maribank'>('shopeepay');

  const formattedShopeePay = showBalance
    ? `$${userState.shopeePayBalance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '••••••••';

  const formattedMariBank = showBalance
    ? `$${userState.mariBankBalance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '••••••••';

  // Calculated compound interest (3.5% p.a.)
  const annualInterest = userState.shopeePayBalance * 0.035;
  const dailyReturnAmount = (userState.shopeePayBalance * 0.035) / 365;

  const handleTabChange = (tab: 'shopeepay' | 'maribank') => {
    setActiveTab(tab);
    // Stay inside the card container - DO NOT navigate away
  };

  return (
    <div className="w-full bg-[#F5F5F7] min-h-full pb-28 flex flex-col font-sans relative text-slate-800">
      {/* Status Bar Mock */}
      <div className="bg-[#FF5722] text-white px-5 pt-3 pb-1 flex justify-between items-center text-xs font-semibold tracking-tight">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-4 h-2.5 border border-white rounded-[2px] flex items-center p-0.5">
            <div className="bg-white w-full h-full rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Top ShopeePay Brand Bar */}
      <div className="bg-gradient-to-b from-[#FF5722] to-[#FF3D00] px-4 pt-2 pb-14 text-white rounded-b-[2rem] shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-[#FF5722] rounded-lg font-black flex items-center justify-center text-base shadow-sm">
              S
            </div>
            <span className="font-extrabold text-xl tracking-tight">ShopeePay</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Claim 50K Badge */}
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-colors">
              <span className="w-4 h-4 bg-amber-400 text-amber-900 rounded-full flex items-center justify-center text-[10px] font-bold">
                $
              </span>
              <span>Claim 50K</span>
            </button>

            {/* Notification Bell */}
            <div className="relative p-1.5 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
              <Bell className="w-5 h-5 text-white" />
              {userState.notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FF5722]">
                  {userState.notificationCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container - Overlapping Header Card */}
      <div className="px-4 -mt-10 flex flex-col gap-4">
        {/* Balance & Wallet Toggle Card */}
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 flex flex-col gap-5">
          {/* Segmented Switch Bar with Roomy Height and Stacked Badge */}
          <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1.5">
            <button
              onClick={() => handleTabChange('shopeepay')}
              className={`flex-1 py-3 px-2 rounded-lg font-extrabold text-xs transition-all flex items-center justify-center ${
                activeTab === 'shopeepay'
                  ? 'bg-[#FF5722] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ShopeePay Wallet
            </button>
            <button
              onClick={() => handleTabChange('maribank')}
              className={`flex-1 py-2 px-2 rounded-lg font-extrabold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === 'maribank'
                  ? 'bg-[#FF5722] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>MariBank Savings</span>
              <span
                className={`text-[9.5px] px-2 py-0.5 rounded-full font-black tracking-tight transition-colors ${
                  activeTab === 'maribank'
                    ? 'bg-white/20 text-white'
                    : 'bg-orange-100 text-[#FF5722]'
                }`}
              >
                3.5% P.A.
              </span>
            </button>
          </div>

          {/* Balance Rows */}
          {activeTab === 'shopeepay' ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <span>Available Spending Balance</span>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Gov Protection Badge */}
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>Gov Protected</span>
                </div>
              </div>

              <div className="text-3xl font-black text-slate-900 tracking-tight py-1 font-sans">
                {formattedShopeePay}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <span>MariBank Savings Balance</span>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* 3.5% P.A. Badge */}
                <div className="flex items-center gap-1 bg-orange-100 text-[#FF5722] px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-orange-200">
                  <Sparkles className="w-3 h-3 text-[#FF5722]" />
                  <span>3.5% P.A. Daily</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-0.5">
                <div className="text-3xl font-black text-slate-900 tracking-tight font-sans">
                  {userState.isMariBankActive ? formattedMariBank : '$0.00'}
                </div>

                {userState.isMariBankActive ? (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    +${dailyReturnAmount > 0 ? dailyReturnAmount.toFixed(2) : '1.75'} / day
                  </span>
                ) : (
                  <button
                    onClick={onOpenActivation}
                    className="bg-[#FF5722] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs hover:bg-orange-600 transition-colors"
                  >
                    Activate Account
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-500 leading-snug">
                {userState.isMariBankActive
                  ? 'Compounding interest credited daily at midnight with instant liquidity.'
                  : 'Earn up to 3.5% p.a. daily interest with no minimum deposit or lock-in.'}
              </div>

              <button
                onClick={onNavigateToMariBank}
                className="text-[11px] font-bold text-[#FF5722] hover:underline flex items-center gap-0.5 pt-0.5"
              >
                <span>View Full MariBank Benefits & Simulator</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="h-[1px] bg-slate-100 w-full" />

          {/* Auto-Sweep Switch Feature */}
          <div className="flex justify-between items-center bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-100 text-[#FF5722] rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Auto-Sweep idle Cash to MariBank
                </div>
                <div className="text-[11px] text-slate-500">
                  Earn interest overnight. Keep instant spending liquidity.
                </div>
              </div>
            </div>

            <button
              onClick={onToggleAutoSweepModal}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none ${
                userState.autoSweepEnabled ? 'bg-[#FF5722]' : 'bg-slate-300'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ x: userState.autoSweepEnabled ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 grid grid-cols-4 gap-2 text-center">
          <button
            onClick={() => onOpenQuickAction('topup')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-orange-50/50 transition-colors group"
          >
            <div className="w-11 h-11 bg-orange-100/70 text-[#FF5722] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-slate-700">Top Up</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('pay')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-orange-50/50 transition-colors group"
          >
            <div className="w-11 h-11 bg-orange-100/70 text-[#FF5722] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <QrCode className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-slate-700">Pay/ Scan</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('transfer')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-orange-50/50 transition-colors group"
          >
            <div className="w-11 h-11 bg-orange-100/70 text-[#FF5722] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-slate-700">Transfer</span>
          </button>

          <button
            onClick={() => onOpenQuickAction('bank')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-orange-50/50 transition-colors group"
          >
            <div className="w-11 h-11 bg-orange-100/70 text-[#FF5722] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-slate-700">Bank</span>
          </button>
        </div>

        {/* MariBank Smart Grow Feature Banner (Vibrant Royal Blue Card) */}
        <div
          onClick={onNavigateToMariBank}
          className="bg-gradient-to-br from-[#004AD7] via-[#0055FE] to-[#0A66C2] rounded-2xl p-4 text-white shadow-xl cursor-pointer hover:opacity-95 transition-opacity relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex justify-between items-center mb-3">
            <div className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>MariBank Smart Grow</span>
            </div>

            <div className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-base font-extrabold leading-snug mb-2">
            Your idle <span className="text-amber-300">$18,332.57</span> could be earning you{' '}
            <span className="text-amber-300">${annualInterest.toFixed(2)}</span> of daily compound
            interest.
          </div>

          <div className="text-[11px] text-blue-100/90 leading-normal">
            Why leave money blank? Sweeps to MariBank takes 1 second and are regulated by Monetary
            Authority of Singapore.
          </div>
        </div>

        {/* Core Utilities Accordion Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Core Utilities
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            {/* Standard 4 items always visible */}
            <div className="flex flex-col items-center gap-1.5 p-1">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Data Topup
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                SPayLater
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-1">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Shopee Food
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-1">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Daily Rewards
              </span>
            </div>

            {/* Additional 4 items when expanded */}
            {utilitiesState === 'expanded' && (
              <>
                <div className="flex flex-col items-center gap-1.5 p-1">
                  <div className="w-12 h-12 bg-[#FF5722]/10 text-[#FF5722] rounded-2xl flex items-center justify-center font-bold text-xs">
                    Rp
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    SPinjam
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1.5 p-1">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    E-Wallet Transfer
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1.5 p-1">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Easy Invest
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1.5 p-1">
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center">
                    <Grid className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    More
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="h-[1px] bg-slate-100 w-full mt-1" />

          {/* Expand / Collapse Button */}
          <button
            onClick={() =>
              setUtilitiesState(utilitiesState === 'collapsed' ? 'expanded' : 'collapsed')
            }
            className="flex items-center justify-center gap-1 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span>{utilitiesState === 'collapsed' ? 'Expand Details' : 'Collapse Details'}</span>
            {utilitiesState === 'collapsed' ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Licensed & Regulated Digital Savings Trust Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 mb-0.5">
              Licensed and Regulated Digital Savings Trust
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              MariBank is fully licensed by the Monetary Authority of Singapore. Deposits are insured
              up to statutory limits by the SDIC system protecting your capital automatically.
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center z-30 shadow-lg">
        <button className="flex flex-col items-center gap-0.5 text-[#FF5722]">
          <Home className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={onNavigateToMariBank}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600"
        >
          <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
            Rp
          </div>
          <span className="text-[10px] font-medium">Finance</span>
        </button>

        {/* Center Prominent Pay Button */}
        <div className="-mt-7">
          <button
            onClick={() => onOpenQuickAction('pay')}
            className="w-14 h-14 bg-gradient-to-tr from-[#FF5722] to-[#FF3D00] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-transform"
          >
            <QrCode className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span className="text-[10px] font-bold text-[#FF5722] text-center block mt-0.5">Pay</span>
        </div>

        <button className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
          <ReceiptText className="w-5 h-5" />
          <span className="text-[10px] font-medium">History</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Me</span>
        </button>
      </div>
    </div>
  );
};
