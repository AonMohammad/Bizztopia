import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, User, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from './Badge';

export const NewspaperGridSection = ({ 
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
        <section className="space-y-6 my-10 border-t border-b border-[#E6EEF3] py-8">
            {/* Board Header Title */}
            <div className="flex items-center justify-between border-b border-[#102A3D]/10 pb-3">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-6 bg-[#287FBA] rounded-full" />
                    <h2 className="text-2xl font-black font-outfit text-[#102A3D] tracking-tight">
                        {boardName}
                    </h2>
                </div>
                {onViewAll && (
                    <button 
                        onClick={onViewAll} 
                        className="text-xs font-bold text-[#287FBA] hover:underline flex items-center gap-1"
                    >
                        View All Stories <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

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
                            <p className="text-xs text-[#466071] leading-relaxed line-clamp-4 font-normal">
                                {leadArticle.subtitle || 'Executive analysis and operational framework for high-intent customer acquisition.'}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                            <div className="flex items-center gap-1.5 font-bold truncate">
                                <User className="w-3.5 h-3.5 text-[#4A9AD4]" />
                                <span className="truncate">{leadArticle.author?.name || 'Editorial Team'}</span>
                            </div>
                            <span className="font-bold text-[#466071]">{leadArticle.reading_time || '5 min read'}</span>
                        </div>
                    </div>

                    {/* Center Column (Featured Center Photo Story) */}
                    <div className="lg:col-span-5 bg-gradient-to-b from-[#062F52] to-[#031729] text-white p-6 sm:p-8 rounded-2xl border border-[#0B4778] flex flex-col justify-between shadow-md relative overflow-hidden group">
                        <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                            Featured Spotlight
                        </div>

                        <div className="space-y-4 relative z-10">
                            <span className="text-xs font-bold text-[#63B5E8] uppercase tracking-widest">
                                {secondArticle.content_type || 'Market News'}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white group-hover:text-[#63B5E8] transition-colors leading-tight">
                                <Link href={`/ideas/${secondArticle.slug}`}>
                                    {secondArticle.title}
                                </Link>
                            </h3>
                            <p className="text-xs sm:text-sm text-[#D5EBF8] leading-relaxed line-clamp-3">
                                {secondArticle.subtitle}
                            </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between text-xs text-[#8FC7E8] relative z-10 font-medium">
                            <span>{secondArticle.author?.name || 'Editorial Desk'}</span>
                            <span className="text-white font-bold">{secondArticle.reading_time || '6 min read'}</span>
                        </div>
                    </div>

                    {/* Right Column (Secondary Story) */}
                    <div className="lg:col-span-3 flex flex-col justify-between bg-white p-6 rounded-2xl border border-[#E6EEF3] shadow-xs space-y-4">
                        <div className="space-y-3">
                            <Badge variant="secondary" size="sm">
                                {thirdArticle.content_type || 'Analysis'}
                            </Badge>
                            <h3 className="text-base font-bold font-outfit text-[#102A3D] hover:text-[#287FBA] transition-colors leading-snug line-clamp-3">
                                <Link href={`/ideas/${thirdArticle.slug}`}>
                                    {thirdArticle.title}
                                </Link>
                            </h3>
                            <p className="text-xs text-[#466071] line-clamp-3 leading-relaxed">
                                {thirdArticle.subtitle}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                            <span className="font-bold text-[#287FBA]">Latest Update</span>
                            <span className="font-bold text-[#466071]">{thirdArticle.reading_time || '4 min read'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* LAYOUT TYPE 2: 4-Column Editorial Masonry Grid */}
            {layoutType === '4_column_masonry' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.slice(0, 4).map((art) => (
                        <div key={art.id} className="bg-white p-5 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="space-y-2">
                                <Badge variant="secondary" size="sm">{art.content_type}</Badge>
                                <h4 className="text-sm font-bold font-outfit text-[#102A3D] hover:text-[#287FBA] line-clamp-2 leading-snug">
                                    <Link href={`/ideas/${art.slug}`}>{art.title}</Link>
                                </h4>
                                <p className="text-xs text-[#466071] line-clamp-3 leading-relaxed">{art.subtitle}</p>
                            </div>
                            <div className="pt-3 border-t border-[#E6EEF3] flex items-center justify-between text-[11px] text-[#718797] font-semibold">
                                <span>{art.author?.name || 'Editorial'}</span>
                                <span className="text-[#466071]">{art.reading_time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* LAYOUT TYPE 3: Spotlight & Stacked Digest Grid */}
            {layoutType === 'spotlight_digest' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            <span className="bg-[#287FBA] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                                Industry Benchmark Report
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-[#102A3D] hover:text-[#287FBA]">
                                <Link href={`/ideas/${leadArticle.slug}`}>{leadArticle.title}</Link>
                            </h3>
                            <p className="text-xs sm:text-sm text-[#466071] leading-relaxed line-clamp-3">{leadArticle.subtitle}</p>
                        </div>
                        <div className="pt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                            <span className="font-bold text-[#102A3D]">{leadArticle.author?.name || 'Strategic Desk'}</span>
                            <span className="font-bold text-[#287FBA]">{leadArticle.reading_time}</span>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-[#F7FAFC] p-6 rounded-2xl border border-[#E6EEF3] space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#0B4778] border-b border-[#E6EEF3] pb-2">
                            Quick Intelligence Stack
                        </h4>
                        <div className="space-y-3 divide-y divide-[#E6EEF3]">
                            {articles.slice(1, 4).map((art) => (
                                <div key={art.id} className="pt-3 first:pt-0 space-y-1">
                                    <h5 className="text-xs font-bold text-[#102A3D] hover:text-[#287FBA] line-clamp-2">
                                        <Link href={`/ideas/${art.slug}`}>{art.title}</Link>
                                    </h5>
                                    <div className="text-[10px] text-[#718797] font-medium">{art.reading_time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* LAYOUT TYPE 4: Market Intelligence Grid */}
            {layoutType === 'market_grid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map((art, idx) => (
                        <div 
                            key={art.id} 
                            className={`p-6 rounded-2xl border shadow-xs space-y-3 flex flex-col justify-between ${
                                idx === 0 ? 'bg-[#F4FAFE] border-[#4A9AD4]/40' : 'bg-white border-[#E6EEF3]'
                            }`}
                        >
                            <div className="space-y-2">
                                <Badge variant="brand" size="sm">{art.content_type}</Badge>
                                <h4 className="text-base font-bold font-outfit text-[#102A3D] hover:text-[#287FBA]">
                                    <Link href={`/ideas/${art.slug}`}>{art.title}</Link>
                                </h4>
                                <p className="text-xs text-[#466071] line-clamp-3 leading-relaxed">{art.subtitle}</p>
                            </div>
                            <div className="pt-3 border-t border-[#E6EEF3] flex items-center justify-between text-xs text-[#718797]">
                                <span className="font-semibold">{art.author?.name || 'Analyst'}</span>
                                <span className="font-bold text-[#466071]">{art.reading_time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
