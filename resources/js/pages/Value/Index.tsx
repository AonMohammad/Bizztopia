import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import {
    Check, ArrowRight, ShieldCheck, Star, Award, Zap, Lock,
    Building2, HelpCircle, ChevronDown, ChevronUp, CheckCircle2,
    FileText, MessageSquare, PhoneCall, ShieldCheck as VerifiedIcon,
    Search, MapPin, Sparkles, UserCheck, ShieldAlert, Calculator,
    TrendingUp, DollarSign, X, CheckSquare, Wrench, Utensils, Car, Smile
} from 'lucide-react';

interface ValueIndexProps {
    initialRoi?: any;
    initialStartupCost?: any;
}

export default function Index({ initialRoi, initialStartupCost }: ValueIndexProps) {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    // Interactive Business Claim Modal State
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [claimPlan, setClaimPlan] = useState<'free' | 'pro'>('pro');
    const [claimStep, setClaimStep] = useState(1);
    const [bizName, setBizName] = useState('');
    const [bizCategory, setBizCategory] = useState('Home & Facilities Repairs');
    const [bizCity, setBizCity] = useState('San Francisco, CA');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [bizWebsite, setBizWebsite] = useState('');
    const [claimSuccess, setClaimSuccess] = useState(false);

    // Interactive ROI Calculator State
    const [roiIndustry, setRoiIndustry] = useState('contracting');
    const [monthlyLeads, setMonthlyLeads] = useState(16);
    const [closeRate, setCloseRate] = useState(25);

    const industryData: Record<string, { name: string; avgTicket: number }> = {
        contracting: { name: 'Home & Facilities Contracting', avgTicket: 1400 },
        auto: { name: 'Auto Repair & Fleet Detailing', avgTicket: 650 },
        catering: { name: 'Office Dining & Catering', avgTicket: 950 },
        health: { name: 'Corporate Health & Wellness', avgTicket: 350 },
        operations: { name: 'Moving, Storage & Operations', avgTicket: 850 }
    };

    const currentIndustry = industryData[roiIndustry] || industryData.contracting;
    const estimatedDeals = Math.max(1, Math.round(monthlyLeads * (closeRate / 100)));
    const estimatedMonthlyRevenue = estimatedDeals * currentIndustry.avgTicket;
    const proCost = billingPeriod === 'annual' ? 59 : 79;
    const roiMultiple = Math.round(estimatedMonthlyRevenue / proCost);

    // Dynamic pricing calculations
    const pricing = {
        free: 0,
        pro: billingPeriod === 'annual' ? 59 : 79
    };

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const openClaimModal = (plan: 'free' | 'pro' = 'pro') => {
        setClaimPlan(plan);
        setClaimStep(1);
        setClaimSuccess(false);
        setIsClaimModalOpen(true);
    };

    const handleClaimSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/claims/submit', {
            business_name: bizName || 'Local Business',
            contact_name: ownerName || 'Business Owner',
            email: ownerEmail,
            phone: ownerPhone,
            website: bizWebsite
        }, {
            onSuccess: () => setClaimSuccess(true)
        });
    };

    const faqs = [
        {
            q: 'How does the Bizztopia Verified audit work?',
            a: 'When you apply to become a Verified Pro, our team checks your business license with your state or local government, looks through public records for any serious legal issues, and asks for proof of liability insurance. The whole process takes 48–72 hours.'
        },
        {
            q: 'How does new customers find my business on Bizztopia?',
            a: 'When a customer fills in a search form on Bizztopia looking for your type of service, we instantly send their job details to nearby Verified Pro businesses in that category. You get a text and email alert right away, and can respond to win the job.'
        },
        {
            q: 'Are there long-term contracts or lock-ins?',
            a: 'No. All memberships are billed on a month-to-month basis (or annually if you opt for the discount). You can downgrade or cancel your subscription at any time directly from your business settings page.'
        },
        {
            q: 'Can I add multiple physical locations to my account?',
            a: 'Yes. You can manage multiple business profiles under a single master administrator account. Verified certification and billing is managed on a per-location basis.'
        }
    ];

    return (
        <AppLayout>
            <Head title="Bizztopia for Business — Claim Listing & Verified Memberships" />

            {/* 1. HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="text-white py-20 px-6 relative overflow-hidden">
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
                    <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4" type="video/mp4" />
                </video>
                {/* Ambient Brand Overlay that lets the background video stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] z-0" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                    {/* Left: Heading Copy */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="bg-[#287FBA]/40 border border-[#287FBA]/40 text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-block font-bold">
                                Bizztopia Partner Network
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight mt-4 font-bold">
                                Get Verified. Get Seen. <br />Get Customers.
                            </h1>
                            <p className="text-[#D5EBF8] text-base font-medium mt-3 max-w-xl">
                                Claim your listing, earn the Bizztopia Verified badge, and start attracting real local customers who are actively looking to hire — no cold calls, no ads, no guesswork.
                            </p>
                        </div>

                        {/* Stat counters */}
                        <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md">
                            <div>
                                <div className="text-2xl font-black text-white font-bold">15,000+</div>
                                <div className="text-[10px] text-slate-300 font-extrabold uppercase mt-0.5 font-semibold">Verified SMBs</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white font-bold">2.4M+</div>
                                <div className="text-[10px] text-slate-300 font-extrabold uppercase mt-0.5 font-semibold">Customers Connected</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white font-bold">4.8 / 5</div>
                                <div className="text-[10px] text-slate-300 font-extrabold uppercase mt-0.5 font-semibold">Owner Trust</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <button
                                onClick={() => openClaimModal('free')}
                                className="bg-white text-[#0B4778] hover:bg-slate-50 transition-all font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer font-bold"
                            >
                                <span>Claim Your Free Profile</span>
                                <ArrowRight className="w-4.5 h-4.5" />
                            </button>
                            <a
                                href="#calculator"
                                className="border border-white/40 text-white hover:bg-white/10 transition-all font-bold text-sm px-6 py-3.5 rounded-full cursor-pointer flex items-center gap-2"
                            >
                                <Calculator className="w-4 h-4" />
                                <span>ROI Calculator</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Lead MATCH Mockup */}
                    <div className="lg:col-span-5">
                        <div className="bg-white text-slate-900 p-5 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-4 animate-in fade-in duration-500">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#287FBA] shrink-0">
                                <Award className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-sm text-slate-900 font-bold">Bizztopia Certified Verified Partner</span>
                                    <ShieldCheck className="w-4.5 h-4.5 text-[#287FBA] fill-blue-50" />
                                </div>
                                <p className="text-slate-500 text-[11px] font-medium mt-0.5">Trust certification boosts customer inquiries by 45%.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST & SECURITY BADGES BAR */}
            <section className="bg-white border-b border-slate-200/80 py-5 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-slate-600 text-xs font-bold">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#287FBA]" />
                        <span>Verified Trade License Checks</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="w-4.5 h-4.5 text-emerald-500" />
                        <span>30-Day Money-Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="w-4.5 h-4.5 text-slate-800" />
                        <span>Stripe Verified 256-Bit Billing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneCall className="w-4.5 h-4.5 text-[#287FBA]" />
                        <span>Live Support via Phone, Email &amp; Chat</span>
                    </div>
                </div>
            </section>

            {/* 2. THE BUSINESSMAN SHOWCASE SECTION */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Professional Visual Frame */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#EAF5FC] rounded-full scale-95 blur-2xl opacity-70" />
                            <div className="relative w-80 h-80 rounded-full border-4 border-[#287FBA] overflow-hidden shadow-2xl flex items-center justify-center bg-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                                    alt="Bizztopia Professional"
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>
                            {/* Orb badges */}
                            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-center text-[#287FBA]">
                                <ShieldCheck className="w-6 h-6 fill-blue-50" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-lg flex items-center justify-center text-emerald-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Right: 4 Features list */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">Solutions Overview</span>
                            <h2 className="text-3xl font-black font-outfit text-slate-950 mt-1 font-bold">Four Ways Bizztopia Works for You</h2>
                            <p className="text-slate-500 text-xs font-medium mt-1">Reach verified, high-intent customers looking for your services right now.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#287FBA]" /> Verify Licensing
                                </h4>
                                <p className="text-slate-500 text-[11px] font-medium leading-relaxed pl-4">We check state and local licensing data to add official verifications to your page.</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#287FBA]" /> Claim Reviews
                                </h4>
                                <p className="text-slate-500 text-[11px] font-medium leading-relaxed pl-4">Claim and respond to user reviews. Resolve customer issues with corporate accounts.</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#287FBA]" /> Fast Response Badge
                                </h4>
                                <p className="text-slate-500 text-[11px] font-medium leading-relaxed pl-4">Show off how quickly you respond to customers — a top trust signal that drives more bookings.</p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#287FBA]" /> Get Job Requests
                                </h4>
                                <p className="text-slate-500 text-[11px] font-medium leading-relaxed pl-4">Receive job requests directly from local customers who are looking for your type of service right now.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DYNAMIC SOLUTIONS WALKTHROUGH WITH MOCKUPS */}
            <section id="features" className="py-20 bg-slate-50 px-6 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">Step-by-Step Walkthrough</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 mt-1 font-bold">How Verified Onboarding Works</h2>
                    </div>

                    {/* Step 1: Claim Page */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <span className="bg-[#287FBA]/10 text-[#287FBA] text-[10px] font-black uppercase px-3 py-1 rounded-full font-bold">Step 01</span>
                            <h3 className="text-2xl font-black font-outfit text-slate-950 font-bold">Claim and Complete Your Profile</h3>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                Take control of your business page. Enter opening hours, detailed services checklists, custom service entry tags, and license credentials so clients search and find you.
                            </p>
                            <button
                                onClick={() => openClaimModal('free')}
                                className="inline-flex items-center gap-2 text-xs font-black text-[#287FBA] hover:text-[#0B4778] transition-colors uppercase tracking-wider"
                            >
                                <span>Claim your profile now</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {/* Mockup Card */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-[#0B4778] font-outfit">SJ</div>
                                    <div>
                                        <h4 className="font-extrabold text-slate-900 text-sm font-bold">Sarah Jenkins Catering</h4>
                                        <span className="text-[10px] text-slate-400 font-medium">Restaurants & Corporate Dining</span>
                                    </div>
                                </div>
                                <span className="bg-emerald-50 text-emerald-500 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 font-bold">
                                    <Check className="w-3 h-3" /> Claimed Page
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-[11px] font-bold text-slate-500">
                                <div><strong>Open Hours:</strong> 8:00 AM - 6:00 PM</div>
                                <div><strong>SLA Delivery:</strong> Verified 100%</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Pass Compliance */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Mockup Card */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-md order-last lg:order-first">
                            <div className="space-y-4">
                                <h4 className="font-extrabold text-slate-900 text-sm font-bold border-b border-slate-100 pb-3">Bizztopia Compliance Audit File</h4>
                                <div className="space-y-2.5 text-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 font-bold">State License Validation:</span>
                                        <span className="text-emerald-500 font-black flex items-center gap-1 font-bold"><Check className="w-3.5 h-3.5" /> Verified</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 font-bold">General Liability Insurance:</span>
                                        <span className="text-emerald-500 font-black flex items-center gap-1 font-bold"><Check className="w-3.5 h-3.5" /> Active ($1M)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 font-bold">Background Legal Records:</span>
                                        <span className="text-emerald-500 font-black flex items-center gap-1 font-bold"><Check className="w-3.5 h-3.5" /> Clean</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 space-y-4">
                            <span className="bg-[#287FBA]/10 text-[#287FBA] text-[10px] font-black uppercase px-3 py-1 rounded-full font-bold">Step 02</span>
                            <h3 className="text-2xl font-black font-outfit text-slate-950 font-bold">Pass Vetting Audits</h3>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                Upload your business license details and active insurance certificate. Our compliance team reviews your application within 48 hours and awards your Bizztopia Verified Pro trust badge.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Match Leads */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <span className="bg-[#287FBA]/10 text-[#287FBA] text-[10px] font-black uppercase px-3 py-1 rounded-full font-bold">Step 03</span>
                            <h3 className="text-2xl font-black font-outfit text-slate-950 font-bold">Receive Matching Leads</h3>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                Say goodbye to cold outreach. Receive pre-qualified quote requests directly from consumers who are actively searching for your services in your city — straight to your business dashboard.
                            </p>
                        </div>
                        {/* Mockup Card */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-[#287FBA] uppercase tracking-widest font-bold">Quote Request Alert</span>
                                    <span className="text-slate-400 text-[10px] font-bold">2 mins ago</span>
                                </div>
                                <div className="space-y-1">
                                    <h5 className="font-extrabold text-slate-900 text-xs font-bold">Office Catering - Nexa Corp</h5>
                                    <p className="text-[11px] text-slate-600 font-medium">Need lunch boxes and coffee setups for 45 corporate attendees next Thursday.</p>
                                </div>
                                <button
                                    onClick={() => openClaimModal('pro')}
                                    className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                                >
                                    Submit Bid Proposal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SMB OWNER CASE STUDIES & TESTIMONIALS */}
            <section className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">Real Success Stories</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 mt-1 font-bold">Business Owners Who Made It Work</h2>
                        <p className="text-slate-500 text-xs font-medium mt-1">Real results from businesses that joined Bizztopia's Verified Pro network.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Case Study 1 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 text-[#0B4778] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                                        HVAC & Contracting
                                    </span>
                                    <span className="text-emerald-600 text-xs font-black">+310% More Customers</span>
                                </div>
                                <h4 className="text-base font-extrabold text-slate-950">
                                    Apex Commercial Contracting
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    "Within our first 90 days with the Verified Pro badge, we closed $48,000 in commercial preventative maintenance contracts across the Bay Area."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200 text-xs flex items-center justify-between">
                                <span className="font-bold text-slate-800">Mike Hernandez, Owner</span>
                                <span className="text-slate-400 text-[10px]">Austin, TX</span>
                            </div>
                        </div>

                        {/* Case Study 2 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 text-[#0B4778] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                                        Catering & Dining
                                    </span>
                                    <span className="text-emerald-600 text-xs font-black">+58% Conversion</span>
                                </div>
                                <h4 className="text-base font-extrabold text-slate-950">
                                    Sarah Jenkins Catering
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    "Displaying our verified food safety license and liability badge gave corporate clients the reassurance they needed. Our weekly corporate lunch orders doubled."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200 text-xs flex items-center justify-between">
                                <span className="font-bold text-slate-800">Sarah Jenkins, Founder</span>
                                <span className="text-slate-400 text-[10px]">San Francisco, CA</span>
                            </div>
                        </div>

                        {/* Case Study 3 */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="bg-blue-100 text-[#0B4778] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                                        Fleet & Auto Services
                                    </span>
                                    <span className="text-emerald-600 text-xs font-black">8 Fleet Accounts</span>
                                </div>
                                <h4 className="text-base font-extrabold text-slate-950">
                                    Elite Fleet Detailing & Repair
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                    "Whenever a customer reaches out through Bizztopia, we get an instant alert and can reply within 5 minutes. We picked up 8 recurring van maintenance contracts in our very first month."
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200 text-xs flex items-center justify-between">
                                <span className="font-bold text-slate-800">David Chen, Owner</span>
                                <span className="text-slate-400 text-[10px]">Chicago, IL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE REVENUE & LEAD ROI ESTIMATOR */}
            <section id="calculator" className="py-20 bg-slate-900 text-white px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="max-w-5xl mx-auto relative z-10 space-y-12">
                    <div className="text-center space-y-2">
                        <span className="bg-[#287FBA]/20 border border-[#287FBA]/40 text-[#63B5E8] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block font-bold">
                            Interactive Growth Estimator
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight font-bold">
                            Calculate Your Revenue Potential
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-md mx-auto">
                            See how much additional monthly revenue Verified Pro certification can generate for your business.
                        </p>
                    </div>

                    <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Sliders on Left */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                                    1. Your Business Industry
                                </label>
                                <select
                                    value={roiIndustry}
                                    onChange={(e) => setRoiIndustry(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                >
                                    <option value="contracting">Home & Facilities Contracting ($1,400 avg job)</option>
                                    <option value="auto">Auto Repair & Fleet Detailing ($650 avg job)</option>
                                    <option value="catering">Office Dining & Catering ($950 avg job)</option>
                                    <option value="health">Corporate Health & Wellness ($350 avg job)</option>
                                    <option value="operations">Moving, Storage & Operations ($850 avg job)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-black text-slate-700 uppercase tracking-wider">
                                        2. How Many New Customers Per Month?
                                    </span>
                                    <span className="font-black text-[#287FBA] text-sm">{monthlyLeads} customers/mo</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="50"
                                    value={monthlyLeads}
                                    onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#287FBA]"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-black text-slate-700 uppercase tracking-wider">
                                        3. How Many Do You Win?
                                    </span>
                                    <span className="font-black text-[#287FBA] text-sm">{closeRate}% won</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="50"
                                    step="5"
                                    value={closeRate}
                                    onChange={(e) => setCloseRate(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#287FBA]"
                                />
                            </div>
                        </div>

                        {/* Calculated Output Card on Right */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B4778] to-[#287FBA] text-white rounded-2xl p-6 text-center space-y-5 shadow-lg">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block">
                                Estimated Additional Value
                            </span>

                            <div>
                                <div className="text-4xl sm:text-5xl font-black font-outfit tracking-tight">
                                    +${estimatedMonthlyRevenue.toLocaleString()}
                                </div>
                                <span className="text-xs text-blue-100 font-semibold block mt-1">
                                    New monthly gross revenue
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 border-t border-white/20 pt-4 text-xs">
                                <div className="bg-white/10 p-2.5 rounded-xl">
                                    <span className="text-slate-200 block text-[10px]">Won Clients</span>
                                    <span className="font-black text-base">~{estimatedDeals} / mo</span>
                                </div>
                                <div className="bg-white/10 p-2.5 rounded-xl">
                                    <span className="text-slate-200 block text-[10px]">Net ROI Multiple</span>
                                    <span className="font-black text-base text-emerald-300">{roiMultiple}x</span>
                                </div>
                            </div>

                            <button
                                onClick={() => openClaimModal('pro')}
                                className="w-full bg-white text-[#0B4778] hover:bg-slate-50 transition-all font-black text-xs uppercase py-3 rounded-xl shadow-md cursor-pointer"
                            >
                                Grow My Customer Base Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. MEMBERSHIP PLANS / PRICING */}
            <section id="pricing" className="py-20 bg-white px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-xl mx-auto space-y-4">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">Transparent Pricing</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight font-bold">Simple, Transparent Plans</h2>

                        {/* Toggle billing period */}
                        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200 mt-2">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`px-4 py-1.5 text-xs font-black rounded-full transition-all cursor-pointer ${billingPeriod === 'monthly' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 font-bold'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('annual')}
                                className={`px-4 py-1.5 text-xs font-black rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${billingPeriod === 'annual' ? 'bg-[#287FBA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 font-bold'}`}
                            >
                                Annual <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full font-bold">Save 25%</span>
                            </button>
                        </div>
                    </div>

                    {/* Stat Testimonial card inline */}
                    <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-3xl p-5 text-center flex items-center justify-center gap-3 text-[#0B4778] text-xs font-bold shadow-2xs">
                        <VerifiedIcon className="w-5 h-5 text-[#287FBA]" />
                        <span>90% of buyers make a purchase decision based on verified Bizztopia trust badges.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-between space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-black font-outfit text-slate-950 font-bold">Free Profile</h4>
                                    <p className="text-slate-400 text-xs font-medium mt-1">Claim your listing and manage basic business details.</p>
                                </div>
                                <div className="text-4xl font-black text-slate-950 font-bold">
                                    $0<span className="text-xs font-medium text-slate-400"> / month</span>
                                </div>
                                <ul className="space-y-3.5 text-slate-600 text-xs font-medium border-t border-slate-200/60 pt-6">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Claim listing page & edit hours</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Respond to customer reviews</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Direct message inquiries</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Custom services checklists</li>
                                </ul>
                            </div>
                            <button
                                onClick={() => openClaimModal('free')}
                                className="w-full border border-[#287FBA] hover:bg-blue-50 text-[#287FBA] font-extrabold text-sm py-3.5 rounded-xl transition-all cursor-pointer font-bold"
                            >
                                Get Started Free
                            </button>
                        </div>

                        {/* Verified Pro Plan */}
                        <div className="bg-white border-2 border-[#287FBA] rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#287FBA] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-6 rounded-bl-2xl font-bold">
                                Most Popular
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-black font-outfit text-slate-950 font-bold">Verified Pro Member</h4>
                                    <p className="text-slate-500 text-xs font-medium mt-1">Stand out, display trust certifications, and capture leads.</p>
                                </div>
                                <div className="text-4xl font-black text-slate-950 font-bold">
                                    ${pricing.pro}<span className="text-xs font-medium text-slate-400"> / month</span>
                                </div>
                                <ul className="space-y-3.5 text-slate-600 text-xs font-medium border-t border-slate-200/60 pt-6">
                                    <li className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Bizztopia Verified Pro Certification Badge</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Premium local search placement boosts</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Ad-Free business page (blocks competitor ads)</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Unlimited match lead quote requests</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Verified licenses and liability badge indicators</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#287FBA] shrink-0" /> Dedicated priority telephone support</li>
                                </ul>
                            </div>
                            <button
                                onClick={() => openClaimModal('pro')}
                                className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-md font-bold"
                            >
                                Upgrade to Verified Pro
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. COMPARISON TABLE */}
            <section className="py-20 bg-slate-50 px-6 border-t border-slate-200/60">
                <div className="max-w-4xl mx-auto space-y-10">
                    <h3 className="text-2xl font-black font-outfit text-slate-950 tracking-tight text-center font-bold">Detailed Plan Comparison</h3>
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                        <table className="w-full border-collapse text-left text-xs font-medium text-slate-700">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-4 sm:p-5 font-black text-slate-900 font-bold">Feature Details</th>
                                    <th className="p-4 text-center font-black text-slate-900 font-bold">Free</th>
                                    <th className="p-4 text-center font-black text-[#287FBA] font-bold">Verified Pro</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Direct Messaging & Chat Reviews</td>
                                    <td className="p-4 text-center"><Check className="w-4 h-4 text-slate-400 mx-auto" /></td>
                                    <td className="p-4 text-center"><Check className="w-4 h-4 text-[#287FBA] mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Verified Pro Certification Badge</td>
                                    <td className="p-4 text-center text-slate-300">-</td>
                                    <td className="p-4 text-center"><Check className="w-4 h-4 text-[#287FBA] mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Lead Match Bids Access</td>
                                    <td className="p-4 text-center text-slate-300">Read-Only</td>
                                    <td className="p-4 text-center font-bold text-[#287FBA]">Unlimited Bidding</td>
                                </tr>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Directory Placement boost</td>
                                    <td className="p-4 text-center text-slate-300">Standard</td>
                                    <td className="p-4 text-center font-bold text-[#287FBA]">3x Placements Boost</td>
                                </tr>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Competitor Ad Blocking</td>
                                    <td className="p-4 text-center text-slate-300">-</td>
                                    <td className="p-4 text-center"><Check className="w-4 h-4 text-[#287FBA] mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                    <td className="p-4 sm:p-5 font-bold text-slate-900">Corporate Account Support</td>
                                    <td className="p-4 text-center text-slate-300">-</td>
                                    <td className="p-4 text-center"><Check className="w-4 h-4 text-[#287FBA] mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 8. VERIFIED PLACEMENTS RANK TABLE MOCKUP */}
            <section className="py-20 bg-white px-6 border-t border-slate-200/60">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">Search Placements</span>
                        <h3 className="text-2xl font-black font-outfit text-slate-950 font-bold">Verified Members Rank Top</h3>
                        <p className="text-slate-500 text-xs font-medium mt-1">See how verified trust badge holders sit prioritized above free directory listings.</p>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mock Search Results: "HVAC Services near San Francisco, CA"</div>

                        <div className="space-y-3">
                            {/* Rank 1 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-3xs">
                                <div className="flex items-center gap-3">
                                    <span className="font-extrabold text-sm text-slate-400">#1</span>
                                    <div>
                                        <h5 className="text-sm font-extrabold text-slate-900 font-bold">Apex Commercial HVAC</h5>
                                        <span className="text-[10px] text-slate-400 font-medium">Licensed, Bonded & Insured Pro</span>
                                    </div>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 font-bold">
                                    <VerifiedIcon className="w-3.5 h-3.5" /> Verified Partner
                                </span>
                            </div>

                            {/* Rank 2 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-3xs">
                                <div className="flex items-center gap-3">
                                    <span className="font-extrabold text-sm text-slate-400">#2</span>
                                    <div>
                                        <h5 className="text-sm font-extrabold text-slate-900 font-bold">Summit Contractors & Co</h5>
                                        <span className="text-[10px] text-slate-400 font-medium">HVAC repair & Commercial diagnostics</span>
                                    </div>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 font-bold">
                                    <VerifiedIcon className="w-3.5 h-3.5" /> Verified Partner
                                </span>
                            </div>

                            {/* Rank 3 */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-3xs">
                                <div className="flex items-center gap-3">
                                    <span className="font-extrabold text-sm text-slate-400">#3</span>
                                    <div>
                                        <h5 className="text-sm font-extrabold text-slate-900 font-bold">Delta Facilities Group</h5>
                                        <span className="text-[10px] text-slate-400 font-medium">Office HVAC maintenance systems</span>
                                    </div>
                                </div>
                                <span className="bg-blue-50 text-[#287FBA] border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 font-bold">
                                    <VerifiedIcon className="w-3.5 h-3.5" /> Verified Partner
                                </span>
                            </div>

                            {/* Rank 4 */}
                            <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between gap-4 opacity-75">
                                <div className="flex items-center gap-3">
                                    <span className="font-extrabold text-sm text-slate-400">#4</span>
                                    <div>
                                        <h5 className="text-sm font-bold text-slate-600">Standard Contractor Services</h5>
                                        <span className="text-[10px] text-slate-400 font-medium">Unverified local service listings</span>
                                    </div>
                                </div>
                                <span className="text-slate-400 text-[10px] font-bold">Standard listing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. FAQ SECTION */}
            <section className="py-20 bg-slate-50 px-6 border-t border-slate-200/60">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h3 className="text-2xl font-black font-outfit text-slate-950 tracking-tight text-center font-bold">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-5 flex items-center justify-between text-left font-bold text-xs text-slate-900 hover:text-[#287FBA] transition-colors cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    {activeFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {activeFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-500 text-xs leading-relaxed font-medium border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-1 duration-150">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. BOTTOM CTA CARD */}
            <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#287FBA]/20 border border-[#287FBA]/40 flex items-center justify-center mx-auto text-[#287FBA]">
                        <Award className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight font-bold">
                        Ready to Grow with Bizztopia?
                    </h2>
                    <p className="text-slate-300 text-sm font-medium max-w-xl mx-auto">
                        Get matched with high-value local business contracts and build trust in your community. Join Bizztopia for Business today.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => openClaimModal('free')}
                            className="bg-[#287FBA] hover:bg-[#0B4778] text-white px-8 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2 cursor-pointer font-bold"
                        >
                            Claim Free Profile Now
                        </button>
                        <a href="tel:18005550199" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3.5 rounded-full font-bold text-sm inline-flex items-center gap-2 cursor-pointer">
                            Contact Business Sales
                        </a>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE CLAIM MODAL */}
            {isClaimModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsClaimModalOpen(false)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {!claimSuccess ? (
                            <form onSubmit={handleClaimSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#287FBA] text-[10px] font-black uppercase">
                                        <Building2 className="w-3.5 h-3.5" />
                                        <span>Step {claimStep} of 2 • {claimPlan === 'pro' ? 'Verified Pro Application' : 'Free Profile Claim'}</span>
                                    </div>
                                    <h3 className="text-2xl font-black font-outfit text-slate-950">
                                        Claim Your Business Listing
                                    </h3>
                                    <p className="text-slate-500 text-xs font-medium">
                                        Verify your ownership to unlock quote bidding and verified directory placement.
                                    </p>
                                </div>

                                {claimStep === 1 ? (
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                Business Legal / Trade Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Apex Commercial Contracting LLC"
                                                value={bizName}
                                                onChange={(e) => setBizName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                Primary Trade Category
                                            </label>
                                            <select
                                                value={bizCategory}
                                                onChange={(e) => setBizCategory(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                            >
                                                <option value="Home & Facilities Repairs">Home & Facilities Repairs (Plumbing, HVAC, Electrical)</option>
                                                <option value="Auto Repair & Services">Auto Repair, Fleet Detailing & Body Shops</option>
                                                <option value="Restaurants & Catering">Corporate Dining, Catering & Food Trucks</option>
                                                <option value="Health & Wellness">Chiropractic, Physical Therapy & Spas</option>
                                                <option value="Travel & Event Services">Venues, Corporate Retreats & Experiences</option>
                                                <option value="Direct Operations & Moving">Commercial Moving, Storage & Dry Cleaning</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                Primary City & State
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. San Francisco, CA"
                                                value={bizCity}
                                                onChange={(e) => setBizCity(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            disabled={!bizName.trim()}
                                            onClick={() => setClaimStep(2)}
                                            className="w-full bg-[#287FBA] hover:bg-[#0B4778] disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                        >
                                            <span>Next: Owner Verification</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                Owner / Operator Full Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Marcus Jenkins"
                                                value={ownerName}
                                                onChange={(e) => setOwnerName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                    Business Email
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="owner@company.com"
                                                    value={ownerEmail}
                                                    onChange={(e) => setOwnerEmail(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
                                                    Business Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="(555) 019-2834"
                                                    value={ownerPhone}
                                                    onChange={(e) => setOwnerPhone(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#287FBA]"
                                                />
                                            </div>
                                        </div>

                                        {/* Preview Card */}
                                        <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl space-y-2">
                                            <div className="text-[10px] font-black uppercase text-[#287FBA] tracking-wider">
                                                Verification Preview
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="font-extrabold text-sm text-slate-900 block">{bizName || 'Your Business'}</span>
                                                    <span className="text-[11px] text-slate-500 font-medium">{bizCategory} • {bizCity}</span>
                                                </div>
                                                <span className="bg-[#287FBA] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                    {claimPlan === 'pro' ? 'Verified Pro' : 'Claimed'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setClaimStep(1)}
                                                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase px-5 py-3.5 rounded-xl cursor-pointer"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-[#287FBA] hover:bg-[#0B4778] text-white font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                                            >
                                                <span>Confirm & Submit Verification</span>
                                                <Check className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black font-outfit text-slate-950">Claim Application Received!</h3>
                                    <p className="text-slate-500 text-xs font-medium max-w-sm mx-auto">
                                        Thank you, {ownerName}. Our onboarding compliance desk is reviewing <strong>{bizName}</strong>. You will receive an activation SMS & email within 24 hours.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <button
                                        onClick={() => setIsClaimModalOpen(false)}
                                        className="bg-[#287FBA] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                                    >
                                        Back to Business Portal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
