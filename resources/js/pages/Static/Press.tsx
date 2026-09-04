import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Newspaper, Download, Mail, ArrowRight } from 'lucide-react';

export default function Press() {
    const releases = [
        {
            date: 'August 18, 2026',
            title: 'Bizztopia Expands $2,500 Consumer Protection Guarantee Across All 50 States',
            snippet: 'Following successful pilot programs in California and Texas, Bizztopia today announced nationwide rollout of its direct consumer dispute warranty.'
        },
        {
            date: 'June 04, 2026',
            title: 'Over 15,000 Local Service Businesses Now Audited Under Bizztopia Vetted Standards',
            snippet: 'Platform surpasses 2.4 million consumer-to-business matched connections with an industry-leading 98.4% customer satisfaction score.'
        },
        {
            date: 'March 12, 2026',
            title: 'Bizztopia Launches AI Review Fraud Detection Engine to Eliminate Bot Manipulation',
            snippet: 'New algorithmic audit system automatically flags and removes unverified and incentivized reviews, restoring authentic local trust.'
        }
    ];

    return (
        <AppLayout>
            <Head title="Press & Media Center — Bizztopia Newsroom" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[440px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Newspaper className="w-4 h-4" />
                        <span>Newsroom & Media Kit</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Bizztopia Press & Media
                    </h1>
                    <p className="text-[#D5EBF8] text-base font-medium max-w-xl mx-auto">
                        Official announcements, press releases, media resources, and brand guidelines for journalists and editors.
                    </p>
                </div>
            </section>

            {/* PRESS RELEASES & MEDIA INQUIRIES */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Releases */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-2xl font-black font-outfit text-slate-950">Recent Press Releases</h2>
                        <div className="space-y-4">
                            {releases.map((rel, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                                    <span className="text-[10px] font-black uppercase text-[#287FBA]">{rel.date}</span>
                                    <h3 className="text-base font-extrabold text-slate-950">{rel.title}</h3>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{rel.snippet}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Media Contact */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
                            <h3 className="text-base font-black font-outfit text-slate-950">Media Inquiries</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                For interviews, executive commentary, or data inquiries regarding local service market trends, contact our media desk:
                            </p>
                            <div className="p-3 bg-blue-50 text-[#0B4778] rounded-xl font-bold">
                                press@bizztopia.com
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
                            <h3 className="text-base font-black font-outfit text-slate-950">Brand Assets</h3>
                            <p className="text-slate-500 font-medium">Download our vector logos, color codes, and Vetted certification badge guidelines.</p>
                            <a 
                                href="/images/logo.png" 
                                download 
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Logo Kit (PNG)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
