import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Star, Search, MapPin, CheckCircle2, ChevronRight, PenTool, ShieldAlert } from 'lucide-react';

export default function WriteReview() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBiz, setSelectedBiz] = useState<any | null>(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const mockBusinesses = [
        { id: 1, name: 'Sarah Jenkins Catering', category: 'Restaurants & Catering', location: 'San Francisco, CA', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=150&q=80' },
        { id: 2, name: 'Vanguard Web Labs', category: 'Custom Web & Software Development', location: 'Oakland, CA', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&q=80' },
        { id: 3, name: 'Regentology Advisory', category: 'Finance & Real Estate Services', location: 'San Francisco, CA', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80' },
        { id: 4, name: 'Apex Commercial HVAC', category: 'Home & Garden / Facilities', location: 'San Jose, CA', img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=150&q=80' },
        { id: 5, name: 'Elite Fleet Detailing', category: 'Auto Repair & Services', location: 'San Francisco, CA', img: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=150&q=80' },
        { id: 6, name: 'Nexa Wellness Clinics', category: 'Health & Beauty Spas', location: 'Dallas, TX', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80' }
    ];

    const filteredBusinesses = mockBusinesses.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/reviews/submit', {
            business_name: selectedBiz?.name || 'Verified Partner',
            author_name: authorName || 'Verified Reviewer',
            rating: rating || 5,
            review_body: reviewText
        }, {
            onSuccess: () => {
                setReviewSubmitted(true);
                setTimeout(() => {
                    setReviewSubmitted(false);
                    setSelectedBiz(null);
                    setRating(0);
                    setReviewText('');
                    setAuthorName('');
                }, 3000);
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Write a Review — Share Your Business Experience" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[320px] flex items-center justify-center py-16 px-6 overflow-hidden text-white">
                {/* Visible Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Brand Overlay that allows the background image to remain clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-3">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Bizztopia Review Center</span>
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        {selectedBiz ? `Write a Review for ${selectedBiz.name}` : 'Find a Business to Review'}
                    </h1>
                    <p className="text-[#D5EBF8] text-sm font-medium max-w-lg mx-auto">
                        Share your authentic customer experience to empower community members and help verified pros maintain high standards.
                    </p>
                </div>
            </section>

            <div className="bg-slate-50 min-h-screen py-12 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Businesses Selector or Form */}
                    <div className="lg:col-span-8 space-y-6">

                        {!selectedBiz ? (
                            <>
                                {/* Search bar */}
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
                                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by business name or category..." 
                                        className="w-full text-slate-900 placeholder-slate-400 font-bold text-sm focus:outline-none bg-transparent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Directory grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredBusinesses.map((biz) => (
                                        <div key={biz.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex gap-4">
                                            <img src={biz.img} alt={biz.name} className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0" />
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug font-bold">{biz.name}</h3>
                                                    <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">{biz.category}</span>
                                                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium mt-1">
                                                        <MapPin className="w-3.5 h-3.5" /> {biz.location}
                                                    </span>
                                                </div>

                                                {/* Select stars to start */}
                                                <div className="flex items-center gap-1 mt-3">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedBiz(biz);
                                                                setRating(star);
                                                            }}
                                                            className="text-slate-200 hover:scale-110 transition-transform cursor-pointer"
                                                        >
                                                            <Star className="w-5 h-5 fill-slate-200 text-slate-200 hover:text-[#287FBA] hover:fill-[#287FBA]" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Review Submission Form */
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                                {reviewSubmitted ? (
                                    <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-black font-outfit text-slate-950 font-bold">Review Submitted!</h4>
                                        <p className="text-slate-600 text-xs font-medium max-w-sm mx-auto">
                                            Thank you for sharing your feedback. Your review helps keep the Bizztopia network trusted and verified.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                                        {/* Dynamic Star Selector */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Select Rating</label>
                                            <div className="flex items-center gap-1.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setRating(star)}
                                                        className="hover:scale-110 transition-transform cursor-pointer"
                                                    >
                                                        <Star 
                                                            className={`w-8 h-8 transition-colors ${
                                                                star <= (hoverRating || rating) 
                                                                    ? 'text-[#287FBA] fill-[#287FBA]' 
                                                                    : 'text-slate-200 fill-slate-200'
                                                            }`} 
                                                        />
                                                    </button>
                                                ))}
                                                <span className="text-xs font-bold text-slate-400 ml-3">
                                                    {rating > 0 ? `${rating} / 5 stars selected` : 'Select a rating to proceed'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Text area */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Your Review</label>
                                            <textarea 
                                                rows={6}
                                                placeholder={`Tell us about the service quality, communication, and response times of ${selectedBiz.name}...`}
                                                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-medium text-sm text-slate-900 leading-relaxed"
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex items-center gap-4 pt-2">
                                            <button 
                                                type="submit" 
                                                disabled={rating === 0}
                                                className="bg-[#287FBA] hover:bg-[#0B4778] disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer font-bold"
                                            >
                                                Post Review
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setSelectedBiz(null)}
                                                className="border border-slate-200 hover:bg-slate-50 text-slate-500 font-extrabold text-xs px-6 py-3.5 rounded-xl transition-colors cursor-pointer font-bold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Review Guidelines Sidebar */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
                        <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
                            <PenTool className="w-5 h-5 text-[#287FBA]" />
                            <h3 className="text-lg font-black font-outfit text-slate-950 font-bold">Review Guidelines</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="text-xs font-bold text-slate-900">Be Helpful & Objective</h5>
                                    <p className="text-[11px] text-slate-500 font-medium">Share what went well, what could be better, and what the service involved.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="text-xs font-bold text-slate-900">Keep It Professional</h5>
                                    <p className="text-[11px] text-slate-500 font-medium">Avoid personal attacks, profanity, or sharing sensitive billing numbers.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <h5 className="text-xs font-bold text-slate-900">Ensure Factuality</h5>
                                    <p className="text-[11px] text-slate-500 font-medium">Only submit reviews for services you actually contracted or received bids from.</p>
                                </div>
                            </li>
                        </ul>

                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-amber-800">
                            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                            <div>
                                <h4 className="text-xs font-bold">Fake Review Alert</h4>
                                <p className="text-[10px] text-amber-700 font-medium mt-0.5">Bizztopia monitors and audits IP ranges. Submitting paid or biased reviews results in page termination.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
