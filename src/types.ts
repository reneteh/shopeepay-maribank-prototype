import React from 'react';

export type Screen = 'shopeepay' | 'maribank' | 'deck' | 'activation';

export type CoreUtilitiesState = 'collapsed' | 'expanded';

export interface UserAccountState {
  shopeePayBalance: number;
  mariBankBalance: number;
  isMariBankActive: boolean;
  autoSweepEnabled: boolean;
  claimedBonus: boolean;
  notificationCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ActivationStep {
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  instruction: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  content: React.ReactNode;
}
