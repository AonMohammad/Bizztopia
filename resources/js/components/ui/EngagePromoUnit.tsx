import React, { useState } from 'react';
import { Sparkles, Vote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

export interface EngagePromoUnitProps {
    variant?: 'inline' | 'sidebar' | 'banner';
    className?: string;
}

export const EngagePromoUnit: React.FC<EngagePromoUnitProps> = ({
    variant = 'inline',
    className = ''
}) => {
    const [votedOption, setVotedOption] = useState<number | null>(null);
    const [votes, setVotes] = useState([
        { id: 1, text: 'AEO & AI Search (ChatGPT/Perplexity)', percent: 45 },
        { id: 2, text: 'Interactive ROI Calculators & Tools', percent: 35 },
        { id: 3, text: 'Paid Ads & Targeted Search', percent: 20 },
    ]);

    const handleVote = (id: number) => {
        if (votedOption) return;
        setVotedOption(id);
    };

    return (
        <div 
            className={`
                rounded-2xl border transition-all duration-300 relative overflow-hidden shadow-xs
                ${variant === 'banner' 
                    ? 'bg-gradient-brand text-white border-[#0B4778] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6' 
                    : 'bg-white border-[#E6EEF3] p-6 space-y-4'}
                ${className}
            `}
        >
            {/* Header Badge */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                        <Sparkles className="w-4 h-4 text-[#4A9AD4]" />
                    </div>
                    <div>
                        <Badge variant="brand" size="sm">
                            Engage Interactive Unit
                        </Badge>
                        <span className="text-[10px] text-[#718797] font-semibold block sm:inline sm:ml-2">
                            • Live Founder Pulse
                        </span>
                    </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#63B5E8]">
                    Embedded Experience
                </span>
            </div>

            {/* Content Body */}
            <div className="space-y-3">
                <h4 className={`font-bold font-outfit ${variant === 'banner' ? 'text-white text-xl' : 'text-[#102A3D] text-base'}`}>
                    Quick Pulse: Which strategy yields the highest lead conversion for your business?
                </h4>

                <div className="space-y-2">
                    {votes.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            className={`
                                w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all duration-200
                                flex items-center justify-between relative overflow-hidden
                                ${votedOption === option.id 
                                    ? 'border-[#4A9AD4] bg-[#EAF5FC] text-[#0B4778]' 
                                    : 'border-[#E6EEF3] bg-[#F7FAFC] text-[#102A3D] hover:bg-[#EEF4F8]'}
                            `}
                        >
                            {votedOption && (
                                <div 
                                    className="absolute inset-y-0 left-0 bg-[#4A9AD4]/20 transition-all duration-500"
                                    style={{ width: `${option.percent}%` }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {votedOption === option.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#249A68]" />}
                                {option.text}
                            </span>
                            {votedOption && (
                                <span className="relative z-10 font-bold text-[#287FBA]">{option.percent}%</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex items-center justify-between text-xs">
                <a href="/engage" className="inline-flex items-center gap-1 font-bold text-[#287FBA] hover:text-[#0B4778] transition-colors">
                    Take Founder Archetype Quiz <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
};
