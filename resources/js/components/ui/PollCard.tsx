import React, { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { CheckCircle2, Vote, Sparkles } from 'lucide-react';

export interface PollOptionItem {
    id: number;
    option_text: string;
    votes_count: number;
}

export interface PollCardProps {
    id: number;
    title: string;
    description?: string;
    category?: string;
    total_votes: number;
    has_voted?: boolean;
    options: PollOptionItem[];
    onVote?: (optionId: number) => Promise<void>;
    className?: string;
}

export const PollCard: React.FC<PollCardProps> = ({
    id,
    title,
    description,
    category = 'General Business',
    total_votes: initialTotalVotes,
    has_voted: initialHasVoted = false,
    options: initialOptions,
    onVote,
    className = ''
}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [hasVoted, setHasVoted] = useState(initialHasVoted);
    const [totalVotes, setTotalVotes] = useState(initialTotalVotes);
    const [options, setOptions] = useState(initialOptions);
    const [voting, setVoting] = useState(false);

    const handleVoteSubmit = async () => {
        if (!selectedOption || voting) return;

        setVoting(true);
        try {
            if (onVote) {
                await onVote(selectedOption);
            } else {
                // Client-side fallback computation
                const updatedOptions = options.map((opt) => 
                    opt.id === selectedOption ? { ...opt, votes_count: opt.votes_count + 1 } : opt
                );
                setOptions(updatedOptions);
                setTotalVotes((prev) => prev + 1);
            }
            setHasVoted(true);
        } catch (err) {
            console.error('Vote failed:', err);
        } finally {
            setVoting(false);
        }
    };

    return (
        <div 
            className={`
                bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md transition-all duration-300 space-y-6
                ${className}
            `}
        >
            {/* Poll Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">
                        <Vote className="w-3 h-3 mr-1" /> {category} Poll
                    </Badge>
                    <span className="text-xs font-semibold text-[#718797]">
                        {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                    </span>
                </div>

                <h3 className="text-xl font-bold font-outfit text-[#102A3D]">
                    {title}
                </h3>
                {description && (
                    <p className="text-xs text-[#466071]">
                        {description}
                    </p>
                )}
            </div>

            {/* Poll Options List */}
            <div className="space-y-3">
                {options.map((option) => {
                    const percentage = totalVotes > 0 
                        ? Math.round((option.votes_count / totalVotes) * 100) 
                        : 0;

                    return (
                        <div key={option.id} className="relative">
                            {hasVoted ? (
                                /* Result State: Animated Bar */
                                <div className="p-3.5 rounded-xl border border-[#E6EEF3] bg-[#F7FAFC] overflow-hidden relative">
                                    <div 
                                        className="absolute inset-y-0 left-0 bg-[#EAF5FC] border-r-2 border-[#4A9AD4] transition-all duration-700 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                    <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-[#102A3D]">
                                        <span className="flex items-center gap-2">
                                            {selectedOption === option.id && (
                                                <CheckCircle2 className="w-4 h-4 text-[#249A68]" />
                                            )}
                                            {option.option_text}
                                        </span>
                                        <span className="font-bold text-[#287FBA]">{percentage}%</span>
                                    </div>
                                </div>
                            ) : (
                                /* Voting State: Choice Radio Box */
                                <button
                                    onClick={() => setSelectedOption(option.id)}
                                    className={`
                                        w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-200
                                        flex items-center justify-between
                                        ${selectedOption === option.id 
                                            ? 'border-[#4A9AD4] bg-[#EAF5FC] text-[#0B4778] shadow-xs' 
                                            : 'border-[#E6EEF3] bg-white text-[#102A3D] hover:border-[#B9CBD6] hover:bg-[#F8FBFD]'}
                                    `}
                                >
                                    <span>{option.option_text}</span>
                                    <div className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center
                                        ${selectedOption === option.id ? 'border-[#0B4778] bg-[#0B4778]' : 'border-[#D4E0E7]'}
                                    `}>
                                        {selectedOption === option.id && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Poll Action Footer */}
            {!hasVoted ? (
                <Button 
                    variant="primary" 
                    size="sm" 
                    fullWidth 
                    disabled={!selectedOption || voting}
                    isLoading={voting}
                    onClick={handleVoteSubmit}
                >
                    Submit Vote
                </Button>
            ) : (
                <div className="pt-2 text-center text-xs text-[#249A68] font-bold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Vote recorded — Thank you for participating!
                </div>
            )}
        </div>
    );
};
