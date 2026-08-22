import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'brand' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'slate' | 'white';
    size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'brand',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center font-bold rounded-full border transition-colors';

    const variants = {
        primary: 'bg-[#0B4778] text-white border-[#63B5E8]/40 shadow-xs',
        brand: 'bg-[#EAF5FC] text-[#0B4778] border-[#8FC7E8]',
        secondary: 'bg-[#0B4778]/10 text-[#0B4778] border-[#0B4778]/20',
        accent: 'bg-[#F4FAFE] text-[#287FBA] border-[#8FC7E8]',
        success: 'bg-[#EAF8F1] text-[#18734D] border-[#249A68]/30',
        warning: 'bg-[#FFF7E6] text-[#9A6B0F] border-[#D99A22]/30',
        error: 'bg-[#FDEEEE] text-[#A93636] border-[#D95353]/30',
        slate: 'bg-[#EEF4F8] text-[#466071] border-[#D4E0E7]',
        white: 'bg-white/90 text-[#0B4778] border-white/80 shadow-xs backdrop-blur-md',
    };

    const sizes = {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs tracking-wide uppercase',
    };

    return (
        <span className={twMerge(clsx(baseStyles, variants[variant] || variants.brand, sizes[size], className))} {...props}>
            {children}
        </span>
    );
};
