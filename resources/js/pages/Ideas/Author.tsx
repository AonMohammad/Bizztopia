import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Avatar } from '@/components/ui/Avatar';
import { ArrowLeft, BookOpen, Globe, CheckCircle2, TrendingUp } from 'lucide-react';

interface AuthorProfile {
    id: number;
    name: string;
    slug: string;
    bio: string;
    role_title: string;
    region: string;
    email?: string;
    avatarUrl?: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    hero_image?: string;
    content_type: string;
    reading_time: string;
    published_at: string;
    is_trending: boolean;
    is_breaking: boolean;
    view_count: number;
    category?: { name: string; slug: string };
    tags?: { id: number; name: string; slug: string; color: string }[];
}

interface AuthorPageProps {
    author: AuthorProfile;
    articles: {
        data: Article[];
        total: number;
        current_page: number;
        last_page: number;
    };
}

export default function AuthorPage({ author, articles }: AuthorPageProps) {
    const totalViews = articles.data.reduce((sum, a) => sum + (a.view_count || 0), 0);

    return (
        <AppLayout>
            <Head title={`${author.name} — Bizztopia Author`}>
                <meta name="description" content={author.bio} />
                <meta property="og:title" content={`${author.name} — ${author.role_title}`} />
                <meta property="og:description" content={author.bio} />
            </Head>

            <div className="py-12 bg-[#F7FAFC]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

                    {/* Back */}
                    <Link
                        href="/ideas"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#287FBA] hover:text-[#0B4778] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Ideas Hub
                    </Link>

                    {/* Author Hero Card */}
                    <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-sm overflow-hidden">
                        <div className="h-28 bg-gradient-to-br from-[#102A3D] via-[#287FBA] to-[#4A9AD4]" />
                        <div className="px-8 pb-8 -mt-12 space-y-4">
                            <div className="flex items-end gap-5">
                                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-[#287FBA] to-[#0B4778] flex items-center justify-center">
                                    {author.avatarUrl ? (
                                        <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-black text-white">
                                            {author.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="pt-14 flex-1">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h1 className="text-2xl font-extrabold font-outfit text-[#102A3D]">{author.name}</h1>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#249A68]/10 border border-[#249A68]/30 text-[10px] font-bold text-[#249A68]">
                                            <CheckCircle2 className="w-3 h-3" /> Verified Expert
                                        </span>
                                    </div>
                                    <div className="text-sm text-[#466071] font-semibold mt-0.5">{author.role_title}</div>
                                </div>
                            </div>

                            <p className="text-sm text-[#466071] leading-relaxed max-w-2xl">{author.bio}</p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap gap-6 pt-4 border-t border-[#E6EEF3]">
                                <div className="flex items-center gap-2 text-sm">
                                    <BookOpen className="w-4 h-4 text-[#4A9AD4]" />
                                    <span className="font-bold text-[#102A3D]">{articles.total}</span>
                                    <span className="text-[#718797]">Articles Published</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp className="w-4 h-4 text-[#249A68]" />
                                    <span className="font-bold text-[#102A3D]">{totalViews.toLocaleString()}</span>
                                    <span className="text-[#718797]">Total Views</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Globe className="w-4 h-4 text-[#287FBA]" />
                                    <span className="font-bold text-[#102A3D]">{author.region}</span>
                                    <span className="text-[#718797]">Coverage Region</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold font-outfit text-[#102A3D]">
                                Articles by {author.name}
                            </h2>
                            <span className="text-xs text-[#718797]">
                                Page {articles.current_page} of {articles.last_page}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {articles.data.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    id={article.id}
                                    title={article.title}
                                    slug={article.slug}
                                    subtitle={article.subtitle}
                                    heroImage={article.hero_image}
                                    category={article.category}
                                    tags={article.tags}
                                    readingTimeMinutes={parseInt(article.reading_time) || 5}
                                    isTrending={article.is_trending}
                                    isBreaking={article.is_breaking}
                                    viewCount={article.view_count}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
