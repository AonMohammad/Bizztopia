<?php

namespace App\Modules\Value\Services;

class CalculationEngine
{
    /**
     * Calculate Marketing ROI, projected leads, revenue, and net profit.
     */
    public function calculateRoi(float $monthlyBudget, float $targetCpl, float $conversionRatePercent, float $avgDealValue): array
    {
        $monthlyBudget = max(10, $monthlyBudget);
        $targetCpl = max(1, $targetCpl);
        $conversionRate = max(0.1, min(100, $conversionRatePercent)) / 100;
        $avgDealValue = max(1, $avgDealValue);

        $estimatedLeads = (int) floor($monthlyBudget / $targetCpl);
        $estimatedCustomers = (int) round($estimatedLeads * $conversionRate);
        $projectedRevenue = $estimatedCustomers * $avgDealValue;
        $netProfit = $projectedRevenue - $monthlyBudget;
        $roiPercent = $monthlyBudget > 0 ? round(($netProfit / $monthlyBudget) * 100, 1) : 0;

        return [
            'monthly_budget' => $monthlyBudget,
            'target_cpl' => $targetCpl,
            'conversion_rate_percent' => $conversionRatePercent,
            'avg_deal_value' => $avgDealValue,
            'estimated_leads' => $estimatedLeads,
            'estimated_customers' => $estimatedCustomers,
            'projected_revenue' => $projectedRevenue,
            'net_profit' => $netProfit,
            'roi_percent' => $roiPercent,
            'assessment' => $roiPercent >= 100 
                ? 'High Growth Potential' 
                : ($roiPercent > 0 ? 'Positive Return' : 'Requires Optimization'),
        ];
    }

    /**
     * Calculate Business Startup Cost Requirements across categories.
     */
    public function calculateStartupCost(array $items): array
    {
        $totalCost = 0;
        $categoryTotals = [];

        foreach ($items as $item) {
            $cat = $item['category'] ?? 'General';
            $amount = max(0, (float) ($item['amount'] ?? 0));
            $totalCost += $amount;

            $categoryTotals[$cat] = ($categoryTotals[$cat] ?? 0) + $amount;
        }

        $contingencyReserve = round($totalCost * 0.15, 2); // 15% emergency reserve
        $recommendedCapital = $totalCost + $contingencyReserve;

        return [
            'subtotal' => $totalCost,
            'contingency_reserve' => $contingencyReserve,
            'recommended_total_capital' => $recommendedCapital,
            'category_breakdown' => $categoryTotals,
        ];
    }
}
