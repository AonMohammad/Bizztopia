import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Award, CheckCircle2, ShieldAlert, FileText, Star, Lock, HeartHandshake } from 'lucide-react';

export default function TrustSafety() {
    return (
        <AppLayout>
            <Head title="Trust & Safety Standards — The Bizztopia Vetted Guarantee" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[440px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>The Gold Standard of Local Trust</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Trust & Safety at Bizztopia
                    </h1>
                    <p className="text-[#D5EBF8] text-base font-medium max-w-xl mx-auto">
                        How we protect 2.4 million consumers and 15,000 verified businesses from unlicensed operators, review manipulation, and contract disputes.
                    </p>
                </div>
            </section>

            {/* 3 PILLARS OF INTEGRITY */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-5xl mx-auto space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">1. Verification Audits</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                Our compliance team validates trade licenses against state registration databases and verifies active $1M+ general liability policies.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">2. Anti-Fraud Reviews</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                Algorithmic IP screening and review-gating analysis prevent automated bot posts, competitor sabotage, and incentivized feedback.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">3. $2,500 Resolution</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                If a contracted Vetted Pro breaches a written agreement, our direct mediation desk steps in with up to $2,500 in dispute reimbursement.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-black font-outfit text-slate-950">
                            Have You Encountered an Unverified Pro or Fake Review?
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl mx-auto">
                            Help us protect the community. Our compliance officers review reports within 12 hours.
                        </p>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center gap-2 bg-[#287FBA] hover:bg-[#0B4778] text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-md"
                        >
                            Report to Compliance Desk
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
