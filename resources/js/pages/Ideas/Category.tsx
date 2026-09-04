import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';

interface ArticleItem {
    id: number;
    title: string;
    slug: string;
    subtitle?: string;
    content_type?: string;
    reading_time?: string;
    published_at?: string;
    hero_image?: string;
    image_url?: string;
    category?: {
        name: string;
        slug: string;
    };
    author?: {
        name: string;
    };
}

interface CategoryDetail {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface CategoryProps {
    category: CategoryDetail;
    articles: ArticleItem[];
}

const fallbackImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
];

const getImg = (art: ArticleItem, idx: number) =>
    art.hero_image || art.image_url || fallbackImages[idx % fallbackImages.length];

const timeAgo = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    const d = new Date(dateStr);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
    return `${Math.round(diff / 86400)}d ago`;
};
const css = `
.cat-root { font-family: 'Galey Rounded', system-ui, sans-serif; background: #fff; color: #111; max-width: 1280px; margin: 0 auto; padding: 24px 24px 80px; }
.cat-header { border-bottom: 1px solid #e5e7eb; padding-bottom: 24px; margin-bottom: 32px; }
.cat-breadcrumb { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #888; display: flex; gap: 8px; margin-bottom: 16px; }
.cat-breadcrumb a { color: #888; text-decoration: none; }
.cat-breadcrumb a:hover { color: #0B4778; }
.cat-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 600; line-height: 1.1; color: #111; margin-bottom: 12px; letter-spacing: -0.02em; font-family: 'Galey Rounded', system-ui, sans-serif; }
.cat-desc { font-size: 14px; color: #666; max-width: 720px; line-height: 1.6; margin: 0; }

.hp-section { padding: 32px 0; border-bottom: 1px solid #e5e7eb; }
.hp-section:last-of-type { border-bottom: none; }
.hp-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.hp-sec-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0B4778; padding-bottom: 6px; margin-bottom: 24px; }
.hp-sec-title { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .2em; color: #0B4778; text-decoration: none; }

.hp-card { display: block; text-decoration: none; color: inherit; transition: opacity 0.2s; }
.hp-card:hover { opacity: 0.85; }
.hp-img { overflow: hidden; background: #f3f4f6; position: relative; }
.hp-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.hp-card:hover .hp-img img { transform: scale(1.04); }

.hp-meta { font-size: 10px; color: #999; margin-top: 6px; display: flex; align-items: center; gap: 6px; }
.hp-meta b { color: #555; font-weight: 600; }
.hp-h2 { font-size: clamp(1.2rem, 2vw, 1.6rem); font-weight: 600; line-height: 1.2; color: #111; margin: 0 0 8px; letter-spacing: -0.01em; font-family: 'Galey Rounded', system-ui, sans-serif; }
.hp-h3 { font-size: 14px; font-weight: 700; line-height: 1.35; color: #111; margin: 0; }
.hp-h3-sm { font-size: 13px; font-weight: 700; line-height: 1.3; color: #111; margin: 0; }
.hp-excerpt { font-size: 13px; color: #555; line-height: 1.55; margin: 6px 0 0; }

.lc2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.lc3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

.kp-feature-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
.kp-feature-right { display: flex; flex-direction: column; gap: 24px; border-left: 1px solid #e5e7eb; padding-left: 32px; }
.kp-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.kp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

@media (max-width: 1024px) {
    .kp-feature-grid { grid-template-columns: 1fr; }
    .kp-feature-right { border-left: none; padding-left: 0; }
    .kp-grid-4 { grid-template-columns: 1fr 1fr; }
    .kp-grid-3 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
    .cat-root { padding: 16px; }
    .kp-grid-4 { grid-template-columns: 1fr; }
    .kp-grid-3 { grid-template-columns: 1fr; }
}
`;
export default function Category({ category, articles }: CategoryProps) {
    const hero = articles[0];
    const sidebar = articles.slice(1, 3);
    const grid4 = articles.slice(3, 7);
    const older = articles.slice(7);

    return (
        <AppLayout>
            <Head title={`${category.name} — Bizztopia Ideas Category`} />
            <style>{css}</style>

            <div className="cat-root">
                {/* Header */}
                <div className="cat-header">
                    <div className="cat-breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/ideas">Ideas</Link>
                        <span>/</span>
                        <span>{category.name}</span>
                    </div>
                    <h1 className="cat-title">{category.name}</h1>
                    <p className="cat-desc">
                        {category.description || `Real-time digital intelligence and market intelligence monitoring key transactions, deals, and strategic developments in ${category.name}.`}
                    </p>
                </div>

                {articles.length > 0 ? (
                    <>
                        {/* Section 1: Hero split */}
                        <div className="hp-section" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <div className="kp-feature-grid">
                                {/* Left hero */}
                                {hero && (
                                    <a href={`/ideas/${hero.slug}`} className="hp-card">
                                        <div className="hp-img" style={{ aspectRatio: '16/10', marginBottom: '16px' }}>
                                            <img src={getImg(hero, 0)} alt={hero.title} />
                                        </div>
                                        <h2 className="hp-h2">{hero.title}</h2>
                                        {hero.subtitle && <p className="hp-excerpt lc3">{hero.subtitle}</p>}
                                        <div className="hp-meta">
                                            {hero.author?.name && <b>{hero.author.name}</b>}
                                            <span>{timeAgo(hero.published_at)}</span>
                                        </div>
                                    </a>
                                )}

                                {/* Right sidebar stacked */}
                                <div className="kp-feature-right">
                                    <div className="hp-sec-head" style={{ marginBottom: '12px' }}>
                                        <span className="hp-sec-title">Featured Updates</span>
                                    </div>
                                    {sidebar.map((art, idx) => (
                                        <a key={art.id} href={`/ideas/${art.slug}`} className="hp-card">
                                            <div className="hp-img" style={{ aspectRatio: '16/9', marginBottom: '10px' }}>
                                                <img src={getImg(art, idx + 1)} alt={art.title} />
                                            </div>
                                            <p className="hp-h3 lc2">{art.title}</p>
                                            <div className="hp-meta">
                                                <span>{timeAgo(art.published_at)}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Section 2: 4-Column Card Grid */}
                        {grid4.length > 0 && (
                            <div className="hp-section" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <div className="hp-sec-head">
                                    <span className="hp-sec-title">Market Intel</span>
                                </div>
                                <div className="kp-grid-4">
                                    {grid4.map((art, idx) => (
                                        <a key={art.id} href={`/ideas/${art.slug}`} className="hp-card" style={{ border: '1px solid #e5e7eb', padding: '0', overflow: 'hidden' }}>
                                            <div className="hp-img" style={{ aspectRatio: '1/1' }}>
                                                <img src={getImg(art, idx + 3)} alt={art.title} />
                                            </div>
                                            <div style={{ padding: '16px' }}>
                                                <p className="hp-h3-sm lc3" style={{ minHeight: '52px' }}>{art.title}</p>
                                                <div className="hp-meta" style={{ marginTop: '12px' }}>
                                                    <span>{timeAgo(art.published_at)}</span>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Section 3: More Coverage */}
                        {older.length > 0 && (
                            <div className="hp-section" style={{ borderBottom: 'none' }}>
                                <div className="hp-sec-head">
                                    <span className="hp-sec-title">More Coverage</span>
                                </div>
                                <div className="kp-grid-3">
                                    {older.map((art, idx) => (
                                        <a key={art.id} href={`/ideas/${art.slug}`} className="hp-card">
                                            <div className="hp-img" style={{ aspectRatio: '16/10', marginBottom: '12px' }}>
                                                <img src={getImg(art, idx + 7)} alt={art.title} />
                                            </div>
                                            <p className="hp-h3 lc3" style={{ marginBottom: '8px', fontSize: '.97rem' }}>{art.title}</p>
                                            {art.subtitle && <p className="hp-excerpt lc2">{art.subtitle}</p>}
                                            <div className="hp-meta">
                                                <span>{timeAgo(art.published_at)}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ padding: '80px 0', textAlign: 'center', color: '#888' }}>
                        <p style={{ fontSize: '14px', margin: 0 }}>No articles found in this category yet. Check back soon for new updates.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
