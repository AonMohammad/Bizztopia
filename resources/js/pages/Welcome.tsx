import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { PollCard } from '@/components/ui/PollCard';
import { RoiCalculatorWidget, RoiData } from '@/components/ui/RoiCalculatorWidget';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { GalleryCard } from '@/components/ui/GalleryCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
    BookOpen, 
    Sparkles, 
    Calculator, 
    MessageSquare, 
    Compass, 
    ArrowRight,
    Globe,
    ShieldCheck,
    Layers,
    CheckCircle2
} from 'lucide-react';

interface WelcomeProps {
    featuredArticle?: any;
    activePoll?: any;
    activeQuiz?: any;
    latestQuestion?: any;
    latestReview?: any;
    featuredGallery?: any;
    initialRoi: RoiData;
}

export default function Welcome({
    featuredArticle,
    activePoll,
    latestQuestion,
    latestReview,
    featuredGallery,
    initialRoi
}: WelcomeProps) {
    return (
        <AppLayout>
            <Head title="Bizztopia — Master Customer Acquisition Ecosystem (CAP)" />

            {/* Master Hero Banner */}
            <section className="relative overflow-hidden pt-16 pb-20 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-[#63B5E8]" />
                        <span>Techception Reference Architecture • Master CAP Platform</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <h1 className="text-4xl sm:text-6xl font-extrabold font-outfit text-white tracking-tight leading-none">
                                One Platform<span className="text-[#4A9AD4]">.</span><br />
                                One Profile<span className="text-[#4A9AD4]">.</span><br />
                                One Ecosystem<span className="text-[#4A9AD4]">.</span>
                            </h1>

                            <p className="text-[#D5EBF8] text-lg max-w-xl leading-relaxed">
                                Bizztopia brings knowledge, interactive engagement, financial decision tools, verified community trust, and visual discovery into a unified customer acquisition architecture.
                            </p>

                            {/* Pillar Quick Links */}
                            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <Link href="/ideas">
                                    <Button variant="primary" size="md">
                                        Explore Attract Hub <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                                <Link href="/value">
                                    <Button variant="outline" size="md" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                                        Launch ROI Calculators
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Architecture Matrix Box */}
                        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-left space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#63B5E8] uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers className="w-4 h-4" /> 5 Connected CAP Pillars
                                </span>
                                <Badge variant="success" size="sm">Active</Badge>
                            </div>

                            <div className="space-y-2.5 text-xs text-[#D5EBF8]">
                                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-2">
                                        <BookOpen className="w-3.5 h-3.5 text-[#63B5E8]" /> Attract
                                    </span>
                                    <span className="text-white font-bold">Knowledge & AEO Playbooks</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5 text-[#63B5E8]" /> Engage
                                    </span>
                                    <span className="text-white font-bold">Polls & Archetype Quizzes</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-2">
                                        <Calculator className="w-3.5 h-3.5 text-[#63B5E8]" /> Value
                                    </span>
                                    <span className="text-white font-bold">ROI & Startup Calculators</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5 text-[#63B5E8]" /> Social
                                    </span>
                                    <span className="text-white font-bold">Q&A Threads & Verified Reviews</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-2">
                                        <Compass className="w-3.5 h-3.5 text-[#63B5E8]" /> Inspire
                                    </span>
                                    <span className="text-white font-bold">Visual Design Galleries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Ecosystem Showcase Section */}
            <section className="py-16 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    
                    {/* Pillar 1: Attract Showcase */}
                    {featuredArticle && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-[#4A9AD4]" />
                                    <h2 className="text-2xl font-bold font-outfit text-[#102A3D]">Module 01 — Attract (Knowledge Engine)</h2>
                                </div>
                                <Link href="/ideas" className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                    View All Playbooks <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <ArticleCard
                                id={featuredArticle.id}
                                title={featuredArticle.title}
                                slug={featuredArticle.slug}
                                subtitle={featuredArticle.subtitle}
                                category={featuredArticle.category}
                                author={featuredArticle.author ? { name: featuredArticle.author.name, role: featuredArticle.author.role_title } : undefined}
                                readingTimeMinutes={parseInt(featuredArticle.reading_time) || 5}
                                featured
                            />
                        </div>
                    )}

                    {/* Pillar 2 & 3: Engage & Value Live Widgets Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Engage Live Poll */}
                        {activePoll && (
                            <div className="lg:col-span-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-[#4A9AD4]" />
                                        <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Module 02 — Engage</h2>
                                    </div>
                                    <Link href="/engage" className="text-xs font-bold text-[#287FBA] hover:underline">
                                        All Interactive Experiences →
                                    </Link>
                                </div>
                                <PollCard
                                    id={activePoll.id}
                                    title={activePoll.title}
                                    description={activePoll.description}
                                    category={activePoll.category}
                                    total_votes={activePoll.total_votes}
                                    has_voted={activePoll.has_voted}
                                    options={activePoll.options}
                                />
                            </div>
                        )}

                        {/* Value Live ROI Tool */}
                        <div className="lg:col-span-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-[#249A68]" />
                                    <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Module 03 — Value</h2>
                                </div>
                                <Link href="/value" className="text-xs font-bold text-[#287FBA] hover:underline">
                                    Launch All Calculators →
                                </Link>
                            </div>
                            <RoiCalculatorWidget initialData={initialRoi} />
                        </div>
                    </div>

                    {/* Pillar 4 & 5: Social & Inspire Live Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Social Live Q&A */}
                        {latestQuestion && (
                            <div className="lg:col-span-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-[#4A9AD4]" />
                                        <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Module 04 — Social</h2>
                                    </div>
                                    <Link href="/social" className="text-xs font-bold text-[#287FBA] hover:underline">
                                        Join Community →
                                    </Link>
                                </div>
                                <QuestionCard
                                    id={latestQuestion.id}
                                    title={latestQuestion.title}
                                    slug={latestQuestion.slug}
                                    body={latestQuestion.body}
                                    category={latestQuestion.category}
                                    authorName={latestQuestion.author_name}
                                    authorRole={latestQuestion.author_role}
                                    upvotesCount={latestQuestion.upvotes_count}
                                    answersCount={latestQuestion.answers_count}
                                    isSolved={latestQuestion.is_solved}
                                />
                            </div>
                        )}

                        {/* Inspire Live Visual Gallery */}
                        {featuredGallery && (
                            <div className="lg:col-span-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Compass className="w-5 h-5 text-[#4A9AD4]" />
                                        <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Module 05 — Inspire</h2>
                                    </div>
                                    <Link href="/inspire" className="text-xs font-bold text-[#287FBA] hover:underline">
                                        Visual Galleries →
                                    </Link>
                                </div>
                                <GalleryCard
                                    id={featuredGallery.id}
                                    title={featuredGallery.title}
                                    slug={featuredGallery.slug}
                                    heroImage={featuredGallery.hero_image}
                                    category={featuredGallery.category}
                                    clientName={featuredGallery.client_name}
                                    viewsCount={featuredGallery.views_count}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
