import React, { useState } from 'react';
import { Screen, UserAccountState } from './types';
import { TopNavbar } from './components/TopNavbar';
import { MobileFrame } from './components/MobileFrame';
import { ShopeePayHomepage } from './components/ShopeePayHomepage';
import { MariBankLanding } from './components/MariBankLanding';
import { ActivationScreen } from './components/ActivationScreen';
import { AutoSweepModal } from './components/AutoSweepModal';
import { QuickActionModals } from './components/QuickActionModals';
import { StrategyDeckViewer } from './components/StrategyDeckViewer';

const DEFAULT_USER_STATE: UserAccountState = {
  shopeePayBalance: 18332.57,
  mariBankBalance: 0.0,
  isMariBankActive: false,
  autoSweepEnabled: false,
  claimedBonus: false,
  notificationCount: 8,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('shopeepay');
  const [userState, setUserState] = useState<UserAccountState>(DEFAULT_USER_STATE);

  // Modals state
  const [isAutoSweepOpen, setIsAutoSweepOpen] = useState(false);
  const [quickAction, setQuickAction] = useState<'topup' | 'pay' | 'transfer' | 'bank' | null>(
    null
  );
  const [showMobileFrame, setShowMobileFrame] = useState(true);

  // State Mutators
  const updateState = (newState: Partial<UserAccountState>) => {
    setUserState((prev) => ({ ...prev, ...newState }));
  };

  const handleTopUp = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      shopeePayBalance: prev.shopeePayBalance + amount,
    }));
  };

  const handleTransfer = (amount: number) => {
    if (userState.shopeePayBalance >= amount) {
      setUserState((prev) => ({
        ...prev,
        shopeePayBalance: prev.shopeePayBalance - amount,
      }));
    }
  };

  const handleToggleAutoSweep = (enabled: boolean) => {
    setUserState((prev) => ({
      ...prev,
      autoSweepEnabled: enabled,
    }));
  };

  const handleCompleteActivation = (initialDeposit: number = 500) => {
    const depositToUse = Math.min(initialDeposit, userState.shopeePayBalance);
    setUserState((prev) => ({
      ...prev,
      isMariBankActive: true,
      shopeePayBalance: prev.shopeePayBalance - depositToUse,
      mariBankBalance: prev.mariBankBalance + depositToUse,
    }));
  };

  const handleClaimBonus = () => {
    if (!userState.claimedBonus) {
      setUserState((prev) => ({
        ...prev,
        claimedBonus: true,
        mariBankBalance: prev.mariBankBalance + 100,
      }));
    }
  };

  const handleResetSimulation = () => {
    setUserState(DEFAULT_USER_STATE);
    setCurrentScreen('shopeepay');
    setIsAutoSweepOpen(false);
    setQuickAction(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-[#FF5722] selection:text-white">
      {/* Top Controls Bar */}
      <TopNavbar
        currentScreen={currentScreen}
        onNavigateScreen={setCurrentScreen}
        userState={userState}
        onResetSimulation={handleResetSimulation}
        showMobileBorder={showMobileFrame}
        onToggleMobileBorder={() => setShowMobileFrame(!showMobileFrame)}
      />

      {/* Main Content Area */}
      {currentScreen === 'deck' ? (
        <StrategyDeckViewer onSwitchToApp={() => setCurrentScreen('shopeepay')} />
      ) : (
        <MobileFrame showFrame={showMobileFrame}>
          {currentScreen === 'shopeepay' && (
            <ShopeePayHomepage
              userState={userState}
              onUpdateState={updateState}
              onNavigateToMariBank={() => setCurrentScreen('maribank')}
              onOpenQuickAction={setQuickAction}
              onToggleAutoSweepModal={() => setIsAutoSweepOpen(true)}
              onOpenActivation={() => setCurrentScreen('activation')}
            />
          )}

          {currentScreen === 'maribank' && (
            <MariBankLanding
              userState={userState}
              onNavigateBack={() => setCurrentScreen('shopeepay')}
              onOpenActivationModal={() => setCurrentScreen('activation')}
              onClaimBonus={handleClaimBonus}
            />
          )}

          {currentScreen === 'activation' && (
            <ActivationScreen
              userState={userState}
              onNavigateBack={() => setCurrentScreen('shopeepay')}
              onCompleteActivation={handleCompleteActivation}
              onNavigateToMariBank={() => setCurrentScreen('maribank')}
            />
          )}
        </MobileFrame>
      )}

      {/* Global Modals */}
      <AutoSweepModal
        isOpen={isAutoSweepOpen}
        onClose={() => setIsAutoSweepOpen(false)}
        autoSweepEnabled={userState.autoSweepEnabled}
        onToggleAutoSweep={handleToggleAutoSweep}
        shopeePayBalance={userState.shopeePayBalance}
      />

      <QuickActionModals
        activeAction={quickAction}
        onClose={() => setQuickAction(null)}
        shopeePayBalance={userState.shopeePayBalance}
        onTopUp={handleTopUp}
        onTransfer={handleTransfer}
      />
    </div>
  );
}
