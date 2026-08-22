import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { PollCard, PollOptionItem } from '@/components/ui/PollCard';
import { QuizCard, QuizQuestionItem, QuizResultItem } from '@/components/ui/QuizCard';
import { GiveawayCard, GiveawayItem } from '@/components/ui/GiveawayCard';
import { Sparkles, Vote, Trophy, Gift, Flame, Compass } from 'lucide-react';

interface PollItem {
    id: number;
    title: string;
    description: string;
    category: string;
    total_votes: number;
    has_voted: boolean;
    options: PollOptionItem[];
}

interface QuizItem {
    id: number;
    title: string;
    description: string;
    type: string;
    questions: QuizQuestionItem[];
    results: QuizResultItem[];
}

interface EngageIndexProps {
    giveaways?: GiveawayItem[];
    polls: PollItem[];
    quizzes: QuizItem[];
}

export default function Index({ giveaways = [], polls, quizzes }: EngageIndexProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'giveaways' | 'polls' | 'quizzes'>('all');

    const handlePollVote = async (pollId: number, optionId: number) => {
        const response = await fetch(`/engage/polls/${pollId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ poll_option_id: optionId }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit poll vote');
        }
    };

    const handleQuizSubmit = async (quizId: number, answers: Record<string, string>): Promise<QuizResultItem | null> => {
        const response = await fetch(`/engage/quizzes/${quizId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit quiz');
        }

        const data = await response.json();
        return data.result;
    };

    return (
        <AppLayout>
            <Head title="Engage — Giveaways, Polls & Diagnostic Quizzes" />

            {/* Engage Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#63B5E8]" />
                        <span>Module 02 — Engage • Interactive Acquisition Arena</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                        Giveaways, Industry Polls & Founder Diagnostics<span className="text-[#4A9AD4]">.</span>
                    </h1>

                    <p className="text-[#D5EBF8] text-base max-w-2xl leading-relaxed">
                        Participate in real-time North American business polls, enter high-yield growth grant sweepstakes, and unlock personalized founder diagnostic benchmarks.
                    </p>
                </div>
            </section>

            {/* Filter Navigation Bar */}
            <section className="bg-white border-b border-[#E6EEF3] sticky top-20 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'all', label: 'All Interactive Experiences', icon: Compass },
                            { id: 'giveaways', label: `Growth Giveaways (${giveaways.length})`, icon: Gift },
                            { id: 'polls', label: `Live Polls (${polls.length})`, icon: Vote },
                            { id: 'quizzes', label: `Founder Quizzes (${quizzes.length})`, icon: Trophy },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`
                                        inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0
                                        ${isActive 
                                            ? 'bg-[#287FBA] text-white shadow-xs scale-[1.02]' 
                                            : 'bg-[#F4FAFE] text-[#466071] hover:bg-[#EAF5FC] hover:text-[#102A3D]'}
                                    `}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Main Interactive Grid */}
            <section className="py-12 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    {/* Section 0: Giveaways & Sweepstakes Campaigns */}
                    {(activeTab === 'all' || activeTab === 'giveaways') && giveaways.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center font-bold">
                                        <Gift className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">
                                        Growth Grant & Tech Sweepstakes
                                    </h2>
                                </div>
                                <span className="text-xs text-[#718797] font-semibold hidden sm:inline">
                                    Live timers • Free entry for North American founders
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {giveaways.map((giveaway) => (
                                    <GiveawayCard key={giveaway.id} giveaway={giveaway} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section 1: Active Business Polls */}
                    {(activeTab === 'all' || activeTab === 'polls') && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 flex items-center justify-center font-bold">
                                        <Vote className="w-4 h-4 text-[#4A9AD4]" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">
                                        Live Industry Benchmarking Polls
                                    </h2>
                                </div>
                                <span className="text-xs text-[#718797] font-semibold hidden sm:inline">
                                    Real-time percentage distribution
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {polls.map((poll) => (
                                    <PollCard
                                        key={poll.id}
                                        id={poll.id}
                                        title={poll.title}
                                        description={poll.description}
                                        category={poll.category}
                                        total_votes={poll.total_votes}
                                        has_voted={poll.has_voted}
                                        options={poll.options}
                                        onVote={(optionId) => handlePollVote(poll.id, optionId)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section 2: Interactive Founder Quizzes */}
                    {(activeTab === 'all' || activeTab === 'quizzes') && (
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between border-b border-[#E6EEF3] pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center font-bold">
                                        <Trophy className="w-4 h-4 text-[#249A68]" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">
                                        Founder Archetype & Diagnostic Assessments
                                    </h2>
                                </div>
                                <span className="text-xs text-[#718797] font-semibold hidden sm:inline">
                                    Instant strategic recommendations
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {quizzes.map((quiz) => (
                                    <QuizCard
                                        key={quiz.id}
                                        id={quiz.id}
                                        title={quiz.title}
                                        description={quiz.description}
                                        type={quiz.type}
                                        questions={quiz.questions}
                                        results={quiz.results}
                                        onSubmitQuiz={(answers) => handleQuizSubmit(quiz.id, answers)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
