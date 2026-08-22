<?php

namespace Database\Seeders;

use App\Modules\Social\Models\Answer;
use App\Modules\Social\Models\Question;
use App\Modules\Social\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SocialSeeder extends Seeder
{
    public function run(): void
    {
        // Question 1
        $q1 = Question::create([
            'author_name' => 'Michael Chang',
            'author_role' => 'Founder & CEO, Apex Digital',
            'title' => 'What is the optimal AEO (AI Engine Optimization) strategy for North American B2B startups?',
            'slug' => 'optimal-aeo-strategy-north-american-b2b-startups',
            'body' => 'We are transitioning our customer acquisition strategy to focus on search discovery inside LLM engines (Perplexity, ChatGPT, Gemini). Should we prioritize Schema.org JSON-LD markup or structured markdown playbooks first?',
            'category' => 'Marketing & Acquisition',
            'upvotes_count' => 34,
            'answers_count' => 2,
            'is_solved' => true,
            'status' => 'published',
        ]);

        Answer::create([
            'question_id' => $q1->id,
            'author_name' => 'David Miller',
            'author_role' => 'Chief AI Search Strategist',
            'body' => 'Both are necessary, but Schema.org JSON-LD is your foundation. Machine-readable entity tags give answer engines the definitive context for your business services.',
            'upvotes_count' => 19,
            'is_accepted' => true,
        ]);

        Answer::create([
            'question_id' => $q1->id,
            'author_name' => 'Sarah Jenkins',
            'author_role' => 'VP of Growth & Strategy',
            'body' => 'Combine JSON-LD schema with interactive decision calculators (Value Module). When users interact with tools, your engagement metrics signal authority to search systems.',
            'upvotes_count' => 12,
            'is_accepted' => false,
        ]);

        // Question 2
        $q2 = Question::create([
            'author_name' => 'Elena Rostova',
            'author_role' => 'Operations Lead, Vanguard Tech',
            'title' => 'How do you calculate realistic customer acquisition cost (CAC) benchmarks in 2026?',
            'slug' => 'calculate-realistic-cac-benchmarks-2026',
            'body' => 'Ad costs across Google and LinkedIn have shifted. How are small-to-medium businesses estimating lead cost targets when launching new channels?',
            'category' => 'Finance & ROI',
            'upvotes_count' => 21,
            'answers_count' => 1,
            'is_solved' => false,
            'status' => 'published',
        ]);

        Answer::create([
            'question_id' => $q2->id,
            'author_name' => 'Marcus Vance',
            'author_role' => 'Financial Analyst',
            'body' => 'Use the Bizztopia Marketing ROI Estimator tool to model your CPL against target conversion rates before committing ad spend.',
            'upvotes_count' => 8,
            'is_accepted' => false,
        ]);

        // Verified Reviews
        Review::create([
            'reviewer_name' => 'Robert Sterling',
            'business_name' => 'Regentology Real Estate Advisory',
            'service_category' => 'Real Estate Services',
            'rating' => 5,
            'title' => 'Exceptional lead acquisition framework & transparent tools.',
            'review_body' => 'Bizztopia’s CAP architecture transformed how we attract home buyers and investors. The interactive decision tools convert passive traffic into high-intent clients.',
            'is_verified' => true,
            'status' => 'approved',
        ]);

        Review::create([
            'reviewer_name' => 'Dr. Amanda Chen',
            'business_name' => 'Rate My Doc Health Network',
            'service_category' => 'Healthcare & Medical',
            'rating' => 5,
            'title' => 'Unbeatable trust signals and community reputation features.',
            'review_body' => 'The Social pillar’s verified review and Q&A engine allowed our clinic network to establish authority and trust across North America.',
            'is_verified' => true,
            'status' => 'approved',
        ]);
    }
}
