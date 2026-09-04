import React from 'react';
import { EngagePromoUnit } from './EngagePromoUnit';
import { Megaphone, ExternalLink, Sparkles } from 'lucide-react';

interface AdSpaceBannerProps {
    adType?: string;
    adCode?: string;
    boardName?: string;
}

export const AdSpaceBanner: React.FC<AdSpaceBannerProps> = ({ 
    adType = 'google_ads', 
    adCode, 
    boardName = '' 
}) => {
    if (adType === 'engage_poll' || adType === 'engage_quiz') {
        return <EngagePromoUnit variant="banner" />;
    }

    return (
        <div className="w-full my-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-hidden shadow-xs relative font-sans">
            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-3 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1 text-amber-400">
                    <Sparkles className="w-3 h-3" /> Sponsor Advertisement Space
                </span>
                <span>Google AdSense (728x90)</span>
            </div>

            {/* Render actual custom ad HTML code or standard AdSense Banner placeholder */}
            {adCode ? (
                <div 
                    className="w-full min-h-[90px] flex items-center justify-center bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 text-xs text-slate-300 font-mono overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: adCode }}
                />
            ) : (
                <div className="w-full min-h-[90px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                            <Megaphone className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Google AdSense Leaderboard Space</div>
                            <div className="text-xs text-slate-400">AdSense Unit ID: ca-pub-bizztopia-7890 • Managed from Backend Admin</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
