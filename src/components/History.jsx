import React, { useState } from 'react';
import {
    Activity,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Download,
    Filter,
    ExternalLink
} from 'lucide-react';

const HistoryModule = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const transactions = [
        {
            id: 1,
            type: 'TRANSFER',
            hash: '0xbaac4bc5f397ee4a40cb6e1580a80d8b10bab',
            recipient: '0x71C7a2c92D5f397ee4a40cb6e1580a80d8b10bab',
            amount: '100,000',
            status: 'Completed',
            date: '2024-05-20 14:32',
            network: 'Ethereum'
        },
        {
            id: 2,
            type: 'TRANSFER',
            hash: '0x71a2c92d5f397ee4a40cb6e1580a80d8b10bab',
            recipient: '0xDE0412bA5f397ee4a40cb6e1580a80d8b10bab',
            amount: '25,000',
            status: 'Pending',
            date: '2024-05-20 14:30',
            network: 'BSC'
        },
        {
            id: 3,
            type: 'RECEIVED',
            hash: '0xde0412b5f397ee4a40cb6e1580a80d8b10bab',
            recipient: '0x8A9F...3D2E',
            amount: '10,500',
            status: 'Completed',
            date: '2024-05-20 12:15',
            network: 'Ethereum'
        },
        {
            id: 4,
            type: 'TRANSFER',
            hash: '0x9f3d2e1c5f397ee4a40cb6e1580a80d8b10bab',
            recipient: '0xAB3...F9C1',
            amount: '5,250',
            status: 'Failed',
            date: '2024-05-20 11:45',
            network: 'Tron'
        },
        {
            id: 5,
            type: 'RECEIVED',
            hash: '0xf9c1ab35f397ee4a40cb6e1580a80d8b10bab',
            recipient: '0x2B7...8E4A',
            amount: '50,000',
            status: 'Completed',
            date: '2024-05-20 10:22',
            network: 'Ethereum'
        },
    ];

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch =
            tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.amount.includes(searchQuery);

        const matchesFilter = filterStatus === 'all' || tx.status.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="animate-fade-in space-y-6 lg:space-y-8 pb-20 lg:pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 px-2">
                <div>
                    <div className="flex items-center gap-3 text-indigo-400 mb-3 lg:mb-4">
                        <Activity size={18} className="animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Transaction Indexer Live</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                        Transaction <span className="text-indigo-500">History</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-base lg:text-lg mt-4 lg:mt-5 max-w-xl leading-relaxed">
                        Comprehensive immutable record of all <span className="text-white font-bold">Flash USDT</span> protocol transmissions.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-4 px-6 lg:px-8 py-3 lg:py-4 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-white/10 hover:text-white transition-all group uppercase text-xs tracking-widest text-slate-400 shadow-xl">
                    <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                    Archive Data
                </button>
            </div>

            <div className="glass-panel overflow-hidden shadow-3xl mx-1">
                <div className="p-8 lg:p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.01] gap-8">
                    <div className="relative group w-full lg:flex-1 max-w-md">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search hash, address, or volume..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-4 pl-16 pr-8 text-base focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600 text-white"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:flex-none">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full lg:w-auto bg-black/40 border-2 border-white/5 rounded-xl py-3 pl-12 pr-8 text-sm font-bold text-white focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/5 px-5 lg:px-6 py-3 rounded-xl border border-white/5 whitespace-nowrap">
                            <span className="text-white font-mono">{filteredTransactions.length}</span> Records
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Protocol Action</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Hash Reference</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Gateway Node</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Network</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Volume</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">Timestamp</th>
                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-500 italic text-right">Validation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/3 transition-all group cursor-default">
                                        <td className="p-6 lg:p-8">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${tx.type === 'TRANSFER' ? 'bg-indigo-500/10 text-indigo-400 shadow-indigo-500/5' : 'bg-emerald-500/10 text-emerald-400 shadow-emerald-500/5'} border border-white/5 group-hover:scale-110`}>
                                                    {tx.type === 'TRANSFER' ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
                                                </div>
                                                <span className="text-sm font-black text-white uppercase tracking-widest italic">{tx.type}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 lg:p-8">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-slate-500 truncate block max-w-[150px] group-hover:text-indigo-400 transition-colors uppercase select-all cursor-pointer">{tx.hash}</span>
                                                <ExternalLink size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-indigo-400" />
                                            </div>
                                        </td>
                                        <td className="p-6 lg:p-8 text-sm font-bold text-slate-400 italic font-mono">{tx.recipient}</td>
                                        <td className="p-6 lg:p-8">
                                            <span className="text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5">{tx.network}</span>
                                        </td>
                                        <td className="p-6 lg:p-8">
                                            <span className={`text-lg font-black tracking-tighter ${tx.type === 'TRANSFER' ? 'text-white' : 'text-emerald-400'} italic`}>{tx.amount} <span className="text-xs text-slate-500">USDT</span></span>
                                        </td>
                                        <td className="p-6 lg:p-8 text-[12px] font-medium text-slate-500 uppercase tracking-tighter">{tx.date}</td>
                                        <td className="p-6 lg:p-8 text-right">
                                            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${tx.status === 'Completed'
                                                ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20'
                                                : tx.status === 'Pending'
                                                    ? 'bg-amber-500/5 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)] animate-pulse'
                                                    : 'bg-red-500/5 text-red-500 border-red-500/20'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full ${tx.status === 'Completed'
                                                    ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                                    : tx.status === 'Pending'
                                                        ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                                        : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                                                    }`}></div>
                                                {tx.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Activity size={48} className="text-slate-700" />
                                            <p className="text-slate-500 font-semibold">No transactions found</p>
                                            <p className="text-slate-600 text-sm">Try adjusting your search or filter criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 lg:p-8 border-t border-white/5 flex justify-center lg:justify-end gap-3 bg-white/2">
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-black shadow-2xl shadow-indigo-500/40 border border-indigo-400/20 scale-110">1</button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-500 text-sm font-black transition-all border border-white/5">2</button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 text-slate-500 text-sm font-black transition-all border border-white/5">3</button>
                </div>
            </div>
        </div>
    );
};

export default HistoryModule;
