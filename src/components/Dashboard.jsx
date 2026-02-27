import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Clock, Wallet, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ isWalletConnected, connectWallet }) => {
    const [balance, setBalance] = useState('0');
    const [stats, setStats] = useState({
        volume: '0',
        transactions: '0',
        activeUsers: '0'
    });
    const [activities, setActivities] = useState([]);
    const [isLoadingActivity, setIsLoadingActivity] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch platform stats
                const statsRes = await fetch('http://localhost:5000/api/admin/stats');
                const statsData = await statsRes.json();
                if (statsData.success) {
                    setStats({
                        volume: statsData.stats.totalVolume,
                        transactions: statsData.stats.totalTransactions,
                        activeUsers: statsData.stats.activeUsers
                    });
                }

                // Fetch transactions for activity feed
                const txRes = await fetch('http://localhost:5000/api/admin/transactions');
                const txData = await txRes.json();
                if (Array.isArray(txData)) {
                    setActivities(txData);
                }

                // Fetch balance
                if (isWalletConnected && walletAddress) {
                    const balanceRes = await fetch(`http://localhost:5000/api/balance/${walletAddress}`);
                    const balanceData = await balanceRes.json();
                    if (balanceData.success) {
                        setBalance(balanceData.balance);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            } finally {
                setIsLoadingActivity(false);
            }
        };

        fetchData();
    }, [isWalletConnected]);

    const cards = [
        { label: 'Available Balance', value: balance, sub: 'USDT', icon: Wallet, color: 'text-emerald-400' },
        { label: 'Platform Volume', value: stats.volume, sub: 'USDT', icon: TrendingUp, color: 'text-blue-400' },
        { label: 'Total Indexing', value: stats.transactions, sub: 'TXs', icon: Activity, color: 'text-indigo-400' }
    ];

    return (
        <div className="space-y-10 py-6">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Protocol Overview</h1>
                <p className="text-slate-400 text-sm">Real-time telemetry and asset management on Ethereum Mainnet.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 shadow-sm hover:border-blue-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-[#1e293b] ${card.color}`}>
                                <card.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{card.label}</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{card.value}</span>
                            <span className="text-xs font-bold text-slate-500">{card.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-white">Platform Activity</h2>
                    <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                        View Network Ledger
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Activity Feed */}
                    {isLoadingActivity ? (
                        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-500" /></div>
                    ) : (
                        activities.length > 0 ? (
                            activities.slice(0, 5).map((activity, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-[#1e293b]/20 rounded-xl border border-[#1e293b] hover:border-blue-500/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.type === 'transfer' ? 'text-blue-400' : 'text-emerald-400'}`}>
                                            {activity.type === 'transfer' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase tracking-tight">{activity.type}</div>
                                            <div className="text-[10px] text-slate-500 font-mono">{activity.user || activity.to}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-white">{activity.amount} {activity.asset}</div>
                                        <div className="text-[10px] text-slate-600">{activity.time}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center p-12 bg-[#020617] rounded-xl border border-dashed border-[#1e293b]">
                                <div className="text-center">
                                    <Activity size={32} className="text-slate-700 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm font-medium">No recent activity detected.</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
