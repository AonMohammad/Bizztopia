import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('General Support');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        router.post('/contact/submit', {
            name,
            email,
            subject,
            message
        }, {
            onSuccess: () => {
                setSubmitted(true);
                setSubmitting(false);
            },
            onError: () => setSubmitting(false)
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Us — Bizztopia Support & Partner Desk" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[420px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Support & Partner Inquiries</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        How Can We Help You Today?
                    </h1>
                    <p className="text-[#D5EBF8] text-base font-medium max-w-xl mx-auto">
                        Whether you need help claiming your business listing, have questions about our $2,500 guarantee, or want to report a review, our team is here for you.
                    </p>
                </div>
            </section>

            {/* CONTACT FORM & INFO SECTION */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Contact Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                            <h3 className="text-lg font-black font-outfit text-slate-950">Direct Contact</h3>
                            
                            <div className="space-y-4 text-xs font-medium text-slate-600">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#287FBA] flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-900 block">General Support</span>
                                        <span>hello@bizztopia.com</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#287FBA] flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-900 block">Compliance & Vetting Desk</span>
                                        <span>verify@bizztopia.com</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#287FBA] flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-900 block">Toll-Free Support Line</span>
                                        <span>1-800-555-0199 (Mon–Fri 8am–7pm EST)</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#287FBA] flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="font-bold text-slate-900 block">Headquarters</span>
                                        <span>500 Howard Street, Suite 400<br />San Francisco, CA 94105</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl text-xs space-y-2 text-[#0B4778]">
                            <div className="flex items-center gap-2 font-black">
                                <Clock className="w-4 h-4 text-[#287FBA]" />
                                <span>Typical Response SLA</span>
                            </div>
                            <p className="font-medium leading-relaxed">
                                Most consumer inquiries are answered within 4 business hours. Verification audits for business listings are processed within 24–48 hours.
                            </p>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <h3 className="text-xl font-black font-outfit text-slate-950">Send Us a Message</h3>
                                    <p className="text-slate-500 text-xs font-medium mt-0.5">Fill out the form below and an agent will reply to your email.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black uppercase text-slate-700 block">Your Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Marcus Jenkins"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-black uppercase text-slate-700 block">Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@domain.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase text-slate-700 block">Inquiry Category</label>
                                    <select 
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                    >
                                        <option value="General Support">General Support & Feedback</option>
                                        <option value="Business Claim Verification">Claim Business Listing / Verified Pro Audit</option>
                                        <option value="Consumer Guarantee Claim">$2,500 Consumer Protection Guarantee Claim</option>
                                        <option value="Review Dispute">Review Moderation / Fake Review Report</option>
                                        <option value="Press / Media">Press & Media Relations</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase text-slate-700 block">Message Details</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Please provide specifics so we can assist you quickly..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#287FBA]"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>Send Inquiry</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black font-outfit text-slate-950">Inquiry Received!</h3>
                                <p className="text-slate-500 text-xs font-medium max-w-md mx-auto">
                                    Thank you, {name}. A support specialist will review your request under <strong>{subject}</strong> and reach out to {email} shortly.
                                </p>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
