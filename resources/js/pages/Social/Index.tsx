import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { EngagePromoUnit } from '@/components/ui/EngagePromoUnit';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, ShieldCheck, Plus, Search, Sparkles, Star } from 'lucide-react';

interface QuestionItem {
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
}

interface ReviewItem {
    id: number;
    reviewer_name: string;
    business_name: string;
    service_category: string;
    rating: number;
    title: string;
    review_body: string;
    is_verified: boolean;
}

interface SocialIndexProps {
    questions: {
        data: QuestionItem[];
        links: any[];
    };
    reviews: ReviewItem[];
    filters: {
        category?: string;
        search?: string;
    };
}

export default function Index({ questions, reviews, filters }: SocialIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
        category: 'Marketing & Acquisition',
        author_name: '',
        author_role: '',
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/social', { ...filters, search }, { preserveState: true });
    };

    const handlePostQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        post('/social/questions', {
            onSuccess: () => {
                reset();
                setShowQuestionModal(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Social — North American Business Community & Reviews" />

            {/* Social Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-semibold uppercase tracking-wider">
                            <MessageSquare className="w-3.5 h-3.5 text-[#63B5E8]" />
                            <span>Module 04 — Social • Community & Trust Hub</span>
                        </div>
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => setShowQuestionModal(!showQuestionModal)}
                            className="bg-white text-[#0B4778] hover:bg-[#EAF5FC]"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Ask Question
                        </Button>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                        Business Community Q&A & Verified Reviews<span className="text-[#4A9AD4]">.</span>
                    </h1>

                    <p className="text-[#D5EBF8] text-base max-w-2xl leading-relaxed">
                        Connect with verified North American business owners, ask growth questions, share advice, and inspect authenticated client reviews.
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSearchSubmit} className="pt-2 max-w-lg flex items-center gap-2">
                        <Input
                            placeholder="Search community discussions or questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            icon={<Search className="w-4 h-4 text-[#718797]" />}
                        />
                        <Button type="submit" variant="primary">Search</Button>
                    </form>
                </div>
            </section>

            {/* Modal for Posting Question */}
            {showQuestionModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full border border-[#E6EEF3] shadow-xl space-y-6 animate-in fade-in">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold font-outfit text-[#102A3D]">Ask the Business Community</h3>
                            <button onClick={() => setShowQuestionModal(false)} className="text-[#718797] hover:text-[#102A3D]">✕</button>
                        </div>

                        <form onSubmit={handlePostQuestion} className="space-y-4">
                            <Input
                                label="Your Name / Handle"
                                placeholder="e.g. Alex Morgan"
                                value={data.author_name}
                                onChange={(e) => setData('author_name', e.target.value)}
                                error={errors.author_name}
                            />

                            <Input
                                label="Your Role / Company"
                                placeholder="e.g. Founder, SolarTech Inc."
                                value={data.author_role}
                                onChange={(e) => setData('author_role', e.target.value)}
                                error={errors.author_role}
                            />

                            <Select
                                label="Category"
                                options={[
                                    { value: 'Marketing & Acquisition', label: 'Marketing & Acquisition' },
                                    { value: 'Legal & Compliance', label: 'Legal & Compliance' },
                                    { value: 'Finance & ROI', label: 'Finance & ROI' },
                                    { value: 'General Business', label: 'General Business' },
                                ]}
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            />

                            <Input
                                label="Question Title"
                                placeholder="e.g. How are startups structuring LLM answer engine optimization?"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                            />

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#466071] mb-1.5">
                                    Question Details
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-xl border border-[#D4E0E7] p-3 text-sm focus:border-[#4A9AD4] focus:outline-none focus:ring-4 focus:ring-[#4A9AD4]/30"
                                    placeholder="Provide detailed context so community experts can assist..."
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                />
                                {errors.body && <p className="text-xs text-[#D95353] mt-1">{errors.body}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button variant="ghost" onClick={() => setShowQuestionModal(false)}>Cancel</Button>
                                <Button type="submit" variant="primary" isLoading={processing}>Post Question</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <section className="py-16 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Community Q&A Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[#4A9AD4]" />
                                <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">Community Discussion Threads</h2>
                            </div>
                            <span className="text-xs font-semibold text-[#718797]">{questions.data.length} Discussions</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {questions.data.map((q) => (
                                <QuestionCard
                                    key={q.id}
                                    id={q.id}
                                    title={q.title}
                                    slug={q.slug}
                                    body={q.body}
                                    category={q.category}
                                    authorName={q.author_name}
                                    authorRole={q.author_role}
                                    upvotesCount={q.upvotes_count}
                                    answersCount={q.answers_count}
                                    isSolved={q.is_solved}
                                    createdAt={new Date(q.created_at).toLocaleDateString()}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Embedded Engage Interactive Banner (Google Ads Style) */}
                    <EngagePromoUnit variant="banner" />

                    {/* Verified Customer Reviews Section */}
                    <div className="space-y-6 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#249A68]" />
                                <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">Verified Customer Reviews & Trust</h2>
                            </div>
                            <Badge variant="success" size="sm">Authentic Buyer Feedback</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((rev) => (
                                <ReviewCard
                                    key={rev.id}
                                    id={rev.id}
                                    reviewerName={rev.reviewer_name}
                                    businessName={rev.business_name}
                                    serviceCategory={rev.service_category}
                                    rating={rev.rating}
                                    title={rev.title}
                                    reviewBody={rev.review_body}
                                    isVerified={rev.is_verified}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
