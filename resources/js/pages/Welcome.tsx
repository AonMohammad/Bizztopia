import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '@/layouts/AppLayout';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { PollCard } from '@/components/ui/PollCard';
import { RoiCalculatorWidget, RoiData } from '@/components/ui/RoiCalculatorWidget';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
    BookOpen, 
    Sparkles, 
    Calculator, 
    MessageSquare, 
    ArrowRight,
    Search,
    MapPin,
    Briefcase,
    Building2,
    Laptop,
    Scale,
    TrendingUp,
    Star,
    CheckCircle2,
    Users,
    Activity,
    ChevronRight,
    Smartphone,
    Globe,
    ShieldCheck,
    Award,
    QrCode,
    ExternalLink,
    Filter,
    Flame,
    Zap,
    Rss,
    Layers,
    Compass,
    ThumbsUp,
    Heart,
    Share2,
    Lightbulb,
    Smile,
    Camera,
    ChevronDown,
    ChevronUp,
    Menu,
    Home,
    Utensils,
    ShoppingBag,
    Beer,
    Wrench,
    MoreHorizontal,
    Car,
    Stethoscope
} from 'lucide-react';

interface WelcomeProps {
    featuredArticle?: any;
    activePoll?: any;
    activeQuiz?: any;
    latestQuestion?: any;
    latestReview?: any;
    featuredGallery?: any;
    initialRoi: RoiData;
    breakingArticles?: any[];
    trendingArticles?: any[];
}

const CountUpStat = ({ target, duration = 1500, suffix = "" }: { target: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const step = (timestamp: number) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    setCount(progress * target);
                    if (progress < 1) {
                        animationFrame = requestAnimationFrame(step);
                    }
                };
                animationFrame = requestAnimationFrame(step);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [target, duration]);

    const formatted = target % 1 === 0 
        ? Math.floor(count).toLocaleString() 
        : count.toFixed(1);

    return <span ref={elementRef}>{formatted}{suffix}</span>;
};

