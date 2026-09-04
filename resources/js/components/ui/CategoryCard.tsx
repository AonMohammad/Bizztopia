import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Folder } from 'lucide-react';

export interface CategoryCardProps {
    name: string;
    slug: string;
    description?: string;
    articleCount?: number;
    icon?: React.ReactNode;
    color?: string;
    className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    name,
    slug,
    description,
    articleCount,
    icon,
    className = ''
}) => {
    return (
        <Link 
            href={`/ideas/category/${slug}`}
            className={`
                group p-6 rounded-2xl bg-white border border-[#E6EEF3] shadow-xs 
                hover:shadow-md hover:border-[#4A9AD4]/40 transition-all duration-300 flex flex-col justify-between
                ${className}
            `}
        >
            <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAF5FC] text-[#287FBA] flex items-center justify-center group-hover:bg-[#0B4778] group-hover:text-white transition-colors duration-300">
                    {icon || <Folder className="w-6 h-6" />}
                </div>

                <div>
                    <h4 className="text-base font-bold text-[#102A3D] group-hover:text-[#287FBA] transition-colors">
                        {name}
                    </h4>
                    {description && (
                        <p className="text-xs text-[#466071] line-clamp-2 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E6EEF3] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#718797]">
                    {articleCount !== undefined ? `${articleCount} Ideas & Playbooks` : 'Explore Ideas'}
                </span>
                <span className="inline-flex items-center text-[#287FBA] font-bold group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                </span>
            </div>
        </Link>
    );
};
