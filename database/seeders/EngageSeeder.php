<?php

namespace Database\Seeders;

use App\Modules\Engage\Models\Giveaway;
use App\Modules\Engage\Models\Poll;
use App\Modules\Engage\Models\PollOption;
use App\Modules\Engage\Models\Quiz;
use App\Modules\Engage\Models\QuizOption;
use App\Modules\Engage\Models\QuizQuestion;
use App\Modules\Engage\Models\QuizResult;
use Illuminate\Database\Seeder;

class EngageSeeder extends Seeder
{
    public function run(): void
    {
        // 0. Seed Giveaways & Sweepstakes Campaigns
        Giveaway::firstOrCreate(
            ['slug' => '5000-small-business-tech-growth-grant'],
            [
                'title' => '$5,000 Small Business Tech & Growth Grant Sweepstakes',
                'description' => 'Enter to win a $5,000 USD Growth & Technology Grant to accelerate your customer acquisition platform and digital infrastructure.',
                'prize_value' => '$5,000 USD Grant + 1-on-1 Consultation',
                'ends_at' => now()->addDays(14),
                'total_entries' => 342,
                'status' => 'active',
                'rules' => 'Open to verified business owners and entrepreneurs in North America. Winner selected via random drawing on entry closing date.',
            ]
        );

        Giveaway::firstOrCreate(
            ['slug' => 'enterprise-hardware-software-suite-giveaway'],
            [
                'title' => 'North American Entrepreneur Workstation & Software Suite',
                'description' => 'Win a complete remote business workstation package including high-performance hardware and 1-year enterprise SaaS licenses.',
                'prize_value' => '$3,200 USD Hardware & SaaS Suite',
                'ends_at' => now()->addDays(28),
                'total_entries' => 218,
                'status' => 'active',
                'rules' => 'No purchase necessary. Open to legal residents of US and Canada aged 18+.',
            ]
        );

        // 1. Seed Business Growth Poll 1
        $poll1 = Poll::firstOrCreate(
            ['slug' => 'primary-customer-acquisition-channel-2026'],
            [
                'title' => 'What is your primary customer acquisition channel in 2026?',
                'description' => 'Help us benchmark North American business growth strategies across digital channels.',
                'category' => 'Marketing',
                'status' => 'active',
                'total_votes' => 184,
            ]
        );
        PollOption::firstOrCreate(['poll_id' => $poll1->id, 'option_text' => 'AI Search (AEO) & Organic SEO Content'], ['votes_count' => 82, 'sort_order' => 1]);
        PollOption::firstOrCreate(['poll_id' => $poll1->id, 'option_text' => 'Interactive Calculators & Decision Tools'], ['votes_count' => 54, 'sort_order' => 2]);
        PollOption::firstOrCreate(['poll_id' => $poll1->id, 'option_text' => 'Paid Social & Targeted Search Ads'], ['votes_count' => 32, 'sort_order' => 3]);
        PollOption::firstOrCreate(['poll_id' => $poll1->id, 'option_text' => 'Community Discussions & Customer Reviews'], ['votes_count' => 16, 'sort_order' => 4]);

        // Poll 2
        $poll2 = Poll::firstOrCreate(
            ['slug' => 'aeo-budget-allocation-2026'],
            [
                'title' => 'What percentage of your marketing budget is allocated to AI Search (AEO)?',
                'description' => 'Evaluate how founders are shifting budget from traditional SEO to AI Answer Engines.',
                'category' => 'Technology',
                'status' => 'active',
                'total_votes' => 129,
            ]
        );
        PollOption::firstOrCreate(['poll_id' => $poll2->id, 'option_text' => 'Over 40% (Aggressive AI Search Focus)'], ['votes_count' => 48, 'sort_order' => 1]);
        PollOption::firstOrCreate(['poll_id' => $poll2->id, 'option_text' => '20% – 40% (Moderate Allocation)'], ['votes_count' => 51, 'sort_order' => 2]);
        PollOption::firstOrCreate(['poll_id' => $poll2->id, 'option_text' => 'Under 20% (Experimental Phase)'], ['votes_count' => 30, 'sort_order' => 3]);

        // Poll 3
        $poll3 = Poll::firstOrCreate(
            ['slug' => 'target-cpl-b2b-acquisition'],
            [
                'title' => 'What is your target Cost Per Lead (CPL) for B2B acquisitions?',
                'description' => 'Compare your lead acquisition benchmarks with North American enterprise leaders.',
                'category' => 'Finance',
                'status' => 'active',
                'total_votes' => 210,
            ]
        );
        PollOption::firstOrCreate(['poll_id' => $poll3->id, 'option_text' => 'Under $30 per qualified lead'], ['votes_count' => 74, 'sort_order' => 1]);
        PollOption::firstOrCreate(['poll_id' => $poll3->id, 'option_text' => '$30 – $75 per qualified lead'], ['votes_count' => 88, 'sort_order' => 2]);
        PollOption::firstOrCreate(['poll_id' => $poll3->id, 'option_text' => 'Over $75 per qualified lead'], ['votes_count' => 48, 'sort_order' => 3]);

        // 2. Seed Business Archetype Quiz 1
        $quiz1 = Quiz::firstOrCreate(
            ['slug' => 'what-type-of-business-founder-are-you'],
            [
                'title' => 'What Type of Business Founder Are You?',
                'description' => 'Discover your core entrepreneurial archetype and get personalized growth tool recommendations.',
                'type' => 'personality',
                'status' => 'active',
                'completion_count' => 412,
            ]
        );

        $q1 = QuizQuestion::firstOrCreate(
            ['quiz_id' => $quiz1->id, 'sort_order' => 1],
            [
                'question_text' => 'When launching a new customer acquisition strategy, what is your first step?',
                'subtitle' => 'Select the approach that best reflects your leadership style.',
            ]
        );
        QuizOption::firstOrCreate(['quiz_question_id' => $q1->id, 'option_text' => 'Analyze market trends and draft a long-term strategic vision.'], ['trait_score' => 'visionary', 'sort_order' => 1]);
        QuizOption::firstOrCreate(['quiz_question_id' => $q1->id, 'option_text' => 'Build an interactive calculator or decision tool to engage leads directly.'], ['trait_score' => 'innovator', 'sort_order' => 2]);
        QuizOption::firstOrCreate(['quiz_question_id' => $q1->id, 'option_text' => 'Establish strict budget metrics and calculate projected ROI.'], ['trait_score' => 'operator', 'sort_order' => 3]);

        $q2 = QuizQuestion::firstOrCreate(
            ['quiz_id' => $quiz1->id, 'sort_order' => 2],
            [
                'question_text' => 'What metric do you value most in your growth dashboard?',
                'subtitle' => 'Choose your top priority key performance indicator.',
            ]
        );
        QuizOption::firstOrCreate(['quiz_question_id' => $q2->id, 'option_text' => 'Brand authority and AEO AI search engine dominance.'], ['trait_score' => 'visionary', 'sort_order' => 1]);
        QuizOption::firstOrCreate(['quiz_question_id' => $q2->id, 'option_text' => 'User engagement time and interactive tool conversion rates.'], ['trait_score' => 'innovator', 'sort_order' => 2]);
        QuizOption::firstOrCreate(['quiz_question_id' => $q2->id, 'option_text' => 'Customer acquisition cost (CAC) and lifetime value (LTV).'], ['trait_score' => 'operator', 'sort_order' => 3]);

        QuizResult::firstOrCreate(
            ['quiz_id' => $quiz1->id, 'trait_code' => 'visionary'],
            [
                'result_title' => 'The Visionary Strategist',
                'result_description' => 'You lead with high-level vision and market differentiation. You excel at positioning your business for long-term growth and AEO authority.',
                'recommended_next_step' => 'Explore the Ideas Knowledge Hub for AEO & AI search strategy guides.',
            ]
        );

        QuizResult::firstOrCreate(
            ['quiz_id' => $quiz1->id, 'trait_code' => 'innovator'],
            [
                'result_title' => 'The Interactive Product Innovator',
                'result_description' => 'You leverage interactive experiences and engaging tools to convert visitors into active leads faster than traditional forms.',
                'recommended_next_step' => 'Check out the Value Module to launch custom ROI calculators.',
            ]
        );

        QuizResult::firstOrCreate(
            ['quiz_id' => $quiz1->id, 'trait_code' => 'operator'],
            [
                'result_title' => 'The Metrics-Driven Operator',
                'result_description' => 'You prioritize unit economics, CAC/LTV ratios, and disciplined execution to scale your platform sustainably.',
                'recommended_next_step' => 'Use the Value Module Financial Workshop to calculate startup and expansion costs.',
            ]
        );
    }
}
