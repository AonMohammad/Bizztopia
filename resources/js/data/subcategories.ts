import { 
    Utensils, ShoppingBag, Truck, Flame, Sparkles, Coffee, Moon, Disc, Compass, Sun, Cookie, GlassWater, Beer,
    Home, Hammer, Droplets, Zap, Wind, Tv, Key, Paintbrush, Leaf, Sprout, Flower, Trees, Armchair,
    Car, Trash, Stethoscope, Eye, Footprints, Heart, Scissors, Smile, Activity, MapPin,
    Calendar, Book, Flag, Bed, Bike, Tent, Waves, Wrench, MoreHorizontal,
    Shirt, WashingMachine, Building, Dumbbell
} from 'lucide-react';

export interface Subcategory {
    name: string;
    slug: string;
    icon: any;
}

export interface Category {
    name: string;
    slug: string;
    icon: any;
    subcategories: Subcategory[];
}

export const subcategoriesData: Category[] = [
    {
        name: 'Restaurants',
        slug: 'restaurants',
        icon: Utensils,
        subcategories: [
            { name: 'Takeout', slug: 'takeout', icon: ShoppingBag },
            { name: 'Delivery', slug: 'delivery', icon: Truck },
            { name: 'Hot & Trendy', slug: 'hot-trendy', icon: Flame },
            { name: 'New Restaurants', slug: 'new-restaurants', icon: Sparkles },
            { name: 'Breakfast & Brunch', slug: 'breakfast-brunch', icon: Coffee },
            { name: 'Lunch', slug: 'lunch', icon: Utensils },
            { name: 'Dinner', slug: 'dinner', icon: Moon },
            { name: 'Coffee & Cafes', slug: 'coffee-cafes', icon: Coffee },
            { name: 'Pizza', slug: 'pizza', icon: Disc },
            { name: 'Chinese', slug: 'chinese', icon: Compass },
            { name: 'Mexican', slug: 'mexican', icon: Sun },
            { name: 'Bakeries', slug: 'bakeries', icon: Cookie },
            { name: 'Italian', slug: 'italian', icon: GlassWater },
            { name: 'Food Trucks', slug: 'food-trucks', icon: Truck },
            { name: 'Sports Bars & Pubs', slug: 'sports-bars-pubs', icon: Beer },
        ]
    },
    {
        name: 'Home & Garden',
        slug: 'home-garden',
        icon: Home,
        subcategories: [
            { name: 'Contractors & Handymen', slug: 'contractors-handymen', icon: Hammer },
            { name: 'Plumbers', slug: 'plumbers', icon: Droplets },
            { name: 'Electricians', slug: 'electricians', icon: Zap },
            { name: 'Heating & Air Conditioning', slug: 'hvac', icon: Wind },
            { name: 'Appliances and Repair', slug: 'appliances-repair', icon: Tv },
            { name: 'Roofing', slug: 'roofing', icon: Home },
            { name: 'Locksmiths', slug: 'locksmiths', icon: Key },
            { name: 'Painters', slug: 'painters', icon: Paintbrush },
            { name: 'Landscaping', slug: 'landscaping', icon: Leaf },
            { name: 'Nurseries & Gardening', slug: 'nurseries-gardening', icon: Sprout },
            { name: 'Florists', slug: 'florists', icon: Flower },
            { name: 'Tree Services', slug: 'tree-services', icon: Trees },
            { name: 'Home Cleaning', slug: 'home-cleaning', icon: Sparkles },
            { name: 'Furniture Stores', slug: 'furniture-stores', icon: Armchair },
            { name: 'Movers', slug: 'movers', icon: Truck },
        ]
    },
    {
        name: 'Auto Services',
        slug: 'auto-services',
        icon: Car,
        subcategories: [
            { name: 'Auto Repair', slug: 'auto-repair', icon: Wrench },
            { name: 'Body Shops', slug: 'body-shops', icon: Hammer },
            { name: 'Oil Change', slug: 'oil-change', icon: Droplets },
            { name: 'Tires', slug: 'tires', icon: Disc },
            { name: 'Towing', slug: 'towing', icon: Truck },
            { name: 'Car Wash', slug: 'car-wash', icon: Waves },
            { name: 'Auto Detailing', slug: 'auto-detailing', icon: Sparkles },
            { name: 'Parking', slug: 'parking', icon: MapPin },
            { name: 'Car Dealers', slug: 'car-dealers', icon: Key },
            { name: 'Junkyards', slug: 'junkyards', icon: Trash },
        ]
    },
    {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        icon: Sparkles,
        subcategories: [
            { name: 'Dentists', slug: 'dentists', icon: Smile },
            { name: 'Doctors', slug: 'doctors', icon: Stethoscope },
            { name: 'Chiropractors', slug: 'chiropractors', icon: Activity },
            { name: 'Optometrists', slug: 'optometrists', icon: Eye },
            { name: 'Dermatologists', slug: 'dermatologists', icon: Sparkles },
            { name: 'Podiatrists', slug: 'podiatrists', icon: Footprints },
            { name: 'Massage', slug: 'massage', icon: Heart },
            { name: 'Hair Salons', slug: 'hair-salons', icon: Scissors },
            { name: 'Nail Salons', slug: 'nail-salons', icon: Sparkles },
            { name: 'Barbers', slug: 'barbers', icon: Scissors },
            { name: 'Spas', slug: 'spas', icon: Flower },
            { name: 'Physical Therapy', slug: 'physical-therapy', icon: Activity },
        ]
    },
    {
        name: 'Travel & Activities',
        slug: 'travel-activities',
        icon: Compass,
        subcategories: [
            { name: 'Things to Do', slug: 'things-to-do', icon: Compass },
            { name: 'Kids Activities & Camps', slug: 'kids-activities-camps', icon: Smile },
            { name: 'Venues & Events', slug: 'venues-events', icon: Calendar },
            { name: 'Churches', slug: 'churches', icon: Home },
            { name: 'Shopping Malls', slug: 'shopping-malls', icon: ShoppingBag },
            { name: 'Bookstores', slug: 'bookstores', icon: Book },
            { name: 'Mini Golf', slug: 'mini-golf', icon: Flag },
            { name: 'Bowling', slug: 'bowling', icon: Disc },
            { name: 'Hotels', slug: 'hotels', icon: Bed },
            { name: 'Taxis', slug: 'taxis', icon: Car },
            { name: 'Bike Rentals', slug: 'bike-rentals', icon: Bike },
            { name: 'Campgrounds', slug: 'campgrounds', icon: Tent },
            { name: 'Beaches', slug: 'beaches', icon: Sun },
            { name: 'Swimming Pools', slug: 'swimming-pools', icon: Waves },
            { name: 'Bars & Nightlife', slug: 'bars-nightlife', icon: Beer },
        ]
    },
    {
        name: 'More',
        slug: 'more',
        icon: MoreHorizontal,
        subcategories: [
            { name: 'Dry Cleaning', slug: 'dry-cleaning', icon: Shirt },
            { name: 'Laundromats', slug: 'laundromats', icon: WashingMachine },
            { name: 'Thrift Stores', slug: 'thrift-stores', icon: ShoppingBag },
            { name: 'Tailors & Alterations', slug: 'tailors-alterations', icon: Scissors },
            { name: 'Apartments', slug: 'apartments', icon: Building },
            { name: 'Junk Removal', slug: 'junk-removal', icon: Trash },
            { name: 'Gyms', slug: 'gyms', icon: Dumbbell },
            { name: 'Yoga & Pilates', slug: 'yoga-pilates', icon: Activity },
        ]
    }
];
