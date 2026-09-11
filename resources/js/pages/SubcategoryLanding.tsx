import React, { useState } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import subcategoryImagesData from '@/data/subcategory_images.json';
import { 
    Star, MapPin, ShieldCheck, CheckCircle2, ChevronRight, 
    BookOpen, Sparkles, UserCheck, ShieldAlert, Award, FileText,
    ArrowRight, MessageSquare, PhoneCall, Zap, HeartPulse, Camera
} from 'lucide-react';

interface SubcategoryLandingProps {
    slug: string;
    name: string;
    categoryName: string;
    articles?: any[];
}

export default function SubcategoryLanding({ slug, name, categoryName, articles }: SubcategoryLandingProps) {
    const subcatImages: any[] = (subcategoryImagesData as any)[slug] || [];

    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [serviceNeed, setServiceNeed] = useState('');
    const [location, setLocation] = useState('San Francisco, CA');
    const [email, setEmail] = useState('');
    const [nameField, setNameField] = useState('');
    const [phone, setPhone] = useState('');
    const [showNeedsDropdown, setShowNeedsDropdown] = useState(false);
    const [showLocsDropdown, setShowLocsDropdown] = useState(false);
    // Autocomplete location search options
    const locationsList = [
        'San Francisco, CA', 'San Jose, CA', 'Oakland, CA', 'Los Angeles, CA', 'San Diego, CA',
        'Seattle, WA', 'Portland, OR', 'Austin, TX', 'Dallas, TX', 'Houston, TX',
        'Chicago, IL', 'New York, NY', 'Boston, MA', 'Atlanta, GA', 'Miami, FL',
        'Denver, CO', 'Phoenix, AZ', 'Las Vegas, NV', 'Philadelphia, PA', 'Washington, DC'
    ];

    const getRoutineOptions = () => {
        const cat = categoryName.toLowerCase();
        if (cat.includes('restaurant')) {
            return ['Office Lunch Catering', 'Happy Hour Corporate Event', 'Team Dinner Reservation', 'Executive Buffet Setup', 'Daily Meal Box Delivery'];
        }
        if (cat.includes('home') || cat.includes('garden')) {
            return ['Commercial Pipe Inspection', 'Office Lighting Retrofit', 'Routine HVAC Servicing', 'Junk Clear-out & Moving', 'Routine Facility Cleaning'];
        }
        if (cat.includes('auto')) {
            return ['Corporate Fleet Detailing', 'Fleet Brake Inspection', 'Routine Synthetic Oil Change', 'Towing & Roadside Contracts', 'Vehicle Delivery Inspection'];
        }
        if (cat.includes('health') || cat.includes('beauty')) {
            return ['Corporate Massage Wellness Day', 'Employee Chiropractic Session', 'Direct Dental Wellness Audit', 'Corporate Spa Day Retreat'];
        }
        if (cat.includes('travel') || cat.includes('activities')) {
            return ['Corporate Retreat Coordination', 'VIP Airport Transfer Booking', 'Team Mini Golf Excursion', 'Hotel Room Block Negotiation'];
        }
        return ['Bulk Document Shredding', 'Dry Cleaning Pick-up Setup', 'Commercial Shredding Services', 'Office Pest Control Treatment'];
    };

    const filteredLocs = locationsList.filter(l => l.toLowerCase().includes(location.toLowerCase()));
    const filteredNeeds = getRoutineOptions().filter(n => n.toLowerCase().includes(serviceNeed.toLowerCase()));


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/leads/submit', {
            name: nameField || 'Local Customer',
            email: email,
            phone: phone,
            service_needed: serviceNeed || name,
            location: location,
            source_page: `subcategory-${slug}`
        }, {
            onSuccess: () => setLeadSubmitted(true)
        });
    };

    // Dynamically tailor copy, reviews, and news based on categoryName
    const getTailoredContent = () => {
        const cat = categoryName.toLowerCase();
        
        if (cat.includes('restaurant')) {
            return {
                tagline: `Find the best local restaurants, cafes, food trucks, and catering services near you — based on real reviews, ratings, and cuisine type.`,
                pillars: {
                    c: { title: 'Real Reviews', desc: 'Honest ratings from actual diners, office catering managers, and event coordinators.' },
                    i: { title: 'Compare Easily', desc: 'Full menus, pricing tiers, catering capacity, and delivery areas at a glance.' },
                    s: { title: 'Book Fast', desc: 'Confirm catering orders or group reservations directly with the restaurant.' }
                },
                benefits: [
                    { title: 'Catering on Your Schedule', desc: 'Same-day and advance catering options for team lunches, client dinners, and corporate events.' },
                    { title: 'Dietary Requirements Met', desc: 'Request vegan, halal, gluten-free, or nut-free menus with ease.' },
                    { title: 'No Hidden Booking Fees', desc: 'Connect directly with local restaurants and caterers at their real rates.' },
                    { title: 'Verified Food Safety', desc: 'We surface active health inspection scores and food handling certifications.' }
                ],
                reviews: [
                    {
                        user: 'Claire Thompson', role: 'Office Manager, CloudScale', rating: 5, date: 'Yesterday', helpfulCount: 12,
                        comment: `Ordered catering for our all-hands meeting — 50 people, multiple dietary needs. The restaurant coordinated everything perfectly and arrived 20 minutes early to set up. Zero stress on our end.`
                    },
                    {
                        user: 'Dave Patterson', role: 'Operations Lead, Pioneer Group', rating: 5, date: '3 days ago', helpfulCount: 8,
                        comment: `We do weekly client lunches through Bizztopia now. The selection is great, delivery is always on time, and the food quality has never once disappointed us.`
                    },
                    {
                        user: 'Renata Rossi', role: 'Founder, Rossi Consulting', rating: 4, date: '1 week ago', helpfulCount: 4,
                        comment: `Much easier than coordinating by phone. Found a great lunch spot within two minutes, placed a group order, and got a confirmation straight away.`
                    }
                ],
                news: [
                    {
                        title: 'How to Pick the Right Caterer for a Corporate Event',
                        excerpt: 'From headcount estimates to setup logistics — a practical checklist for stress-free office catering.',
                        readTime: '5 min read', date: 'Aug 28, 2026',
                        img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'What to Look for in a Restaurant Health Inspection Score',
                        excerpt: 'Understanding health grades, what each violation means, and how to read a food safety report before you order.',
                        readTime: '4 min read', date: 'Aug 24, 2026',
                        img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'The Best Delivery-Friendly Office Lunch Formats in 2026',
                        excerpt: 'Individually boxed meals, family-style spreads, and interactive food bars — what works for different team sizes.',
                        readTime: '3 min read', date: 'Aug 18, 2026',
                        img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('home') || cat.includes('garden')) {
            return {
                tagline: `Find licensed, insured contractors, plumbers, electricians, and home repair pros in your neighborhood — compare quotes before you commit.`,
                pillars: {
                    c: { title: 'Licensed & Insured', desc: 'All listed contractors carry active state licenses, bonding, and minimum liability insurance.' },
                    i: { title: 'Real Work Photos', desc: 'Browse authentic before-and-after photos, completed job galleries, and verified client ratings.' },
                    s: { title: 'Get Quotes Fast', desc: 'Receive up to 3 competing estimates for your job — no obligation, no hidden fees.' }
                },
                benefits: [
                    { title: 'Licensed & Insured', desc: 'Many contractors carry liability insurance and bonding — always confirm coverage details before work begins.' },
                    { title: 'Written Quotes Upfront', desc: 'Get itemized quotes in writing before any work starts so you know exactly what you are paying for.' },
                    { title: 'Transparent Pricing', desc: 'Compare rates from multiple local businesses before committing — no surprise charges after the job.' },
                    { title: 'Emergency Services Available', desc: 'Some contractors offer urgent or same-day service for plumbing, electrical, and HVAC — check availability when you inquire.' }
                ],
                reviews: [
                    {
                        user: 'Arthur Vance', role: 'Property Manager, Brickstone Co', rating: 5, date: '2 days ago', helpfulCount: 18,
                        comment: `Needed an urgent repair at one of our rental units. Bizztopia found a licensed contractor who showed up same afternoon, gave a fair quote, and completed the work cleanly. Exactly what property managers need.`
                    },
                    {
                        user: 'Samantha Miller', role: 'Business Owner / Homeowner', rating: 5, date: '5 days ago', helpfulCount: 11,
                        comment: `The plumber I found was punctual, diagnosed the issue quickly, and came in under the estimate. Refreshingly straightforward.`
                    },
                    {
                        user: 'Robert Chen', role: 'Office Facilities Coordinator', rating: 4, date: '2 weeks ago', helpfulCount: 3,
                        comment: `Reliable electrician, fully licensed. Completed our office panel upgrade on schedule with no disruption to business hours.`
                    }
                ],
                news: [
                    {
                        title: 'Preventative Maintenance Checklist for Small Business Owners',
                        excerpt: 'How to schedule routine inspections for HVAC, electrical, plumbing, and roofing before issues become expensive.',
                        readTime: '6 min read', date: 'Aug 29, 2026',
                        img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'How to Read a Contractor License and Why It Matters',
                        excerpt: 'Breaking down state license classes, bonding requirements, and how to verify a contractor before signing anything.',
                        readTime: '5 min read', date: 'Aug 22, 2026',
                        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Office Renovation on a Budget: What to Prioritize',
                        excerpt: 'Smart upgrades that improve comfort, energy efficiency, and employee satisfaction without overspending.',
                        readTime: '3 min read', date: 'Aug 15, 2026',
                        img: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('auto')) {
            return {
                tagline: `Find ASE-certified mechanics, auto detailers, body shops, and fleet maintenance services near you — compare reviews and book with confidence.`,
                pillars: {
                    c: { title: 'ASE Certified', desc: 'Active ASE certifications, state auto repair licenses, and verified parts warranties.' },
                    i: { title: 'Transparent Pricing', desc: 'Standard rate sheets, diagnostic summaries, and honest customer feedback before you book.' },
                    s: { title: 'Book & Confirm', desc: 'Schedule service appointments and receive confirmations directly from the shop.' }
                },
                benefits: [
                    { title: 'Certified Technicians', desc: 'Look for ASE certifications on each shop\'s profile — credentials are listed per business so you can compare before booking.' },
                    { title: 'Ask About Warranties', desc: 'Many shops offer parts and labor warranties on repair work — confirm terms directly with the business before you commit.' },
                    { title: 'Fleet Accounts Available', desc: 'Some shops offer volume rates for businesses managing multiple vehicles or delivery fleets — ask when you request a quote.' },
                    { title: 'Pick-up & Drop-off Service', desc: 'Many shops offer vehicle collection and return — check availability in the business listing or when you inquire.' }
                ],
                reviews: [
                    {
                        user: 'Jerry Kowalski', role: 'Logistics Manager, FleetRunner Inc', rating: 5, date: '3 days ago', helpfulCount: 15,
                        comment: `We brought in three delivery vans for brake and suspension work. All repaired within 24 hours, honest pricing, no upsells. Our fleet runs smooth again.`
                    },
                    {
                        user: 'Amanda Sterling', role: 'Regional Sales Manager', rating: 5, date: '1 week ago', helpfulCount: 7,
                        comment: `Booked a full detail and service for my company car. The shop communicated every step, finished early, and the car looked showroom clean. Will use again.`
                    },
                    {
                        user: 'Tom Hughes', role: 'Small Business Owner', rating: 4, date: '10 days ago', helpfulCount: 2,
                        comment: `Good experience comparing local shops through Bizztopia. Ended up choosing based on reviews and they matched the quote exactly.`
                    }
                ],
                news: [
                    {
                        title: 'How to Set Up a Fleet Maintenance Schedule That Prevents Breakdowns',
                        excerpt: 'Oil change intervals, tire rotation timing, and brake inspection schedules for commercial vehicles.',
                        readTime: '7 min read', date: 'Aug 27, 2026',
                        img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Red Flags When Choosing a Mechanic',
                        excerpt: 'Verbal-only quotes, vague warranties, and refusing to show parts — what to watch for before handing over your keys.',
                        readTime: '5 min read', date: 'Aug 20, 2026',
                        img: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Is Ceramic Coating Worth It for Business Vehicles?',
                        excerpt: 'A practical cost-benefit breakdown for small business owners managing company cars or branded vehicles.',
                        readTime: '3 min read', date: 'Aug 14, 2026',
                        img: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('health') || cat.includes('beauty')) {
            return {
                tagline: `Find board-certified doctors, dentists, chiropractors, therapists, and wellness clinics near you — book with confidence.`,
                pillars: {
                    c: { title: 'Licensed Providers', desc: 'Board-certified practitioners with active state licenses and clean disciplinary records.' },
                    i: { title: 'Real Patient Reviews', desc: 'Honest ratings, specialization details, and appointment availability before you book.' },
                    s: { title: 'Book Appointments', desc: 'Confirm consultations and wellness checkups directly through the clinic.' }
                },
                benefits: [
                    { title: 'State-Licensed Practitioners', desc: 'Every provider listed has an active, verifiable state medical or wellness license.' },
                    { title: 'Privacy-First Approach', desc: 'Patient information is handled with strict privacy and data protection standards.' },
                    { title: 'Clean, Inspected Facilities', desc: 'Clinics and wellness studios maintain current health and safety compliance standards.' },
                    { title: 'Insurance Accepted', desc: 'Many providers accept major PPO and HMO plans — confirm directly with the practice.' }
                ],
                reviews: [
                    {
                        user: 'Dr. Evelyn Harris', role: 'HR Director, HealthFirst Corp', rating: 5, date: 'Yesterday', helpfulCount: 22,
                        comment: `Set up a corporate chiropractic wellness program for 35 employees. The clinic was professional, flexible with scheduling, and the team genuinely felt better after just a few sessions.`
                    },
                    {
                        user: 'James Henderson', role: 'Wellness Coordinator, Capital One SF', rating: 5, date: '4 days ago', helpfulCount: 14,
                        comment: `Brought in a mobile massage team for our employee appreciation day. Fully certified, completely professional, and every single person loved it.`
                    },
                    {
                        user: 'Sophia Loren', role: 'HR Consultant', rating: 4, date: '1 week ago', helpfulCount: 6,
                        comment: `Easy to compare clinics side by side. Credentials were fully listed which made compliance sign-off straightforward.`
                    }
                ],
                news: [
                    {
                        title: 'How to Build a Corporate Wellness Program That Actually Works',
                        excerpt: 'Practical strategies for offering chiropractic care, massage therapy, and dental benefits to retain top talent.',
                        readTime: '5 min read', date: 'Aug 30, 2026',
                        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'What Questions to Ask Before Choosing a Dentist or Doctor',
                        excerpt: 'Credentials to verify, questions about insurance acceptance, and appointment wait times to compare.',
                        readTime: '6 min read', date: 'Aug 21, 2026',
                        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'How Bizztopia Verifies Health & Wellness Provider Credentials',
                        excerpt: 'Our process for tracking board certifications, state medical licenses, and disciplinary records.',
                        readTime: '3 min read', date: 'Aug 16, 2026',
                        img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('travel') || cat.includes('activities') || cat.includes('inspire')) {
            return {
                tagline: `Find verified event coordinators, hotels, charter transport, and activity organizers for corporate retreats and business travel.`,
                pillars: {
                    c: { title: 'Connect', desc: 'Fully licensed travel partners, safety certification checks, and insured operators.' },
                    i: { title: 'Identify', desc: 'Detailed itinerary reviews, venue capacities, and peer experiences.' },
                    s: { title: 'Serve', desc: 'Book group rates and reserve transport schedules in under 6 hours.' }
                },
                benefits: [
                    { title: 'Licensed Operators', desc: 'Look for active licenses and insurance on each charter, hotel, or activity listing — details are shown per business.' },
                    { title: 'Safety Compliance', desc: 'Check transport and equipment details directly with each provider before booking group travel.' },
                    { title: 'Group Rates Available', desc: 'Many venues and transport providers offer discounts for bulk or group bookings — ask about rates when you inquire.' },
                    { title: 'Direct Business Contact', desc: 'Reach out to businesses directly through Bizztopia to manage bookings, changes, or cancellations.' }
                ],
                reviews: [
                    {
                        user: 'Lucas Graham', role: 'HR Lead, FinTech Solutions', rating: 5, date: '3 days ago', helpfulCount: 9,
                        comment: `Outstanding corporate retreat planning! Bizztopia matched us with a verified travel partner who organized our flights, hotel blocks, and team excursions flawlessly.`
                    },
                    {
                        user: 'Nadia Petrova', role: 'Event Coordinator, GlobalTech', rating: 5, date: '1 week ago', helpfulCount: 5,
                        comment: `Verified transport vehicles arrived clean, comfortable, and exactly on schedule. The driver was professional and knew the best routes to the conference hall.`
                    },
                    {
                        user: 'Chris Peterson', role: 'Director of Marketing', rating: 4, date: '2 weeks ago', helpfulCount: 1,
                        comment: `Reliable hotel block negotiation. The rates they found were far better than what we could find online.`
                    }
                ],
                news: [
                    {
                        title: 'How to Plan a Stress-Free Corporate Retreat',
                        excerpt: 'Step-by-step guidelines for coordinating transport, booking hotels, and planning team excursions.',
                        readTime: '6 min read', date: 'Aug 26, 2026',
                        img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Corporate Travel Insurance: Vetting Policies & Exclusions',
                        excerpt: 'What to look for in travel policies, trip cancellation protection, and emergency medical options.',
                        readTime: '5 min read', date: 'Aug 19, 2026',
                        img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Top Destination Trends for Business Excursions in Q4',
                        excerpt: 'Discover popular local venues, mini golf spots, and beaches offering premium corporate retreat packages.',
                        readTime: '4 min read', date: 'Aug 12, 2026',
                        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        // Default / "More"
        return {
            tagline: `Find dry cleaners, fitness centers, moving companies, storage facilities, and other local services that keep your business running smoothly.`,
            pillars: {
                c: { title: 'Trusted Businesses', desc: 'Active service licenses, insurance coverage, and customer ratings all in one place.' },
                i: { title: 'Compare Options', desc: 'Transparent rates, facility details, and verified reviews from real customers.' },
                s: { title: 'Get Service Booked', desc: 'Send a quote request and confirm your booking directly with the business.' }
            },
            benefits: [
                { title: 'Locally Operated', desc: 'All listed businesses are independently operated and serve your local area.' },
                { title: 'Business Account Rates', desc: 'Many providers offer recurring account pricing for regular bookings.' },
                { title: 'Reliable Turnaround', desc: 'Set clear expectations upfront — most businesses confirm timelines at booking.' },
                { title: 'Secure Facilities', desc: 'Storage and facility-based services meet current safety and compliance standards.' }
            ],
            reviews: [
                {
                    user: 'William Thorne', role: 'Facilities Lead, Apex Offices', rating: 5, date: 'Yesterday', helpfulCount: 16,
                    comment: `Outstanding service. We matched with a verified junk removal service to clean out our warehouse. They arrived with three trucks and finished the entire job in 4 hours.`
                },
                {
                    user: 'Beatrice Vance', role: 'Operations Assistant', rating: 5, date: '6 days ago', helpfulCount: 10,
                    comment: `Highly recommend the corporate laundry account we set up through Bizztopia. Our dry cleaning is picked up every Monday and returned fresh by Wednesday. Pure convenience.`
                },
                {
                    user: 'Greg Norman', role: 'Gym Manager', rating: 4, date: '2 weeks ago', helpfulCount: 3,
                    comment: `Easy coordination for corporate gym memberships. The provider matches made contract terms transparent.`
                }
            ],
            news: [
                {
                    title: 'How to Find a Reliable Dry Cleaner for Business Attire',
                    excerpt: 'What to look for in fabric care standards, turnaround times, and pricing before you choose a regular cleaner.',
                    readTime: '4 min read', date: 'Aug 29, 2026',
                    img: 'https://images.unsplash.com/photo-1521566624976-7357306c5458?auto=format&fit=crop&w=300&q=80'
                },
                {
                    title: 'Planning a Stress-Free Office Relocation',
                    excerpt: 'How to coordinate movers, manage equipment packing, and keep your team productive during an office move.',
                    readTime: '6 min read', date: 'Aug 23, 2026',
                    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80'
                },
                {
                    title: 'Corporate Gym Memberships: Are They Worth It?',
                    excerpt: 'Breaking down the ROI of employee fitness benefits, from reduced sick days to higher morale and retention.',
                    readTime: '3 min read', date: 'Aug 17, 2026',
                    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80'
                }
            ]
        };
    };

    const getHeroBg = () => {
        if (subcatImages.length > 0 && subcatImages[0]?.url) {
            return subcatImages[0].url;
        }
        const cat = categoryName.toLowerCase();
        if (cat.includes('restaurant')) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80';
        if (cat.includes('home') || cat.includes('garden')) return 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1920&q=80';
        if (cat.includes('auto')) return 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80';
        if (cat.includes('health') || cat.includes('beauty')) return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80';
        if (cat.includes('travel') || cat.includes('activities')) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80';
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
    };

    const content = getTailoredContent();

    const displayNews = (articles && articles.length > 0)
        ? articles.map((a, idx) => ({
            title: a.title,
            excerpt: a.subtitle || a.excerpt,
            readTime: a.reading_time || '4 min read',
            date: new Date(a.published_at || a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            img: a.hero_image || subcatImages[idx + 5]?.url || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
            slug: a.slug
          }))
        : (content.news || []);

    return (
        <AppLayout>
            <Head title={`Best ${name} Near ${location} — Bizztopia`} />

            {/* Sub-Navigation Categories Line */}
            <div className="bg-[#0B4778] border-b border-white/10 px-8 py-2.5 flex items-center justify-center gap-8 text-xs font-bold text-slate-200/90 z-20">
                <Link href="/" className="hover:text-[#287FBA] flex items-center gap-1.5 transition-colors">Directory Home</Link>
                <ChevronRight className="w-3 h-3 opacity-50" />
                <span className="text-slate-300 font-bold">{categoryName}</span>
                <ChevronRight className="w-3 h-3 opacity-50" />
                <span className="text-[#287FBA] font-extrabold">{name}</span>
            </div>

            {/* 1. HERO SECTION with VISIBLE BACKGROUND IMAGE */}
            <section className="text-white py-16 px-6 relative overflow-hidden border-b border-[#287FBA]/25">
                {/* Visible Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ backgroundImage: `url('${getHeroBg()}')` }}
                />
                {/* Overlay allowing image to stay clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/85 via-[#0B4778]/75 to-[#287FBA]/65 z-0" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] z-0" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    
                    {/* Left: Headline & C-I-S Value Pillars */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="bg-[#287FBA]/40 border border-[#287FBA]/40 text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full inline-block font-bold">
                                Local Business Directory
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight mt-4 font-bold">
                                Top-Rated {name} <br />Services Near {location.split(',')[0]}
                            </h1>
                            <p className="text-[#D5EBF8] text-base font-medium mt-3 max-w-xl">
                                {content.tagline}
                            </p>
                        </div>

                        {/* C-I-S Bullet Pillars */}
                        <div className="space-y-4 max-w-lg">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#287FBA] flex items-center justify-center shrink-0">
                                    <UserCheck className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#287FBA] flex items-center gap-1.5 font-bold">{content.pillars.c.title}</h4>
                                    <p className="text-[#D5EBF8] text-xs font-medium mt-0.5">{content.pillars.c.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#287FBA] flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#287FBA] flex items-center gap-1.5 font-bold">{content.pillars.i.title}</h4>
                                    <p className="text-[#D5EBF8] text-xs font-medium mt-0.5">{content.pillars.i.desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-[#287FBA] flex items-center justify-center shrink-0">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-[#287FBA] flex items-center gap-1.5 font-bold">{content.pillars.s.title}</h4>
                                    <p className="text-[#D5EBF8] text-xs font-medium mt-0.5">{content.pillars.s.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Lead Capture Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl relative">
                            <h3 className="text-xl font-black font-outfit tracking-tight text-slate-950 mb-1 font-bold">Request a Free Quote</h3>
                            <p className="text-slate-500 text-xs font-medium mb-6">Tell us what you need and we'll connect you with the right local {name.toLowerCase()} businesses in your area.</p>

                            {leadSubmitted ? (
                                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-black font-outfit text-slate-950 font-bold">Request Submitted!</h4>
                                    <p className="text-slate-600 text-xs font-medium max-w-sm mx-auto">
                                        We've received your request and are connecting you with top-rated {name.toLowerCase()} businesses nearby. Expect to hear back shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    {/* Searchable Service Needs Dropdown */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">What do you need help with?</label>
                                        <input 
                                            type="text" 
                                            placeholder={`e.g. routine ${name.toLowerCase()} work`} 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                            value={serviceNeed}
                                            onChange={(e) => {
                                                setServiceNeed(e.target.value);
                                                setShowNeedsDropdown(true);
                                            }}
                                            onFocus={() => setShowNeedsDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowNeedsDropdown(false), 200)}
                                            required
                                        />
                                        {showNeedsDropdown && filteredNeeds.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto z-50 text-left">
                                                {filteredNeeds.map((need, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => {
                                                            setServiceNeed(need);
                                                            setShowNeedsDropdown(false);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#287FBA] transition-colors border-b border-slate-100 last:border-0 text-left cursor-pointer"
                                                    >
                                                        {need}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Searchable Locations Dropdown */}
                                    <div className="space-y-1 relative">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Location</label>
                                        <input 
                                            type="text" 
                                            placeholder="San Francisco, CA" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                                setShowLocsDropdown(true);
                                            }}
                                            onFocus={() => setShowLocsDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowLocsDropdown(false), 200)}
                                            required
                                        />
                                        {showLocsDropdown && filteredLocs.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto z-50 text-left">
                                                {filteredLocs.map((loc, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => {
                                                            setLocation(loc);
                                                            setShowLocsDropdown(false);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#287FBA] transition-colors border-b border-slate-100 last:border-0 text-left cursor-pointer"
                                                    >
                                                        {loc}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Your Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="Name" 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                                value={nameField}
                                                onChange={(e) => setNameField(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                placeholder="(555) 000-0000" 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="your@email.com" 
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-3.5 rounded-xl font-bold transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 text-xs font-bold">
                                        Get a Free Quote <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. BODY SECTION (Reviews & Benefits Split) */}
            <section className="bg-slate-50 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left side: Partner/Pro Reviews */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
                            <h2 className="text-2xl font-black font-outfit text-slate-950 tracking-tight flex items-center gap-2 font-bold">
                                <MessageSquare className="w-6 h-6 text-[#287FBA]" /> Client Feedback & Reviews
                            </h2>
                            <p className="text-slate-500 text-xs font-medium mt-1">Verified testimonials from businesses matched with local {name.toLowerCase()} pros.</p>
                        </div>

                        <div className="space-y-6">
                            {content.reviews.map((review, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[#0B4778] font-outfit text-sm uppercase">
                                                {review.user.substring(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">{review.user}</h4>
                                                <span className="text-[10px] text-[#287FBA] font-bold">{review.role}</span>
                                            </div>
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-400">{review.date}</div>
                                    </div>
                                    <div className="flex text-[#287FBA] gap-0.5 mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3.5 h-3.5 fill-[#287FBA] ${i < review.rating ? 'text-[#287FBA]' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-xs font-medium leading-relaxed mt-3">"{review.comment}"</p>
                                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-[11px] font-bold text-slate-400">
                                        <button className="hover:text-[#287FBA] transition-colors flex items-center gap-1.5 cursor-pointer font-bold">
                                            Helpful ({review.helpfulCount})
                                        </button>
                                        <span className="text-slate-300 font-normal">Report</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Benefits Bullet Points */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-black font-outfit text-slate-950 font-bold">Why Use Bizztopia?</h3>
                            <p className="text-slate-400 text-xs font-medium mt-0.5">Real reviews, real businesses, real confidence.</p>
                        </div>

                        <ul className="space-y-4">
                            {content.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-900">{benefit.title}</h5>
                                        <p className="text-[11px] text-slate-500 font-medium">{benefit.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Phone Call Box */}
                        <div className="bg-[#EAF5FC] border border-[#287FBA]/25 p-4 rounded-2xl flex items-center justify-between gap-4">
                            <div>
                                <h4 className="text-xs font-bold text-[#0B4778]">Need custom help?</h4>
                                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Call our support desk directly.</p>
                            </div>
                            <a href="tel:18005550199" className="w-9 h-9 bg-[#287FBA] text-white rounded-xl flex items-center justify-center shrink-0 hover:bg-[#0B4778] transition-colors shadow-xs">
                                <PhoneCall className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2.5 VERIFIED 30-PHOTO LOCAL WORK & PROJECT SHOWCASE */}
            {subcatImages.length > 0 && (
                <section className="bg-white py-16 px-6 border-b border-slate-200/80">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">
                                    Local Business Gallery ({subcatImages.length} Photos)
                                </span>
                                <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight mt-1 font-bold">
                                    Real Work from Local {name} Businesses
                                </h2>
                                <p className="text-slate-500 text-xs font-medium mt-1">
                                    Photos from real {name.toLowerCase()} businesses and service providers in your area.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">
                                <Sparkles className="w-4 h-4 text-[#287FBA]" />
                                <span>30 HD Photos Authenticated</span>
                            </div>
                        </div>

                        {/* Photo Grid with Zoomable cards & photographer credits */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {subcatImages.slice(0, 18).map((imgItem, idx) => (
                                <div 
                                    key={imgItem.id || idx}
                                    className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                                >
                                    <img 
                                        src={imgItem.thumb || imgItem.url} 
                                        alt={imgItem.alt || `${name} work photo ${idx + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 flex flex-col justify-end">
                                        <p className="text-[10px] font-bold text-white line-clamp-1">
                                            {imgItem.alt || `${name} Pro`}
                                        </p>
                                        <span className="text-[9px] text-[#8FC7E8] font-medium">
                                            Photo: {imgItem.photographer}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Secondary row showing up to 30 images */}
                        {subcatImages.length > 18 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
                                {subcatImages.slice(18, 30).map((imgItem, idx) => (
                                    <div 
                                        key={imgItem.id || (idx + 18)}
                                        className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <img 
                                            src={imgItem.thumb || imgItem.url} 
                                            alt={imgItem.alt || `${name} work photo ${idx + 19}`}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 flex flex-col justify-end">
                                            <p className="text-[10px] font-bold text-white line-clamp-1">
                                                {imgItem.alt || `${name} Pro`}
                                            </p>
                                            <span className="text-[9px] text-[#8FC7E8] font-medium">
                                                Photo: {imgItem.photographer}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. NEWS RELATED TO LANDING PAGE */}
            <section className="bg-white py-16 px-6 border-t border-slate-100">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="text-center max-w-xl mx-auto">
                        <span className="text-[#287FBA] text-xs font-black uppercase tracking-widest block font-bold">
                            Bizztopia Insights
                        </span>
                        <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight mt-1 font-bold">
                            Articles & News Related to {name}
                        </h2>
                        <p className="text-slate-500 text-xs font-medium mt-2">
                            Stay informed with the latest insights, strategies, and industry alerts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayNews.map((news, idx) => (
                            <article key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
                                <div>
                                    <div className="h-48 overflow-hidden bg-slate-200 relative">
                                        <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5 space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#287FBA] font-bold">
                                            <span>{news.readTime}</span>
                                            <span className="text-slate-400 font-semibold">{news.date}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#287FBA] transition-colors leading-snug line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3 mt-2">
                                            {news.excerpt}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-5 pb-5 pt-2 border-t border-[#EAF5FC]">
                                    <Link href={news.slug ? `/ideas/${news.slug}` : "/ideas"} className="text-xs font-extrabold text-[#287FBA] hover:text-[#0B4778] transition-colors flex items-center gap-1.5 font-bold">
                                        Read Article <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. ARE YOU A PRO? CTA SECTION */}
            <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#287fba_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#287FBA]/20 border border-[#287FBA]/40 flex items-center justify-center mx-auto text-[#287FBA]">
                        <Award className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight font-bold">
                        Are You a Local {name} Business?
                    </h2>
                    <p className="text-slate-300 text-sm font-medium max-w-xl mx-auto">
                        List your {name.toLowerCase()} business on Bizztopia and connect with customers actively searching for your services in your local area.
                    </p>
                    <div className="pt-4">
                        <Link 
                            href="/value" 
                            className="bg-[#287FBA] hover:bg-[#0B4778] text-white px-8 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2 cursor-pointer font-bold"
                        >
                            Join Bizztopia for Business <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