export default function Welcome({
    featuredArticle,
    activePoll,
    latestQuestion,
    reviews = [],
    featuredGallery,
    initialRoi,
    breakingArticles = [],
    trendingArticles = [],
    topCategories = []
}: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('Los Angeles, CA');
    const [activeCity, setActiveCity] = useState('Los Angeles');
    const [visibleReviews, setVisibleReviews] = useState(9);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [userReactions, setUserReactions] = useState<Record<number, { useful: boolean; funny: boolean; cool: boolean }>>({});

    const toggleReaction = (reviewId: number, type: 'useful' | 'funny' | 'cool') => {
        setUserReactions(prev => {
            const current = prev[reviewId] || { useful: false, funny: false, cool: false };
            return {
                ...prev,
                [reviewId]: {
                    ...current,
                    [type]: !current[type]
                }
            };
        });
    };

    const citySearchData: Record<string, {
        top: string[];
        trending: string[];
        seasonal: string[];
        recent: string[];
    }> = {
        'Los Angeles': {
            top: ['Marketing & Growth Agencies', 'SaaS & B2B Software', 'Management Consultants', 'Business Legal Advisors', 'IT & Software Development', 'Creative & Design Studios', 'SEO & Content Agencies', 'HR & Recruitment Firms'],
            trending: ['AEO Optimization LA', 'AI Software Integration', 'LLC Formation Lawyers', 'B2B Sales Funnel Experts', 'Venture Consulting Group', 'Video Production Studio', 'Cold Email Automation', 'Corporate Tax Advising'],
            seasonal: ['Q3 Expansion Planning', 'Year-End Tax Prep', 'Holiday Marketing Prep', 'SaaS Renewal Auditing'],
            recent: ['Apex Growth Labs', 'Vanguard Legal & Co', 'Summit Financial Group', 'CloudScale Systems']
        },
        'New York': {
            top: ['Manhattan Marketing Group', 'Wall Street Financial Consultants', 'Corporate Legal NYC', 'Enterprise Software Dev', 'B2B PR Agencies', 'SEO Optimization Brooklyn', 'SaaS Growth Consultants', 'Executive Headhunters NYC'],
            trending: ['Generative AI Advisory NYC', 'Fractional CMO Services', 'SOC2 Compliance Vetting', 'Account-Based Marketing', 'Cross-Border M&A Counsel', 'Product Design Workshops', 'B2B Podcast Production', 'Sales Pipeline Audit'],
            seasonal: ['Q4 Budget Allocation', 'Summer Intern Placement', 'Annual Audit Readiness', 'Tech Infrastructure Review'],
            recent: ['Apex Commercial Services', 'Apex Growth Labs', 'Rate My Doc Health Network', 'Summit Financial Group']
        },
        'Houston': {
            top: ['Houston SEO Agencies', 'Oil & Gas Tech Consultants', 'Corporate Lawyers Houston', 'SaaS Platform Developers', 'Creative Design Teams', 'Growth Marketing Firms', 'Business Valuation Advisors', 'Operations Advisory'],
            trending: ['AI Integration Houston', 'Cloud Migration Teams', 'LLC Setup Lawyers', 'B2B Cold Outreach', 'Cyber Security Auditing', 'Fractional CFO Services', 'Sales CRM Setup', 'Web Application Dev'],
            seasonal: ['Tax Season Planning', 'Disaster Recovery Auditing', 'Q1 Budget Reviews', 'Annual Growth Strategy'],
            recent: ['CloudScale Systems', 'Summit Financial Group', 'Vanguard Legal & Co', 'Apex Commercial Services']
        },
        'San Jose': {
            top: ['Silicon Valley Dev Studios', 'San Jose SaaS Engineers', 'Tech Marketing Agencies', 'Patent & IP Lawyers', 'Growth Advisory Teams', 'AI Development Hubs', 'SEO & Link Building', 'UX/UI Design Studios'],
            trending: ['Generative AI Workshops', 'Cloud Infrastructure DevOps', 'SOC2 Audit Consultants', 'Series A Growth Prep', 'B2B Marketing Funnels', 'Product Management Firms', 'Remote Ops Advisory', 'Corporate Law Counsel'],
            seasonal: ['Q3 Product Planning', 'Developer Staffing Audits', 'Venture Pitch Prep', 'Year-End Security Audit'],
            recent: ['Apex Growth Labs', 'CloudScale Systems', 'Rate My Doc Health Network', 'Vanguard Legal & Co']
        },
        'San Francisco': {
            top: ['SF Growth Marketing', 'Venture Capital Advisory', 'SaaS Product Developers', 'IP & Patent Lawyers SF', 'B2B PR Agencies', 'Brand Identity Studios', 'Enterprise SEO Firms', 'Tech Recruitment Firms'],
            trending: ['AI Agent Development', 'Fractional CMO Advisory', 'SOC2 Compliance Teams', 'B2B Sales Automation', 'M&A Legal Advisors SF', 'UX Design Workshops', 'SaaS Sales Training', 'AWS Cloud Architecture'],
            seasonal: ['Annual Budget Planning', 'Summer Internship Audits', 'Year-End Tech Reviews', 'Q1 Strategy Kickoffs'],
            recent: ['Apex Growth Labs', 'Vanguard Legal & Co', 'CloudScale Systems', 'Summit Financial Group']
        },
        'Dallas': {
            top: ['Dallas Marketing Agencies', 'Logistics Tech Consultants', 'Corporate Counsel Dallas', 'SaaS Software Firms', 'Creative Branding Agencies', 'Growth Marketing Consultants', 'Fintech Advisors Dallas', 'Sales Outreach Specialists'],
            trending: ['AI Business Solutions', 'Cloud Migration Services Dallas', 'LLC Formation Experts', 'B2B Lead Generation', 'Cyber Security Vetting', 'Fractional CFO Consultants', 'CRM System Auditing', 'Custom Web Applications'],
            seasonal: ['State Tax Prep Dallas', 'Operations Audits', 'Q2 Planning Seminars', 'Annual Business Reviews'],
            recent: ['Summit Financial Group', 'CloudScale Systems', 'Vanguard Legal & Co', 'Apex Commercial Services']
        },
        'Denver': {
            top: ['Denver SEO & Marketing', 'SaaS Platform Architects', 'Business Attorneys Denver', 'Growth Strategy Groups', 'Creative Design Agencies', 'B2B Lead Acquisition', 'Financial Planners Denver', 'IT Managed Services'],
            trending: ['AI Consulting Denver', 'Cloud Security Vetting', 'LLC Setup Advisors', 'B2B LinkedIn Outreach', 'Cyber Security Consulting', 'Fractional CFO Advisors', 'Sales CRM Integration', 'React Native App Dev'],
            seasonal: ['Winter Operations Audits', 'Tax Season Prep Denver', 'Q3 Growth Reviews', 'Annual Budget Alignment'],
            recent: ['Apex Commercial Services', 'Apex Growth Labs', 'Rate My Doc Health Network', 'Summit Financial Group']
        },
        'Toronto': {
            top: ['Toronto Digital Marketing', 'Bay Street Financial Consulting', 'Corporate Law Toronto', 'SaaS Developers Canada', 'Creative Brand Studios', 'Growth Advisory Teams', 'SEO Agencies Toronto', 'Tech Recruiters GTA'],
            trending: ['AI Integration Services', 'Cloud DevOps Architecture', 'SOC2 Readiness Consulting', 'SaaS CAC Minimization', 'Cross-Border Tax Advisory', 'UI/UX Design Sprints', 'B2B Lead Funnels', 'Operations Auditing'],
            seasonal: ['Annual Budget Alignment', 'Canadian Tax Prep', 'Tech Stack Audits', 'Q1 Sales Strategy'],
            recent: ['Apex Growth Labs', 'Vanguard Legal & Co', 'CloudScale Systems', 'Summit Financial Group']
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/ideas', { search: searchQuery, location: locationQuery });
    };
    
    // Lead Capture Step State
    const [leadStep, setLeadStep] = useState(1);
    const [leadData, setLeadData] = useState({
        serviceNeeded: '',
        timeline: '',
        email: '',
        businessName: ''
    });
    const [leadSubmitted, setLeadSubmitted] = useState(false);

    // Scroll Reveal Intersection Observer Hook
    useEffect(() => {
        // Observer for section-level reveals
        const sectionObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
        );

        // Observer for individual stagger cards — each animates separately
        const cardObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        // Apply stagger delay based on sibling index
                        const siblings = Array.from(el.parentElement?.children ?? []);
                        const idx = siblings.indexOf(el);
                        el.style.transitionDelay = `${idx * 0.12}s`;
                        el.classList.add('is-visible');
                        obs.unobserve(el);
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.05 }
        );

        const observeAll = () => {
            document.querySelectorAll('.reveal-on-scroll').forEach((el) => sectionObserver.observe(el));
            document.querySelectorAll('.stagger-card').forEach((el) => cardObserver.observe(el));
        };

        observeAll();

        // MutationObserver to catch any dynamically rendered elements
        const mutationObs = new MutationObserver(() => observeAll());
        mutationObs.observe(document.body, { childList: true, subtree: true });

        return () => {
            sectionObserver.disconnect();
            cardObserver.disconnect();
            mutationObs.disconnect();
        };
    }, []);

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/leads/submit', {
            name: leadData.businessName || 'SMB Founder',
            email: leadData.email,
            service_needed: leadData.serviceNeeded,
            details: `Timeline: ${leadData.timeline}`,
            source_page: 'homepage'
        }, {
            onSuccess: () => setLeadSubmitted(true)
        });
    };

    // Categories — from DB (topCategories prop) with fallback
    const categories = topCategories.length > 0 ? topCategories : [
        { name: 'Marketing & Acquisition', slug: 'marketing-acquisition', color: '#6366f1', image_url: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop' },
        { name: 'Technology & AEO', slug: 'technology-aeo', color: '#06b6d4', image_url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop' },
        { name: 'Legal & Compliance', slug: 'legal-compliance', color: '#10b981', image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop' },
        { name: 'Finance & Valuation', slug: 'finance-calculators', color: '#287FBA', image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop' },
    ];

    // Featured Providers (Top-Rated)
    const topProviders = [
        {
            name: 'Apex Growth Labs',
            category: 'Marketing Agency',
            rating: 4.9,
            reviews: 128,
            location: 'San Francisco, CA',
            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=350&q=60',
            badge: 'Top Performer'
        },
        {
            name: 'CloudScale Systems',
            category: 'SaaS Platform',
            rating: 4.9,
            reviews: 94,
            location: 'Austin, TX',
            img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=350&q=60',
            badge: 'Verified Leader'
        },
        {
            name: 'Vanguard Legal & Co',
            category: 'Legal & Compliance',
            rating: 4.8,
            reviews: 62,
            location: 'New York, NY',
            img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=350&q=60',
            badge: 'Featured Vendor'
        },
        {
            name: 'Summit Financial Group',
            category: 'Financial Advisors',
            rating: 5.0,
            reviews: 45,
            location: 'Chicago, IL',
            img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=350&q=60',
            badge: 'Top Rated'
        }
    ];

    // Real Case Studies
    const caseStudies = [
        { title: 'How TechCorp Scaled ARR from $1M to $10M in 18 Months', category: 'Growth Strategy', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=350&q=60' },
        { title: 'Reducing Customer Acquisition Cost by 42% via Verified Partners', category: 'Marketing', img: 'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=350&q=60' },
        { title: 'Modernizing SMB Infrastructure with CloudScale Stack', category: 'SaaS Integration', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=350&q=60' },
        { title: 'Navigating Cross-Border Legal & Regulatory Frameworks', category: 'Compliance', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=350&q=60' }
    ];

    // Regions / Cities
    const regions = [
        { name: 'San Francisco', count: '450+ Partners', img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=220&q=60' },
        { name: 'New York', count: '620+ Partners', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=220&q=60' },
        { name: 'Austin', count: '310+ Partners', img: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=220&q=60' },
        { name: 'London', count: '280+ Partners', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=220&q=60' },
        { name: 'Chicago', count: '380+ Partners', img: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=220&q=60' },
        { name: 'Toronto', count: '190+ Partners', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=220&q=60' },
    ];

    // Topic avatars for Ideas
    const topicAvatars = [
        { label: 'Marketing', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=60' },
        { label: 'SaaS Tools', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=60' },
        { label: 'Consulting', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&q=60' },
        { label: 'Legal Tech', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=60' },
        { label: 'Finance', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=64&q=60' },
        { label: 'Growth', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&q=60' },
    ];

        const yelpRecentActivity = [
        {
            id: 1,
            reviewer_name: 'Jessica T.',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: '2 hours ago',
            business_name: "Brenda's French Soul Food",
            subSlug: 'delivery',
            rating: 5,
            price_category: '$$ • Southern, Breakfast & Brunch',
            review_body: 'Stopped in for Saturday brunch and the fried chicken benedict on house biscuits was otherworldly. The beignets were warm, doughy, and covered in powdered sugar. Friendly and efficient staff despite the weekend rush!',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 4, funny: 1, cool: 3 }
        },
        {
            id: 2,
            reviewer_name: 'Roy T.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: '3 hours ago',
            business_name: 'King Taco & Street Grill',
            subSlug: 'takeout',
            rating: 5,
            price_category: '$ • Mexican, Street Food, Tacos',
            review_body: 'Unbeatable street tacos. The al pastor pork has that perfect charred pineapple crisp and the red salsa has genuine kick. Cash or card accepted, super fast turnaround.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 7, funny: 2, cool: 5 }
        },
        {
            id: 3,
            reviewer_name: 'Brandon H.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: '4 hours ago',
            business_name: 'Blue Water Seafood & Oyster Bar',
            subSlug: 'catering',
            rating: 5,
            price_category: '$$$ • Seafood, Raw Bar, Wine',
            review_body: 'The New England clam chowder in a fresh sourdough bowl hit the spot on a foggy afternoon. Oysters were shucked fresh to order, ice cold with mignonette.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 5, funny: 0, cool: 4 }
        },
        {
            id: 4,
            reviewer_name: 'Peggy S.',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=60',
            action: 'added a photo',
            time: '5 hours ago',
            business_name: 'Hotbird Nashville Hot Chicken',
            subSlug: 'delivery',
            rating: 5,
            price_category: '$$ • Chicken Shop, Fast Casual',
            review_body: 'Crispy, juicy, and spicy! The medium spice level has great heat without overpowering the seasoning. Loaded crinkle fries and house slaw were the perfect pairing.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 3, funny: 1, cool: 2 }
        },
        {
            id: 5,
            reviewer_name: 'Danielle K.',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: '6 hours ago',
            business_name: 'Rose Bakery & Specialty Coffee',
            subSlug: 'coffee-tea',
            rating: 5,
            price_category: '$ • Coffee & Tea, Bakeries, Breakfast',
            review_body: 'Charming corner cafe with artisan flat whites and sourdough toast flights. Excellent natural light, great Wi-Fi, and courteous baristas.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 8, funny: 0, cool: 6 }
        },
        {
            id: 6,
            reviewer_name: 'Marcus V.',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: '7 hours ago',
            business_name: 'Apex Commercial HVAC & Contracting',
            subSlug: 'hvac',
            rating: 5,
            price_category: '$$$ • HVAC, General Contractors',
            review_body: 'Our central server room AC compressor went down on a 90-degree day. Apex had a technician at our office within 40 minutes and completed warranty repairs on the spot.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 12, funny: 0, cool: 3 }
        },
        {
            id: 7,
            reviewer_name: 'Elizabeth R.',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: '9 hours ago',
            business_name: 'Golden Gate Pastry & Sweets',
            subSlug: 'bakeries',
            rating: 5,
            price_category: '$ • Patisserie, Desserts',
            review_body: 'The strawberry shaved ice and milk toast buns are to die for. Fluffy, cloud-like texture and not overly sweet. A must-visit after dinner!',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 6, funny: 1, cool: 4 }
        },
        {
            id: 8,
            reviewer_name: 'Carlos M.',
            avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=64&q=60',
            action: 'added a photo',
            time: '11 hours ago',
            business_name: 'District Cocktail Bar & Lounge',
            subSlug: 'bars',
            rating: 5,
            price_category: '$$ • Cocktail Bars, Lounges',
            review_body: 'Artisanal mezcal cocktails with smoked rosemary and fresh passionfruit puree. Ambient speakeasy lighting and playlist make it ideal for date night.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 5, funny: 2, cool: 9 }
        },
        {
            id: 9,
            reviewer_name: 'Sara P.',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: '12 hours ago',
            business_name: 'Summit Smokehouse & BBQ',
            subSlug: 'takeout',
            rating: 5,
            price_category: '$$ • Barbeque, Ribs, Comfort Food',
            review_body: 'Texas-style brisket with deep smoke rings and caramelized bark. The ribs pull right off the bone without sauce needed. Mac & cheese and cornbread are delicious.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 9, funny: 1, cool: 6 }
        },
        {
            id: 10,
            reviewer_name: 'David C.',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: 'Yesterday',
            business_name: 'Elite Fleet Detailing & Auto Repair',
            subSlug: 'auto-repair',
            rating: 5,
            price_category: '$$ • Auto Detailing, Body Shop',
            review_body: 'Brought in our company delivery van for complete interior detailing and ceramic coat. Look at these before and after shots! Outstanding craftsmanship and clear invoicing.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 11, funny: 0, cool: 8 }
        },
        {
            id: 11,
            reviewer_name: 'Elena R.',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: 'Yesterday',
            business_name: 'Ramen Ichiraku Noodle Bar',
            subSlug: 'delivery',
            rating: 5,
            price_category: '$$ • Japanese, Ramen, Noodles',
            review_body: 'Rich, 18-hour simmered tonkotsu broth that is silky and deeply savory. Chewy noodles cooked firm and the ajitsuke tamago egg had a gooey custard center.',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 7, funny: 1, cool: 5 }
        },
        {
            id: 12,
            reviewer_name: 'Claire M.',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: '2 days ago',
            business_name: 'Sarah Jenkins Gourmet Catering',
            subSlug: 'catering',
            rating: 5,
            price_category: '$$$ • Caterers, Corporate Lunches',
            review_body: 'Ordered boxed executive lunches for our board meeting of 28 people. Beautiful individual packaging, fresh seasonal salads, and delicious grain bowls.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 14, funny: 1, cool: 7 }
        },
        {
            id: 13,
            reviewer_name: 'Michael B.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=64&q=60',
            action: 'wrote a review',
            time: '2 days ago',
            business_name: 'Tokyo Sushi Omakase Lounge',
            subSlug: 'takeout',
            rating: 5,
            price_category: '$$$$ • Sushi Bars, Japanese',
            review_body: 'Spectacular omakase experience. The bluefin otoro and Santa Barbara sea urchin melted in our mouths. Chef Kenji explains the provenance of every single piece.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 16, funny: 2, cool: 12 }
        },
        {
            id: 14,
            reviewer_name: 'Anthony D.',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=64&q=60',
            action: 'added a photo',
            time: '3 days ago',
            business_name: 'Zenith Chiropractic & Spine Care',
            subSlug: 'chiropractors',
            rating: 5,
            price_category: '$$ • Chiropractors, Physical Therapy',
            review_body: 'Suffered from chronic lower back tension from desk work. Dr. Amanda did a thorough spinal assessment and gentle decompression. Walked out feeling 2 inches taller!',
            layout_type: 'single_photo',
            photos: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=350&q=60'],
            reactions: { useful: 8, funny: 0, cool: 4 }
        },
        {
            id: 15,
            reviewer_name: 'Rachel W.',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=60',
            action: 'added 2 photos',
            time: '3 days ago',
            business_name: 'Delta Moving & Storage Solutions',
            subSlug: 'movers',
            rating: 5,
            price_category: '$$$ • Movers, Packing Services',
            review_body: 'Our 4-bedroom home move was executed seamlessly. The crew arrived right at 8 AM with heavy-duty padding, disassembling and reassembling furniture with extreme care.',
            layout_type: 'double_photo',
            photos: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=220&q=60',
                'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=220&q=60'
            ],
            reactions: { useful: 10, funny: 0, cool: 6 }
        }
    ];

    const mergedReviews = yelpRecentActivity;
    const activeCityData = citySearchData[activeCity] || citySearchData['Los Angeles'];

    return (
        <AppLayout>
            <Head title="Bizztopia — Find & Compare Local Businesses Near You" />

            {/* SECTION 1: Bizztopia-Style Hero with VISIBLE Background Image */}
            <section className="text-white relative overflow-hidden min-h-[540px] flex flex-col justify-center py-20">
                {/* Visible Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
                    style={{ 
                        backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=50')` 
                    }}
                />
                {/* Ambient Brand Overlay that lets the background image shine through cleanly */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 z-0" />

                {/* Hero Body Context */}
                <div className="max-w-4xl mx-auto px-6 text-center z-10 space-y-8">
                    <h1 className="text-4xl sm:text-6xl font-black font-outfit tracking-tight leading-tight text-white drop-shadow-md">
                        Find Verified Local <br className="sm:hidden" /> Businesses You Can Trust
                    </h1>
                    <p className="text-slate-200 text-base font-medium max-w-xl mx-auto">
                        Verified reviews. Real licenses. Backed by a $2,500 consumer guarantee. Bizztopia is the only local business directory that checks what others ignore.
                    </p>
                    <button 
                        onClick={() => document.getElementById('lead-funnel-section')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="mx-auto bg-[#287FBA] hover:bg-[#0B4778] hover:scale-105 active:scale-95 transition-all duration-300 text-white font-extrabold text-base px-9 py-4 rounded-full shadow-xl shadow-[#287FBA]/25 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5 fill-[#EAF5FC]" /> Find Trusted Local Pros
                    </button>
                </div>

                {/* Featured Business Badge (Bottom Left) */}
                <div className="absolute bottom-6 left-8 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-white text-xs max-w-xs hidden sm:block z-10">
                    <Link href="/subcategory/restaurants" className="hover:underline font-black text-sm block mb-0.5">Brenda's French Soul Food — Featured Dining</Link>
                    <div className="flex items-center gap-1">
                        <div className="flex text-[#287FBA]">
                            <Star className="w-3.5 h-3.5 fill-[#287FBA]" />
                            <Star className="w-3.5 h-3.5 fill-[#287FBA]" />
                            <Star className="w-3.5 h-3.5 fill-[#287FBA]" />
                            <Star className="w-3.5 h-3.5 fill-[#287FBA]" />
                            <Star className="w-3.5 h-3.5 fill-[#287FBA]" />
                        </div>
                        <span className="text-slate-300 font-bold ml-1">(127 reviews)</span>
                    </div>
                </div>
            </section>
            
            {/* UNLOCK OUR FREE SERVICES SECTION */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
                    <div className="space-y-3 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
                            We Verify What Others Don't
                        </h2>
                        <p className="text-[#287FBA] sm:text-lg font-bold">
                            Every business on Bizztopia is license-verified, insurance-confirmed, and review-audited before you ever see them.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Connect Card */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-4 hover:-translate-y-1 group">
                            <div className="w-16 h-16 rounded-full bg-[#0B4778] flex items-center justify-center text-white shadow-md shadow-[#0B4778]/30 group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Get Matched</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Save hours of searching. Tell us your project details, and we’ll filter out the noise to connect you with highly-rated local businesses that actually serve your area.
                            </p>
                        </div>

                        {/* Identify Card */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-4 hover:-translate-y-1 group">
                            <div className="w-16 h-16 rounded-full bg-[#0B4778] flex items-center justify-center text-white shadow-md shadow-[#0B4778]/30 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Compare</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Read authentic reviews from real customers, check verified ratings, compare pricing side-by-side, and browse work photos — all in one place.
                            </p>
                        </div>

                        {/* Serve Card */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-4 hover:-translate-y-1 group">
                            <div className="w-16 h-16 rounded-full bg-[#0B4778] flex items-center justify-center text-white shadow-md shadow-[#0B4778]/30 group-hover:scale-110 transition-transform">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">Request Quotes</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Fill out one simple form and receive up to 3 competitive quotes from top-rated, verified local businesses. No cold calls, no middlemen, no guesswork.
                            </p>
                        </div>
                    </div>

                    {/* Bottom CTA with Curved Pointer Arrows */}
                    <div className="relative pt-6 max-w-2xl mx-auto flex flex-col items-center">
                        <div className="flex items-center justify-between w-full max-w-md mb-2 opacity-80 text-[#287FBA]">
                            <svg className="w-24 h-12 transform -rotate-12" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M 10 10 Q 50 40 90 20" />
                                <path d="M 80 15 L 90 20 L 85 30" />
                            </svg>
                            <svg className="w-24 h-12 transform rotate-12 scale-x-[-1]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M 10 10 Q 50 40 90 20" />
                                <path d="M 80 15 L 90 20 L 85 30" />
                            </svg>
                        </div>
                        <button
                            onClick={() => document.getElementById('lead-funnel-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#287FBA] hover:bg-[#0B4778] text-white font-extrabold text-sm px-9 py-4 rounded-full shadow-xl shadow-[#287FBA]/30 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 fill-[#EAF5FC]" /> Start Free Partner Match
                        </button>
                    </div>
                </div>
            </section>

{/* SECTION 3: Bizztopia-Style Categories Grid */}
            <section className="py-16 bg-slate-50/50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black font-outfit text-slate-900 mb-10 tracking-tight font-bold">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Restaurants', slug: 'restaurants', icon: Utensils, color: 'text-[#287FBA] bg-rose-50 border-rose-100' },
                            { name: 'Shopping', slug: 'shopping', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 border-blue-100' },
                            { name: 'Nightlife', slug: 'nightlife', icon: Beer, color: 'text-[#287FBA] bg-red-50 border-red-100' },
                            { name: 'Active Life', slug: 'active-life', icon: Activity, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                            { name: 'Beauty & Spas', slug: 'beauty-spas', icon: Sparkles, color: 'text-violet-600 bg-violet-50 border-violet-100' },
                            { name: 'Automotive', slug: 'automotive', icon: Car, color: 'text-teal-600 bg-teal-50 border-teal-100' },
                            { name: 'Home Services', slug: 'home-services', icon: Wrench, color: 'text-sky-600 bg-sky-50 border-sky-100' },
                            { 
                                name: showAllCategories ? 'Less' : 'More', 
                                slug: 'more', 
                                icon: showAllCategories ? ChevronUp : MoreHorizontal, 
                                color: showAllCategories ? 'text-white bg-[#0B4778] border-[#287FBA]' : 'text-slate-600 bg-slate-50 border-slate-100' 
                            },
                        ].map((cat) => {
                            const isMore = cat.slug === 'more';
                            const isExpanded = isMore && showAllCategories;
                            const IconComponent = cat.icon;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => {
                                        if (isMore) {
                                            setShowAllCategories(!showAllCategories);
                                        } else {
                                            router.get('/ideas', { category: cat.slug });
                                        }
                                    }}
                                    className={`group p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${
                                        isExpanded 
                                            ? 'bg-[#0B4778] border-[#287FBA] text-white shadow-xl ring-2 ring-[#287FBA]/40 scale-102' 
                                            : 'bg-white border-slate-200 hover:border-[#287FBA]/40 hover:shadow-xl'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 mb-4 shadow-sm border ${
                                        isExpanded 
                                            ? 'bg-white/10 text-white border-white/20' 
                                            : `${cat.color} group-hover:bg-[#287FBA] group-hover:text-white group-hover:border-transparent`
                                    }`}>
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                    <span className={`text-base font-extrabold font-outfit transition-colors ${
                                        isExpanded ? 'text-white' : 'text-slate-900 group-hover:text-[#287FBA]'
                                    }`}>
                                        {cat.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* EXPANDED REMAINING CATEGORIES & SUBCATEGORIES CARDS */}
                    {showAllCategories && (
                        <div className="mt-12 pt-10 border-t border-slate-200/80 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="text-center mb-8">
                                <span className="bg-[#287FBA]/10 text-[#287FBA] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block font-bold">
                                    All Directory Subcategories & Trades
                                </span>
                                <h3 className="text-2xl font-black font-outfit text-slate-950 mt-2 font-bold">
                                    Explore Remaining Categories & Verified Pros
                                </h3>
                                <p className="text-slate-500 text-xs font-medium mt-1">
                                    Select any subcategory below to view pre-screened local businesses, authentic work photos, and verified bids.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                                {[
                                    {
                                        name: 'Restaurants & Dining',
                                        categorySlug: 'restaurants',
                                        icon: Utensils,
                                        badgeColor: 'text-[#287FBA] bg-rose-50 border-rose-100',
                                        subcategories: [
                                            { name: 'Takeout', slug: 'takeout' },
                                            { name: 'Delivery', slug: 'delivery' },
                                            { name: 'Hot & Trendy', slug: 'hot-trendy' },
                                            { name: 'Breakfast & Brunch', slug: 'breakfast-brunch' },
                                            { name: 'Coffee & Cafes', slug: 'coffee-cafes' },
                                            { name: 'Pizza', slug: 'pizza' },
                                            { name: 'Bakeries', slug: 'bakeries' },
                                            { name: 'Italian', slug: 'italian' },
                                            { name: 'Mexican', slug: 'mexican' },
                                            { name: 'Food Trucks', slug: 'food-trucks' },
                                            { name: 'Sports Bars & Pubs', slug: 'sports-bars-pubs' },
                                        ]
                                    },
                                    {
                                        name: 'Home Services & Trades',
                                        categorySlug: 'home-garden',
                                        icon: Wrench,
                                        badgeColor: 'text-sky-600 bg-sky-50 border-sky-100',
                                        subcategories: [
                                            { name: 'Contractors & Handymen', slug: 'contractors-handymen' },
                                            { name: 'Plumbers', slug: 'plumbers' },
                                            { name: 'Electricians', slug: 'electricians' },
                                            { name: 'HVAC & Air Conditioning', slug: 'hvac' },
                                            { name: 'Appliances & Repair', slug: 'appliances-repair' },
                                            { name: 'Roofing', slug: 'roofing' },
                                            { name: 'Locksmiths', slug: 'locksmiths' },
                                            { name: 'Painters', slug: 'painters' },
                                            { name: 'Landscaping', slug: 'landscaping' },
                                            { name: 'Nurseries & Gardening', slug: 'nurseries-gardening' },
                                            { name: 'Tree Services', slug: 'tree-services' },
                                            { name: 'Home Cleaning', slug: 'home-cleaning' },
                                            { name: 'Movers', slug: 'movers' },
                                        ]
                                    },
                                    {
                                        name: 'Automotive Services',
                                        categorySlug: 'auto-services',
                                        icon: Car,
                                        badgeColor: 'text-teal-600 bg-teal-50 border-teal-100',
                                        subcategories: [
                                            { name: 'Auto Repair', slug: 'auto-repair' },
                                            { name: 'Body Shops', slug: 'body-shops' },
                                            { name: 'Oil Change', slug: 'oil-change' },
                                            { name: 'Tires & Wheels', slug: 'tires' },
                                            { name: 'Towing & Roadside', slug: 'towing' },
                                            { name: 'Car Wash', slug: 'car-wash' },
                                            { name: 'Auto Detailing', slug: 'auto-detailing' },
                                            { name: 'Parking Lots', slug: 'parking' },
                                            { name: 'Car Dealers', slug: 'car-dealers' },
                                            { name: 'Junkyards', slug: 'junkyards' },
                                        ]
                                    },
                                    {
                                        name: 'Health & Medical',
                                        categorySlug: 'health-beauty',
                                        icon: Stethoscope,
                                        badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                                        subcategories: [
                                            { name: 'Dentists', slug: 'dentists' },
                                            { name: 'Doctors & Clinics', slug: 'doctors' },
                                            { name: 'Chiropractors', slug: 'chiropractors' },
                                            { name: 'Optometrists & Glasses', slug: 'optometrists' },
                                            { name: 'Dermatologists', slug: 'dermatologists' },
                                            { name: 'Podiatrists', slug: 'podiatrists' },
                                            { name: 'Physical Therapy', slug: 'physical-therapy' },
                                            { name: 'Massage Therapy', slug: 'massage' },
                                        ]
                                    },
                                    {
                                        name: 'Beauty & Wellness',
                                        categorySlug: 'health-beauty',
                                        icon: Sparkles,
                                        badgeColor: 'text-violet-600 bg-violet-50 border-violet-100',
                                        subcategories: [
                                            { name: 'Hair Salons', slug: 'hair-salons' },
                                            { name: 'Nail Salons', slug: 'nail-salons' },
                                            { name: 'Barbers', slug: 'barbers' },
                                            { name: 'Day Spas & Saunas', slug: 'spas' },
                                            { name: 'Massage & Relaxation', slug: 'massage' },
                                            { name: 'Florists & Gifts', slug: 'florists' },
                                        ]
                                    },
                                    {
                                        name: 'Travel & Activities',
                                        categorySlug: 'travel-activities',
                                        icon: Compass,
                                        badgeColor: 'text-amber-600 bg-amber-50 border-amber-100',
                                        subcategories: [
                                            { name: 'Things To Do', slug: 'things-to-do' },
                                            { name: 'Kids Camps & Fun', slug: 'kids-activities-camps' },
                                            { name: 'Venues & Event Spaces', slug: 'venues-events' },
                                            { name: 'Hotels & Lodging', slug: 'hotels' },
                                            { name: 'Taxis & Shuttles', slug: 'taxis' },
                                            { name: 'Bike Rentals', slug: 'bike-rentals' },
                                            { name: 'Campgrounds', slug: 'campgrounds' },
                                            { name: 'Beaches & Parks', slug: 'beaches' },
                                            { name: 'Swimming Pools', slug: 'swimming-pools' },
                                            { name: 'Mini Golf & Bowling', slug: 'mini-golf' },
                                        ]
                                    },
                                    {
                                        name: 'Shopping & Retail',
                                        categorySlug: 'shopping',
                                        icon: ShoppingBag,
                                        badgeColor: 'text-blue-600 bg-blue-50 border-blue-100',
                                        subcategories: [
                                            { name: 'Shopping Malls', slug: 'shopping-malls' },
                                            { name: 'Bookstores', slug: 'bookstores' },
                                            { name: 'Furniture Stores', slug: 'furniture-stores' },
                                            { name: 'Thrift & Vintage Stores', slug: 'thrift-stores' },
                                            { name: 'Tailors & Alterations', slug: 'tailors-alterations' },
                                        ]
                                    },
                                    {
                                        name: 'Local Services & Facilities',
                                        categorySlug: 'more',
                                        icon: Briefcase,
                                        badgeColor: 'text-slate-600 bg-slate-100 border-slate-200',
                                        subcategories: [
                                            { name: 'Dry Cleaning', slug: 'dry-cleaning' },
                                            { name: 'Laundromats', slug: 'laundromats' },
                                            { name: 'Apartments & Living', slug: 'apartments' },
                                            { name: 'Junk Removal', slug: 'junk-removal' },
                                            { name: 'Gyms & Fitness Centers', slug: 'gyms' },
                                            { name: 'Bars & Nightlife', slug: 'bars-nightlife' },
                                        ]
                                    },
                                ].map((group, idx) => {
                                    const GroupIcon = group.icon;
                                    return (
                                        <div 
                                            key={idx}
                                            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* Header */}
                                                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 mb-4">
                                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${group.badgeColor} shadow-2xs shrink-0`}>
                                                        <GroupIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base font-black font-outfit text-slate-900 font-bold leading-tight">
                                                            {group.name}
                                                        </h4>
                                                        <span className="text-[10px] font-bold text-slate-400">
                                                            {group.subcategories.length} Subcategories
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Subcategory Pills */}
                                                <div className="flex flex-wrap gap-1.5">
                                                    {group.subcategories.map((sub) => (
                                                        <Link
                                                            key={sub.slug}
                                                            href={`/subcategory/${sub.slug}`}
                                                            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#287FBA] text-slate-700 hover:text-white border border-slate-200/80 hover:border-transparent text-xs font-bold transition-all duration-200 cursor-pointer"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Bottom Link */}
                                            <div className="pt-4 mt-4 border-t border-slate-100">
                                                <Link
                                                    href={`/ideas?category=${group.categorySlug}`}
                                                    className="text-xs font-extrabold text-[#287FBA] hover:text-[#0B4778] flex items-center justify-between transition-colors font-bold group/link"
                                                >
                                                    <span>Explore {group.name}</span>
                                                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* SECTION 4: Yelp-Style "Recent Activity" Review Grid */}
            <section id="recent-activity" className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-black font-outfit text-slate-900 text-center mb-10 tracking-tight">
                        Recent Activity
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mergedReviews.slice(0, visibleReviews).map((rev) => {
                            const isUseful = !!userReactions[rev.id]?.useful;
                            const isFunny = !!userReactions[rev.id]?.funny;
                            const isCool = !!userReactions[rev.id]?.cool;

                            return (
                                <div 
                                    key={rev.id} 
                                    className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* User Header */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <img 
                                                src={rev.avatar} 
                                                alt={rev.reviewer_name} 
                                                className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="text-xs font-bold text-slate-900 leading-tight truncate hover:text-[#287FBA] cursor-pointer">
                                                    {rev.reviewer_name}
                                                </div>
                                                <div className="text-[11px] text-slate-500 font-medium leading-tight">
                                                    <span>{rev.action}</span> • <span className="text-slate-400">{rev.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Variant: Single Photo Card */}
                                        {rev.layout_type === 'single_photo' ? (
                                            <div className="space-y-3">
                                                <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                                                    <img 
                                                        src={rev.photos[0]} 
                                                        alt={rev.business_name} 
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" 
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Link 
                                                        href={`/subcategory/${rev.subSlug}`}
                                                        className="font-extrabold text-sm text-slate-900 hover:text-[#287FBA] transition-colors leading-snug line-clamp-1 block"
                                                    >
                                                        {rev.business_name}
                                                    </Link>
                                                    <div className="flex items-center gap-2">
                                                        {/* 5 solid square stars */}
                                                        <div className="flex items-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <div 
                                                                    key={s} 
                                                                    className={`w-4 h-4 rounded-[2px] flex items-center justify-center ${
                                                                        s <= rev.rating ? 'bg-[#287FBA]' : 'bg-slate-200'
                                                                    }`}
                                                                >
                                                                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] text-slate-500 font-medium truncate">
                                                            {rev.price_category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                                                    "{rev.review_body}"
                                                </p>
                                                <Link 
                                                    href={`/subcategory/${rev.subSlug}`} 
                                                    aria-label={`Read full review for ${rev.business_name}`} 
                                                    className="text-xs font-bold text-[#287FBA] hover:text-[#0B4778] inline-block"
                                                >
                                                    Read more
                                                </Link>
                                            </div>
                                        ) : (
                                            /* Variant: Double Photo Card */
                                            <div className="space-y-3">
                                                <div className="space-y-1">
                                                    <Link 
                                                        href={`/subcategory/${rev.subSlug}`}
                                                        className="font-extrabold text-sm text-slate-900 hover:text-[#287FBA] transition-colors leading-snug line-clamp-1 block"
                                                    >
                                                        {rev.business_name}
                                                    </Link>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <div 
                                                                    key={s} 
                                                                    className={`w-4 h-4 rounded-[2px] flex items-center justify-center ${
                                                                        s <= rev.rating ? 'bg-[#287FBA]' : 'bg-slate-200'
                                                                    }`}
                                                                >
                                                                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] text-slate-500 font-medium truncate">
                                                            {rev.price_category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Two side-by-side photos */}
                                                <div className="grid grid-cols-2 gap-2 my-2">
                                                    <div className="h-32 rounded-xl overflow-hidden bg-slate-100">
                                                        <img 
                                                            src={rev.photos[0]} 
                                                            alt="Photo 1" 
                                                            width="400" 
                                                            height="300" 
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" 
                                                        />
                                                    </div>
                                                    <div className="h-32 rounded-xl overflow-hidden bg-slate-100">
                                                        <img 
                                                            src={rev.photos[1]} 
                                                            alt="Photo 2" 
                                                            width="400" 
                                                            height="300" 
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" 
                                                        />
                                                    </div>
                                                </div>

                                                <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                                                    "{rev.review_body}"
                                                </p>
                                                <Link 
                                                    href={`/subcategory/${rev.subSlug}`} 
                                                    aria-label={`Read full review for ${rev.business_name}`} 
                                                    className="text-xs font-bold text-[#287FBA] hover:text-[#0B4778] inline-block"
                                                >
                                                    Read more
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer: Yelp Reaction Bar */}
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4 text-slate-500 text-xs">
                                        <button 
                                            onClick={() => toggleReaction(rev.id, 'useful')}
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                                isUseful ? 'bg-blue-50 text-[#287FBA] font-bold' : 'hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <Lightbulb className="w-3.5 h-3.5" />
                                            <span className="text-[11px]">Useful</span>
                                            <span className="text-[10px] text-slate-400">{rev.reactions.useful + (isUseful ? 1 : 0)}</span>
                                        </button>
                                        <button 
                                            onClick={() => toggleReaction(rev.id, 'funny')}
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                                isFunny ? 'bg-blue-50 text-[#287FBA] font-bold' : 'hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <Smile className="w-3.5 h-3.5" />
                                            <span className="text-[11px]">Funny</span>
                                            <span className="text-[10px] text-slate-400">{rev.reactions.funny + (isFunny ? 1 : 0)}</span>
                                        </button>
                                        <button 
                                            onClick={() => toggleReaction(rev.id, 'cool')}
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                                isCool ? 'bg-blue-50 text-[#287FBA] font-bold' : 'hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <Heart className="w-3.5 h-3.5" />
                                            <span className="text-[11px]">Cool</span>
                                            <span className="text-[10px] text-slate-400">{rev.reactions.cool + (isCool ? 1 : 0)}</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {visibleReviews < mergedReviews.length && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={() => setVisibleReviews((prev) => prev + 6)}
                                className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold hover:bg-slate-50 hover:scale-103 transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer font-bold"
                            >
                                Show more activity <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* SECTION 5: Interactive Lead Funnel (Verified Matching Form) */}
            <section id="lead-funnel-section" className="py-20 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-md animate-in fade-in duration-300">
                        <div className="text-center max-w-xl mx-auto mb-10">
                            <h2 className="text-3xl font-black font-outfit text-slate-900 tracking-tight mb-2 font-bold">Find the Right Local Business</h2>
                            <p className="text-slate-500 text-sm font-medium">Tell us what you need and we'll match you with top-rated local service providers in your area — free, fast, and no obligations.</p>
                        </div>

                        {leadSubmitted ? (
                            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black font-outfit text-slate-950 font-bold">Thank You!</h3>
                                <p className="text-slate-600 text-sm max-w-sm mx-auto font-medium">Your request has been received. Verified partners matching your criteria will reach out to you shortly via email.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleLeadSubmit} className="space-y-6">
                                {/* Step 1: Services */}
                                {leadStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <label className="text-sm font-black text-slate-900 block font-bold">Which service are you looking for?</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { name: '🏡 Home & Garden / Contractor Services', desc: 'Plumbing, electrical, HVAC, roofing, landscaping, contracting & handymen' },
                                                { name: '🛠️ Auto Repair & Fleet Maintenance', desc: 'Mechanics, body shops, commercial towing, detailing & fleet servicing' },
                                                { name: '🍽️ Restaurant, Food & Hospitality', desc: 'Commercial kitchen supplies, catering, food distribution & equipment repair' },
                                                { name: '🩺 Health, Dental & Medical Clinics', desc: 'Dentists, physical therapy, medical practices, wellness & salon supplies' },
                                                { name: '🚚 Commercial Cleaning & Facilities', desc: 'Janitorial services, junk removal, property management & security' },
                                                { name: '💼 Marketing, Legal & Business Growth', desc: 'Local SEO, legal filing, tax accounting, IT support & growth strategy' }
                                            ].map((svc) => (
                                                <button
                                                    key={svc.name}
                                                    type="button"
                                                    onClick={() => {
                                                        setLeadData({ ...leadData, serviceNeeded: svc.name });
                                                        setTimeout(() => setLeadStep(2), 300);
                                                    }}
                                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${leadData.serviceNeeded === svc.name ? 'border-[#287FBA] bg-blue-50/50 text-[#287FBA] shadow-xs scale-101' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'}`}
                                                >
                                                    <div>
                                                        <div className="font-extrabold text-sm group-hover:text-[#287FBA] transition-colors font-bold">{svc.name}</div>
                                                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">{svc.desc}</div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-[#287FBA] transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Timeline */}
                                {leadStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <label className="text-sm font-black text-slate-900 block font-bold">When do you need this service?</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Immediately (Next 1-2 weeks)', 'Flexible (Next 30 days)', 'Planning / Budgeting Phase'].map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => {
                                                        setLeadData({ ...leadData, timeline: time });
                                                        setTimeout(() => setLeadStep(3), 300);
                                                    }}
                                                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${leadData.timeline === time ? 'border-[#287FBA] bg-blue-50/50 text-[#287FBA] shadow-xs scale-101' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'}`}
                                                >
                                                    <span className="font-extrabold text-sm group-hover:text-[#287FBA] transition-colors font-bold">{time}</span>
                                                    <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-[#287FBA] transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => setLeadStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer mt-2 block font-bold">← Go Back</button>
                                    </div>
                                )}

                                {/* Step 3: Contact */}
                                {leadStep === 3 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <label className="text-sm font-black text-slate-900 block font-bold">Enter your business & contact details</label>
                                        <div className="space-y-3.5">
                                            <input 
                                                type="text" 
                                                placeholder="Business Name" 
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                                value={leadData.businessName}
                                                onChange={(e) => setLeadData({ ...leadData, businessName: e.target.value })}
                                                required
                                            />
                                            <input 
                                                type="email" 
                                                placeholder="Work Email Address" 
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <button type="button" onClick={() => setLeadStep(2)} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer font-bold">← Go Back</button>
                                            <button type="submit" className="bg-[#287FBA] hover:bg-[#0B4778] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer font-bold">Submit Quote Request</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 7: Ecosystem News (Rollers) */}
            {(() => {
                const defaultBreaking = [
                    { id: 'b1', title: 'Fed Signals Potential Interest Rate Adjustments for Q3 Business Credit', category: { name: 'Market Wire' }, image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80', slug: 'fed-interest-rates' },
                    { id: 'b2', title: 'Top 10 B2B SaaS Platforms Scaling Growth in 2026', category: { name: 'SaaS Pulse' }, image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80', slug: 'b2b-saas-scaling' },
                    { id: 'b3', title: 'Global SMB AI Adoption Surges 48% Year-Over-Year', category: { name: 'AI & Tech' }, image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80', slug: 'ai-enterprise-adoption' },
                    { id: 'b4', title: 'Venture Capital Inflows Jump to $14.2B for Growth-Stage Startups', category: { name: 'Venture Capital' }, image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=300&q=80', slug: 'vc-inflows-surge' },
                    { id: 'b5', title: 'Digital Agency Acquisition Multiples Reach 5-Year Peak', category: { name: 'M&A Report' }, image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80', slug: 'agency-ma-peak' },
                ];

                const defaultTrending = [
                    { id: 't1', title: 'How Top Founders Lowered CAC by 42% Using Verified Ecosystems', category: { name: 'Strategy' }, image_url: 'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=300&q=80', slug: 'lower-cac-ecosystem' },
                    { id: 't2', title: '2026 Playbook: Building High-Converting B2B Proposal Funnels', category: { name: 'Acquisition' }, image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80', slug: 'b2b-proposal-playbook' },
                    { id: 't3', title: 'The Shift Toward Outcome-Based Agency Pricing Models', category: { name: 'Agency Growth' }, image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80', slug: 'outcome-based-pricing' },
                    { id: 't4', title: 'Cross-Border B2B Trade Frameworks Updated for 2026', category: { name: 'Compliance' }, image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80', slug: 'b2b-trade-frameworks' },
                    { id: 't5', title: 'Maximizing LTV:CAC Ratio for SaaS Startups & SMBs', category: { name: 'Metrics' }, image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80', slug: 'ltv-cac-metrics' },
                ];

                const activeBreakingList = (breakingArticles && breakingArticles.length > 0) ? breakingArticles : defaultBreaking;
                const activeTrendingList = (trendingArticles && trendingArticles.length > 0) ? trendingArticles : defaultTrending;

                return (
                    <section className="bg-slate-50/80 py-14 sm:py-16 overflow-hidden space-y-8 border-y border-slate-200/90 shadow-2xs">
                        {/* Roller 1: Breaking News */}
                        <div className="flex items-center gap-6 max-w-7xl mx-auto px-6">
                            <div className="shrink-0 w-36 sm:w-44 h-28 sm:h-32 rounded-3xl bg-[#EAF5FC] border-2 border-[#287FBA]/40 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-md gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-[#287FBA] flex items-center justify-center shadow-xs">
                                    <Zap className="w-5 h-5 text-white fill-white animate-bounce" />
                                </div>
                                <div>
                                    <span className="text-xs sm:text-sm font-black uppercase text-[#0B4778] tracking-wider font-outfit block font-bold">Market News</span>
                                    <span className="text-[10px] text-[#287FBA] font-bold">Live B2B Feed</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-x-auto scrollbar-none">
                                <div className="flex items-center gap-4 py-1">
                                    {activeBreakingList.map((article: any) => {
                                        const imgUrl = article.hero_image || article.image_url || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80';
                                        return (
                                            <Link 
                                                key={article.id} 
                                                href={article.slug ? `/ideas/${article.slug}` : `/ideas`} 
                                                className="w-[340px] shrink-0 flex items-center gap-4 bg-white border border-slate-200/90 p-4 rounded-3xl hover:border-[#287FBA] hover:shadow-xl transition-all duration-300 font-outfit h-28 sm:h-32 group"
                                            >
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                                    <img 
                                                        src={imgUrl} 
                                                        alt={article.title || 'Market News'} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=300&q=80';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[10px] font-black uppercase text-[#287FBA] tracking-widest font-bold bg-[#287FBA]/10 px-2 py-0.5 rounded-md truncate">
                                                            {article.category?.name || 'Market News'}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-slate-400 shrink-0">{article.reading_time || '3 min read'}</span>
                                                    </div>
                                                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#287FBA] transition-colors line-clamp-2 leading-snug">
                                                        {article.title}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 font-medium line-clamp-1">
                                                        {article.subtitle || 'Verified business report & analysis'}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Roller 2: Trending Content */}
                        <div className="flex items-center gap-6 max-w-7xl mx-auto px-6">
                            <div className="shrink-0 w-36 sm:w-44 h-28 sm:h-32 rounded-3xl bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-md gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center shadow-xs">
                                    <Flame className="w-5 h-5 text-white fill-white animate-pulse" />
                                </div>
                                <div>
                                    <span className="text-xs sm:text-sm font-black uppercase text-amber-950 tracking-wider font-outfit block font-bold">Trending</span>
                                    <span className="text-[10px] text-amber-600 font-bold">Viral Insights</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-x-auto scrollbar-none">
                                <div className="flex items-center gap-4 py-1">
                                    {activeTrendingList.map((article: any) => {
                                        const imgUrl = article.hero_image || article.image_url || 'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=300&q=80';
                                        return (
                                            <Link 
                                                key={article.id} 
                                                href={article.slug ? `/ideas/${article.slug}` : `/ideas`} 
                                                className="w-[340px] shrink-0 flex items-center gap-4 bg-white border border-slate-200/90 p-4 rounded-3xl hover:border-amber-400 hover:shadow-xl transition-all duration-300 font-outfit h-28 sm:h-32 group"
                                            >
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                                    <img 
                                                        src={imgUrl} 
                                                        alt={article.title || 'Trending Story'} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = 'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=300&q=80';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-[10px] font-black uppercase text-amber-700 tracking-widest font-bold bg-amber-100 px-2 py-0.5 rounded-md truncate">
                                                            {article.category?.name || 'Trending'}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-slate-400 shrink-0">{article.reading_time || '4 min read'}</span>
                                                    </div>
                                                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                                                        {article.title}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 font-medium line-clamp-1">
                                                        {article.subtitle || 'High-converting strategies & playbook'}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* SECTION 8: Explore Searches in Popular Cities (Bizztopia-Style Tabbed Directory) */}
            <section className="py-20 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-xl mx-auto mb-10">
                        <h2 className="text-3xl font-black font-outfit text-slate-900 tracking-tight mb-2 font-bold">Explore searches in popular cities</h2>
                        <p className="text-slate-500 text-sm font-medium">Discover top-rated business partners according to their location</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
                        {Object.keys(citySearchData).map((city) => (
                            <button
                                key={city}
                                onClick={() => setActiveCity(city)}
                                className={`px-5 py-2.5 rounded-full border text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer font-bold ${activeCity === city ? 'bg-[#287FBA] border-[#287FBA] text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    {/* Directory Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-200/80">
                        {/* Column 1: Top Searches */}
                        <div className="space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2 font-bold">Top Searches in {activeCity}, CA</h3>
                            <div className="flex flex-col gap-2.5">
                                {activeCityData.top.slice(0, 4).map((link, i) => (
                                    <button onClick={() => router.get('/ideas', { search: link })} key={i} className="text-left text-xs font-bold text-[#287FBA] hover:text-[#0b4778] hover:underline cursor-pointer">
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Trending Searches */}
                        <div className="space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2 font-bold">Trending in {activeCity}, CA</h3>
                            <div className="flex flex-col gap-2.5">
                                {activeCityData.trending.slice(0, 4).map((link, i) => (
                                    <button onClick={() => router.get('/ideas', { search: link })} key={i} className="text-left text-xs font-bold text-[#287FBA] hover:text-[#0b4778] hover:underline cursor-pointer font-bold">
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Seasonal Searches */}
                        <div className="space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2 font-bold">Seasonal Searches</h3>
                            <div className="flex flex-col gap-2.5">
                                {activeCityData.seasonal.map((link, i) => (
                                    <button onClick={() => router.get('/ideas', { search: link })} key={i} className="text-left text-xs font-bold text-[#287FBA] hover:text-[#0b4778] hover:underline cursor-pointer font-bold">
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Column 4: Recently reviewed */}
                        <div className="space-y-4">
                            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-2 font-bold">Recently Reviewed</h3>
                            <div className="flex flex-col gap-2.5">
                                {activeCityData.recent.map((link, i) => (
                                    <button onClick={() => router.get('/ideas', { search: link })} key={i} className="text-left text-xs font-bold text-[#287FBA] hover:text-[#0b4778] hover:underline cursor-pointer font-bold">
                                        {link}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
