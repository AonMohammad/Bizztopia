import React from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
    return (
        <AppLayout>
            <Head title="Privacy Policy — Bizztopia Data Protection" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[380px] flex items-center justify-center py-16 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-3">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>Consumer & Business Protection</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Bizztopia Privacy Policy
                    </h1>
                    <p className="text-[#D5EBF8] text-sm font-medium">
                        Last Updated: August 2026 • Effective Worldwide
                    </p>
                </div>
            </section>

            {/* POLICY TEXT BODY */}
            <section className="py-16 bg-slate-50 px-6">
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed font-medium">
                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">1. Information We Collect</h2>
                        <p>
                            Bizztopia collects personal and business information you provide when searching for services, claiming directory listings, submitting customer reviews, or requesting matched quote estimates. This includes business names, phone numbers, verified license files, and project requirements.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">2. How We Use Your Data</h2>
                        <p>
                            We use collected data solely to: (a) verify legitimate business licensing and insurance status; (b) match consumers with top-rated local providers in their geographical area; (c) detect and eliminate fraudulent, bot, or incentivized reviews; and (d) facilitate communication between buyers and service pros.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">3. Information Sharing & Third Parties</h2>
                        <p>
                            Bizztopia never sells your personal phone number or email to third-party telemarketers. When you submit a quote match request, your contact information is shared only with up to 3 matched, verified Vetted Pro businesses so they can provide you with direct estimates.
                        </p>
                    </div>

                    <div className="space-y-2" id="cookies">
                        <h2 className="text-lg font-black font-outfit text-slate-950">4. Cookie Policy</h2>
                        <p>
                            We use session and analytics cookies to maintain your login session, save your city and subcategory preferences, and analyze anonymized site traffic. You can control cookie preferences in your browser settings.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">5. Security & Data Retention</h2>
                        <p>
                            All financial transactions for Vetted Pro memberships are encrypted using 256-bit SSL technology processed through Stripe. We maintain industry-standard security safeguards to protect your personal files against unauthorized access.
                        </p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
