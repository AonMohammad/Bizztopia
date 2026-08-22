<?php

namespace Database\Seeders;

use App\Modules\Attract\Models\Article;
use App\Modules\Attract\Models\Author;
use App\Modules\Attract\Models\Category;
use App\Modules\Attract\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class IdeasSeeder extends Seeder
{
    public function run(): void
    {
        $authorNA = Author::firstOrCreate(
            ['slug' => 'sarah-jenkins'],
            [
                'name' => 'Sarah Jenkins',
                'email' => 'sarah.j@bizztopia.com',
                'bio' => 'Senior Growth Strategist focusing on North American enterprise customer acquisition & digital scaling.',
                'role_title' => 'VP of Growth & Strategy',
                'region' => 'North America',
            ]
        );

        $authorTech = Author::firstOrCreate(
            ['slug' => 'david-miller'],
            [
                'name' => 'David Miller',
                'email' => 'david.m@bizztopia.com',
                'bio' => 'AI & Search Optimization Specialist analyzing North American AEO (AI Engine Optimization) trends.',
                'role_title' => 'Chief AI Search Strategist',
                'region' => 'North America',
            ]
        );

        $authorLegal = Author::firstOrCreate(
            ['slug' => 'jessica-chen'],
            [
                'name' => 'Jessica Chen',
                'email' => 'jessica.c@bizztopia.com',
                'bio' => 'Corporate attorney specializing in US and Canadian business formation, compliance and regulatory frameworks.',
                'role_title' => 'Legal & Compliance Editor',
                'region' => 'North America',
            ]
        );

        $catMarketing = Category::firstOrCreate(
            ['slug' => 'marketing-acquisition'],
            ['name' => 'Marketing & Acquisition', 'description' => 'Strategies for capturing high-intent leads across North America.', 'color' => '#6366f1']
        );
        $catLegal = Category::firstOrCreate(
            ['slug' => 'legal-compliance'],
            ['name' => 'Legal & Compliance', 'description' => 'US & Canadian business formation, compliance, and regulatory frameworks.', 'color' => '#10b981']
        );
        $catFinance = Category::firstOrCreate(
            ['slug' => 'finance-calculators'],
            ['name' => 'Finance & Valuation', 'description' => 'Calculators, unit economics, and capital allocation frameworks.', 'color' => '#f59e0b']
        );
        $catTech = Category::firstOrCreate(
            ['slug' => 'technology-aeo'],
            ['name' => 'Technology & AEO', 'description' => 'AI search engines, Perplexity/ChatGPT optimization, and web technology.', 'color' => '#06b6d4']
        );

        $categories = [$catMarketing, $catLegal, $catFinance, $catTech];
        $authors = [$authorNA, $authorTech, $authorLegal];
        $sources = ['Entrepreneur Magazine', 'US Small Business Administration (SBA)', 'SmallBizTrends', 'Forbes Business', 'TechCrunch Enterprise', 'Wall Street Journal Pulse'];

        // Tag taxonomy
        $tagData = [
            ['name' => 'AEO', 'slug' => 'aeo', 'color' => '#06b6d4'],
            ['name' => 'Marketing ROI', 'slug' => 'marketing-roi', 'color' => '#6366f1'],
            ['name' => 'CAC Reduction', 'slug' => 'cac-reduction', 'color' => '#f59e0b'],
            ['name' => 'B2B Lead Gen', 'slug' => 'b2b-lead-gen', 'color' => '#287FBA'],
            ['name' => 'AI Search', 'slug' => 'ai-search', 'color' => '#8b5cf6'],
            ['name' => 'Legal Formation', 'slug' => 'legal-formation', 'color' => '#10b981'],
            ['name' => 'Startup Finance', 'slug' => 'startup-finance', 'color' => '#ef4444'],
            ['name' => 'Growth Hacking', 'slug' => 'growth-hacking', 'color' => '#f97316'],
            ['name' => 'Customer Retention', 'slug' => 'customer-retention', 'color' => '#14b8a6'],
            ['name' => 'Brand Authority', 'slug' => 'brand-authority', 'color' => '#ec4899'],
            ['name' => 'SaaS Scaling', 'slug' => 'saas-scaling', 'color' => '#64748b'],
            ['name' => 'Data Analytics', 'slug' => 'data-analytics', 'color' => '#0ea5e9'],
            ['name' => 'Content Strategy', 'slug' => 'content-strategy', 'color' => '#84cc16'],
            ['name' => 'US Regulation', 'slug' => 'us-regulation', 'color' => '#d97706'],
            ['name' => 'Digital Transformation', 'slug' => 'digital-transformation', 'color' => '#7c3aed'],
        ];

        $tags = [];
        foreach ($tagData as $td) {
            $tags[] = Tag::firstOrCreate(['slug' => $td['slug']], $td);
        }

        // Hero images by content type (Unsplash curated set)
        $heroImages = [
            'News' => [
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
                'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
                'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
            ],
            'Blog' => [
                'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
                'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
            ],
            'Industry Guide' => [
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
                'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
            ],
            'Tips & Tricks' => [
                'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
                'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80',
                'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
            ],
            'How-To' => [
                'https://images.unsplash.com/photo-1434030216411-0b793f4b6174?w=800&q=80',
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
                'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
            ],
            'Checklist' => [
                'https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=800&q=80',
                'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
                'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
            ],
            'Guide' => [
                'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
                'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
                'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
            ],
            'FAQ' => [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
            ],
            'Best Practice' => [
                'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
                'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
            ],
            'Industry Trend' => [
                'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
                'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&q=80',
            ],
            'Beginner Guide' => [
                'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
                'https://images.unsplash.com/photo-1488998628026-927fde48e543?w=800&q=80',
            ],
            'Educational Resource' => [
                'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
            ],
            'Expert Insight' => [
                'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80',
            ],
        ];

        // ALL 13 content types from spec §6.2
        $subCategories = [
            // Original 7 (30 each)
            'News' => 30,
            'Blog' => 30,
            'Industry Guide' => 30,
            'Tips & Tricks' => 30,
            'How-To' => 30,
            'Checklist' => 30,
            'Guide' => 30,
            // 6 new types from spec (15 each = 90 additional)
            'FAQ' => 15,
            'Best Practice' => 15,
            'Industry Trend' => 15,
            'Beginner Guide' => 15,
            'Educational Resource' => 15,
            'Expert Insight' => 15,
        ];

        $baseTopics = [
            'News' => [
                'Fed Signals Interest Rate Adjustments Affecting Business Expansion Loans',
                'North American Tech Funding Rebounds with Surge in B2B SaaS Investments',
                'SBA Unveils New Capital Access Initiatives for Small Business Owners',
                'AI Search Engines Overtake Traditional SEO Traffic for Enterprise Brands',
                'US FTC Updates Digital Advertising & Customer Review Transparency Guidelines',
                'E-Commerce Sales Surge as Omnichannel Retail Infrastructure Evolves',
                'Commercial Real Estate Demand Shifts Toward Hybrid Workspace Models',
                'State Tax Authorities Announce Simplified Formation Registrations for 2026',
                'Cybersecurity Compliance Standard Mandates Stricter Protection for Client Data',
                'Cross-Border Trade Volume Increases Between US and Canadian Enterprise Markets',
                'Venture Debt Financing Gains Popularity Among High-Growth Tech Startups',
                'Supply Chain Optimization Platforms Reduce Lead Times Across Retail',
                'Corporate Sustainability Mandates Drive Investments in Clean Infrastructure',
                'B2B Lead Acquisition Costs Stabilize as Interactive Calculator Marketing Expands',
                'Federal Reserve Holds Rates Steady Amid Strong Labor Market Data',
            ],
            'Blog' => [
                'How AEO Strategy is Replacing Traditional SEO in North America',
                'Top 10 Business Formation Strategies for US Entrepreneurs in 2026',
                'Why Interactive ROI Calculators Convert Leads 3x Faster Than Static Forms',
                'Building High-Trust Reputation Engines Through Verified Client Reviews',
                'The Shift from CAC Volatility to LTV Maximization in B2B SaaS',
                'Mastering Omni-Channel Lead Capture Across North American Markets',
                'Why Visual Showrooms and Design Galleries Boost Retail Engagement',
                'The Impact of Generative AI on Daily Business Operations',
                'How to Build a Scalable Customer Acquisition Infrastructure',
                'Navigating US State Business Registration and Tax Compliance',
                'The Future of Verified Q&A Forums in Building Brand Authority',
                'Maximizing Conversion Rates with Targeted Interactive Polls',
                'How Modular Software Architecture Accelerates Product Launches',
                'The Entrepreneur Guide to Sustainable Capital Allocation',
                'Why Founder Archetypes Determine Your CAC and LTV Strategy',
            ],
            'Industry Guide' => [
                'Complete Guide to North American Small Business Ingestion Feeds',
                '2026 Benchmark Report on Enterprise Customer Acquisition Costs',
                'State-by-State Legal Framework for US LLC and Corporation Setup',
                'Comprehensive Guide to Building Value-First Financial Workshops',
                'The 2026 Blueprint for AI Answer Engine Optimization (AEO)',
                'Industry Benchmark Report: Marketing Conversion Rates by Vertical',
                'Enterprise Guide to Scaling Remote Teams Across US and Canada',
                'The Complete Legal and Tax Guide for Digital Business Owners',
                'Customer Retention & Lifetime Value Optimization Benchmark',
                'The Definitive Playbook for Multi-Location Retail Business Growth',
                'Comprehensive Audit of North American Lead Generation Platforms',
                'The Executive Guide to Cloud Infrastructure and SAIF Compliance',
                'Industry Analysis: Interactive Content vs Static Landing Pages',
                'North American B2B SaaS Pricing Strategy Benchmark Report',
                'The Complete Guide to AEO Schema Markup and Structured Data',
            ],
            'Tips & Tricks' => [
                '5 Fast Hacks to Optimize Your Website Content for Perplexity & ChatGPT',
                '7 Proven Formulas to Lower Your B2B Customer Acquisition Cost (CAC)',
                '3 Steps to Automate Ingesting High-Intent RSS Business Intelligence',
                'How to Turn Customer Reviews into High-Converting Social Proof',
                '4 Quick Calculations Every Business Founder Must Run Weekly',
                'How to Optimize Product Showroom Galleries for 60fps Mobile Performance',
                '5 Tactics to Increase Quiz Completion Rates by Over 40%',
                'How to Leverage Schema.org Structured Data for Instant Search Indexing',
                '3 Secrets to Designing High-Converting Interactive Calculator Widgets',
                'How to Structure Q&A Forum Threads for Maximum Community Growth',
                '5 Rules for Structuring High-Yield B2B Email Acquisition Campaigns',
                'How to Build a Seamless Infinite Looping Card Carousel with 0 Lag',
                '4 Legal Traps to Avoid When Registering a Business in US & Canada',
                '6 Data Points That Predict Whether a Lead Will Convert to Sale',
                '3 Underused Tactics for Boosting Brand Authority on AI Search Engines',
            ],
            'How-To' => [
                'How to Build an Interactive ROI Estimator Widget in React & Inertia',
                'How to Set Up Automated RSS Feed Classification for Business Feeds',
                'How to Calculate Real Customer Acquisition Cost (CAC) Step-by-Step',
                'How to Implement Schema.org AEO Tags for Perplexity AI Search',
                'How to Create a Founder Archetype Diagnostic Assessment Quiz',
                'How to Optimize Next.js & Laravel for Zero-Lag GPU Marquee Rendering',
                'How to Set Up Verified Review Moderation for Brand Protection',
                'How to Replicate a Master CAP Architecture Across Industry Verticals',
                'How to Structure a 2-Column Jumbo Mega Dropdown Navigation Menu',
                'How to Ingest, Seed, and Looping 200 RSS Feeds in SQLite & PostgreSQL',
                'How to Build an Anti-Fraud IP Duplicate Vote Prevention Engine',
                'How to Design High-Resolution Showroom Galleries for Retail Spaces',
                'How to Export Strategy Playbooks directly into Clean Print PDFs',
                'How to Automate Business Email Follow-Up Sequences Using Laravel',
                'How to Build a Multi-Tenant Subscription Billing System from Scratch',
            ],
            'Checklist' => [
                'US & Canada Business Startup & Legal Formation Checklist',
                'Master Customer Acquisition Platform Infrastructure Checklist',
                'AEO & AI Search Metadata Compliance Checklist',
                'Pre-Launch Security & SAIF Cloud Protection Checklist',
                'Annual Business Tax & Compliance Renewal Checklist',
                'Website Accessibility & Dynamic Design Verification Checklist',
                'B2B Lead Qualification & Scoring Audit Checklist',
                'SaaS Pricing Model & Tiered Value Checklist',
                'Local SEO & Business Directory Consistency Checklist',
                'Brand Visual Identity & Showroom Assets Checklist',
                'Customer Onboarding & NPS Survey Implementation Checklist',
                'Data Privacy, GDPR & CCPA Compliance Readiness Checklist',
                'Disaster Recovery & Redundant Backup Architecture Checklist',
                'Product Launch Marketing & PR Readiness Checklist',
                'Monthly Financial Health & Cash Flow Review Checklist',
            ],
            'Guide' => [
                'Master Playbook: Building Value-First Acquisition Funnels',
                'The Definitive Guide to Modular CAP Ecosystem Architecture',
                'Complete Guide to Scaling High-Intent Lead Acquisition',
                'The Founder Manual to Capital Allocation & ROI Calculations',
                'Comprehensive Guide to Community Trust & Verified Reviews',
                'Visual Discovery Playbook: Driving Engagement via Galleries',
                'The Executive Blueprint for Replicating Verticals Quickly',
                'Complete Guide to AI Engine Indexing & Knowledge Graphs',
                'Strategic Guide to Decoupling Frontend UI from Core API',
                'The Master Playbook for North American Market Expansion',
                'Comprehensive Guide to Interactive Quiz Lead Diagnostic Wizards',
                'The Enterprise Guide to Multi-Tenant Database Partitioning',
                'Strategic Playbook for High-Ticket B2B Lead Conversion',
                'The Complete Architecture Guide for Next.js and Laravel',
                'The Ultimate Guide to Building Revenue-First Product Roadmaps',
            ],
            'FAQ' => [
                'What is AEO and How Does It Differ from Traditional SEO?',
                'How Do I Register an LLC in the United States?',
                'What Is Customer Acquisition Cost and Why Does It Matter?',
                'How Long Does It Take to Build a Profitable B2B SaaS Product?',
                'What Are the Key Differences Between S-Corp and C-Corp?',
                'How Do I Calculate My Business\'s Break-Even Point?',
                'What Is the Best Marketing Channel for a New Small Business?',
                'How Do I Get My Business Listed on AI Answer Engines?',
                'What Documents Are Required to Start a Business in Canada?',
                'How Do I Protect My Business Idea Legally Before Launch?',
                'What Is a Good Customer Lifetime Value (LTV) for B2B SaaS?',
                'How Do I Write a Compelling Business Value Proposition?',
                'What Is Schema.org Markup and Why Should I Use It?',
            ],
            'Best Practice' => [
                'Best Practices for Building a High-Performing Lead Capture Form',
                'Best Practices for North American Business Review Management',
                'Best Practices for Structuring AI-Optimized Content Pages',
                'Best Practices for B2B Email Sequence Automation & Timing',
                'Best Practices for SaaS Onboarding & Trial-to-Paid Conversion',
                'Best Practices for Protecting Client Data Under CCPA & GDPR',
                'Best Practices for Building Transparent Business Pricing Pages',
                'Best Practices for Running Ethical Customer Sweepstakes Campaigns',
                'Best Practices for Managing Multi-Location Business Profiles',
                'Best Practices for Interactive Content in High-Intent Buyer Journeys',
                'Best Practices for Building Internal Knowledge Management Systems',
                'Best Practices for Structuring Performance Marketing Analytics',
            ],
            'Industry Trend' => [
                'AI Answer Engines Are Reshaping How Buyers Discover Businesses',
                'The Rise of Micro-SaaS: Small Profitable Software Businesses in 2026',
                'Interactive Content is Becoming the Standard for B2B Lead Generation',
                'Remote-First Hiring is Lowering Talent Costs Across North America',
                'Video Testimonials Are Replacing Written Reviews for Trust Building',
                'Programmatic SEO is Now Powering High-Volume Content Acquisition',
                'No-Code Platforms Are Enabling Non-Technical Founders to Launch Faster',
                'Privacy-First Analytics Is Replacing Google Analytics Across Enterprises',
                'Community-Led Growth is Outperforming Paid Acquisition in B2B SaaS',
                'Voice Search Optimization Is Now Critical for Local Business Visibility',
                'API-First Business Models Are Unlocking New Enterprise Revenue Streams',
                'Founder-Led Sales Are Outperforming Traditional Sales Teams in Early Stage',
            ],
            'Beginner Guide' => [
                'The Complete Beginner\'s Guide to Starting a Business in the United States',
                'What is Customer Acquisition Cost? A Beginner\'s Explanation',
                'Beginner\'s Guide to Building Your First Business Website',
                'What is AEO (AI Engine Optimization)? A Plain-English Explanation',
                'A Beginner\'s Guide to Business Banking and Financial Accounts',
                'The Beginner\'s Guide to Writing a Simple Business Plan',
                'How to Set Up Google Business Profile as a Beginner',
                'Beginner\'s Guide to Understanding Business Taxes in North America',
                'Your First 90 Days as a Business Owner: A Beginner\'s Roadmap',
                'Beginner\'s Guide to Building an Email List from Zero',
                'What Is a CRM and Do I Need One? A Beginner\'s Introduction',
                'The Beginner\'s Guide to Creating Your First Lead Magnet',
            ],
            'Educational Resource' => [
                'Understanding Business Entity Types: LLC vs S-Corp vs C-Corp',
                'The Complete Glossary of Customer Acquisition Marketing Terms',
                'How the North American Business Credit System Works',
                'Understanding SaaS Unit Economics: ARR, MRR, Churn, and LTV',
                'The Foundations of Value-Based Pricing for Service Businesses',
                'Understanding AEO: How AI Engines Index and Surface Content',
                'The Anatomy of a High-Converting B2B Landing Page',
                'Understanding Structured Data and Schema.org for Business Content',
                'How Business Credit Scores Work in the United States',
                'The Foundations of Permission-Based Email Marketing Compliance',
                'Understanding the Difference Between Brand and Performance Marketing',
                'The Role of Social Proof in the B2B Buying Decision Journey',
            ],
            'Expert Insight' => [
                'Why Most Business Owners Underestimate Their True CAC by 60%',
                'The One Metric That Predicts B2B SaaS Success Better Than MRR',
                'Why AEO Will Replace SEO as the Primary Traffic Source by 2027',
                'The Hidden Reason Most Lead Funnels Fail to Convert at Scale',
                'Why Your Business Needs a Knowledge Hub Before a Sales Team',
                'The Expert View on Why Community-Led Growth Outperforms Ads',
                'Why Most Business Owners Choose the Wrong Legal Entity at Formation',
                'The Case for Building Interactive Tools Before Marketing Campaigns',
                'Why Most Review Systems Fail to Build Real Brand Trust',
                'The Expert Playbook for Generating Authority on AI Search Engines',
                'Why North American Founders Are Moving from B2C to B2B Revenue Models',
                'The Expert View: Why Brand Authority Compounds Like Interest Over Time',
            ],
        ];

        // Tag assignment by content type
        $tagsByType = [
            'News'                 => [0, 4, 11],   // AEO, AI Search, Data Analytics
            'Blog'                 => [7, 1, 9],    // Growth Hacking, Marketing ROI, Brand Authority
            'Industry Guide'       => [11, 3, 6],   // Data Analytics, B2B Lead Gen, Startup Finance
            'Tips & Tricks'        => [2, 7, 12],   // CAC Reduction, Growth Hacking, Content Strategy
            'How-To'               => [0, 4, 14],   // AEO, AI Search, Digital Transformation
            'Checklist'            => [5, 13, 6],   // Legal Formation, US Regulation, Startup Finance
            'Guide'                => [1, 3, 10],   // Marketing ROI, B2B Lead Gen, SaaS Scaling
            'FAQ'                  => [5, 2, 1],    // Legal Formation, CAC Reduction, Marketing ROI
            'Best Practice'        => [8, 12, 1],   // Customer Retention, Content Strategy, Marketing ROI
            'Industry Trend'       => [4, 14, 10],  // AI Search, Digital Transformation, SaaS Scaling
            'Beginner Guide'       => [5, 6, 12],   // Legal Formation, Startup Finance, Content Strategy
            'Educational Resource' => [0, 13, 11],  // AEO, US Regulation, Data Analytics
            'Expert Insight'       => [9, 7, 10],   // Brand Authority, Growth Hacking, SaaS Scaling
        ];

        foreach ($subCategories as $type => $targetCount) {
            $topicList = $baseTopics[$type];
            $topicCount = count($topicList);
            $heroList = $heroImages[$type] ?? $heroImages['Blog'];
            $heroCount = count($heroList);

            for ($i = 0; $i < $targetCount; $i++) {
                $baseTopic = $topicList[$i % $topicCount];
                $iteration = (int) floor($i / $topicCount) + 1;
                $title = $iteration > 1 ? "{$baseTopic} (Part {$iteration})" : $baseTopic;
                $slug = Str::slug("{$type}-{$i}-{$title}");
                $category = $categories[$i % count($categories)];
                $author = $authors[$i % count($authors)];
                $source = $sources[$i % count($sources)];
                $heroImage = $heroList[$i % $heroCount];

                $views = rand(250, 4800);
                $isTrending = ($views > 3200) || ($i % 4 === 0);
                $isBreaking = ($type === 'News' && $i < 10) || ($i % 7 === 0);

                $article = Article::firstOrCreate(
                    ['slug' => $slug],
                    [
                        'title' => $title,
                        'subtitle' => "Actionable {$type} intelligence for North American founders and business leaders — item #".($i + 1),
                        'content' => "<h2>1. Executive Summary</h2><p>Comprehensive analysis for <strong>{$title}</strong>. This {$type} provides actionable frameworks for business leaders navigating North American markets.</p><h2>2. Strategic Implementation</h2><p>Actionable framework covering market benchmarks and acquisition tactics. Apply these principles to reduce CAC and maximize LTV across your customer acquisition funnel.</p><h2>3. Key Takeaways</h2><p>The core principles outlined here apply across industries and can be replicated for future CAP verticals including Regentology, WeddingHub, and MuzzBizz.</p>",
                        'hero_image' => $heroImage,
                        'content_type' => $type,
                        'region' => 'North America',
                        'source_rss_name' => $source,
                        'reading_time' => rand(3, 12).' min read',
                        'status' => 'published',
                        'is_trending' => $isTrending,
                        'is_breaking' => $isBreaking,
                        'view_count' => $views,
                        'category_id' => $category->id,
                        'author_id' => $author->id,
                        'published_at' => now()->subHours(rand(1, 300)),
                    ]
                );

                // Attach 2-3 relevant tags
                $typeTagIndices = $tagsByType[$type] ?? [0, 1, 2];
                $articleTags = array_map(fn($idx) => $tags[$idx]->id, $typeTagIndices);
                $article->tags()->syncWithoutDetaching($articleTags);
            }
        }
    }
}
