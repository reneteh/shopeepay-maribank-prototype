import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MoreHorizontal,
  ShieldCheck,
  HelpCircle,
  Gift,
  ChevronRight,
  ChevronDown,
  Check,
  CreditCard,
  Sparkles,
  Zap,
  Lock,
  Scan,
  TrendingUp,
  Landmark,
  CircleDollarSign,
  ArrowRightLeft,
  ScanFace,
} from 'lucide-react';
import { UserAccountState, ActivationStep } from '../types';
import { FAQS } from '../data/presentationDeck';

interface MariBankLandingProps {
  userState: UserAccountState;
  onNavigateBack: () => void;
  onOpenActivationModal: () => void;
  onClaimBonus: () => void;
}

export const MariBankLanding: React.FC<MariBankLandingProps> = ({
  userState,
  onNavigateBack,
  onOpenActivationModal,
  onClaimBonus,
}) => {
  const [estimatedDeposit, setEstimatedDeposit] = useState<number>(5000);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Dynamic calculations for the tactile simulator
  const dailyReturn = (estimatedDeposit * 0.035) / 365;
  const annualReturn = estimatedDeposit * 0.035;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full bg-[#F5F5F7] min-h-full pb-28 flex flex-col font-sans relative text-slate-800">
      {/* Top Mobile Status Header */}
      <div className="bg-[#FF5722] text-white px-5 pt-3 pb-1 flex justify-between items-center text-xs font-semibold tracking-tight shrink-0">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-4 h-2.5 border border-white rounded-[2px] flex items-center p-0.5">
            <div className="bg-white w-full h-full rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Screen Title Bar */}
      <div className="bg-[#FF5722] text-white px-4 py-3 flex items-center justify-between shadow-xs shrink-0">
        <button
          onClick={onNavigateBack}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <span className="font-bold text-base tracking-tight">MariBank Savings</span>
        <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
          <MoreHorizontal className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="bg-[#FF5000] text-white pt-6 pb-10 px-5 text-center rounded-b-[2.5rem] relative overflow-hidden shadow-sm">
        {/* Decorative subtle waves */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/15 to-transparent pointer-events-none" />

        <div className="flex flex-col items-center gap-2.5 relative z-10 max-w-[360px] mx-auto">
          {/* MariBank Circular Logo */}
          <div className="w-16 h-16 bg-white text-[#FF5000] rounded-full flex items-center justify-center shadow-md border-2 border-orange-100">
            <div className="w-12 h-12 bg-[#FF5000] text-white rounded-full flex flex-col items-center justify-center font-black text-2xl tracking-tighter shadow-inner">
              <span>M</span>
              <div className="w-5 h-0.5 border-b-2 border-white rounded-full -mt-1" />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">MariBank Savings</h1>
          <p className="text-xs text-orange-100 font-medium tracking-wide">Daily Interest with No Conditions</p>

          {/* Licensed MAS Badge - Clean 2 Lines */}
          <div className="mt-2.5 bg-white text-slate-900 px-4 py-2.5 rounded-2xl text-[11px] font-bold flex items-center justify-center gap-2 shadow-sm border border-orange-100 max-w-[290px] text-center">
            <ShieldCheck className="w-4 h-4 text-[#FF5000] shrink-0" />
            <div className="leading-tight text-center">
              <div className="text-slate-700 font-bold">MariBank is Licensed by the</div>
              <strong className="text-blue-700 font-extrabold block">Monetary Authority of Singapore</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Container Cards with Generous Spacing */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {/* Account Status Card - First Container */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-extrabold">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  userState.isMariBankActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                }`}
              />
              <span
                className={userState.isMariBankActive ? 'text-emerald-600' : 'text-[#FF5000]'}
              >
                Account Status:{' '}
                {userState.isMariBankActive ? 'Active & Earning' : 'Inactive'}
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900 tracking-tight font-sans">
              {userState.isMariBankActive
                ? `$${userState.mariBankBalance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : '$0.00'}
            </div>

            <div className="text-[11px] text-slate-500 leading-normal">
              {userState.isMariBankActive
                ? 'Deposits protected under SDIC insurance statutory limits.'
                : 'Join MariBank today to start earning interest daily.'}
            </div>
          </div>

          {/* Up to 3.5% PA Pill Badge */}
          <div className="bg-orange-50/90 px-3.5 py-3 rounded-2xl border border-orange-200/80 text-center flex flex-col items-center justify-center shrink-0 shadow-2xs">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Up to
            </span>
            <span className="text-lg font-black text-[#FF5000] leading-tight">3.5% P.A.</span>
            <span className="text-[9px] text-orange-600 font-extrabold whitespace-nowrap">daily interest</span>
          </div>
        </div>

        {/* Enjoy Your Benefits on Shopee Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-0.5">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Enjoy Your Benefits on Shopee
            </div>
            <span className="bg-[#FF5000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
              For New MariBank Members
            </span>
          </div>

          {/* Welcome Bonus Voucher Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-row items-stretch">
            {/* Left Blue Header Box */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3.5 flex flex-col items-center justify-center text-center w-28 shrink-0">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md mb-1">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs font-black leading-tight whitespace-nowrap">New Member</div>
              <div className="text-[9px] text-blue-100 whitespace-nowrap">First Checkout</div>
            </div>

            {/* Right Card Body */}
            <div className="p-3.5 flex-1 flex flex-col justify-between gap-1.5 relative">
              <div>
                <h3 className="text-sm font-black text-blue-600 tracking-tight">$100 Welcome Bonus</h3>
                <p className="text-[10.5px] text-slate-500 mt-0.5 leading-normal">
                  Min. spend $0. Link and claim this exclusive bonus added straight to your savings account.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[9.5px] text-slate-400 whitespace-nowrap">Terms & Conditions Apply</span>

                <button
                  onClick={onClaimBonus}
                  disabled={userState.claimedBonus}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs ${
                    userState.claimedBonus
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-[#FF5000] text-white hover:bg-orange-600 active:scale-95'
                  }`}
                >
                  {userState.claimedBonus ? 'Claimed ✓' : 'Claim'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tactile Value Simulator Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#FF5722]">
              <TrendingUp className="w-4 h-4" />
              <span>Tactile Value Simulator</span>
            </div>
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </div>

          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-slate-500">Your Estimated Savings</span>
            <span className="text-2xl font-black text-[#FF5722]">
              ${estimatedDeposit.toLocaleString()}
            </span>
          </div>

          {/* Range Slider */}
          <div className="flex flex-col gap-1">
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={estimatedDeposit}
              onChange={(e) => setEstimatedDeposit(Number(e.target.value))}
              className="w-full accent-[#FF5722] h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>$500</span>
              <span>$25,000</span>
              <span>$50,000</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-100/80 flex flex-col">
              <span className="text-[10px] font-bold text-[#FF5722] uppercase tracking-wider mb-0.5">
                Accumulated Daily
              </span>
              <span className="text-xl font-black text-slate-900">${dailyReturn.toFixed(2)}</span>
            </div>

            <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100/80 flex flex-col">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">
                Annual Returns
              </span>
              <span className="text-xl font-black text-blue-700">
                ${annualReturn.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* MariBank Savings Account Benefits Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-center my-1">
            <div className="h-[1px] bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider">
              MariBank Savings Account Benefits
            </span>
            <div className="h-[1px] bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="text-3xl font-black text-slate-900">3.5%</span>
              <span className="text-xs text-slate-500 font-medium mt-1">Base Interest</span>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="text-3xl font-black text-slate-900">$0</span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Transfer Overseas Fees
              </span>
            </div>
          </div>

          <div className="bg-orange-50/80 rounded-2xl p-3.5 border border-orange-100 flex items-center gap-3">
            <div className="p-2.5 bg-[#FF5722] text-white rounded-xl shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Daily Compound Ledger</div>
              <div className="text-[11px] text-slate-600 leading-snug">
                Earnings stream directly to your ledger balance transparently every morning.
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Mari Debit Card Section */}
        <div className="bg-gradient-to-br from-[#0A3BB6] via-[#004AD7] to-[#0055FE] text-white rounded-2xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/30 whitespace-nowrap">
              Virtual Mari Debit Card Included
            </div>
            <span className="text-[10px] text-blue-200 whitespace-nowrap">Elite Micro-Cashback</span>
          </div>

          <div className="flex flex-row items-stretch justify-between gap-3 my-0.5">
            {/* Left Bullet List - Spaced out nicely top-to-bottom */}
            <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
              <div className="text-xs leading-snug">
                <span className="font-extrabold text-amber-300">• 0.5% Cash-Back </span>
                <span className="text-white font-medium">on local spend</span>
              </div>

              <div className="text-xs leading-snug">
                <span className="font-extrabold text-amber-300">• 0.5% Cash-Back </span>
                <span className="text-white font-medium">on global spend</span>
              </div>

              <div className="text-xs leading-snug text-blue-100 flex items-start gap-1">
                <span className="text-amber-300 font-extrabold shrink-0">•</span>
                <span>Absolute zero FX transaction fees</span>
              </div>

              <div className="text-xs leading-snug text-blue-100 flex items-start gap-1">
                <span className="text-amber-300 font-extrabold shrink-0">•</span>
                <span>Real-time interbank clearance spreads</span>
              </div>

              <div className="text-xs leading-snug text-blue-100 flex items-start gap-1">
                <span className="text-amber-300 font-extrabold shrink-0">•</span>
                <span>Zero monthly minimum limits</span>
              </div>
            </div>

            {/* Vertical Debit Card Illustration matching attached Orange Card */}
            <div className="w-[125px] h-[190px] shrink-0 bg-[#FF5000] rounded-2xl p-3 text-white shadow-xl flex flex-col justify-between border border-white/30 relative overflow-hidden font-sans">
              {/* Top Row: Emblem Logo + Golden Chip */}
              <div className="flex justify-between items-start">
                {/* MariBank Emblem */}
                <div className="w-7 h-7 bg-white rounded-full flex flex-col items-center justify-center p-0.5 shadow-sm shrink-0">
                  <div className="w-5 h-5 bg-[#FF5000] text-white rounded-full flex items-center justify-center font-black text-[9px] leading-none">
                    M
                  </div>
                  <div className="w-3.5 h-0.5 border-b-2 border-[#FF5000] rounded-full -mt-0.5" />
                </div>

                {/* Golden Chip */}
                <div className="w-7 h-5 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 rounded-sm border border-amber-600/50 p-0.5 flex flex-col justify-between shadow-xs">
                  <div className="w-full h-1/2 border-b border-amber-700/40" />
                  <div className="w-1/2 h-full border-r border-amber-700/40" />
                </div>
              </div>

              {/* Yellow Smile Face */}
              <div className="my-0.5 pl-0.5 text-amber-300 opacity-95">
                <svg className="w-8 h-7" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
                  <path d="M 20 25 C 15 15, 30 10, 38 22 C 46 10, 61 15, 56 25" stroke="currentColor" fill="none" strokeWidth="6" />
                  <circle cx="30" cy="38" r="4" fill="currentColor" />
                  <circle cx="58" cy="38" r="4" fill="currentColor" />
                  <path d="M 22 50 C 35 70, 65 70, 78 50" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </div>

              {/* Stacked Mari Bank Typography */}
              <div className="z-10 mt-auto">
                <div className="text-xl font-black leading-none tracking-tight text-white drop-shadow-xs">
                  Mari
                </div>
                <div className="text-xl font-black leading-none tracking-tight text-white drop-shadow-xs">
                  Bank
                </div>
                <div className="w-16 h-1 bg-amber-300 rounded-full mt-1" />
              </div>

              {/* Bottom Right Mastercard Circles */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center">
                <div className="w-4 h-4 bg-[#EB001B] rounded-full opacity-95 shadow-xs" />
                <div className="w-4 h-4 bg-[#F79E1B] rounded-full -ml-2 opacity-90 shadow-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Utilities Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-center my-1">
            <div className="h-[1px] bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider">
              Ecosystem Utilities
            </span>
            <div className="h-[1px] bg-slate-200 flex-1" />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Free unlimited top up to ShopeePay
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  Link your account securely once to make fast, instant $0 wallet transfer anytime.
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-slate-100 w-full" />

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Pay QR & bills with MariBank Savings Balance
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  Link your account securely once to make fast, instant $0 wallet transfer anytime.
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-slate-100 w-full" />

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <CircleDollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  No admin fees for payment and transfers
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  No surprise maintenance fees, fall-below clearance charges, or subscription
                  costs.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Activate MariBank Savings Account (Interactive Onboarding Feature) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FF5722]">
              How to Activate MariBank Savings Account
            </span>
            <HelpCircle className="w-4 h-4 text-slate-300" />
          </div>

          {/* Interactive Step Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-center text-xs font-bold">
            <button
              onClick={() => setActiveStepTab(1)}
              className={`py-2 rounded-lg transition-all ${
                activeStepTab === 1 ? 'bg-[#FF5722] text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Step 1: Face Scan
            </button>
            <button
              onClick={() => setActiveStepTab(2)}
              className={`py-2 rounded-lg transition-all ${
                activeStepTab === 2 ? 'bg-[#FF5722] text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Step 2: ID Secure
            </button>
            <button
              onClick={() => setActiveStepTab(3)}
              className={`py-2 rounded-lg transition-all ${
                activeStepTab === 3 ? 'bg-[#FF5722] text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Step 3: Earn Daily
            </button>
          </div>

          {/* Active Step Content */}
          <div className="flex flex-col gap-2 pt-1">
            {activeStepTab === 1 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Secure Biometric Verification</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Secure
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Secure match biometric markers with a lightning-fast 4-second facial scan inside
                  the encrypted frame.
                </p>

                {/* Face Scan View Graphic */}
                <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-center gap-3 relative overflow-hidden my-1 shadow-inner border border-slate-800">
                  <div className="w-24 h-24 border-2 border-dashed border-cyan-400 rounded-full flex items-center justify-center relative animate-pulse">
                    <ScanFace className="w-12 h-12 text-cyan-400" />
                  </div>
                  <span className="text-[11px] text-cyan-300 font-medium">
                    Align your face in the highlighted area
                  </span>
                </div>
              </div>
            )}

            {activeStepTab === 2 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Algorithmic OCR Document Scan</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Encrypted
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Simply scan standard citizenship/work documents to immediately extract secure details.
                </p>

                {/* ID OCR Scan Graphic */}
                <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-center gap-3 relative overflow-hidden my-1 shadow-inner border border-slate-800">
                  <div className="w-36 h-20 border-2 border-slate-700 bg-slate-900/80 rounded-xl p-2 flex flex-col justify-between relative">
                    <div className="w-8 h-8 rounded-full bg-slate-700" />
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-700 rounded w-3/4" />
                      <div className="h-1.5 bg-slate-700 rounded w-1/2" />
                    </div>
                    <div className="absolute inset-x-0 h-0.5 bg-cyan-400 top-1/2 shadow-[0_0_8px_#22d3ee] animate-bounce" />
                  </div>
                  <span className="text-[11px] text-cyan-300 font-medium">Scanning OCR</span>
                </div>
              </div>
            )}

            {activeStepTab === 3 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Instant Balance Accumulation</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Compounding
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Your money is secured under the SDIC deposit safety framework, compiling 3.5%
                  interest daily with premium liquidity.
                </p>

                {/* Earn Daily Graphic */}
                <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col items-center justify-center gap-2 relative overflow-hidden my-1 shadow-inner border border-slate-800">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 w-full max-w-[200px] text-center">
                    <div className="text-[10px] text-slate-400">MariBank Balance</div>
                    <div className="text-xl font-black text-emerald-400 mt-1">$100.00</div>
                    <div className="text-[9px] text-cyan-300 mt-2 font-mono">
                      + $0.01 daily interest credited
                    </div>
                  </div>
                  <span className="text-[11px] text-cyan-300 font-medium">Estimated Balance</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-center my-1">
            <div className="h-[1px] bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <div className="h-[1px] bg-slate-200 flex-1" />
          </div>

          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex flex-col gap-2"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="flex justify-between items-center text-left gap-2 w-full"
                  >
                    <span className="text-xs font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#FF5722] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-4 z-30 shadow-2xl">
        <button
          onClick={onOpenActivationModal}
          className="w-full bg-gradient-to-r from-[#FF5722] to-[#FF3D00] text-white py-3.5 rounded-2xl font-black text-sm tracking-wide shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>{userState.isMariBankActive ? 'View Active Account' : 'Activate Now'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
