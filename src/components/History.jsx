import React, { useState, useEffect } from 'react';
import { Activity, Search, ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const HistoryModule = ({ isWalletConnected, walletAddress }) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!isWalletConnected || !walletAddress) {
                setIsLoading(false);
                return;
            }
            try {
                // Fetch from the general transaction endpoint
                const response = await fetch('https://flash-usdt-backend-three.vercel.app/api/admin/transactions');
                const data = await response.json();
                if (Array.isArray(data)) {
                    // Filter for transactions involving the connected wallet
                    const filtered = data.filter(tx =>
                        (tx.from && tx.from.toLowerCase() === walletAddress.toLowerCase()) ||
                        (tx.to && tx.to.toLowerCase() === walletAddress.toLowerCase()) ||
                        (tx.user && tx.user.toLowerCase() === walletAddress.toLowerCase())
                    );
                    setTransactions(filtered);
                }
            } catch (err) {
                console.error('Failed to fetch history', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [isWalletConnected, walletAddress]);

    return (
        <div className="space-y-10 py-6">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Transaction History</h1>
                <p className="text-slate-400 text-sm">Comprehensive record of protocol transmissions on Ethereum.</p>
            </header>

            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto text-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1e293b]/50 border-b border-[#1e293b]">
                                <th className="p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                                <th className="p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recipient</th>
                                <th className="p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                                <th className="p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                                <th className="p-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e293b]">
                            {transactions.length > 0 ? (
                                transactions.map((tx, i) => (
                                    <tr key={i} className="hover:bg-[#1e293b]/20 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'transfer' ? 'bg-blue-600/10 text-blue-400' : 'bg-emerald-600/10 text-emerald-400'}`}>
                                                    {tx.type === 'transfer' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                                </div>
                                                <span className="font-bold text-white uppercase text-[10px] tracking-widest">{tx.type}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 font-mono text-slate-400 text-xs">
                                            {tx.to || tx.user}
                                        </td>
                                        <td className="p-5">
                                            <span className="font-bold text-white">{tx.amount}</span>
                                            <span className="ml-1 text-[10px] text-slate-500 font-bold uppercase">{tx.asset}</span>
                                        </td>
                                        <td className="p-5 text-slate-500 text-xs">
                                            {tx.time}
                                        </td>
                                        <td className="p-5 text-right">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${tx.status === 'Approved' || tx.status === 'Completed'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                    : tx.status === 'Pending'
                                                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        {isLoading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-xs text-slate-500">Indexing history...</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-slate-600">
                                                {!isWalletConnected ? 'Connect wallet to view history' : 'No protocol events found.'}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryModule;
