import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Star, Award, Users, MapPin, CheckCircle2, ArrowRight, Building2, HeartHandshake, Zap } from 'lucide-react';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Bizztopia — The Verified Local Business Directory" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[480px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>Our Mission & Origin</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Connecting Communities <br />With Vetted Local Excellence.
                    </h1>
                    <p className="text-[#D5EBF8] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Bizztopia was built to solve the trust deficit in local commerce. We verify licenses, audit customer reviews, and protect consumers with our $2,500 guarantee.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/for-consumers" 
                            className="bg-white text-[#0B4778] hover:bg-slate-50 font-black text-xs uppercase px-8 py-3.5 rounded-full shadow-lg transition-all"
                        >
                            Explore for Consumers
                        </Link>
                        <Link 
                            href="/value" 
                            className="border border-white/40 hover:bg-white/10 text-white font-bold text-xs uppercase px-7 py-3.5 rounded-full transition-all"
                        >
                            Bizztopia for Business
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="bg-white py-12 px-6 border-b border-slate-200">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl sm:text-4xl font-black font-outfit text-slate-950">15,000+</div>
                        <div className="text-xs font-bold text-[#287FBA] uppercase tracking-wider mt-1">Verified SMB Partners</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black font-outfit text-slate-950">2.4M+</div>
                        <div className="text-xs font-bold text-[#287FBA] uppercase tracking-wider mt-1">Community Connections</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black font-outfit text-slate-950">67</div>
                        <div className="text-xs font-bold text-[#287FBA] uppercase tracking-wider mt-1">Active Subcategories</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-black font-outfit text-slate-950">$2,500</div>
                        <div className="text-xs font-bold text-[#287FBA] uppercase tracking-wider mt-1">Guarantee Protection</div>
                    </div>
                </div>
            </section>

            {/* MISSION NARRATIVE */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <span className="text-xs font-black uppercase tracking-widest text-[#287FBA]">Why We Started</span>
                            <h2 className="text-3xl font-black font-outfit text-slate-950">The End of Unvetted Contractors & Fake Reviews</h2>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Traditional online directories have become flooded with pay-to-win search rankings, unverified bot reviews, and unlicensed contractors operating without liability insurance.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Bizztopia operates on a strict verification paradigm: every business sporting our Vetted Badge has been vetted against state licensing boards and confirmed active general liability policies.
                            </p>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                                alt="Team Working" 
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
