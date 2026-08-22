import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { EngagePromoUnit } from '@/components/ui/EngagePromoUnit';
import {
    ArrowLeft, Clock, Globe, Calculator,
    Bookmark, BookmarkCheck, CheckCircle2, List,
    ExternalLink, ShieldCheck, Check, Printer,
    MessageSquare, Send, Tag, Eye, ChevronRight,
    Users, Star, ArrowRight, Flame, Zap,
    Link2, TrendingUp, FileText, AlertCircle
} from 'lucide-react';

const XIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
);
const LinkedInIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

/* ─── Types ──────────────────────────────────────────────────── */
interface ArticleTag { id: number; name: string; slug: string; color: string; }
interface ArticleComment {
    id: number; author_name: string; author_company: string | null;
    body: string; created_at: string;
}
interface ArticleDetail {
    id: number; title: string; slug: string; subtitle: string;
    content: string; hero_image?: string; content_type: string;
    region: string; reading_time: string; source_rss_name: string;
    canonical_url?: string; published_at: string; updated_at: string;
    view_count: number; is_trending: boolean; is_breaking: boolean;
    category?: { name: string; slug: string; color?: string };
    author?: { name: string; slug?: string; role_title: string; bio: string; avatarUrl?: string };
    tags?: ArticleTag[];
    comments?: ArticleComment[];
}
interface IdeasShowProps {
    article: ArticleDetail;
    relatedArticles: ArticleDetail[];
    isBookmarked: boolean;
    jsonLdSchema: Record<string, any>;
}

/* ─── Journey chain (§6.5) ──────────────────────────────────── */
const journeySteps = [
    { icon: '📄', label: 'Article', desc: 'You are here', href: '#', current: true },
    { icon: '📘', label: 'Guide', desc: 'Deep dive', href: '/ideas?type=Guide', current: false },
    { icon: '🧮', label: 'Calculator', desc: 'Run numbers', href: '/value', current: false },
    { icon: '💬', label: 'Community', desc: 'Ask experts', href: '/social', current: false },
    { icon: '✨', label: 'Inspire', desc: 'Visual ideas', href: '/inspire', current: false },
];

