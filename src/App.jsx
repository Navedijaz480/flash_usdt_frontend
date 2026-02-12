import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Send,
  History,
  Wallet,
  LogOut,
  Bell,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Dashboard from './components/Dashboard';
import TransferModule from './components/TransferForm';
import HistoryModule from './components/History';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const connectWallet = async () => {
    console.log('Connect Wallet clicked');

    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask extension from https://metamask.io/download/');
      console.error('MetaMask not detected');
      return;
    }

    try {
      console.log('Requesting accounts from MetaMask...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log('Accounts received:', accounts);

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
        console.log('Wallet connected successfully:', accounts[0]);
      } else {
        console.error('No accounts found');
        alert('No accounts found. Please unlock MetaMask and try again.');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);

      if (error.code === 4001) {
        // User rejected the request
        alert('Connection request rejected. Please approve the connection in MetaMask.');
      } else if (error.code === -32002) {
        // Request already pending
        alert('Connection request already pending. Please check MetaMask.');
      } else {
        alert(`Failed to connect wallet: ${error.message}`);
      }
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transfer', label: 'Transfer', icon: Send },
    { id: 'history', label: 'History', icon: History }
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-[#05060b] text-slate-200 font-sans overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#08090d]/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-between px-8">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white font-heading">FLASH</div>
              <div className="text-[10px] text-indigo-400/80 uppercase tracking-[0.2em] font-bold">Protocol</div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <div className="px-4 mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Navigation</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${activeTab === item.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                {/* Vibrant Background Effect */}
                {activeTab === item.id ? (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent border-l-2 border-indigo-500"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300" />
                )}

                {/* Animated Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  <item.icon
                    size={20}
                    className={`transition-all duration-300 ${activeTab === item.id
                      ? 'text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]'
                      : 'text-slate-500 group-hover:text-slate-300 group-hover:scale-110'
                      }`}
                  />
                </div>

                {/* Label */}
                <span className={`relative z-10 font-bold text-sm tracking-tight transition-all duration-300 ${activeTab === item.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`}>
                  {item.label}
                </span>

                {/* Subtle Right Indicator for Active */}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute right-4 w-1 h-1 rounded-full bg-indigo-400"
                    transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User / Bottom Section */}
        <div className="p-6 border-t border-white/5 bg-[#08090d]/50">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
            <div className="relative flex items-center justify-center">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold tracking-tight">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Modern Header */}
        <header className="h-24 flex items-center justify-between px-6 border-b border-white/5 bg-[#05060b]/80 backdrop-blur-2xl relative z-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <Menu size={22} />
            </button>

            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-500/90 uppercase tracking-widest">
                Protocol Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex w-11 h-11 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5 relative group">
              <Bell size={19} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#05060b]"></span>
            </button>

            <button
              onClick={connectWallet}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 h-10 sm:h-11 rounded-xl font-bold text-[12px] sm:text-sm transition-all duration-300
              ${isWalletConnected
                  ? 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5'
                }`}
            >
              <Wallet size={19} />
              <span className="tracking-tight">
                {isWalletConnected
                  ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard
                    isWalletConnected={isWalletConnected}
                    connectWallet={connectWallet}
                  />
                )}
                {activeTab === 'transfer' && <TransferModule />}
                {activeTab === 'history' && <HistoryModule />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <div className="fixed bottom-0 inset-x-0 h-16 bg-[#0d0e12]/98 backdrop-blur-xl border-t border-slate-800/50 flex justify-around items-center lg:hidden z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${activeTab === item.id
                ? 'text-indigo-400'
                : 'text-slate-500'
                }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
