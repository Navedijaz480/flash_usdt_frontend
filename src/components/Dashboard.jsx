import React from 'react';
import {
    Activity,
    TrendingUp,
    Clock,
    ArrowUpRight,
    ArrowDownLeft,
    Shield,
    Wallet,
    History as HistoryIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    {
        label: 'Network Status',
        value: 'Stable',
        icon: Activity,
        accent: 'emerald',
    },
    {
        label: 'Total Volume',
        value: '842,500',
        subtext: 'USDT',
        icon: TrendingUp,
        accent: 'indigo',
    },
    {
        label: 'Session Time',
        value: '24h 12m',
        icon: Clock,
        accent: 'blue',
    },
];

const activities = [
    {
        id: 1,
        type: 'sent',
        label: 'Transfer to',
        target: '0x71...c92d',
        amount: '50,000',
        time: '2 hours ago',
        status: 'Completed',
    },
    {
        id: 2,
        type: 'received',
        label: 'Received from',
        target: '0xDE...12bA',
        amount: '100,000',
        time: '5 hours ago',
        status: 'Completed',
    },
    {
        id: 3,
        type: 'sent',
        label: 'Transfer to',
        target: 'Binance Wallet',
        amount: '25,000',
        time: 'Yesterday',
        status: 'Completed',
    },
];

export default function Dashboard({ isWalletConnected, connectWallet }) {
    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="space-y-2.5">
                    {/* <div className="flex items-center gap-2"> */}
                    {/* <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> */}
                    {/* <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.25em]">PROTOCOL ACTIVE</span> */}
                    {/* </div> */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight font-heading leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Dashboard</span>
                    </h1>
                    <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Securely manage your assets and monitor real-time network activity with enterprise-grade infrastructure.
                    </p>
                </div>
            </header>

            {/* Premium Balance Card */}
            <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#0a0b12] to-[#08090d] p-8 sm:p-10 lg:p-12 shadow-2xl">
                {/* Visual accents */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8">
                    <div className="space-y-8 flex-1 w-full">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                <div className="w-4 h-[1px] bg-indigo-500/50" />
                                Available Balance
                            </span>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-green font-heading">
                                        500
                                    </span>
                                    <span className="text-2xl sm:text-3xl font-bold text-indigo-400/90 uppercase tracking-tight border-l border-white/10 pl-3 ml-1">USDT</span>
                                </div>

                                {!isWalletConnected && (
                                    <button
                                        onClick={connectWallet}
                                        className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-indigo-600 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20 active:translate-y-0 animate-pulse"
                                    >
                                        <Wallet size={18} />
                                        Connect Wallet
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* <button className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-indigo-600 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/20 active:translate-y-0">
                                <Wallet size={18} />
                                Deposit Funds
                            </button> */}
                            {/* <button className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-slate-200 transition-all hover:bg-white/10 hover:border-white/20">
                                <HistoryIcon size={18} className="text-indigo-400" />
                                View History
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {stats.map(({ label, value, subtext, icon: Icon, accent }) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#090a0f] to-[#08090d] p-6 transition-all hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-xl bg-${accent}-500/10 flex items-center justify-center border border-${accent}-500/10`}>
                                <Icon className={`text-${accent}-400`} size={20} />
                            </div>
                            <div className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Live</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{label}</p>
                            <div className="flex items-baseline gap-2.5">
                                <h3 className="text-2xl lg:text-3xl font-bold text-white font-heading tracking-tight">{value}</h3>
                                {subtext && <span className="text-sm font-bold text-indigo-400/80 tracking-tight">{subtext}</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Activity Section */}
            <section className="space-y-5 pt-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white font-heading tracking-tight">Activity Ledger</h2>
                        <p className="text-slate-500 text-xs font-medium mt-1">Recent internal transactions</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#08090d] divide-y divide-white/5 overflow-hidden shadow-xl">
                    {activities.map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-5 hover:bg-white/[0.01] transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activity.type === 'received'
                                    ? 'bg-emerald-500/5 text-emerald-400 group-hover:bg-emerald-500/10'
                                    : 'bg-indigo-500/5 text-indigo-400 group-hover:bg-indigo-500/10'
                                    }`}>
                                    {activity.type === 'received' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                        {activity.label} <span className="font-mono text-indigo-400 ml-1">{activity.target}</span>
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{activity.time}</p>
                                </div>
                            </div>

                            <div className="text-right space-y-0.5">
                                <p className={`text-base font-bold font-heading ${activity.type === 'received' ? 'text-emerald-400' : 'text-slate-200'
                                    }`}>
                                    {activity.type === 'received' ? '+' : '-'}{activity.amount} <span className="text-xs font-bold text-slate-500 ml-1">USDT</span>
                                </p>
                                <div className="flex items-center justify-end gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{activity.status}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <button className="w-full py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white hover:bg-white/[0.02] transition-colors">
                        View Full Ledger
                    </button>
                </div>
            </section>
        </div>
    );
}
