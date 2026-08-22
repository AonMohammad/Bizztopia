import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'white' | 'soft' | 'brand';
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'white',
    hoverable = false,
    className,
    ...props
}) => {
    const baseStyles = 'rounded-2xl overflow-hidden p-6 transition-all duration-300';
    
    const variants = {
        white: 'bg-white border border-[#E6EEF3] shadow-[0_2px_8px_rgba(11,71,120,0.06)]',
        soft: 'bg-[#F7FAFC] border border-[#D4E0E7] shadow-[0_2px_8px_rgba(11,71,120,0.04)]',
        brand: 'bg-gradient-brand text-white border border-[#8FC7E8]/30 shadow-[0_6px_20px_rgba(11,71,120,0.12)]',
    };

    const hoverStyle = hoverable ? 'hover:-translate-y-1 hover:border-[#8FC7E8] hover:shadow-[0_12px_35px_rgba(11,71,120,0.12)] cursor-pointer' : '';

    return (
        <div className={twMerge(clsx(baseStyles, variants[variant], hoverStyle, className))} {...props}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <div className={twMerge(clsx('mb-4 pb-3 border-b border-[#EEF4F8] flex items-center justify-between', className))} {...props}>
        {children}
    </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => (
    <h3 className={twMerge(clsx('text-xl font-bold text-[#102A3D] tracking-tight font-outfit', className))} {...props}>
        {children}
    </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...props }) => (
    <p className={twMerge(clsx('text-sm text-[#466071] mt-1 leading-relaxed', className))} {...props}>
        {children}
    </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <div className={twMerge(clsx('relative', className))} {...props}>
        {children}
    </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <div className={twMerge(clsx('mt-5 pt-4 border-t border-[#EEF4F8] flex items-center justify-between', className))} {...props}>
        {children}
    </div>
);
