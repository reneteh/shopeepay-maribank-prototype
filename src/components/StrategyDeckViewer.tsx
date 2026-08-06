import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  HelpCircle,
  Lightbulb,
  Map,
  AlertTriangle,
  Layout,
  Smartphone,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { SLIDES } from '../data/presentationDeck';

interface StrategyDeckViewerProps {
  onSwitchToApp: () => void;
}

export const StrategyDeckViewer: React.FC<StrategyDeckViewerProps> = ({ onSwitchToApp }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full bg-slate-900 min-h-screen text-slate-100 p-4 md:p-8 flex flex-col items-center font-sans">
      {/* Top Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF5722] text-white rounded-xl flex items-center justify-center font-black text-lg">
            M
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Monee Design Challenge Deck
            </h1>
            <p className="text-xs text-slate-400">Rene Teh • Product Designer (UI/UX) Submission</p>
          </div>
        </div>

        <button
          onClick={onSwitchToApp}
          className="bg-gradient-to-r from-[#FF5722] to-[#FF3D00] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>View Live Mobile Prototype</span>
        </button>
      </div>

      {/* Main Slide Card Container */}
      <div className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative min-h-[500px] flex flex-col justify-between">
        {/* Slide Number Tag */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <span className="bg-[#FF5722]/20 text-[#FF5722] text-xs font-bold px-3 py-1 rounded-full border border-[#FF5722]/30">
            {currentSlide.badge}
          </span>
          <span className="text-xs text-slate-500 font-mono font-semibold">
            Slide {currentSlideIndex + 1} of {SLIDES.length}
          </span>
        </div>

        {/* Dynamic Slide Content Render */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Slide Title */}
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              {currentSlide.title}
            </h2>
            {currentSlide.subtitle && (
              <p className="text-sm md:text-base text-slate-400 mb-6 font-medium">
                {currentSlide.subtitle}
              </p>
            )}

            {/* Slide Specific Visuals */}
            {currentSlide.type === 'title' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-8">
                <div className="w-24 h-24 bg-[#0055FE] text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-400/30">
                  <div className="text-5xl font-black">monee</div>
                </div>
                <div className="max-w-xl text-slate-300 text-sm leading-relaxed">
                  A comprehensive high-fidelity redesign proposal for the ShopeePay Homepage and
                  MariBank Cross-Sell Funnel, focusing on Core UX Excellence & Strategic Ecosystem
                  Growth.
                </div>
              </div>
            )}

            {currentSlide.type === 'brief' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="bg-orange-950/40 border border-orange-500/30 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 bg-[#FF5722] text-white rounded-xl flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-extrabold text-orange-200">Core UX Excellence</h3>
                  <p className="text-xs text-orange-100/80 leading-relaxed">
                    Ensure ShopeePay's fundamental utility (balance, payments, transfers, top-ups)
                    remains intuitive, frictionless, and accessible for a massive, diverse user base.
                  </p>
                </div>

                <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="w-10 h-10 bg-[#0055FE] text-white rounded-xl flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-extrabold text-blue-200">Strategic Growth</h3>
                  <p className="text-xs text-blue-100/80 leading-relaxed">
                    Optimize the "Cross-Sell" funnel for Monee products. Specifically driving
                    MariBank account openings and increasing deposit rates as our core business priority.
                  </p>
                </div>
              </div>
            )}

            {currentSlide.type === 'problem' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="max-w-3xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
                  <div className="text-xl md:text-2xl font-black text-white leading-relaxed">
                    "Users enter ShopeePay primarily to complete wallet-related tasks, creating{' '}
                    <span className="text-[#FF5722]">limited attention</span> for discovering and
                    engaging with <span className="text-[#FF5722]">MariBank offerings</span>."
                  </div>
                </div>
              </div>
            )}

            {currentSlide.type === 'hmw' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="max-w-3xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
                  <div className="text-xl md:text-2xl font-black text-white leading-relaxed">
                    How might we <span className="text-[#FF5722]">increase MariBank adoption and deposits</span>{' '}
                    while preserving quick and <span className="text-[#FF5722]">frictionless access</span> to ShopeePay's core wallet functions?
                  </div>
                </div>
              </div>
            )}

            {currentSlide.type === 'insights' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="bg-orange-950/30 border border-orange-500/30 p-5 rounded-2xl">
                  <div className="text-[#FF5722] font-black text-sm uppercase mb-2">Insight 1</div>
                  <div className="text-sm font-bold text-white mb-2">Transactional Intent</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Users primarily open ShopeePay to pay, transfer, top up, or check balances quickly.
                  </p>
                </div>

                <div className="bg-blue-950/30 border border-blue-500/30 p-5 rounded-2xl">
                  <div className="text-blue-400 font-black text-sm uppercase mb-2">Insight 2</div>
                  <div className="text-sm font-bold text-white mb-2">Higher Commitment</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Opening a bank account requires trust. Users need to understand benefits and feel confident before depositing money.
                  </p>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 p-5 rounded-2xl">
                  <div className="text-emerald-400 font-black text-sm uppercase mb-2">Insight 3</div>
                  <div className="text-sm font-bold text-white mb-2">Dual Growth Metrics</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    MariBank growth depends on both account creation AND deposit activation.
                  </p>
                </div>
              </div>
            )}

            {currentSlide.type === 'journey' && (
              <div className="flex-1 overflow-x-auto py-2">
                <div className="min-w-[600px] space-y-2 text-xs">
                  <div className="grid grid-cols-3 font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                    <span>Stage</span>
                    <span>Observation</span>
                    <span>Opportunity</span>
                  </div>

                  <div className="grid grid-cols-3 p-3 bg-slate-900 rounded-xl">
                    <span className="font-bold text-white">Open ShopeePay</span>
                    <span className="text-orange-300">Creates competition for attention</span>
                    <span className="text-blue-300">Slightly elevate MariBank visibility inside core landing</span>
                  </div>

                  <div className="grid grid-cols-3 p-3 bg-slate-900/60 rounded-xl">
                    <span className="font-bold text-white">Discover MariBank</span>
                    <span className="text-orange-300">No immediate explanatory visual hooks</span>
                    <span className="text-blue-300">Communicate core high-yield benefit earlier</span>
                  </div>

                  <div className="grid grid-cols-3 p-3 bg-slate-900 rounded-xl">
                    <span className="font-bold text-white">Evaluate MariBank</span>
                    <span className="text-orange-300">Need to process interest & safety info</span>
                    <span className="text-blue-300">Simplify compound decision-making & regulatory trust</span>
                  </div>

                  <div className="grid grid-cols-3 p-3 bg-slate-900/60 rounded-xl">
                    <span className="font-bold text-white">Build Trust</span>
                    <span className="text-orange-300">Requires higher level of trust</span>
                    <span className="text-blue-300">Ensure digital institution feels secure & endorsed by MAS</span>
                  </div>
                </div>
              </div>
            )}

            {currentSlide.type === 'strategy' && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-4">
                {[
                  'Increase MariBank visibility at relevant moments',
                  "Communicate MariBank's value proposition clearly",
                  'Reinforce the benefits of depositing funds',
                  'Build trust and reduce onboarding friction',
                  'Preserve quick access to core wallet functions',
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 rounded-2xl flex flex-col justify-between text-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF5722] text-white font-bold flex items-center justify-center mx-auto text-xs">
                      {idx + 1}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-2">{pillar}</div>
                  </div>
                ))}
              </div>
            )}

            {currentSlide.type === 'friction' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-red-400">Friction 1: Split Attention</div>
                  <p className="text-xs text-slate-300">
                    Main balance banner shunts "Link SeaBank to get 3.5%" while right side promotes "MariBank Savings". Confusingly splits user focus.
                  </p>
                </div>

                <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-red-400">Friction 2: Flat Text Widget</div>
                  <p className="text-xs text-slate-300">
                    MariBank was crammed into a small dual-stacked widget without explanation of interest structure or compounding benefit.
                  </p>
                </div>

                <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-red-400">Friction 3: Diluted Hierarchy</div>
                  <p className="text-xs text-slate-300">
                    SPayLater credit bonus was positioned directly beside MariBank savings, competing saving vs borrowing.
                  </p>
                </div>

                <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-red-400">Friction 4: Visual Overload</div>
                  <p className="text-xs text-slate-300">
                    Multiple utility services presented with equal priority, increasing scanning effort.
                  </p>
                </div>
              </div>
            )}

            {currentSlide.type === 'redesign' && (
              <div className="flex flex-col gap-4 py-2">
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-emerald-400">ShopeePay Homepage UX Solutions:</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong>Segmented Tab Switch:</strong> Seamless switching between Wallet Spending & MariBank 3.5% Savings.</li>
                    <li><strong>1-Click Auto-Sweep:</strong> Toggle to automatically move idle cash to MariBank overnight.</li>
                    <li><strong>Tactile Calculator Card:</strong> Converts abstract 3.5% into clear dollar amounts ($641.64 daily compound interest).</li>
                    <li><strong>Expandable Core Utilities:</strong> Reduces visual clutter while keeping secondary services accessible.</li>
                    <li><strong>SDIC / MAS Regulatory Badge:</strong> Instantly establishes bank-grade trust near the top balance.</li>
                  </ul>
                </div>

                <button
                  onClick={onSwitchToApp}
                  className="w-full bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-orange-600 transition-colors text-center"
                >
                  Interactive Prototype Ready — Click to Test ShopeePay Redesign
                </button>
              </div>
            )}

            {currentSlide.type === 'landing' && (
              <div className="flex flex-col gap-4 py-2">
                <div className="bg-blue-950/30 border border-blue-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-blue-400">MariBank Landing Page UX Solutions:</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong>Interactive Tactile Value Simulator:</strong> Real-time slider calculating daily compound yields.</li>
                    <li><strong>$100 Welcome Bonus Voucher:</strong> Immediate reward hook for first-time MariBank members.</li>
                    <li><strong>3-Step Biometric Onboarding:</strong> Face Scan → ID Secure → Earn Daily preview reduces activation drop-off.</li>
                    <li><strong>Virtual Mari Debit Card:</strong> Displays 0.5% cashback & zero FX fee perks.</li>
                  </ul>
                </div>

                <button
                  onClick={onSwitchToApp}
                  className="w-full bg-[#0055FE] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-blue-600 transition-colors text-center"
                >
                  Interactive Prototype Ready — Click to Test MariBank Landing Page
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation Bar for Slides */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs px-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'bg-[#FF5722] w-6'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="px-4 py-2 bg-[#FF5722] text-white rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-orange-600 transition-colors flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
