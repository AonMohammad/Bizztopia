import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Briefcase, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Careers() {
    const openings = [
        { title: 'Senior Full Stack Engineer (Laravel & React)', department: 'Engineering', location: 'San Francisco, CA (Hybrid)', type: 'Full-Time' },
        { title: 'Vetting Compliance Specialist', department: 'Trust & Safety', location: 'Remote (US)', type: 'Full-Time' },
        { title: 'Local Business Partner Executive', department: 'Sales & Growth', location: 'Austin, TX / Remote', type: 'Full-Time' },
        { title: 'Director of Product Design', department: 'Design', location: 'San Francisco, CA', type: 'Full-Time' },
        { title: 'Customer Experience Advocate', department: 'Operations', location: 'Remote (US / Canada)', type: 'Full-Time' }
    ];

    return (
        <AppLayout>
            <Head title="Careers at Bizztopia — Build the Future of Local Trust" />

            {/* HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="relative min-h-[440px] flex items-center justify-center py-20 px-6 overflow-hidden text-white">
                {/* Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')` 
                    }}
                />
                {/* Gradient Tint Overlay that lets the background image stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />

                <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
                    <span className="bg-[#287FBA]/40 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Join Our Team</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Work With Us at Bizztopia
                    </h1>
                    <p className="text-[#D5EBF8] text-base font-medium max-w-xl mx-auto">
                        We are on a mission to bring total transparency, verified accountability, and digital growth to millions of local service businesses across North America.
                    </p>
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className="py-20 bg-slate-50 px-6">
                <div className="max-w-4xl mx-auto space-y-10">
                    <div className="text-center space-y-1">
                        <span className="text-xs font-black uppercase tracking-widest text-[#287FBA]">Open Opportunities</span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950">Current Job Openings</h2>
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-base font-extrabold text-slate-950 font-outfit">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                                        <span className="text-[#287FBA] font-bold">{job.department}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <Link 
                                    href="/contact" 
                                    className="bg-[#287FBA] hover:bg-[#0B4778] text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl transition-all inline-flex items-center justify-center gap-1 shrink-0"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
