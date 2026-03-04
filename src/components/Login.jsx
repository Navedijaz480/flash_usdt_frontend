import React, { useState } from 'react';
import { Zap, Mail, Lock, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Static simulation: 1s delay
        setTimeout(() => {
            if (email === 'admin@flash.com' && password === 'admin123') {
                onLogin();
            } else {
                setError('Invalid credentials. Use admin@flash.com / admin123');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-[400px]"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-12">
                    <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5"
                    >
                        <Zap size={24} className="text-white fill-current" />
                    </motion.div>
                    <h1 className="text-xl font-bold text-white tracking-widest uppercase mb-1">Flash Protocol</h1>
                    <div className="h-px w-12 bg-blue-600/50" />
                </div>

                <div className="bg-[#0f172a]/50 border border-[#1e293b] rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Identity
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within:text-blue-500">
                                    <Mail size={16} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-[#020617] border border-[#1e293b] rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                                Access Token
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within:text-blue-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-[#020617] border border-[#1e293b] rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-[11px] font-medium text-center bg-red-500/5 py-2 rounded-lg border border-red-500/10"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group text-sm"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Enter Dashboard <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                        <ShieldCheck size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Secure Terminal Session</span>
                    </div>
                    <p className="text-[10px] text-slate-700 font-medium text-center leading-relaxed">
                        By accessing this protocol, you agree to the <br />
                        <span className="text-slate-500 cursor-pointer hover:text-blue-500 transition-colors">Terms of Service</span> and <span className="text-slate-500 cursor-pointer hover:text-blue-500 transition-colors">Security Policy</span>.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