/* ─── Content-type color map ─────────────────────────────────── */
const typeColors: Record<string, { bg: string; text: string; border: string }> = {
    'News':                 { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
    'Blog':                 { bg: '#ede9fe', text: '#7c3aed', border: '#c4b5fd' },
    'Industry Guide':       { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
    'Tips & Tricks':        { bg: '#d1fae5', text: '#059669', border: '#6ee7b7' },
    'How-To':               { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' },
    'Checklist':            { bg: '#f3e8ff', text: '#9333ea', border: '#d8b4fe' },
    'Guide':                { bg: '#e0f2fe', text: '#0284c7', border: '#7dd3fc' },
    'FAQ':                  { bg: '#fce7f3', text: '#db2777', border: '#f9a8d4' },
    'Best Practice':        { bg: '#ccfbf1', text: '#0f766e', border: '#5eead4' },
    'Industry Trend':       { bg: '#ffedd5', text: '#c2410c', border: '#fdba74' },
    'Beginner Guide':       { bg: '#ecfccb', text: '#4d7c0f', border: '#bef264' },
    'Educational Resource': { bg: '#e0f2fe', text: '#0369a1', border: '#7dd3fc' },
    'Expert Insight':       { bg: '#f5f3ff', text: '#6d28d9', border: '#c4b5fd' },
};

export default function Show({ article, relatedArticles, isBookmarked: initBookmarked, jsonLdSchema }: IdeasShowProps) {
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(initBookmarked);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
    const [activeSection, setActiveSection] = useState('');
    const [readProgress, setReadProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        author_name: '', author_email: '', author_company: '', body: '',
    });

    /* Read progress bar */
    useEffect(() => {
        const onScroll = () => {
            const el = contentRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = el.offsetHeight;
            const scrolled = Math.max(0, -rect.top);
            setReadProgress(Math.min(100, (scrolled / total) * 100));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Build dynamic TOC */
    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = article.content;
        const items: { id: string; text: string }[] = [];
        div.querySelectorAll('h2').forEach((h, i) => {
            items.push({ id: `heading-${i}`, text: h.textContent || `Section ${i + 1}` });
        });
        setToc(items);
    }, [article.content]);

    /* Active section highlight */
    useEffect(() => {
        if (!toc.length) return;
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
            { rootMargin: '-15% 0px -60% 0px' }
        );
        document.querySelectorAll('[id^="heading-"]').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [toc]);

    const handleShare = async (platform?: string) => {
        const url = window.location.href;
        const text = encodeURIComponent(article.title);
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleBookmark = async () => {
        setBookmarkLoading(true);
        try {
            const res = await fetch(`/ideas/${article.id}/bookmark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });
            const d = await res.json();
            setBookmarked(d.bookmarked);
        } catch {}
        setBookmarkLoading(false);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/ideas/${article.id}/comments`, { onSuccess: () => reset() });
    };

    const typeStyle = typeColors[article.content_type] || { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' };
    const pubDate = article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const updDate = article.updated_at ? new Date(article.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

    return (
        <AppLayout>
            <Head title={`${article.title} — Bizztopia`}>
                <meta name="description" content={article.subtitle || article.title} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.subtitle || article.title} />
                {article.hero_image && <meta property="og:image" content={article.hero_image} />}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                {article.hero_image && <meta name="twitter:image" content={article.hero_image} />}
                <script type="application/ld+json">{JSON.stringify(jsonLdSchema)}</script>
            </Head>

            {/* ── Fixed Read Progress Bar ─────────────────────────── */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-[#E6EEF3]">
                <div
                    className="h-full bg-gradient-to-r from-[#287FBA] to-[#4A9AD4] transition-all duration-75"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

            {/* ── Hero Block ─────────────────────────────────────── */}
            <div className="relative bg-[#0B1F2E] overflow-hidden">
                {/* Background image with dark overlay */}
                {article.hero_image && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25"
                        style={{ backgroundImage: `url(${article.hero_image})` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F2E]/70 via-[#0B1F2E]/80 to-[#0B1F2E]" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                    {/* Breadcrumb */}
                    <Link
                        href="/ideas"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8FC7E8] hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Ideas & Knowledge Hub
                    </Link>

                    {/* Type + Status badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
                            style={{ backgroundColor: typeStyle.bg, color: typeStyle.text }}
                        >
                            {article.content_type}
                        </span>
                        {article.is_breaking && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-widest animate-pulse">
                                <Zap className="w-3 h-3 fill-current" /> Breaking
                            </span>
                        )}
                        {article.is_trending && !article.is_breaking && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest">
                                <Flame className="w-3 h-3 fill-current" /> Trending
                            </span>
                        )}
                        {article.category && (
                            <Link href={`/ideas?category=${article.category.slug}`}>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold text-[#D5EBF8] border border-[#287FBA]/60 hover:bg-[#287FBA]/20 transition-colors cursor-pointer">
                                    {article.category.name}
                                </span>
                            </Link>
                        )}
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-[#249A68]">
                            <ShieldCheck className="w-3.5 h-3.5" /> AEO Indexed
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold font-outfit text-white leading-tight tracking-tight mb-4 max-w-4xl">
                        {article.title}
                    </h1>

                    {/* Subtitle */}
                    {article.subtitle && (
                        <p className="text-base sm:text-lg text-[#93BFD8] leading-relaxed mb-6 max-w-3xl font-normal">
                            {article.subtitle}
                        </p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-white/10">
                        {/* Author */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#287FBA] to-[#4A9AD4] flex items-center justify-center text-white text-sm font-black shrink-0">
                                {(article.author?.name || 'E').charAt(0)}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">
                                    {article.author?.slug ? (
                                        <Link href={`/authors/${article.author.slug}`} className="hover:text-[#4A9AD4] transition-colors">
                                            {article.author.name}
                                        </Link>
                                    ) : article.author?.name || 'Editorial Team'}
                                </div>
                                <div className="text-[10px] text-[#8FC7E8]">{article.author?.role_title}</div>
                            </div>
                        </div>

                        <span className="h-4 w-px bg-white/20 hidden sm:block" />

                        <div className="flex items-center gap-1 text-[11px] text-[#8FC7E8]">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-semibold">{article.reading_time}</span>
                        </div>

                        <span className="text-[11px] text-[#8FC7E8]">{pubDate}</span>

                        {updDate !== pubDate && (
                            <span className="text-[10px] text-[#5A8DAE] italic">Updated {updDate}</span>
                        )}

                        <div className="flex items-center gap-1 text-[11px] text-[#8FC7E8]">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{article.view_count?.toLocaleString()} views</span>
                        </div>

                        {/* Share actions pinned right */}
                        <div className="flex items-center gap-1.5 ml-auto">
                            <button
                                onClick={() => handleShare('twitter')}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1DA1F2]/30 flex items-center justify-center transition-colors"
                                title="Share on X / Twitter"
                            >
                                <Twitter className="w-3.5 h-3.5 text-white" />
                            </button>
                            <button
                                onClick={() => handleShare('linkedin')}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0077B5]/30 flex items-center justify-center transition-colors"
                                title="Share on LinkedIn"
                            >
                                <Linkedin className="w-3.5 h-3.5 text-white" />
                            </button>
                            <button
                                onClick={() => handleShare()}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                title="Copy link"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-[#249A68]" /> : <Link2 className="w-3.5 h-3.5 text-white" />}
                            </button>
                            <button
                                onClick={handleBookmark}
                                disabled={bookmarkLoading}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${bookmarked ? 'bg-[#249A68]/30 text-[#249A68]' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                title={bookmarked ? 'Saved' : 'Save article'}
                            >
                                {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                title="Print / PDF"
                            >
                                <Printer className="w-3.5 h-3.5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Hero Image (below dark header) ─────────────────── */}
            {article.hero_image && (
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
                    <div className="w-full h-56 sm:h-72 md:h-80 rounded-b-2xl overflow-hidden shadow-2xl">
                        <img
                            src={article.hero_image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* ── Main Body ─────────────────────────────────────── */}
            <div className="bg-[#F7FAFC] pt-8 pb-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* ─── LEFT: Article Content ──────────────────── */}
                        <div className="lg:col-span-8 space-y-6" ref={contentRef}>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 text-[#718797]" />
                                    {article.tags.map(tag => (
                                        <Link key={tag.id} href={`/ideas?tag=${tag.slug}`}>
                                            <span
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border hover:opacity-80 transition-opacity cursor-pointer"
                                                style={{ color: tag.color, borderColor: `${tag.color}50`, backgroundColor: `${tag.color}12` }}
                                            >
                                                {tag.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Main content card */}
                            <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-sm overflow-hidden">
                                {/* TOC */}
                                {toc.length > 0 && (
                                    <div className="px-8 pt-8">
                                        <div className="p-5 rounded-xl bg-[#F0F7FC] border border-[#D5EBF8] space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-bold text-[#0B4778] uppercase tracking-widest">
                                                <List className="w-3.5 h-3.5 text-[#4A9AD4]" /> Table of Contents
                                            </div>
                                            <ol className="space-y-1.5">
                                                {toc.map((item, i) => (
                                                    <li key={item.id} className="flex items-start gap-2">
                                                        <span className="text-[10px] font-black text-[#B0C4CE] mt-0.5 w-4 shrink-0">{i + 1}.</span>
                                                        <a
                                                            href={`#${item.id}`}
                                                            className={`text-xs transition-colors leading-relaxed ${activeSection === item.id ? 'text-[#287FBA] font-bold' : 'text-[#466071] hover:text-[#287FBA]'}`}
                                                        >
                                                            {item.text}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                )}

                                {/* Article body */}
                                <div
                                    className="px-8 py-8 prose prose-slate max-w-none
                                        prose-headings:font-outfit prose-headings:text-[#102A3D] prose-headings:scroll-mt-24
                                        prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
                                        prose-p:text-[#466071] prose-p:leading-[1.85] prose-p:text-[15px]
                                        prose-a:text-[#287FBA] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                        prose-strong:text-[#102A3D] prose-li:text-[#466071] prose-li:leading-relaxed
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#287FBA] prose-blockquote:bg-[#F0F7FC] prose-blockquote:rounded-r-xl prose-blockquote:pl-5 prose-blockquote:py-1"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />

                                {/* Author bio */}
                                {article.author?.bio && (
                                    <div className="mx-8 mb-8 p-5 rounded-xl bg-gradient-to-r from-[#EAF5FC] to-[#F0F7FC] border border-[#8FC7E8]/30 flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#287FBA] to-[#0B4778] flex items-center justify-center text-white text-lg font-black shrink-0">
                                            {(article.author.name || 'E').charAt(0)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[#102A3D]">{article.author.name}</span>
                                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#249A68]/15 text-[#249A68] text-[9px] font-bold uppercase tracking-wider">
                                                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                                                </span>
                                            </div>
                                            <div className="text-[11px] text-[#4A9AD4] font-semibold">{article.author.role_title}</div>
                                            <p className="text-xs text-[#466071] leading-relaxed">{article.author.bio}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Source Attribution */}
                                {article.source_rss_name && (
                                    <div className="mx-8 mb-8 flex items-center gap-2 text-xs text-[#718797]">
                                        <Globe className="w-3.5 h-3.5 text-[#4A9AD4] shrink-0" />
                                        <span>Originally sourced from</span>
                                        <a href={article.canonical_url || '#'} target="_blank" rel="noopener noreferrer"
                                            className="font-bold text-[#287FBA] hover:underline inline-flex items-center gap-1">
                                            {article.source_rss_name} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* ── Journey Chain (§6.5) ───────────────── */}
                            <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#F0F6FA] flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                                    <span className="text-sm font-bold text-[#102A3D]">Continue Your Business Journey</span>
                                    <span className="ml-auto text-[10px] text-[#B0C4CE] font-medium">Recommended next steps</span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-5 gap-2 relative">
                                        {/* connector line */}
                                        <div className="absolute top-7 left-[10%] right-[10%] h-px bg-[#E6EEF3] z-0" />
                                        {journeySteps.map((step, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 z-10">
                                                {step.current ? (
                                                    <div className="w-14 h-14 rounded-2xl bg-[#287FBA] flex items-center justify-center text-2xl shadow-md shadow-[#287FBA]/25 ring-4 ring-[#EAF5FC]">
                                                        {step.icon}
                                                    </div>
                                                ) : (
                                                    <a href={step.href}>
                                                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#E6EEF3] flex items-center justify-center text-2xl hover:border-[#287FBA]/40 hover:shadow-md transition-all cursor-pointer">
                                                            {step.icon}
                                                        </div>
                                                    </a>
                                                )}
                                                <div className="text-center">
                                                    <div className={`text-[11px] font-bold ${step.current ? 'text-[#287FBA]' : 'text-[#466071]'}`}>
                                                        {step.label}
                                                    </div>
                                                    <div className={`text-[9px] ${step.current ? 'text-[#287FBA]/70' : 'text-[#B0C4CE]'}`}>
                                                        {step.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ── Comments ───────────────────────────── */}
                            <div className="bg-white rounded-2xl border border-[#E6EEF3] shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-[#F0F6FA] flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-[#4A9AD4]" />
                                    <span className="text-sm font-bold text-[#102A3D]">Business Discussion</span>
                                    <span className="ml-1.5 text-[10px] font-bold text-white bg-[#287FBA] px-2 py-0.5 rounded-full">
                                        {article.comments?.length ?? 0}
                                    </span>
                                </div>

                                {/* Comment list */}
                                {article.comments && article.comments.length > 0 ? (
                                    <div className="divide-y divide-[#F7FAFC]">
                                        {article.comments.map(c => (
                                            <div key={c.id} className="px-6 py-5 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A9AD4] to-[#287FBA] flex items-center justify-center text-white text-sm font-black shrink-0">
                                                        {c.author_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-sm font-bold text-[#102A3D]">{c.author_name}</span>
                                                            {c.author_company && (
                                                                <span className="text-[10px] text-[#718797] bg-[#F7FAFC] px-2 py-0.5 rounded-full border border-[#E6EEF3]">
                                                                    {c.author_company}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-[10px] text-[#B0C4CE] mt-0.5">
                                                            {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[#466071] leading-relaxed pl-12">{c.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <MessageSquare className="w-8 h-8 text-[#D5E8F0] mx-auto mb-2" />
                                        <p className="text-xs text-[#718797]">Be the first to start the discussion</p>
                                    </div>
                                )}

                                {/* Comment Form */}
                                <div className="px-6 pb-6 pt-5 border-t border-[#F0F6FA] bg-[#FAFCFE]">
                                    <p className="text-xs font-bold text-[#102A3D] mb-4">Join the Discussion</p>

                                    {wasSuccessful && (
                                        <div className="mb-4 p-3 rounded-xl bg-[#249A68]/10 border border-[#249A68]/30 flex items-center gap-2 text-xs font-semibold text-[#249A68]">
                                            <CheckCircle2 className="w-4 h-4 shrink-0" /> Your comment has been posted!
                                        </div>
                                    )}

                                    <form onSubmit={handleCommentSubmit} className="space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <input
                                                    type="text"
                                                    placeholder="Full name *"
                                                    value={data.author_name}
                                                    onChange={e => setData('author_name', e.target.value)}
                                                    className="w-full px-4 py-2.5 text-sm text-[#102A3D] placeholder-[#B0C4CE] bg-white border border-[#E6EEF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287FBA]/25 focus:border-[#287FBA] transition-all"
                                                    required
                                                />
                                                {errors.author_name && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.author_name}</p>}
                                            </div>
                                            <div className="space-y-1">
                                                <input
                                                    type="email"
                                                    placeholder="Email address *"
                                                    value={data.author_email}
                                                    onChange={e => setData('author_email', e.target.value)}
                                                    className="w-full px-4 py-2.5 text-sm text-[#102A3D] placeholder-[#B0C4CE] bg-white border border-[#E6EEF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287FBA]/25 focus:border-[#287FBA] transition-all"
                                                    required
                                                />
                                                {errors.author_email && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.author_email}</p>}
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Company / Organization (optional)"
                                            value={data.author_company}
                                            onChange={e => setData('author_company', e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm text-[#102A3D] placeholder-[#B0C4CE] bg-white border border-[#E6EEF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287FBA]/25 focus:border-[#287FBA] transition-all"
                                        />
                                        <div className="space-y-1">
                                            <textarea
                                                placeholder="Share your thoughts or experience… (min. 10 characters)"
                                                value={data.body}
                                                onChange={e => setData('body', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-2.5 text-sm text-[#102A3D] placeholder-[#B0C4CE] bg-white border border-[#E6EEF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287FBA]/25 focus:border-[#287FBA] transition-all resize-none"
                                                required
                                            />
                                            {errors.body && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.body}</p>}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] text-[#B0C4CE]">Your email won't be shown publicly</p>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#287FBA] text-white text-sm font-bold hover:bg-[#0B4778] transition-colors disabled:opacity-50"
                                            >
                                                <Send className="w-3.5 h-3.5" />
                                                {processing ? 'Posting…' : 'Post Comment'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* ─── RIGHT: Sticky Sidebar ──────────────────── */}
                        <div className="lg:col-span-4">
                            <div className="space-y-5 lg:sticky lg:top-8">

                                {/* Engage promo */}
                                <EngagePromoUnit variant="sidebar" />

                                {/* ROI Calculator */}
                                <div className="rounded-2xl overflow-hidden shadow-md">
                                    <div className="h-1.5 bg-gradient-to-r from-[#287FBA] to-[#4A9AD4]" />
                                    <div className="bg-gradient-to-br from-[#0B1F2E] to-[#102A3D] p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#287FBA]/20 flex items-center justify-center shrink-0">
                                                <Calculator className="w-5 h-5 text-[#63B5E8]" />
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-widest text-[#4A9AD4]">Value Module</div>
                                                <div className="text-sm font-bold text-white mt-0.5">Marketing ROI Estimator</div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#93BFD8] leading-relaxed">
                                            Test your acquisition budget against real North American conversion benchmarks.
                                        </p>
                                        <a href="/value">
                                            <button className="w-full py-2.5 rounded-xl bg-[#287FBA] hover:bg-[#4A9AD4] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                                <Calculator className="w-4 h-4" /> Launch Calculator
                                            </button>
                                        </a>
                                    </div>
                                </div>

                                {/* Community CTA */}
                                <div className="bg-white rounded-2xl border border-[#E6EEF3] p-5 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                                            <Users className="w-4.5 h-4.5 text-[#8b5cf6]" />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-[#8b5cf6]">Social Module</div>
                                            <div className="text-sm font-bold text-[#102A3D]">Ask the Community</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#466071] leading-relaxed">
                                        Get verified answers from business owners across North America.
                                    </p>
                                    <a href="/social" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b5cf6] hover:underline">
                                        Visit Forum <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                {/* Inspire CTA */}
                                <div className="bg-white rounded-2xl border border-[#E6EEF3] p-5 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center shrink-0">
                                            <Star className="w-4.5 h-4.5 text-[#f59e0b]" />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-widest text-[#f59e0b]">Inspire Module</div>
                                            <div className="text-sm font-bold text-[#102A3D]">Visual Showrooms</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#466071] leading-relaxed">
                                        Explore premium design galleries and business inspiration boards.
                                    </p>
                                    <a href="/inspire" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f59e0b] hover:underline">
                                        Browse Showrooms <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                {/* Related quick links */}
                                {relatedArticles.length > 0 && (
                                    <div className="bg-white rounded-2xl border border-[#E6EEF3] overflow-hidden">
                                        <div className="px-5 py-3.5 border-b border-[#F0F6FA] flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5 text-[#4A9AD4]" />
                                            <span className="text-xs font-bold text-[#102A3D]">Related Articles</span>
                                        </div>
                                        <div className="divide-y divide-[#F7FAFC]">
                                            {relatedArticles.slice(0, 3).map(rel => (
                                                <Link key={rel.id} href={`/ideas/${rel.slug}`}>
                                                    <div className="px-5 py-3.5 hover:bg-[#F7FAFC] transition-colors group">
                                                        <div className="flex items-start gap-2">
                                                            <ChevronRight className="w-3.5 h-3.5 text-[#4A9AD4] mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                                            <p className="text-xs font-semibold text-[#466071] group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug">
                                                                {rel.title}
                                                            </p>
                                                        </div>
                                                        <div className="pl-5 mt-1 text-[10px] text-[#B0C4CE] flex items-center gap-1.5">
                                                            <Clock className="w-3 h-3" /> {rel.reading_time}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Related Playbooks Grid ─────────────────────── */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-12 space-y-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold font-outfit text-[#102A3D]">Related Strategy Playbooks</h2>
                                <Link href="/ideas" className="text-xs font-bold text-[#287FBA] hover:underline inline-flex items-center gap-1">
                                    All Articles <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {relatedArticles.map(rel => (
                                    <ArticleCard
                                        key={rel.id}
                                        id={rel.id}
                                        title={rel.title}
                                        slug={rel.slug}
                                        subtitle={rel.subtitle}
                                        heroImage={rel.hero_image}
                                        category={rel.category}
                                        tags={rel.tags}
                                        readingTimeMinutes={parseInt(rel.reading_time) || 5}
                                        isTrending={rel.is_trending}
                                        isBreaking={rel.is_breaking}
                                        viewCount={rel.view_count}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
