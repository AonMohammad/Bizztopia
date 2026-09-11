import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { 
    ShieldCheck, Star, Search, MapPin, CheckCircle2, ArrowRight, 
    Award, ChevronDown, ChevronUp, ChevronRight, Lock, Users, Sparkles, HeartHandshake,
    Check, Zap, PhoneCall, Clock, AlertCircle, ThumbsUp, ShieldAlert,
    Building2, Wrench, Utensils, Car, Smile, Compass, Send
} from 'lucide-react';

export default function ConsumerIndex() {
    const [searchNeed, setSearchNeed] = useState('');
    const [searchLocation, setSearchLocation] = useState('San Francisco, CA');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Interactive Quick Match State
    const [matchCategory, setMatchCategory] = useState('home-garden');
    const [matchUrgency, setMatchUrgency] = useState('This Week');
    const [matchLocation, setMatchLocation] = useState('San Francisco, CA');
    const [matchSubmitted, setMatchSubmitted] = useState(false);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const categories = [
        {
            name: 'Home & Facilities Repairs',
            slug: 'home-garden',
            icon: Wrench,
            desc: 'Verified plumbers, HVAC diagnostics, electricians, and general contractors.',
            popular: ['Plumbers', 'HVAC Repair', 'Electricians'],
            subSlug: 'plumbers'
        },
        {
            name: 'Auto Repair & Fleet Care',
            slug: 'auto-services',
            icon: Car,
            desc: 'Certified mechanics, body shops, detailing, and commercial fleet services.',
            popular: ['Auto Repair', 'Oil Change', 'Body Shops'],
            subSlug: 'auto-repair'
        },
        {
            name: 'Corporate Dining & Catering',
            slug: 'restaurants',
            icon: Utensils,
            desc: 'Licensed caterers, food trucks, corporate lunches, and private dining.',
            popular: ['Delivery', 'Takeout', 'Food Trucks'],
            subSlug: 'delivery'
        },
        {
            name: 'Health, Wellness & Spas',
            slug: 'health-beauty',
            icon: Smile,
            desc: 'Licensed chiropractors, physical therapy, therapeutic massage, and dentistry.',
            popular: ['Chiropractors', 'Dentists', 'Spas'],
            subSlug: 'chiropractors'
        },
        {
            name: 'Travel & Event Experiences',
            slug: 'travel-activities',
            icon: Compass,
            desc: 'Retreat transportation, boutique hotel blocks, event venues, and activities.',
            popular: ['Venues & Events', 'Hotels', 'Things to Do'],
            subSlug: 'venues-events'
        },
        {
            name: 'Moving & Direct Operations',
            slug: 'more',
            icon: Building2,
            desc: 'Insured office and home movers, junk removal, and corporate dry cleaning.',
            popular: ['Movers', 'Junk Removal', 'Dry Cleaning'],
            subSlug: 'junk-removal'
        }
    ];

    const consumerFaqs = [
        {
            q: 'Is Bizztopia completely free for consumers?',
            a: 'Yes, 100% free! Consumers and business buyers can search, read verified customer reviews, request free estimates, and connect with Verified Pros with zero hidden fees or subscription charges.'
        },
        {
            q: 'What does the blue "Verified Partner" badge mean?',
            a: 'When you see the Bizztopia Verified Badge, it means our compliance desk has manually audited and verified that business’s active state/local trade license, confirmed active general liability insurance coverage, and cross-checked public records for clean consumer standing.'
        },
        {
            q: 'How does the $2,500 Consumer Protection Guarantee work?',
            a: 'If you contract a Bizztopia Verified Pro and a verified breach of written agreement occurs, our Consumer Resolution Desk steps in to mediate. If unresolved, eligible jobs are covered up to $2,500 to reimburse direct losses.'
        },
        {
            q: 'How are customer reviews verified on Bizztopia?',
            a: 'We use automated IP fraud detection and review-gating audits. Unverified or incentivized bot reviews are automatically blocked so you only read real feedback from genuine customers.'
        },
        {
            q: 'How quickly do Verified Pros respond to quote requests?',
            a: 'Over 88% of verified businesses on Bizztopia respond within 2 to 4 business hours. Most urgent repair requests receive callback estimates within 30 minutes.'
        }
    ];

    const handleMatchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/leads/submit', {
            name: 'Consumer Lead',
            email: 'consumer@bizztopia.net',
            service_needed: matchCategory,
            location: matchLocation,
            details: `Urgency: ${matchUrgency}`,
            source_page: 'consumer'
        }, {
            onSuccess: () => setMatchSubmitted(true)
        });
    };

    return (
        <AppLayout>
            <Head title="Bizztopia for Consumers — Find & Hire Verified Local Pros" />

            {/* 1. CONSUMER HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="text-white py-20 px-6 relative overflow-hidden">
                {/* Fast-Loading Background Video Layer with Poster Fallback */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
                >
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-hd_1280_720_25fps.mp4" type="video/mp4" />
                </video>
                {/* Brand Overlay that allows the background video to remain clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] z-0" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    {/* Left: Headline & Search */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="bg-[#287FBA]/40 border border-white/20 text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-white" />
                                <span>The Bizztopia Verified Standard</span>
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mt-4">
                                Hire Local Businesses <br />With Total Confidence.
                            </h1>
                            <p className="text-[#D5EBF8] text-base sm:text-lg font-medium mt-4 max-w-xl leading-relaxed">
                                Never risk unlicensed vendors. Every verified pro on Bizztopia is trade-certified, insurance-checked, and backed by our $2,500 Consumer Protection Guarantee.
                            </p>
                        </div>

                        {/* Search Bar Widget */}
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                window.location.href = `/ideas?q=${encodeURIComponent(searchNeed)}&l=${encodeURIComponent(searchLocation)}`;
                            }}
                            className="bg-white p-2.5 rounded-2xl shadow-2xl max-w-2xl flex flex-col sm:flex-row items-center gap-2 text-slate-900"
                        >
                            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-slate-200">
                                <Search className="w-4 h-4 text-[#287FBA] shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="What do you need? (e.g. Plumber, Catering)..."
                                    value={searchNeed}
                                    onChange={(e) => setSearchNeed(e.target.value)}
                                    className="w-full text-xs sm:text-sm font-bold placeholder:text-slate-400 focus:outline-none bg-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-1/2">
                                <MapPin className="w-4 h-4 text-[#287FBA] shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="City, State (e.g. San Francisco, CA)"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    className="w-full text-xs sm:text-sm font-bold placeholder:text-slate-400 focus:outline-none bg-transparent"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto bg-[#287FBA] hover:bg-[#0B4778] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                            >
                                <span>Search</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        {/* Quick Trust Highlights */}
                        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-[#D5EBF8]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>100% Free For Consumers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>License & Insurance Verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>$2,500 Guarantee Backed</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Consumer Trust Scorecard Preview */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white text-slate-900 p-6 rounded-3xl border border-white/20 shadow-2xl space-y-5">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-[#287FBA]" />
                                    <span className="font-extrabold text-sm text-slate-900">Bizztopia Verification Card</span>
                                </div>
                                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-100">
                                    Active Audit
                                </span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                    <span className="font-bold text-slate-600">State Trade Licensing</span>
                                    <span className="font-black text-emerald-600 flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" /> Checked 2026
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                    <span className="font-bold text-slate-600">Liability Insurance Policy</span>
                                    <span className="font-black text-emerald-600 flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" /> Active $1M+
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                    <span className="font-bold text-slate-600">Authentic Client Reviews</span>
                                    <span className="font-black text-[#287FBA] flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-[#287FBA]" /> 4.9 (148 Reviews)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                                    <span className="font-black text-[#0B4778]">Resolution Protection</span>
                                    <span className="font-black text-[#287FBA]">$2,500 Covered</span>
                                </div>
                            </div>

                            <div className="pt-2 text-center text-[11px] font-semibold text-slate-400">
                                Over 2.4 million consumer connections protected across North America.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE 4 PILLARS OF CONSUMER PROTECTION */}
            <section className="py-20 bg-slate-50 px-6 border-b border-slate-200/70">
                <div className="max-w-7xl mx-auto space-y-14">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block">
                            Why Hire Through Bizztopia?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-outfit text-slate-950 tracking-tight mt-2">
                            4 Reasons People Trust Bizztopia
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-2">
                            We take the guesswork and worry out of hiring a local business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Pillar 1 */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-950 font-outfit">Every Business is License-Checked</h3>
                             <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                We check every business against state and local licensing boards. If a license lapses or expires, that business loses the Verified badge immediately.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA]">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-950 font-outfit">Only Real, Verified Reviews</h3>
                             <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                Our smart filters block fake reviews, paid testimonials, and bot-generated ratings — so the stars you see reflect what real customers actually experienced.
                            </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-950 font-outfit">Get 3 Free Price Estimates</h3>
                             <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                Skip the phone tag. Describe what you need once and receive up to 3 free price estimates from top-rated local businesses — usually within the hour.
                            </p>
                        </div>

                        {/* Pillar 4 */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all space-y-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA]">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-950 font-outfit">$2,500 Guarantee</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                If something goes wrong with a Verified Pro you hired, we step in to help resolve it and will cover your direct losses up to $2,500. No hoops. No lawyers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. POPULAR CONSUMER CATEGORIES */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
                        <div>
                            <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block">
                                Explore Verified Services
                            </span>
                            <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight mt-1">
                                Popular Categories for Consumers
                            </h2>
                        </div>
                        <Link 
                            href="/ideas" 
                            className="text-xs font-black text-[#287FBA] hover:text-[#0B4778] flex items-center gap-1 transition-colors uppercase tracking-wider"
                        >
                            <span>Browse All Directory Listings</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, idx) => {
                            const IconComponent = cat.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:shadow-md hover:border-[#287FBA]/40 transition-all flex flex-col justify-between space-y-5 group"
                                >
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#287FBA] group-hover:bg-[#287FBA] group-hover:text-white transition-all shadow-xs">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-black font-outfit text-slate-950 group-hover:text-[#287FBA] transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                            {cat.desc}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2 border-t border-slate-200/60">
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.popular.map((tag, tIdx) => (
                                                <span key={tIdx} className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link 
                                            href={`/subcategory/${cat.subSlug}`}
                                            className="inline-flex items-center gap-1 text-xs font-extrabold text-[#287FBA] hover:text-[#0B4778] transition-colors pt-1"
                                        >
                                            <span>Find {cat.name.split('&')[0]} Pros</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. INTERACTIVE "FIND YOUR PRO IN 30 SECONDS" MATCH WIDGET */}
            <section className="py-20 bg-slate-900 text-white px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="max-w-4xl mx-auto relative z-10 space-y-10">
                    <div className="text-center space-y-3">
                        <span className="bg-[#287FBA]/20 border border-[#287FBA]/40 text-[#63B5E8] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block">
                            Find a Pro in 30 Seconds
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight">
                            Find Your Verified Pro in 30 Seconds
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-md mx-auto">
                            Tell us what you need, and we'll connect you with verified local businesses in your area who are ready to help.
                        </p>
                    </div>

                    {!matchSubmitted ? (
                        <form onSubmit={handleMatchSubmit} className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                        1. Service Category
                                    </label>
                                    <select 
                                        value={matchCategory}
                                        onChange={(e) => setMatchCategory(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                    >
                                        <option value="home-garden">Home Repairs & HVAC</option>
                                        <option value="auto-services">Auto Repair & Maintenance</option>
                                        <option value="restaurants">Catering & Corporate Dining</option>
                                        <option value="health-beauty">Health, Wellness & Spas</option>
                                        <option value="travel-activities">Events, Venues & Travel</option>
                                        <option value="more">Moving & Operational Support</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                        2. When Do You Need It?
                                    </label>
                                    <select 
                                        value={matchUrgency}
                                        onChange={(e) => setMatchUrgency(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                    >
                                        <option value="Emergency Today">Emergency Today (Urgent)</option>
                                        <option value="This Week">This Week</option>
                                        <option value="Within 2 Weeks">Within 2 Weeks</option>
                                        <option value="Flexible / Planning">Flexible / Just Researching</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                        3. Your City or Zip
                                    </label>
                                    <input 
                                        type="text" 
                                        value={matchLocation}
                                        onChange={(e) => setMatchLocation(e.target.value)}
                                        placeholder="e.g. San Francisco, CA"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4 fill-white" />
                                <span>Find 3 Verified Businesses Near Me — It's Free</span>
                            </button>
                        </form>
                    ) : (
                        <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-300">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black font-outfit text-slate-950">You're All Set!</h3>
                                 <p className="text-slate-500 text-xs font-medium max-w-md mx-auto">
                                    We found 3 verified businesses in {matchLocation} who match your request. Expect to hear from them shortly — usually within the hour.
                                </p>
                            </div>
                            <div className="pt-2">
                                <button 
                                    onClick={() => setMatchSubmitted(false)}
                                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. $2,500 GUARANTEE SPOTLIGHT */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-slate-50 to-[#EAF5FC] border-2 border-[#287FBA]/30 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#287FBA]/10 text-[#287FBA] text-xs font-black uppercase tracking-wider">
                            <Award className="w-4 h-4" />
                            <span>Consumer Protection Warranty</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black font-outfit text-slate-950">
                            The Bizztopia $2,500 Peace of Mind Guarantee
                        </h2>
                        <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
                            We stand behind every business displaying the Verified badge. If a Verified Pro fails to do the work they agreed to, Bizztopia will step in to help resolve it — and cover your losses up to $2,500.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>No Extra Cost</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>48-Hour Claim Response</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>Paid Directly to You</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg text-center space-y-2 max-w-xs w-full">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA] mx-auto">
                                <ShieldCheck className="w-9 h-9" />
                            </div>
                            <div className="text-2xl font-black text-slate-950 font-outfit">$2,500</div>
                            <div className="text-[11px] font-black uppercase text-[#287FBA] tracking-wider">Per-Job Protection</div>
                            <p className="text-[10px] text-slate-400 font-medium">Valid on all verified contracts booked with Bizztopia Verified Partners.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. VERIFIED CONSUMER REVIEWS & STORIES */}
            <section className="py-20 bg-slate-50 px-6 border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block">
                            Real Stories
                        </span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight mt-1">
                            Trusted by Homeowners &amp; Business Managers Across North America
                        </h2>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                            Real stories from people who chose safety over risk — and got results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-[#287FBA] text-[#287FBA]" />
                                    ))}
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-950">
                                    "Saved our office from an HVAC emergency"
                                </h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    "Our central AC failed on a 95-degree day with 40 staff in the building. Found Apex Commercial HVAC on Bizztopia. Their license was verified and they arrived within 45 minutes."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div>
                                    <span className="font-extrabold text-slate-900 block">Elena Rostova</span>
                                    <span className="text-slate-400 text-[10px]">Operations Director • San Jose, CA</span>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    Verified Hire
                                </span>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-[#287FBA] text-[#287FBA]" />
                                    ))}
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-950">
                                    "Zero guesswork on licensing & insurance"
                                </h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    "I was terrified of hiring an uninsured contractor for our kitchen plumbing overhaul. Bizztopia made it so simple to inspect their active liability credentials right on their profile page."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div>
                                    <span className="font-extrabold text-slate-900 block">Marcus Vance</span>
                                    <span className="text-slate-400 text-[10px]">Homeowner • Oakland, CA</span>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    Verified Hire
                                </span>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 fill-[#287FBA] text-[#287FBA]" />
                                    ))}
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-950">
                                    "Flawless corporate event catering"
                                </h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    "Matched with Sarah Jenkins Catering through the Bizztopia lead tool. Received three transparent price quotes within two hours and our executive team was blown away by the food quality."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div>
                                    <span className="font-extrabold text-slate-900 block">Claire Montgomery</span>
                                    <span className="text-slate-400 text-[10px]">Event Planner • San Francisco, CA</span>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    Verified Hire
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FREQUENTLY ASKED QUESTIONS */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center space-y-2">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block">
                            Consumer Help Center
                        </span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {consumerFaqs.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-5 flex items-center justify-between text-left font-bold text-xs text-slate-900 hover:text-[#287FBA] transition-colors cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-[#287FBA]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-600 text-xs leading-relaxed font-medium border-t border-slate-200/60 pt-3 animate-in fade-in duration-150">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. WRITE A REVIEW & GET STARTED BOTTOM BANNER */}
            <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:20px_20px]" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#287FBA]/20 border border-[#287FBA]/40 flex items-center justify-center mx-auto text-[#287FBA]">
                        <Star className="w-6 h-6 fill-[#287FBA]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight">
                        Share Your Experience. Help the Community.
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed">
                        Your honest reviews are the backbone of Bizztopia’s trust system. Share your feedback in under two minutes and help keep local businesses accountable.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/write-a-review"
                            className="bg-[#287FBA] hover:bg-[#0B4778] text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
                        >
                            <span>Write a Review Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link 
                            href="/ideas"
                            className="border border-white/30 hover:bg-white/10 text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                        >
                            Explore Directory
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
