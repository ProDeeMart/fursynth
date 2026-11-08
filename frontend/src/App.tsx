import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CommissionFormSection } from './components/CommissionFormSection';
import { QueueTrackerSection } from './components/QueueTrackerSection';
import { PricingTosSection } from './components/PricingTosSection';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import type { PortfolioItem, Order, User } from './types';
import { api, getStoredUser } from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedAvatarForCommission, setSelectedAvatarForCommission] = useState<string>('');
  const [searchedOrderCode, setSearchedOrderCode] = useState<string>('');

  // Initial load
  useEffect(() => {
    // Check saved user session
    const savedUser = getStoredUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    // Load portfolio and orders
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ports, ords] = await Promise.all([
        api.getPortfolio(),
        api.getQueue(),
      ]);
      setPortfolio(ports);
      setOrders(ords);
    } catch {
      // API fallback handles error internally
    }
  };

  const handleOrderCreated = (orderCode: string) => {
    setSearchedOrderCode(orderCode);
    loadData();
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentTab('admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col relative selection:bg-orange-500/20 selection:text-orange-600">

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pt-4">
        {currentTab === 'home' && (
          <>
            <HeroSection
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            
            {/* Featured Portfolio Showcase on Home */}
            <div className="border-t border-slate-200/80 pt-4">
              <PortfolioSection
                portfolio={portfolio}
                setCurrentTab={setCurrentTab}
                setSelectedAvatarForCommission={setSelectedAvatarForCommission}
              />
            </div>
          </>
        )}

        {currentTab === 'portfolio' && (
          <div className="pt-8">
            <PortfolioSection
              portfolio={portfolio}
              setCurrentTab={setCurrentTab}
              setSelectedAvatarForCommission={setSelectedAvatarForCommission}
            />
          </div>
        )}

        {currentTab === 'commission' && (
          <div className="pt-8">
            <CommissionFormSection
              initialSelectedAvatar={selectedAvatarForCommission}
              setCurrentTab={setCurrentTab}
              onOrderCreated={handleOrderCreated}
            />
          </div>
        )}

        {currentTab === 'queue' && (
          <div className="pt-8">
            <QueueTrackerSection
              orders={orders}
              searchedCode={searchedOrderCode}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}

        {currentTab === 'pricing' && (
          <div className="pt-8">
            <PricingTosSection setCurrentTab={setCurrentTab} />
          </div>
        )}

        {currentTab === 'admin' && (
          <div className="pt-8">
            {currentUser?.role === 'admin' ? (
              <AdminDashboard orders={orders} onRefreshOrders={loadData} />
            ) : (
              <div className="py-24 text-center max-w-md mx-auto space-y-4">
                <p className="text-slate-500 font-medium">คุณต้องเข้าสู่ระบบในฐานะแอดมินเพื่อเข้าถึงหน้านี้</p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  เข้าสู่ระบบแอดมิน
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}

export default App;
