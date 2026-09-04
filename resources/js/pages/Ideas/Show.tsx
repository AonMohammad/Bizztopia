
import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import {
    ArrowLeft, Clock, Globe, Calculator,
    Bookmark, BookmarkCheck, CheckCircle2, List,
    ExternalLink, ShieldCheck, Check, Printer,
    MessageSquare, Send, Tag, Eye, ChevronRight,
    Users, Star, ArrowRight, Flame, Zap,
    Link2, TrendingUp, FileText, AlertCircle, Mail
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
const FacebookIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

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

const fallbackImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=800&q=80',
];
const getImg = (art: ArticleItem | ArticleDetail, idx: number) =>
    art.hero_image || ('image_url' in art ? art.image_url : null) || fallbackImages[idx % fallbackImages.length];
const css = `
.art-detail-root { font-family: 'Galey Rounded', system-ui, sans-serif; background: #fff; color: #111; max-width: 1280px; margin: 0 auto; padding: 24px 24px 80px; }
.art-breadcrumb { font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.18em; color: #888; display: flex; gap: 8px; margin-bottom: 20px; }
.art-breadcrumb a { color: #888; text-decoration: none; transition: color 0.2s; }
.art-breadcrumb a:hover { color: #0B4778; }
.art-title { font-size: clamp(1.8rem, 4vw, 3.25rem); font-weight: 600; line-height: 1.15; color: #111; margin-bottom: 24px; letter-spacing: -0.02em; font-family: 'Galey Rounded', system-ui, sans-serif; }
.art-meta-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid #e5e7eb; margin-bottom: 32px; font-size: 12px; color: #666; }
.art-cat-badge { background: #0B4778; color: #fff; font-size: 9px; font-weight: 900; text-transform: uppercase; padding: 3px 10px; letter-spacing: 0.08em; text-decoration: none; }
.art-meta-author { font-weight: 700; color: #111; }
.art-layout { display: grid; grid-template-columns: 2.2fr 1fr; gap: 48px; }
.art-main { min-width: 0; }
.art-hero-img { aspect-ratio: 16/9; overflow: hidden; background: #f3f4f6; margin-bottom: 36px; border: 1px solid #e5e7eb; }
.art-hero-img img { width: 100%; height: 100%; object-fit: cover; }
.art-body { font-size: 1.125rem; line-height: 1.85; color: #1a1a1a; font-family: 'Galey Rounded', system-ui, sans-serif; }
.art-body p { margin-bottom: 24px; }
.art-body h2 { font-size: 1.625rem; font-weight: 600; margin: 44px 0 20px; color: #000; letter-spacing: -0.015em; font-family: 'Galey Rounded', system-ui, sans-serif; }
.art-body h3 { font-size: 1.35rem; font-weight: 600; margin: 32px 0 16px; color: #000; font-family: 'Galey Rounded', system-ui, sans-serif; }
.art-body ul, .art-body ol { margin-bottom: 24px; padding-left: 24px; }
.art-body li { margin-bottom: 10px; }
.art-sidebar { min-width: 0; }
@media (min-width: 1025px) {
    .art-sidebar { position: sticky; top: 120px; align-self: start; }
}
.sb-widget { background: #ffffff; border: 1px solid #e5e7eb; padding: 18px; margin-bottom: 20px; }
.sb-sec-head { border-bottom: 2px solid #0B4778; padding-bottom: 6px; margin-bottom: 14px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.18em; color: #0B4778; }
.sb-trending-row { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-decoration: none; color: inherit; align-items: flex-start; }
.sb-trending-row:last-child { border-bottom: none; }
.sb-num { font-size: 28px; font-weight: 600; color: #e2e8f0; line-height: 1; font-family: 'Galey Rounded', system-ui, sans-serif; transition: color 0.2s; }
.sb-trending-row:hover .sb-num { color: #0B4778; }
.sb-trend-title { font-size: 13px; font-weight: 700; line-height: 1.4; color: #111; margin: 0; }
.sb-trending-row:hover .sb-trend-title { color: #287FBA; }
.sb-tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.sb-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #4b5563; background: #f3f4f6; padding: 5px 12px; text-decoration: none; border-radius: 100px; transition: all 0.2s; }
.sb-tag:hover { background: #0B4778; color: #fff; }
.share-bar { display: flex; align-items: center; gap: 10px; padding: 16px 0; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; margin-bottom: 32px; }
.share-title { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-right: 8px; }
.share-btn { width: 34px; height: 34px; border-radius: 50%; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; color: #555; text-decoration: none; transition: all 0.2s; cursor: pointer; background: transparent; }
.share-btn:hover { border-color: #0B4778; color: #0B4778; background: #fafafa; }
.attr-box { background: #fafafa; border: 1px solid #e5e7eb; padding: 14px 18px; margin-top: 24px; font-size: 11px; color: #666; }
.attr-box h4 { font-size: 11px; font-weight: 900; color: #000; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.08em; }
.author-box { display: flex; gap: 20px; align-items: flex-start; background: #fcfcfc; border: 1px solid #eee; padding: 24px; margin-top: 28px; }
.author-avatar { width: 48px; height: 48px; background: #0B4778; color: #fff; font-weight: 900; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.author-name { font-size: 14px; font-weight: 900; color: #000; margin: 0 0 4px; }
.author-desc { font-size: 12.5px; color: #555; line-height: 1.55; margin: 0; }
.read-next-section { margin-top: 64px; border-top: 1px solid #e5e7eb; padding-top: 48px; }
.read-next-title { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 28px; color: #000; }
.read-next-grid { display: grid; grid-template-columns: 2.2fr 1fr 1fr; gap: 28px; }
.rn-card-wide { display: flex; gap: 24px; text-decoration: none; color: inherit; border: 1px solid #e5e7eb; padding: 20px; transition: border-color 0.2s; background: #fff; }
.rn-card-wide:hover { border-color: #0B4778; }
.rn-card-wide img { width: 220px; height: 140px; object-fit: cover; flex-shrink: 0; }
.rn-card-medium { display: flex; flex-direction: column; text-decoration: none; color: inherit; border: 1px solid #e5e7eb; padding: 20px; transition: border-color 0.2s; background: #fff; }
.rn-card-medium:hover { border-color: #0B4778; }
.rn-card-medium img { width: 100%; aspect-ratio: 16/10; object-fit: cover; margin-bottom: 12px; }
.rn-card-text { display: flex; flex-direction: column; text-decoration: none; color: inherit; border: 1px solid #e5e7eb; padding: 20px; background: #fafafa; transition: border-color 0.2s; }
.rn-card-text:hover { border-color: #0B4778; }
@media (max-width: 1024px) {
    .art-layout { grid-template-columns: 1fr; gap: 48px; }
    .sb-widget { margin-bottom: 24px; }
    .read-next-grid { grid-template-columns: 1fr !important; }
    .rn-card-wide { flex-direction: column !important; }
    .rn-card-wide img { width: 100% !important; height: auto !important; aspect-ratio: 16/10 !important; }
}
@media (max-width: 640px) {
    .art-detail-root { padding: 16px 16px 60px; }
    .art-meta-bar { gap: 10px; }
}
`;
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

    useEffect(() => {
        const div = document.createElement('div');
        div.innerHTML = article.content;
        const items: { id: string; text: string }[] = [];
        div.querySelectorAll('h2').forEach((h, i) => {
            items.push({ id: `heading-${i}`, text: h.textContent || `Section ${i + 1}` });
        });
        setToc(items);
    }, [article.content]);

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
        } catch { }
        setBookmarkLoading(false);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/ideas/${article.id}/comments`, { onSuccess: () => reset() });
    };

    const pubDate = article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    return (
        <AppLayout>
            <Head title={`${article.title} — Bizztopia Ideas`}>
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

            {/* Read Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-[#E6EEF3]">
                <div
                    className="h-full bg-gradient-to-r from-[#287FBA] to-[#4A9AD4] transition-all duration-75"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

            <style>{css}</style>

            <div className="art-detail-root">
                {/* Header */}
                <div>
                    <div className="art-breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/ideas">Ideas</Link>
                        {article.category && (
                            <>
                                <span>/</span>
                                <Link href={`/ideas/category/${article.category.slug}`}>{article.category.name}</Link>
                            </>
                        )}
                    </div>
                    <h1 className="art-title">{article.title}</h1>
                    <div className="art-meta-bar">
                        {article.category && (
                            <Link href={`/ideas/category/${article.category.slug}`} className="art-cat-badge">
                                {article.category.name}
                            </Link>
                        )}
                        <span>By <span className="art-meta-author">{article.author?.name || 'Bizztopia Editorial Team'}</span></span>
                        <span>·</span>
                        <span>{pubDate}</span>
                        {article.reading_time && (
                            <>
                                <span>·</span>
                                <span>{article.reading_time}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="art-layout">
                    {/* Left main column */}
                    <div className="art-main" ref={contentRef}>
                        <div className="art-hero-img">
                            <img
                                src={article.hero_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'}
                                alt={article.title}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                                }}
                            />
                        </div>

                        {/* Share & actions bar */}
                        <div className="share-bar">
                            <span className="share-title">Share Report</span>
                            <button onClick={() => handleShare('twitter')} className="share-btn" title="Share on X">
                                <XIcon className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleShare('linkedin')} className="share-btn" title="Share on LinkedIn">
                                <LinkedInIcon className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleShare('facebook')} className="share-btn" title="Share on Facebook">
                                <FacebookIcon className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleShare()} className="share-btn" title="Copy Link">
                                {copied ? <Check className="w-3.5 h-3.5 text-[#249A68]" /> : <Link2 className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={handleBookmark} disabled={bookmarkLoading} className="share-btn" title="Bookmark">
                                {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-[#249A68]" /> : <Bookmark className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={() => window.print()} className="share-btn" title="Print Report">
                                <Printer className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Article Content prose body */}
                        <div
                            className="art-body prose prose-slate max-w-none 
                                prose-headings:font-outfit prose-headings:text-[#102A3D] prose-headings:scroll-mt-24
                                prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
                                prose-p:text-[#466071] prose-p:leading-[1.85] prose-p:text-[15px]
                                prose-a:text-[#287FBA] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-[#102A3D] prose-li:text-[#466071] prose-li:leading-relaxed
                                prose-blockquote:border-l-4 prose-blockquote:border-[#287FBA] prose-blockquote:bg-[#F0F7FC] prose-blockquote:rounded-r-xl prose-blockquote:pl-5 prose-blockquote:py-1"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                        {/* Attribution Box */}
                        {article.source_rss_name && (
                            <div className="attr-box">
                                <h4>Sources &amp; Attribution</h4>
                                <p style={{ marginBottom: '4px' }}>This analysis was formulated using primary data reported by:</p>
                                <ul style={{ listStyleType: 'square', paddingLeft: '16px', margin: '0 0 6px', lineHeight: 1.3 }}>
                                    <li>
                                        <a href={article.canonical_url || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#0B4778', fontWeight: 700, textDecoration: 'underline' }}>
                                            {article.source_rss_name}
                                        </a>
                                    </li>
                                </ul>
                                <p style={{ fontSize: '9px', color: '#999', fontStyle: 'italic', margin: 0 }}>
                                    Bizztopia independently writes all editorial content. Outbound hyperlinks acknowledge the primary journalists and reporting networks.
                                </p>
                            </div>
                        )}

                        {/* Author Profile Box */}
                        {article.author?.bio && (
                            <div className="author-box">
                                <div className="author-avatar">{(article.author.name || 'E').charAt(0)}</div>
                                <div>
                                    <h4 className="author-name">{article.author.name}</h4>
                                    <p className="author-desc">{article.author.bio}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right column sticky sidebar */}
                    <div className="art-sidebar">
                        <div className="space-y-6 sticky top-24">

                            {/* Widget 1: Table of Contents (Interactive Section Jump) */}
                            {toc.length > 0 && (
                                <div className="sb-widget border-l-4 border-l-[#287FBA]">
                                    <h3 className="sb-sec-head">Report Outline & Navigation</h3>
                                    <nav className="space-y-2">
                                        {toc.map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className={`
                                                    block text-xs font-semibold leading-snug transition-colors py-1 px-2 rounded-md
                                                    ${activeSection === item.id
                                                        ? 'bg-[#F0F7FC] text-[#287FBA] font-bold'
                                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                                                `}
                                            >
                                                • {item.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Widget 2: Numerical Trending Intelligence */}
                            <div className="sb-widget">
                                <h3 className="sb-sec-head">Trending Intelligence</h3>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {relatedArticles.slice(0, 5).map((rel, idx) => (
                                        <a key={rel.id} href={`/ideas/${rel.slug}`} className="sb-trending-row">
                                            <span className="sb-num">{String(idx + 1).padStart(2, '0')}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h4 className="sb-trend-title lc3">{rel.title}</h4>
                                                <span style={{ fontSize: '9px', color: '#999', textTransform: 'uppercase', fontWeight: 900, marginTop: '4px', display: 'block' }}>
                                                    {rel.category?.name || 'UPDATE'}
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Widget 3: Community Tools / ROI Calculator */}
                            <div className="sb-widget" style={{ background: 'linear-gradient(135deg, #0B4778 0%, #041E34 100%)', border: 'none', color: '#fff', borderRadius: '12px', padding: '20px' }}>
                                <h3 className="sb-sec-head" style={{ color: '#8FC7E8', borderBottomColor: '#287FBA' }}>Ecosystem Tools</h3>
                                <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '14px' }}>
                                    Evaluate marketing budgets against verified North American conversion benchmarks.
                                </p>
                                <a href="/value" style={{ display: 'block', textAlign: 'center', background: '#287FBA', color: '#fff', fontSize: '11px', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none' }}>
                                    Open ROI Calculator →
                                </a>
                            </div>

                            {/* Widget 4: B2B Daily Intelligence Newsletter */}
                            <div className="sb-widget bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                                <div className="flex items-center gap-2 text-[#287FBA]">
                                    <Mail className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-outfit">
                                        Executive Intelligence Briefing
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Get daily curated B2B market benchmarks, verified directory statistics, and trade reports directly in your inbox.
                                </p>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Bizztopia Executive Intelligence!'); }} className="space-y-2 pt-1">
                                    <input
                                        type="email"
                                        placeholder="Enter work email..."
                                        required
                                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#287FBA]"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-slate-950 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors uppercase tracking-wider font-outfit cursor-pointer"
                                    >
                                        Subscribe Briefing
                                    </button>
                                </form>
                            </div>

                            {/* Widget 5: Explore Local Trade Markets */}
                            <div className="sb-widget space-y-3">
                                <h3 className="sb-sec-head">Verified Trade Markets</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {[
                                        { name: 'Auto Services', slug: 'auto-repair' },
                                        { name: 'Restaurants', slug: 'restaurants-hospitality' },
                                        { name: 'Home & Garden', slug: 'home-garden' },
                                        { name: 'Health & Medical', slug: 'health-dental' },
                                        { name: 'Professional Services', slug: 'marketing-business-growth' },
                                        { name: 'Commercial Facilities', slug: 'commercial-facilities' },
                                    ].map((trade) => (
                                        <a
                                            key={trade.slug}
                                            href={`/ideas?category=${trade.slug}`}
                                            className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 hover:bg-[#287FBA] hover:text-white text-slate-700 px-2.5 py-1 rounded-md transition-colors"
                                        >
                                            {trade.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Widget 6: Editorial Desk Verification Credentials */}
                            <div className="sb-widget bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 space-y-2 text-xs text-emerald-950">
                                <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Verified Editorial Desk</span>
                                </div>
                                <p className="text-[11px] text-emerald-700 leading-snug">
                                    Capped at 50 daily verified articles. Synthesized from 210 RSS feeds with automated HD Pexels imagery.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Read Next Section */}
                {relatedArticles.length > 0 && (
                    <div className="read-next-section">
                        <h3 className="read-next-title">Read Next</h3>
                        <div className="read-next-grid">
                            {/* Card 1: Wide */}
                            {relatedArticles[0] && (
                                <a href={`/ideas/${relatedArticles[0].slug}`} className="rn-card-wide">
                                    <img src={getImg(relatedArticles[0], 0)} alt={relatedArticles[0].title} />
                                    <div>
                                        <span className="kp-cat">{relatedArticles[0].category?.name || "Business"}</span>
                                        <h4 className="kp-h3 lc2" style={{ marginTop: '4px' }}>{relatedArticles[0].title}</h4>
                                        <p className="kp-ex lc2" style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>{relatedArticles[0].subtitle}</p>
                                    </div>
                                </a>
                            )}
                            {/* Card 2: Medium */}
                            {relatedArticles[1] && (
                                <a href={`/ideas/${relatedArticles[1].slug}`} className="rn-card-medium">
                                    <img src={getImg(relatedArticles[1], 1)} alt={relatedArticles[1].title} />
                                    <span className="kp-cat">{relatedArticles[1].category?.name || "Business"}</span>
                                    <h4 className="kp-h3 lc3" style={{ marginTop: '4px' }}>{relatedArticles[1].title}</h4>
                                </a>
                            )}
                            {/* Card 3: Text */}
                            {relatedArticles[2] && (
                                <a href={`/ideas/${relatedArticles[2].slug}`} className="rn-card-text">
                                    <span className="kp-cat">{relatedArticles[2].category?.name || "Business"}</span>
                                    <h4 className="kp-h3 lc3" style={{ marginTop: '4px' }}>{relatedArticles[2].title}</h4>
                                    <p className="kp-ex lc3" style={{ fontSize: '12.5px', color: '#555', marginTop: '8px' }}>{relatedArticles[2].subtitle}</p>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
