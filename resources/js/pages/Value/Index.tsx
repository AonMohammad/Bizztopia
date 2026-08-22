import React from 'react';
import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { RoiCalculatorWidget, RoiData } from '@/components/ui/RoiCalculatorWidget';
import { StartupCostWidget } from '@/components/ui/StartupCostWidget';
import { EngagePromoUnit } from '@/components/ui/EngagePromoUnit';
import { Calculator, CheckSquare, ArrowRight } from 'lucide-react';

interface ValueIndexProps {
    initialRoi: RoiData;
    initialStartupCost: {
        subtotal: number;
        contingency_reserve: number;
        recommended_total_capital: number;
        category_breakdown: Record<string, number>;
    };
}

export default function Index({ initialRoi, initialStartupCost }: ValueIndexProps) {
    return (
        <AppLayout>
            <Head title="Value — Decision Tools & Calculators Hub" />

            {/* Value Module Hero Header */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-hero text-white border-b border-[#0B4778]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A9AD4]/20 border border-[#8FC7E8]/40 text-[#63B5E8] text-xs font-semibold uppercase tracking-wider">
                        <Calculator className="w-3.5 h-3.5 text-[#63B5E8]" />
                        <span>Module 03 — Value • Decision Tools & Frameworks</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
                        Planning Calculators & Decision Tools<span className="text-[#4A9AD4]">.</span>
                    </h1>

                    <p className="text-[#D5EBF8] text-base max-w-2xl leading-relaxed">
                        Don't guess your growth numbers. Use interactive financial tools, lead estimators, and startup cost calculators tailored for North American business verticals.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-16 bg-[#F7FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Tool 1: Marketing ROI Calculator */}
                    <div className="space-y-4">
                        <RoiCalculatorWidget initialData={initialRoi} />
                    </div>

                    {/* Embedded Engage Interactive Banner Unit (Google Ads Style) */}
                    <EngagePromoUnit variant="banner" />

                    {/* Tool 2: Startup Capital Estimator */}
                    <div className="space-y-4">
                        <StartupCostWidget />
                    </div>

                    {/* Business Planning Checklist Banner */}
                    <div className="bg-white p-8 rounded-2xl border border-[#E6EEF3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-xl">
                            <div className="flex items-center gap-2">
                                <CheckSquare className="w-5 h-5 text-[#4A9AD4]" />
                                <h3 className="text-xl font-bold font-outfit text-[#102A3D]">Looking for a Step-by-Step Business Checklist?</h3>
                            </div>
                            <p className="text-xs text-[#466071] leading-relaxed">
                                Review our US & Canada legal formation and digital infrastructure playbook in the Attract hub.
                            </p>
                        </div>
                        <a href="/ideas/us-canada-business-startup-infrastructure-checklist">
                            <button className="px-5 py-2.5 rounded-xl bg-[#0B4778] text-white text-xs font-bold hover:bg-[#062F52] transition-colors flex items-center gap-2 shrink-0">
                                View Startup Checklist <ArrowRight className="w-4 h-4" />
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
