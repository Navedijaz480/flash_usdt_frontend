import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TransferModule = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [network, setNetwork] = useState('Ethereum');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateAddress = (address) => {
        // Basic validation for Ethereum-like addresses
        const ethRegex = /^0x[a-fA-F0-9]{40}$/;
        const tronRegex = /^T[a-zA-Z0-9]{33}$/;

        if (network === 'Tron') {
            return tronRegex.test(address);
        }
        return ethRegex.test(address);
    };

    const handleTransfer = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (!validateAddress(recipient)) {
            setError(`Invalid ${network} address format`);
            return;
        }

        setIsProcessing(true);

        // Simulate transaction processing
        setTimeout(() => {
            setIsProcessing(false);
            setSuccess(true);

            // Reset form after success
            setTimeout(() => {
                setRecipient('');
                setAmount('');
                setSuccess(false);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20 lg:pb-8">
            <div className="px-2">
                <div className="flex items-center gap-3 text-indigo-400 mb-3 lg:mb-4">
                    <Send size={18} className="animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">Transfer Protocol</span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    Send <span className="text-indigo-500">USDT</span>
                </h1>
                <p className="text-slate-400 font-medium text-base lg:text-lg mt-4 lg:mt-5 max-w-xl leading-relaxed">
                    Transfer <span className="text-white font-bold">Flash USDT</span> tokens securely across multiple networks.
                </p>
            </div>

            <div className="glass-panel p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full" />

                <form onSubmit={handleTransfer} className="space-y-8 relative z-10">
                    {/* Amount Input */}
                    <div>
                        <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">
                            Amount (USDT)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-4 rounded-xl bg-black/40 border-2 border-white/5 text-white text-lg font-bold placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-all"
                                disabled={isProcessing}
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">
                                USDT
                            </div>
                        </div>
                    </div>

                    {/* Recipient Address Input */}
                    <div>
                        <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">
                            Recipient Address
                        </label>
                        <input
                            type="text"
                            placeholder={network === 'Tron' ? 'T...' : '0x...'}
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full p-4 rounded-xl bg-black/40 border-2 border-white/5 text-white font-mono text-sm placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 transition-all"
                            disabled={isProcessing}
                            required
                        />
                    </div>

                    {/* Network Selection */}
                    <div>
                        <label className="text-slate-400 text-sm font-semibold mb-2 block uppercase tracking-wider">
                            Network
                        </label>
                        <select
                            value={network}
                            onChange={(e) => setNetwork(e.target.value)}
                            className="w-full p-4 rounded-xl bg-black/40 border-2 border-white/5 text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer"
                            disabled={isProcessing}
                        >
                            <option value="Ethereum">Ethereum (ERC-20)</option>
                            <option value="Tron">Tron (TRC-20)</option>
                            <option value="Binance Smart Chain">Binance Smart Chain (BEP-20)</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                            <span className="text-red-400 text-sm font-semibold">{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                            <span className="text-emerald-400 text-sm font-semibold">
                                Transfer successful! {amount} USDT sent on {network}
                            </span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isProcessing || success}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${isProcessing || success
                            ? 'bg-indigo-600/50 text-white/50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:scale-[1.02] shadow-lg shadow-indigo-500/30'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processing Transaction...
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle2 size={20} />
                                Transfer Complete
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Send USDT
                            </>
                        )}
                    </button>
                </form>

                {/* Transaction Info */}
                <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-semibold">Network Fee</span>
                        <span className="text-white font-bold">~0.001 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-semibold">Estimated Time</span>
                        <span className="text-white font-bold">~2-5 minutes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferModule;
