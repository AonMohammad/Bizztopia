import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Lock, ShieldCheck, ArrowRight, AlertCircle, KeyRound, Sparkles } from 'lucide-react';

interface Props {
    isLocked?: boolean;
    defaultEmail?: string;
    errors?: Record<string, string>;
}

export default function AdminLogin({ isLocked = false, defaultEmail = 'admin@bizztopia.com', errors = {} }: Props) {
    const { data, setData, post, processing } = useForm({
        email: defaultEmail,
        password: '',
        remember: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-outfit">
            <Head title="Admin Portal Lockdown | Bizztopia" />

            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#287FBA]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                {/* Brand & Lock Badge */}
                <div className="text-center space-y-3 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[#287FBA] text-xs font-bold uppercase tracking-widest shadow-inner">
                        <Lock className="w-3.5 h-3.5" />
                        {isLocked ? 'Portal Inactivity Locked' : 'Administrative Access'}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#287FBA] flex items-center justify-center shadow-lg shadow-[#287FBA]/30">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            Bizztopia <span className="text-[#287FBA]">Admin</span>
                        </h1>
                    </div>

                    <p className="text-sm text-slate-400 font-medium">
                        Master CAP Administrative Portal & Resource Control
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl shadow-black/60 relative">
                    {isLocked && (
                        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-amber-300 text-xs font-medium">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>This administrative session was locked due to inactivity. Enter credentials to resume control.</span>
                        </div>
                    )}

                    {errors.email && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs font-medium">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errors.email}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                Administrator Identity
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@bizztopia.com"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#287FBA] focus:ring-1 focus:ring-[#287FBA] transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Master Password
                                </label>
                                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                    <KeyRound className="w-3 h-3 text-[#287FBA]" /> Encrypted
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    autoFocus
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••••••••••"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#287FBA] focus:ring-1 focus:ring-[#287FBA] transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-2 py-4 px-6 rounded-2xl bg-[#287FBA] hover:bg-[#1f689a] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#287FBA]/25 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                        >
                            {processing ? (
                                <span>Verifying Master Credentials...</span>
                            ) : (
                                <>
                                    <span>Authenticate & Unlock Portal</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                            <Sparkles className="w-3 h-3 text-[#287FBA]" />
                            <span>Strict Zero-Public-Link Administrative Zone</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-slate-600">
                    &copy; 2026 Bizztopia Ecosystem Platform • Master Administration
                </div>
            </div>
        </div>
    );
}
