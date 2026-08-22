<?php

namespace App\Modules\Value\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Value\Services\CalculationEngine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ValueController extends Controller
{
    public function __construct(
        protected CalculationEngine $calculationEngine
    ) {}

    /**
     * Display the Value Module (Tools & Calculators Hub).
     */
    public function index(): Response
    {
        // Default initial calculation states
        $defaultRoi = $this->calculationEngine->calculateRoi(
            monthlyBudget: 2500,
            targetCpl: 45,
            conversionRatePercent: 8,
            avgDealValue: 1200
        );

        $defaultStartupCost = $this->calculationEngine->calculateStartupCost([
            ['category' => 'Legal & Registration', 'amount' => 650],
            ['category' => 'Web & CAP Architecture', 'amount' => 1800],
            ['category' => 'Initial Marketing & Launch', 'amount' => 1200],
            ['category' => 'Operations & Software', 'amount' => 850],
        ]);

        return Inertia::render('Value/Index', [
            'initialRoi' => $defaultRoi,
            'initialStartupCost' => $defaultStartupCost,
        ]);
    }

    /**
     * AJAX endpoint for live Marketing ROI calculation.
     */
    public function calculateRoi(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'monthly_budget' => ['required', 'numeric', 'min:10'],
            'target_cpl' => ['required', 'numeric', 'min:1'],
            'conversion_rate_percent' => ['required', 'numeric', 'min:0.1', 'max:100'],
            'avg_deal_value' => ['required', 'numeric', 'min:1'],
        ]);

        $result = $this->calculationEngine->calculateRoi(
            monthlyBudget: (float) $validated['monthly_budget'],
            targetCpl: (float) $validated['target_cpl'],
            conversionRatePercent: (float) $validated['conversion_rate_percent'],
            avgDealValue: (float) $validated['avg_deal_value']
        );

        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * AJAX endpoint for Startup Cost Calculation.
     */
    public function calculateStartupCost(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.category' => ['required', 'string'],
            'items.*.amount' => ['required', 'numeric', 'min:0'],
        ]);

        $result = $this->calculationEngine->calculateStartupCost($validated['items']);

        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }
}
