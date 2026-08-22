import React, { useState, useEffect } from 'react';
import { Gift, Clock, Sparkles, CheckCircle2, User, Mail, Building, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export interface GiveawayItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    prize_value: string;
    ends_at: string;
    total_entries: number;
    rules?: string;
}

interface GiveawayCardProps {
    giveaway: GiveawayItem;
    onEnter?: (name: string, email: string, company: string) => Promise<void>;
}

export const GiveawayCard: React.FC<GiveawayCardProps> = ({ giveaway, onEnter }) => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number }>({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
    });

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(giveaway.ends_at) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    mins: Math.floor((difference / 1000 / 60) % 60),
                    secs: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [giveaway.ends_at]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (onEnter) {
                await onEnter(name, email, company);
            } else {
                await fetch(`/engage/giveaways/${giveaway.id}/enter`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ name, email, company_name: company }),
                });
            }
            setSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-white via-white to-[#F4FAFE] p-6 sm:p-8 rounded-2xl border border-[#4A9AD4]/30 shadow-md space-y-6 flex flex-col justify-between h-full relative overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A9AD4]/10 rounded-full blur-2xl -z-10"></div>

            <div className="space-y-4">
                {/* Prize Header Badge */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="bg-amber-500/10 text-amber-600 border border-amber-500/30 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-amber-500" /> {giveaway.prize_value}
                    </span>
                    <span className="text-xs text-[#718797] font-semibold flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#4A9AD4]" /> {giveaway.total_entries + (submitted ? 1 : 0)} Verified Entries
                    </span>
                </div>

                {/* Campaign Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#102A3D] leading-tight">
                    {giveaway.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#466071] leading-relaxed">
                    {giveaway.description}
                </p>

                {/* Live Countdown Timer Grid */}
                <div className="bg-[#041E34] text-white p-4 rounded-xl space-y-2 border border-[#0B4778]">
                    <div className="text-[10px] uppercase font-bold text-[#8FC7E8] tracking-widest flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#63B5E8]" /> Campaign Ends In:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="text-lg font-black font-outfit text-white block">{timeLeft.days}</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#8FC7E8] font-bold">Days</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="text-lg font-black font-outfit text-white block">{timeLeft.hours}</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#8FC7E8] font-bold">Hours</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="text-lg font-black font-outfit text-white block">{timeLeft.mins}</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#8FC7E8] font-bold">Mins</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                            <span className="text-lg font-black font-outfit text-amber-400 block">{timeLeft.secs}</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#8FC7E8] font-bold">Secs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Entry Form or Confirmation */}
            <div className="pt-4 border-t border-[#E6EEF3]">
                {submitted ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                            <div className="text-xs font-bold">Entry Confirmed!</div>
                            <div className="text-[11px] text-emerald-800">You are registered for the drawing. Winner will be notified via email.</div>
                        </div>
                    </div>
                ) : showForm ? (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="relative">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder="Full Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#E6EEF3] focus:border-[#287FBA] focus:outline-none bg-white text-[#102A3D]"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="email"
                                placeholder="Business Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#E6EEF3] focus:border-[#287FBA] focus:outline-none bg-white text-[#102A3D]"
                            />
                        </div>
                        <div className="relative">
                            <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder="Company Name (Optional)..."
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#E6EEF3] focus:border-[#287FBA] focus:outline-none bg-white text-[#102A3D]"
                            />
                        </div>
                        <Button type="submit" variant="primary" size="sm" fullWidth isLoading={submitting} className="font-bold">
                            Confirm Giveaway Entry
                        </Button>
                    </form>
                ) : (
                    <Button 
                        type="button" 
                        variant="primary" 
                        size="md" 
                        fullWidth 
                        onClick={() => setShowForm(true)}
                        className="bg-[#287FBA] hover:bg-[#102A3D] text-white font-bold"
                    >
                        <Sparkles className="w-4 h-4 mr-2 text-amber-300" /> Enter to Win Now
                    </Button>
                )}
            </div>
        </div>
    );
};
