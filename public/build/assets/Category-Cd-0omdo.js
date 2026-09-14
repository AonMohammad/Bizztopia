import"./rolldown-runtime-Bh1tDfsg.js";import{n as e,r as t,t as n,u as r}from"./vendor-core-Ge-8zfNd.js";import{t as i}from"./AppLayout-BiFZdY-w.js";r();var a=n(),o=[`https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80`],s=(e,t)=>e.hero_image||e.image_url||o[t%o.length],c=e=>{if(!e)return`Recently`;let t=new Date(e),n=(Date.now()-t.getTime())/1e3;return n<3600?`${Math.round(n/60)}m ago`:n<86400?`${Math.round(n/3600)}h ago`:`${Math.round(n/86400)}d ago`},l=`
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
`;function u({category:n,articles:r}){let o=r[0],u=r.slice(1,3),d=r.slice(3,7),f=r.slice(7);return(0,a.jsxs)(i,{children:[(0,a.jsx)(e,{title:`${n.name} — Bizztopia Ideas Category`}),(0,a.jsx)(`style`,{children:l}),(0,a.jsxs)(`div`,{className:`cat-root`,children:[(0,a.jsxs)(`div`,{className:`cat-header`,children:[(0,a.jsxs)(`div`,{className:`cat-breadcrumb`,children:[(0,a.jsx)(t,{href:`/`,children:`Home`}),(0,a.jsx)(`span`,{children:`/`}),(0,a.jsx)(t,{href:`/ideas`,children:`Ideas`}),(0,a.jsx)(`span`,{children:`/`}),(0,a.jsx)(`span`,{children:n.name})]}),(0,a.jsx)(`h1`,{className:`cat-title`,children:n.name}),(0,a.jsx)(`p`,{className:`cat-desc`,children:n.description||`Real-time digital intelligence and market intelligence monitoring key transactions, deals, and strategic developments in ${n.name}.`})]}),r.length>0?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`hp-section`,style:{borderBottom:`1px solid #e5e7eb`},children:(0,a.jsxs)(`div`,{className:`kp-feature-grid`,children:[o&&(0,a.jsxs)(`a`,{href:`/ideas/${o.slug}`,className:`hp-card`,children:[(0,a.jsx)(`div`,{className:`hp-img`,style:{aspectRatio:`16/10`,marginBottom:`16px`},children:(0,a.jsx)(`img`,{src:s(o,0),alt:o.title})}),(0,a.jsx)(`h2`,{className:`hp-h2`,children:o.title}),o.subtitle&&(0,a.jsx)(`p`,{className:`hp-excerpt lc3`,children:o.subtitle}),(0,a.jsxs)(`div`,{className:`hp-meta`,children:[o.author?.name&&(0,a.jsx)(`b`,{children:o.author.name}),(0,a.jsx)(`span`,{children:c(o.published_at)})]})]}),(0,a.jsxs)(`div`,{className:`kp-feature-right`,children:[(0,a.jsx)(`div`,{className:`hp-sec-head`,style:{marginBottom:`12px`},children:(0,a.jsx)(`span`,{className:`hp-sec-title`,children:`Featured Updates`})}),u.map((e,t)=>(0,a.jsxs)(`a`,{href:`/ideas/${e.slug}`,className:`hp-card`,children:[(0,a.jsx)(`div`,{className:`hp-img`,style:{aspectRatio:`16/9`,marginBottom:`10px`},children:(0,a.jsx)(`img`,{src:s(e,t+1),alt:e.title})}),(0,a.jsx)(`p`,{className:`hp-h3 lc2`,children:e.title}),(0,a.jsx)(`div`,{className:`hp-meta`,children:(0,a.jsx)(`span`,{children:c(e.published_at)})})]},e.id))]})]})}),d.length>0&&(0,a.jsxs)(`div`,{className:`hp-section`,style:{borderBottom:`1px solid #e5e7eb`},children:[(0,a.jsx)(`div`,{className:`hp-sec-head`,children:(0,a.jsx)(`span`,{className:`hp-sec-title`,children:`Market Intel`})}),(0,a.jsx)(`div`,{className:`kp-grid-4`,children:d.map((e,t)=>(0,a.jsxs)(`a`,{href:`/ideas/${e.slug}`,className:`hp-card`,style:{border:`1px solid #e5e7eb`,padding:`0`,overflow:`hidden`},children:[(0,a.jsx)(`div`,{className:`hp-img`,style:{aspectRatio:`1/1`},children:(0,a.jsx)(`img`,{src:s(e,t+3),alt:e.title})}),(0,a.jsxs)(`div`,{style:{padding:`16px`},children:[(0,a.jsx)(`p`,{className:`hp-h3-sm lc3`,style:{minHeight:`52px`},children:e.title}),(0,a.jsx)(`div`,{className:`hp-meta`,style:{marginTop:`12px`},children:(0,a.jsx)(`span`,{children:c(e.published_at)})})]})]},e.id))})]}),f.length>0&&(0,a.jsxs)(`div`,{className:`hp-section`,style:{borderBottom:`none`},children:[(0,a.jsx)(`div`,{className:`hp-sec-head`,children:(0,a.jsx)(`span`,{className:`hp-sec-title`,children:`More Coverage`})}),(0,a.jsx)(`div`,{className:`kp-grid-3`,children:f.map((e,t)=>(0,a.jsxs)(`a`,{href:`/ideas/${e.slug}`,className:`hp-card`,children:[(0,a.jsx)(`div`,{className:`hp-img`,style:{aspectRatio:`16/10`,marginBottom:`12px`},children:(0,a.jsx)(`img`,{src:s(e,t+7),alt:e.title})}),(0,a.jsx)(`p`,{className:`hp-h3 lc3`,style:{marginBottom:`8px`,fontSize:`.97rem`},children:e.title}),e.subtitle&&(0,a.jsx)(`p`,{className:`hp-excerpt lc2`,children:e.subtitle}),(0,a.jsx)(`div`,{className:`hp-meta`,children:(0,a.jsx)(`span`,{children:c(e.published_at)})})]},e.id))})]})]}):(0,a.jsx)(`div`,{style:{padding:`80px 0`,textAlign:`center`,color:`#888`},children:(0,a.jsx)(`p`,{style:{fontSize:`14px`,margin:0},children:`No articles found in this category yet. Check back soon for new updates.`})})]})]})}export{u as default};