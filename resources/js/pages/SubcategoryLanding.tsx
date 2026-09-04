import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
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
    const [subcatImages, setSubcatImages] = useState<any[]>([]);

    useEffect(() => {
        import('@/data/subcategory_images.json').then((mod) => {
            if (mod && mod.default) {
                setSubcatImages((mod.default as any)[slug] || []);
            }
        }).catch(() => {});
    }, [slug]);

    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [serviceNeed, setServiceNeed] = useState('');
    const [location, setLocation] = useState('San Francisco, CA');
    const [email, setEmail] = useState('');
    const [nameField, setNameField] = useState('');
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
                tagline: `Instantly match with top-rated local dining, takeout, and catering teams. Satisfy your team or event with vetted culinary pros.`,
                pillars: {
                    c: { title: 'Connect', desc: 'Vetted hygiene scores, active health permits, and verified customer ratings.' },
                    i: { title: 'Identify', desc: 'Full menus, catering capacity guides, and honest peer feedback.' },
                    s: { title: 'Serve', desc: 'Get catering bids or group bookings confirmed in under 2 hours.' }
                },
                benefits: [
                    { title: 'Corporate Catering SLA', desc: 'Guaranteed on-time setup for office meetings or business events.' },
                    { title: 'Food Quality Promise', desc: 'We verify ingredient sourcing and safety compliance files.' },
                    { title: 'Customized Menu Planning', desc: 'Support for vegan, gluten-free, and corporate dietary needs.' },
                    { title: 'No Booking Fees', desc: 'Connect directly with local restaurants and food trucks.' }
                ],
                reviews: [
                    {
                        user: 'Claire Thompson', role: 'Event Manager, CloudScale', rating: 5, date: 'Yesterday', helpfulCount: 12,
                        comment: `Bizztopia matched us with a fantastic provider for our corporate gala. The food was incredible, dietary needs were met perfectly, and setup was seamless.`
                    },
                    {
                        user: 'Dave Patterson', role: 'COO, Pioneer Growth', rating: 5, date: '3 days ago', helpfulCount: 8,
                        comment: `Excellent service. We routinely order client lunches through these vetted local dining partners. The delivery is punctual and quality is always top-notch.`
                    },
                    {
                        user: 'Renata Rossi', role: 'Founder, Rossi Group', rating: 4, date: '1 week ago', helpfulCount: 4,
                        comment: `Very easy to match and coordinate group lunch boxes for our quarterly sprint. Saved us hours of calling around.`
                    }
                ],
                news: [
                    {
                        title: 'Corporate Catering Guide: Feeding High-Performance Teams',
                        excerpt: 'Best practices for ordering office lunches, configuring dietary choices, and calculating portions.',
                        readTime: '5 min read', date: 'Aug 28, 2026',
                        img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Health & Hygiene Standards: What to Look for in Vetted Dining',
                        excerpt: 'How Bizztopia monitors local food handling certifications, health inspection reports, and licenses.',
                        readTime: '4 min read', date: 'Aug 24, 2026',
                        img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Top 10 Trending Office Lunch Formats for Fall 2026',
                        excerpt: 'From poke bowls to interactive taco bars, check out the popular business catering formats of the quarter.',
                        readTime: '3 min read', date: 'Aug 18, 2026',
                        img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('home') || cat.includes('garden')) {
            return {
                tagline: `Match with licensed, bonded, and vetted contractors, plumbers, and home repair professionals in your neighborhood.`,
                pillars: {
                    c: { title: 'Connect', desc: '100% verified state licenses, insurance certificates, and active bonding files.' },
                    i: { title: 'Identify', desc: 'Detailed past project galleries, itemized pricing references, and client ratings.' },
                    s: { title: 'Serve', desc: 'Get up to 3 competitive contracting estimates in under 24 hours.' }
                },
                benefits: [
                    { title: 'Bonded & Insured Pros', desc: 'All matching pros carry minimum $1M general liability coverage.' },
                    { title: '$1,000 Damage Protection', desc: 'Bizztopia covers up to $1k of work disputes or property damage.' },
                    { title: 'Transparent Cost Estimates', desc: 'Itemized billing and clear contract specs on all project bids.' },
                    { title: 'Emergency Dispatch', desc: 'On-site service technicians available within 4 hours for urgent calls.' }
                ],
                reviews: [
                    {
                        user: 'Arthur Vance', role: 'Property Manager, Brickstone Co', rating: 5, date: '2 days ago', helpfulCount: 18,
                        comment: `Matched with a stellar contractor team to handle building repairs. They were professional, fully bonded, and cleaned up the site perfectly. Highly recommend!`
                    },
                    {
                        user: 'Samantha Miller', role: 'Homeowner / SMB Owner', rating: 5, date: '5 days ago', helpfulCount: 11,
                        comment: `The plumber we found via Bizztopia arrived on time, diagnosed the leak in 10 minutes, and replaced the pipe work under budget. Absolute lifesaver.`
                    },
                    {
                        user: 'Robert Chen', role: 'Office Coordinator', rating: 4, date: '2 weeks ago', helpfulCount: 3,
                        comment: `Reliable electrician service. Vetted credentials made it easy to get compliance signing for our office rewiring project.`
                    }
                ],
                news: [
                    {
                        title: 'Preventative Building Maintenance: Checklist for SMBs',
                        excerpt: 'How to manage roof inspections, electrical loads, and plumbing fixtures to prevent costly repairs.',
                        readTime: '6 min read', date: 'Aug 29, 2026',
                        img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Understanding Contracting Licenses and Liability Insurance',
                        excerpt: 'Why background checking contractor bonds is essential before signing office remodeling agreements.',
                        readTime: '5 min read', date: 'Aug 22, 2026',
                        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Vetting Local Handymen: Bizztopia Compliance Audit Process',
                        excerpt: 'An inside look at our monthly compliance checks for independent service providers.',
                        readTime: '3 min read', date: 'Aug 15, 2026',
                        img: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('auto')) {
            return {
                tagline: `Match with certified auto mechanics, detailers, and fleet maintenance shops. Keep your vehicles safe and functional.`,
                pillars: {
                    c: { title: 'Connect', desc: 'ASE certified mechanics, state service licenses, and verified parts warranties.' },
                    i: { title: 'Identify', desc: 'Standard service price lists, diagnostic equipment auditing, and client reviews.' },
                    s: { title: 'Serve', desc: 'Get diagnostic quotes and booking schedules confirmed in under 4 hours.' }
                },
                benefits: [
                    { title: 'ASE Certified Specialists', desc: 'All technicians carry active certifications and expert qualifications.' },
                    { title: 'Parts & Labor Warranties', desc: 'Minimum 12-month/12,000-mile warranty on all diagnostic repairs.' },
                    { title: 'Fleet Rates Available', desc: 'Corporate discounts for companies managing multiple transit vehicles.' },
                    { title: 'Valet Service Support', desc: 'Pick-up and drop-off coordination directly from your office lot.' }
                ],
                reviews: [
                    {
                        user: 'Jerry Kowalski', role: 'Logistics Manager, FleetRunner', rating: 5, date: '3 days ago', helpfulCount: 15,
                        comment: `Superb auto shop partnership. They repaired three of our delivery vans in under 24 hours. Minimal downtime, honest pricing. Bizztopia validation was key.`
                    },
                    {
                        user: 'Amanda Sterling', role: 'Regional Sales Manager', rating: 5, date: '1 week ago', helpfulCount: 7,
                        comment: `Got my company car fully detailed and serviced. The booking was scheduled instantly, and the detailing job made the car look brand new.`
                    },
                    {
                        user: 'Tom Hughes', role: 'Business Owner', rating: 4, date: '10 days ago', helpfulCount: 2,
                        comment: `Reliable brake replacement service. The matching system made it simple to compare diagnostic rates between three vetted local shops.`
                    }
                ],
                news: [
                    {
                        title: 'Corporate Fleet Maintenance: Strategies to Reduce Downtime',
                        excerpt: 'How setting up routine oil changes, tire rotations, and safety checkups keeps logistics operating cleanly.',
                        readTime: '7 min read', date: 'Aug 27, 2026',
                        img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Choosing the Right Mechanic: Red Flags to Avoid',
                        excerpt: 'A checklist for reading service quotes, checking ASE licensing, and checking parts manufacturer warranties.',
                        readTime: '5 min read', date: 'Aug 20, 2026',
                        img: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Detailing and Paint Protection for Business Cars',
                        excerpt: 'Why investing in ceramic coatings and regular wash intervals maintains fleet residual values.',
                        readTime: '3 min read', date: 'Aug 14, 2026',
                        img: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('health') || cat.includes('beauty')) {
            return {
                tagline: `Match with licensed wellness clinics, spas, therapists, and medical professionals. Prioritize care and compliance.`,
                pillars: {
                    c: { title: 'Connect', desc: 'Board-certified practitioners, active state medical licenses, and HIPAA compliance.' },
                    i: { title: 'Identify', desc: 'Specialization details, patient treatment ratings, and clean clinic audits.' },
                    s: { title: 'Serve', desc: 'Book consultations and schedule wellness checkups in under 12 hours.' }
                },
                benefits: [
                    { title: 'Licensed Practitioners', desc: 'Every provider is verified through state medical boards and registries.' },
                    { title: 'HIPAA & Privacy Audited', desc: 'Strict data privacy compliance and patient protection practices.' },
                    { title: 'Clean & Safe Environments', desc: 'Routine clinic cleanliness audits and infection control checks.' },
                    { title: 'Insurance Support', desc: 'Direct claim support and pre-auth handling with major carriers.' }
                ],
                reviews: [
                    {
                        user: 'Dr. Evelyn Harris', role: 'Director, HealthFirst Clinic', rating: 5, date: 'Yesterday', helpfulCount: 22,
                        comment: `The specialist we booked for chiropractic therapy has been exemplary. Friendly staff, zero waiting times, and modern diagnostic facilities. Highly recommended.`
                    },
                    {
                        user: 'James Henderson', role: 'Wellness Lead, CapitalOne', rating: 5, date: '4 days ago', helpfulCount: 14,
                        comment: `We matched with a mobile corporate massage pro for employee wellness day. The team was fully certified and did a phenomenal job.`
                    },
                    {
                        user: 'Sophia Loren', role: 'Clinical Consultant', rating: 4, date: '1 week ago', helpfulCount: 6,
                        comment: `Smooth appointment booking. The clinic credentials were fully listed, making compliance reporting simple for our HR team.`
                    }
                ],
                news: [
                    {
                        title: 'Designing Employee Wellness Programs That Work',
                        excerpt: 'How providing massage therapy, chiropractic access, and health checkups boosts workplace morale.',
                        readTime: '5 min read', date: 'Aug 30, 2026',
                        img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'HIPAA Compliance Checklist for Health Service Providers',
                        excerpt: 'Understanding key patient privacy guidelines, data storage policies, and medical licensing requirements.',
                        readTime: '6 min read', date: 'Aug 21, 2026',
                        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                        title: 'Vetting Standard: How Bizztopia Verifies Medical Credentials',
                        excerpt: 'Our rigorous process for tracking board certifications, state medical licenses, and histories.',
                        readTime: '3 min read', date: 'Aug 16, 2026',
                        img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80'
                    }
                ]
            };
        }
        
        if (cat.includes('travel') || cat.includes('activities') || cat.includes('inspire')) {
            return {
                tagline: `Match with vetted event coordinators, hotels, transportation services, and activity organizers for your next venture.`,
                pillars: {
                    c: { title: 'Connect', desc: 'Fully licensed travel partners, safety certification checks, and insured operators.' },
                    i: { title: 'Identify', desc: 'Detailed itinerary reviews, venue capacities, and peer experiences.' },
                    s: { title: 'Serve', desc: 'Book group rates and reserve transport schedules in under 6 hours.' }
                },
                benefits: [
                    { title: 'Licensed Travel Providers', desc: 'All charter, hotel, and activity partners carry active tour licenses.' },
                    { title: 'Safety-Checked Transport', desc: 'Vans, buses, and equipment undergo safety compliance reviews.' },
                    { title: 'Group Rate Optimization', desc: 'Save up to 25% on bulk bookings and corporate retreat planning.' },
                    { title: '24/7 Booking Mediation', desc: 'Bizztopia team handles booking changes and cancellation support.' }
                ],
                reviews: [
                    {
                        user: 'Lucas Graham', role: 'HR Lead, FinTech Solutions', rating: 5, date: '3 days ago', helpfulCount: 9,
                        comment: `Outstanding corporate retreat planning! Bizztopia matched us with a vetted travel partner who organized our flights, hotel blocks, and team excursions flawlessly.`
                    },
                    {
                        user: 'Nadia Petrova', role: 'Event Coordinator, GlobalTech', rating: 5, date: '1 week ago', helpfulCount: 5,
                        comment: `Vetted transport vehicles arrived clean, comfortable, and exactly on schedule. The driver was professional and knew the best routes to the conference hall.`
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
            tagline: `Match with vetted dry cleaners, laundromats, gyms, moving services, and apartments. Elevate your local business operations.`,
            pillars: {
                c: { title: 'Connect', desc: '100% verified service licenses, active insurance coverage, and compliance screening.' },
                i: { title: 'Identify', desc: 'Standard rates, facility hygiene scores, and detailed peer reviews.' },
                s: { title: 'Serve', desc: 'Get matches and schedule service requests confirmed in under 12 hours.' }
            },
            benefits: [
                { title: 'Licensed & Audited Shops', desc: 'Every local provider undergoes rigorous rating history audits.' },
                { title: 'Business Account Rates', desc: 'Enjoy corporate accounts and volume discounts for regular services.' },
                { title: 'Guaranteed Turnaround', desc: 'Vetted SLA guarantees on dry cleaning, moves, or office cleaning.' },
                { title: 'Safe Facility Standards', desc: 'We inspect physical locations to ensure secure storage and operations.' }
            ],
            reviews: [
                {
                    user: 'William Thorne', role: 'Facilities Lead, Apex Offices', rating: 5, date: 'Yesterday', helpfulCount: 16,
                    comment: `Outstanding service. We matched with a vetted junk removal service to clean out our warehouse. They arrived with three trucks and finished the entire job in 4 hours.`
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
                    title: 'Sustainable Fabric Care: Best Practices for Businesses',
                    excerpt: 'Understanding green dry cleaning solvents, garment care labels, and laundering techniques.',
                    readTime: '4 min read', date: 'Aug 29, 2026',
                    img: 'https://images.unsplash.com/photo-1521566624976-7357306c5458?auto=format&fit=crop&w=300&q=80'
                },
                {
                    title: 'Office Relocations: How to Avoid Junk and Stress',
                    excerpt: 'A comprehensive checklist for hiring moving pros, coordinating junk removal, and managing packing schedules.',
                    readTime: '6 min read', date: 'Aug 23, 2026',
                    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80'
                },
                {
                    title: 'Vetting Fitness and Wellness Partners for Corporate Accounts',
                    excerpt: 'What to look for in gym facilities, liability insurance, and personal trainer licensing.',
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
            <Head title={`Best ${name} Services in San Francisco, CA — Bizztopia`} />

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
                                Vetted B2B Directory
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tight leading-tight mt-4 font-bold">
                                Top-Rated {name} <br />Services in San Francisco
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
                            <h3 className="text-xl font-black font-outfit tracking-tight text-slate-950 mb-1 font-bold">Match with Local Pros</h3>
                            <p className="text-slate-500 text-xs font-medium mb-6">Describe your service needs to receive bids from pre-screened partners.</p>

                            {leadSubmitted ? (
                                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-black font-outfit text-slate-950 font-bold">Request Submitted!</h4>
                                    <p className="text-slate-600 text-xs font-medium max-w-sm mx-auto">
                                        We are matching your project with verified {name.toLowerCase()} professionals. Check your inbox for updates shortly.
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
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Email</label>
                                            <input 
                                                type="email" 
                                                placeholder="Email Address" 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#287FBA] focus:outline-none font-bold text-sm text-slate-900"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-[#287FBA] hover:bg-[#0B4778] text-white py-3.5 rounded-xl font-bold transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 text-xs font-bold">
                                        Submit Vetted Match Request <ArrowRight className="w-4 h-4" />
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
                            <h3 className="text-lg font-black font-outfit text-slate-950 font-bold">Why Bizztopia Match?</h3>
                            <p className="text-slate-400 text-xs font-medium mt-0.5">Unmatched standards in pro directories.</p>
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
                                    Verified Media Gallery ({subcatImages.length} HD Photos)
                                </span>
                                <h2 className="text-3xl font-black font-outfit text-slate-950 tracking-tight mt-1 font-bold">
                                    Recent {name} Project & Work Showcase
                                </h2>
                                <p className="text-slate-500 text-xs font-medium mt-1">
                                    Authentic on-site photography from verified {name.toLowerCase()} businesses and service jobs.
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
                        Are You a {name} Provider?
                    </h2>
                    <p className="text-slate-300 text-sm font-medium max-w-xl mx-auto">
                        Grow your B2B contract acquisition. Get listed in Bizztopia's vetted pro matching network and meet clients looking for your expertise.
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
