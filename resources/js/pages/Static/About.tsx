import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ShieldCheck, Star, Award, Users, MapPin, CheckCircle2, ArrowRight, Building2, HeartHandshake, Zap, Target, Lock, Eye } from 'lucide-react';

export default function About() {
    return (
        <AppLayout>
            <Head title="About Bizztopia — The Verified Local Business Directory" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[480px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Fast-Loading Background Video Layer with Poster Fallback */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
                >
                    <source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1280_720_25fps.mp4" type="video/mp4" />
                </video>
                {/* Gradient Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>Our Mission &amp; Origin</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Connecting People With <br />Businesses They Can Actually Trust.
                    </h1>
                    <p className="text-[#D5EBF8] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        We verify every license, audit every review, and back every hire with a $2,500 consumer guarantee — because trust shouldn't be optional.
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
                        <div className="text-xs font-bold text-[#287FBA] uppercase tracking-wider mt-1">Consumer Connections</div>
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
                            <h2 className="text-3xl font-black font-outfit text-slate-950">Built on Verification. Not Pay-to-Win Rankings.</h2>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Traditional online directories became flooded with pay-to-win search rankings, unverified bot reviews, and unlicensed contractors operating without liability insurance.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Bizztopia applies a strict verification standard: every business displaying our Verified Badge has been checked against state licensing boards and confirmed as carrying an active general liability policy. No shortcuts. No pay-to-rank.
                            </p>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                                alt="Bizztopia Team Working" 
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT STARTED */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 order-last md:order-first">
                        <img 
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80" 
                            alt="Bizztopia Origin Story" 
                            className="w-full h-80 object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-[#287FBA]">How It Started</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950">A Problem Every Consumer Had Faced Before.</h2>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            Bizztopia was founded after our team experienced firsthand what it's like to hire an unlicensed contractor and lose thousands — with nowhere to turn. The existing platforms had no real accountability.
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                            We built Bizztopia to fix that gap: a directory where every listing is accountable, every badge is earned, and every consumer has a safety net if something goes wrong. That's not just a feature — that's the entire foundation.
                        </p>
                    </div>
                </div>
            </section>

            {/* OUR CORE VALUES */}
            <section className="py-20 bg-slate-50 px-6 border-t border-slate-200/60">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-xs font-black uppercase tracking-widest text-[#287FBA] block">What We Stand For</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 mt-2">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">Radical Transparency</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                We show you what other directories hide: license numbers, insurance status, verified review counts, and public record checks — all on every profile page.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">Consumer First</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                Our $2,500 guarantee isn't a marketing line — it's a real financial commitment. If a verified business lets you down, we step in to mediate and reimburse eligible losses.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287FBA] flex items-center justify-center">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black font-outfit text-slate-950">Accuracy Over Scale</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                We'd rather have 15,000 fully verified businesses than 150,000 unvetted ones. Every Bizztopia listing earns its spot through a compliance audit — not a credit card.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight">
                        Ready to Experience the Bizztopia Standard?
                    </h2>
                    <p className="text-slate-300 text-sm font-medium max-w-xl mx-auto leading-relaxed">
                        Whether you're looking to hire a verified local business or you want to showcase your own, Bizztopia is built for both sides of the trust equation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link 
                            href="/for-consumers" 
                            className="bg-[#287FBA] hover:bg-[#0B4778] text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
                        >
                            <span>Find a Verified Pro</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link 
                            href="/value" 
                            className="border border-white/30 hover:bg-white/10 text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                        >
                            Claim Your Business
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
