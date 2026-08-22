import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Vote, Sparkles, Plus, CheckCircle2, HelpCircle } from 'lucide-react';

interface PollsPageProps {
    polls: {
        data: any[];
        links: any[];
    };
    quizzes: any[];
}

export default function Polls({ polls, quizzes }: PollsPageProps) {
    return (
        <AdminLayout title="Polls & Diagnostics Management">
            <Head title="Admin Polls & Quizzes — Bizztopia" />

            {/* Header Action Bar */}
            <div className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold font-outfit text-[#102A3D]">
                        Manage Interactive Polls & Founder Diagnostic Quizzes
                    </h1>
                    <p className="text-xs text-[#718797]">
                        Module 02 — Engage interactive unit controls and voting analytics.
                    </p>
                </div>
            </div>

            {/* Active Industry Polls Grid */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                    <Vote className="w-5 h-5 text-[#4A9AD4]" /> Active Industry Polls
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {polls.data.map((poll) => (
                        <div key={poll.id} className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <Badge variant="brand" size="sm">{poll.category}</Badge>
                                <span className="text-xs font-bold text-[#249A68] flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> {poll.total_votes} Total Votes Cast
                                </span>
                            </div>

                            <h3 className="text-base font-bold font-outfit text-[#102A3D]">
                                {poll.title}
                            </h3>

                            <div className="space-y-2 pt-2 border-t border-[#E6EEF3]">
                                {poll.options?.map((opt: any) => (
                                    <div key={opt.id} className="p-2.5 rounded-xl bg-[#F7FAFC] border border-[#E6EEF3] flex items-center justify-between text-xs">
                                        <span className="font-medium text-[#102A3D]">{opt.option_text}</span>
                                        <span className="font-bold text-[#287FBA]">{opt.votes_count} votes</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Diagnostic Quizzes */}
            <div className="space-y-4 pt-6">
                <h2 className="text-lg font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#4A9AD4]" /> Founder Archetype Diagnostic Quizzes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-3">
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" size="sm">{quiz.type}</Badge>
                                <span className="text-xs font-semibold text-[#718797]">
                                    {quiz.completion_count} Completions
                                </span>
                            </div>
                            <h3 className="text-base font-bold font-outfit text-[#102A3D]">
                                {quiz.title}
                            </h3>
                            <p className="text-xs text-[#466071]">{quiz.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
