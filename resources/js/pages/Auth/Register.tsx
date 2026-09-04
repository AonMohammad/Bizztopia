import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Lock, Mail, User, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Register() {
    const [accountType, setAccountType] = useState<'consumer' | 'business'>('business');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bizName, setBizName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            window.location.href = accountType === 'business' ? '/value' : '/for-consumers';
        }, 1200);
    };

    return (
        <AppLayout>
            <Head title="Sign Up — Join the Bizztopia Network" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <div className="relative min-h-[780px] flex items-center justify-center py-16 px-6 overflow-hidden">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that allows the background image to remain clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/80 to-[#287FBA]/70 z-0" />

                {/* Form Card Container */}
                <div className="relative z-10 max-w-md w-full">
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/40 space-y-6 text-slate-900">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#287FBA]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-black font-outfit text-slate-950">
                                Create Your Bizztopia Account
                            </h1>
                            <p className="text-slate-500 text-xs font-medium">
                                Join over 2.4 million local consumers and verified service pros.
                            </p>
                        </div>

                        {/* Account Type Toggle */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                            <button 
                                type="button"
                                onClick={() => setAccountType('business')}
                                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    accountType === 'business' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Building2 className="w-3.5 h-3.5" />
                                <span>Business Owner</span>
                            </button>
                            <button 
                                type="button"
                                onClick={() => setAccountType('consumer')}
                                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                    accountType === 'consumer' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <User className="w-3.5 h-3.5" />
                                <span>Consumer / Buyer</span>
                            </button>
                        </div>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                                        Your Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text" 
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Marcus Vance"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                {accountType === 'business' && (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                                            Business or Trade Name
                                        </label>
                                        <div className="relative">
                                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                            <input 
                                                type="text" 
                                                required
                                                value={bizName}
                                                onChange={(e) => setBizName(e.target.value)}
                                                placeholder="Apex Commercial Services LLC"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                            />
                                        </div>
                                    </div>
                                )}

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
                                            placeholder="you@domain.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                                        Create Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="password" 
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Create Free Account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6 space-y-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-black text-slate-950">Account Created!</h3>
                                <p className="text-slate-500 text-xs font-medium">Setting up your profile workspace...</p>
                            </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 text-center text-xs font-medium text-slate-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-[#287FBA] font-extrabold hover:underline">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
