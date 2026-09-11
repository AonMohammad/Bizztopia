import React from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { FileText, ShieldCheck, Scale } from 'lucide-react';

export default function Terms() {
    return (
        <AppLayout>
            <Head title="Terms of Service — Bizztopia Legal Terms" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[380px] flex items-center justify-center py-16 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-3">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        <span>Platform Terms & Conditions</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Bizztopia Terms of Service
                    </h1>
                    <p className="text-[#D5EBF8] text-sm font-medium">
                        Last Updated: August 2026 • Governing Law: California, USA
                    </p>
                </div>
            </section>

            {/* TERMS TEXT BODY */}
            <section className="py-16 bg-slate-50 px-6">
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed font-medium">
                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">1. Acceptance of Terms</h2>
                        <p>
                            By accessing, browsing, or using the Bizztopia website, mobile portals, or verified quote matching tools, you agree to be bound by these Terms of Service and all applicable federal, state, and municipal regulations.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">2. Directory Profiles & Verified Certification</h2>
                        <p>
                            Business profiles on Bizztopia must represent legally incorporated or licensed entities. Businesses applying for the "Verified Pro" badge warrant that all submitted trade license numbers and liability insurance policy documents are valid, current, and unencumbered. Misrepresentation constitutes an immediate breach and will result in permanent listing revocation.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">3. Review Submission Guidelines</h2>
                        <p>
                            Reviews submitted on Bizztopia must reflect first-hand commercial or consumer experiences with the listed business. Reviews submitted by employees, competitors, or incentivized automated services are strictly forbidden and subject to automated removal.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-black font-outfit text-slate-950">4. The $2,500 Consumer Protection Guarantee</h2>
                        <p>
                            Bizztopia’s Resolution Desk provides mediation and up to $2,500 direct reimbursement for eligible contracts executed with Bizztopia Verified Pro partners, subject to written quote documentation and resolution guidelines.
                        </p>
                    </div>

                    <div className="space-y-2" id="accessibility">
                        <h2 className="text-lg font-black font-outfit text-slate-950">5. Accessibility Statement</h2>
                        <p>
                            Bizztopia is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards across all directory pages.
                        </p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
