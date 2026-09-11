import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            window.location.href = '/ideas';
        }, 1200);
    };

    return (
        <AppLayout>
            <Head title="Log In to Bizztopia — Manage Listings & Reviews" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <div className="relative min-h-[700px] flex items-center justify-center py-16 px-6 overflow-hidden">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that allows the background image to remain clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/80 to-[#287FBA]/70 z-0" />

                {/* Content Container */}
                <div className="relative z-10 max-w-md w-full">
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/40 space-y-6 text-slate-900">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#287FBA]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-black font-outfit text-slate-950">
                                Welcome Back to Bizztopia
                            </h1>
                            <p className="text-slate-500 text-xs font-medium">
                                Sign in to manage your business listing, respond to customer reviews, and track incoming service inquiries.
                            </p>
                        </div>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs">
                                        <label className="font-black uppercase tracking-wider text-slate-700">
                                            Password
                                        </label>
                                        <a href="#forgot" className="text-[#287FBA] hover:underline font-bold text-[11px]">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="password" 
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                    <input 
                                        type="checkbox" 
                                        id="remember"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        className="w-4 h-4 rounded text-[#287FBA] focus:ring-[#287FBA]"
                                    />
                                    <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer">
                                        Keep me signed in on this device
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Log In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6 space-y-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-black text-slate-950">Logging You In...</h3>
                                <p className="text-slate-500 text-xs font-medium">Redirecting to your dashboard.</p>
                            </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 text-center text-xs font-medium text-slate-500">
                            Don't have an account yet?{' '}
                            <Link href="/register" className="text-[#287FBA] font-extrabold hover:underline">
                                Sign up for free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
