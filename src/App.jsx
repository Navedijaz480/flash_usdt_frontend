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
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      }
    } catch (error) {
      console.error('Connection error', error);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transfer', label: 'Send Assets', icon: Send },
    { id: 'history', label: 'Transaction History', icon: History }
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      {/* Sidebar - Matching Admin Aesthetic */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#020617] border-r border-[#1e293b] flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">FLASH PROTOCOL</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm
                ${activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-[#1e293b] hover:text-white'
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e293b]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-semibold text-sm">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020617]">
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#1e293b] bg-[#020617]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#1e293b] text-white"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Mainnet Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isWalletConnected ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#1e293b] border border-[#334155]">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-mono text-slate-300">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
              >
                Connect Wallet
              </button>
            )}
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
                {activeTab === 'transfer' && (
                  <TransferModule
                    isWalletConnected={isWalletConnected}
                    walletAddress={walletAddress}
                  />
                )}
                {activeTab === 'history' && (
                  <HistoryModule
                    isWalletConnected={isWalletConnected}
                    walletAddress={walletAddress}
                  />
                )}
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
