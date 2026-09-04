import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, User, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from './Badge';

interface NewspaperGridSectionProps {
    boardName?: string;
    layoutType?: string;
    articles?: any[];
    onViewAll?: () => void;
}

export const NewspaperGridSection: React.FC<NewspaperGridSectionProps> = ({ 
    boardName, 
    layoutType = 'hero_split', 
    articles = [], 
    onViewAll 
}) => {
    if (!articles || articles.length === 0) return null;

    const leadArticle = articles[0];
    const secondArticle = articles[1] || articles[0];
    const thirdArticle = articles[2] || articles[0];
    const fourthArticle = articles[3] || articles[0];
    const remainingArticles = articles.slice(4, 8);

    return (
        <section className="space-y-6 my-8 py-6 border-b border-[#E6EEF3] font-sans">
            {/* LAYOUT TYPE 1: BBC News Hero Split Grid */}
            {layoutType === 'hero_split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column (Text-Based Lead Story) */}
                    <div className="lg:col-span-4 flex flex-col justify-between bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                        <div className="space-y-3">
                            <Badge variant="brand" size="sm">
                                {leadArticle.category?.name || 'Top Headline'}
                            </Badge>
                            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-[#102A3D] hover:text-[#287FBA] transition-colors leading-tight">
                                <Link href={`/ideas/${leadArticle.slug}`}>
                                    {leadArticle.title}
                                </Link>
                            </h3>
                            <p className="text-xs text-[#718797] line-clamp-3 leading-relaxed">
                                {leadArticle.excerpt || leadArticle.content?.substring(0, 140)}...
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#466071] pt-3 border-t border-[#E6EEF3]">
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3 text-[#287FBA]" /> {leadArticle.author?.name || 'Editorial Board'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#287FBA]" /> {leadArticle.reading_time || '5 min read'}
                            </span>
                        </div>
                    </div>

                    {/* Middle Column (Hero Feature Card with HD Photography) */}
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6EEF3] overflow-hidden shadow-xs flex flex-col md:flex-row">
                        <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-slate-900">
                            <img 
                                src={secondArticle.hero_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'} 
                                alt={secondArticle.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <Badge variant="brand" size="sm">
                                    Featured Analysis
                                </Badge>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <h3 className="text-lg sm:text-xl font-bold font-outfit text-[#102A3D] hover:text-[#287FBA] transition-colors leading-snug">
                                    <Link href={`/ideas/${secondArticle.slug}`}>
                                        {secondArticle.title}
                                    </Link>
                                </h3>
                                <p className="text-xs text-[#718797] line-clamp-4 leading-relaxed">
                                    {secondArticle.excerpt || secondArticle.content?.substring(0, 160)}...
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#466071] pt-3 border-t border-[#E6EEF3]">
                                <span>{secondArticle.published_at || 'Just Published'}</span>
                                <Link href={`/ideas/${secondArticle.slug}`} className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1">
                                    Read Full Story →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LAYOUT TYPE 2: 4-Column Editorial Masonry Grid */}
            {layoutType === '4_column_masonry' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.slice(0, 4).map((art) => (
                        <div key={art.id} className="bg-white p-5 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#287FBA]/40 transition-all">
                            <div className="space-y-2.5">
                                <Badge variant="brand" size="sm">
                                    {art.category?.name || 'Editorial'}
                                </Badge>
                                <h4 className="font-bold text-sm font-outfit text-[#102A3D] hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug">
                                    <Link href={`/ideas/${art.slug}`}>{art.title}</Link>
                                </h4>
                                <p className="text-xs text-[#718797] line-clamp-3 leading-relaxed">
                                    {art.excerpt || art.content?.substring(0, 100)}...
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#466071] pt-2 border-t border-[#E6EEF3]">
                                <span>{art.reading_time || '4 min'}</span>
                                <Link href={`/ideas/${art.slug}`} className="font-bold text-[#287FBA] hover:underline">Read →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* LAYOUT TYPE 3: Spotlight Digest */}
            {(layoutType === 'spotlight_digest' || layoutType === 'market_grid') && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((art) => (
                        <div key={art.id} className="bg-white rounded-2xl border border-[#E6EEF3] overflow-hidden shadow-xs flex flex-col justify-between">
                            <div className="h-44 bg-slate-900 relative overflow-hidden">
                                <img src={art.hero_image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'} alt={art.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <h4 className="font-bold text-base font-outfit text-[#102A3D] hover:text-[#287FBA] transition-colors line-clamp-2">
                                        <Link href={`/ideas/${art.slug}`}>{art.title}</Link>
                                    </h4>
                                    <p className="text-xs text-[#718797] line-clamp-2">
                                        {art.excerpt || art.content?.substring(0, 110)}...
                                    </p>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-[#466071] pt-2 border-t border-[#E6EEF3]">
                                    <span>{art.category?.name || 'Insight'}</span>
                                    <Link href={`/ideas/${art.slug}`} className="font-bold text-[#287FBA]">Read Report →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
