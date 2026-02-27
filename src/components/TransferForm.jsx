import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransferModule = ({ isWalletConnected, walletAddress }) => {
    const [formData, setFormData] = useState({
        recipient: '',
        amount: '',
        asset: 'USDT'
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isWalletConnected) {
            setError('Please connect your wallet first');
            setStatus('error');
            return;
        }
        setStatus('loading');
        setError('');

        try {
            const response = await fetch('https://flash-usdt-backend-three.vercel.app/api/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: walletAddress,
                    to: formData.recipient,
                    amount: formData.amount,
                    asset: formData.asset
                })
            });

            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setFormData({ ...formData, recipient: '', amount: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setError(data.message || 'Transfer failed');
                setStatus('error');
            }
        } catch (err) {
            setError('Server connection failed');
            setStatus('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-3">Send Assets</h1>
                <p className="text-slate-400">Transfer USDT securely across the Ethereum network using Flash Protocol.</p>
            </div>

            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-10 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Header Info */}
                    <div className="flex items-center justify-between p-5 bg-[#1e293b]/30 border border-[#1e293b] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
                                T
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Tether USDT</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ethereum Mainnet</div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 ml-1">Recipient Address</label>
                        <input
                            type="text"
                            required
                            placeholder="0x..."
                            value={formData.recipient}
                            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                            className="w-full bg-[#020617] border border-[#1e293b] rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 ml-1">Amount (USDT)</label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full bg-[#020617] border border-[#1e293b] rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                                USDT
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-widest
                            ${status === 'loading'
                                ? 'bg-[#1e293b] text-slate-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20'
                            }`}
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Processing Protocol...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Initiate Transfer
                            </>
                        )}
                    </button>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3 text-emerald-400"
                            >
                                <CheckCircle2 size={20} />
                                <span className="text-sm font-bold">Protocol indexing successful. Transaction queued.</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center gap-3 text-red-400"
                            >
                                <AlertTriangle size={20} />
                                <span className="text-sm font-bold">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
};

export default TransferModule;
