import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { 
    ArrowLeft, 
    MessageSquare, 
    CheckCircle2, 
    ThumbsUp, 
    Send,
    UserCheck,
    Sparkles
} from 'lucide-react';

interface AnswerItem {
    id: number;
    author_name: string;
    author_role: string;
    body: string;
    upvotes_count: number;
    is_accepted: boolean;
    created_at: string;
}

interface QuestionDetail {
    id: number;
    title: string;
    slug: string;
    body: string;
    category: string;
    author_name: string;
    author_role: string;
    upvotes_count: number;
    answers_count: number;
    is_solved: boolean;
    created_at: string;
    answers: AnswerItem[];
}

interface SocialShowProps {
    question: QuestionDetail;
    relatedQuestions: QuestionDetail[];
}

export default function Show({ question, relatedQuestions }: SocialShowProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        author_name: '',
        author_role: '',
        body: '',
    });

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/social/questions/${question.id}/answer`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title={`${question.title} — Bizztopia Community`} />

            <article className="py-12 bg-[#F7FAFC]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Back Link */}
                    <div>
                        <Link 
                            href="/social" 
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#287FBA] hover:text-[#0B4778] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Community Hub
                        </Link>
                    </div>

                    {/* Question Card Header */}
                    <div className="bg-white p-8 rounded-2xl border border-[#E6EEF3] shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="primary" size="md">{question.category}</Badge>
                                {question.is_solved && (
                                    <Badge variant="success" size="md">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Solved Problem
                                    </Badge>
                                )}
                            </div>
                            <span className="text-xs text-[#718797]">
                                Posted {new Date(question.created_at).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit text-[#102A3D] leading-tight">
                            {question.title}
                        </h1>

                        <p className="text-base text-[#466071] leading-relaxed whitespace-pre-line">
                            {question.body}
                        </p>

                        {/* Author Footer */}
                        <div className="pt-6 border-t border-[#E6EEF3] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                                <Avatar name={question.author_name} size="md" />
                                <div>
                                    <div className="font-bold text-[#102A3D]">{question.author_name}</div>
                                    <div className="text-[#718797]">{question.author_role || 'Community Author'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-[#718797]">
                                <span className="font-semibold">{question.upvotes_count} Upvotes</span>
                                <span>•</span>
                                <span className="font-semibold">{question.answers.length} Answers</span>
                            </div>
                        </div>
                    </div>

                    {/* Answers Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-outfit text-[#102A3D] flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#4A9AD4]" />
                            Community Answers ({question.answers.length})
                        </h2>

                        {question.answers.map((answer) => (
                            <div 
                                key={answer.id}
                                className={`
                                    p-6 sm:p-8 rounded-2xl border transition-all duration-300 space-y-4
                                    ${answer.is_accepted 
                                        ? 'bg-[#F4FAFE] border-[#4A9AD4] shadow-sm' 
                                        : 'bg-white border-[#E6EEF3] shadow-xs'}
                                `}
                            >
                                {answer.is_accepted && (
                                    <Badge variant="success" size="sm" className="mb-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Accepted Solution
                                    </Badge>
                                )}

                                <p className="text-sm text-[#102A3D] leading-relaxed whitespace-pre-line">
                                    {answer.body}
                                </p>

                                <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <Avatar name={answer.author_name} size="sm" />
                                        <div>
                                            <div className="font-bold text-[#102A3D]">{answer.author_name}</div>
                                            <div className="text-[#718797]">{answer.author_role || 'Contributor'}</div>
                                        </div>
                                    </div>
                                    <span className="text-[#287FBA] font-bold flex items-center gap-1">
                                        <ThumbsUp className="w-3.5 h-3.5" /> {answer.upvotes_count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Answer Composer Box */}
                    <div className="bg-white p-8 rounded-2xl border border-[#E6EEF3] shadow-sm space-y-4">
                        <h3 className="text-lg font-bold font-outfit text-[#102A3D]">Post Your Answer</h3>
                        <form onSubmit={handleAnswerSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Your Name"
                                    value={data.author_name}
                                    onChange={(e) => setData('author_name', e.target.value)}
                                    error={errors.author_name}
                                />
                                <Input
                                    placeholder="Your Title / Business"
                                    value={data.author_role}
                                    onChange={(e) => setData('author_role', e.target.value)}
                                    error={errors.author_role}
                                />
                            </div>
                            <textarea
                                rows={4}
                                className="w-full rounded-xl border border-[#D4E0E7] p-3 text-sm focus:border-[#4A9AD4] focus:outline-none focus:ring-4 focus:ring-[#4A9AD4]/30"
                                placeholder="Share your experience or solution..."
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                            />
                            {errors.body && <p className="text-xs text-[#D95353]">{errors.body}</p>}

                            <div className="flex justify-end">
                                <Button type="submit" variant="primary" isLoading={processing}>
                                    Submit Answer <Send className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}
