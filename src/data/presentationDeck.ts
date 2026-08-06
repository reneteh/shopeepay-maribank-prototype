export interface SlideInfo {
  id: number;
  badge: string;
  title: string;
  subtitle?: string;
  type: 'title' | 'brief' | 'problem' | 'hmw' | 'insights' | 'journey' | 'strategy' | 'friction' | 'redesign' | 'landing';
}

export const SLIDES: SlideInfo[] = [
  {
    id: 1,
    badge: 'Monee Product Designer (UI/UX) – Design Challenge',
    title: 'Monee Product Design Challenge',
    subtitle: 'ShopeePay Homepage & MariBank Cross-Sell Redesign Proposal',
    type: 'title',
  },
  {
    id: 2,
    badge: 'Project Brief',
    title: 'Core Objectives & Scope',
    subtitle: 'Balancing Core Wallet Utility with Strategic Ecosystem Growth',
    type: 'brief',
  },
  {
    id: 3,
    badge: 'Problem Statement',
    title: 'Limited Attention for Banking Products',
    subtitle: 'High transactional intent leaves little cognitive room for MariBank discovery.',
    type: 'problem',
  },
  {
    id: 4,
    badge: 'HMW Statement',
    title: 'How Might We...',
    subtitle: 'Increase MariBank adoption & deposits while preserving frictionless core wallet access?',
    type: 'hmw',
  },
  {
    id: 5,
    badge: 'Key Insights',
    title: 'Behavioral & Psychological Drivers',
    subtitle: 'Understanding user intent and commitment thresholds in e-wallets vs digital banks.',
    type: 'insights',
  },
  {
    id: 6,
    badge: 'User Journey Map',
    title: 'From Wallet Intent to Bank Conversion',
    subtitle: 'Identifying observations and strategic opportunities at each stage.',
    type: 'journey',
  },
  {
    id: 7,
    badge: 'Product Strategy',
    title: 'Strategic Solution Pillars',
    subtitle: 'Five core pillars driving high-conversion UX for MariBank.',
    type: 'strategy',
  },
  {
    id: 8,
    badge: 'ShopeePay Homepage Analysis',
    title: 'Current Friction Points',
    subtitle: 'Deconstructing visual clutter and cognitive overload in the legacy layout.',
    type: 'friction',
  },
  {
    id: 9,
    badge: 'ShopeePay Redesign Wireframe',
    title: 'ShopeePay Homepage UX Solutions',
    subtitle: 'High-fidelity redesign focused on clarity, auto-sweep, and contextual cross-sell.',
    type: 'redesign',
  },
  {
    id: 10,
    badge: 'MariBank Landing Page Design',
    title: 'MariBank High-Conversion Onboarding',
    subtitle: 'Interactive value simulation, trust signals, and 3-step activation UX.',
    type: 'landing',
  },
];

export const FAQS = [
  {
    id: '1',
    question: 'What is MariBank?',
    answer:
      'MariBank is a digital bank licensed by the Monetary Authority of Singapore (MAS) and a wholly owned subsidiary of Sea Limited. It offers high-yield savings accounts with daily interest compounding, zero minimum deposit requirements, and no lock-in periods.',
  },
  {
    id: '2',
    question:
      'Am I providing my personal information / MariBank account information to Shopee when I access MariBank services from the Shopee App?',
    answer:
      'Your privacy and financial data security are paramount. Accessing MariBank via ShopeePay uses secure tokenized single sign-on (SSO). Personal data is protected under MAS regulations and statutory SDIC insurance up to statutory limits.',
  },
  {
    id: '3',
    question: 'What MariBank features can I access from the Shopee App?',
    answer:
      'Directly within ShopeePay, you can check your MariBank savings balance, enable 1-click Auto-Sweep for idle funds, transfer instantly between wallet and bank with $0 fees, and claim exclusive member cashback vouchers.',
  },
];
