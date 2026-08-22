import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Input } from './Input';
import { Calculator, DollarSign, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

export interface RoiData {
    monthly_budget: number;
    target_cpl: number;
    conversion_rate_percent: number;
    avg_deal_value: number;
    estimated_leads: number;
    estimated_customers: number;
    projected_revenue: number;
    net_profit: number;
    roi_percent: number;
    assessment: string;
}

export interface RoiCalculatorWidgetProps {
    initialData?: RoiData;
    className?: string;
}

export const RoiCalculatorWidget: React.FC<RoiCalculatorWidgetProps> = ({
    initialData = {
        monthly_budget: 2500,
        target_cpl: 45,
        conversion_rate_percent: 8,
        avg_deal_value: 1200,
        estimated_leads: 55,
        estimated_customers: 4,
        projected_revenue: 4800,
        net_profit: 2300,
        roi_percent: 92,
        assessment: 'Positive Return'
    },
    className = ''
}) => {
    const [budget, setBudget] = useState<number>(initialData.monthly_budget);
    const [cpl, setCpl] = useState<number>(initialData.target_cpl);
    const [convRate, setConvRate] = useState<number>(initialData.conversion_rate_percent);
    const [dealValue, setDealValue] = useState<number>(initialData.avg_deal_value);
    const [results, setResults] = useState<RoiData>(initialData);

    useEffect(() => {
        // Real-time calculation client computation
        const safeBudget = max(10, budget);
        const safeCpl = max(1, cpl);
        const safeConv = max(0.1, min(100, convRate)) / 100;
        const safeDeal = max(1, dealValue);

        const leads = Math.floor(safeBudget / safeCpl);
        const customers = Math.round(leads * safeConv);
        const revenue = customers * safeDeal;
        const profit = revenue - safeBudget;
        const roi = safeBudget > 0 ? Math.round((profit / safeBudget) * 100) : 0;

        let assess = 'Requires Optimization';
        if (roi >= 100) assess = 'High Growth Potential';
        else if (roi > 0) assess = 'Positive Return';

        setResults({
            monthly_budget: safeBudget,
            target_cpl: safeCpl,
            conversion_rate_percent: convRate,
            avg_deal_value: safeDeal,
            estimated_leads: leads,
            estimated_customers: customers,
            projected_revenue: revenue,
            net_profit: profit,
            roi_percent: roi,
            assessment: assess
        });
    }, [budget, cpl, convRate, dealValue]);

    function max(a: number, b: number) { return a > b ? a : b; }

    return (
        <div 
            className={`
                bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EEF3] shadow-xs 
                hover:shadow-md transition-all duration-300 space-y-6
                ${className}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center font-bold">
                        <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                        <Badge variant="primary" size="sm">Value Tool</Badge>
                        <h3 className="text-xl font-bold font-outfit text-[#102A3D]">Marketing ROI Estimator</h3>
                    </div>
                </div>
                <Badge variant={results.roi_percent > 0 ? 'success' : 'warning'} size="md">
                    {results.assessment}
                </Badge>
            </div>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs Column */}
                <div className="lg:col-span-6 space-y-5">
                    <div>
                        <div className="flex justify-between text-xs font-semibold text-[#102A3D] mb-1">
                            <span>Monthly Acquisition Budget ($)</span>
                            <span className="font-bold text-[#287FBA]">${budget.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="200"
                            max="20000"
                            step="100"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full accent-[#287FBA] h-2 bg-[#EEF4F8] rounded-lg cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-semibold text-[#102A3D] mb-1">
                            <span>Target Lead Cost (CPL $)</span>
                            <span className="font-bold text-[#287FBA]">${cpl}</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="250"
                            step="5"
                            value={cpl}
                            onChange={(e) => setCpl(Number(e.target.value))}
                            className="w-full accent-[#287FBA] h-2 bg-[#EEF4F8] rounded-lg cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-semibold text-[#102A3D] mb-1">
                            <span>Sales Conversion Rate (%)</span>
                            <span className="font-bold text-[#287FBA]">{convRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="0.5"
                            value={convRate}
                            onChange={(e) => setConvRate(Number(e.target.value))}
                            className="w-full accent-[#287FBA] h-2 bg-[#EEF4F8] rounded-lg cursor-pointer"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-semibold text-[#102A3D] mb-1">
                            <span>Average Customer Deal Value ($)</span>
                            <span className="font-bold text-[#287FBA]">${dealValue.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={dealValue}
                            onChange={(e) => setDealValue(Number(e.target.value))}
                            className="w-full accent-[#287FBA] h-2 bg-[#EEF4F8] rounded-lg cursor-pointer"
                        />
                    </div>
                </div>

                {/* Outputs Display Box */}
                <div className="lg:col-span-6 bg-[#062F52] text-white p-6 rounded-2xl flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold text-[#63B5E8] uppercase tracking-widest block">
                            Calculated Acquisition Forecast
                        </span>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                                <span className="text-xs text-[#8FC7E8] block">Est. Monthly Leads</span>
                                <span className="text-2xl font-extrabold text-white">{results.estimated_leads}</span>
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                                <span className="text-xs text-[#8FC7E8] block">Est. Customers</span>
                                <span className="text-2xl font-extrabold text-white">{results.estimated_customers}</span>
                            </div>
                        </div>

                        <div className="p-4 bg-white/10 rounded-xl border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-xs text-[#8FC7E8]">
                                <span>Projected Gross Revenue:</span>
                                <span className="font-bold text-white">${results.projected_revenue.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-[#8FC7E8]">
                                <span>Net Profit Margin:</span>
                                <span className={`font-bold ${results.net_profit >= 0 ? 'text-[#249A68]' : 'text-[#D95353]'}`}>
                                    ${results.net_profit.toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                                <span className="text-sm font-bold text-white">Estimated ROI:</span>
                                <span className="text-3xl font-extrabold text-[#63B5E8]">{results.roi_percent}%</span>
                            </div>
                        </div>
                    </div>

                    <a href="/ideas">
                        <Button variant="secondary" size="sm" fullWidth className="bg-white text-[#0B4778] hover:bg-[#EAF5FC]">
                            View Recommended Acquisition Playbooks <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};
