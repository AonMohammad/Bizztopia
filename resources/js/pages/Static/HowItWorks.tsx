import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Search, Star, Award, Zap, CheckCircle2, ArrowRight, Building2, User } from 'lucide-react';

export default function HowItWorks() {
    const [viewMode, setViewMode] = useState<'consumer' | 'business'>('consumer');

    return (
        <AppLayout>
            <Head title="How Bizztopia Works — Verification, Matching & Guarantee" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[440px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Platform Guide</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        How Bizztopia Works
                    </h1>
                    <p className="text-[#D5EBF8] text-base font-medium max-w-xl mx-auto">
                        Whether you are looking to hire a trusted local professional or scale your business with verified quote leads, here is how our ecosystem protects and serves you.
                    </p>

                    {/* Mode Toggle */}
                    <div className="inline-flex p-1 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                        <button 
                            onClick={() => setViewMode('consumer')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                                viewMode === 'consumer' ? 'bg-white text-[#0B4778] shadow-md' : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <User className="w-4 h-4" />
                            <span>For Consumers</span>
                        </button>
                        <button 
                            onClick={() => setViewMode('business')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                                viewMode === 'business' ? 'bg-white text-[#0B4778] shadow-md' : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <Building2 className="w-4 h-4" />
                            <span>For Businesses</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* 3 STEPS SECTION */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-5xl mx-auto space-y-16">
                    {viewMode === 'consumer' ? (
                        <div className="space-y-12">
                            <div className="text-center max-w-xl mx-auto">
                                <span className="text-xs font-black uppercase tracking-widest text-[#287FBA]">Consumer Workflow</span>
                                <h2 className="text-3xl font-black font-outfit text-slate-950 mt-1">Hire With Peace of Mind</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">1</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Search or Match</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Type in what you need (e.g. Plumber, Catering, Auto Repair) and your city, or submit our 30-second match request.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">2</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Inspect Vetting Files</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Inspect state trade licenses, liability insurance coverage status, and real fraud-filtered client reviews on their profile.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">3</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Book Under $2.5k Cover</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Hire your pro. If any breach of contract occurs, Bizztopia’s consumer resolution desk protects your job up to $2,500.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <div className="text-center max-w-xl mx-auto">
                                <span className="text-xs font-black uppercase tracking-widest text-[#287FBA]">Business Workflow</span>
                                <h2 className="text-3xl font-black font-outfit text-slate-950 mt-1">Scale Your Customer Inquiries</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">1</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Claim Your Profile</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Claim ownership of your business page for free. Add hours, categories, service checklists, and photo galleries.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">2</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Pass Compliance Audit</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Upload your business license and liability insurance policy. Our compliance team verifies credentials within 48 hours.
                                    </p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] font-black text-lg flex items-center justify-center">3</div>
                                    <h3 className="text-lg font-black font-outfit text-slate-950">Receive Quote Leads</h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Unlock top directory placements and receive direct matched quote requests from high-intent local clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
